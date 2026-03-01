import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Star, CheckCircle2, DollarSign, ToggleLeft, ToggleRight,
  MapPin, Clock, Phone, ArrowRight, Check, X,
  User, Briefcase, Info, Navigation
} from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix Leaflet icon issue
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

import { useAuthStore } from '@/store/authStore';
import { Navbar } from '@/components/Navbar';
import { StatusBadge } from '@/components/StatusBadge';
import { LevelBadge } from '@/components/LevelBadge';
import { specialties, cityCoords } from '@/lib/mockData';
import { toast } from 'sonner';
import api from '@/lib/api';
import { supabase } from '@/lib/supabase';

interface Job {
  id: number;
  problem_type: string;
  ai_description: string | null;
  symptom: string | null;
  status: string;
  artisan_id: string | null;
  estimated_price_min: number | null;
  estimated_price_max: number | null;
  final_price: number | null;
  created_at: string;
  client_id: string;
  latitude: number | null;
  longitude: number | null;
  city: string | null;
}

interface ArtisanProfile {
  id: string;
  full_name: string | null;
  specialty: string;
  city: string;
  is_available: boolean;
  ranking_score: number;
  total_jobs: number;
  savings: number;
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.4 } }),
};

const ArtisanDashboard = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<ArtisanProfile | null>(null);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [available, setAvailable] = useState(true);
  const [togglingAvailability, setTogglingAvailability] = useState(false);
  const [clientsCache, setClientsCache] = useState<Record<string, any>>({});

  const fetchClientProfile = async (clientId: string) => {
    if (!clientId || clientsCache[clientId]) return;
    try {
      const { data, error } = await supabase.from('profiles').select('*').eq('id', clientId).single();
      if (error) throw error;
      if (data) {
        setClientsCache(prev => ({ ...prev, [clientId]: data }));
      }
    } catch (err) {
      console.error("Failed to fetch client profile", err);
    }
  };

  const fetchDashboard = useCallback(async () => {
    if (!user?.id) return;
    try {
      setLoading(true);
      // Fetch the artisan profile using user_id from auth session
      const profileRes = await api.get('/artisans/me', { params: { user_id: user.id } });
      const artisanProfile = profileRes.data;

      setProfile(artisanProfile);
      setAvailable(artisanProfile.is_available);

      // Fetch jobs using the artisan's specific record ID
      const jobsRes = await api.get('/jobs', { params: { artisan_id: artisanProfile.id } });
      const allJobs = jobsRes.data || [];
      setJobs(allJobs as Job[]);

      // Pre-fetch clients for active jobs
      allJobs.forEach((j: Job) => {
        if (j.status === 'accepted' && j.client_id) {
          fetchClientProfile(j.client_id);
        }
      });
    } catch (err) {
      console.error(err);
      toast.error('Erreur lors du chargement du tableau de bord');
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  useEffect(() => {
    if (!user?.id || !profile?.id) return;

    const channel = supabase
      .channel('artisan-updates')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'jobs', filter: `artisan_id=eq.${profile.id}` }, (payload) => {
        if (payload.eventType === 'INSERT') {
          setJobs(prev => [payload.new as Job, ...prev]);
        } else if (payload.eventType === 'UPDATE') {
          setJobs(prev => prev.map(j => j.id === payload.new.id ? { ...j, ...payload.new as Job } : j));
          if (payload.new.status === 'accepted' && payload.new.client_id) {
            fetchClientProfile(payload.new.client_id);
          }
        } else if (payload.eventType === 'DELETE') {
          setJobs(prev => prev.filter(j => j.id !== payload.old.id));
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user?.id, profile?.id]);

  const toggleAvailability = async () => {
    if (!profile) return;
    const newVal = !available;
    try {
      setTogglingAvailability(true);
      await api.patch(`/artisans/${profile.id}`, { is_available: newVal });
      setAvailable(newVal);
      toast.success(newVal ? 'Vous êtes maintenant disponible' : 'Vous êtes maintenant indisponible');
    } catch {
      toast.error('Erreur lors de la mise à jour du statut');
    } finally {
      setTogglingAvailability(false);
    }
  };

  const handleAccept = async (jobId: number) => {
    if (!profile?.id) return;
    try {
      await api.post(`/jobs/${jobId}/accept`, null, { params: { artisan_id: profile.id } });
      toast.success('Mission acceptée !');
      // No need to navigate, state will update via fetch or realtime
    } catch (err) {
      toast.error('Erreur lors de l\'acceptation');
    }
  };

  const handleRefuse = async (jobId: number) => {
    if (!profile?.id) return;
    try {
      // Logic: Round Robin - artisan_id -> null, status -> rejected_by_artisan (or requested to re-match)
      // For this implementation, we use a custom status if allowed, or reset it
      await api.post(`/jobs/${jobId}/refuse`, null, { params: { artisan_id: profile.id } });
      toast.success('Mission refusée');
      setJobs(prev => prev.filter(j => j.id !== jobId));
    } catch (err) {
      toast.error('Erreur lors du refus');
    }
  };

  const handleComplete = async (jobId: number) => {
    try {
      await api.post(`/jobs/${jobId}/complete`, { after_photo_urls: [] });
      toast.success('Mission terminée avec succès !');
      fetchDashboard();
    } catch (err) {
      toast.error('Erreur lors de la validation');
    }
  };

  const pendingMissions = jobs.filter(j => j.status === 'pending');
  const activeMissions = jobs.filter(j => j.status === 'accepted' || j.status === 'in_progress');

  if (loading && !profile) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-8 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7]">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        {/* Profile Header */}
        <motion.div
          initial="hidden" animate="visible" variants={fadeUp} custom={0}
          className="rounded-3xl bg-white p-6 mb-8 shadow-card border border-border"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="relative">
                <div className="h-20 w-20 rounded-full bg-primary flex items-center justify-center text-white text-3xl font-black">
                  {profile?.full_name?.charAt(0) || user?.name?.charAt(0) || 'A'}
                </div>
                <div className="absolute -bottom-2 -right-2">
                  <LevelBadge level="maalem" />
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-black text-[#2B2D42]">{profile?.full_name || user?.name}</h1>
                <p className="text-[#2B2D42]/60 font-medium">
                  {specialties.find(s => s.id === profile?.specialty)?.nameFr || 'Artisan Qualifié'} • {profile?.city || 'Agadir'}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <Star className="h-4 w-4 text-warning fill-warning" />
                  <span className="text-sm font-bold">{profile?.ranking_score || 0}/100</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center gap-3">
              <button
                onClick={toggleAvailability}
                disabled={togglingAvailability}
                className={`flex items-center gap-3 rounded-2xl px-6 py-4 font-bold text-sm transition-all ${available
                  ? 'bg-[#2A9D8F]/10 text-[#2A9D8F] border border-[#2A9D8F]/30'
                  : 'bg-muted text-muted-foreground border border-border'
                  }`}
              >
                {available ? <ToggleRight className="h-6 w-6" /> : <ToggleLeft className="h-6 w-6" />}
                {available ? 'JE SUIS DISPONIBLE' : 'EN PAUSE'}
              </button>
            </div>
          </div>
        </motion.div>

        {/* Pending Missions (Privacy by Design) */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-xl font-black text-[#2B2D42] tracking-tight">Missions en attente</h2>
            <span className="px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-black">
              {pendingMissions.length} NOUVELLES
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AnimatePresence mode="popLayout">
              {pendingMissions.map((job, idx) => {
                const spec = specialties.find(s => s.id === job.problem_type);
                return (
                  <motion.div
                    key={job.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3 }}
                    className="rounded-3xl bg-white border border-border shadow-card p-6 overflow-hidden relative"
                  >
                    <div className="absolute top-0 right-0 p-4 opacity-5">
                      <Briefcase className="h-24 w-24" />
                    </div>

                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-2xl bg-accent/10 flex items-center justify-center text-2xl">
                          {spec?.icon ? <img src={spec.icon} className="h-6 w-6" alt="" /> : '🛠️'}
                        </div>
                        <div>
                          <p className="font-black text-[#2B2D42]">{spec?.nameFr || job.problem_type}</p>
                          <p className="text-xs text-[#2B2D42]/60 flex items-center gap-1">
                            <MapPin className="h-3 w-3" /> {job.city || 'Souss-Massa'} (Zone Générale)
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-black text-[#c05621]">{job.estimated_price_min} - {job.estimated_price_max} MAD</p>
                        <p className="text-[10px] text-muted-foreground uppercase font-black">Estimation</p>
                      </div>
                    </div>

                    <div className="bg-muted/30 rounded-2xl p-4 mb-6">
                      <p className="text-sm text-[#2B2D42]/80 leading-relaxed italic">
                        "{job.ai_description || job.symptom || 'Aucune description disponible'}"
                      </p>
                    </div>

                    <div className="flex items-center gap-6 mb-8 text-sm">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="font-bold">45 min</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Navigation className="h-4 w-4 text-muted-foreground" />
                        <span className="font-bold">Confidentialité Active</span>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <button
                        onClick={() => handleAccept(job.id)}
                        className="flex-1 bg-[#2A9D8F] text-white py-4 rounded-2xl font-black text-sm shadow-lg hover:opacity-90 transition-all flex items-center justify-center gap-2"
                      >
                        <Check className="h-5 w-5" /> ACCEPTER
                      </button>
                      <button
                        onClick={() => handleRefuse(job.id)}
                        className="flex-1 bg-[#722F37] text-white py-4 rounded-2xl font-black text-sm shadow-lg hover:opacity-90 transition-all flex items-center justify-center gap-2"
                      >
                        <X className="h-5 w-5" /> REFUSER
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>

            {pendingMissions.length === 0 && (
              <div className="col-span-full py-12 text-center bg-white/50 rounded-3xl border border-dashed border-border">
                <p className="text-[#2B2D42]/40 font-bold">Aucune nouvelle mission pour le moment.</p>
              </div>
            )}
          </div>
        </div>

        {/* Active Missions (PII Revealed) */}
        <div>
          <h2 className="text-xl font-black text-[#2B2D42] tracking-tight mb-6">Missions en cours</h2>

          <div className="space-y-6">
            {activeMissions.map((job) => {
              const client = clientsCache[job.client_id];
              return (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-3xl bg-white border-2 border-[#2A9D8F]/20 shadow-xl overflow-hidden"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2">
                    {/* Mission Details */}
                    <div className="p-8">
                      <div className="flex justify-between items-center mb-6">
                        <StatusBadge status={job.status} />
                      </div>

                      <div className="mb-8">
                        <h3 className="text-[10px] font-black text-muted-foreground uppercase tracking-wider mb-4 border-b pb-2">Données Client Déverrouillées</h3>
                        <div className="flex items-center gap-4 mb-6">
                          <div className="h-14 w-14 rounded-full bg-[#2B2D42]/10 flex items-center justify-center text-2xl">
                            <User className="h-6 w-6 text-[#2B2D42]" />
                          </div>
                          <div>
                            <p className="text-lg font-black text-[#2B2D42]">{client?.full_name || 'Chargement...'}</p>
                            <a
                              href={`tel:${client?.phone}`}
                              className="text-[#2A9D8F] font-bold text-sm flex items-center gap-2 group"
                            >
                              <Phone className="h-4 w-4 group-hover:animate-bounce" /> {client?.phone || '...'}
                            </a>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4 mb-8">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-lg bg-muted flex items-center justify-center">
                            <MapPin className="h-4 w-4 text-[#2B2D42]/60" />
                          </div>
                          <p className="text-sm font-bold text-[#2B2D42]">{job.city} • Coordonnées exactes</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-lg bg-muted flex items-center justify-center">
                            <DollarSign className="h-4 w-4 text-[#2A9D8F]" />
                          </div>
                          <p className="text-sm font-bold text-[#2B2D42]">Revenu estimé : {job.estimated_price_min} MAD</p>
                        </div>
                      </div>

                      <button
                        onClick={() => handleComplete(job.id)}
                        className="w-full bg-[#B22222] text-white py-5 rounded-2xl font-black tracking-widest hover:opacity-90 shadow-lg transition-all"
                      >
                        TERMINER LA MISSION
                      </button>
                    </div>

                    {/* Leaflet Map */}
                    <div className="h-[400px] md:h-auto min-h-[300px] relative border-l border-border">
                      {(() => {
                        const coords = job.city ? cityCoords[job.city] : null;
                        const lat = coords?.lat || job.latitude;
                        const lng = coords?.lng || job.longitude;

                        if (lat && lng) {
                          return (
                            <MapContainer
                              center={[lat, lng]}
                              zoom={15}
                              scrollWheelZoom={false}
                              style={{ height: '100%', width: '100%' }}
                            >
                              <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                              />
                              <Marker position={[lat, lng]}>
                                <Popup>
                                  Lieu de l'intervention: {job.city}
                                </Popup>
                              </Marker>
                            </MapContainer>
                          );
                        }

                        return (
                          <div className="flex items-center justify-center h-full bg-muted/20">
                            <p className="text-sm text-muted-foreground italic flex items-center gap-2">
                              <Info className="h-4 w-4" /> Position GPS non disponible
                            </p>
                          </div>
                        );
                      })()}
                    </div>
                  </div>
                </motion.div>
              );
            })}

            {activeMissions.length === 0 && (
              <div className="py-12 text-center bg-white rounded-3xl border border-border shadow-sm">
                <p className="text-[#2B2D42]/40 font-bold">Aucune mission active.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtisanDashboard;
