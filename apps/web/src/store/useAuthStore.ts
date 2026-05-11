import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { authApi } from '../lib/api-client'

export interface AuthUser {
  id: string
  email: string
  name?: string | null
  role: string
}

interface AuthStore {
  user:    AuthUser | null
  token:   string | null
  loading: boolean
  error:   string | null

  login:    (email: string, password: string) => Promise<void>
  register: (email: string, password: string, name?: string) => Promise<void>
  logout:   () => void
  fetchMe:  () => Promise<void>
  clearError: () => void
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user:    null,
      token:   null,
      loading: false,
      error:   null,

      login: async (email, password) => {
        set({ loading: true, error: null })
        try {
          const { data } = await authApi.login({ email, password })
          localStorage.setItem('velore_token', data.token)
          set({ user: data.user, token: data.token, loading: false })
        } catch (err: any) {
          set({
            error:   err.response?.data?.error || 'Login failed',
            loading: false,
          })
          throw err
        }
      },

      register: async (email, password, name) => {
        set({ loading: true, error: null })
        try {
          const { data } = await authApi.register({ email, password, name })
          localStorage.setItem('velore_token', data.token)
          set({ user: data.user, token: data.token, loading: false })
        } catch (err: any) {
          set({
            error:   err.response?.data?.error || 'Registration failed',
            loading: false,
          })
          throw err
        }
      },

      logout: () => {
        localStorage.removeItem('velore_token')
        set({ user: null, token: null })
      },

      fetchMe: async () => {
        try {
          const { data } = await authApi.me()
          set({ user: data })
        } catch {
          get().logout()
        }
      },

      clearError: () => set({ error: null }),
    }),
    {
      name:    'velore-auth',
      partialize: (s) => ({ user: s.user, token: s.token }),
    }
  )
)