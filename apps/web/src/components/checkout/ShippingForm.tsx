'use client'

import { useForm } from 'react-hook-form'
import { motion, AnimatePresence } from 'framer-motion'
import { ShieldCheck, MessageCircle, Truck, Zap } from 'lucide-react'
import { ShippingAddress, DeliveryMethod, useCheckoutStore } from '../../store/useCheckoutStore'
import { useCartStore, type CartItem } from '../../store/useCartStore'
import { cn } from '../../lib/utils'

const COUNTRIES = ['United States', 'United Kingdom', 'France', 'Germany', 'Italy', 'Japan', 'India']

interface ShippingFormProps {
  onNext: () => void
  onBack: () => void
}

export default function ShippingForm({ onNext, onBack }: ShippingFormProps) {
  const { shipping, delivery, saveInfo, setShipping, setDelivery, setSaveInfo } = useCheckoutStore()

  const { register, handleSubmit, formState: { errors } } = useForm<ShippingAddress>({
    defaultValues: shipping || {
      fullName: '', email: '', phone: '',
      address: '', city: '', zip: '', country: 'United States',
    },
  })

  const onSubmit = (data: ShippingAddress) => {
    setShipping(data)
    onNext()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-0">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-16">
        {/* Left: form */}
        <div>
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <div className="mb-2">
              <p className="text-[9px] tracking-[0.3em] uppercase text-velore-gray-light">
                Step 2 of 4
              </p>
            </div>
            <h1 className="font-serif font-light leading-none mb-2"
                style={{ fontSize: 'clamp(2.5rem, 5vw, 3.8rem)' }}>
              Shipping Details
            </h1>
            <div className="w-8 h-px bg-gradient-to-r from-velore-gold to-transparent mb-4" />
            <p className="text-velore-gray text-sm leading-relaxed max-w-sm">
              Provide your shipping information for a seamless delivery experience.
            </p>
          </motion.div>

          {/* Concierge Assistant */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="border border-velore-border/40 bg-gradient-to-br from-velore-gold/5 to-transparent p-6 mb-10"
          >
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-velore-gold/20 border border-velore-gold/30
                              flex items-center justify-center flex-shrink-0 mt-0.5">
                <MessageCircle size={16} className="text-velore-gold" />
              </div>
              <div className="flex-1">
                <p className="text-[10px] tracking-[0.2em] uppercase text-velore-gold font-medium mb-1">
                  Checkout Concierge
                </p>
                <p className="text-[11px] text-velore-white font-serif mb-2">
                  VELORE Personal Assistant
                </p>
                <p className="text-[10px] text-velore-gray leading-relaxed">
                  Questions about sizing or shipping? Our concierge team is available 24/7 to assist.
                </p>
              </div>
              <button type="button"
                className="text-[9px] tracking-[0.2em] uppercase text-velore-gold
                           border border-velore-gold/40 px-4 py-2 hover:bg-velore-gold/10
                           transition-all duration-300 whitespace-nowrap flex-shrink-0">
                Start Chat
              </button>
            </div>
          </motion.div>

          {/* Shipping Information Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="mb-10"
          >
            <p className="text-[10px] tracking-[0.3em] uppercase text-velore-gray-light mb-6">
              Shipping Information
            </p>

            <div className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="text-[10px] tracking-[0.2em] uppercase text-velore-gray-light block mb-2.5">
                  Full Name
                </label>
                <input
                  {...register('fullName', { required: 'Required' })}
                  placeholder="James Noir"
                  className={cn(
                    'w-full bg-velore-surface border px-4 py-3.5 text-velore-white placeholder-velore-gray/40',
                    'focus:outline-none transition-colors duration-300',
                    errors.fullName ? 'border-red-500/50 focus:border-red-500/70' : 'border-velore-border/50 focus:border-velore-gold/50'
                  )}
                />
              </div>

              {/* Email */}
              <div>
                <label className="text-[10px] tracking-[0.2em] uppercase text-velore-gray-light block mb-2.5">
                  Email Address
                </label>
                <input
                  {...register('email', { required: 'Required', pattern: { value: /^\S+@\S+$/, message: 'Invalid email' } })}
                  type="email"
                  placeholder="james.noir@email.com"
                  className={cn(
                    'w-full bg-velore-surface border px-4 py-3.5 text-velore-white placeholder-velore-gray/40',
                    'focus:outline-none transition-colors duration-300',
                    errors.email ? 'border-red-500/50 focus:border-red-500/70' : 'border-velore-border/50 focus:border-velore-gold/50'
                  )}
                />
              </div>

              {/* Phone */}
              <div>
                <label className="text-[10px] tracking-[0.2em] uppercase text-velore-gray-light block mb-2.5">
                  Phone Number
                </label>
                <input
                  {...register('phone')}
                  type="tel"
                  placeholder="+1 (555) 123 4567"
                  className={cn(
                    'w-full bg-velore-surface border px-4 py-3.5 text-velore-white placeholder-velore-gray/40',
                    'focus:outline-none transition-colors duration-300 border-velore-border/50 focus:border-velore-gold/50'
                  )}
                />
              </div>

              {/* Address */}
              <div>
                <label className="text-[10px] tracking-[0.2em] uppercase text-velore-gray-light block mb-2.5">
                  Street Address
                </label>
                <input
                  {...register('address', { required: 'Required' })}
                  placeholder="1210 Fifth Avenue, Apt. 9A"
                  className={cn(
                    'w-full bg-velore-surface border px-4 py-3.5 text-velore-white placeholder-velore-gray/40',
                    'focus:outline-none transition-colors duration-300',
                    errors.address ? 'border-red-500/50 focus:border-red-500/70' : 'border-velore-border/50 focus:border-velore-gold/50'
                  )}
                />
              </div>

              {/* City + ZIP */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] tracking-[0.2em] uppercase text-velore-gray-light block mb-2.5">
                    City
                  </label>
                  <input
                    {...register('city', { required: 'Required' })}
                    placeholder="New York"
                    className={cn(
                      'w-full bg-velore-surface border px-4 py-3.5 text-velore-white placeholder-velore-gray/40',
                      'focus:outline-none transition-colors duration-300',
                      errors.city ? 'border-red-500/50 focus:border-red-500/70' : 'border-velore-border/50 focus:border-velore-gold/50'
                    )}
                  />
                </div>
                <div>
                  <label className="text-[10px] tracking-[0.2em] uppercase text-velore-gray-light block mb-2.5">
                    ZIP Code
                  </label>
                  <input
                    {...register('zip', { required: 'Required' })}
                    placeholder="10029"
                    className={cn(
                      'w-full bg-velore-surface border px-4 py-3.5 text-velore-white placeholder-velore-gray/40',
                      'focus:outline-none transition-colors duration-300',
                      errors.zip ? 'border-red-500/50 focus:border-red-500/70' : 'border-velore-border/50 focus:border-velore-gold/50'
                    )}
                  />
                </div>
              </div>

              {/* Country */}
              <div>
                <label className="text-[10px] tracking-[0.2em] uppercase text-velore-gray-light block mb-2.5">
                  Country / Region
                </label>
                <select
                  {...register('country')}
                  className={cn(
                    'w-full bg-velore-surface border px-4 py-3.5 text-velore-white cursor-pointer',
                    'focus:outline-none transition-colors duration-300 border-velore-border/50 focus:border-velore-gold/50',
                    'appearance-none'
                  )}
                >
                  {COUNTRIES.map((c) => (
                    <option key={c} value={c} className="bg-velore-surface text-velore-white">{c}</option>
                  ))}
                </select>
              </div>

              {/* Save info checkbox */}
              <label className="flex items-center gap-3 cursor-pointer group pt-2">
                <div
                  onClick={() => setSaveInfo(!saveInfo)}
                  className={cn(
                    'w-5 h-5 border flex items-center justify-center transition-all duration-300 flex-shrink-0',
                    saveInfo 
                      ? 'border-velore-gold bg-velore-gold/20' 
                      : 'border-velore-border group-hover:border-velore-gold/50'
                  )}>
                  {saveInfo && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-2.5 h-2.5 bg-velore-gold" />
                  )}
                </div>
                <span className="text-[10px] tracking-[0.1em] text-velore-gray group-hover:text-velore-white transition-colors">
                  Save this information for faster checkout
                </span>
              </label>
            </div>
          </motion.div>

          {/* Delivery Method Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-10"
          >
            <p className="text-[10px] tracking-[0.3em] uppercase text-velore-gray-light mb-6">
              Delivery Method
            </p>

            <div className="space-y-3">
              {[
                {
                  id:    'standard' as DeliveryMethod,
                  icon:  Truck,
                  name:  'VELORE Signature Delivery',
                  sub:   'Discreet. Secure. Complimentary.',
                  time:  '3–5 Business Days',
                  price: 'Complimentary',
                },
                {
                  id:    'express' as DeliveryMethod,
                  icon:  Zap,
                  name:  'Express Delivery',
                  sub:   'Premium expedited shipping.',
                  time:  '1–2 Business Days',
                  price: '$25.00',
                },
              ].map((method) => (
                <motion.button
                  key={method.id}
                  type="button"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => setDelivery(method.id)}
                  className={cn(
                    'w-full flex items-center gap-4 p-5 border text-left transition-all duration-300 relative overflow-hidden group',
                    delivery === method.id
                      ? 'border-velore-gold bg-velore-gold/10'
                      : 'border-velore-border/40 hover:border-velore-gold/50 hover:bg-velore-border/5'
                  )}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-velore-gold/0 to-velore-gold/0 
                                  group-hover:from-velore-gold/5 group-hover:to-velore-gold/0 transition-all duration-300" />
                  <div className={cn(
                    'w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 relative z-10',
                    delivery === method.id ? 'border-velore-gold' : 'border-velore-border/60 group-hover:border-velore-gold/40'
                  )}>
                    {delivery === method.id && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-2.5 h-2.5 rounded-full bg-velore-gold" />
                    )}
                  </div>
                  <method.icon size={16} className={cn(
                    'flex-shrink-0 transition-colors duration-300 relative z-10',
                    delivery === method.id ? 'text-velore-gold' : 'text-velore-gray group-hover:text-velore-gold/60'
                  )} />
                  <div className="flex-1 relative z-10">
                    <p className="text-[10px] tracking-[0.2em] uppercase text-velore-white font-medium">
                      {method.name}
                    </p>
                    <p className="text-[9px] text-velore-gray mt-1">{method.sub}</p>
                  </div>
                  <div className="text-right flex-shrink-0 relative z-10">
                    <p className="text-[9px] text-velore-gray-light">{method.time}</p>
                    <p className={cn(
                      'text-[11px] mt-2 font-medium',
                      method.price === 'Complimentary' ? 'text-velore-gold' : 'text-velore-white'
                    )}>
                      {method.price}
                    </p>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Trust & Security */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
            className="border border-velore-border/30 bg-gradient-to-br from-velore-gold/5 to-transparent p-6 mb-10"
          >
            <div className="flex items-center gap-2 mb-4">
              <ShieldCheck size={14} className="text-velore-gold" />
              <p className="text-[10px] tracking-[0.2em] uppercase text-velore-gold font-medium">
                Your Information is Safe
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 text-[9px]">
              {['256-bit SSL Encryption', 'Secure Payments', 'Privacy Protected', 'PCI Compliant'].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-velore-gold/60" />
                  <span className="text-velore-gray-light">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="space-y-3"
          >
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-velore-gold
                         text-velore-black py-4 px-6 text-[10px] tracking-[0.3em] uppercase font-semibold
                         hover:bg-velore-gold-light transition-all duration-300 group"
            >
              Continue to Payment
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>

            <button
              type="button"
              onClick={onBack}
              className="w-full text-[10px] tracking-[0.2em] uppercase text-velore-gray
                         hover:text-velore-white transition-colors duration-300 py-2"
            >
              ← Back to Cart
            </button>
          </motion.div>
        </div>

        {/* Right: order summary (compact) */}
        <div className="hidden lg:block">
          <p className="text-[10px] tracking-[0.3em] uppercase text-velore-white mb-4">
            Your Order
          </p>
          <OrderSummaryCompact />
        </div>
      </div>
    </form>
  )
}

// Compact order summary for checkout sidebar
function OrderSummaryCompact() {
  const cartItems = useCartStore((s) => s.items)
  const total = useCartStore((s) => s.total)

  return (
    <div className="border border-velore-border p-5 space-y-4">
      {cartItems.slice(0, 3).map((item: CartItem) => (
        <div key={item.product.id} className="flex gap-3 items-start">
          <div className="w-14 h-16 bg-velore-surface border border-velore-border/50
                          flex items-center justify-center flex-shrink-0">
            <span className="font-serif text-xl text-velore-border/50">{item.product.name[0]}</span>
          </div>
          <div className="flex-1">
            <p className="text-[10px] tracking-[0.15em] uppercase text-velore-white leading-tight">
              {item.product.name}
            </p>
            {item.size && (
              <p className="text-[9px] text-velore-gray mt-0.5">{item.size}</p>
            )}
            <p className="text-[11px] text-velore-gray-light mt-1">
              ${(item.product.price * item.quantity).toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </p>
          </div>
        </div>
      ))}
      <div className="border-t border-velore-border pt-3">
        <div className="flex justify-between text-[11px] mb-1">
          <span className="text-velore-gray">Subtotal</span>
          <span className="text-velore-white">${total().toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
        </div>
        <div className="flex justify-between text-[11px]">
          <span className="text-velore-gray">Shipping</span>
          <span className="text-velore-gold">Complimentary</span>
        </div>
        <div className="flex justify-between mt-3 pt-3 border-t border-velore-border">
          <span className="text-[10px] tracking-widest uppercase text-velore-gray-light">Total</span>
          <span className="font-serif text-lg text-velore-white">
            ${total().toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-4 text-[8px] tracking-widest uppercase text-velore-gray pt-1">
        <span className="flex items-center gap-1"><ShieldCheck size={9} className="text-velore-gold" /> Secure</span>
        <span>Easy Returns</span>
        <span>Private Care</span>
      </div>
    </div>
  )
}