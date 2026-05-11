'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { LayoutGrid, List, Share2, Sparkles } from 'lucide-react'
import Navbar from '../../components/layout/Navbar'
import WishlistGrid from '../../components/wishlist/WishlistGrid'
import FeaturedPieces from '../../components/home/FeaturedPieces'
import { useWishlistStore } from '../../store/useWishlistStore'
import { cn } from '../../lib/utils'

const SORT_OPTIONS = [
  { value: 'recent',     label: 'Recently Added' },
  { value: 'price_asc',  label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
] as const

type SortOption = typeof SORT_OPTIONS[number]['value']

export default function WishlistPage() {
  const count = useWishlistStore((s) => s.count())
  const [view, setView] = useState<'grid' | 'list'>('grid')
  const [sort, setSort] = useState<SortOption>('recent')

  return (
    <div className="min-h-screen bg-velore-black">
      <Navbar />

      {/* Hero banner */}
      <div className="relative pt-24 pb-0 overflow-hidden">
        {/* BG image area */}
        <div className="relative h-52 md:h-64 bg-gradient-to-br from-[#1a1510] to-velore-black
                        flex items-center overflow-hidden">
          {/* IMAGE PLACEHOLDER — wishlist hero model */}
          {/* Add: /public/images/wishlist-hero.jpg */}
          <div className="absolute inset-0 flex items-center justify-end pr-16 opacity-20">
            <span className="font-serif text-[18vw] text-velore-gold/20 select-none">W</span>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-velore-black via-velore-black/60 to-transparent" />

          <div className="relative px-8 md:px-16">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-serif font-light leading-none text-velore-white mb-3"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
            >
              My Wishlist
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15 }}
              className="text-velore-gray text-xs tracking-wide max-w-xs leading-relaxed"
            >
              Pieces that speak to you.<br />
              Saved for when the moment is yours.
            </motion.p>

            {/* Share */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25 }}
              className="flex items-center gap-2 mt-4 text-[9px] tracking-[0.3em] uppercase
                         text-velore-gray hover:text-velore-gold transition-colors duration-300"
            >
              <Share2 size={11} />
              Share Wishlist
            </motion.button>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="px-8 md:px-12 lg:px-16 py-5 border-b border-velore-border/30
                      flex items-center justify-between">
        <p className="text-[10px] tracking-[0.3em] uppercase text-velore-gray">
          {count} {count === 1 ? 'Item' : 'Items'}
        </p>

        <div className="flex items-center gap-5">
          {/* Sort */}
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortOption)}
            className="bg-transparent text-velore-gray text-[10px] tracking-widest uppercase
                       border-none outline-none cursor-pointer hover:text-velore-white
                       transition-colors duration-300"
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}
                className="bg-velore-dark text-velore-white">
                {o.label}
              </option>
            ))}
          </select>

          {/* View toggle */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setView('grid')}
              className={cn('p-1.5 transition-colors',
                view === 'grid' ? 'text-velore-white' : 'text-velore-border hover:text-velore-gray')}
            >
              <LayoutGrid size={13} />
            </button>
            <button
              onClick={() => setView('list')}
              className={cn('p-1.5 transition-colors',
                view === 'list' ? 'text-velore-white' : 'text-velore-border hover:text-velore-gray')}
            >
              <List size={13} />
            </button>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="px-8 md:px-12 lg:px-16 py-10">
        <WishlistGrid view={view} sort={sort} />
      </div>

      {/* Curated for you */}
      {count > 0 && (
        <div className="border-t border-velore-border/30">
          <div className="px-8 md:px-12 lg:px-16 pt-12">
            <div className="flex items-center gap-2 mb-1">
              <Sparkles size={12} className="text-velore-gold" />
              <p className="text-[10px] tracking-[0.35em] uppercase text-velore-white">
                Curated For You
              </p>
            </div>
            <p className="text-[9px] tracking-wide text-velore-gray mb-0">
              Pieces we think you'll love, chosen with intention.
            </p>
          </div>
          <FeaturedPieces />
        </div>
      )}
    </div>
  )
}