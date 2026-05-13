'use client'

import { Suspense } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { CheckCircle2, ArrowRight } from 'lucide-react'
import Navbar from '@/src/components/layout/Navbar'
import CheckoutStepper from '@/src/components/checkout/CheckoutStepper'
import ConfirmationContent from './confirmation-content'

function ConfirmationFallback() {
  return (
    <div className="min-h-screen bg-velore-black">
      <Navbar />
      <div className="pt-28 pb-20 px-6 md:px-12 lg:px-16 max-w-screen-xl mx-auto">
        <div className="mb-10">
          <CheckoutStepper currentStep={4} />
        </div>
        <div className="max-w-lg mx-auto text-center py-16">
          <div className="relative w-20 h-20 mx-auto mb-8">
            <div className="absolute inset-0 rounded-full bg-velore-gold/10 animate-pulse" />
          </div>
          <div className="h-8 bg-velore-gray/20 rounded w-48 mx-auto mb-4" />
        </div>
      </div>
    </div>
  )
}

export default function ConfirmationPage() {
  return (
    <Suspense fallback={<ConfirmationFallback />}>
      <ConfirmationContent />
    </Suspense>
  )
}