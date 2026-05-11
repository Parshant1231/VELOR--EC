'use client'

import { motion } from 'framer-motion'
import { cn } from '@/src/lib/utils'

type Tier = 'STANDARD' | 'ELITE' | 'SIGNATURE'

const TIER_CONFIG = {
  STANDARD:  { label: 'Veloré Member',    color: 'text-velore-gray',        border: 'border-velore-border',    icon: '◇' },
  ELITE:     { label: 'Veloré Elite',     color: 'text-velore-gold',        border: 'border-velore-gold',      icon: '◆' },
  SIGNATURE: { label: 'Veloré Signature', color: 'text-velore-gold-light',  border: 'border-velore-gold-light', icon: '✦' },
}

const ELITE_PERKS = [
  'Private Previews',
  'Elite Concierge',
  'Exclusive Drops',
  'Complimentary Shipping',
]

interface MembershipBadgeProps {
  tier?:      Tier
  since?:     string
  compact?:   boolean
}

export default function MembershipBadge({
  tier    = 'ELITE',
  since   = 'April 2023',
  compact = false,
}: MembershipBadgeProps) {
  const config = TIER_CONFIG[tier]

  if (compact) {
    return (
      <div className="flex items-center gap-2">
        <span className={cn('text-sm', config.color)}>{config.icon}</span>
        <div>
          <p className={cn('text-[10px] tracking-[0.2em] uppercase font-medium', config.color)}>
            {config.label}
          </p>
          <p className="text-[9px] text-velore-gray">Member since {since}</p>
        </div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="border border-velore-border p-5 space-y-4"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="text-[9px] tracking-[0.3em] uppercase text-velore-gray">
          Membership Status
        </p>
      </div>

      {/* Tier name + icon */}
      <div className="text-center py-4">
        <motion.div
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className={cn('text-5xl mb-3', config.color)}
        >
          {config.icon}
        </motion.div>
        <p className={cn('text-sm tracking-[0.25em] uppercase font-medium', config.color)}>
          {config.label}
        </p>
        <p className="text-[9px] text-velore-gray mt-1 tracking-wide">
          Member since {since}
        </p>
      </div>

      {/* Perks */}
      <div>
        <p className="text-[9px] tracking-[0.2em] uppercase text-velore-gray mb-3">
          You Unlocked
        </p>
        <ul className="space-y-2">
          {ELITE_PERKS.map((perk) => (
            <li key={perk} className="flex items-center gap-2">
              <span className="text-velore-gold text-xs">•</span>
              <span className="text-[10px] tracking-wide text-velore-gray-light">{perk}</span>
            </li>
          ))}
        </ul>
      </div>

      <button className="w-full text-[9px] tracking-[0.3em] uppercase text-velore-gold
                         border-b border-velore-gold/40 pb-0.5 hover:border-velore-gold
                         transition-colors duration-300 text-left">
        View Benefits →
      </button>
    </motion.div>
  )
}