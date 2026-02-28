import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || '/api'

export const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
})

export function setAuthToken(token) {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`
  } else {
    delete api.defaults.headers.common['Authorization']
  }
}

// Auth
export const register = (data) => api.post('/register', data)
export const login = (data) => api.post('/login', data)
export const getMe = (userId) => api.get('/me', { params: { user_id: userId } })

// Artisans
export const listArtisans = (params) => api.get('/artisans', { params })
export const getArtisanByUserId = (userId) => api.get('/artisans', { params: { user_id: userId } })
export const getArtisan = (id) => api.get(`/artisans/${id}`)
export const createArtisan = (data) => api.post('/artisans', data)
export const updateArtisan = (id, data) => api.patch(`/artisans/${id}`, data)

// Jobs
export const createJob = (data) => api.post('/jobs', data)
export const getJob = (id) => api.get(`/jobs/${id}`)
export const listJobs = (params) => api.get('/jobs', { params })
export const acceptJob = (jobId, artisanId) => api.post(`/jobs/${jobId}/accept`, null, { params: { artisan_id: artisanId } })
export const refuseJob = (jobId, artisanId) => api.post(`/jobs/${jobId}/refuse`, null, { params: { artisan_id: artisanId } })
export const startJob = (jobId) => api.post(`/jobs/${jobId}/start`)
export const completeJob = (jobId, afterPhotoUrls) => api.post(`/jobs/${jobId}/complete`, { after_photo_urls: afterPhotoUrls || [] })
export const complaintJob = (jobId, data) => api.post(`/jobs/${jobId}/complaint`, data)
export const closeJob = (jobId) => api.post(`/jobs/${jobId}/close`)
export const rateJob = (jobId, data) => api.post(`/jobs/${jobId}/rate`, data)

// Matching
export const match = (data) => api.post('/match', data)

// AI
export const analyzePhoto = (formData) => api.post('/analyze-photo', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
export const analyzePhotoJson = (data) => api.post('/analyze-photo-json', data)

// Notifications
export const notify = (data) => api.post('/notify', data)
