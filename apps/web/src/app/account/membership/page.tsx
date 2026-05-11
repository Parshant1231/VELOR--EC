'use client'

import { motion } from 'framer-motion'
import MembershipBadge from '@/src/components/account/MembershipBadge'
import { cn } from '@/src/lib/utils'

const TIERS = [
  {
    id:     'STANDARD',
    icon:   '◇',
    label:  'Member',
    price:  'Free',
    perks:  ['Standard shipping', 'Wishlist access', 'Order tracking'],
    current: false,
  },
  {
    id:     'ELITE',
    icon:   '◆',
    label:  'Elite',
    price:  '$150 / year',
    perks:  ['Private Previews', 'Elite Concierge', 'Exclusive Drops', 'Complimentary Shipping', 'Priority support'],
    current: true,
  },
  {
    id:     'SIGNATURE',
    icon:   '✦',
    label:  'Signature',
    price:  '$450 / year',
    perks:  ['Everything in Elite', 'Personal stylist', 'Bespoke services', 'VIP events', 'Serial-numbered pieces'],
    current: false,
  },
]

export default function MembershipPage() {
  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
        <h1 className="font-serif text-4xl font-light text-velore-white mb-2">Membership</h1>
        <p className="text-velore-gray text-xs tracking-wide">
          Your access to the world of Veloré.
        </p>
      </motion.div>

      {/* Current status */}
      <div className="border border-velore-gold/30 bg-velore-gold/5 p-6 mb-10">
        <MembershipBadge tier="ELITE" since="April 2023" />
      </div>

      {/* Tiers */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {TIERS.map((tier, i) => (
          <motion.div
            key={tier.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={cn(
              'border p-6 relative transition-all duration-300',
              tier.current
                ? 'border-velore-gold'
                : 'border-velore-border hover:border-velore-gray'
            )}
          >
            {tier.current && (
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-velore-gold" />
            )}
            {tier.current && (
              <span className="absolute top-3 right-3 text-[8px] tracking-[0.2em] uppercase
                               text-velore-gold border border-velore-gold/40 px-2 py-0.5">
                Current
              </span>
            )}

            <div className={cn(
              'text-3xl mb-3',
              tier.id === 'ELITE' ? 'text-velore-gold' :
              tier.id === 'SIGNATURE' ? 'text-velore-gold-light' : 'text-velore-gray'
            )}>
              {tier.icon}
            </div>
            <p className={cn(
              'text-[10px] tracking-[0.3em] uppercase font-medium mb-1',
              tier.id === 'ELITE' ? 'text-velore-gold' :
              tier.id === 'SIGNATURE' ? 'text-velore-gold-light' : 'text-velore-gray'
            )}>
              Veloré {tier.label}
            </p>
            <p className="font-serif text-xl text-velore-white font-light mb-5">
              {tier.price}
            </p>

            <ul className="space-y-2 mb-6">
              {tier.perks.map((perk) => (
                <li key={perk} className="flex items-center gap-2">
                  <span className="text-velore-gold text-xs">•</span>
                  <span className="text-[10px] tracking-wide text-velore-gray">{perk}</span>
                </li>
              ))}
            </ul>

            {!tier.current && (
              <button className={cn(
                'w-full py-2.5 text-[9px] tracking-[0.25em] uppercase border transition-all duration-300',
                tier.id === 'SIGNATURE'
                  ? 'border-velore-gold text-velore-gold hover:bg-velore-gold hover:text-velore-black'
                  : 'border-velore-border text-velore-gray hover:border-velore-gold hover:text-velore-gold'
              )}>
                {tier.id === 'STANDARD' ? 'Downgrade' : 'Upgrade'}
              </button>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  )
}