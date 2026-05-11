'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const FOOTER_LINKS = {
  DISCOVER: [
    { label: 'New Arrivals',  href: '/new-in' },
    { label: 'Collections',   href: '/collections' },
    { label: 'AI Stylist',    href: '/ai-stylist' },
    { label: 'Editorial',     href: '/journal' },
    { label: 'Gift Guide',    href: '/gift-guide' },
  ],
  SHOP: [
    { label: 'Clothing',         href: '/women' },
    { label: 'Footwear',         href: '/accessories' },
    { label: 'Accessories',      href: '/accessories' },
    { label: 'Limited Edition',  href: '/collections' },
    { label: 'Bespoke Services', href: '/world' },
  ],
  EXPERIENCE: [
    { label: 'Veloré World',   href: '/world' },
    { label: 'Craftsmanship',  href: '/world' },
    { label: 'Sustainability', href: '/world' },
    { label: 'Store Locator',  href: '/world' },
    { label: 'The Atelier',    href: '/world' },
  ],
  SUPPORT: [
    { label: 'Customer Care',      href: '/' },
    { label: 'Shipping & Returns', href: '/' },
    { label: 'Size Guide',         href: '/' },
    { label: 'FAQs',               href: '/' },
    { label: 'Contact Us',         href: '/' },
  ],
  MEMBERSHIP: [
    { label: 'Veloré Circle',    href: '/account/membership' },
    { label: 'Private Events',   href: '/account/membership' },
    { label: 'Early Access',     href: '/account/membership' },
    { label: 'VIP Services',     href: '/account/membership' },
    { label: 'Rewards Program',  href: '/account/membership' },
  ],
}

