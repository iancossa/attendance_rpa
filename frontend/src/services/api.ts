import axios from 'axios'

const API_BASE_URL = 'http://localhost:5000/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const authAPI = {
  login: (email: string, password: string) =>
    api.post('/auth/login', { email, password }),
  register: (email: string, password: string, name: string, employeeId?: string) =>
    api.post('/auth/register', { email, password, name, employeeId }),
}

export const attendanceAPI = {
  mark: (data: any) => api.post('/attendance', data),
  getRecords: (params?: any) => api.get('/attendance', { params }),
  getSummary: () => api.get('/attendance/summary'),
}

export const userAPI = {
  getProfile: () => api.get('/users/profile'),
  getAll: () => api.get('/users'),
  update: (id: number, data: any) => api.put(`/users/${id}`, data),
}

export const classAPI = {
  getAll: () => api.get('/classes'),
  create: (data: any) => api.post('/classes', data),
  update: (id: number, data: any) => api.put(`/classes/${id}`, data),
  delete: (id: number) => api.delete(`/classes/${id}`),
}

export const reportsAPI = {
  generate: (type: string, params: any) => api.post('/reports/generate', { type, ...params }),
  getAll: () => api.get('/reports'),
  download: (id: number) => api.get(`/reports/${id}/download`),
}

export default api