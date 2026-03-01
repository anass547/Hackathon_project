import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Wrench, User as UserIcon, HardHat, Mail, Lock, Phone, ChevronDown, Eye, EyeOff } from 'lucide-react';
import { useAuthStore, type UserRole, type User } from '@/store/authStore';
import { specialties, cities, cityCoords } from '@/lib/mockData';
import { toast } from 'sonner';
import zelligePattern from '@/assets/zellige-pattern.jpg';
import { supabase } from '@/lib/supabase';

const AuthPage = () => {
  const [searchParams] = useSearchParams();
  const [tab, setTab] = useState<'login' | 'register'>(searchParams.get('tab') === 'register' ? 'register' : 'login');
  const [role, setRole] = useState<UserRole | null>((searchParams.get('role') as UserRole) || null);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login, isAuthenticated, user } = useAuthStore();

  // Default to client when on register tab so the form is valid and city field is shown
  useEffect(() => {
    if (tab === 'register' && role === null) {
      setRole('client');
    }
  }, [tab, role]);

  useEffect(() => {
    if (isAuthenticated && user) {
      navigate(user.role === 'artisan' ? '/artisan/dashboard' : '/client/dashboard');
    }
  }, [isAuthenticated, user, navigate]);

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      if (tab === 'login') {
        const { error } = await supabase.auth.signInWithPassword({
          email: data.email,
          password: data.password,
        });

        if (error) throw error;
        toast.success('Connexion réussie !');
        // Navigation is handled natively by the authStore watcher in App.tsx -> redirecting upon auth state change
      } else {
        const payload: any = {
          full_name: data.name || data.email?.split('@')[0] || 'Utilisateur',
          // Note: our old code used 'worker' for DB role, but frontend2 uses 'artisan'
          role: role === 'artisan' ? 'worker' : 'client',
          phone: data.phone || null,
        };

        let coords = null;
        if (role === 'artisan') {
          payload.profession = data.specialty; // Backend uses 'profession' for specialty
          coords = cityCoords[data.city] || cityCoords['Agadir'];
          payload.city = coords.city;
        } else {
          coords = cityCoords[data.client_city || 'Agadir'] || cityCoords['Agadir'];
          payload.city = coords.city; // Map to city for clients too
        }

        // 1. Sign up user
        const { data: authData, error: authError } = await supabase.auth.signUp({
          email: data.email,
          password: data.password,
        });

        if (authError) throw authError;

        if (authData?.user) {
          // 2. Insert into profiles table
          const { error: profileError } = await supabase
            .from('profiles')
            .insert([{ id: authData.user.id, email: data.email, ...payload }]);

          if (profileError) {
            console.error("Profile insert failed", profileError);
            throw profileError;
          }

          if (role === 'artisan') {
            // Create artisan metadata row
            await supabase.from('artisans').insert([{
              id: authData.user.id,
              profession: payload.profession,
              city: payload.city,
              latitude: coords?.lat || 30.4278,
              longitude: coords?.lng || -9.5981
            }]);
          }

          toast.success('Compte créé avec succès !');
        }
      }
    } catch (err: any) {
      console.error(err);
      let msg = err.message || 'Erreur lors de l’inscription';
      if (err.message?.includes('Invalid login credentials')) {
        msg = 'Identifiants incorrects';
      }
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero" />
        <div className="absolute inset-0 opacity-[0.08] bg-cover bg-center" style={{ backgroundImage: `url(${zelligePattern})` }} />
        <div className="relative flex flex-col items-center justify-center p-12 text-center w-full">
          <div className="flex items-center gap-3 mb-8">
            <img src="/image_12.png" alt="L'M3alem Logo" className="h-20 w-auto brightness-0 invert" />
            <span className="text-3xl font-extrabold text-white">L'M3alem</span>
          </div>
          <h2 className="text-2xl font-bold text-primary-foreground/90 mb-4 max-w-md">
            La plateforme qui connecte les artisans de Souss-Massa avec ceux qui ont besoin d'eux
          </h2>
          <p className="text-primary-foreground/50 max-w-sm">
            Intelligence artificielle • Matching intelligent • Garantie 48h
          </p>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12 bg-background">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center justify-center gap-2 mb-8">
            <img src="/image_12.png" alt="L'M3alem Logo" className="h-12 w-auto brightness-0 invert" />
            <span className="text-xl font-extrabold text-foreground">L'M3alem</span>
          </div>

          {/* Tab toggle */}
          <div className="flex rounded-xl bg-muted p-1 mb-8">
            {(['login', 'register'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${tab === t ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground'
                  }`}
              >
                {t === 'login' ? 'Connexion' : 'Inscription'}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, x: tab === 'login' ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: tab === 'login' ? 20 : -20 }}
              transition={{ duration: 0.2 }}
            >
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {tab === 'register' && (
                  <>
                    <div className="space-y-3">
                      <label className="text-sm font-semibold text-foreground">Je suis :</label>
                      <div className="grid grid-cols-2 gap-3">
                        {[
                          { value: 'client' as UserRole, icon: UserIcon, label: 'Client', desc: 'Je cherche un artisan' },
                          { value: 'artisan' as UserRole, icon: HardHat, label: 'Artisan', desc: 'Je propose mes services' },
                        ].map((r) => (
                          <button
                            key={r.value}
                            type="button"
                            onClick={() => setRole(r.value)}
                            className={`rounded-xl border-2 p-4 text-left transition-all ${role === r.value
                              ? 'border-accent bg-accent/5 shadow-sm'
                              : 'border-border hover:border-muted-foreground/30'
                              }`}
                          >
                            <r.icon className={`h-6 w-6 mb-2 ${role === r.value ? 'text-accent' : 'text-muted-foreground'}`} />
                            <p className="font-bold text-sm text-foreground">{r.label}</p>
                            <p className="text-xs text-muted-foreground">{r.desc}</p>
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">Nom complet</label>
                      <input
                        {...register('name', { required: tab === 'register' ? 'Requis' : false })}
                        className="w-full rounded-xl border border-input bg-card px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all"
                        placeholder="Votre nom complet"
                      />
                    </div>
                    {role === 'client' && (
                      <div>
                        <label className="text-sm font-medium text-foreground mb-1.5 block">Ville</label>
                        <div className="relative">
                          <select
                            {...register('client_city')}
                            className="w-full rounded-xl border border-input bg-card px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 appearance-none transition-all"
                          >
                            {cities.map((c) => (
                              <option key={c} value={c}>{c}</option>
                            ))}
                          </select>
                          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                        </div>
                      </div>
                    )}
                  </>
                )}

                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                      {...register('email', { required: 'Requis' })}
                      type="email"
                      className="w-full rounded-xl border border-input bg-card pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all"
                      placeholder="votre@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Mot de passe</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                      {...register('password', { required: 'Requis' })}
                      type={showPassword ? 'text' : 'password'}
                      className="w-full rounded-xl border border-input bg-card pl-10 pr-12 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all"
                      placeholder="••••••••"
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                {tab === 'register' && role === 'artisan' && (
                  <>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">Spécialité</label>
                      <div className="relative">
                        <select
                          {...register('specialty', { required: role === 'artisan' ? 'Requis' : false })}
                          className="w-full rounded-xl border border-input bg-card px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 appearance-none transition-all"
                        >
                          <option value="">Choisir une spécialité</option>
                          {specialties.map((s) => (
                            <option key={s.id} value={s.id}>{s.name} — {s.nameFr}</option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">Ville</label>
                      <div className="relative">
                        <select
                          {...register('city', { required: role === 'artisan' ? 'Requis' : false })}
                          className="w-full rounded-xl border border-input bg-card px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 appearance-none transition-all"
                        >
                          <option value="">Choisir une ville</option>
                          {cities.map((c) => (
                            <option key={c} value={c}>{c}</option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">Téléphone</label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <input
                          {...register('phone')}
                          type="tel"
                          className="w-full rounded-xl border border-input bg-card pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all"
                          placeholder="+212 6XX XX XX XX"
                        />
                      </div>
                    </div>
                  </>
                )}

                <button
                  type="submit"
                  disabled={loading || (tab === 'register' && !role)}
                  className="w-full rounded-xl bg-accent py-3.5 text-sm font-bold text-accent-foreground shadow-accent hover:opacity-90 disabled:opacity-50 transition-all"
                >
                  {loading ? (
                    <span className="inline-flex items-center gap-2">
                      <span className="h-4 w-4 border-2 border-accent-foreground/30 border-t-accent-foreground rounded-full animate-spin" />
                      Chargement...
                    </span>
                  ) : tab === 'login' ? 'Se connecter' : "Créer mon compte"}
                </button>
              </form>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
