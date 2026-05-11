'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Bell } from 'lucide-react'
import Link from 'next/link'
import { useAuthStore } from '../../store/useAuthStore'
import OrderTracker from '../../components/account/OrderTracker'
import StyleProfileCard from '../../components/account/StyleProfileCard'
import MembershipBadge from '../../components/account/MembershipBadge'
import SavedCollections from '../../components/account/SavedCollections'
import { MOCK_ORDERS, MOCK_INSIGHTS } from '../../lib/mock-data'
import { Package, Heart, Sparkles } from 'lucide-react'

const INSIGHT_ICONS = { arrivals: Package, wishlist: Heart, style: Sparkles }

export default function AccountOverviewPage() {
  const { user } = useAuthStore()
  const firstName = user?.name?.split(' ')[0] || 'Alexander'

  return (
    <div className="space-y-8">
      {/* Welcome hero */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative border border-velore-border overflow-hidden"
      >
        {/* Background texture */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a1510] to-velore-dark" />
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l
                        from-velore-black/20 to-transparent">
          {/* IMAGE PLACEHOLDER — user avatar / editorial model */}
          {/* Add: /public/images/account/welcome-model.jpg */}
          <div className="absolute inset-0 flex items-center justify-center opacity-20">
            <span className="font-serif text-[10rem] text-velore-gold/20">
              {firstName[0]}
            </span>
          </div>
        </div>
        <div className="relative p-8 md:p-10">
          <p className="text-[9px] tracking-[0.4em] uppercase text-velore-gray mb-3">
            Welcome Back
          </p>
          <h1 className="font-serif font-light leading-none text-velore-white mb-3"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
            {firstName.toUpperCase()}
          </h1>
          <p className="text-velore-gray text-xs tracking-wide mb-6">
            Curated luxury. Personal to you.
          </p>
          <MembershipBadge compact />
        </div>
      </motion.div>

      {/* Main grid */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_280px] gap-8">
        {/* Left column */}
        <div className="space-y-8">

          {/* Order tracking */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center justify-between mb-4">
              <p className="text-[9px] tracking-[0.3em] uppercase text-velore-gray-light">
                Order Tracking
              </p>
              <Link href="/account/orders"
                className="text-[9px] tracking-[0.2em] uppercase text-velore-gold
                           hover:text-velore-gold-light transition-colors duration-300
                           flex items-center gap-1">
                View All Orders
                <ArrowRight size={9} />
              </Link>
            </div>
            {/* Show most recent in-progress order */}
            {MOCK_ORDERS[0] && <OrderTracker order={MOCK_ORDERS[0]} />}
          </motion.div>

          {/* Saved collections */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <SavedCollections />
          </motion.div>

        </div>

        {/* Right column */}
        <div className="space-y-6">

          {/* Membership */}
          <motion.div
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 }}
          >
            <MembershipBadge tier="ELITE" since="April 2023" />
          </motion.div>

          {/* AI Style Profile */}
          <motion.div
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.25 }}
            className="border border-velore-border p-5"
          >
            <div className="flex items-center justify-between mb-4">
              <p className="text-[9px] tracking-[0.3em] uppercase text-velore-gray-light">
                AI Style Profile
              </p>
              <p className="text-[8px] text-velore-gray tracking-wide">
                Last updated May 20, 2025
              </p>
            </div>
            <div className="flex justify-center mb-4">
              <StyleProfileCard score={92} label="Refined Minimalist" />
            </div>
          </motion.div>

          {/* Personalized insights */}
          <motion.div
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.35 }}
            className="border border-velore-border p-5"
          >
            <p className="text-[9px] tracking-[0.3em] uppercase text-velore-gray-light mb-4">
              Personalized Insights
            </p>
            <div className="space-y-3">
              {MOCK_INSIGHTS.map((insight: any) => {
                const Icon = INSIGHT_ICONS[insight.icon as keyof typeof INSIGHT_ICONS]
                return (
                  <button
                    key={insight.label}
                    className="w-full flex items-center gap-3 group text-left
                               hover:bg-velore-surface/50 p-2 -mx-2 transition-colors duration-300"
                  >
                    <div className="w-7 h-7 border border-velore-border flex items-center justify-center
                                    flex-shrink-0 group-hover:border-velore-gold transition-colors duration-300">
                      <Icon size={11} className="text-velore-gray group-hover:text-velore-gold transition-colors" />
                    </div>
                    <div className="flex-1">
                      <p className="text-[10px] tracking-wide text-velore-gray-light">
                        {insight.label}
                      </p>
                      {'count' in insight && insight.count && (
                        <p className="text-[9px] text-velore-gray">{insight.count} items</p>
                      )}
                      {'sub' in insight && insight.sub && (
                        <p className="text-[9px] text-velore-gray">{insight.sub}</p>
                      )}
                    </div>
                    <ArrowRight size={10} className="text-velore-border group-hover:text-velore-gold
                                                      transition-colors duration-300 flex-shrink-0" />
                  </button>
                )
              })}
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  )
}