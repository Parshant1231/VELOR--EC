'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Eye, EyeOff, Loader2 } from 'lucide-react'
import { useAuthStore } from '../../store/useAuthStore'
import { cn } from '../../lib/utils'

interface AuthModalProps {
  isOpen:  boolean
  onClose: () => void
  defaultTab?: 'login' | 'register'
}

export default function AuthModal({ isOpen, onClose, defaultTab = 'login' }: AuthModalProps) {
  const [tab,         setTab]         = useState<'login' | 'register'>(defaultTab)
  const [showPass,    setShowPass]    = useState(false)
  const [form,        setForm]        = useState({ email: '', password: '', name: '' })

  const { login, register, loading, error, clearError } = useAuthStore()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (tab === 'login') {
        await login(form.email, form.password)
      } else {
        await register(form.email, form.password, form.name)
      }
      onClose()
    } catch {
      // error is set in store
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    clearError()
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0,  scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ type: 'spring', damping: 28, stiffness: 350 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="w-full max-w-sm bg-velore-dark border border-velore-border relative">
              {/* Close */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-velore-gray hover:text-velore-white
                           transition-colors duration-300"
              >
                <X size={16} />
              </button>

              <div className="p-8">
                {/* Logo */}
                <div className="text-center mb-8">
                  <p className="font-serif text-2xl tracking-[0.2em] text-velore-white mb-1">
                    VELORÉ
                  </p>
                  <p className="text-[9px] tracking-[0.4em] text-velore-gold uppercase">
                    Engineered Elegance.
                  </p>
                </div>

                {/* Tabs */}
                <div className="flex mb-8 border-b border-velore-border">
                  {(['login', 'register'] as const).map((t) => (
                    <button
                      key={t}
                      onClick={() => { setTab(t); clearError() }}
                      className={cn(
                        'flex-1 pb-3 text-[10px] tracking-[0.3em] uppercase transition-all duration-300',
                        tab === t
                          ? 'text-velore-white border-b-2 border-velore-gold -mb-px'
                          : 'text-velore-gray hover:text-velore-white'
                      )}
                    >
                      {t === 'login' ? 'Sign In' : 'Create Account'}
                    </button>
                  ))}
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  {tab === 'register' && (
                    <div>
                      <label className="block text-[9px] tracking-[0.3em] uppercase
                                        text-velore-gray mb-2">
                        Full Name
                      </label>
                      <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        className="w-full bg-velore-surface border border-velore-border px-4 py-3
                                   text-velore-white text-sm placeholder:text-velore-border
                                   focus:border-velore-gold focus:outline-none transition-colors duration-300"
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-[9px] tracking-[0.3em] uppercase
                                      text-velore-gray mb-2">
                      Email Address
                    </label>
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder="your@email.com"
                      className="w-full bg-velore-surface border border-velore-border px-4 py-3
                                 text-velore-white text-sm placeholder:text-velore-border
                                 focus:border-velore-gold focus:outline-none transition-colors duration-300"
                    />
                  </div>

                  <div>
                    <label className="block text-[9px] tracking-[0.3em] uppercase
                                      text-velore-gray mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        name="password"
                        type={showPass ? 'text' : 'password'}
                        value={form.password}
                        onChange={handleChange}
                        required
                        minLength={8}
                        placeholder="••••••••"
                        className="w-full bg-velore-surface border border-velore-border px-4 py-3
                                   text-velore-white text-sm placeholder:text-velore-border
                                   focus:border-velore-gold focus:outline-none transition-colors duration-300 pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPass(!showPass)}
                        className="absolute right-3 top-1/2 -translate-y-1/2
                                   text-velore-gray hover:text-velore-white transition-colors"
                      >
                        {showPass ? <EyeOff size={14} /> : <Eye size={14} />}
                      </button>
                    </div>
                  </div>

                  {/* Error */}
                  {error && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-[10px] text-red-400 tracking-wide"
                    >
                      {error}
                    </motion.p>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 bg-velore-gold
                               text-velore-black py-3.5 text-[10px] tracking-[0.3em] uppercase
                               font-medium hover:bg-velore-gold-light transition-all duration-300
                               disabled:opacity-60 disabled:cursor-not-allowed mt-2"
                  >
                    {loading && <Loader2 size={13} className="animate-spin" />}
                    {loading
                      ? 'Please wait...'
                      : tab === 'login' ? 'Sign In' : 'Create Account'
                    }
                  </button>
                </form>

                <p className="text-center text-[9px] text-velore-gray mt-6 tracking-wide">
                  By continuing, you agree to VELORÉ's{' '}
                  <span className="text-velore-gold cursor-pointer hover:underline">
                    Terms of Service
                  </span>
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}