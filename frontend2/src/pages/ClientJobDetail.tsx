import { useEffect, useState, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Phone, Star, Shield, AlertTriangle } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { StatusBadge } from '@/components/StatusBadge';
import { LevelBadge } from '@/components/LevelBadge';
import { specialties, cityCoords } from '@/lib/mockData';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import api from '@/lib/api';
import { toast } from 'sonner';

// Fix Leaflet marker icon issue
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

interface Job {
  id: string;
  client_id: string;
  artisan_id: string | null;
  problem_type: string;
  symptom: string | null;
  photo_url: string | null;
  ai_description: string | null;
  severity: number | null;
  surface_area_m2: number | null;
  complexity: string | null;
  estimated_price_min: number | null;
  estimated_price_max: number | null;
  final_price: number | null;
  estimated_duration_hours: number | null;
  status: string;
  created_at: string;
  started_at: string | null;
  completed_at: string | null;
}

interface ArtisanInfo {
  id: string;
  full_name: string | null;
  phone: string | null;
  city: string;
  latitude?: number | null;
  longitude?: number | null;
  stats?: {
    global_score: number;
    total_jobs: number;
  } | null;
}

function getArtisanLevel(score: number, totalJobs: number): string {
  if (score >= 90 && totalJobs >= 50) return 'maalem';
  if (score >= 75 && totalJobs >= 20) return 'maitre';
  if (score >= 60 && totalJobs >= 5) return 'compagnon';
  return 'apprenti';
}

const ClientJobDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [job, setJob] = useState<Job | null>(null);
  const [artisan, setArtisan] = useState<ArtisanInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [complaintText, setComplaintText] = useState('');
  const [complaintPhotoUrl, setComplaintPhotoUrl] = useState('');
  const [submittingClaim, setSubmittingClaim] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submittingRating, setSubmittingRating] = useState(false);
  const [claimSubmitted, setClaimSubmitted] = useState(false);
  const [ratingSubmitted, setRatingSubmitted] = useState(false);

  const fetchJob = useCallback(async () => {
    if (!id) return;
    try {
      const response = await api.get(`/jobs/${id}`);
      setJob(response.data);
      return response.data as Job;
    } catch {
      toast.error('Erreur lors du chargement');
      setJob(null);
      return null;
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchJob();
  }, [fetchJob]);

  useEffect(() => {
    if (!job?.artisan_id) return;
    api.get(`/artisans/${job.artisan_id}`)
      .then((res) => setArtisan(res.data))
      .catch(() => setArtisan(null));
  }, [job?.artisan_id]);

  useEffect(() => {
    if (!id || !job) return;
    const isPending = job.status === 'pending' || job.status === 'matching';
    if (!isPending) return;
    const interval = setInterval(fetchJob, 15000);
    return () => clearInterval(interval);
  }, [id, job?.status, fetchJob]);

  const handleClaim = async () => {
    if (!id) return;
    try {
      setSubmittingClaim(true);
      await api.post(`/jobs/${id}/claim`, null, {
        params: {
          complaint_text: complaintText || undefined,
          complaint_photo_url: complaintPhotoUrl || undefined,
        },
      });
      toast.success('Réclamation soumise avec succès');
      setClaimSubmitted(true);
      fetchJob();
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { detail?: string } } })?.response?.data?.detail;
      toast.error(msg || 'Erreur lors de la soumission de la réclamation');
    } finally {
      setSubmittingClaim(false);
    }
  };

  const handleRate = async () => {
    if (!id || rating < 1) return;
    try {
      setSubmittingRating(true);
      await api.post('/ratings', {
        job_id: Number(id),
        score: rating,
        comment: comment || undefined,
      });
      toast.success('Merci pour votre avis !');
      setRatingSubmitted(true);
      fetchJob();
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { detail?: string } } })?.response?.data?.detail;
      toast.error(msg || 'Erreur lors de la soumission de l\'avis');
    } finally {
      setSubmittingRating(false);
    }
  };

  if (loading && !job) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-8 max-w-2xl">
          <div className="h-6 w-48 rounded bg-muted animate-pulse mb-6" />
          <div className="h-10 w-full rounded-2xl bg-muted animate-pulse mb-6" />
          <div className="rounded-2xl border border-border bg-card p-6 space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-8 rounded bg-muted animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-8 max-w-2xl text-center">
          <p className="text-muted-foreground">Demande introuvable.</p>
          <Link to="/client/dashboard" className="text-accent font-semibold mt-2 inline-block">Retour au dashboard</Link>
        </div>
      </div>
    );
  }

  const specialtyLabel = specialties.find(s => s.id === job.problem_type)?.nameFr || job.problem_type;
  const title = job.ai_description ? job.ai_description.slice(0, 60) + (job.ai_description.length > 60 ? '…' : '') : specialtyLabel;
  const dateStr = job.created_at ? new Date(job.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' }) : '';
  const priceStr = job.final_price != null
    ? `${Math.round(job.final_price)} MAD`
    : (job.estimated_price_min != null && job.estimated_price_max != null)
      ? `${Math.round(job.estimated_price_min)} – ${Math.round(job.estimated_price_max)} MAD`
      : '—';

  const timeline = [
    { label: 'Demande soumise', done: true, date: dateStr },
    { label: 'Artisan trouvé', done: !!job.artisan_id, date: job.artisan_id ? dateStr : undefined },
    { label: 'Service en cours', done: ['in_progress', 'completed'].includes(job.status), date: job.started_at ? new Date(job.started_at).toLocaleDateString('fr-FR') : undefined },
    { label: 'Terminé', done: job.status === 'completed', date: job.completed_at ? new Date(job.completed_at).toLocaleDateString('fr-FR') : undefined },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Link to="/client/dashboard" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
          <ArrowLeft className="h-4 w-4" /> Retour au dashboard
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-extrabold text-foreground mb-1">{title}</h1>
              <p className="text-sm text-muted-foreground">{dateStr} • {priceStr}</p>
            </div>
            <StatusBadge status={job.status} />
          </div>

          {/* Timeline */}
          <div className="rounded-2xl border border-border bg-card p-6 mb-6">
            <h3 className="font-bold text-foreground mb-5">Progression</h3>
            <div className="space-y-0">
              {timeline.map((t, i) => (
                <div key={t.label} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className={`flex h-8 w-8 items-center justify-center rounded-full border-2 ${t.done ? 'border-success bg-success/10' : 'border-border'}`}>
                      {t.done ? <span className="text-success text-sm">✓</span> : <span className="h-2 w-2 rounded-full bg-border" />}
                    </div>
                    {i < timeline.length - 1 && <div className={`w-0.5 h-8 ${t.done ? 'bg-success/30' : 'bg-border'}`} />}
                  </div>
                  <div className="pb-6">
                    <p className={`font-medium text-sm ${t.done ? 'text-foreground' : 'text-muted-foreground'}`}>{t.label}</p>
                    {t.date && <p className="text-xs text-muted-foreground">{t.date}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Artisan card */}
          {job.artisan_id && artisan && (
            <div className="rounded-2xl border border-border bg-card p-6 mb-6">
              <h3 className="font-bold text-foreground mb-4">Artisan assigné</h3>
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-lg">
                  {(artisan.full_name || 'A').charAt(0)}
                </div>
                <div className="flex-1">
                  <p className="font-bold text-foreground">{artisan.full_name || 'Artisan'}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <LevelBadge level={getArtisanLevel(artisan.stats?.global_score || 0, artisan.stats?.total_jobs || 0)} />
                    <span className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Star className="h-3.5 w-3.5 fill-warning text-warning" /> {artisan.stats?.global_score?.toFixed(1) ?? '—'}
                    </span>
                  </div>
                </div>
                {artisan.phone && (
                  <a href={`tel:${artisan.phone}`} className="flex h-10 w-10 items-center justify-center rounded-xl bg-success/10 text-success hover:bg-success/20 transition-colors">
                    <Phone className="h-4 w-4" />
                  </a>
                )}
              </div>

              {/* Artisan Map */}
              <div className="mt-6 h-48 rounded-2xl overflow-hidden border border-border">
                {(() => {
                  const coords = artisan.city ? cityCoords[artisan.city] : null;
                  const lat = artisan.latitude || coords?.lat;
                  const lng = artisan.longitude || coords?.lng;

                  if (lat && lng) {
                    return (
                      <MapContainer
                        center={[lat, lng]}
                        zoom={13}
                        scrollWheelZoom={false}
                        style={{ height: '100%', width: '100%' }}
                      >
                        <TileLayer
                          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                        />
                        <Marker position={[lat, lng]}>
                          <Popup>
                            Position actuelle de l'artisan: {artisan.full_name}
                          </Popup>
                        </Marker>
                      </MapContainer>
                    );
                  }
                  return (
                    <div className="flex items-center justify-center h-full bg-muted/20">
                      <p className="text-xs text-muted-foreground italic">Position de l'artisan indisponible</p>
                    </div>
                  );
                })()}
              </div>
            </div>
          )}

          {/* Guarantee */}
          {job.status === 'completed' && (
            <div className="rounded-2xl border border-status-guarantee/30 bg-status-guarantee/5 p-6 mb-6">
              <div className="flex items-center gap-3 mb-3">
                <Shield className="h-5 w-5 text-status-guarantee" />
                <span className="font-bold text-foreground">Garantie 48h active</span>
              </div>
              <p className="text-sm text-muted-foreground mb-4">Vous avez 48h pour signaler tout problème avec l'intervention.</p>
              {!claimSubmitted && (
                <div className="flex flex-col gap-3">
                  <textarea
                    value={complaintText}
                    onChange={(e) => setComplaintText(e.target.value)}
                    placeholder="Décrivez le problème..."
                    className="w-full rounded-xl border border-input bg-background p-3 text-sm resize-none h-20 focus:outline-none focus:ring-2 focus:ring-accent/50"
                  />
                  <input
                    type="text"
                    value={complaintPhotoUrl}
                    onChange={(e) => setComplaintPhotoUrl(e.target.value)}
                    placeholder="URL photo (optionnel)"
                    className="w-full rounded-xl border border-input bg-background p-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
                  />
                  <button
                    onClick={handleClaim}
                    disabled={submittingClaim}
                    className="rounded-xl bg-status-guarantee/10 border border-status-guarantee/30 px-4 py-2 text-sm font-semibold text-status-guarantee hover:bg-status-guarantee/20 transition-colors flex items-center gap-2 w-fit disabled:opacity-50"
                  >
                    <AlertTriangle className="h-4 w-4" /> {submittingClaim ? 'Envoi...' : 'Signaler un problème'}
                  </button>
                </div>
              )}
              {claimSubmitted && <p className="text-sm text-success">Réclamation enregistrée.</p>}
            </div>
          )}

          {/* Rating */}
          {job.status === 'completed' && (
            <div className="rounded-2xl border border-border bg-card p-6">
              <h3 className="font-bold text-foreground mb-4">Évaluer le service</h3>
              {ratingSubmitted ? (
                <p className="text-sm text-success">Merci pour votre avis !</p>
              ) : (
                <>
                  <div className="flex gap-2 mb-4">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <button
                        key={n}
                        type="button"
                        onClick={() => setRating(n)}
                        className="transition-colors"
                      >
                        <Star className={`h-8 w-8 ${rating >= n ? 'fill-warning text-warning' : 'text-muted-foreground hover:text-warning'}`} />
                      </button>
                    ))}
                  </div>
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Laissez un commentaire..."
                    className="w-full rounded-xl border border-input bg-background p-3 text-sm resize-none h-20 focus:outline-none focus:ring-2 focus:ring-accent/50"
                  />
                  <button
                    onClick={handleRate}
                    disabled={submittingRating || rating < 1}
                    className="mt-3 rounded-xl bg-accent px-5 py-2.5 text-sm font-bold text-accent-foreground shadow-accent disabled:opacity-50"
                  >
                    {submittingRating ? 'Envoi...' : 'Envoyer'}
                  </button>
                </>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ClientJobDetail;
