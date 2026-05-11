'use client'

import { usePathname, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  LayoutDashboard, Package, Heart, FolderHeart,
  Sparkles, CreditCard, MapPin, Settings, LogOut,
} from 'lucide-react'
import { useAuthStore } from '@/src/store/useAuthStore'
import { cn } from '@/src/lib/utils'

const NAV_ITEMS = [
  { label: 'Overview',      href: '/account',                icon: LayoutDashboard },
  { label: 'Orders',        href: '/account/orders',         icon: Package         },
  { label: 'Wishlist',      href: '/wishlist',               icon: Heart           },
  { label: 'Collections',   href: '/account/collections',    icon: FolderHeart     },
  { label: 'Style Profile', href: '/account/style-profile',  icon: Sparkles        },
  { label: 'Membership',    href: '/account/membership',     icon: CreditCard      },
  { label: 'Addresses',     href: '/account/addresses',      icon: MapPin          },
  { label: 'Settings',      href: '/account/settings',       icon: Settings        },
]

export default function AccountSidebar() {
  const pathname = usePathname()
  const router   = useRouter()
  const { user, logout } = useAuthStore()

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  return (
    <aside className="w-52 flex-shrink-0">
      <nav className="sticky top-24 space-y-px">
        {NAV_ITEMS.map(({ label, href, icon: Icon }) => {
          const active = pathname === href
          return (
            <button
              key={href}
              onClick={() => router.push(href)}
              className={cn(
                'w-full flex items-center gap-3 px-4 py-3 text-left transition-all duration-300 relative group',
                active
                  ? 'text-velore-white bg-velore-surface border-l-2 border-velore-gold'
                  : 'text-velore-gray hover:text-velore-white hover:bg-velore-surface/50 border-l-2 border-transparent'
              )}
            >
              <Icon size={13} className={active ? 'text-velore-gold' : 'text-velore-gray group-hover:text-velore-white'} />
              <span className="text-[10px] tracking-[0.2em] uppercase">{label}</span>
              {active && (
                <motion.div
                  layoutId="account-active"
                  className="absolute left-0 top-0 bottom-0 w-0.5 bg-velore-gold"
                />
              )}
            </button>
          )
        })}

        {/* Divider */}
        <div className="py-3 px-4">
          <div className="h-px bg-velore-border/40" />
        </div>

        {/* Sign out */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 text-velore-gray
                     hover:text-red-400 transition-colors duration-300 group border-l-2 border-transparent"
        >
          <LogOut size={13} />
          <span className="text-[10px] tracking-[0.2em] uppercase">Sign Out</span>
        </button>

        {/* Membership indicator at bottom */}
        <div className="px-4 pt-4">
          <div className="border border-velore-border/40 px-3 py-2">
            <p className="text-[8px] tracking-[0.3em] uppercase text-velore-gray mb-1">
              Signature
            </p>
            <div className="flex items-center gap-1.5">
              <span className="text-velore-gold text-xs">◆</span>
              <span className="text-[9px] tracking-wide text-velore-gold">Member</span>
            </div>
          </div>
        </div>
      </nav>
    </aside>
  )
}