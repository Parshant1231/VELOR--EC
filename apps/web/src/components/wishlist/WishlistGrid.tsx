'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, ShoppingBag, Sparkles } from 'lucide-react'
import { useWishlistStore } from '../../store/useWishlistStore'
import { useCartStore } from '../../store/useCartStore'
import { Product } from '../../types'
import { cn } from '../../lib/utils'

type SortOption = 'recent' | 'price_asc' | 'price_desc'

interface WishlistGridProps {
  view: 'grid' | 'list'
  sort: SortOption
}

export default function WishlistGrid({ view, sort }: WishlistGridProps) {
  const items    = useWishlistStore((s) => s.items)
  const toggle   = useWishlistStore((s) => s.toggle)
  const addItem  = useCartStore((s) => s.addItem)

  const sorted = [...items].sort((a, b) => {
    if (sort === 'price_asc')  return a.price - b.price
    if (sort === 'price_desc') return b.price - a.price
    return 0
  })

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-center">
        <Sparkles size={32} className="text-velore-border mb-5" />
        <h3 className="font-serif text-3xl font-light text-velore-white mb-3">
          Your wishlist awaits
        </h3>
        <p className="text-velore-gray text-sm tracking-wide max-w-xs">
          Save pieces that speak to you for when the moment is yours.
        </p>
      </div>
    )
  }

  return (
    <motion.div
      layout
      className={cn(
        view === 'grid'
          ? 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4'
          : 'flex flex-col gap-4'
      )}
    >
      <AnimatePresence>
        {sorted.map((product, i) => (
          <motion.div
            key={product.id}
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ delay: i * 0.05 }}
            className={cn(
              'group relative',
              view === 'list' && 'flex gap-5 border-b border-velore-border/40 pb-5'
            )}
          >
            {/* Remove button */}
            <button
              onClick={() => toggle(product)}
              className="absolute top-2 right-2 z-10 w-6 h-6 rounded-full bg-velore-dark/80
                         border border-velore-border flex items-center justify-center
                         opacity-0 group-hover:opacity-100 hover:border-velore-gold
                         transition-all duration-300"
            >
              <X size={10} className="text-velore-gray hover:text-velore-gold" />
            </button>

            {/* IMAGE PLACEHOLDER */}
            <div className={cn(
              'bg-velore-surface border border-velore-border/50 overflow-hidden relative',
              view === 'grid' ? 'aspect-[3/4] w-full' : 'w-20 h-24 flex-shrink-0'
            )}>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-serif text-3xl text-velore-border/40">{product.name[0]}</span>
              </div>
            </div>

            {/* Info */}
            <div className={cn(
              view === 'grid' ? 'mt-2.5 space-y-1' : 'flex-1 flex flex-col justify-between py-1'
            )}>
              <div>
                <p className="text-[10px] tracking-[0.2em] uppercase text-velore-white font-medium
                               hover:text-velore-gold transition-colors duration-300 cursor-pointer line-clamp-2">
                  {product.name}
                </p>
                {product.colors[0] && (
                  <p className="text-[9px] tracking-wide text-velore-gray mt-0.5">
                    {product.colors[0].name}
                    {product.sizes[0] && ` · ${product.sizes[0]}`}
                  </p>
                )}
                <p className="text-[11px] tracking-widest text-velore-gray-light mt-1">
                  ${product.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </p>
              </div>

              <button
                onClick={() => addItem(product)}
                className="mt-3 flex items-center gap-1.5 text-[9px] tracking-[0.2em] uppercase
                           text-velore-gray hover:text-velore-gold transition-colors duration-300"
              >
                <ShoppingBag size={10} />
                Add to Bag
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  )
}