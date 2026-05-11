'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, User, ShoppingBag, Menu, X } from 'lucide-react'
import { cn } from '../../lib/utils'
// Add these imports at top
import { useCartStore } from '../../store/useCartStore'
import { useWishlistStore } from '../../store/useWishlistStore'
import { Heart } from 'lucide-react'
import AuthModal from '../auth/AuthModal'
import { useAuthStore } from '../../store/useAuthStore'

const NAV_LINKS = [
  { label: 'New In',      href: '/new-in' },
  { label: 'Women',       href: '/women' },
  { label: 'Men',         href: '/men' },
  { label: 'Collections', href: '/collections' },
  { label: 'Accessories', href: '/accessories' },
  { label: 'World of Veloré', href: '/world' },
]

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [authOpen, setAuthOpen] = useState(false)
  const cartCount = useCartStore((s) => s.count())
  const { user } = useAuthStore()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          scrolled
            ? 'bg-velore-black/95 backdrop-blur-md border-b border-velore-border'
            : 'bg-transparent'
        )}
      >
        {/* Announcement bar inside header on top */}
        <div className="w-full border-b border-velore-border/50 py-2 text-center">
          <p className="text-[10px] tracking-[0.35em] text-velore-gray-light uppercase">
            ● &nbsp; Complimentary Worldwide Shipping &amp; Returns
          </p>
        </div>

        <div className="flex items-center justify-between px-8 md:px-12 h-16">
          {/* Logo */}
          <Link href="/" className="flex flex-col leading-none">
            <span className="font-serif text-xl tracking-[0.15em] text-velore-white font-light">
              VELORÉ
            </span>
            <span className="text-[8px] tracking-[0.4em] text-velore-gold uppercase mt-0.5">
              Engineered Elegance.
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[11px] tracking-[0.2em] text-velore-gray-light uppercase
                           hover:text-velore-white transition-colors duration-300 relative group"
              >
                {link.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-velore-gold
                                 group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </nav>

          {/* Icons */}
          <div className="flex items-center gap-5">
            <button className="text-velore-gray-light hover:text-velore-white transition-colors duration-300">
              <Search size={16} />
            </button>
            {user ? (
              <Link href="/account"
                className="text-velore-gray-light hover:text-velore-white transition-colors duration-300">
                <User size={16} />
              </Link>
            ) : (
              <button
                onClick={() => setAuthOpen(true)}
                className="text-velore-gray-light hover:text-velore-white transition-colors duration-300"
              >
                <User size={16} />
              </button>
            )}
            <Link href="/wishlist"
              className="relative text-velore-gray-light hover:text-velore-white transition-colors duration-300">
              <Heart size={16} />
            </Link>
            <Link href="/cart" className="relative text-velore-gray-light hover:text-velore-white transition-colors duration-300">
              <ShoppingBag size={16} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 w-4 h-4 bg-velore-gold text-velore-black
                                 text-[9px] font-bold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            {/* Mobile menu toggle */}
            <button
              className="lg:hidden text-velore-gray-light hover:text-velore-white transition-colors"
              onClick={() => setMobileOpen(true)}
            >
              <Menu size={18} />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 z-50 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.35 }}
              className="fixed top-0 left-0 bottom-0 w-80 bg-velore-dark z-50
                         border-r border-velore-border flex flex-col"
            >
              <div className="flex items-center justify-between p-6 border-b border-velore-border">
                <div className="flex flex-col leading-none">
                  <span className="font-serif text-lg tracking-[0.15em] text-velore-white">VELORÉ</span>
                  <span className="text-[8px] tracking-[0.4em] text-velore-gold uppercase mt-0.5">
                    Engineered Elegance.
                  </span>
                </div>
                <button onClick={() => setMobileOpen(false)}
                  className="text-velore-gray hover:text-velore-white transition-colors">
                  <X size={18} />
                </button>
              </div>

              <nav className="flex flex-col p-6 gap-6 flex-1">
                {NAV_LINKS.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="text-[13px] tracking-[0.25em] text-velore-gray-light uppercase
                                 hover:text-velore-white transition-colors duration-300 block"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="p-6 border-t border-velore-border">
                <Link href="/account" onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 text-velore-gray hover:text-velore-white
                             transition-colors text-xs tracking-widest uppercase">
                  <User size={14} />
                  Account
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  )
}