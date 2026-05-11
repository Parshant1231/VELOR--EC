'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { LayoutGrid, List, Sparkles } from 'lucide-react'
import Navbar from '../../components/layout/Navbar'
import FilterSidebar from '../../components/shop/FilterSidebar'
import FilterPanel from '../../components/shop/FilterPanel'
import ProductGrid from '../../components/shop/ProductGrid'
import AIStylistCard from '../../components/shop/AIStylistCard'
import { ALL_PRODUCTS, COLLECTIONS } from '../../lib/mock-data'
import { cn } from '../../lib/utils'
import Footer from '@/src/components/layout/Footer'

const SORT_OPTIONS = ['New In', 'Price: Low to High', 'Price: High to Low', 'Featured']

export default function CollectionsPage() {
  const [activeCollection, setActiveCollection] = useState('All')
  const [activeFilters, setActiveFilters]       = useState<Record<string, string[]>>({})
  const [sort, setSort]                         = useState('New In')
  const [view, setView]                         = useState<'grid' | 'list'>('grid')
  const [showAI, setShowAI]                     = useState(true)

  const filtered = useMemo(() => {
    let items = [...ALL_PRODUCTS]
    if (activeCollection !== 'All') {
      items = items.filter(
        (p) =>
          p.collection === activeCollection ||
          p.category.toLowerCase() === activeCollection.toLowerCase()
      )
    }
    if (sort === 'Price: Low to High') items.sort((a, b) => a.price - b.price)
    if (sort === 'Price: High to Low') items.sort((a, b) => b.price - a.price)
    if (sort === 'Featured') items = items.filter((p) => p.featured)
    return items
  }, [activeCollection, activeFilters, sort])

  const handleFilterChange = (section: string, value: string) => {
    setActiveFilters((prev) => {
      const current = prev[section] || []
      return {
        ...prev,
        [section]: current.includes(value)
          ? current.filter((v) => v !== value)
          : [...current, value],
      }
    })
  }

  return (
    <div className="min-h-screen bg-velore-black">
      <Navbar />

      {/* Left sidebar */}
      <FilterSidebar activeCollection={activeCollection} onSelect={setActiveCollection} />

      {/* Main content — offset for sidebar */}
      <div className="lg:pl-20 pt-28 pb-20">
        {/* Hero header */}
        <div className="relative px-8 md:px-12 mb-10 overflow-hidden">
          {/* Background large text */}
          <div className="absolute inset-0 flex items-center overflow-hidden pointer-events-none">
            <span className="font-serif text-[12vw] text-velore-border/10 select-none leading-none">
              {activeCollection}
            </span>
          </div>

          <div className="relative flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <motion.p
                key={activeCollection + '-label'}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="section-label mb-2"
              >
                Curated Collection
              </motion.p>
              <motion.h1
                key={activeCollection + '-title'}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-serif font-light leading-tight"
                style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}
              >
                Collections Designed
                <br />
                for <em className="text-velore-gold">Presence.</em>
              </motion.h1>
              <p className="text-velore-gray text-xs tracking-widest mt-3">
                Timeless pieces. Future craftsmanship.
              </p>
            </div>

            {/* AI Recommendation bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="glass px-4 py-2.5 flex items-center gap-3 cursor-pointer
                         border-velore-border/60 hover:border-velore-gold/30 transition-colors duration-300"
            >
              <Sparkles size={12} className="text-velore-gold" />
              <span className="text-[9px] tracking-[0.25em] uppercase text-velore-gray-light">
                AI Recommendation
              </span>
              <span className="text-[9px] text-velore-gray">Based on your style</span>
              <div className="flex gap-1">
                {[1,2,3,4].map((n) => (
                  <div key={n} className="w-6 h-8 bg-velore-surface border border-velore-border/50
                                          flex items-center justify-center">
                    {/* IMAGE PLACEHOLDER — recommended product thumbnail */}
                    <span className="text-[6px] text-velore-border">{n}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex items-center justify-between px-8 md:px-12 mb-8 border-y border-velore-border/30 py-3">
          <p className="text-[10px] tracking-widest text-velore-gray uppercase">
            {filtered.length} Pieces
          </p>

          <div className="flex items-center gap-5">
            {/* View toggle */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => setView('grid')}
                className={cn('p-1.5 transition-colors', view === 'grid' ? 'text-velore-white' : 'text-velore-border hover:text-velore-gray')}
              >
                <LayoutGrid size={13} />
              </button>
              <button
                onClick={() => setView('list')}
                className={cn('p-1.5 transition-colors', view === 'list' ? 'text-velore-white' : 'text-velore-border hover:text-velore-gray')}
              >
                <List size={13} />
              </button>
            </div>

            {/* Sort */}
            <div className="flex items-center gap-2">
              <span className="text-[9px] tracking-widest uppercase text-velore-gray">Sort</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="bg-transparent text-velore-white text-[10px] tracking-widest uppercase
                           border-none outline-none cursor-pointer"
              >
                {SORT_OPTIONS.map((o) => (
                  <option key={o} value={o} className="bg-velore-dark text-velore-white">{o}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Content row */}
        <div className="flex gap-8 px-8 md:px-12">
          {/* Product grid */}
          <div className="flex-1 min-w-0">
            <ProductGrid products={filtered} view={view} />
          </div>

          {/* Right panel */}
          <div className="hidden xl:flex flex-col gap-6">
            {showAI && <AIStylistCard />}
            <FilterPanel
              activeFilters={activeFilters}
              onFilterChange={handleFilterChange}
              onReset={() => setActiveFilters({})}
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}