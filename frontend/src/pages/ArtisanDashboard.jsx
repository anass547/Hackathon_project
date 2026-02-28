import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { listJobs, getArtisanByUserId, acceptJob, refuseJob } from '../services/api'
import { supabase } from '../services/supabase'

export default function ArtisanDashboard() {
  const { profile } = useAuth()
  const [jobs, setJobs] = useState([])
  const [artisan, setArtisan] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchJobsAndArtisan = async () => {
    try {
      if (!profile?.id) return
      const artisanRes = await getArtisanByUserId(profile.id)
      const arts = artisanRes.data || []
      const currentArtisan = arts[0] || null
      setArtisan(currentArtisan)

      if (currentArtisan) {
        // Fetch jobs specifically assigned to this artisan
        const jobsRes = await listJobs({ artisan_id: currentArtisan.id, limit: 30 })
        setJobs(jobsRes.data || [])
      }
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchJobsAndArtisan()
  }, [profile?.id])

  useEffect(() => {
    if (!artisan?.id) return

    // Supabase Realtime Subscription
    const channel = supabase
      .channel('public:jobs')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'jobs', filter: `artisan_id=eq.${artisan.id}` }, (payload) => {
        if (payload.eventType === 'INSERT') {
          setJobs((prev) => [payload.new, ...prev])
        } else if (payload.eventType === 'UPDATE') {
          setJobs((prev) => prev.map((j) => (j.id === payload.new.id ? payload.new : j)))
        } else if (payload.eventType === 'DELETE') {
          setJobs((prev) => prev.filter((j) => j.id !== payload.old.id))
        }
      })
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [artisan?.id])

  const pendingJobs = (jobs || []).filter(j => j.status === 'pending' || j.status === 'requested')
  const myJobs = artisan ? (jobs || []).filter(j => j.artisan_id === artisan.id && j.status !== 'pending' && j.status !== 'requested') : []

  const handleAccept = async (jobId) => {
    if (!artisan?.id) return
    try {
      await acceptJob(jobId, artisan.id)
      setJobs(prev => prev.map(j => j.id === jobId ? { ...j, status: 'accepted', artisan_id: artisan.id } : j))
    } catch (e) {
      console.error(e)
    }
  }

  const handleRefuse = async (jobId) => {
    if (!artisan?.id) return
    try {
      await refuseJob(jobId, artisan.id)
      setJobs(prev => prev.filter(j => j.id !== jobId))
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <div className="min-h-screen bg-artisan-cream">
      <header className="bg-artisan-dark text-white py-4 px-4 flex justify-between items-center">
        <Link to="/" className="text-artisan-orange font-medium">L'Artisan</Link>
        <span className="text-sm">{profile?.full_name}</span>
      </header>
      <main className="max-w-4xl mx-auto p-4">
        <h1 className="text-2xl font-bold text-artisan-dark mb-6">Tableau de bord artisan</h1>
        {artisan && (
          <div className="bg-white p-4 rounded-xl shadow mb-6">
            <p className="text-lg font-semibold">Niveau: {artisan.current_level}</p>
            <p className="text-gray-600">Note moyenne: {artisan.stats?.avg_rating ?? '-'}</p>
          </div>
        )}
        <section>
          <h2 className="text-lg font-semibold mb-4">Missions proposées</h2>
          {loading ? <p>Chargement...</p> : (
            <ul className="space-y-3">
              {pendingJobs.length === 0 && <p className="text-gray-500">Aucune mission en attente.</p>}
              {pendingJobs.slice(0, 10).map((j) => (
                <li key={j.id} className="bg-white p-4 rounded-lg shadow flex justify-between items-center">
                  <div>
                    <p className="font-medium">{j.problem_type} — {j.city}</p>
                    <p className="text-sm text-gray-600">{j.estimated_price_min_mad}–{j.estimated_price_max_mad} MAD · {j.estimated_duration_hours}h</p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => handleAccept(j.id)} className="px-3 py-1 rounded bg-green-600 text-white text-sm">Accepter</button>
                    <button onClick={() => handleRefuse(j.id)} className="px-3 py-1 rounded bg-red-600 text-white text-sm">Refuser</button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  )
}
