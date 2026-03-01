import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Camera, Users, ShieldCheck, Star, ArrowRight, Wrench, MapPin, Clock } from 'lucide-react';
import { mockTestimonials } from '@/lib/mockData';
import { Navbar } from '@/components/Navbar';
import zelligePattern from '@/assets/zellige-pattern.jpg';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.6, ease: 'easeOut' } }),
};

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero" />
        <div
          className="absolute inset-0 opacity-[0.07] bg-cover bg-center"
          style={{ backgroundImage: `url(${zelligePattern})` }}
        />
        <div className="relative container mx-auto px-4 py-20 md:py-32">
          <motion.div
            initial="hidden"
            animate="visible"
            className="max-w-3xl mx-auto text-center"
          >
            <motion.div variants={fadeUp} custom={0} className="inline-flex items-center gap-3 rounded-full border border-white/40 bg-white/15 px-5 py-2 mb-8 backdrop-blur-md shadow-[0_0_15px_rgba(255,255,255,0.2)]">
              <span className="h-2 w-2 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)] animate-pulse" />
              <span className="text-sm font-bold text-white tracking-widest uppercase">Propulsé par l'Intelligence Artificielle</span>
            </motion.div>

            <motion.h1 variants={fadeUp} custom={1} className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight mb-8 drop-shadow-2xl tracking-tighter">
              Trouvez le bon artisan en moins de 24h
            </motion.h1>

            <motion.p variants={fadeUp} custom={2} className="text-lg md:text-2xl text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed font-light drop-shadow-lg">
              L'M3alem AI connecte les artisans qualifiés de Souss-Massa avec les clients
              qui ont besoin d'eux — grâce à l'intelligence artificielle.
            </motion.p>

            <motion.div variants={fadeUp} custom={3} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/auth?tab=register&role=client"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-8 py-4 text-base font-bold text-accent-foreground shadow-accent hover:opacity-90 transition-all group"
              >
                J'ai besoin d'un artisan
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/auth?tab=register&role=artisan"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary-foreground/10 border border-primary-foreground/20 px-8 py-4 text-base font-bold text-primary-foreground backdrop-blur-sm hover:bg-primary-foreground/20 transition-all"
              >
                Je suis artisan
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <motion.h2 variants={fadeUp} custom={0} className="text-3xl md:text-4xl font-extrabold text-foreground mb-4">
              Comment ça marche ?
            </motion.h2>
            <motion.p variants={fadeUp} custom={1} className="text-muted-foreground text-lg max-w-lg mx-auto">
              Trois étapes simples pour résoudre votre problème
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid md:grid-cols-3 gap-8"
          >
            {[
              { icon: Camera, step: '01', title: 'Décrivez votre problème', desc: 'Prenez une photo et laissez notre IA analyser le problème automatiquement.' },
              { icon: Users, step: '02', title: "On trouve l'artisan parfait", desc: 'Notre algorithme de matching trouve le meilleur artisan disponible près de chez vous.' },
              { icon: ShieldCheck, step: '03', title: 'Service garanti 48h', desc: "Chaque intervention est couverte par notre garantie de satisfaction de 48 heures." },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                variants={fadeUp}
                custom={i}
                className="relative group"
              >
                <div className="rounded-2xl border border-border bg-card p-8 shadow-card hover:shadow-card-hover transition-all duration-300 h-full">
                  <div className="flex items-center gap-4 mb-5">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10">
                      <item.icon className="h-6 w-6 text-accent" />
                    </div>
                    <span className="text-5xl font-extrabold text-muted/80">{item.step}</span>
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 border-y border-border bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              { icon: Users, value: '150 000+', label: 'Artisans au Maroc' },
              { icon: MapPin, value: 'Souss-Massa', label: 'Région couverte' },
              { icon: Clock, value: '48h', label: 'Garantie de satisfaction' },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col items-center gap-2">
                <stat.icon className="h-6 w-6 text-accent mb-1" />
                <span className="text-3xl font-extrabold text-foreground">{stat.value}</span>
                <span className="text-sm text-muted-foreground font-medium">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.h2 variants={fadeUp} custom={0} className="text-3xl md:text-4xl font-extrabold text-foreground mb-4">
              Ils nous font confiance
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {mockTestimonials.map((t, i) => (
              <motion.div key={t.name} variants={fadeUp} custom={i} className="rounded-2xl border border-border bg-card p-8 shadow-card">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-warning text-warning" />
                  ))}
                </div>
                <p className="text-foreground mb-6 leading-relaxed">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 text-accent font-bold text-sm">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-foreground">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.city}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-primary py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent">
              <Wrench className="h-5 w-5 text-accent-foreground" />
            </div>
            <span className="text-lg font-extrabold text-primary-foreground">
              L'M3alem <span className="text-accent">AI</span>
            </span>
          </div>
          <p className="text-primary-foreground/60 max-w-xl mx-auto mb-8 italic leading-relaxed">
            "La technologie au service de l'humain, la tradition enrichie par l'innovation."
          </p>
          <p className="text-primary-foreground/40 text-sm">
            © 2026 L'M3alem AI — Souss-Massa, Maroc
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
