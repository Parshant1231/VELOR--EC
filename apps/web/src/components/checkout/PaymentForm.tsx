'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShieldCheck, CreditCard, Smartphone, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react'
import { useCartStore } from '../../store/useCartStore'
import { useCheckoutStore, PaymentMethod } from '../../store/useCheckoutStore'
import { cn } from '../../lib/utils'

const PAYMENT_METHODS: { id: PaymentMethod; label: string; demo?: boolean }[] = [
  { id: 'apple_pay',  label: 'Apple Pay' },
  { id: 'card',       label: 'Card',    demo: true },
  { id: 'upi',        label: 'UPI',     demo: true },
  { id: 'paypal',     label: 'PayPal',  demo: true },
  { id: 'wallet',     label: 'Wallet',  demo: true },
]

type PaymentState = 'idle' | 'processing' | 'success' | 'error'

interface PaymentFormProps {
  onBack:    () => void
  onSuccess: (orderId: string) => void
}

export default function PaymentForm({ onBack, onSuccess }: PaymentFormProps) {
  const { payment, setPayment, shipping } = useCheckoutStore()
  const { items, total, clearCart }       = useCartStore()
  const [state,     setState]     = useState<PaymentState>('idle')
  const [cardForm,  setCardForm]  = useState({ number: '', name: shipping?.fullName || '', expiry: '', cvv: '', save: false })

  const handleCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    let v = value
    if (name === 'number') v = value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim().slice(0, 19)
    if (name === 'expiry') v = value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2').slice(0, 5)
    if (name === 'cvv')    v = value.replace(/\D/g, '').slice(0, 4)
    setCardForm((f) => ({ ...f, [name]: type === 'checkbox' ? checked : v }))
  }

  const handlePay = async () => {
    setState('processing')
    // DEMO — simulate payment delay
    await new Promise((r) => setTimeout(r, 2500))

    // 90% success rate for demo realism
    const success = Math.random() > 0.1
    if (success) {
      const orderId = `VEL-${Math.floor(Math.random() * 90000 + 10000)}-${new Date().getFullYear()}`
      setState('success')
      clearCart()
      setTimeout(() => onSuccess(orderId), 1200)
    } else {
      setState('error')
    }
  }

  // Processing overlay
  if (state === 'processing') {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-[60vh] flex flex-col items-center justify-center text-center py-20"
      >
        <div className="relative w-20 h-20 mb-8">
          <div className="absolute inset-0 rounded-full border border-velore-gold/30 animate-ping" />
          <div className="absolute inset-2 rounded-full border border-velore-gold/50 animate-ping"
               style={{ animationDelay: '0.3s' }} />
          <div className="absolute inset-0 flex items-center justify-center">
            <ShieldCheck size={28} className="text-velore-gold" />
          </div>
        </div>
        <h2 className="font-serif text-2xl font-light text-velore-white mb-3">
          Please wait while we secure your transaction.
        </h2>
        <p className="text-velore-gray text-xs tracking-wide">
          This will only take a few seconds.
        </p>
        <p className="text-[9px] text-velore-gray/60 mt-4 tracking-widest">
          Do not close this window or refresh the page.
        </p>
      </motion.div>
    )
  }

  // Success
  if (state === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        className="min-h-[60vh] flex flex-col items-center justify-center text-center py-20"
      >
        <CheckCircle2 size={40} className="text-velore-gold mb-6" />
        <h2 className="font-serif text-4xl font-light text-velore-white mb-3">
          Payment Successful
        </h2>
        <p className="text-velore-gray text-sm tracking-wide">Redirecting...</p>
      </motion.div>
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-16">
      {/* Left: payment */}
      <div>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="mb-2">
            <p className="text-[9px] tracking-[0.3em] uppercase text-velore-gray-light">
              Step 3 of 4
            </p>
          </div>
          <h1 className="font-serif font-light leading-none mb-2"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 3.8rem)' }}>
            Payment
          </h1>
          <div className="w-8 h-px bg-gradient-to-r from-velore-gold to-transparent mb-4" />
          <p className="text-velore-gray text-sm leading-relaxed max-w-sm">
            Select your preferred payment method. Your transaction is fully secured with bank-grade encryption.
          </p>
        </motion.div>

        {/* Payment Methods Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-10"
        >
          <p className="text-[10px] tracking-[0.3em] uppercase text-velore-gray-light mb-5">
            Select Method
          </p>
          <div className="grid grid-cols-2 gap-3">
            {PAYMENT_METHODS.map((m) => (
              <motion.button
                key={m.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setPayment(m.id)}
                className={cn(
                  'relative px-4 py-5 border transition-all duration-300 overflow-hidden group',
                  'text-left flex flex-col items-start justify-between',
                  payment === m.id
                    ? 'border-velore-gold bg-velore-gold/10'
                    : 'border-velore-border hover:border-velore-gold/50 hover:bg-velore-border/5'
                )}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-velore-gold/0 to-velore-gold/0 
                                group-hover:from-velore-gold/5 group-hover:to-velore-gold/0 transition-all duration-300" />
                <div className="relative z-10 flex items-start justify-between w-full">
                  <div>
                    <CreditCard size={16} className={cn(
                      'mb-3 transition-colors duration-300',
                      payment === m.id ? 'text-velore-gold' : 'text-velore-gray'
                    )} />
                    <span className="text-[11px] tracking-[0.15em] uppercase text-velore-white font-medium">
                      {m.label}
                    </span>
                  </div>
                  {payment === m.id && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-3.5 h-3.5 rounded-full bg-velore-gold" />
                  )}
                </div>
                {m.demo && (
                  <span className="relative z-10 text-[8px] tracking-widest uppercase text-velore-gold/70
                                   mt-3">Demo Mode</span>
                )}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Card Form - Elegant Design */}
        <AnimatePresence>
          {payment === 'card' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="mb-10"
            >
              <div className="border border-velore-border/40 bg-gradient-to-br from-velore-border/5 to-transparent p-8">
                <p className="text-[10px] tracking-[0.3em] uppercase text-velore-gold mb-6">
                  Card Information
                </p>
                
                {/* Card Visual Preview */}
                <div className="bg-gradient-to-br from-velore-gold/20 via-velore-gold/10 to-transparent 
                                border border-velore-gold/30 rounded-lg p-6 mb-8">
                  <div className="text-velore-gray-light text-[11px] tracking-[0.2em] uppercase mb-8">
                    Card Details
                  </div>
                  <p className="font-mono text-velore-gold text-lg tracking-[0.25em] mb-6">
                    {cardForm.number || '•••• •••• •••• ••••'}
                  </p>
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-[8px] text-velore-gray-light tracking-widest uppercase mb-1">
                        Card Holder
                      </p>
                      <p className="text-velore-white font-light text-sm">
                        {cardForm.name || 'Your Name'}
                      </p>
                    </div>
                    <div>
                      <p className="text-[8px] text-velore-gray-light tracking-widest uppercase mb-1">
                        Expires
                      </p>
                      <p className="font-mono text-velore-gold">
                        {cardForm.expiry || 'MM/YY'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-5">
                  <div>
                    <label className="text-[10px] tracking-[0.2em] uppercase text-velore-gray-light block mb-2.5">
                      Card Number
                    </label>
                    <input
                      name="number"
                      value={cardForm.number}
                      onChange={handleCardChange}
                      placeholder="1234 5678 9012 3456"
                      className="w-full bg-velore-surface border border-velore-border/50 px-4 py-3.5
                                 text-velore-white placeholder-velore-gray/40 font-mono text-sm
                                 focus:outline-none focus:border-velore-gold/50 transition-colors duration-300"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] tracking-[0.2em] uppercase text-velore-gray-light block mb-2.5">
                      Cardholder Name
                    </label>
                    <input
                      name="name"
                      value={cardForm.name}
                      onChange={handleCardChange}
                      placeholder="Full Name"
                      className="w-full bg-velore-surface border border-velore-border/50 px-4 py-3.5
                                 text-velore-white placeholder-velore-gray/40
                                 focus:outline-none focus:border-velore-gold/50 transition-colors duration-300"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] tracking-[0.2em] uppercase text-velore-gray-light block mb-2.5">
                        Expires
                      </label>
                      <input
                        name="expiry"
                        value={cardForm.expiry}
                        onChange={handleCardChange}
                        placeholder="MM/YY"
                        className="w-full bg-velore-surface border border-velore-border/50 px-4 py-3.5
                                   text-velore-white placeholder-velore-gray/40 font-mono
                                   focus:outline-none focus:border-velore-gold/50 transition-colors duration-300"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] tracking-[0.2em] uppercase text-velore-gray-light block mb-2.5">
                        CVV
                      </label>
                      <input
                        name="cvv"
                        value={cardForm.cvv}
                        onChange={handleCardChange}
                        placeholder="•••"
                        className="w-full bg-velore-surface border border-velore-border/50 px-4 py-3.5
                                   text-velore-white placeholder-velore-gray/40 font-mono
                                   focus:outline-none focus:border-velore-gold/50 transition-colors duration-300"
                      />
                    </div>
                  </div>

                  <label className="flex items-center gap-3 cursor-pointer group pt-2">
                    <div
                      onClick={() => setCardForm((f) => ({ ...f, save: !f.save }))}
                      className={cn(
                        'w-5 h-5 border flex items-center justify-center transition-all duration-300',
                        cardForm.save 
                          ? 'border-velore-gold bg-velore-gold/20' 
                          : 'border-velore-border group-hover:border-velore-gold/50'
                      )}>
                      {cardForm.save && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-2.5 h-2.5 bg-velore-gold" />
                      )}
                    </div>
                    <span className="text-[10px] tracking-[0.1em] text-velore-gray group-hover:text-velore-white transition-colors">
                      Save card for faster checkout
                    </span>
                  </label>
                </div>
              </div>
            </motion.div>
          )}

          {/* UPI QR */}
          {payment === 'upi' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-10"
            >
              <div className="border border-velore-border/40 bg-gradient-to-br from-velore-border/5 to-transparent p-8 text-center">
                <p className="text-[10px] tracking-[0.3em] uppercase text-velore-gold mb-6">
                  UPI Payment
                </p>
                <div className="w-40 h-40 bg-velore-surface border border-velore-border/50 mx-auto mb-6
                                flex items-center justify-center">
                  <Smartphone size={40} className="text-velore-border/50" />
                </div>
                <p className="text-[10px] text-velore-gray tracking-[0.05em] leading-relaxed mb-4">
                  Open your UPI app and scan the QR code to complete your payment securely.
                </p>
                <p className="font-serif text-2xl text-velore-white mt-6">
                  ${total().toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Error State */}
        <AnimatePresence>
          {state === 'error' && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="border border-red-500/30 bg-red-500/5 p-5 mb-8 flex items-start gap-4"
            >
              <AlertCircle size={16} className="text-red-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-[10px] tracking-[0.2em] uppercase text-red-400 mb-1 font-medium">
                  Payment Declined
                </p>
                <p className="text-[11px] text-velore-gray leading-relaxed">
                  Your payment couldn't be processed. Please check your details or try another payment method.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Security Trust Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="border border-velore-border/30 bg-gradient-to-br from-velore-gold/5 to-transparent p-6 mb-10"
        >
          <div className="flex items-center gap-3 mb-4">
            <ShieldCheck size={14} className="text-velore-gold" />
            <p className="text-[10px] tracking-[0.2em] uppercase text-velore-gold font-medium">
              Your Payment is Secure
            </p>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: 'SSL Encrypted', icon: '🔒' },
              { label: 'PCI Compliant', icon: '✓' },
              { label: '256-Bit Secure', icon: '🛡' }
            ].map((badge) => (
              <div key={badge.label} className="text-center">
                <p className="text-xl mb-2">{badge.icon}</p>
                <p className="text-[8px] tracking-widest uppercase text-velore-gray-light leading-tight">
                  {badge.label}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
          className="space-y-3"
        >
          <button
            onClick={handlePay}
            disabled={state !== 'idle'}
            className="w-full flex items-center justify-center gap-3 bg-velore-gold
                       text-velore-black py-4 px-6 text-[10px] tracking-[0.3em] uppercase font-semibold
                       hover:bg-velore-gold-light transition-all duration-300 group
                       disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ShieldCheck size={14} className="group-hover:scale-110 transition-transform" />
            Complete Payment of ${total().toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </button>

          {state === 'error' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-2 gap-3"
            >
              <button
                onClick={() => setState('idle')}
                className="border border-velore-border text-velore-gray text-[10px]
                           tracking-[0.2em] uppercase py-3 px-4 hover:border-velore-gold 
                           hover:text-velore-white transition-all duration-300"
              >
                Try Again
              </button>
              <button
                onClick={() => { setState('idle'); setPayment('card') }}
                className="border border-velore-border text-velore-gray text-[10px]
                           tracking-[0.2em] uppercase py-3 px-4 hover:border-velore-gold 
                           hover:text-velore-white transition-all duration-300"
              >
                Change Method
              </button>
            </motion.div>
          )}

          <button
            type="button"
            onClick={onBack}
            className="w-full text-[10px] tracking-[0.2em] uppercase text-velore-gray
                       hover:text-velore-white transition-colors duration-300 py-2"
          >
            ← Return to Shipping
          </button>
        </motion.div>

        <p className="text-center text-[8px] text-velore-gray/50 mt-6 tracking-[0.05em]">
          This is a secure DEMO payment environment
        </p>
      </div>

      {/* Right: Order Summary Sidebar */}
      <div>
        <p className="text-[10px] tracking-[0.3em] uppercase text-velore-white mb-4">
          Order Summary
        </p>
        <div className="border border-velore-border p-5 space-y-3">
          {items.slice(0, 3).map((item) => (
            <div key={item.product.id} className="flex gap-3">
              <div className="w-14 h-16 bg-velore-surface border border-velore-border/50
                              flex items-center justify-center flex-shrink-0">
                <span className="font-serif text-xl text-velore-border/50">{item.product.name[0]}</span>
              </div>
              <div>
                <p className="text-[10px] tracking-[0.15em] uppercase text-velore-white leading-tight">
                  {item.product.name}
                </p>
                <p className="text-[9px] text-velore-gray mt-0.5">
                  {item.size && `${item.size} · `}
                  {item.color}
                </p>
                <p className="text-[11px] text-velore-gray-light mt-1">
                  ${(item.product.price * item.quantity).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </p>
              </div>
            </div>
          ))}
          {items.length > 3 && (
            <p className="text-[9px] text-velore-gray tracking-wide">
              +{items.length - 3} more items
            </p>
          )}
          <div className="border-t border-velore-border pt-3 space-y-2">
            <div className="flex justify-between text-[11px]">
              <span className="text-velore-gray">Subtotal</span>
              <span className="text-velore-white">${total().toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
            </div>
            <div className="flex justify-between text-[11px]">
              <span className="text-velore-gray">Shipping</span>
              <span className="text-velore-gold">Complimentary</span>
            </div>
            <div className="flex justify-between text-[11px]">
              <span className="text-velore-gray">Taxes</span>
              <span className="text-velore-white">$0.00</span>
            </div>
          </div>
          <div className="border-t border-velore-border pt-3 flex justify-between items-baseline">
            <span className="text-[10px] tracking-widest uppercase text-velore-gray-light">Total</span>
            <span className="font-serif text-xl text-velore-white">
              ${total().toLocaleString('en-US', { minimumFractionDigits: 2 })} USD
            </span>
          </div>
          <div className="flex items-center justify-center gap-2 pt-2">
            <ShieldCheck size={11} className="text-velore-gold" />
            <span className="text-[9px] text-velore-gray">30-Day Easy Returns</span>
          </div>
        </div>
      </div>
    </div>
  )
}