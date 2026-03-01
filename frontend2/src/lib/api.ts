import axios from 'axios';
import { supabase } from './supabase';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use(async (config) => {
  // Rely on Supabase Auth token instead of legacy localStorage
  const { data } = await supabase.auth.getSession();
  if (data?.session?.access_token) {
    config.headers.Authorization = `Bearer ${data.session.access_token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Let authStore and Supabase handle the redirect natively in App.tsx / AuthPage.tsx
      console.error("401 Unauthorized globally intercepted");
    }
    return Promise.reject(error);
  }
);

// Auth - Re-routed to our real Python FastAPI endpoints where applicable
export const register = (data: any) => api.post('/register', data)
export const login = (data: any) => api.post('/login', data)
export const getMe = (userId: string) => api.get('/me', { params: { user_id: userId } })

// Artisans
export const listArtisans = (params?: any) => api.get('/artisans', { params })
export const getArtisanByUserId = (userId: string) => api.get('/artisans', { params: { user_id: userId } })
export const getArtisan = (id: string) => api.get(`/artisans/${id}`)
export const createArtisan = (data: any) => api.post('/artisans', data)
export const updateArtisan = (id: string, data: any) => api.patch(`/artisans/${id}`, data)

// Jobs
export const createJob = (data: any) => api.post('/jobs', data)
export const getJob = (id: string) => api.get(`/jobs/${id}`)
export const listJobs = (params?: any) => api.get('/jobs', { params })
export const deleteJob = (id: string) => api.delete(`/jobs/${id}`)
export const acceptJob = (jobId: string, artisanId: string) => api.post(`/jobs/${jobId}/accept`, null, { params: { artisan_id: artisanId } })
export const refuseJob = (jobId: string, artisanId: string) => api.post(`/jobs/${jobId}/refuse`, null, { params: { artisan_id: artisanId } })
export const startJob = (jobId: string) => api.post(`/jobs/${jobId}/start`)
export const completeJob = (jobId: string, afterPhotoUrls?: string[]) => api.post(`/jobs/${jobId}/complete`, { after_photo_urls: afterPhotoUrls || [] })
export const complaintJob = (jobId: string, data: any) => api.post(`/jobs/${jobId}/complaint`, data)
export const closeJob = (jobId: string) => api.post(`/jobs/${jobId}/close`)
export const rateJob = (jobId: string, data: any) => api.post(`/jobs/${jobId}/rate`, data)

// Matching
export const match = (data: any) => api.post('/match', data)

// AI
export const analyzePhoto = (formData: FormData) => api.post('/analyze-photo', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
export const analyzePhotoJson = (data: any) => api.post('/analyze-photo-json', data)

// Notifications
export const notify = (data: any) => api.post('/notify', data)

export default api;
