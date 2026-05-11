'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Heart } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { Product } from '../../types'

interface ProductCardProps {
  product: Product
  index?: number
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const [wishlisted, setWishlisted] = useState(false)
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="group relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image container */}
      <Link href={`/products/${product.slug}`}>
        <div className="relative aspect-[3/4] overflow-hidden bg-velore-surface mb-3">
          {product.images && product.images[0] ? (
            <Image src={product.images[0]} alt={product.name} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw" className="object-cover object-center group-hover:scale-105 transition-transform duration-700" />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-velore-surface">
              <span className="font-serif text-6xl text-velore-border">{product.name[0]}</span>
            </div>
          )}

          {/* Hover overlay */}
          <motion.div
            initial={false}
            animate={{ opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 bg-velore-gold/10"
          />

          {/* Add to cart button */}
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 10 }}
            transition={{ duration: 0.25 }}
            className="absolute bottom-4 left-1/2 -translate-x-1/2
                       w-8 h-8 rounded-full bg-velore-white flex items-center justify-center
                       hover:bg-velore-gold transition-colors duration-300 shadow-lg"
            onClick={(e) => { e.preventDefault(); /* add to cart */ }}
          >
            <Plus size={14} className="text-velore-black" />
          </motion.button>

          {/* Wishlist */}
          <button
            onClick={(e) => { e.preventDefault(); setWishlisted(!wishlisted) }}
            className="absolute top-3 right-3 opacity-0 group-hover:opacity-100
                       transition-opacity duration-300"
          >
            <Heart
              size={16}
              className={wishlisted ? 'text-velore-gold fill-velore-gold' : 'text-velore-white'}
            />
          </button>
        </div>
      </Link>

      {/* Info */}
      <div className="space-y-1 px-1">
        <Link href={`/products/${product.slug}`}>
          <p className="text-[11px] tracking-[0.2em] text-velore-white uppercase
                        hover:text-velore-gold transition-colors duration-300 font-medium">
            {product.name}
          </p>
        </Link>
        <p className="text-[11px] tracking-[0.1em] text-velore-gray">
          $ {product.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
        </p>
      </div>
    </motion.div>
  )
}