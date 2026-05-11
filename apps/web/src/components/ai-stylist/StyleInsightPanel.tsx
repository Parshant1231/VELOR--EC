'use client'

import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import StyleProfileCard from '../account/StyleProfileCard'

interface StyleInsightPanelProps {
  mood:      string
  direction: string
  palette:   string[]
  elements:  string[]
  score:     number
}

export default function StyleInsightPanel({
  mood, direction, palette, elements, score
}: StyleInsightPanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2 }}
      className="border border-velore-border bg-velore-surface/50 p-5 space-y-5"
    >
      <div className="flex items-center gap-2">
        <Sparkles size={12} className="text-velore-gold" />
        <span className="text-[9px] tracking-[0.3em] uppercase text-velore-gold">
          AI Style Insight
        </span>
      </div>

      {/* Detected mood */}
      <div>
        <p className="text-[9px] tracking-[0.2em] uppercase text-velore-gray mb-1">
          Detected Mood
        </p>
        <p className="font-serif text-2xl text-velore-white font-light">{mood}</p>
      </div>

      {/* Direction */}
      <div>
        <p className="text-[9px] tracking-[0.2em] uppercase text-velore-gray mb-1">
          Style Direction
        </p>
        <p className="text-xs text-velore-gray-light leading-relaxed">{direction}</p>
      </div>

      {/* Palette */}
      <div>
        <p className="text-[9px] tracking-[0.2em] uppercase text-velore-gray mb-2">
          Recommended Palette
        </p>
        <div className="flex gap-2">
          {palette.map((hex) => (
            <div
              key={hex}
              className="w-8 h-8 rounded-full border border-velore-border/50"
              style={{ backgroundColor: hex }}
            />
          ))}
        </div>
      </div>

      {/* Elements */}
      <div>
        <p className="text-[9px] tracking-[0.2em] uppercase text-velore-gray mb-2">
          Key Elements
        </p>
        <div className="flex flex-wrap gap-1.5">
          {elements.map((el) => (
            <span
              key={el}
              className="border border-velore-border/60 px-2.5 py-1 text-[9px]
                         tracking-[0.15em] uppercase text-velore-gray"
            >
              {el}
            </span>
          ))}
        </div>
      </div>

      {/* Score ring */}
      <div className="pt-2 border-t border-velore-border/40 flex justify-center">
        <StyleProfileCard score={score} label="Style Match" compact />
      </div>

      <button className="w-full text-[9px] tracking-[0.25em] uppercase text-velore-gold
                         border border-velore-gold/30 py-2.5 hover:bg-velore-gold/10
                         transition-all duration-300">
        View Full Insight →
      </button>
    </motion.div>
  )
}