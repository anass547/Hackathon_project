import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { rateJob } from '../services/api'

export default function Rating() {
  const { jobId } = useParams()
  const navigate = useNavigate()
  const [stars, setStars] = useState(5)
  const [comment, setComment] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await rateJob(jobId, { stars, comment })
      navigate(`/job/${jobId}`)
    } catch (err) {
      setError(err.response?.data?.detail || 'Erreur')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-artisan-cream p-4 flex items-center justify-center">
      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow">
        <h1 className="text-xl font-bold text-artisan-dark mb-4">Noter l'artisan</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            <span className="text-sm text-gray-600">Note (1-5)</span>
            <select value={stars} onChange={(e) => setStars(Number(e.target.value))} className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2">
              {[1, 2, 3, 4, 5].map(n => <option key={n} value={n}>{n} étoile{n > 1 ? 's' : ''}</option>)}
            </select>
          </label>
          <label className="block">
            <span className="text-sm text-gray-600">Commentaire</span>
            <textarea value={comment} onChange={(e) => setComment(e.target.value)} rows={3} className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2" />
          </label>
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <button type="submit" disabled={loading} className="w-full py-3 rounded-lg bg-artisan-orange text-white font-medium disabled:opacity-50">
            {loading ? 'Envoi...' : 'Envoyer la note'}
          </button>
        </form>
      </div>
    </div>
  )
}
