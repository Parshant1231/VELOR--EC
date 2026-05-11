'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, RefreshCw, SlidersHorizontal } from 'lucide-react'
import { cn } from '../../lib/utils'

const FILTER_SECTIONS = [
  { label: 'Category', options: ['Women', 'Men', 'Accessories', 'Footwear'] },
  { label: 'Size',     options: ['XS', 'S', 'M', 'L', 'XL', 'XXL'] },
  { label: 'Color',    options: ['Black', 'Ivory', 'Charcoal', 'Camel', 'Midnight'] },
  { label: 'Material', options: ['Wool', 'Cashmere', 'Silk', 'Leather', 'Vegan Leather'] },
  { label: 'Price',    options: ['Under $500', '$500–$1000', '$1000–$2000', 'Over $2000'] },
]

interface FilterPanelProps {
  activeFilters: Record<string, string[]>
  onFilterChange: (section: string, value: string) => void
  onReset: () => void
}

export default function FilterPanel({ activeFilters, onFilterChange, onReset }: FilterPanelProps) {
  const [open, setOpen] = useState<string[]>([])

  const toggle = (label: string) =>
    setOpen((prev) => prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label])

  return (
    <aside className="hidden xl:block w-56 flex-shrink-0">
      <div className="sticky top-24">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <SlidersHorizontal size={12} className="text-velore-gold" />
            <span className="text-[10px] tracking-[0.3em] uppercase text-velore-white">
              Refine Selection
            </span>
          </div>
        </div>

        {/* Filter sections */}
        <div className="space-y-px">
          {FILTER_SECTIONS.map((section) => (
            <div key={section.label} className="border-b border-velore-border/50">
              <button
                onClick={() => toggle(section.label)}
                className="w-full flex items-center justify-between py-3.5 group"
              >
                <span className="text-[10px] tracking-[0.25em] uppercase text-velore-gray
                                 group-hover:text-velore-white transition-colors duration-300">
                  {section.label}
                </span>
                <ChevronDown
                  size={12}
                  className={cn(
                    'text-velore-gray transition-transform duration-300',
                    open.includes(section.label) ? 'rotate-180' : ''
                  )}
                />
              </button>

              <AnimatePresence>
                {open.includes(section.label) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="pb-3 space-y-2">
                      {section.options.map((opt) => {
                        const isActive = activeFilters[section.label]?.includes(opt)
                        return (
                          <button
                            key={opt}
                            onClick={() => onFilterChange(section.label, opt)}
                            className={cn(
                              'flex items-center gap-2.5 text-[10px] tracking-widest uppercase w-full text-left',
                              'transition-colors duration-300',
                              isActive ? 'text-velore-gold' : 'text-velore-gray hover:text-velore-white'
                            )}
                          >
                            <span className={cn(
                              'w-3 h-3 border flex items-center justify-center flex-shrink-0',
                              isActive ? 'border-velore-gold bg-velore-gold/20' : 'border-velore-border'
                            )}>
                              {isActive && <span className="w-1.5 h-1.5 bg-velore-gold" />}
                            </span>
                            {opt}
                          </button>
                        )
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* Reset */}
        <button
          onClick={onReset}
          className="flex items-center gap-2 mt-5 text-velore-gray hover:text-velore-white
                     transition-colors duration-300 group"
        >
          <RefreshCw size={10} className="group-hover:rotate-180 transition-transform duration-500" />
          <span className="text-[9px] tracking-[0.25em] uppercase">Reset Filters</span>
        </button>
      </div>
    </aside>
  )
}