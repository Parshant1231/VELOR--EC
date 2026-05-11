'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'

const CATEGORIES = [
  {
    label: 'Women',
    href: '/women',
    image: '/images/categories/women.png',
    bg: 'bg-[#1a1510]',
  },
  {
    label: 'Men',
    href: '/men',
    image: '/images/categories/men.png',
    bg: 'bg-[#141414]',
  },
  {
    label: 'Accessories',
    href: '/accessories',
    image: '/images/categories/accessories.png',
    bg: 'bg-[#1a1208]',
  },
  {
    label: 'Collections',
    href: '/collections',
    image: '/images/categories/collections.png',
    bg: 'bg-[#0f0f14]',
  },
]

export default function CategoryGrid() {
  return (
    <section className="w-full grid grid-cols-2 lg:grid-cols-4">
      {CATEGORIES.map((cat, i) => (
        <motion.div
          key={cat.label}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
        >
          <Link
            href={cat.href}
            className={`relative block aspect-square overflow-hidden group ${cat.bg}`}
          >
            <Image src={cat.image} alt={cat.label} fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover object-top group-hover:scale-110 transition-transform duration-700" />
            <div className="absolute inset-0 flex items-end justify-start p-6
                            bg-gradient-to-t from-velore-black/60 via-velore-black/20 to-transparent" />

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-velore-gold/5 opacity-0 group-hover:opacity-100
                            transition-opacity duration-500" />

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
              <p className="text-[9px] tracking-[0.35em] text-velore-gold uppercase mb-1">
                {cat.label}
              </p>
              <div className="flex items-center gap-2 text-velore-gray-light group-hover:text-velore-white
                              transition-colors duration-300">
                <span className="text-[9px] tracking-[0.3em] uppercase">Discover</span>
                <div className="w-4 h-4 rounded-full border border-current flex items-center justify-center
                                group-hover:bg-velore-gold group-hover:border-velore-gold transition-all duration-300">
                  <ArrowRight size={8} className="group-hover:text-velore-black transition-colors duration-300" />
                </div>
              </div>
            </div>

            {/* Border bottom for active state */}
            <div className="absolute bottom-0 left-0 w-0 h-px bg-velore-gold
                            group-hover:w-full transition-all duration-500" />
          </Link>
        </motion.div>
      ))}
    </section>
  )
}