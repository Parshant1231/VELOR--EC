'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Plus } from 'lucide-react'
import Link from 'next/link'
import { MOCK_COLLECTIONS } from '../../../lib/mock-data'
import { cn } from '../../../lib/utils'

export default function CollectionsPage() {
  const [hovered, setHovered] = useState<string | null>(null)

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <div className="flex items-center gap-3 mb-6">
          <Link
            href="/account"
            className="flex items-center gap-2 text-velore-gray hover:text-velore-white transition-colors duration-300"
          >
            <ArrowLeft size={14} />
            <span className="text-[9px] tracking-[0.2em] uppercase">Back</span>
          </Link>
        </div>

        <h1 className="font-serif text-4xl md:text-5xl font-light text-velore-white mb-3">
          Saved Collections
        </h1>
        <div className="w-8 h-px bg-gradient-to-r from-velore-gold to-transparent mb-4" />
        <p className="text-velore-gray text-sm leading-relaxed max-w-lg">
          Curated collections that speak to your style. Organize your favorite pieces and discover new inspirations.
        </p>
      </motion.div>

      {/* Collections Grid */}
      {MOCK_COLLECTIONS && MOCK_COLLECTIONS.length > 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
        >
          {MOCK_COLLECTIONS.map((col, i) => (
            <motion.div
              key={col.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              onMouseEnter={() => setHovered(col.id)}
              onMouseLeave={() => setHovered(null)}
              className="group cursor-pointer"
            >
              <div className="relative aspect-square bg-gradient-to-br from-velore-surface to-velore-surface/50
                              border border-velore-border/50 overflow-hidden
                              hover:border-velore-gold/50 transition-all duration-300">
                {/* Background with collection letter */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-serif text-7xl text-velore-border/20 select-none">
                    {col.label[0]}
                  </span>
                </div>

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-velore-black/90 via-velore-black/40 to-transparent" />

                {/* Collection info */}
                <div className="absolute inset-0 flex flex-col justify-between p-5">
                  {/* Top right badge */}
                  <div className="flex justify-end">
                    <span className="text-[8px] tracking-[0.2em] uppercase text-velore-gold/60 px-2 py-1
                                     border border-velore-gold/30 rounded-full">
                      Collection
                    </span>
                  </div>

                  {/* Bottom info */}
                  <div>
                    <motion.h3
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-velore-white font-serif text-lg mb-2 group-hover:text-velore-gold
                                 transition-colors duration-300 leading-tight"
                    >
                      {col.label}
                    </motion.h3>
                    <p className="text-[9px] text-velore-gray/80 tracking-wide">
                      {col.count} Items
                    </p>
                  </div>
                </div>

                {/* Hover overlay with CTA */}
                {hovered === col.id && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-velore-black/60 flex items-center justify-center
                               backdrop-blur-sm"
                  >
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="border border-velore-gold text-velore-gold px-6 py-2.5
                                 text-[9px] tracking-[0.2em] uppercase font-medium
                                 hover:bg-velore-gold hover:text-velore-black
                                 transition-all duration-300"
                    >
                      View Collection
                    </motion.button>
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}

          {/* Create New Collection Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: (MOCK_COLLECTIONS.length) * 0.05 }}
            className="group cursor-pointer"
          >
            <div className="relative aspect-square bg-velore-surface/30 border border-dashed border-velore-border
                            hover:border-velore-gold/50 transition-all duration-300
                            flex items-center justify-center group-hover:bg-velore-surface/50">
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="flex flex-col items-center gap-3"
              >
                <Plus size={24} className="text-velore-gold/60 group-hover:text-velore-gold transition-colors" />
                <span className="text-[10px] tracking-[0.2em] uppercase text-velore-gray
                               group-hover:text-velore-white transition-colors text-center">
                  Create New<br />Collection
                </span>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      ) : (
        /* Empty State */
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center py-24 text-center border border-velore-border/30 p-12"
        >
          <div className="w-16 h-16 rounded-full bg-velore-surface/30 flex items-center justify-center mb-6">
            <Plus size={28} className="text-velore-gold/40" />
          </div>
          <h3 className="font-serif text-2xl text-velore-white mb-3">No Collections Yet</h3>
          <p className="text-velore-gray text-sm max-w-md mb-8 leading-relaxed">
            Start creating collections to organize your favorite pieces and build your personal style.
          </p>
          <button className="border border-velore-gold text-velore-gold px-6 py-3 text-[10px]
                            tracking-[0.2em] uppercase font-medium hover:bg-velore-gold
                            hover:text-velore-black transition-all duration-300">
            Create First Collection
          </button>
        </motion.div>
      )}

      {/* Features Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="border-t border-velore-border/30 pt-12 mt-16"
      >
        <p className="text-[10px] tracking-[0.3em] uppercase text-velore-gray-light mb-8">
          Why Create Collections
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: 'Organize',
              description: 'Group your favorite pieces by style, occasion, or mood. Build the perfect wardrobe.',
            },
            {
              title: 'Discover',
              description: 'Find new pieces that complement your collections. AI-powered recommendations.',
            },
            {
              title: 'Share',
              description: 'Share your collections with friends and family. Inspire others with your style.',
            },
          ].map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 + i * 0.05 }}
              className="space-y-3"
            >
              <h4 className="font-serif text-lg text-velore-white">
                {feature.title}
              </h4>
              <p className="text-[9px] text-velore-gray leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
