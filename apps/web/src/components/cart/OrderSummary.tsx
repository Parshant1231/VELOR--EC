'use client'

import { motion } from 'framer-motion'
import { Plus, ShieldCheck } from 'lucide-react'
import { useCartStore } from '../../store/useCartStore'
import { cn } from '../../lib/utils'

interface OrderSummaryProps {
  ctaLabel?:  string
  onCta?:     () => void
  showExpress?: boolean
  compact?:   boolean
}

export default function OrderSummary({
  ctaLabel = 'Secure Checkout',
  onCta,
  showExpress = true,
  compact = false,
}: OrderSummaryProps) {
  const total = useCartStore((s) => s.total())
  const count = useCartStore((s) => s.count())

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-velore-surface border border-velore-border p-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <span className="text-[10px] tracking-[0.3em] uppercase text-velore-white">
          Order Summary
        </span>
        <button className="w-5 h-5 border border-velore-border flex items-center justify-center
                           hover:border-velore-gold transition-colors duration-300">
          <Plus size={10} className="text-velore-gray" />
        </button>
      </div>

      {/* Lines */}
      <div className="space-y-3 mb-5">
        <div className="flex justify-between">
          <span className="text-[11px] tracking-wide text-velore-gray">
            Subtotal ({count} {count === 1 ? 'item' : 'items'})
          </span>
          <span className="text-[11px] text-velore-white">
            ${total.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-[11px] tracking-wide text-velore-gray">Shipping</span>
          <span className="text-[11px] text-velore-gold tracking-widest">Complimentary</span>
        </div>
        <div className="flex justify-between">
          <span className="text-[11px] tracking-wide text-velore-gray">Taxes</span>
          <span className="text-[11px] text-velore-white">$0.00</span>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-velore-border mb-5" />

      {/* Total */}
      <div className="flex items-baseline justify-between mb-6">
        <span className="text-[11px] tracking-[0.2em] uppercase text-velore-gray-light">Total</span>
        <div className="text-right">
          <span className="text-[10px] tracking-widest text-velore-gray mr-2">USD</span>
          <span className="font-serif text-2xl text-velore-white font-light">
            ${total.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </span>
        </div>
      </div>

      {/* CTA */}
      {onCta && (
        <button
          onClick={onCta}
          className="w-full flex items-center justify-center gap-2 bg-velore-gold
                     text-velore-black py-4 text-[10px] tracking-[0.3em] uppercase
                     font-medium hover:bg-velore-gold-light transition-all duration-300 mb-3"
        >
          <ShieldCheck size={13} />
          {ctaLabel}
        </button>
      )}

      {/* Express checkout */}
      {showExpress && (
        <>
          <p className="text-center text-[9px] tracking-[0.2em] uppercase text-velore-gray mb-3">
            Express Checkout
          </p>
          <div className="grid grid-cols-3 gap-2">
            {['Apple Pay', 'G Pay', 'PayPal'].map((method) => (
              <button
                key={method}
                className="border border-velore-border py-2.5 text-[9px] tracking-wide
                           text-velore-gray hover:border-velore-gold hover:text-velore-white
                           transition-all duration-300"
              >
                {method}
              </button>
            ))}
          </div>
        </>
      )}

      {/* Trust */}
      <div className="flex items-center justify-center gap-2 mt-4">
        <ShieldCheck size={11} className="text-velore-gold" />
        <span className="text-[9px] tracking-wide text-velore-gray">
          Complimentary worldwide shipping
        </span>
      </div>
    </motion.div>
  )
}