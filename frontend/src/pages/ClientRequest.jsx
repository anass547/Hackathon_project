import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { analyzePhoto, createJob, match } from '../services/api'
import { useAuth } from '../hooks/useAuth'

export default function ClientRequest() {
  const { profile } = useAuth()
  const [step, setStep] = useState(1)
  const [photos, setPhotos] = useState([])
  const [description, setDescription] = useState('')
  const [city, setCity] = useState('')
  const [surfaceArea, setSurfaceArea] = useState('')
  const [estimate, setEstimate] = useState(null)
  const [job, setJob] = useState(null)
  const [matches, setMatches] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

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
        latitude: null,
        longitude: null,
        estimated_price_min_mad: estimate.price_min,
        estimated_price_max_mad: estimate.price_max,
        estimated_duration_hours: estimate.duration_hours,
        photo_urls: [], // TODO: upload to storage and pass URLs
      })
      setJob(jobData)
      const { data: matchData } = await match({
        problem_type: estimate.problem_type,
        latitude: 31.6,
        longitude: -8.0,
        city,
        severity: estimate.severity,
        job_id: jobData.id,
      })
      setMatches(matchData)
      setStep(3)
      navigate(`/client/tracking/${jobData.id}`)
    } catch (err) {
      setError(err.response?.data?.detail || 'Erreur création')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-artisan-cream p-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-artisan-dark mb-6">Nouvelle demande</h1>
        {error && <p className="text-red-600 mb-4">{error}</p>}

        {step === 1 && (
          <form onSubmit={handleAnalyze} className="space-y-4 bg-white p-6 rounded-xl shadow">
            <label className="block">
              <span className="text-sm text-gray-600">Photos (1 à 3)</span>
              <input type="file" accept="image/*" multiple onChange={handlePhotoChange} className="mt-1 block w-full" />
            </label>
            <label className="block">
              <span className="text-sm text-gray-600">Description du problème</span>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2" placeholder="Fuite sous l'évier, peinture à refaire..." />
            </label>
            <label className="block">
              <span className="text-sm text-gray-600">Ville (Région Souss Massa)</span>
              <select value={city} onChange={(e) => setCity(e.target.value)} required className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 bg-white">
                <option value="" disabled>Sélectionner une ville</option>
                <option value="Agadir">Agadir</option>
                <option value="Inezgane">Inezgane</option>
                <option value="Ait Melloul">Ait Melloul</option>
                <option value="Dcheira">Dcheira</option>
                <option value="Taroudant">Taroudant</option>
                <option value="Tiznit">Tiznit</option>
                <option value="Tata">Tata</option>
                <option value="Chtouka Ait Baha">Chtouka Ait Baha</option>
              </select>
            </label>
            <label className="block">
              <span className="text-sm text-gray-600">Surface (m²) optionnel</span>
              <input type="number" min="0" step="0.1" value={surfaceArea} onChange={(e) => setSurfaceArea(e.target.value)} className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2" />
            </label>
            <button type="submit" disabled={loading || !city} className="w-full py-3 mt-4 rounded-lg bg-artisan-orange text-white font-medium disabled:opacity-50">
              {loading ? 'Analyse en cours...' : 'Obtenir une estimation'}
            </button>
          </form>
        )}

        {step === 2 && estimate && (
          <div className="bg-white p-6 rounded-xl shadow space-y-4">
            <h2 className="text-lg font-semibold">Estimation IA</h2>
            <p><span className="text-gray-600">Type:</span> {estimate.problem_type}</p>
            <p><span className="text-gray-600">Sévérité:</span> {estimate.severity}/5</p>
            <p><span className="text-gray-600">Prix:</span> {estimate.price_min} – {estimate.price_max} MAD</p>
            <p><span className="text-gray-600">Durée estimée:</span> {estimate.duration_hours} h</p>
            <p><span className="text-gray-600">Confiance:</span> {estimate.confidence_level}</p>
            <div className="flex gap-2">
              <button type="button" onClick={() => setStep(1)} className="py-2 px-4 rounded-lg border border-gray-300">Modifier</button>
              <button type="button" onClick={handleConfirmJob} disabled={loading} className="py-2 px-4 rounded-lg bg-artisan-orange text-white font-medium disabled:opacity-50">
                {loading ? 'Création...' : 'Confirmer et trouver un artisan'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
