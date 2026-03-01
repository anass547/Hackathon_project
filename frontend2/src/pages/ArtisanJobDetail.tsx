import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, DollarSign } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { StatusBadge } from '@/components/StatusBadge';
import { specialties } from '@/lib/mockData';
import api from '@/lib/api';
import { toast } from 'sonner';

interface Job {
  id: number;
  problem_type: string;
  symptom: string | null;
  ai_description: string | null;
  severity: number | null;
  complexity: string | null;
  estimated_price_min: number | null;
  estimated_price_max: number | null;
  final_price: number | null;
  status: string;
  created_at: string;
  started_at: string | null;
  completed_at: string | null;
}

const ArtisanJobDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [starting, setStarting] = useState(false);
  const [completing, setCompleting] = useState(false);
  const [afterPhotoUrl, setAfterPhotoUrl] = useState('');
  const [showCompleteModal, setShowCompleteModal] = useState(false);

  const fetchJob = async () => {
    if (!id) return;
    try {
      const res = await api.get(`/jobs/${id}`);
      setJob(res.data);
    } catch {
      toast.error('Erreur lors du chargement');
      setJob(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJob();
  }, [id]);

  const handleConfirmDates = async () => {
    if (!id) return;
    try {
      setStarting(true);
      const now = new Date();
      const end = new Date(now.getTime() + 2 * 60 * 60 * 1000);
      await api.patch(`/jobs/${id}/confirm-dates`, {
        confirmed_start: now.toISOString(),
        confirmed_end: end.toISOString(),
      });
      toast.success('Service démarré !');
      fetchJob();
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { detail?: string } } })?.response?.data?.detail;
      toast.error(msg || 'Erreur');
    } finally {
      setStarting(false);
    }
  };

  const handleComplete = async () => {
    if (!id) return;
    try {
      setCompleting(true);
      await api.patch(`/jobs/${id}/complete`, {
        after_photo_url: afterPhotoUrl || undefined,
      });
      toast.success('Mission déclarée terminée ! Garantie 48h démarrée.');
      setShowCompleteModal(false);
      fetchJob();
      navigate('/artisan/dashboard');
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { detail?: string } } })?.response?.data?.detail;
      toast.error(msg || 'Erreur lors de la déclaration de fin');
    } finally {
      setCompleting(false);
    }
  };

  if (loading && !job) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-8 max-w-2xl">
          <div className="h-6 w-48 rounded bg-muted animate-pulse mb-6" />
          <div className="h-10 w-full rounded-2xl bg-muted animate-pulse mb-6" />
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-8 max-w-2xl text-center">
          <p className="text-muted-foreground">Mission introuvable.</p>
          <Link to="/artisan/dashboard" className="text-accent font-semibold mt-2 inline-block">Retour au dashboard</Link>
        </div>
      </div>
    );
  }

  const title = job.ai_description?.slice(0, 60) || job.symptom?.slice(0, 60) || specialties.find(s => s.id === job.problem_type)?.nameFr || job.problem_type;
  const dateStr = job.created_at ? new Date(job.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' }) : '';
  const priceStr = job.final_price != null
    ? `${Math.round(job.final_price)} MAD`
    : (job.estimated_price_min != null && job.estimated_price_max != null)
      ? `${Math.round(job.estimated_price_min)} – ${Math.round(job.estimated_price_max)} MAD`
      : '—';

  const total = job.final_price ?? (job.estimated_price_min != null && job.estimated_price_max != null
    ? (job.estimated_price_min + job.estimated_price_max) / 2
    : 0);
  const artisanShare = total * 0.5;
  const savingsShare = total * 0.3;
  const platformShare = total * 0.2;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Link to="/artisan/dashboard" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
          <ArrowLeft className="h-4 w-4" /> Retour au dashboard
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-2xl font-extrabold text-foreground mb-1">{title}{(job.ai_description?.length || job.symptom?.length || 0) > 60 ? '…' : ''}</h1>
              <p className="text-sm text-muted-foreground">{dateStr} • {priceStr}</p>
            </div>
            <StatusBadge status={job.status} />
          </div>

          {/* Client Info */}
          <div className="rounded-2xl border border-border bg-card p-6 mb-6">
            <h3 className="font-bold text-foreground mb-4">Client</h3>
            <div className="space-y-3">
              <p className="font-semibold text-foreground">Client</p>
              <p className="text-sm text-muted-foreground flex items-center gap-2"><MapPin className="h-4 w-4" />—</p>
            </div>
          </div>

          {/* AI Analysis */}
          <div className="rounded-2xl border border-border bg-card p-6 mb-6">
            <h3 className="font-bold text-foreground mb-4">Analyse IA</h3>
            <p className="text-sm text-foreground mb-4">{job.ai_description || job.symptom || '—'}</p>
            <div className="grid grid-cols-3 gap-3">
              <div className="rounded-xl bg-muted p-3 text-center">
                <p className="text-xs text-muted-foreground">Sévérité</p>
                <p className="font-bold text-foreground">{job.severity ?? '—'}/5</p>
              </div>
              <div className="rounded-xl bg-muted p-3 text-center">
                <p className="text-xs text-muted-foreground">Complexité</p>
                <p className="font-bold text-accent">{job.complexity ?? '—'}</p>
              </div>
              <div className="rounded-xl bg-muted p-3 text-center">
                <p className="text-xs text-muted-foreground">Prix</p>
                <p className="font-bold text-foreground">{priceStr}</p>
              </div>
            </div>
          </div>

          {/* Payment Info */}
          <div className="rounded-2xl border border-border bg-card p-6 mb-6">
            <h3 className="font-bold text-foreground mb-4 flex items-center gap-2"><DollarSign className="h-5 w-5" /> Paiement</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Revenus directs (50%)</span>
                <span className="font-semibold text-foreground">{Math.round(artisanShare)} MAD</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Savings (30%)</span>
                <span className="font-semibold text-foreground">{Math.round(savingsShare)} MAD</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Plateforme (20%)</span>
                <span className="font-semibold text-foreground">{Math.round(platformShare)} MAD</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            {job.status === 'accepted' && (
              <button
                onClick={handleConfirmDates}
                disabled={starting}
                className="flex-1 rounded-xl bg-accent py-3 text-sm font-bold text-accent-foreground shadow-accent hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {starting ? 'Démarrage...' : 'Démarrer le service'}
              </button>
            )}
            {job.status === 'in_progress' && (
              <button
                onClick={() => setShowCompleteModal(true)}
                className="flex-1 rounded-xl bg-success py-3 text-sm font-bold text-success-foreground hover:opacity-90 transition-opacity"
              >
                Déclarer terminé
              </button>
            )}
          </div>
        </motion.div>
      </div>

      {/* Complete modal */}
      {showCompleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={() => !completing && setShowCompleteModal(false)}>
          <div className="rounded-2xl border border-border bg-card p-6 w-full max-w-md shadow-xl" onClick={e => e.stopPropagation()}>
            <h3 className="font-bold text-foreground mb-4">Déclarer la mission terminée</h3>
            <p className="text-sm text-muted-foreground mb-4">Optionnel : URL de la photo de l'état final</p>
            <input
              type="text"
              value={afterPhotoUrl}
              onChange={e => setAfterPhotoUrl(e.target.value)}
              placeholder="https://..."
              className="w-full rounded-xl border border-input bg-background p-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 mb-4"
            />
            <div className="flex gap-3">
              <button
                onClick={() => !completing && setShowCompleteModal(false)}
                className="flex-1 rounded-xl border border-border py-2.5 text-sm font-medium hover:bg-muted"
              >
                Annuler
              </button>
              <button
                onClick={handleComplete}
                disabled={completing}
                className="flex-1 rounded-xl bg-success py-2.5 text-sm font-bold text-success-foreground disabled:opacity-50"
              >
                {completing ? 'Envoi...' : 'Confirmer'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArtisanJobDetail;
