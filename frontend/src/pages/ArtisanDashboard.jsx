import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { listJobs, getArtisanByUserId, acceptJob, refuseJob, startJob, completeJob } from '../services/api'
import { supabase } from '../services/supabase'

export default function ArtisanDashboard() {
  const { profile } = useAuth()
  const [jobs, setJobs] = useState([])
  const [artisan, setArtisan] = useState(null)
  const [loading, setLoading] = useState(true)
  const [clientsCache, setClientsCache] = useState({})

  // Helper to fetch and cache client profile
  const fetchClientProfile = async (clientId) => {
    if (!clientId || clientsCache[clientId]) return;
    try {
      const { data } = await supabase.from('profiles').select('*').eq('id', clientId).single()
      if (data) {
        setClientsCache(prev => ({ ...prev, [clientId]: data }))
      }
    } catch (err) {
      console.error("Failed to fetch client profile", err)
    }
  }

  const fetchJobsAndArtisan = async () => {
    try {
      if (!profile?.id) return
      const artisanRes = await getArtisanByUserId(profile.id)
      const currentArtisan = (artisanRes.data || [])[0] || null
      setArtisan(currentArtisan)

      if (currentArtisan) {
        const assignedRes = await listJobs({ artisan_id: currentArtisan.id, limit: 30 })
        const openRes = await listJobs({ city: currentArtisan.city, problem_type: currentArtisan.profession, status: 'requested', limit: 30 })

        const assignedJobs = assignedRes.data || []
        const openJobs = openRes.data || []

        const allJobs = [...assignedJobs, ...openJobs]
        const uniqueJobs = Array.from(new Map(allJobs.map(j => [j.id, j])).values())
        uniqueJobs.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))

        setJobs(uniqueJobs)

        // Pre-fetch clients for accepted jobs
        uniqueJobs.forEach(j => {
          if (['accepted', 'in_progress', 'completed'].includes(j.status)) {
            fetchClientProfile(j.client_id)
          }
        })
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

    const channel = supabase
      .channel('public:jobs')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'jobs' }, (payload) => {
        const job = payload.new || payload.old
        const isAssigned = job.artisan_id === artisan.id
        const isOpenMatch = job.status === 'requested' && job.city === artisan.city && job.problem_type === artisan.profession

        if (payload.eventType === 'INSERT') {
          if (isAssigned || isOpenMatch) setJobs((prev) => [payload.new, ...prev])
        } else if (payload.eventType === 'UPDATE') {
          setJobs((prev) => {
            const exists = prev.some(j => j.id === payload.new.id)
            if (exists) {
              if (payload.new.status === 'accepted' && payload.new.artisan_id !== artisan.id) {
                return prev.filter(j => j.id !== payload.new.id)
              }
              // If accepted by me, fetch the client
              if (payload.new.status === 'accepted' && payload.new.artisan_id === artisan.id) {
                fetchClientProfile(payload.new.client_id)
              }
              return prev.map((j) => (j.id === payload.new.id ? payload.new : j))
            } else if (isOpenMatch || isAssigned) {
              if (isAssigned && ['accepted', 'in_progress'].includes(payload.new.status)) fetchClientProfile(payload.new.client_id)
              return [payload.new, ...prev]
            }
            return prev
          })
        } else if (payload.eventType === 'DELETE') {
          setJobs((prev) => prev.filter((j) => j.id !== payload.old.id))
        }
      })
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [artisan, clientsCache])

  const pendingJobs = (jobs || []).filter(j => j.status === 'pending' || j.status === 'requested')
  const myJobs = artisan ? (jobs || []).filter(j => j.artisan_id === artisan.id && ['accepted', 'in_progress'].includes(j.status)) : []

  const handleAccept = async (jobId) => {
    if (!artisan?.id) return
    try {
      await acceptJob(jobId, artisan.id)
      const job = jobs.find(j => j.id === jobId)
      if (job) fetchClientProfile(job.client_id)
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

  const handleFinishMission = async (jobId) => {
    try {
      await completeJob(jobId, [])
      setJobs(prev => prev.map(j => j.id === jobId ? { ...j, status: 'completed' } : j))
    } catch (e) { console.error(e) }
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#2B2D42] font-sans">
      <header className="bg-white/80 backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.04)] py-4 px-6 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <img src="/image_12.png" alt="L'm3ALEM Logo" className="h-8 w-auto" />
          <span className="font-extrabold text-lg text-[#2B2D42]">Espace Artisan</span>
        </div>
        <span className="font-bold text-sm text-[#8D99AE]">{profile?.full_name}</span>
      </header>

      <main className="max-w-5xl mx-auto p-4 md:p-8 space-y-12 my-8">

        {/* Artisan Stats Card */}
        {artisan && (
          <div className="bg-white p-8 rounded-3xl shadow-[0_20px_50px_rgba(8,112,184,0.04)] border border-gray-100 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-extrabold text-[#2B2D42]">Bienvenue, M3alem {profile?.full_name?.split(' ')[0]}</h1>
              <p className="text-[#8D99AE] mt-1 font-medium">{artisan.profession} à {artisan.city}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-[#8D99AE] font-bold uppercase tracking-wider">Niveau</p>
              <p className="text-2xl font-black text-[#B22222]">{artisan.current_level}</p>
            </div>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-10">
          {/* MISSIONS EN ATTENTE (PENDING) */}
          <section>
            <div className="mb-6 flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-[#B22222] animate-pulse"></div>
              <h2 className="text-2xl font-bold text-[#2B2D42]">Missions Disponibles</h2>
            </div>

            {loading ? <p className="text-[#8D99AE] font-medium animate-pulse">Recherche d'interventions...</p> : (
              <div className="space-y-6">
                {pendingJobs.length === 0 && (
                  <div className="bg-white p-8 rounded-3xl border border-gray-100 text-center shadow-[0_20px_50px_rgba(8,112,184,0.04)]">
                    <p className="text-[#8D99AE] font-semibold">Aucune mission dans votre secteur pour le moment.</p>
                  </div>
                )}
                {pendingJobs.map((j) => (
                  <div key={j.id} className="bg-white p-6 rounded-3xl shadow-[0_20px_50px_rgba(8,112,184,0.04)] border border-gray-50 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_25px_50px_rgba(8,112,184,0.08)]">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <span className="inline-block px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-bold rounded-full mb-3">Nouvelle Demande</span>
                        <h3 className="font-extrabold text-xl mb-1">{j.problem_type}</h3>
                        <p className="font-semibold text-[#8D99AE] text-sm">📍 Zone: {j.city} (Adresse exacte masquée)</p>
                      </div>
                    </div>

                    <p className="text-gray-600 text-sm mb-6 bg-gray-50 p-4 rounded-2xl italic border border-gray-100">"{j.description}"</p>

                    <div className="flex justify-between items-center mb-6 px-4 py-3 bg-[#FDFBF7] rounded-2xl">
                      <div>
                        <p className="text-xs font-bold text-[#8D99AE] uppercase">Estimation</p>
                        <p className="font-black text-[#B22222]">{j.estimated_price_min_mad} - {j.estimated_price_max_mad} MAD</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs font-bold text-[#8D99AE] uppercase">Durée</p>
                        <p className="font-bold text-[#2B2D42]">~{j.estimated_duration_hours}h</p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <button onClick={() => handleAccept(j.id)} className="flex-1 py-3 px-4 rounded-2xl bg-[#2A9D8F] text-white font-bold transition-all duration-300 active:scale-95 shadow-[0_8px_30px_rgba(42,157,143,0.3)] hover:shadow-[0_12px_40px_rgba(42,157,143,0.4)]">
                        Accepter
                      </button>
                      <button onClick={() => handleRefuse(j.id)} className="flex-1 py-3 px-4 rounded-2xl bg-[#722F37] text-white font-bold transition-all duration-300 active:scale-95 shadow-[0_8px_30px_rgba(114,47,55,0.3)] hover:shadow-[0_12px_40px_rgba(114,47,55,0.4)]">
                        Refuser
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* MISSIONS EN COURS (ACCEPTED - FULL DATA REVEALED) */}
          <section>
            <div className="mb-6 flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-[#2A9D8F]"></div>
              <h2 className="text-2xl font-bold text-[#2B2D42]">Interventions en cours</h2>
            </div>

            <div className="space-y-6">
              {myJobs.length === 0 && (
                <p className="text-[#8D99AE] font-medium py-4">Vous n'avez aucune mission active.</p>
              )}
              {myJobs.map(job => {
                const client = clientsCache[job.client_id];
                return (
                  <div key={job.id} className="bg-white p-6 rounded-3xl shadow-[0_20px_50px_rgba(42,157,143,0.08)] border-2 border-[#2A9D8F]/20">
                    <div className="flex justify-between items-start mb-4">
                      <span className="inline-block px-3 py-1 bg-[#2A9D8F] text-white text-xs font-bold rounded-full mb-2">Mission Acceptée</span>
                    </div>

                    <h3 className="font-extrabold text-xl mb-4">{job.problem_type}</h3>
                    <p className="text-gray-600 text-sm mb-6">"{job.description}"</p>

                    {/* REVEALED CLIENT PII MODULE */}
                    <div className="bg-[#FDFBF7] p-5 rounded-2xl border border-gray-200 mb-6">
                      <h4 className="text-xs font-black text-[#8D99AE] uppercase tracking-wider mb-4 border-b pb-2">Données Client Déverrouillées</h4>

                      {client ? (
                        <div className="space-y-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-[#B22222] text-white flex items-center justify-center font-bold">
                              {client.full_name?.charAt(0) || 'C'}
                            </div>
                            <div>
                              <p className="font-bold text-[#2B2D42]">{client.full_name}</p>
                              <p className="text-sm text-[#8D99AE]">Client L'm3ALEM</p>
                            </div>
                          </div>

                          <div className="mt-4 grid gap-3">
                            <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-gray-100">
                              <span className="text-lg">📍</span>
                              <span className="text-sm font-semibold text-[#2B2D42]">{job.city} (Coordonnées exactes)</span>
                            </div>

                            <a href={`tel:${client.phone}`} className="flex items-center justify-center gap-2 bg-[#F0FDF4] text-[#166534] hover:bg-[#DCFCE7] transition-colors py-3 rounded-xl border border-[#BBF7D0] font-bold text-sm">
                              📞 Appeler le {client.phone || "Non renseigné"}
                            </a>
                          </div>
                        </div>
                      ) : (
                        <p className="text-xs text-gray-500 animate-pulse">Récupération des données client...</p>
                      )}
                    </div>

                    <button onClick={() => handleFinishMission(job.id)} className="w-full py-4 rounded-2xl bg-[#B22222] text-white font-bold transition-all duration-300 active:scale-95 shadow-[0_8px_30px_rgba(178,34,34,0.3)] hover:shadow-[0_12px_40px_rgba(178,34,34,0.4)]">
                      Terminer la mission
                    </button>

                  </div>
                )
              })}
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
