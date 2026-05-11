'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Mic, Sparkles } from 'lucide-react'

const MOOD_SUGGESTIONS = [
  'Power Dressing',
  'Quiet Luxury',
  'Minimal Streetwear',
  'Evening Elegance',
  'Soft Tailoring',
  'Urban Refined',
  'Modern Confidence',
]

interface MoodSearchProps {
  onSearch: (query: string) => void
  loading:  boolean
}

export default function MoodSearch({ onSearch, loading }: MoodSearchProps) {
  const [query,   setQuery]   = useState('')
  const [focused, setFocused] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return
    onSearch(query.trim())
  }

  const handleSuggestion = (s: string) => {
    setQuery(s)
    onSearch(s)
    inputRef.current?.blur()
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* AI badge */}
      <div className="flex items-center justify-center gap-2 mb-4">
        <Sparkles size={10} className="text-velore-gold" />
        <span className="text-[9px] tracking-[0.35em] uppercase text-velore-gold">
          AI-Powered Search
        </span>
      </div>

      {/* Search input */}
      <form onSubmit={handleSubmit}>
        <div className={`relative flex items-center border transition-all duration-300
          ${focused ? 'border-velore-gold' : 'border-velore-border'}`}>
          <Search size={14} className="absolute left-5 text-velore-gray flex-shrink-0" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setTimeout(() => setFocused(false), 200)}
            placeholder="Describe your mood, occasion or vibe..."
            className="w-full bg-velore-surface/50 px-14 py-4 text-velore-white text-sm
                       placeholder:text-velore-gray focus:outline-none"
          />
          {/* Mic + loading */}
          <div className="absolute right-4 flex items-center gap-2">
            {loading ? (
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="flex gap-0.5"
              >
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    animate={{ height: [4, 12, 4] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                    className="w-0.5 bg-velore-gold rounded-full"
                  />
                ))}
              </motion.div>
            ) : (
              <button type="button"
                className="text-velore-gray hover:text-velore-gold transition-colors duration-300">
                <Mic size={14} />
              </button>
            )}
          </div>
        </div>
      </form>

      {/* Suggestions */}
      <div className="mt-5">
        <p className="text-[9px] tracking-[0.3em] uppercase text-velore-gray mb-3 text-center">
          AI Suggestions
        </p>
        <div className="flex flex-wrap gap-2 justify-center">
          {MOOD_SUGGESTIONS.map((s) => (
            <motion.button
              key={s}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleSuggestion(s)}
              className={`border px-4 py-2 text-[9px] tracking-[0.2em] uppercase
                          transition-all duration-300
                          ${query === s
                            ? 'border-velore-gold text-velore-gold bg-velore-gold/5'
                            : 'border-velore-border text-velore-gray hover:border-velore-gold/50 hover:text-velore-white'
                          }`}
            >
              {s}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  )
}