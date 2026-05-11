'use client'

import { useRouter } from 'next/navigation'
import Navbar from '../../components/layout/Navbar'
import CheckoutStepper from '../../components/checkout/CheckoutStepper'
import { useCartStore } from '../../store/useCartStore'
import { useCheckoutStore } from '../../store/useCheckoutStore'
import Link from 'next/link'
import { ShoppingBag, ArrowRight } from 'lucide-react'

export default function CheckoutPage() {
  const router = useRouter()
  const items = useCartStore((s) => s.items)
  const total = useCartStore((s) => s.total)

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-velore-black">
        <Navbar />
        <div className="pt-28 pb-20 px-6 md:px-12 lg:px-16 max-w-screen-xl mx-auto">
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <ShoppingBag size={40} className="text-velore-border mb-6" />
            <h3 className="font-serif text-3xl text-velore-white font-light mb-3">
              Your bag is empty
            </h3>
            <p className="text-velore-gray text-sm tracking-wide mb-8 max-w-xs">
              Discover our curated collections and add pieces that define your presence.
            </p>
            <Link href="/collections" className="inline-flex items-center gap-2 bg-velore-gold text-velore-black px-6 py-3">
              <span className="text-[10px] tracking-[0.3em] uppercase font-medium">Explore Collections</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-velore-black">
      <Navbar />
      <div className="pt-28 pb-20 px-6 md:px-12 lg:px-16 max-w-screen-xl mx-auto">
        <div className="mb-10">
          <CheckoutStepper currentStep={1} />
        </div>

        <div className="max-w-2xl mx-auto">
          <h1 className="font-serif text-4xl md:text-5xl font-light text-velore-white mb-4">
            Review Your Order
          </h1>
          <p className="text-velore-gray text-sm mb-8">
            Review your selection before proceeding to secure payment.
          </p>

          <div className="border border-velore-border p-8 space-y-4 mb-8">
            {items.map((item) => (
              <div key={`${item.product.id}-${item.size}`} className="flex justify-between items-start">
                <div>
                  <p className="text-velore-white font-light">{item.product.name}</p>
                  <p className="text-velore-gray text-sm mt-1">
                    {item.size && `${item.size} · `}
                    {item.color}
                  </p>
                  <p className="text-velore-gray text-sm">Qty: {item.quantity}</p>
                </div>
                <p className="text-velore-white">
                  ${(item.product.price * item.quantity).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </p>
              </div>
            ))}
          </div>

          <div className="border-t border-velore-border pt-6 mb-8">
            <div className="flex justify-between text-xl mb-4">
              <span className="text-velore-gray">Total</span>
              <span className="text-velore-white font-light">
                ${total().toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/cart" className="text-[10px] tracking-[0.3em] uppercase text-velore-gray hover:text-velore-white transition-colors">
              ← Back to Cart
            </Link>
            <button
              onClick={() => router.push('/checkout/details')}
              className="flex-1 flex items-center justify-center gap-2 bg-velore-gold text-velore-black py-4 text-[10px] tracking-[0.3em] uppercase font-medium hover:bg-velore-gold-light transition-all duration-300"
            >
              Continue to Checkout →
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
