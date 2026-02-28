import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../services/api'
import { useAuth } from '../hooks/useAuth'
import { supabase } from '../services/supabase'

export default function Auth() {
  const { setAuthSession } = useAuth()
  const [roleMode, setRoleMode] = useState('client') // 'client' or 'worker'
  const [profiles, setProfiles] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    fetchProfiles(roleMode)
  }, [roleMode])

  const fetchProfiles = async (role) => {
    setLoading(true)
    try {
      let query = supabase.from('profiles').select('*').eq('role', role)

      const { data, error } = await query
      if (error) throw error

      // Pour les artisans, on récupère le métier
      if (role === 'worker') {
        const { data: artisansData } = await supabase.from('artisans').select('user_id, profession')
        const profMap = {}
        artisansData?.forEach(a => profMap[a.user_id] = a.profession)
        setProfiles(data.filter(p => p.email).map(p => ({ ...p, profession: profMap[p.id] || 'Artisan' })))
      } else {
        setProfiles(data.filter(p => p.email) || [])
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleLogin = async (user) => {
    setError('')
    try {
      // Utilisation du mot de passe standard par défaut pour les tests
      const { data } = await login({ email: user.email, password: 'password123' })
      await setAuthSession(data.access_token, data.user_id, data.profile)
      if (data.role === 'worker') navigate('/dashboard')
      else navigate('/request')
    } catch (err) {
      const detail = err.response?.data?.detail
      if (Array.isArray(detail)) {
        setError(detail.map(d => d.msg || JSON.stringify(d)).join(', '))
      } else if (typeof detail === 'string') {
        setError(detail)
      } else {
        setError(err.message || 'Erreur de connexion')
      }
    }
  }

  return (
    <div className="min-h-screen bg-artisan-cream p-4 flex flex-col items-center">
      <div className="w-full max-w-5xl mt-10">
        <h1 className="text-3xl font-bold text-artisan-dark mb-8 text-center" style={{ fontFamily: 'Georgia, serif' }}>
          Démo L'Artisan - Choisissez un profil
        </h1>

        <div className="flex gap-4 mb-8 justify-center">
          <button
            type="button"
            onClick={() => setRoleMode('client')}
            className={`px-8 py-3 rounded-xl font-bold text-lg transition-all ${roleMode === 'client' ? 'bg-artisan-orange text-white shadow-[0_4px_15px_rgba(230,126,34,0.4)] scale-105' : 'bg-white text-gray-700 hover:bg-gray-100 shadow'}`}
          >
            👤 Se connecter comme Client
          </button>
          <button
            type="button"
            onClick={() => setRoleMode('worker')}
            className={`px-8 py-3 rounded-xl font-bold text-lg transition-all ${roleMode === 'worker' ? 'bg-artisan-dark text-white shadow-[0_4px_15px_rgba(44,62,80,0.4)] scale-105' : 'bg-white text-gray-700 hover:bg-gray-100 shadow'}`}
          >
            🛠️ Se connecter comme Artisan
          </button>
        </div>

        {error && typeof error === 'string' && <p className="text-red-600 text-center mb-4">{error}</p>}

        {loading ? (
          <div className="flex justify-center p-10">
            <p className="text-xl text-gray-600 font-medium animate-pulse">Chargement des profils...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {profiles.map(p => (
              <div
                key={p.id}
                onClick={() => handleLogin(p)}
                className="bg-white rounded-2xl p-6 shadow-md hover:shadow-2xl hover:border-opacity-100 border-2 border-transparent transition-all cursor-pointer transform hover:-translate-y-1 group"
                style={{ borderColor: roleMode === 'client' ? 'rgba(230,126,34,0)' : 'rgba(44,62,80,0)' }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-inner ${roleMode === 'client' ? 'bg-artisan-orange' : 'bg-artisan-dark'}`}>
                    {p.full_name?.charAt(0) || '?'}
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-gray-900 group-hover:text-artisan-orange transition-colors">{p.full_name}</h3>
                    <p className="text-sm text-gray-500">{p.email}</p>
                  </div>
                </div>

                <div className="text-sm text-gray-600 space-y-2 mt-2">
                  {p.profession && (
                    <p className="flex items-center gap-2">
                      <span>🔨</span>
                      <span className="font-medium text-gray-800 bg-gray-100 px-2 py-1 rounded inline-block">{p.profession}</span>
                    </p>
                  )}
                  <p className="flex items-center gap-2">
                    <span>📍</span>
                    <span className="text-gray-700">{p.city || 'Non spécifiée'}</span>
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-100 text-center">
                  <button className={`text-sm font-semibold py-2 px-4 rounded-lg w-full transition-colors ${roleMode === 'client' ? 'bg-orange-50 text-artisan-orange group-hover:bg-artisan-orange group-hover:text-white' : 'bg-gray-50 text-artisan-dark group-hover:bg-artisan-dark group-hover:text-white'}`}>
                    Cliquer pour se connecter →
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
