'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, User, ShoppingBag, Heart, Settings, Compass, LayoutGrid } from 'lucide-react'
import Navbar from '../../components/layout/Navbar'
import Footer from '../../components/layout/Footer'
import MoodSearch from '../../components/ai-stylist/MoodSearch'
import StyleInsightPanel from '../../components/ai-stylist/StyleInsightPanel'
import RecommendationCard from '../../components/ai-stylist/RecommendationCard'
import { ALL_PRODUCTS } from '../../lib/mock-data'
import { cn } from '../../lib/utils'

// Sidebar nav items
const SIDE_NAV = [
  { icon: Compass,    label: 'Discover'  },
  { icon: ShoppingBag,label: 'Shop'      },
  { icon: Sparkles,   label: 'AI Stylist', active: true },
  { icon: LayoutGrid, label: 'Wardrobe'  },
  { icon: Heart,      label: 'Favorites' },
  { icon: User,       label: 'Profile'   },
]

// Style mood profiles — maps search queries to insight data
const MOOD_PROFILES: Record<string, {
  mood: string; direction: string; palette: string[]
  elements: string[]; score: number; matchLabels: string[]
}> = {
  default: {
    mood:      'Modern Confidence',
    direction: 'Structured fits with clean sophistication.',
    palette:   ['#888', '#555', '#777', '#F0F0F0'],
    elements:  ['Tailored Silhouettes', 'Neutral Tones', 'Premium Fabrics', 'Minimal Accessories'],
    score:     92,
    matchLabels: ['Urban Authority', 'Refined Minimalism', 'Night Intelligence', 'Soft Power'],
  },
  'Power Dressing': {
    mood:      'Power & Presence',
    direction: 'Bold structured silhouettes that command every room.',
    palette:   ['#1C1C1C', '#2A2A2A', '#C9A96E', '#F0F0F0'],
    elements:  ['Strong Shoulders', 'Sharp Lines', 'Monochrome Palette', 'Statement Pieces'],
    score:     95,
    matchLabels: ['Power Stance', 'Executive Edge', 'Boardroom Noir', 'Commanding Presence'],
  },
  'Quiet Luxury': {
    mood:      'Quiet Luxury',
    direction: 'Understated elegance through premium materials and refined cuts.',
    palette:   ['#F5F0E8', '#C8B99A', '#8B7355', '#3A3530'],
    elements:  ['Cashmere Knits', 'Camel Tones', 'No Logos', 'Impeccable Fit'],
    score:     93,
    matchLabels: ['Old Money', 'Understated Elite', 'Effortless Polish', 'Cream & Camel'],
  },
  'Minimal Streetwear': {
    mood:      'Urban Minimalism',
    direction: 'Clean lines meet street-ready functionality.',
    palette:   ['#0A0A0A', '#333', '#666', '#FFF'],
    elements:  ['Oversized Cuts', 'Monochrome', 'Technical Fabrics', 'Clean Sneakers'],
    score:     88,
    matchLabels: ['Street Minimal', 'Urban Clean', 'Mono Block', 'Technical Edge'],
  },
}

const VISUAL_PREVIEWS = [
  { label: 'Urban Authority',    sub: 'Structured. Bold. Modern.',       score: 95 },
  { label: 'Refined Minimalism', sub: 'Clean. Sophisticated. Timeless.', score: 92 },
  { label: 'Night Intelligence', sub: 'Moody. Sharp. Magnetic.',         score: 94 },
  { label: 'Soft Power',         sub: 'Relaxed. Elegant. Confident.',    score: 91 },
]

const MATCH_PRODUCTS = ALL_PRODUCTS.slice(0, 5)

