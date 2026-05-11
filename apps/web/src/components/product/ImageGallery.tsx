'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Play } from 'lucide-react'
import { cn } from '../../lib/utils'

// IMAGE PLACEHOLDER COUNT — for a product, we show 6 slots (1 video + 5 images)
// Add real images to: /public/images/products/[slug]/1.jpg ... 6.jpg

interface ImageGalleryProps {
  productName: string
  images?: string[]
}

const THUMB_COUNT = 6

export default function ImageGallery({ productName, images = [] }: ImageGalleryProps) {
  const [active, setActive] = useState(0)
  const total = images.length > 0 ? images.length : THUMB_COUNT

  return (
    <div className="flex gap-3 h-full">
      {/* Thumbnail strip */}
      <div className="flex flex-col gap-2 w-14 flex-shrink-0">
        {Array.from({ length: total }).map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={cn(
              'relative aspect-square w-full overflow-hidden border transition-all duration-300',
              active === i
                ? 'border-velore-gold'
                : 'border-velore-border hover:border-velore-gray'
            )}
          >
            {/* IMAGE THUMBNAIL */}
            {images.length > 0 ? (
              <img
                src={images[i]}
                alt={`${productName} thumbnail ${i + 1}`}
                className="w-full h-full object-cover object-center"
              />
            ) : i === 0 ? (
              <div className="absolute inset-0 bg-velore-surface flex items-center justify-center">
                <Play size={10} className="text-velore-gold" />
              </div>
            ) : (
              <div className="absolute inset-0 bg-velore-surface flex items-center justify-center">
                <span className="font-serif text-sm text-velore-border">{productName[0]}</span>
              </div>
            )}
            {active === i && (
              <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-velore-gold" />
            )}
          </button>
        ))}
      </div>

      {/* Main image */}
      <div className="relative flex-1 overflow-hidden bg-velore-surface group">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            {/* MAIN IMAGE */}
            {images.length > 0 ? (
              <img
                src={images[active]}
                alt={`${productName} ${active + 1}`}
                className="w-full h-full object-cover object-center"
              />
            ) : (
              <span className="font-serif text-[8rem] text-velore-border/30 select-none">
                {productName[0]}
              </span>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Counter */}
        <div className="absolute bottom-4 left-4 flex items-center gap-2 text-[10px] tracking-widest text-velore-gray">
          <span className="text-velore-white">{String(active + 1).padStart(2,'0')}</span>
          <span className="w-5 h-px bg-velore-border" />
          <span>{String(total).padStart(2,'0')}</span>
        </div>

        {/* Nav arrows */}
        <button
          onClick={() => setActive((a) => Math.max(0, a - 1))}
          disabled={active === 0}
          className="absolute left-3 top-1/2 -translate-y-1/2 w-7 h-7 border border-velore-border
                     flex items-center justify-center opacity-0 group-hover:opacity-100
                     hover:border-velore-gold transition-all duration-300 disabled:opacity-0"
        >
          <ChevronLeft size={12} className="text-velore-white" />
        </button>
        <button
          onClick={() => setActive((a) => Math.min(total - 1, a + 1))}
          disabled={active === total - 1}
          className="absolute right-3 top-1/2 -translate-y-1/2 w-7 h-7 border border-velore-border
                     flex items-center justify-center opacity-0 group-hover:opacity-100
                     hover:border-velore-gold transition-all duration-300 disabled:opacity-0"
        >
          <ChevronRight size={12} className="text-velore-white" />
        </button>

        {/* Scroll indicator */}
        <div className="absolute bottom-4 right-4 flex flex-col items-center gap-1 opacity-0 group-hover:opacity-100
                        transition-opacity duration-300">
          <div className="h-8 w-px bg-velore-border relative overflow-hidden">
            <motion.div
              animate={{ y: ['-100%', '100%'] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
              className="absolute top-0 left-0 right-0 h-1/2 bg-velore-gold"
            />
          </div>
          <span className="text-[7px] tracking-widest uppercase text-velore-gray rotate-90 mt-2">Scroll</span>
        </div>
      </div>
    </div>
  )
}