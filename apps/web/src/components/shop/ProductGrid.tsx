'use client'

import { motion } from 'framer-motion'
import ProductCard from '../ui/ProductCard'
import { Product } from '../../types'

interface ProductGridProps {
  products: Product[]
  view: 'grid' | 'list'
}

export default function ProductGrid({ products, view }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center py-32">
        <div className="text-center">
          <p className="font-serif text-3xl text-velore-border mb-3">No pieces found</p>
          <p className="text-xs tracking-widest text-velore-gray uppercase">
            Try adjusting your filters
          </p>
        </div>
      </div>
    )
  }

  return (
    <motion.div
      layout
      className={
        view === 'grid'
          ? 'grid grid-cols-2 md:grid-cols-3 gap-x-5 gap-y-10'
          : 'flex flex-col gap-6'
      }
    >
      {products.map((product, i) => (
        <ProductCard key={product.id} product={product} index={i} />
      ))}
    </motion.div>
  )
}