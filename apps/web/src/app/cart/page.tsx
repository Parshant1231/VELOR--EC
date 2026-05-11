'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ShoppingBag } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Navbar from '../../components/layout/Navbar'
import CartItemComponent from '../../components/cart/CartItem'
import OrderSummary from '../../components/cart/OrderSummary'
import FeaturedPieces from '../../components/home/FeaturedPieces'
import { useCartStore, type CartItem } from '../../store/useCartStore'

export default function CartPage() {
  const router  = useRouter()
  const items   = useCartStore((s) => s.items)
  const count   = useCartStore((s) => s.count())

  return (
    <div className="min-h-screen bg-velore-black">
      <Navbar />

      <div className="pt-28 pb-20 px-6 md:px-12 lg:px-16 max-w-screen-xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-1">
            <h1 className="font-serif font-light leading-none"
                style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}>
              Your
            </h1>
          </div>
          <h1 className="font-serif font-light leading-none"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}>
            Selection
          </h1>
          {count > 0 && (
            <p className="text-velore-gray text-xs tracking-[0.3em] uppercase mt-3">
              {count} {count === 1 ? 'Item' : 'Items'}
            </p>
          )}
          <p className="text-velore-gray text-xs tracking-wide mt-1">
            Curated pieces. Timeless impact.
          </p>
        </motion.div>

        {items.length === 0 ? (
          /* Empty state */
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-32 text-center"
          >
            <ShoppingBag size={40} className="text-velore-border mb-6" />
            <h3 className="font-serif text-3xl text-velore-white font-light mb-3">
              Your bag is empty
            </h3>
            <p className="text-velore-gray text-sm tracking-wide mb-8 max-w-xs">
              Discover our curated collections and add pieces that define your presence.
            </p>
            <Link href="/collections" className="btn-primary">
              Explore Collections
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12">
            {/* Items */}
            <div>
              <AnimatePresence>
                {items.map((item: CartItem, i: number) => (
                  <CartItemComponent
                    key={`${item.product.id}-${item.size}`}
                    product={item.product}
                    quantity={item.quantity}
                    size={item.size}
                    color={item.color}
                    index={i}
                  />
                ))}
              </AnimatePresence>

              {/* Continue shopping */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-8"
              >
                <Link
                  href="/collections"
                  className="inline-flex items-center gap-2 text-velore-gray
                             hover:text-velore-white transition-colors duration-300 group"
                >
                  <div className="w-6 h-6 rounded-full border border-velore-border flex items-center justify-center
                                  group-hover:border-velore-gold transition-all duration-300">
                    <ArrowLeft size={10} className="group-hover:text-velore-gold transition-colors" />
                  </div>
                  <span className="text-[10px] tracking-[0.3em] uppercase">Continue Shopping</span>
                </Link>
              </motion.div>
            </div>

            {/* Order summary */}
            <div>
              <OrderSummary
                ctaLabel="Secure Checkout"
                onCta={() => router.push('/checkout/details')}
              />
            </div>
          </div>
        )}
      </div>

      {/* You may also love */}
      {items.length > 0 && (
        <div className="border-t border-velore-border/30">
          <div className="px-6 md:px-12 lg:px-16 pt-12">
            <div className="flex items-baseline justify-between mb-2">
              <p className="text-[10px] tracking-[0.35em] uppercase text-velore-white">
                You May Also Love
              </p>
              <p className="text-[9px] tracking-[0.2em] uppercase text-velore-gray">
                Curated For You
              </p>
            </div>
          </div>
          <FeaturedPieces />
        </div>
      )}
    </div>
  )
}