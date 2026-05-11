'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ShoppingBag, Heart, ExternalLink, Package, RefreshCw, Crown, Hash } from 'lucide-react'
import { cn } from '../../lib/utils'

import { Product } from '../../types'
import { useCartStore } from '../../store/useCartStore'
import { useWishlistStore } from '../../store/useWishlistStore'

const TRUST_BADGES = [
  { icon: Package,    label: 'Complimentary', sub: 'Shipping' },
  { icon: Crown,      label: 'Crafted',       sub: 'To Order' },
  { icon: Heart,      label: 'Private Client', sub: 'Services' },
  { icon: RefreshCw,  label: 'Easy',          sub: 'Returns' },
]

interface ProductInfoProps {
  product: Product
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const [selectedSize,  setSelectedSize]  = useState<string>('')
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || '')
  const [added,         setAdded]         = useState(false)

  const addItem      = useCartStore((s) => s.addItem)
  const toggleWish   = useWishlistStore((s) => s.toggle)
  const isWishlisted = useWishlistStore((s) => s.has(product.id))

  const handleAddToCart = () => {
    if (product.sizes.length > 0 && !selectedSize) return
    addItem(product, selectedSize, selectedColor)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col h-full overflow-y-auto"
    >
      {/* Collection label */}
      <p className="section-label mb-3">{product.collection} Collection</p>

      {/* Product name */}
      <h1 className="font-serif font-light leading-none mb-4"
          style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>
        {product.name}
      </h1>

      {/* Price */}
      <p className="text-velore-white text-xl tracking-widest mb-4">
        ${product.price.toLocaleString('en-US', { minimumFractionDigits: 2 })} USD
      </p>

      {/* Description */}
      <p className="text-velore-gray text-sm leading-relaxed mb-8 max-w-sm">
        {product.description}
      </p>

      {/* Color selector */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-[10px] tracking-[0.3em] uppercase text-velore-gray-light">Color</span>
          <span className="text-[10px] tracking-[0.2em] uppercase text-velore-white">
            — {selectedColor}
          </span>
        </div>
        <div className="flex gap-2.5">
          {product.colors.map((color) => (
            <button
              key={color.name}
              onClick={() => setSelectedColor(color.name)}
              title={color.name}
              className={cn(
                'w-8 h-8 rounded-full border-2 transition-all duration-300',
                selectedColor === color.name
                  ? 'border-velore-gold scale-110'
                  : 'border-velore-border hover:border-velore-gray'
              )}
              style={{ backgroundColor: color.hex }}
            />
          ))}
        </div>
      </div>

      {/* Size selector */}
      {product.sizes.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] tracking-[0.3em] uppercase text-velore-gray-light">Size</span>
            <button className="flex items-center gap-1 text-[9px] tracking-widest text-velore-gray
                               hover:text-velore-gold transition-colors duration-300 uppercase">
              <ExternalLink size={9} />
              Size Guide
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={cn(
                  'min-w-[3rem] h-9 px-3 border text-[10px] tracking-widest uppercase',
                  'transition-all duration-300',
                  selectedSize === size
                    ? 'border-velore-gold bg-velore-gold/10 text-velore-white'
                    : 'border-velore-border text-velore-gray hover:border-velore-gray hover:text-velore-white'
                )}
              >
                {size}
              </button>
            ))}
          </div>
          {product.sizes.length > 0 && !selectedSize && (
            <p className="text-[9px] text-velore-gold/70 mt-2 tracking-widest">Select a size to continue</p>
          )}
        </div>
      )}

      {/* Add to cart */}
      <motion.button
        whileTap={{ scale: 0.98 }}
        onClick={handleAddToCart}
        disabled={product.sizes.length > 0 && !selectedSize}
        className={cn(
          'w-full flex items-center justify-center gap-3 py-4 mb-3',
          'text-[10px] tracking-[0.3em] uppercase font-medium transition-all duration-300',
          added
            ? 'bg-velore-gold/20 border border-velore-gold text-velore-gold'
            : product.sizes.length > 0 && !selectedSize
              ? 'bg-velore-border text-velore-gray cursor-not-allowed'
              : 'bg-velore-gold text-velore-black hover:bg-velore-gold-light'
        )}
      >
        <ShoppingBag size={14} />
        {added ? 'Added to Bag' : `Acquire Piece`}
        {!added && product.price > 0 && (
          <span className="ml-1 opacity-70">— ${product.price.toLocaleString()}</span>
        )}
      </motion.button>

      {/* Wishlist */}
      <button
        onClick={() => toggleWish(product)}
        className={cn(
          'w-full flex items-center justify-center gap-2 py-3 border text-[10px] tracking-[0.3em] uppercase',
          'transition-all duration-300',
          isWishlisted
            ? 'border-velore-gold text-velore-gold'
            : 'border-velore-border text-velore-gray hover:border-velore-gray hover:text-velore-white'
        )}
      >
        <Heart size={12} className={isWishlisted ? 'fill-velore-gold' : ''} />
        {isWishlisted ? 'Saved to Wishlist' : 'Add to Wishlist'}
      </button>

      {/* Trust badges */}
      <div className="grid grid-cols-4 gap-2 mt-8 pt-8 border-t border-velore-border/50">
        {TRUST_BADGES.map(({ icon: Icon, label, sub }) => (
          <div key={label} className="flex flex-col items-center gap-1.5 text-center">
            <Icon size={14} className="text-velore-gray" />
            <div>
              <p className="text-[8px] tracking-widest uppercase text-velore-gray-light leading-tight">
                {label}
              </p>
              <p className="text-[8px] tracking-widest uppercase text-velore-gray leading-tight">
                {sub}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Craftsmanship features */}
      <div className="mt-8 pt-6 border-t border-velore-border/50 grid grid-cols-2 gap-4">
        {[
          { label: 'Italian Fabric', sub: 'Premium Loro Piana Wool' },
          { label: 'Handcrafted',   sub: 'By Master Artisans' },
          { label: 'Limited Edition', sub: 'Only 250 Pieces' },
          { label: 'Serial Numbered', sub: 'Unique To You' },
        ].map(({ label, sub }) => (
          <div key={label} className="flex items-start gap-2">
            <div className="w-6 h-6 rounded-full border border-velore-border flex items-center justify-center flex-shrink-0 mt-0.5">
              <Hash size={8} className="text-velore-gold" />
            </div>
            <div>
              <p className="text-[9px] tracking-widest uppercase text-velore-gray-light">{label}</p>
              <p className="text-[9px] text-velore-gray">{sub}</p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}