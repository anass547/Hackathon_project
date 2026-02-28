import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="min-h-screen bg-artisan-cream">
      <header className="bg-artisan-dark text-white py-6 px-4">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">L'Artisan</h1>
          <Link to="/auth" className="text-artisan-orange font-medium hover:underline">Connexion</Link>
        </div>
      </header>
      <main className="max-w-4xl mx-auto px-4 py-12">
        <section className="text-center mb-16">
          <h2 className="text-4xl font-bold text-artisan-dark mb-4">Dignité & inclusion numérique</h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Connectez-vous avec des artisans qualifiés (Zlayji, Sebbagh, Gebbas, Plombier, Électricien)
            pour vos réparations à la maison. Devis par IA, matching géolocalisé, garantie 48h.
          </p>
        </section>
        <section className="grid md:grid-cols-2 gap-8">
          <Link
            to="/auth?role=client"
            className="block p-8 rounded-xl bg-white border-2 border-artisan-orange text-artisan-dark hover:bg-artisan-orange hover:text-white transition"
          >
            <h3 className="text-xl font-semibold mb-2">Je suis un client</h3>
            <p className="text-gray-600">Décrivez votre besoin, uploadez une photo, recevez un devis et un artisan à proximité.</p>
          </Link>
          <Link
            to="/auth?role=worker"
            className="block p-8 rounded-xl bg-white border-2 border-artisan-dark text-artisan-dark hover:bg-artisan-dark hover:text-white transition"
          >
            <h3 className="text-xl font-semibold mb-2">Je suis un artisan</h3>
            <p className="text-gray-600">Inscrivez-vous, gérez vos missions et montez en niveau (Apprenti → Maître Maalem).</p>
          </Link>
        </section>
        <p className="text-center text-gray-500 mt-12 text-sm">
          Région Souss Massa — Prix en MAD
        </p>
      </main>
    </div>
  )
}
