'use client'

import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import ProductCard from '../ui/ProductCard'
import { Product } from '../../types'

// MOCK DATA — will come from API in Phase 3
const FEATURED_PRODUCTS: Product[] = [
  { id: '1', name: 'Silk-Tailored Blazer',    slug: 'silk-tailored-blazer',    price: 890,  images: ['/images/products/silk-tailored-blazer.png'], category: 'women', sizes: ['XS','S','M','L'], colors: [{ name: 'Ivory', hex: '#F5F0E8' }] },
  { id: '2', name: 'Vegan Leather Tote',      slug: 'vegan-leather-tote',      price: 590,  images: ['/images/products/vegan-leather-tote.png'], category: 'accessories', sizes: [], colors: [{ name: 'Black', hex: '#0A0A0A' }] },
  { id: '3', name: 'Wool Overcoat',           slug: 'wool-overcoat',           price: 1250, images: ['/images/products/wool-overcoat.png'], category: 'men', sizes: ['S','M','L','XL'], colors: [{ name: 'Midnight', hex: '#1a1a2e' }] },
  { id: '4', name: 'Asymmetric Drape Dress',  slug: 'asymmetric-drape-dress',  price: 1490, images: ['/images/products/asymmetric-drape-dress.png'], category: 'women', sizes: ['XS','S','M'], colors: [{ name: 'Black', hex: '#0A0A0A' }] },
  { id: '5', name: 'Obsidian Tailored Coat',  slug: 'obsidian-tailored-coat',  price: 2890, images: ['/images/products/obsidian-tailored-coat.png'], category: 'men', sizes: ['S','M','L','XL'], colors: [{ name: 'Obsidian', hex: '#1C1C1C' }] },
]

interface FeaturedPiecesProps {
  excludeSlug?: string
}

export default function FeaturedPieces({ excludeSlug }: FeaturedPiecesProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const displayProducts = excludeSlug 
    ? FEATURED_PRODUCTS.filter(p => p.slug !== excludeSlug)
    : FEATURED_PRODUCTS

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return
    scrollRef.current.scrollBy({ left: dir === 'left' ? -320 : 320, behavior: 'smooth' })
  }

  return (
    <section className="py-20 px-8 md:px-12 lg:px-16">
      {/* Header */}
      <div className="flex items-end justify-between mb-10">
        <div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-3xl md:text-4xl font-light text-velore-white tracking-wide mb-2"
          >
            Featured Pieces
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="text-velore-gray text-xs tracking-widest"
          >
            Curated essentials. Designed to elevate your every moment.
          </motion.p>
        </div>

        <div className="flex items-center gap-4">
          {/* Nav arrows */}
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={() => scroll('left')}
              className="w-8 h-8 rounded-full border border-velore-border flex items-center justify-center
                         hover:border-velore-gold hover:text-velore-gold transition-all duration-300 text-velore-gray"
            >
              <ChevronLeft size={14} />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-8 h-8 rounded-full border border-velore-border flex items-center justify-center
                         hover:border-velore-gold hover:text-velore-gold transition-all duration-300 text-velore-gray"
            >
              <ChevronRight size={14} />
            </button>
          </div>

          <Link
            href="/shop"
            className="flex items-center gap-2 text-velore-gray hover:text-velore-white
                       transition-colors duration-300 group"
          >
            <span className="text-[10px] tracking-[0.3em] uppercase">View All</span>
            <div className="w-6 h-6 rounded-full border border-velore-border flex items-center justify-center
                            group-hover:border-velore-gold group-hover:bg-velore-gold transition-all duration-300">
              <ArrowRight size={10} className="group-hover:text-velore-black transition-colors duration-300" />
            </div>
          </Link>
        </div>
      </div>

      {/* Scrollable row */}
      <div
        ref={scrollRef}
        className="flex gap-5 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {displayProducts.map((product, i) => (
          <div
            key={product.id}
            className="flex-shrink-0 w-56 md:w-64 snap-start"
          >
            <ProductCard product={product} index={i} />
          </div>
        ))}
      </div>
    </section>
  )
}