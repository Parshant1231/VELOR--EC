'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Navbar from '@/src/components/layout/Navbar'
import AccountSidebar from '@/src/components/account/AccountSidebar'
import { useAuthStore } from '@/src/store/useAuthStore'

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const { token } = useAuthStore()

  // Redirect if not logged in
  useEffect(() => {
    if (!token) router.replace('/')
  }, [token, router])

  if (!token) return null

  return (
    <div className="min-h-screen bg-velore-black">
      <Navbar />
      <div className="pt-24 pb-20">
        <div className="max-w-screen-xl mx-auto px-6 md:px-12 lg:px-16">
          <div className="flex gap-10 lg:gap-16">
            {/* Sidebar — hidden on mobile */}
            <div className="hidden lg:block">
              <AccountSidebar />
            </div>
            {/* Page content */}
            <main className="flex-1 min-w-0">
              {children}
            </main>
          </div>
        </div>
      </div>
    </div>
  )
}