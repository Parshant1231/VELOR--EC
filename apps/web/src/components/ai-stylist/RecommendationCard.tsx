'use client'

import { motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import { Product } from '@/src/types'
import { useCartStore } from '@/src/store/useCartStore'
import { cn } from '@/src/lib/utils'

interface RecommendationCardProps {
  product:   Product
  matchPct:  number
  matchLabel: string
  matchSub:  string
  index:     number
}

export default function RecommendationCard({
  product, matchPct, matchLabel, matchSub, index
}: RecommendationCardProps) {
  const addItem = useCartStore((s) => s.addItem)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      className="group relative"
    >
      {/* Image area */}
      <Link href={`/products/${product.slug}`}>
        <div className="relative aspect-[3/4] bg-velore-surface border border-velore-border
                        overflow-hidden mb-3">
          {/* IMAGE PLACEHOLDER */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-serif text-5xl text-velore-border/30">{product.name[0]}</span>
          </div>

          {/* AI Match badge */}
          <div className="absolute top-3 left-3 bg-velore-black/80 backdrop-blur-sm
                          border border-velore-border/60 px-2.5 py-1.5">
            <p className="text-[8px] tracking-[0.2em] uppercase text-velore-gray">AI Match</p>
            <p className="text-velore-gold font-serif text-lg leading-none">{matchPct}%</p>
          </div>

          {/* Add to cart */}
          <motion.button
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-velore-white
                       flex items-center justify-center opacity-0 group-hover:opacity-100
                       hover:bg-velore-gold transition-all duration-300"
            onClick={(e) => { e.preventDefault(); addItem(product) }}
          >
            <Plus size={13} className="text-velore-black" />
          </motion.button>
        </div>
      </Link>

      {/* Info */}
      <div className="space-y-0.5 px-0.5">
        <p className="text-[10px] tracking-[0.2em] uppercase text-velore-white font-medium
                      group-hover:text-velore-gold transition-colors duration-300">
          {matchLabel}
        </p>
        <p className="text-[9px] text-velore-gray tracking-wide">{matchSub}</p>
        <p className="text-[11px] tracking-widest text-velore-gray-light mt-1">
          ${product.price.toLocaleString('en-US', { minimumFractionDigits: 0 })}
        </p>
      </div>
    </motion.div>
  )
}