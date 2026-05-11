'use client'

import { motion } from 'framer-motion'
import { Minus, Plus, X } from 'lucide-react'
import { useCartStore } from '../../store/useCartStore'
import { Product } from '../../types'

interface CartItemProps {
  product:  Product
  quantity: number
  size?:    string
  color?:   string
  index:    number
}

export default function CartItem({
  product, quantity, size, color, index
}: CartItemProps) {
  const { updateQuantity, removeItem } = useCartStore()

  return (
    <motion.div
      initial={{ opacity: 0, x: -15 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 15, height: 0 }}
      transition={{ delay: index * 0.07 }}
      className="flex gap-5 py-6 border-b border-velore-border/50 group"
    >
      {/* IMAGE PLACEHOLDER */}
      {/* Replace with <Image src={product.images[0]} ... /> */}
      <div className="w-24 h-28 bg-velore-surface border border-velore-border flex-shrink-0
                      flex items-center justify-center overflow-hidden">
        <span className="font-serif text-3xl text-velore-border/50">{product.name[0]}</span>
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[11px] tracking-[0.2em] uppercase text-velore-white font-medium mb-1">
              {product.name}
            </p>
            {(size || color) && (
              <p className="text-[10px] tracking-wide text-velore-gray">
                {color}{size && color ? ' / ' : ''}{size}
              </p>
            )}
          </div>
          <div className="text-right flex-shrink-0">
            <p className="text-[13px] tracking-widest text-velore-white">
              ${(product.price * quantity).toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between mt-4">
          {/* Quantity controls */}
          <div className="flex items-center border border-velore-border">
            <button
              onClick={() => updateQuantity(product.id, quantity - 1)}
              className="w-8 h-8 flex items-center justify-center text-velore-gray
                         hover:text-velore-white hover:bg-velore-surface transition-all duration-200"
            >
              <Minus size={10} />
            </button>
            <span className="w-8 text-center text-[11px] text-velore-white tracking-widest">
              {quantity}
            </span>
            <button
              onClick={() => updateQuantity(product.id, quantity + 1)}
              className="w-8 h-8 flex items-center justify-center text-velore-gray
                         hover:text-velore-white hover:bg-velore-surface transition-all duration-200"
            >
              <Plus size={10} />
            </button>
          </div>

          {/* Remove */}
          <button
            onClick={() => removeItem(product.id)}
            className="text-[9px] tracking-[0.2em] uppercase text-velore-gray
                       hover:text-velore-gold transition-colors duration-300 flex items-center gap-1"
          >
            <X size={9} />
            Remove
          </button>
        </div>
      </div>
    </motion.div>
  )
}