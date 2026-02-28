import { createContext, useContext, useState, useEffect } from 'react'
import { getMe, setAuthToken as setApiAuthToken } from '../services/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  const loadSession = async () => {
    const token = localStorage.getItem('lartisan_token')
    const userId = localStorage.getItem('lartisan_user_id')

    if (token && userId) {
      setApiAuthToken(token)
      try {
        const { data } = await getMe(userId)
        setProfile(data)
        setUser({ id: userId })
      } catch {
        setProfile(null)
        setUser(null)
        setApiAuthToken(null)
        localStorage.removeItem('lartisan_token')
        localStorage.removeItem('lartisan_user_id')
      }
    } else {
      setProfile(null)
      setUser(null)
    }
    setLoading(false)
  }

  useEffect(() => {
    loadSession()
  }, [])

  const setAuthSession = async (token, userId, newProfile) => {
    localStorage.setItem('lartisan_token', token)
    localStorage.setItem('lartisan_user_id', userId)
    setApiAuthToken(token)
    setUser({ id: userId })
    if (newProfile) {
      setProfile(newProfile)
    } else {
      try {
        const { data } = await getMe(userId)
        setProfile(data)
      } catch {
        setProfile(null)
      }
    }
  }

  const logout = () => {
    localStorage.removeItem('lartisan_token')
    localStorage.removeItem('lartisan_user_id')
    setApiAuthToken(null)
    setUser(null)
    setProfile(null)
  }

  const value = {
    user,
    profile,
    loading,
    isClient: profile?.role === 'client',
    isWorker: profile?.role === 'worker',
    setAuthSession,
    logout
  }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
