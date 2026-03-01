import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { analyzePhoto, createJob, match, listJobs, getArtisan, deleteJob } from '../services/api'
import { useAuth } from '../hooks/useAuth'
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

export default function ClientDashboard() {
    const { profile } = useAuth()
    const navigate = useNavigate()

    const [activeTab, setActiveTab] = useState('demandes') // 'nouvelle' | 'demandes'

    // NEW DEMAND STATE
    const [step, setStep] = useState(1)
    const [photos, setPhotos] = useState([])
    const [description, setDescription] = useState('')
    const [city, setCity] = useState('')
    const [surfaceArea, setSurfaceArea] = useState('')
    const [estimate, setEstimate] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    // TRACK DEMANDS STATE
    const [myJobs, setMyJobs] = useState([])
    const [loadingJobs, setLoadingJobs] = useState(true)
    const [artisansCache, setArtisansCache] = useState({})

    useEffect(() => {
        if (!profile?.id) return
        let mounted = true

        const fetchDemands = async () => {
            try {
                const { data } = await listJobs({ client_id: profile.id })
                if (!mounted) return
                setMyJobs(data)

                // Pre-fetch artisans for accepted/completed jobs
                const acceptedJobs = data.filter(j => ['accepted', 'in_progress', 'completed'].includes(j.status) && j.artisan_id)
                acceptedJobs.forEach(async (job) => {
                    if (!artisansCache[job.artisan_id]) {
                        try {
                            const res = await getArtisan(job.artisan_id)
                            setArtisansCache(prev => ({ ...prev, [job.artisan_id]: res.data }))
                        } catch (e) { console.error('Failed caching artisan', e) }
                    }
                })

            } catch (err) {
                console.error('Failed to load demands', err)
            } finally {
                if (mounted) setLoadingJobs(false)
            }
        }

        fetchDemands()

        // Realtime Listener for the specific Client ID Demands
        const channel = supabase
            .channel(`client-demands-${profile.id}`)
            .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'jobs', filter: `client_id=eq.${profile.id}` }, async (payload) => {
                if (!mounted) return
                const updatedJob = payload.new

                setMyJobs(prev => prev.map(job => job.id === updatedJob.id ? { ...job, ...updatedJob } : job))

                // If an artisan accepted the job, dynamically fetch and cache their profile
                if (updatedJob.status === 'accepted' && updatedJob.artisan_id && !artisansCache[updatedJob.artisan_id]) {
                    try {
                        const { data: artData } = await getArtisan(updatedJob.artisan_id)
                        setArtisansCache(prev => ({ ...prev, [updatedJob.artisan_id]: artData }))
                    } catch (e) { console.error('Realtime Artisan Fetch Failed', e) }
                }
            })
            .subscribe()

        return () => {
            mounted = false
            supabase.removeChannel(channel)
        }
    }, [profile?.id, artisansCache])


    // SUBMIT HANDLERS
    const handlePhotoChange = (e) => {
        const files = Array.from(e.target.files || []).slice(0, 3)
        setPhotos(files)
    }

    const handleAnalyze = async (e) => {
        e.preventDefault()
        setError('')
        setLoading(true)
        try {
            const formData = new FormData()
            if (photos[0]) formData.append('image', photos[0])
            formData.append('description', description)
            formData.append('city', city)
            formData.append('surface_area', surfaceArea || 0)
            const { data } = await analyzePhoto(formData)
            // Laissez l'IA décider la catégorie
            setEstimate(data)
            setStep(2)
        } catch (err) {
            setError(err.response?.data?.detail || 'Erreur analyse')
        } finally {
            setLoading(false)
        }
    }

    const handleConfirmJob = async () => {
        if (!profile?.id || !estimate) return
        setLoading(true)
        setError('')
        try {
            const { data: jobData } = await createJob({
                client_id: profile.id,
                problem_type: estimate.problem_type,
                description,
                city,
                severity: estimate.severity,
                latitude: null, // Client location not currently captured
                longitude: null,
                estimated_price_min_mad: estimate.price_min,
                estimated_price_max_mad: estimate.price_max,
                estimated_duration_hours: estimate.duration_hours,
                photo_urls: [],
            })

            await match({
                problem_type: estimate.problem_type,
                latitude: 30.4278, // Mock default to Agadir roughly to prevent Match errors
                longitude: -9.5981,
                city,
                severity: estimate.severity,
                job_id: jobData.id,
            })

            // Reset form and swap view to tracking
            setStep(1)
            setDescription('')
            setSurfaceArea('')
            setEstimate(null)
            setActiveTab('demandes')

            // Optimistically push the new job
            setMyJobs(prev => [jobData, ...prev])

        } catch (err) {
            setError(err.response?.data?.detail || 'Erreur création')
        } finally {
            setLoading(false)
        }
    }

    const handleDeleteJob = async (jobId) => {
        if (!window.confirm("Êtes-vous sûr de vouloir supprimer cette demande ?")) return
        try {
            await deleteJob(jobId)
            setMyJobs(prev => prev.filter(j => j.id !== jobId))
        } catch (err) {
            console.error("Erreur lors de la suppression", err)
            alert("Impossible de supprimer la demande.")
        }
    }

    // STATUS HELPERS
    const JobStatusBadge = ({ status }) => {
        if (status === 'pending' || status === 'requested') {
            return (
                <div className="flex items-center gap-2">
                    <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#B22222] opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-[#B22222]"></span>
                    </span>
                    <span className="text-sm font-medium text-[#B22222] animate-pulse">Recherche d'un artisan qualifié en cours...</span>
                </div>
            )
        }
        if (status === 'accepted') {
            return (
                <span className="px-3 py-1 bg-[#2A9D8F] text-white text-sm font-bold rounded-full shadow-sm">
                    ✓ Artisan en route
                </span>
            )
        }
        if (status === 'completed') {
            return <span className="text-sm font-bold text-gray-500">Terminé</span>
        }
        return <span className="text-sm font-bold text-gray-500">{status}</span>
    }

    return (
        <div className="min-h-screen bg-[#FDFBF7] p-4 font-sans">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-extrabold text-gray-900 mb-8 tracking-tight">Espace Client</h1>

                {/* TAB NAVIGATION */}
                <div className="flex gap-4 mb-8 border-b pb-1">
                    <button
                        onClick={() => setActiveTab('demandes')}
                        className={`pb-2 text-lg font-bold transition-colors duration-200 ${activeTab === 'demandes' ? 'text-[#B22222] border-b-2 border-[#B22222]' : 'text-gray-400 hover:text-gray-600'}`}
                    >
                        Mes Demandes
                    </button>
                    <button
                        onClick={() => setActiveTab('nouvelle')}
                        className={`pb-2 text-lg font-bold transition-colors duration-200 ${activeTab === 'nouvelle' ? 'text-[#B22222] border-b-2 border-[#B22222]' : 'text-gray-400 hover:text-gray-600'}`}
                    >
                        Nouvelle Demande
                    </button>
                </div>

                {/* SECTION 1: NOUVELLE DEMANDE */}
                {activeTab === 'nouvelle' && (
                    <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
                        <h2 className="text-xl font-bold text-gray-800 mb-6">Créer une intervention</h2>
                        {error && <p className="text-red-500 mb-4 bg-red-50 p-3 rounded-lg text-sm">{error}</p>}

                        {step === 1 && (
                            <form onSubmit={handleAnalyze} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <label className="block">
                                        <span className="text-sm font-semibold text-gray-700">Ville</span>
                                        <select value={city} onChange={(e) => setCity(e.target.value)} required className="mt-2 block w-full rounded-xl border border-gray-200 px-4 py-3 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#B22222] focus:border-transparent outline-none transition-all">
                                            <option value="" disabled>Sélectionner votre ville</option>
                                            <option value="Agadir">Agadir</option>
                                            <option value="Inezgane">Inezgane</option>
                                            <option value="Ait Melloul">Ait Melloul</option>
                                            <option value="Dcheira">Dcheira</option>
                                            <option value="Taroudant">Taroudant</option>
                                            <option value="Tiznit">Tiznit</option>
                                        </select>
                                    </label>
                                </div>

                                <label className="block">
                                    <span className="text-sm font-semibold text-gray-700">Description du problème</span>
                                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} required className="mt-2 block w-full rounded-xl border border-gray-200 px-4 py-3 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#B22222] focus:border-transparent outline-none transition-all resize-none" placeholder="Expliquez votre problème en quelques mots..." />
                                </label>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <label className="block">
                                        <span className="text-sm font-semibold text-gray-700">Surface (m²) - Optionnel</span>
                                        <input type="number" min="0" step="0.1" value={surfaceArea} onChange={(e) => setSurfaceArea(e.target.value)} className="mt-2 block w-full rounded-xl border border-gray-200 px-4 py-3 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#B22222] focus:border-transparent outline-none transition-all" placeholder="Ex: 15" />
                                    </label>

                                    <label className="block">
                                        <span className="text-sm font-semibold text-gray-700">Photos (jusqu'à 3) - Optionnel</span>
                                        <input type="file" accept="image/*" multiple onChange={handlePhotoChange} className="mt-2 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-[#B22222] file:text-white hover:file:bg-[#d46f54] file:rounded-full file:cursor-pointer transition-all" />
                                    </label>
                                </div>

                                <button type="submit" disabled={loading || !city} className="w-full py-4 mt-8 rounded-xl bg-[#B22222] hover:bg-[#d46f54] text-white font-bold text-lg shadow-md hover:shadow-lg transition-all disabled:opacity-50">
                                    {loading ? 'Analyse de la demande...' : 'Soumettre Demande'}
                                </button>
                            </form>
                        )}

                        {step === 2 && estimate && (
                            <div className="animate-fade-in">
                                <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 space-y-4 mb-8 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 py-1 px-3 bg-[#B22222] text-white text-xs font-bold rounded-bl-xl shadow-sm">
                                        Catégorie Détectée: {estimate.problem_type}
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-800 border-b pb-2">Estimation Intelligente</h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div><span className="text-sm text-gray-500 block">Sévérité</span><span className="font-semibold text-gray-800">{estimate.severity}/5</span></div>
                                        <div>
                                            <span className="text-sm text-gray-500 block">Prix Estimé (Total)</span>
                                            <span className="font-bold text-[#B22222]">{(estimate.price_min + estimate.price_max) / 2} MAD</span>
                                        </div>
                                        <div><span className="text-sm text-gray-500 block">Durée</span><span className="font-semibold text-gray-800">{estimate.duration_hours} Heures</span></div>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <button type="button" onClick={() => setStep(1)} className="flex-1 py-3 px-4 rounded-xl border-2 border-gray-200 text-gray-600 font-bold hover:bg-gray-50 transition-colors">Retour</button>
                                    <button type="button" onClick={handleConfirmJob} disabled={loading} className="flex-1 py-3 px-4 rounded-xl bg-[#B22222] hover:bg-[#d46f54] text-white font-bold shadow-md transition-all disabled:opacity-50">
                                        {loading ? 'Validation...' : 'Confirmer'}
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* SECTION 2: MES DEMANDES TRACKING */}
                {activeTab === 'demandes' && (
                    <div className="space-y-6">
                        {loadingJobs ? (
                            <div className="text-center py-12 text-gray-500 font-medium animate-pulse">Chargement de l'historique...</div>
                        ) : myJobs.length === 0 ? (
                            <div className="bg-white rounded-2xl p-12 text-center border border-gray-100 shadow-sm">
                                <div className="text-5xl mb-4">🏠</div>
                                <h3 className="text-xl font-bold text-gray-800 mb-2">Aucune demande active</h3>
                                <p className="text-gray-500 mb-6">Vous n'avez pas encore sollicité d'artisan.</p>
                                <button onClick={() => setActiveTab('nouvelle')} className="py-2 px-6 rounded-full bg-[#B22222] text-white font-bold shadow-sm hover:shadow-md transition-all">
                                    Créer une demande
                                </button>
                            </div>
                        ) : (
                            myJobs.map((job) => {
                                const art = artisansCache[job.artisan_id]
                                return (
                                    <div key={job.id} className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 overflow-hidden relative">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <div className="flex items-center gap-3 mb-1">
                                                    <h3 className="text-lg font-bold text-gray-900">{job.problem_type}</h3>
                                                    <span className="text-xs font-semibold px-2 py-1 bg-gray-100 text-gray-600 rounded">📍 {job.city}</span>
                                                </div>
                                                <p className="text-gray-600 text-sm mt-2 line-clamp-2">{job.description}</p>
                                            </div>
                                            <div className="flex flex-col items-end gap-3">
                                                <JobStatusBadge status={job.status} />
                                                {(job.status === 'pending' || job.status === 'requested') && (
                                                    <button onClick={() => handleDeleteJob(job.id)} className="text-xs font-bold text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 px-3 py-1 rounded-lg transition-colors border border-red-100">
                                                        Supprimer la demande
                                                    </button>
                                                )}
                                            </div>
                                        </div>

                                        {/* ACCEPTED DYNAMIC RENDER: MAP & ARTISAN PROFILE */}
                                        {job.status === 'accepted' && (
                                            <div className="mt-6 pt-6 border-t border-gray-100 animate-fade-in">
                                                {art ? (
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                        {/* Artisan Card */}
                                                        <div className="bg-[#FDFBF7] p-4 rounded-xl border border-[#B22222]/20 flex items-center gap-4">
                                                            <div className="w-16 h-16 bg-[#B22222] text-white rounded-full flex items-center justify-center font-bold text-2xl shadow-sm">
                                                                {art.user?.full_name?.charAt(0) || art.full_name?.charAt(0) || 'A'}
                                                            </div>
                                                            <div>
                                                                <p className="font-bold text-gray-900 text-lg">{art.user?.full_name || art.full_name}</p>
                                                                <p className="text-sm text-gray-600 mb-1">{art.profession}</p>
                                                                <a href={`tel:${art.user?.phone || art.phone}`} className="inline-flex items-center gap-1 text-[#2A9D8F] font-bold text-sm bg-[#2A9D8F]/10 px-3 py-1 rounded-full">
                                                                    📞 Appeler
                                                                </a>
                                                            </div>
                                                        </div>

                                                        {/* Leaflet Map Tracking Pin */}
                                                        <div className="h-40 bg-gray-100 rounded-xl overflow-hidden shadow-inner relative z-0">
                                                            {art.latitude && art.longitude ? (
                                                                <MapContainer center={[art.latitude, art.longitude]} zoom={14} className="h-full w-full">
                                                                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                                                                    <Marker position={[art.latitude, art.longitude]}>
                                                                        <Popup className="font-bold text-center">
                                                                            Artisan {art.user?.full_name?.split(' ')[0]}<br />📍 En route
                                                                        </Popup>
                                                                    </Marker>
                                                                </MapContainer>
                                                            ) : (
                                                                <div className="flex h-full items-center justify-center text-sm text-gray-400 font-medium">Position GPS non partagée</div>
                                                            )}
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="p-4 bg-gray-50 rounded-xl text-center text-sm font-medium text-gray-500 animate-pulse">Chargement contact artisan...</div>
                                                )}
                                            </div>
                                        )}

                                        <div className="mt-4 text-xs font-semibold text-gray-400 text-right">
                                            ID: {job.id.slice(0, 8)} • Modifié le: {new Date(job.updated_at || job.created_at).toLocaleDateString()}
                                        </div>
                                    </div>
                                )
                            })
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}
