'use client'

import { ShieldCheck } from 'lucide-react'
import { cn } from '../../lib/utils'

const STEPS = [
  { id: 1, key: 'bag',          label: 'Bag' },
  { id: 2, key: 'details',      label: 'Details' },
  { id: 3, key: 'payment',      label: 'Payment' },
  { id: 4, key: 'confirmation', label: 'Confirmation' },
]

interface CheckoutStepperProps {
  currentStep: number // 1-4
}

export default function CheckoutStepper({ currentStep }: CheckoutStepperProps) {
  return (
    <div className="flex items-center justify-center gap-0 w-full">
      {STEPS.map((step, i) => (
        <div key={step.key} className="flex items-center">
          {/* Step bubble */}
          <div className="flex flex-col items-center gap-1.5">
            <div className={cn(
              'w-7 h-7 rounded-full border flex items-center justify-center transition-all duration-300',
              currentStep === step.id
                ? 'border-velore-gold bg-velore-gold/20 text-velore-gold'
                : currentStep > step.id
                  ? 'border-velore-gold bg-velore-gold text-velore-black'
                  : 'border-velore-border text-velore-gray'
            )}>
              <span className="text-[10px] font-medium">{step.id}</span>
            </div>
            <span className={cn(
              'text-[8px] tracking-[0.25em] uppercase transition-colors duration-300',
              currentStep >= step.id ? 'text-velore-white' : 'text-velore-gray'
            )}>
              {step.label}
            </span>
          </div>

          {/* Connector line */}
          {i < STEPS.length - 1 && (
            <div className={cn(
              'w-16 md:w-24 h-px mx-3 mb-5 transition-colors duration-500',
              currentStep > step.id ? 'bg-velore-gold' : 'bg-velore-border'
            )} />
          )}
        </div>
      ))}

      {/* Secure badge */}
      <div className="ml-6 mb-5 hidden md:flex items-center gap-1.5 text-velore-gray">
        <ShieldCheck size={12} className="text-velore-gold" />
        <span className="text-[9px] tracking-widest uppercase">Secure Checkout</span>
      </div>
    </div>
  )
}