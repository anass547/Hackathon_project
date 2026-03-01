import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { getJob, listArtisans, getArtisan } from '../services/api'
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

export default function ArtisanList() {
  const { jobId } = useParams()
  const [job, setJob] = useState(null)
  const [artisans, setArtisans] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true;
    const fetchAssignedArtisan = async () => {
      try {
        let currentJob = null;
        if (jobId) {
          const { data } = await getJob(jobId)
          currentJob = data
          if (mounted) setJob(data)
        }

        // Capitalize to match DB exact casing
        const capitalize = (s) => s ? s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() : s;

        // Always fetch artisans matching the requested job's city and profession
        if (currentJob) {
          try {
            const { data } = await listArtisans({
              city: capitalize(currentJob.city),
              profession: capitalize(currentJob.problem_type),
              limit: 50
            });
            if (mounted) setArtisans(data || []);
          } catch (err) {
            console.error(err);
            if (mounted) setArtisans([]);
          }
        } else {
          // If no job found, load a generic list
          const { data } = await listArtisans({ limit: 50 })
          if (mounted) setArtisans(data || [])
        }
      } catch (e) {
        console.error(e)
      } finally {
        if (mounted) setLoading(false)
      }
    };
    fetchAssignedArtisan();
    return () => { mounted = false; };
  }, [jobId])

  if (loading) return <p className="p-4">Chargement...</p>

  const center = job?.latitude && job?.longitude
    ? [job.latitude, job.longitude]
    : [30.427755, -9.598107] // Agadir, Souss-Massa

  return (
    <div className="min-h-screen bg-artisan-cream flex flex-col">
      <header className="bg-artisan-dark text-white py-4 px-4 flex justify-between items-center">
        <Link to="/" className="text-artisan-orange font-medium">← L'Artisan</Link>
        {job && <Link to={`/job/${job.id}`} className="text-sm">Voir la mission</Link>}
      </header>
      <div className="flex-1 grid md:grid-cols-2 gap-0">
        <div className="h-[400px] md:h-[calc(100vh-56px)]">
          <MapContainer center={center} zoom={12} className="h-full w-full rounded-r-lg">
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {job && (job.latitude && job.longitude) && (
              <Marker position={[job.latitude, job.longitude]}>
                <Popup>Votre demande</Popup>
              </Marker>
            )}
            {artisans.filter(a => a.latitude && a.longitude).map((a) => (
              <Marker key={a.id} position={[a.latitude, a.longitude]}>
                <Popup>
                  <strong>{a.full_name || a.profession}</strong><br />
                  {a.profession} — {a.current_level}
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
        <div className="p-4 overflow-auto">
          <h2 className="text-xl font-bold text-artisan-dark mb-4">
            {jobId ? "Artisans qualifiés pour votre demande" : "Artisans à proximité"}
          </h2>
          <ul className="space-y-3">
            {artisans.slice(0, 10).map((a) => (
              <li key={a.id} className="bg-white p-4 rounded-lg shadow flex justify-between items-center">
                <div>
                  <p className="font-medium">{a.full_name || 'Artisan'}</p>
                  <p className="text-sm text-gray-600">{a.profession} · {a.current_level}</p>
                </div>
                <Link to={jobId ? `/job/${jobId}` : '#'} className="text-artisan-orange text-sm font-medium">Voir</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