const SOCIAL = [
  {
    icon: ({ size }: { size: number }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="none" stroke="currentColor" strokeWidth="2"/>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" fill="none" stroke="currentColor" strokeWidth="2"/>
        <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor"/>
      </svg>
    ),
    href: '#', label: 'Instagram',
  },
  {
    icon: ({ size }: { size: number }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.88 13.67l-2.967-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.834.936l-.525-.047z"/>
      </svg>
    ),
    href: '#', label: 'Telegram',
  },
  {
    icon: ({ size }: { size: number }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
    href: '#', label: 'X',
  },
  {
    icon: ({ size }: { size: number }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    ),
    href: '#', label: 'YouTube',
  },
]

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setSubscribed(true)
    setEmail('')
  }

  return (
    <footer className="bg-velore-black border-t border-velore-border/30">
      {/* Top editorial section */}
      <div className="relative overflow-hidden border-b border-velore-border/30">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a1510]/60 to-transparent" />

        {/* Background model — IMAGE PLACEHOLDER */}
        {/* Add: /public/images/footer-model.jpg */}
        <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
          <span className="font-serif text-[30vw] text-velore-gold/20 select-none">V</span>
        </div>

        {/* Animated stars */}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
            transition={{ duration: 3 + i, repeat: Infinity, delay: i * 0.7 }}
            className="absolute text-velore-gold/40 select-none pointer-events-none"
            style={{
              top:  `${20 + i * 20}%`,
              left: `${10 + i * 25}%`,
              fontSize: '12px',
            }}
          >
            ✦
          </motion.div>
        ))}

        <div className="relative max-w-screen-xl mx-auto px-8 md:px-12 lg:px-16
                        py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Brand statement */}
          <div>
            <p className="text-[9px] tracking-[0.4em] uppercase text-velore-gray mb-4">
              This Isn't Fashion.
            </p>
            <h2 className="font-serif font-light leading-tight text-velore-white mb-2"
                style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}>
              This Is Your Signature.
            </h2>
            <h2 className="font-serif font-light leading-tight text-velore-gold italic mb-6"
                style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}>
              This Is Veloré.
            </h2>
            <p className="text-velore-gray text-xs leading-relaxed max-w-sm">
              Timeless design. Intelligent innovation.<br />
              Created for those who define tomorrow.
            </p>
          </div>

          {/* Newsletter */}
          <div>
            <p className="text-[9px] tracking-[0.4em] uppercase text-velore-gray-light mb-2">
              Stay Ahead of Elegance
            </p>
            <h3 className="font-serif text-2xl font-light text-velore-white mb-1">
              Veloré Journal
            </h3>
            <p className="text-velore-gray text-xs tracking-wide mb-5">
              Exclusive drops. Private access. Timeless insights.
            </p>

            {subscribed ? (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 text-velore-gold"
              >
                <span className="text-sm">✦</span>
                <p className="text-xs tracking-widest uppercase">
                  Welcome to Veloré Journal
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-0">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 bg-velore-surface border border-velore-border px-4 py-3
                             text-velore-white text-xs placeholder:text-velore-border
                             focus:border-velore-gold focus:outline-none transition-colors duration-300"
                />
                <button
                  type="submit"
                  className="bg-velore-gold text-velore-black px-5 flex items-center
                             hover:bg-velore-gold-light transition-colors duration-300"
                >
                  <ArrowRight size={14} />
                </button>
              </form>
            )}
            <p className="text-[9px] text-velore-gray/60 mt-2 tracking-wide">
              By subscribing, you agree to our{' '}
              <Link href="/" className="text-velore-gold/70 hover:text-velore-gold
                                        transition-colors underline">
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Links grid */}
      <div className="max-w-screen-xl mx-auto px-8 md:px-12 lg:px-16 py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {Object.entries(FOOTER_LINKS).map(([section, links]) => (
            <div key={section}>
              <p className="text-[9px] tracking-[0.35em] uppercase text-velore-gray-light mb-5">
                {section}
              </p>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[10px] tracking-wide text-velore-gray
                                 hover:text-velore-white transition-colors duration-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Veloré promise */}
        <div className="mt-12 pt-8 border-t border-velore-border/30
                        grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Social */}
          <div>
            <p className="text-[9px] tracking-[0.35em] uppercase text-velore-gray-light mb-4">
              Follow Our World
            </p>
            <div className="flex gap-3">
              {SOCIAL.map(({ icon: Icon, href, label }) => (
              <Link
                key={label}
                href={href}
                aria-label={label}
                className="w-9 h-9 rounded-full border border-velore-border flex items-center justify-center
                           text-velore-gray hover:border-velore-gold hover:text-velore-gold
                           transition-all duration-300"
              >
                <Icon size={14} />
              </Link>
            ))}
            </div>
          </div>

          {/* Promise */}
          <div className="border border-velore-border/40 p-5">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-velore-gold text-sm">◆</span>
              <p className="text-[9px] tracking-[0.3em] uppercase text-velore-gray-light">
                The Veloré Promise
              </p>
            </div>
            <p className="text-[11px] text-velore-gray leading-relaxed">
              Precision in every detail.<br />
              Purpose in every design.<br />
              Excellence in every experience.
            </p>
            <Link
              href="/world"
              className="inline-flex items-center gap-2 mt-3 text-[9px] tracking-[0.2em]
                         uppercase text-velore-gold hover:text-velore-gold-light
                         transition-colors duration-300"
            >
              Explore Our Philosophy
              <ArrowRight size={9} />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative border-t border-velore-border/30">
        {/* Glow arc — design img 10 */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-16 overflow-hidden pointer-events-none">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-64 h-64
                          rounded-full border border-velore-gold/20"
               style={{ boxShadow: '0 0 40px 2px rgba(201,169,110,0.08)' }} />
        </div>

        {/* Logo large */}
        <div className="text-center py-6">
          <p className="font-serif text-[10vw] md:text-[6vw] text-velore-border/10
                        select-none tracking-widest leading-none">
            VELORÉ
          </p>
        </div>

        <div className="max-w-screen-xl mx-auto px-8 md:px-12 lg:px-16
                        pb-6 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <div>
            <p className="font-serif text-sm tracking-[0.2em] text-velore-white">VELORÉ</p>
            <p className="text-[8px] tracking-[0.4em] text-velore-gold uppercase">
              Engineered Elegance.
            </p>
          </div>

          {/* Legal */}
          <div className="flex items-center gap-5 flex-wrap justify-center">
            <p className="text-[9px] text-velore-gray tracking-wide">
              © 2025 VELORÉ. All Rights Reserved.
            </p>
            {['Privacy Policy', 'Terms of Service', 'Accessibility'].map((link) => (
              <Link
                key={link}
                href="/"
                className="text-[9px] text-velore-gray hover:text-velore-white
                           transition-colors duration-300 tracking-wide"
              >
                {link}
              </Link>
            ))}
          </div>

          {/* Region */}
          <button className="flex items-center gap-2 text-[9px] tracking-[0.2em] uppercase
                             text-velore-gray hover:text-velore-white transition-colors duration-300
                             border border-velore-border px-3 py-1.5 hover:border-velore-gold">
            <span className="text-xs">🌐</span>
            Global (EN)
            <span className="text-[8px]">▾</span>
          </button>
        </div>
      </div>
    </footer>
  )
}