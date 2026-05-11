'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '../../store/useAuthStore'
import type { AuthUser } from '../../store/useAuthStore'

export function useRequireAuth(redirectTo = '/') {
  const router = useRouter()
  const { user, token, fetchMe } = useAuthStore()

  useEffect(() => {
    if (!token) {
      router.replace(redirectTo)
      return
    }
    if (!user) fetchMe()
  }, [token, user, fetchMe, router, redirectTo])

  return { user, isLoading: !!token && !user } as { user: AuthUser | null; isLoading: boolean }
}