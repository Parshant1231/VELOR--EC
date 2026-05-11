'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

interface StyleProfileCardProps {
  score:  number   // 0–100
  label:  string
  compact?: boolean
}

export default function StyleProfileCard({
  score   = 92,
  label   = 'Refined Minimalist',
  compact = false,
}: StyleProfileCardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx    = canvas.getContext('2d')
    if (!ctx)    return

    const size   = canvas.width
    const cx     = size / 2
    const cy     = size / 2
    const radius = size * 0.38
    const lw     = size * 0.07

    ctx.clearRect(0, 0, size, size)

    // Track ring
    ctx.beginPath()
    ctx.arc(cx, cy, radius, 0, Math.PI * 2)
    ctx.strokeStyle = '#2A2A2A'
    ctx.lineWidth   = lw
    ctx.stroke()

    // Progress arc — gold
    const progress   = (score / 100) * Math.PI * 2
    const startAngle = -Math.PI / 2
    ctx.beginPath()
    ctx.arc(cx, cy, radius, startAngle, startAngle + progress)
    ctx.strokeStyle = '#C9A96E'
    ctx.lineWidth   = lw
    ctx.lineCap     = 'round'
    ctx.stroke()

    // Inner glow dot at end of arc
    const endX = cx + radius * Math.cos(startAngle + progress)
    const endY = cy + radius * Math.sin(startAngle + progress)
    ctx.beginPath()
    ctx.arc(endX, endY, lw * 0.4, 0, Math.PI * 2)
    ctx.fillStyle = '#E8C98A'
    ctx.fill()
  }, [score])

  const size = compact ? 80 : 140

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={compact ? 'flex items-center gap-4' : 'text-center'}
    >
      <div className="relative" style={{ width: size, height: size, flexShrink: 0 }}>
        <canvas
          ref={canvasRef}
          width={size * 2}
          height={size * 2}
          style={{ width: size, height: size }}
        />
        {/* Score in center */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={compact ? 'text-lg font-serif text-velore-white' : 'text-3xl font-serif text-velore-white'}>
            {score}%
          </span>
          {!compact && (
            <span className="text-[7px] tracking-[0.2em] uppercase text-velore-gray mt-0.5">
              Style Match
            </span>
          )}
        </div>
      </div>

      <div className={compact ? '' : 'mt-3'}>
        <p className={compact
          ? 'text-[11px] tracking-[0.15em] uppercase text-velore-white'
          : 'text-[10px] tracking-[0.2em] uppercase text-velore-gray mb-1'
        }>
          {compact ? label : 'Your style is'}
        </p>
        {!compact && (
          <p className="font-serif text-lg text-velore-white">{label}</p>
        )}
        <button className="text-[9px] tracking-[0.2em] uppercase text-velore-gold mt-2 block
                           hover:text-velore-gold-light transition-colors duration-300">
          View Full Profile →
        </button>
      </div>
    </motion.div>
  )
}