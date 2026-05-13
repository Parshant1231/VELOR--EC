'use client'

import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { CheckCircle2, ArrowRight } from 'lucide-react'
import Navbar from '@/src/components/layout/Navbar'
import CheckoutStepper from '@/src/components/checkout/CheckoutStepper'
import { useCheckoutStore } from '@/src/store/useCheckoutStore'

export default function ConfirmationContent() {
  const params = useSearchParams()
  const orderId = params.get('order') || 'VEL-00000-2025'
  const { shipping, reset } = useCheckoutStore()

  return (
    <div className="min-h-screen bg-velore-black">
      <Navbar />
      <div className="pt-28 pb-20 px-6 md:px-12 lg:px-16 max-w-screen-xl mx-auto">
        <div className="mb-10">
          <CheckoutStepper currentStep={4} />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-lg mx-auto text-center py-16"
        >
          {/* Glow ring */}
          <div className="relative w-20 h-20 mx-auto mb-8">
            <div className="absolute inset-0 rounded-full bg-velore-gold/10 animate-ping" />
            <div className="absolute inset-0 flex items-center justify-center">
              <CheckCircle2 size={36} className="text-velore-gold" />
            </div>
          </div>

          <p className="section-label mb-3">Payment Successful</p>
          <h1 className="font-serif text-4xl md:text-5xl font-light text-velore-white mb-4">
            Thank You,<br />
            <em>{shipping?.fullName?.split(' ')[0] || 'Valued Client'}.</em>
            {' '}✦
          </h1>
          <p className="text-velore-gray text-sm leading-relaxed mb-6 max-w-sm mx-auto">
            Your order has been placed successfully.<br />
            You will receive a confirmation email shortly.
          </p>

          {/* Order ID */}
          <div className="border border-velore-border px-6 py-3 inline-flex items-center gap-3 mb-8">
            <span className="text-[9px] tracking-[0.3em] uppercase text-velore-gray">Order ID</span>
            <span className="text-sm tracking-widest text-velore-gold">{orderId}</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/account"
              onClick={reset}
              className="btn-primary flex items-center justify-center gap-2"
            >
              View Order Details
              <ArrowRight size={12} />
            </Link>
            <Link
              href="/collections"
              onClick={reset}
              className="btn-ghost flex items-center justify-center"
            >
              Continue Shopping
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
