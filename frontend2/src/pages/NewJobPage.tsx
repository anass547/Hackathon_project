import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Upload, ArrowLeft, ArrowRight, MapPin, Sparkles, ChevronDown, PartyPopper } from 'lucide-react';
import { specialties, cities } from '@/lib/mockData';
import { Navbar } from '@/components/Navbar';
import { toast } from 'sonner';
import * as LucideIcons from 'lucide-react';
import api from '@/lib/api';


const SPECIALTY_DISPLAY: Record<string, { label: string; icon: string; color: string }> = {
  zlayji: { label: 'Carrelage & Zellige', icon: '🪟', color: '#f59e0b' },
  sebbagh: { label: 'Peinture', icon: '🎨', color: '#3b82f6' },
  gebbas: { label: 'Plâtre & Fissures', icon: '🏠', color: '#8b5cf6' },
  plombier: { label: 'Plomberie', icon: '🔧', color: '#06b6d4' },
  electricien: { label: 'Électricité', icon: '⚡', color: '#eab308' },
};

const steps = ['Problème', 'Analyse IA', 'Confirmation'];

const confidenceLabels: Record<string, string> = { high: 'Haute', medium: 'Moyenne', low: 'Faible' };
const complexityLabels: Record<string, string> = { simple: 'Simple', moyenne: 'Moyenne', complexe: 'Complexe' };

interface AiResult {
  problem_type: string;
  severity: number;
  price_min: number;
  price_max: number;
  duration_hours: number;
  confidence_level: string;
}

import { useAuthStore } from '@/store/authStore';

