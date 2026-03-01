import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import ClientDashboard from './pages/ClientDashboard'
import ArtisanList from './pages/ArtisanList'
import ArtisanDashboard from './pages/ArtisanDashboard'
import JobTracking from './pages/JobTracking'
import Rating from './pages/Rating'
import AuthPage from './pages/AuthPage'
import DemoLogin from './pages/Auth'
import { useAuth } from './hooks/useAuth'

function App() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-artisan-dark">Chargement...</p>
      </div>
    )
  }

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/demo-login" element={<DemoLogin />} />
      <Route path="/request" element={user ? <ClientDashboard /> : <Navigate to="/auth" replace />} />
      <Route path="/artisans" element={<ArtisanList />} />
      <Route path="/artisans/:jobId" element={<ArtisanList />} />
      <Route path="/dashboard" element={user ? <ArtisanDashboard /> : <Navigate to="/auth" replace />} />
      <Route path="/client/tracking/:jobId" element={<JobTracking />} />
      <Route path="/client/tracking/:jobId/rate" element={<Rating />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
