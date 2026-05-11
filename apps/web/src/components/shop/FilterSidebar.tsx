'use client'

import { motion } from 'framer-motion'
import { User, Heart, ShoppingBag } from 'lucide-react'
import Link from 'next/link'
import { cn } from '../../lib/utils'
import { COLLECTIONS } from '../../lib/mock-data'

interface FilterSidebarProps {
  activeCollection: string
  onSelect: (c: string) => void
}

export default function FilterSidebar({ activeCollection, onSelect }: FilterSidebarProps) {
  return (
    <aside className="hidden lg:flex flex-col w-20 fixed left-0 top-0 bottom-0 z-40
                      bg-velore-black border-r border-velore-border py-24 items-center justify-between">
      {/* Collections list — vertical */}
      <nav className="flex flex-col gap-6 items-center flex-1 justify-center">
        {['All', ...COLLECTIONS].map((col) => (
          <button
            key={col}
            onClick={() => onSelect(col)}
            className={cn(
              'relative text-[9px] tracking-[0.25em] uppercase transition-colors duration-300',
              'writing-mode-vertical hover:text-velore-white',
              activeCollection === col
                ? 'text-velore-white'
                : 'text-velore-gray'
            )}
            style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
          >
            {activeCollection === col && (
              <motion.span
                layoutId="sidebar-dot"
                className="absolute -left-3 top-1/2 -translate-y-1/2 w-1.5 h-1.5
                           rounded-full bg-velore-gold"
              />
            )}
            {col}
          </button>
        ))}
      </nav>

      {/* Bottom icons */}
      <div className="flex flex-col items-center gap-5 pb-4">
        <Link href="/account" className="text-velore-gray hover:text-velore-white transition-colors">
          <User size={14} />
        </Link>
        <Link href="/wishlist" className="relative text-velore-gray hover:text-velore-white transition-colors">
          <Heart size={14} />
          <span className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-velore-gold text-velore-black
                           text-[7px] rounded-full flex items-center justify-center font-bold">3</span>
        </Link>
        <Link href="/cart" className="relative text-velore-gray hover:text-velore-white transition-colors">
          <ShoppingBag size={14} />
          <span className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-velore-gold text-velore-black
                           text-[7px] rounded-full flex items-center justify-center font-bold">2</span>
        </Link>
      </div>
    </aside>
  )
}