'use client'

import { motion } from 'framer-motion'
import { Sparkles, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function AIStylistBanner() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-[#1a1510] border border-velore-border/60 p-6 md:p-8"
    >
      <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Sparkles size={12} className="text-velore-gold" />
            <span className="section-label">AI Stylist</span>
          </div>
          <h3 className="font-serif text-2xl md:text-3xl font-light text-velore-white mb-1">
            Styled for your silhouette.
          </h3>
          <p className="text-velore-gray text-xs tracking-wide max-w-xs">
            Looks curated by our AI stylist, exclusively for you.
          </p>
        </div>

        {/* Product row — IMAGE PLACEHOLDERS */}
        <div className="flex gap-3">
          {['Coat', 'Bag', 'Belt'].map((item, i) => (
            <div key={item} className="relative">
              <div className="w-20 h-24 md:w-24 md:h-28 bg-velore-surface border border-velore-border/50
                              flex items-center justify-center overflow-hidden">
                {/* IMAGE PLACEHOLDER — styled outfit product */}
                <span className="font-serif text-2xl text-velore-border/50">{item[0]}</span>
              </div>
            </div>
          ))}
        </div>

        <Link
          href="/ai-stylist"
          className="flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase
                     text-velore-gray hover:text-velore-gold transition-colors duration-300 group whitespace-nowrap"
        >
          View Recommendations
          <ArrowRight size={10} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </motion.div>
  )
}