const NewJobPage = () => {
  const { user } = useAuthStore();
  const [step, setStep] = useState(0);

  // New Client Fields
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');

  const [clientComment, setClientComment] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [photos, setPhotos] = useState<string[]>([]);

  const [analyzing, setAnalyzing] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);
  const [aiResult, setAiResult] = useState<AiResult | null>(null);
  const [detectedProblemType, setDetectedProblemType] = useState<string>('');

  const [createdJobId, setCreatedJobId] = useState<number | null>(null);
  const [shouldShowOverride, setShouldShowOverride] = useState(false);

  const [city, setCity] = useState('Agadir');
  const [clientLocation] = useState({ lat: 30.4278, lng: -9.5981 });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPhotos([file.name]);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedFile) return;
    try {
      setAnalyzing(true);
      setStep(1); // Move to AI screen to show loader

      const formData = new FormData();
      formData.append('image', selectedFile);
      if (clientComment) {
        formData.append('description', clientComment);
      }
      formData.append('city', city);

      const analyzeRes = await api.post('/analyze-photo', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setAiResult(analyzeRes.data);
      setDetectedProblemType(analyzeRes.data.problem_type);
      setAnalyzed(true);
    } catch {
      toast.error('Erreur lors de l\'analyse. Veuillez réessayer.');
      setStep(0); // Go back if error
    } finally {
      setAnalyzing(false);
    }
  };

  const handleSubmit = async () => {
    if (!aiResult || !user) return;
    try {
      setSubmitting(true);
      const jobResponse = await api.post('/jobs', {
        client_id: user.id,
        problem_type: detectedProblemType,
        description: clientComment || '',
        city: city,
        severity: aiResult.severity,
        estimated_price_min_mad: aiResult.price_min,
        estimated_price_max_mad: aiResult.price_max,
        estimated_duration_hours: aiResult.duration_hours,
      });

      setCreatedJobId(jobResponse.data.id);
      await api.post('/match', {
        job_id: jobResponse.data.id,
        problem_type: detectedProblemType,
        latitude: clientLocation.lat,
        longitude: clientLocation.lng,
        city: city,
        severity: aiResult.severity
      });
      setSubmitted(true);
      toast.success('Demande soumise avec succès !');
    } catch {
      toast.error('Erreur lors de la soumission. Veuillez réessayer.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted && createdJobId) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            className="mb-8"
          >
            <div className="relative">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-success/10 mx-auto">
                <PartyPopper className="h-12 w-12 text-success" />
              </div>
              {[0, 1, 2].map((i) => (
                <div key={i} className="absolute inset-0 rounded-full border-2 border-success/30 animate-radar" style={{ animationDelay: `${i * 0.5}s` }} />
              ))}
            </div>
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-2xl font-extrabold text-foreground mb-3">
            Votre demande a été soumise !
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="text-muted-foreground mb-8 max-w-sm">
            Nous recherchons le meilleur artisan près de chez vous. Vous serez notifié dès qu'un artisan est assigné.
          </motion.p>
          <motion.button
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
            onClick={() => navigate('/client/dashboard')}
            className="rounded-xl bg-accent px-6 py-3 text-sm font-bold text-accent-foreground shadow-accent"
          >
            Retour au dashboard
          </motion.button>
          <motion.button
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
            onClick={() => navigate(`/client/jobs/${createdJobId}`)}
            className="mt-3 rounded-xl border border-border px-6 py-3 text-sm font-medium hover:bg-muted"
          >
            Voir ma demande
          </motion.button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Progress */}
        <div className="flex items-center justify-between mb-10">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-all ${i <= step ? 'bg-accent text-accent-foreground' : 'bg-muted text-muted-foreground'
                }`}>
                {i < step ? <Check className="h-4 w-4" /> : i + 1}
              </div>
              <span className={`text-sm font-medium hidden sm:block ${i <= step ? 'text-foreground' : 'text-muted-foreground'}`}>{s}</span>
              {i < steps.length - 1 && <div className={`w-8 md:w-16 h-0.5 ${i < step ? 'bg-accent' : 'bg-border'}`} />}
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div key="step0" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <h2 className="text-2xl font-extrabold text-foreground mb-2">Décrivez votre problème</h2>
              <p className="text-muted-foreground mb-8">Fournissez une photo pour que notre IA puisse diagnostiquer le problème.</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="text-sm font-medium mb-1 block">Nom complet (Optionnel)</label>
                  <input
                    type="text"
                    value={clientName}
                    onChange={e => setClientName(e.target.value)}
                    placeholder="Votre nom"
                    className="w-full rounded-xl border border-input bg-card p-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Téléphone (Optionnel)</label>
                  <input
                    type="text"
                    value={clientPhone}
                    onChange={e => setClientPhone(e.target.value)}
                    placeholder="+212600000000"
                    className="w-full rounded-xl border border-input bg-card p-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
                  />
                </div>
              </div>

              {/* Photo upload */}
              {photos.length === 0 ? (
                <label className="w-full rounded-2xl border-2 border-dashed border-border bg-muted/30 p-12 text-center hover:border-accent/50 hover:bg-accent/5 transition-all group cursor-pointer block">
                  <input type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
                  <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-3 group-hover:text-accent transition-colors" />
                  <p className="font-semibold text-foreground mb-1">Prenez une photo du problème</p>
                  <p className="text-sm text-muted-foreground">Notre IA va analyser et identifier le problème automatiquement.<br />JPG, PNG — max 10MB</p>
                </label>
              ) : (
                <div className="rounded-2xl border border-border bg-card p-4 mb-4 flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="h-16 w-16 rounded-xl bg-muted shimmer" />
                    <div>
                      <p className="font-medium text-sm text-foreground">{selectedFile?.name || 'photo'}</p>
                      <p className="text-xs text-success">Prêt pour l'analyse</p>
                    </div>
                  </div>
                  <button onClick={() => { setPhotos([]); setSelectedFile(null); }} className="text-sm text-destructive hover:underline">Retirer</button>
                </div>
              )}

              <textarea
                value={clientComment}
                onChange={(e) => setClientComment(e.target.value)}
                placeholder="Commentaire (optionnel) - Décrivez brièvement ce que vous observez..."
                className="w-full rounded-2xl border border-input bg-card p-4 text-sm resize-none h-24 focus:outline-none focus:ring-2 focus:ring-accent/50 mt-4 transition-all"
              />

              <div className="flex justify-end mt-8">
                <button
                  disabled={!selectedFile}
                  onClick={handleAnalyze}
                  className="inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3 text-sm font-bold text-accent-foreground shadow-accent disabled:opacity-50 transition-all"
                >
                  Analyser avec l'IA <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* AI Analysis Step (Step 1) */}
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <h2 className="text-2xl font-extrabold text-foreground mb-2">Analyse IA</h2>
              <p className="text-muted-foreground mb-8">Identification automatique du problème</p>

              {/* AI Analysis Loading State */}
              {analyzing ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded-2xl border border-accent/30 bg-accent/5 p-12 text-center h-64 flex flex-col justify-center items-center">
                  <Sparkles className="h-12 w-12 text-accent mx-auto mb-6 animate-pulse" />
                  <p className="font-bold text-foreground text-lg mb-2">Notre IA analyse votre photo...</p>
                  <p className="text-sm text-muted-foreground">Veuillez patienter quelques instants</p>
                </motion.div>
              ) : analyzed && aiResult ? (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                  {/* AI Result Card */}
                  <div className="rounded-2xl border-2 border-accent/20 bg-card overflow-hidden shadow-lg relative">
                    <div className="absolute top-4 right-4 bg-accent/10 text-accent text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                      <Sparkles className="h-3 w-3" /> Analyse IA
                    </div>

                    <div className="p-6 pb-0">
                      <p className="text-sm text-muted-foreground font-medium mb-3">Problème détecté :</p>

                      {/* Detected Specialty Hero block */}
                      <div className="flex items-center gap-4 mb-6 bg-muted/30 p-4 rounded-xl border border-border">
                        <div className="flex-shrink-0 flex items-center justify-center w-16 h-16 rounded-full" style={{ backgroundColor: `${SPECIALTY_DISPLAY[detectedProblemType]?.color}15` }}>
                          <span className="text-3xl">{SPECIALTY_DISPLAY[detectedProblemType]?.icon || '🔧'}</span>
                        </div>
                        <div>
                          <h3 className="text-2xl font-extrabold text-foreground">{SPECIALTY_DISPLAY[detectedProblemType]?.label || detectedProblemType}</h3>
                        </div>
                      </div>

                      <div className="space-y-4 mb-6 text-sm">
                        <div>
                          <span className="text-muted-foreground block mb-1">Description :</span>
                          <p className="text-foreground font-medium">{clientComment || 'Pas de commentaire'}</p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-muted/20 p-3 rounded-lg border border-border/50">
                            <div className="text-muted-foreground text-xs mb-1">Sévérité :</div>
                            <div className="flex gap-1">
                              {[1, 2, 3, 4, 5].map(i => (
                                <div key={i} className={`h-2 text-xs flex-1 rounded-full ${i <= aiResult.severity ? 'bg-destructive' : 'bg-muted'}`} />
                              ))}
                              <span className="text-xs ml-2 font-bold">{aiResult.severity}/5</span>
                            </div>
                          </div>
                          <div className="bg-muted/20 p-3 rounded-lg border border-border/50">
                            <div className="text-muted-foreground text-xs mb-1">Surface :</div>
                            <div className="font-bold text-foreground">Bientôt</div>
                          </div>
                          <div className="bg-muted/20 p-3 rounded-lg border border-border/50">
                            <div className="text-muted-foreground text-xs mb-1">Complexité :</div>
                            <div className="font-bold text-accent">Standard</div>
                          </div>
                          <div className="bg-muted/20 p-3 rounded-lg border border-border/50">
                            <div className="text-muted-foreground text-xs mb-1">Confiance IA :</div>
                            <div className="font-bold text-success flex items-center gap-1">
                              <Check className="h-3 w-3" />
                              {confidenceLabels[aiResult.confidence_level] || aiResult.confidence_level}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-accent/5 p-6 border-t border-accent/10 flex flex-col items-center text-center">
                      <p className="text-sm text-foreground font-semibold mb-1">Estimation de prix</p>
                      <p className="text-4xl font-extrabold text-[#c05621]">{Math.round(aiResult.price_min)} – {Math.round(aiResult.price_max)} <span className="text-xl">MAD</span></p>
                      <p className="text-sm text-muted-foreground mt-2">Durée estimée : ~{aiResult.duration_hours}h</p>
                    </div>
                  </div>

                  <div className="text-center mt-4">
                    <p className="text-xs text-muted-foreground mb-2">
                      L'IA a identifié ce problème automatiquement. Si cela ne correspond pas, vous pouvez modifier.
                    </p>
                    <button type="button" onClick={() => setShouldShowOverride(!shouldShowOverride)} className="text-sm text-accent hover:underline font-medium">
                      Modifier le type
                    </button>

                    {/* Specialty Override Dropdown */}
                    <AnimatePresence>
                      {shouldShowOverride && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mt-4 overflow-hidden">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
                            {specialties.map((s) => {
                              const Icon = (LucideIcons as any)[s.icon] || LucideIcons.Wrench;
                              return (
                                <button
                                  key={s.id}
                                  onClick={() => { setDetectedProblemType(s.id); setShouldShowOverride(false); }}
                                  className={`rounded-xl border p-3 flex items-center gap-3 transition-all ${detectedProblemType === s.id ? 'border-accent bg-accent/5 shadow-sm' : 'border-border bg-card'
                                    }`}
                                >
                                  <div className={`p-2 rounded-lg ${detectedProblemType === s.id ? 'bg-accent/10 text-accent' : 'bg-muted text-muted-foreground'}`}>
                                    <Icon className="h-4 w-4" />
                                  </div>
                                  <span className="font-semibold text-sm">{s.nameFr}</span>
                                </button>
                              )
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              ) : null}

              <div className="flex justify-between mt-8">
                <button type="button" onClick={() => setStep(0)} className="inline-flex items-center gap-2 rounded-xl border border-border px-5 py-3 text-sm font-medium hover:bg-muted transition-all">
                  <ArrowLeft className="h-4 w-4" /> Retour
                </button>
                <button
                  disabled={analyzing || !aiResult}
                  onClick={() => setStep(2)}
                  className="inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3 text-sm font-bold text-accent-foreground shadow-accent disabled:opacity-50 transition-all"
                >
                  Continuer <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* Confirmation Step (Step 2) */}
          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <h2 className="text-2xl font-extrabold text-foreground mb-2">Confirmation</h2>
              <p className="text-muted-foreground mb-8">Vérifiez les détails avant de soumettre</p>

              <div className="rounded-2xl border border-border bg-card p-6 space-y-5">
                <div className="flex justify-between items-center pb-4 border-b border-border">
                  <span className="text-sm text-muted-foreground">Type de service</span>
                  <span className="font-semibold text-foreground">{SPECIALTY_DISPLAY[detectedProblemType]?.label || detectedProblemType}</span>
                </div>
                <div className="pb-4 border-b border-border">
                  <span className="text-sm text-muted-foreground block mb-2">Description IA</span>
                  <p className="text-sm text-foreground">{aiResult?.description || '—'}</p>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-border">
                  <span className="text-sm text-muted-foreground">Estimation</span>
                  <span className="font-bold text-foreground text-lg">{aiResult ? `${Math.round(aiResult.price_min)} – ${Math.round(aiResult.price_max)} MAD` : '—'}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> Localisation</span>
                  <div className="relative">
                    <select value={city} onChange={e => setCity(e.target.value)} className="bg-card border border-input rounded-lg px-3 py-1.5 text-sm font-medium appearance-none pr-8 focus:outline-none focus:ring-2 focus:ring-accent/50">
                      {cities.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                    <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
                  </div>
                </div>
              </div>

              <div className="flex justify-between mt-8">
                <button type="button" onClick={() => setStep(1)} className="inline-flex items-center gap-2 rounded-xl border border-border px-5 py-3 text-sm font-medium hover:bg-muted transition-all">
                  <ArrowLeft className="h-4 w-4" /> Retour
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={submitting || !aiResult}
                  className="inline-flex items-center gap-2 rounded-xl bg-accent px-8 py-3 text-sm font-bold text-accent-foreground shadow-accent transition-all hover:opacity-90 disabled:opacity-50"
                >
                  {submitting ? 'Soumission...' : 'Confirmer ma demande'}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default NewJobPage;
