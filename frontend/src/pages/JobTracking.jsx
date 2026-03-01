import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getJob, getArtisan } from '../services/api'
import { supabase } from '../services/supabase'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

if (typeof window !== 'undefined' && L) {
  delete L.Icon.Default.prototype._getIconUrl
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  })
}

export default function JobTracking() {
  const { jobId } = useParams()
  const [job, setJob] = useState(null)
  const [artisan, setArtisan] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchArtisan = async (artisanId) => {
    try {
      const { data } = await getArtisan(artisanId)
      setArtisan(data)
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    if (!jobId) return
    let mounted = true

    getJob(jobId)
      .then(({ data }) => {
        if (!mounted) return
        setJob(data)
        if (data.artisan_id) fetchArtisan(data.artisan_id)
      })
      .catch(console.error)
      .finally(() => mounted && setLoading(false))

    // Realtime Magic: Listen for Updates on this specific Job Row
    const channel = supabase
      .channel(`job-tracking-${jobId}`)
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'jobs', filter: `id=eq.${jobId}` }, (payload) => {
        if (!mounted) return
        const updatedJob = payload.new
        setJob(prev => ({ ...prev, ...updatedJob }))
        // If it just got accepted, fetch the artisan details instantly
        if (updatedJob.status === 'accepted' && updatedJob.artisan_id) {
          fetchArtisan(updatedJob.artisan_id)
        }
      })
      .subscribe()

    return () => {
      mounted = false
      supabase.removeChannel(channel)
    }
  }, [jobId])

  if (loading) return <p className="p-4">Chargement...</p>
  if (!job) return <p className="p-4">Mission introuvable.</p>

  const statusLabels = {
    requested: 'Waiting for an artisan to accept...',
    pending: 'Waiting for an artisan to accept...',
    accepted: 'Accepté',
    in_progress: 'En cours',
    completed: 'Terminé (garantie 48h)',
    closed: 'Clôturé',
    complaint: 'Réclamation',
    reassigned: 'Réaffecté',
    completed_after_complaint: 'Terminé après réclamation',
  }

  return (
    <div className="min-h-screen bg-artisan-cream p-4">
      <div className="max-w-2xl mx-auto">
        <Link to="/request" className="text-artisan-orange font-medium mb-4 inline-block">← Retour</Link>
        <div className="bg-white p-6 rounded-xl shadow">
          <h1 className="text-xl font-bold text-artisan-dark mb-4">Mission #{job.id?.slice(0, 8)}</h1>
          <p className="text-gray-600 mb-2"><strong>Statut:</strong> {statusLabels[job.status] || job.status}</p>
          <p className="text-gray-600 mb-2"><strong>Type:</strong> {job.problem_type}</p>
          <p className="text-gray-600 mb-2"><strong>Ville:</strong> {job.city}</p>
          <p className="text-gray-600 mb-4"><strong>Prix:</strong> {job.estimated_price_min_mad} – {job.estimated_price_max_mad} MAD</p>
          {job.guarantee_until && (
            <p className="text-sm text-amber-700">Garantie 48h jusqu'au {new Date(job.guarantee_until).toLocaleString()}</p>
          )}
          {job.status === 'completed' && (
            <Link to={`/client/tracking/${jobId}/rate`} className="mt-4 inline-block py-2 px-4 rounded-lg bg-artisan-orange text-white font-medium">
              Noter l'artisan
            </Link>
          )}
          {job.status === 'accepted' && !artisan && (
            <p className="text-sm text-gray-500 mt-4 animate-pulse">Chargement des détails de l'artisan...</p>
          )}

          {artisan && (
            <div className="mt-6 border-t pt-4">
              <h2 className="text-lg font-bold text-artisan-dark mb-2">Votre Artisan</h2>
              <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-lg">
                <div className="w-12 h-12 bg-artisan-dark text-white rounded-full flex items-center justify-center font-bold text-xl">
                  {artisan.full_name?.charAt(0) || artisan.user?.full_name?.charAt(0) || 'A'}
                </div>
                <div>
                  <p className="font-semibold">{artisan.full_name || artisan.user?.full_name}</p>
                  <p className="text-sm text-gray-600">{artisan.profession} · {artisan.city}</p>
                  <p className="text-sm text-artisan-orange font-medium mt-1">📞 {artisan.phone || artisan.user?.phone || 'Contact disponible'}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Real-time Tracking Map */}
        <div className="mt-6 bg-white p-2 rounded-xl shadow h-[400px]">
          {(artisan?.latitude || job.latitude) ? (
            <MapContainer center={[artisan?.latitude || job.latitude, artisan?.longitude || job.longitude]} zoom={13} className="h-full w-full rounded-lg relative z-0">
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              {artisan?.latitude && artisan?.longitude && (
                <Marker position={[artisan.latitude, artisan.longitude]}>
                  <Popup>En route: {artisan.full_name || 'Artisan'}</Popup>
                </Marker>
              )}
              {job.latitude && job.longitude && (
                <Marker position={[job.latitude, job.longitude]}>
                  <Popup>Votre position</Popup>
                </Marker>
              )}
            </MapContainer>
          ) : (
            <div className="h-full w-full flex items-center justify-center bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
              <p className="text-gray-500 font-medium">Position GPS non disponible</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