export default function AIStylistPage() {
  const [query,   setQuery]   = useState('')
  const [loading, setLoading] = useState(false)
  const [profile, setProfile] = useState(MOOD_PROFILES.default)
  const [activeNav, setActiveNav] = useState('AI Stylist')

  const handleSearch = useCallback(async (q: string) => {
    setQuery(q)
    setLoading(true)
    // Simulate AI processing delay
    await new Promise((r) => setTimeout(r, 1200))
    setProfile(MOOD_PROFILES[q] || MOOD_PROFILES.default)
    setLoading(false)
  }, [])

  const matchLabels = profile?.matchLabels || []

  return (
    <div className="min-h-screen bg-velore-black">
      <Navbar />

      <div className="flex pt-20 min-h-screen">

        {/* Left sidebar — desktop only */}
        <aside className="hidden lg:flex flex-col w-20 fixed left-0 top-20 bottom-0
                          bg-velore-black border-r border-velore-border z-40
                          items-center py-8 gap-8 justify-between">
          <div className="flex flex-col items-center gap-7">
            {SIDE_NAV.map(({ icon: Icon, label, active }) => (
              <button
                key={label}
                onClick={() => setActiveNav(label)}
                className={cn(
                  'flex flex-col items-center gap-1.5 group transition-all duration-300',
                  activeNav === label ? 'text-velore-white' : 'text-velore-gray hover:text-velore-white'
                )}
              >
                <div className={cn(
                  'w-10 h-10 flex items-center justify-center border transition-all duration-300',
                  activeNav === label
                    ? 'border-velore-gold bg-velore-gold/10'
                    : 'border-transparent group-hover:border-velore-border'
                )}>
                  <Icon size={15} />
                </div>
                <span className="text-[7px] tracking-[0.15em] uppercase">{label}</span>
              </button>
            ))}
          </div>

          {/* AI active indicator */}
          <div className="flex flex-col items-center gap-1 pb-4">
            <div className="w-1.5 h-1.5 rounded-full bg-velore-gold animate-pulse" />
            <p className="text-[7px] tracking-widest uppercase text-velore-gray text-center leading-relaxed">
              AI Style<br/>Intelligence<br/>
              <span className="text-velore-gold">Active</span>
            </p>
          </div>
        </aside>

        {/* Main content — offset for sidebar */}
        <div className="flex-1 lg:pl-20">

          {/* Hero section */}
          <section className="relative min-h-[85vh] flex items-center overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#1a1510] via-velore-black to-velore-black" />
            {/* Glow orb */}
            <motion.div
              animate={{ scale: [1, 1.1, 1], opacity: [0.15, 0.25, 0.15] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96
                         rounded-full bg-velore-gold/10 blur-3xl pointer-events-none"
            />

            {/* IMAGE PLACEHOLDER — editorial male model, right side */}
            {/* Add: /public/images/ai-stylist/hero-model.jpg */}
            <div className="absolute right-0 top-0 bottom-0 w-1/2 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-velore-black via-velore-black/30 to-transparent z-10" />
              <div className="absolute inset-0 flex items-center justify-center opacity-10">
                <span className="font-serif text-[20vw] text-velore-gold/20 select-none">A</span>
              </div>
            </div>

            <div className="relative z-10 px-8 md:px-12 lg:px-16 max-w-2xl">
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="section-label mb-4"
              >
                AI Stylist
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="font-serif font-light leading-none mb-6"
                style={{ fontSize: 'clamp(3rem, 7vw, 6rem)' }}
              >
                <span className="text-velore-white block">Intelligence</span>
                <em className="text-velore-gold block">Meets Style.</em>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-velore-gray text-sm leading-relaxed mb-10 max-w-sm"
              >
                Our AI analyzes your style, mood, and preferences
                to curate looks that define you.
              </motion.p>

              {/* Search */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <MoodSearch onSearch={handleSearch} loading={loading} />
              </motion.div>

              {/* Style tags */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-8"
              >
                <p className="text-[9px] tracking-[0.3em] uppercase text-velore-gray mb-3">
                  Your Style Profile
                </p>
                <div className="flex flex-wrap gap-2">
                  {['Modern Minimalist', 'Neutral Tones', 'Tailored Fit', 'Luxury Streetwear'].map((tag) => (
                    <span key={tag}
                      className="border border-velore-border px-3 py-1.5 text-[9px]
                                 tracking-[0.2em] uppercase text-velore-gray">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right: AI Insight panel */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="absolute right-8 top-1/2 -translate-y-1/2 w-64
                         hidden xl:block z-20"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={profile?.mood || 'default'}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  {profile && (
                    <StyleInsightPanel
                      mood={profile.mood}
                      direction={profile.direction}
                      palette={profile.palette}
                      elements={profile.elements}
                      score={profile.score}
                    />
                  )}
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </section>

          {/* Visual Search Previews */}
          <section className="px-8 md:px-12 lg:px-16 py-16 border-t border-velore-border/30">
            <div className="flex items-center justify-between mb-8">
              <p className="text-[10px] tracking-[0.3em] uppercase text-velore-white">
                Visual Search Previews
              </p>
              <div className="flex gap-2">
                <button className="w-7 h-7 border border-velore-border flex items-center justify-center
                                   text-velore-gray hover:border-velore-gold transition-all duration-300">
                  ←
                </button>
                <button className="w-7 h-7 border border-velore-border flex items-center justify-center
                                   text-velore-gray hover:border-velore-gold transition-all duration-300">
                  →
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {VISUAL_PREVIEWS.map((preview, i) => (
                <motion.div
                  key={preview.label}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="group cursor-pointer"
                >
                  {/* IMAGE PLACEHOLDER */}
                  <div className="relative aspect-[3/4] bg-velore-surface border border-velore-border
                                  overflow-hidden mb-3 group-hover:border-velore-gold/40
                                  transition-colors duration-300">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="font-serif text-5xl text-velore-border/20">
                        {preview.label[0]}
                      </span>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-velore-black/70 to-transparent" />

                    {/* Match score */}
                    <div className="absolute bottom-3 left-3">
                      <p className="text-velore-gold font-serif text-2xl leading-none">
                        {preview.score}%
                      </p>
                      <p className="text-[7px] tracking-widest uppercase text-velore-gray">
                        Match
                      </p>
                    </div>

                    {/* Add button */}
                    <button
                      className="absolute top-3 right-3 w-6 h-6 rounded-full bg-velore-white/10
                                 border border-velore-white/20 flex items-center justify-center
                                 opacity-0 group-hover:opacity-100 hover:bg-velore-gold
                                 transition-all duration-300"
                    >
                      <span className="text-white text-xs">+</span>
                    </button>
                  </div>

                  <p className="text-[10px] tracking-[0.15em] uppercase text-velore-white
                                group-hover:text-velore-gold transition-colors duration-300">
                    {preview.label}
                  </p>
                  <p className="text-[9px] text-velore-gray tracking-wide mt-0.5">{preview.sub}</p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* AI Recommendations */}
          <section className="px-8 md:px-12 lg:px-16 py-10 border-t border-velore-border/30">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles size={12} className="text-velore-gold" />
              <p className="text-[10px] tracking-[0.3em] uppercase text-velore-white">
                AI Recommendations For You
              </p>
            </div>
            <p className="text-velore-gray text-xs tracking-wide mb-8">
              {query ? `Based on: "${query}"` : 'Based on your style profile'}
            </p>

            <AnimatePresence mode="wait">
              <motion.div
                key={query}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5"
              >
                {MATCH_PRODUCTS.map((product, i) => (
                  <RecommendationCard
                    key={product.id}
                    product={product}
                    matchPct={95 - i * 2}
                    matchLabel={matchLabels[i] || product.name}
                    matchSub={(['Structured. Bold. Modern.', 'Clean. Sophisticated.', 'Moody. Sharp.', 'Relaxed. Elegant.', 'Refined. Precise.'][i] || product.description) as string}
                    index={i}
                  />
                ))}
              </motion.div>
            </AnimatePresence>
          </section>

          {/* Predictive recommendations sidebar row */}
          <section className="px-8 md:px-12 lg:px-16 py-10 border-t border-velore-border/30">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-8">
              {/* Left: discover button */}
              <div className="flex flex-col justify-center">
                <p className="section-label mb-3">Discover My Look</p>
                <button
                  onClick={() => handleSearch('Quiet Luxury')}
                  className="inline-flex items-center gap-3 border border-velore-border px-8 py-4
                             text-[10px] tracking-[0.3em] uppercase text-velore-white
                             hover:border-velore-gold hover:bg-velore-gold/5
                             transition-all duration-300 group w-fit"
                >
                  <Sparkles size={13} className="text-velore-gold" />
                  Discover My Look
                </button>
              </div>

              {/* Right: predictive list */}
              <div className="border border-velore-border p-5">
                <p className="text-[9px] tracking-[0.3em] uppercase text-velore-gray-light mb-4">
                  Predictive Recommendations
                </p>
                <div className="space-y-4">
                  {ALL_PRODUCTS.slice(0, 3).map((product, i) => (
                    <div key={product.id} className="flex items-center gap-3">
                      <div className="w-10 h-12 bg-velore-surface border border-velore-border/50
                                      flex items-center justify-center flex-shrink-0">
                        <span className="font-serif text-lg text-velore-border/50">
                          {product.name[0]}
                        </span>
                      </div>
                      <div className="flex-1">
                        <p className="text-[10px] tracking-[0.15em] uppercase text-velore-white">
                          {product.name}
                        </p>
                        <p className="text-[9px] text-velore-gray">
                          ${product.price.toLocaleString()}
                        </p>
                      </div>
                      <span className="text-[9px] text-velore-gold">
                        {96 - i * 3}% Match
                      </span>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-4 text-[9px] tracking-[0.25em] uppercase
                                   text-velore-gold border border-velore-gold/30 py-2.5
                                   hover:bg-velore-gold/10 transition-all duration-300">
                  View All Recommendations →
                </button>
              </div>
            </div>
          </section>

          <Footer />
        </div>
      </div>
    </div>
  )
}