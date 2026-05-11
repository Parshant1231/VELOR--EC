'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-velore-black px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-md"
      >
        {/* 404 Number */}
        <div className="mb-8">
          <h1 className="font-serif font-light leading-none"
              style={{ fontSize: 'clamp(5rem, 15vw, 8rem)' }}>
            <span className="text-velore-white">4</span>
            <span className="text-velore-gold">0</span>
            <span className="text-velore-white">4</span>
          </h1>
        </div>

        {/* Decorative line */}
        <div className="w-12 h-px bg-gradient-to-r from-transparent via-velore-gold to-transparent mx-auto mb-8" />

        {/* Message */}
        <h2 className="font-serif font-light text-2xl text-velore-white mb-4">
          Page Not Found
        </h2>
        <p className="text-velore-gray text-sm leading-relaxed mb-12">
          We couldn't find what you're looking for. This page may have been moved or no longer exists.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col gap-3">
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center justify-center gap-2 bg-velore-gold
                         text-velore-black py-4 px-6 text-[10px] tracking-[0.3em] uppercase font-semibold
                         hover:bg-velore-gold-light transition-all duration-300"
            >
              Return Home
              <ArrowRight size={14} />
            </motion.button>
          </Link>
          <Link href="/collections">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full border border-velore-border text-velore-gray text-[10px]
                         tracking-[0.2em] uppercase py-4 px-6 hover:border-velore-gold 
                         hover:text-velore-white transition-all duration-300"
            >
              Explore Collections
            </motion.button>
          </Link>
        </div>

        {/* Footer text */}
        <p className="text-[8px] text-velore-gray/50 mt-10 tracking-[0.1em]">
          VELORE — Luxury Craftsmanship
        </p>
      </motion.div>
    </div>
  )
}
