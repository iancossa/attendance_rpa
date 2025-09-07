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
  getRecords: () => api.get('/attendance'),
  getSummary: () => api.get('/attendance/summary'),
}

export const userAPI = {
  getProfile: () => api.get('/users/profile'),
  getAll: () => api.get('/users'),
}

export default api