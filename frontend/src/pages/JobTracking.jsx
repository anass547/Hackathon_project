import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getJob } from '../services/api'

export default function JobTracking() {
  const { jobId } = useParams()
  const [job, setJob] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!jobId) return
    getJob(jobId)
      .then(({ data }) => setJob(data))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [jobId])

  if (loading) return <p className="p-4">Chargement...</p>
  if (!job) return <p className="p-4">Mission introuvable.</p>

  const statusLabels = {
    requested: 'En attente de matching',
    pending: 'En attente de réponse artisan',
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
            <Link to={`/job/${jobId}/rate`} className="mt-4 inline-block py-2 px-4 rounded-lg bg-artisan-orange text-white font-medium">
              Noter l'artisan
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
