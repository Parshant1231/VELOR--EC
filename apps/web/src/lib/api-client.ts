import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'

export const apiClient = axios.create({
  baseURL: `${BASE_URL}/api`,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
})

// Attach JWT on every request
apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('velore_token')
    if (token) config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Handle 401 globally — log out
apiClient.interceptors.response.use(
  (res: AxiosResponse) => res,
  (err: AxiosError) => {
    if (err.response?.status === 401 && typeof window !== 'undefined') {
      localStorage.removeItem('velore_token')
      localStorage.removeItem('velore_user')
      window.dispatchEvent(new Event('velore:logout'))
    }
    return Promise.reject(err)
  }
)

// ─── API helpers ─────────────────────────────────────────────

export const authApi = {
  register: (data: { email: string; password: string; name?: string }) =>
    apiClient.post('/auth/register', data),
  login: (data: { email: string; password: string }) =>
    apiClient.post('/auth/login', data),
  me: () => apiClient.get('/auth/me'),
}

export const productsApi = {
  getAll: (params?: Record<string, any>) =>
    apiClient.get('/products', { params }),
  getFeatured: () =>
    apiClient.get('/products/featured'),
  getBySlug: (slug: string) =>
    apiClient.get(`/products/${slug}`),
}

export const usersApi = {
  getProfile: () => apiClient.get('/users'),
  updateProfile: (data: { name?: string; phone?: string }) =>
    apiClient.patch('/users', data),
}