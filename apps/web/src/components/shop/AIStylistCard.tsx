'use client'

import { motion } from 'framer-motion'
import { Sparkles, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function AIStylistCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="glass rounded-none border border-velore-border/60 p-4 w-52"
    >
      <div className="flex items-center gap-2 mb-3">
        <Sparkles size={12} className="text-velore-gold" />
        <span className="text-[9px] tracking-[0.3em] uppercase text-velore-gold">AI Stylist</span>
        <div className="ml-auto w-5 h-5 border border-velore-border rounded-full
                        flex items-center justify-center cursor-pointer hover:border-velore-gold
                        transition-colors duration-300">
          <span className="text-[8px] text-velore-gray">⊕</span>
        </div>
      </div>

      {/* Outfit row — IMAGE PLACEHOLDERS */}
      <div className="flex gap-1.5 mb-3">
        {['Coat', 'Pants', 'Bag', 'Boot'].map((item) => (
          <div key={item}
            className="flex-1 aspect-square bg-velore-surface border border-velore-border/50
                       flex items-center justify-center">
            {/* IMAGE PLACEHOLDER — product thumbnail */}
            <span className="text-[6px] text-velore-border">{item[0]}</span>
          </div>
        ))}
      </div>

      <p className="text-[11px] text-velore-white font-serif mb-0.5">Minimal Luxe</p>
      <p className="text-[9px] text-velore-gray tracking-wide mb-3">Power, refined.</p>

      <Link href="/ai-stylist"
        className="flex items-center gap-1.5 text-[9px] tracking-widest uppercase
                   text-velore-gray hover:text-velore-gold transition-colors duration-300">
        View Look
        <ArrowRight size={8} />
      </Link>
    </motion.div>
  )
}