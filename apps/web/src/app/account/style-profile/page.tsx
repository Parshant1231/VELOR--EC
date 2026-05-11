'use client'

import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import StyleProfileCard from '../../../components/account/StyleProfileCard'
import FeaturedPieces from '../../../components/home/FeaturedPieces'

const STYLE_TAGS    = ['Modern Minimalist', 'Neutral Tones', 'Tailored Fit', 'Luxury Streetwear']
const STYLE_MOODS   = ['Power', 'Minimal', 'Urban', 'Relaxed', 'Evening']
const AI_INSIGHT    = {
  detected:  'Modern Confidence',
  direction: 'Structured fits with clean sophistication.',
  palette:   ['#888', '#444', '#666', '#F0F0F0'],
  elements:  ['Tailored Silhouettes', 'Neutral Tones', 'Premium Fabrics', 'Minimal Accessories'],
}

export default function StyleProfilePage() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-2 mb-2">
          <Sparkles size={14} className="text-velore-gold" />
          <p className="section-label">AI Stylist</p>
        </div>
        <h1 className="font-serif text-4xl font-light text-velore-white mb-1">
          Your Style Profile
        </h1>
        <p className="text-velore-gray text-xs tracking-wide">
          AI-powered recommendations tailored to your mood, style, and lifestyle.
        </p>
      </motion.div>

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8">
        {/* Left */}
        <div className="space-y-8">

          {/* Style score + tags */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="border border-velore-border p-8"
          >
            <div className="flex flex-col md:flex-row items-center gap-8">
              <StyleProfileCard score={92} label="Refined Minimalist" />
              <div>
                <p className="text-[9px] tracking-[0.3em] uppercase text-velore-gray mb-3">
                  Your Style Profile
                </p>
                <div className="flex flex-wrap gap-2 mb-5">
                  {STYLE_TAGS.map((tag) => (
                    <span key={tag}
                      className="border border-velore-border px-3 py-1.5 text-[9px]
                                 tracking-[0.2em] uppercase text-velore-gray-light">
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="text-[9px] tracking-[0.2em] uppercase text-velore-gray mb-3">
                  Style Moods
                </p>
                <div className="flex gap-2 flex-wrap">
                  {STYLE_MOODS.map((mood, i) => (
                    <button
                      key={mood}
                      className="w-12 h-12 rounded-full border border-velore-border
                                 flex items-center justify-center text-[8px] tracking-wide
                                 text-velore-gray hover:border-velore-gold hover:text-velore-gold
                                 transition-all duration-300"
                    >
                      {mood}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* AI Insight panel */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="border border-velore-border p-6"
          >
            <div className="flex items-center gap-2 mb-5">
              <Sparkles size={12} className="text-velore-gold" />
              <p className="text-[9px] tracking-[0.3em] uppercase text-velore-gold">AI Style Insight</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <p className="text-[9px] tracking-[0.2em] uppercase text-velore-gray mb-2">
                  Detected Mood
                </p>
                <p className="font-serif text-2xl text-velore-white font-light">
                  {AI_INSIGHT.detected}
                </p>
              </div>
              <div>
                <p className="text-[9px] tracking-[0.2em] uppercase text-velore-gray mb-2">
                  Style Direction
                </p>
                <p className="text-sm text-velore-gray-light leading-relaxed">
                  {AI_INSIGHT.direction}
                </p>
              </div>
              <div>
                <p className="text-[9px] tracking-[0.2em] uppercase text-velore-gray mb-2">
                  Recommended Palette
                </p>
                <div className="flex gap-2">
                  {AI_INSIGHT.palette.map((hex) => (
                    <div
                      key={hex}
                      className="w-8 h-8 rounded-full border border-velore-border/50"
                      style={{ backgroundColor: hex }}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-5 pt-5 border-t border-velore-border/40">
              <p className="text-[9px] tracking-[0.2em] uppercase text-velore-gray mb-3">
                Key Elements
              </p>
              <div className="flex flex-wrap gap-2">
                {AI_INSIGHT.elements.map((el) => (
                  <span key={el}
                    className="border border-velore-border/60 px-3 py-1 text-[9px]
                               tracking-[0.15em] uppercase text-velore-gray">
                    {el}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right — recommendations */}
        <motion.div
          initial={{ opacity: 0, x: 15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="border border-velore-border p-5 h-fit"
        >
          <p className="text-[9px] tracking-[0.3em] uppercase text-velore-gold mb-4">
            AI Recommendation
          </p>
          <p className="text-[10px] tracking-[0.2em] uppercase text-velore-white mb-1">
            95% Match
          </p>
          {/* IMAGE PLACEHOLDER — recommended product */}
          <div className="w-full aspect-[3/4] bg-velore-surface border border-velore-border
                          flex items-center justify-center mb-3">
            <span className="font-serif text-5xl text-velore-border/30">V</span>
          </div>
          <p className="text-[11px] tracking-[0.15em] uppercase text-velore-white mb-0.5">
            Silk Relaxed Overcoat
          </p>
          <p className="text-[11px] text-velore-gray">$1,250</p>
          <button className="w-full mt-3 border border-velore-border py-2 text-[9px]
                             tracking-[0.2em] uppercase text-velore-gray hover:border-velore-gold
                             hover:text-velore-white transition-all duration-300">
            + Add to Bag
          </button>
        </motion.div>
      </div>

      {/* Recommended pieces */}
      <div className="border-t border-velore-border/30 pt-10">
        <p className="text-[9px] tracking-[0.3em] uppercase text-velore-gray-light mb-2">
          AI Recommendations For You
        </p>
        <FeaturedPieces />
      </div>
    </div>
  )
}