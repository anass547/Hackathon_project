import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../services/supabase'
import { useAuth } from '../hooks/useAuth'

export default function AuthPage() {
    const [isLogin, setIsLogin] = useState(true)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const navigate = useNavigate()
    const { setAuthSession } = useAuth()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        try {
            let authData;
            let authError;

            if (isLogin) {
                const { data, error } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                })
                authData = data;
                authError = error;
            } else {
                const { data, error } = await supabase.auth.signUp({
                    email,
                    password,
                })
                authData = data;
                authError = error;
            }

            if (authError) throw authError

            if (authData?.session) {
                const { access_token, user } = authData.session;

                // Fetch profile to verify role
                const { data: profile } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', user.id)
                    .single()

                await setAuthSession(access_token, user.id, profile)

                if (profile?.role === 'worker') {
                    navigate('/dashboard')
                } else {
                    navigate('/request')
                }
            } else {
                // Supabase might require email verification (no session returned immediately for signups)
                setError("Veuillez vérifier votre email pour valider le compte ou essayer de vous connecter.")
            }
        } catch (err) {
            setError(err.message || 'Une erreur est survenue.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-tadelakt flex flex-col items-center justify-center p-4 font-sans">
            <div className="bg-white rounded-3xl shadow-soft-arabesque w-full max-w-md p-8 border border-gray-100">
                <div className="flex justify-center mb-8">
                    <img
                        src="/image_12.png"
                        alt="Logo L'm3ALEM"
                        className="h-16 w-auto object-contain"
                    />
                </div>

                <h2 className="text-2xl font-bold text-medina-dark text-center mb-6">
                    {isLogin ? 'Se connecter' : 'Créer un compte'}
                </h2>

                {error && (
                    <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm mb-4 font-medium border border-red-100">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#B22222] focus:border-transparent outline-none transition-all"
                            placeholder="votre@email.com"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Mot de passe</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#B22222] focus:border-transparent outline-none transition-all"
                            placeholder="••••••••"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-4 mt-2 rounded-2xl bg-terracotta hover:bg-[#991b1b] text-white font-bold text-lg shadow-md hover:shadow-lg transition-all disabled:opacity-50"
                    >
                        {loading ? 'Chargement...' : (isLogin ? 'Se connecter' : 'Créer un compte')}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <button
                        type="button"
                        onClick={() => { setIsLogin(!isLogin); setError(null); }}
                        className="text-sm font-semibold text-gray-500 hover:text-terracotta transition-colors"
                    >
                        {isLogin ? "Pas de compte ? Inscrivez-vous" : "Déjà un compte ? Connectez-vous"}
                    </button>
                </div>

                <div className="my-8 flex items-center">
                    <div className="flex-1 border-t border-gray-100"></div>
                    <span className="px-4 text-sm text-gray-400 font-bold">OU</span>
                    <div className="flex-1 border-t border-gray-100"></div>
                </div>

                <button
                    type="button"
                    onClick={() => navigate('/demo-login')}
                    className="w-full py-3 rounded-2xl border-2 border-gray-200 text-medina-dark font-bold hover:bg-gray-50 hover:border-gray-300 transition-all"
                >
                    Mode Démo (Accès Rapide)
                </button>
            </div>
        </div>
    )
}
