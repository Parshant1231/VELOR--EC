'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { MOCK_COLLECTIONS } from '../../lib/mock-data'

export default function SavedCollections() {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <p className="text-[9px] tracking-[0.3em] uppercase text-velore-gray-light">
          Saved Collections
        </p>
        <Link href="/account/collections"
          className="text-[9px] tracking-[0.2em] uppercase text-velore-gold
                     hover:text-velore-gold-light transition-colors duration-300">
          View All
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {MOCK_COLLECTIONS.map((col, i) => (
          <motion.div
            key={col.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
          >
            <div className="relative aspect-square bg-velore-surface border border-velore-border
                            overflow-hidden group cursor-pointer hover:border-velore-gold/40
                            transition-colors duration-300">
              {/* IMAGE PLACEHOLDER */}
              {/* Replace with <Image src={col.image} ... /> */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-serif text-4xl text-velore-border/30">{col.label[0]}</span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-velore-black/80 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <p className="text-[9px] tracking-[0.2em] uppercase text-velore-white
                               leading-tight group-hover:text-velore-gold transition-colors duration-300">
                  {col.label}
                </p>
                <p className="text-[8px] text-velore-gray mt-0.5">{col.count} Items</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}