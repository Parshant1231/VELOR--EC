'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

const SLIDES = [
  {
    id: 1,
    label: 'New Collection',
    title: 'Future Is',
    titleItalic: 'Timeless.',
    subtitle: 'A new expression of modern luxury.\nThoughtfully engineered. Beautifully effortless.',
    cta: 'Discover Collection',
    href: '/collections',
    image: '/images/hero/hero-1.png',
    bg: 'bg-gradient-to-br from-[#1a1510] via-[#0f0d0a] to-velore-black',
  },
  {
    id: 2,
    label: 'Atelier Collection',
    title: 'Precision',
    titleItalic: 'Refined.',
    subtitle: 'Crafted for movement.\nDesigned for presence.',
    cta: 'Explore Atelier',
    href: '/collections/atelier',
    image: '/images/hero/hero-2.png',
    bg: 'bg-gradient-to-br from-[#141414] via-[#0a0a0a] to-velore-black',
  },
  {
    id: 3,
    label: 'Curated Collection',
    title: 'Collections For',
    titleItalic: 'Presence.',
    subtitle: 'Timeless pieces.\nFuture craftsmanship.',
    cta: 'View Collections',
    href: '/collections',
    image: '/images/hero/hero-3.png',
    bg: 'bg-gradient-to-br from-[#120e09] via-[#0a0a0a] to-velore-black',
  },
]

export default function HeroSection() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)

  const goTo = useCallback((index: number) => {
    setDirection(index > current ? 1 : -1)
    setCurrent(index)
  }, [current])

  // Auto-advance
  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1)
      setCurrent((c) => (c + 1) % SLIDES.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  const slide = SLIDES[current]!

  const variants = {
    enter:  (d: number) => ({ opacity: 0, x: d > 0 ? 60 : -60 }),
    center: { opacity: 1, x: 0 },
    exit:   (d: number) => ({ opacity: 0, x: d > 0 ? -60 : 60 }),
  }

  return (
    <section className="relative w-full h-screen min-h-[600px] overflow-hidden">
      {/* Background */}
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={`bg-${current}`}
          custom={direction}
          variants={{ enter: { opacity: 0 }, center: { opacity: 1 }, exit: { opacity: 0 } }}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.8 }}
          className={`absolute inset-0 ${slide.bg}`}
        >
          <Image src={slide.image} alt={slide.label} fill className="object-cover object-right-top" priority />

          {/* Gradient overlays - subtle to show image better */}
          <div className="absolute inset-0 bg-gradient-to-r from-velore-black/70 via-velore-black/20 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-velore-black/60 via-transparent to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative h-full flex flex-col justify-center px-8 md:px-16 lg:px-20 pt-32">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={`content-${current}`}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="max-w-xl"
          >
            {/* Label */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="section-label mb-4"
            >
              {slide.label}
            </motion.p>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="font-serif font-light leading-none mb-4"
              style={{ fontSize: 'clamp(3rem, 7vw, 6.5rem)' }}
            >
              <span className="text-velore-white block">{slide.title}</span>
              <em className="text-velore-white italic block">{slide.titleItalic}</em>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-velore-gray-light text-sm leading-relaxed mb-8 whitespace-pre-line"
            >
              {slide.subtitle}
            </motion.p>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Link
                href={slide.href}
                className="inline-flex items-center gap-3 bg-velore-gold text-velore-black
                           px-8 py-3.5 text-[10px] tracking-[0.3em] uppercase font-medium
                           hover:bg-velore-gold-light transition-all duration-300 group"
              >
                {slide.cta}
                <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Slide counter + dots */}
        <div className="absolute bottom-10 left-8 md:left-16 lg:left-20 flex items-center gap-6">
          <div className="flex items-center gap-2">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`transition-all duration-500 rounded-full
                  ${i === current
                    ? 'w-6 h-1.5 bg-velore-gold'
                    : 'w-1.5 h-1.5 bg-velore-border hover:bg-velore-gray'
                  }`}
              />
            ))}
          </div>
          <div className="flex items-center gap-2 text-velore-gray text-[10px] tracking-widest">
            <span className="text-velore-white">{String(current + 1).padStart(2, '0')}</span>
            <span className="w-6 h-px bg-velore-border" />
            <span>{String(SLIDES.length).padStart(2, '0')}</span>
          </div>
        </div>

        {/* Experience 3D — right side */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-10 right-8 md:right-16 flex flex-col items-center gap-2 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-full border border-velore-gold/50 flex items-center justify-center
                          group-hover:border-velore-gold group-hover:bg-velore-gold/10 transition-all duration-300">
            <div className="w-1.5 h-1.5 rounded-full bg-velore-gold" />
          </div>
          <p className="text-[8px] tracking-[0.2em] uppercase text-velore-gray text-center leading-relaxed">
            Experience<br />Veloré in 3D
          </p>
        </motion.div>
      </div>
    </section>
  )
}