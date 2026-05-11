'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Loader2, Check, Shield } from 'lucide-react'
import { useAuthStore } from '../../../store/useAuthStore'
import { usersApi } from '../../../lib/api-client'
import { cn } from '../../../lib/utils'

export default function SettingsPage() {
  const { user } = useAuthStore()
  const [form, setForm] = useState({ name: user?.name || '', phone: '' })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  // Fetch user profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true)
        const res = await usersApi.getProfile()
        const profileData = res.data
        setForm({
          name: profileData.name || '',
          phone: profileData.phone || '',
        })
      } catch (err: any) {
        console.error('Failed to fetch profile:', err)
        // Use auth store data as fallback
        setForm({ name: user?.name || '', phone: '' })
      } finally {
        setLoading(false)
      }
    }

    if (user?.id) {
      fetchProfile()
    }
  }, [user?.id])

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    try {
      await usersApi.updateProfile(form)
      setSaved(true)
      setTimeout(() => setSaved(false), 2500)
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to save')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="max-w-2xl">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <h1 className="font-serif text-4xl md:text-5xl font-light text-velore-white mb-3">
          Settings
        </h1>
        <div className="w-8 h-px bg-gradient-to-r from-velore-gold to-transparent mb-4" />
        <p className="text-velore-gray text-sm leading-relaxed max-w-lg">
          Manage your account information, security settings, and preferences.
        </p>
      </motion.div>

      {/* Account Information Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="mb-12"
      >
        <p className="text-[10px] tracking-[0.3em] uppercase text-velore-gray-light mb-6">
          Account Information
        </p>

        {loading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 size={20} className="animate-spin text-velore-gold" />
            <span className="ml-3 text-velore-gray">Loading profile...</span>
          </div>
        ) : (
        <form onSubmit={handleSave} className="space-y-5">
          {/* Email — read only */}
          <div>
            <label className="text-[10px] tracking-[0.2em] uppercase text-velore-gray-light block mb-2.5">
              Email Address
            </label>
            <input
              value={user?.email || ''}
              readOnly
              className={cn(
                'w-full bg-velore-surface border border-velore-border/50 px-4 py-3.5',
                'text-velore-white/60 placeholder-velore-gray/40',
                'focus:outline-none cursor-not-allowed'
              )}
            />
            <p className="text-[9px] text-velore-gray/70 mt-2 tracking-[0.05em]">
              Email address cannot be changed. Contact support if you need assistance.
            </p>
          </div>

          {/* Full Name */}
          <div>
            <label className="text-[10px] tracking-[0.2em] uppercase text-velore-gray-light block mb-2.5">
              Full Name
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              placeholder="Your full name"
              className={cn(
                'w-full bg-velore-surface border border-velore-border/50 px-4 py-3.5',
                'text-velore-white placeholder-velore-gray/40',
                'focus:outline-none focus:border-velore-gold/50 transition-colors duration-300'
              )}
            />
          </div>

          {/* Phone */}
          <div>
            <label className="text-[10px] tracking-[0.2em] uppercase text-velore-gray-light block mb-2.5">
              Phone Number
            </label>
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
              placeholder="+1 (555) 123 4567"
              className={cn(
                'w-full bg-velore-surface border border-velore-border/50 px-4 py-3.5',
                'text-velore-white placeholder-velore-gray/40',
                'focus:outline-none focus:border-velore-gold/50 transition-colors duration-300'
              )}
            />
          </div>

          {/* Error State */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="border border-red-500/30 bg-red-500/5 p-4 flex items-start gap-3"
            >
              <div className="w-4 h-4 rounded-full bg-red-500/40 flex-shrink-0 mt-0.5" />
              <p className="text-[10px] text-red-400 tracking-[0.05em]">{error}</p>
            </motion.div>
          )}

          {/* Save Button */}
          <motion.button
            type="submit"
            disabled={saving}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={cn(
              'w-full flex items-center justify-center gap-2 bg-velore-gold text-velore-black',
              'py-4 px-6 text-[10px] tracking-[0.3em] uppercase font-semibold',
              'hover:bg-velore-gold-light transition-all duration-300',
              'disabled:opacity-50 disabled:cursor-not-allowed'
            )}
          >
            {saving && <Loader2 size={14} className="animate-spin" />}
            {saved && <Check size={14} />}
            <span>{saved ? 'Saved Successfully' : saving ? 'Saving...' : 'Save Changes'}</span>
          </motion.button>
        </form>
        )}
      </motion.div>

      {/* Security Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15 }}
        className="border border-velore-border/30 bg-gradient-to-br from-velore-gold/5 to-transparent p-8 mb-12"
      >
        <div className="flex items-center gap-3 mb-6">
          <Shield size={16} className="text-velore-gold" />
          <p className="text-[10px] tracking-[0.3em] uppercase text-velore-gold font-medium">
            Account Security
          </p>
        </div>
        <div className="space-y-4">
          <p className="text-[10px] text-velore-gray-light">
            Your account is protected with bank-grade security. You can update your password or enable additional security features.
          </p>
          <button
            type="button"
            className="border border-velore-border text-velore-gray text-[10px]
                       tracking-[0.2em] uppercase py-3 px-6 hover:border-velore-gold
                       hover:text-velore-white transition-all duration-300"
          >
            Change Password
          </button>
        </div>
      </motion.div>

      {/* Danger Zone */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="border border-red-500/20 bg-red-500/5 p-8"
      >
        <div className="flex items-center gap-2 mb-4">
          <div className="w-2 h-2 rounded-full bg-red-500/60" />
          <p className="text-[10px] tracking-[0.3em] uppercase text-red-400/80 font-medium">
            Danger Zone
          </p>
        </div>
        <p className="text-[10px] text-red-400/70 mb-6 leading-relaxed">
          Deleting your account is permanent and cannot be undone. All your data will be removed.
        </p>
        <button
          type="button"
          className={cn(
            'border border-red-500/30 text-red-400/70',
            'px-6 py-3 text-[10px] tracking-[0.2em] uppercase font-medium',
            'hover:border-red-500 hover:text-red-400 hover:bg-red-500/5',
            'transition-all duration-300'
          )}
        >
          Delete Account
        </button>
      </motion.div>
    </div>
  )
}