'use client'

import { motion } from 'framer-motion'
import Navbar from '@/src/components/layout/Navbar'
import Footer from '@/src/components/layout/Footer'

const TIMELINE = [
  { year: '2018', label: 'The Idea',      sub: 'A vision to redefine modern luxury was born.' },
  { year: '2019', label: 'The First Stitch', sub: 'Our first collection was handcrafted with purpose.' },
  { year: '2020', label: 'The Expansion', sub: 'VELORÉ entered the global stage.' },
  { year: '2022', label: 'The Evolution', sub: 'Innovating materials and intelligent design.' },
  { year: '2024', label: 'The Future',    sub: "Building tomorrow's icons, today." },
]

const PHILOSOPHY = [
  { icon: '◆', label: 'Timeless Design',       sub: 'We create pieces that transcend seasons and trends.' },
  { icon: '◈', label: 'Intelligent Innovation', sub: 'Blending technology with craftsmanship for the future.' },
  { icon: '◉', label: 'Sustainable Luxury',     sub: 'Responsibility built into every step we take.' },
  { icon: '✦', label: 'Individual Expression',  sub: 'Designed for those who define their own identity.' },
]

export default function WorldPage() {
  return (
    <div className="min-h-screen bg-velore-black">
      <Navbar />

      {/* Hero — Engineered Elegance */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a1208] via-velore-black to-velore-black" />

        {/* IMAGE PLACEHOLDER — dramatic male model, atmospheric */}
        {/* Add: /public/images/world/hero-model.jpg */}
        <div className="absolute right-0 top-0 bottom-0 w-1/2 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-velore-black via-velore-black/50 to-transparent z-10" />
          <div className="absolute inset-0 flex items-center justify-center opacity-10">
            <span className="font-serif text-[20vw] text-velore-gold/10 select-none">E</span>
          </div>
        </div>

        <div className="relative z-10 px-8 md:px-16 lg:px-20 max-w-3xl">
          {/* Sub nav */}
          <div className="flex items-center gap-6 mb-16">
            {['Our Story', 'Our Philosophy'].map((item, i) => (
              <button key={item}
                className={`text-[9px] tracking-[0.3em] uppercase transition-colors duration-300
                            ${i === 0 ? 'text-velore-white border-b border-velore-gold pb-0.5' : 'text-velore-gray hover:text-velore-white'}`}>
                {item}
              </button>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="section-label mb-4"
          >
            Our Story
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-serif font-light leading-none mb-6"
            style={{ fontSize: 'clamp(3rem, 7vw, 6rem)' }}
          >
            <span className="text-velore-white block">Engineered</span>
            <em className="text-velore-gold block">Elegance. ✦</em>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
            className="text-velore-gray text-sm leading-relaxed max-w-md mb-8"
          >
            VELORÉ is not just fashion. It is a philosophy engineered
            for those who value timeless design, intelligent innovation,
            and effortless sophistication.
          </motion.p>

          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
            className="text-[10px] tracking-[0.3em] uppercase text-velore-white
                       border-b border-velore-gold/50 pb-0.5 hover:border-velore-gold
                       transition-colors duration-300"
          >
            Explore Our Journey →
          </motion.button>

          {/* We design copy — right side */}
          <div className="absolute right-8 md:right-16 bottom-16 text-right hidden md:block">
            <p className="text-[9px] tracking-[0.3em] uppercase text-velore-gray leading-relaxed">
              We design<br />
              the future of<br />
              timeless style.
            </p>
          </div>
        </div>
      </section>

      {/* Craftsmanship */}
      <section className="px-8 md:px-12 lg:px-16 py-20 border-t border-velore-border/30">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="section-label mb-3">The Art of Craftsmanship</p>
            <h2 className="font-serif text-3xl md:text-4xl font-light text-velore-white mb-5 leading-tight">
              Every piece is a result of precision, patience, and passion.
            </h2>
            <p className="text-velore-gray text-sm leading-relaxed mb-6 max-w-md">
              From the finest fabrics to the smallest details — nothing is left to chance.
              Each garment passes through the hands of master artisans who have dedicated
              their lives to the pursuit of perfection.
            </p>
            <button className="text-[10px] tracking-[0.3em] uppercase text-velore-gold
                               border-b border-velore-gold/40 pb-0.5 hover:border-velore-gold
                               transition-colors duration-300">
              Discover Craftsmanship →
            </button>
          </motion.div>

          {/* IMAGE PLACEHOLDERS — craftsmanship photos */}
          <div className="grid grid-cols-3 gap-3 h-56">
            {['Hands', 'Needle', 'Tailor'].map((label) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-velore-surface border border-velore-border overflow-hidden
                           flex items-center justify-center"
              >
                {/* IMAGE PLACEHOLDER */}
                {/* Add: /public/images/world/craft-{label.toLowerCase()}.jpg */}
                <span className="font-serif text-3xl text-velore-border/30">{label[0]}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline — Our Journey */}
      <section className="px-8 md:px-12 lg:px-16 py-20 border-t border-velore-border/30
                          bg-gradient-to-b from-transparent to-[#0f0d09]/40">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="section-label mb-3">Our Journey</p>
            <h2 className="font-serif text-3xl md:text-4xl font-light text-velore-white mb-3 leading-tight">
              Built on Vision.
              <br />
              <em className="text-velore-gold">Driven by Purpose.</em>
            </h2>

            {/* Timeline */}
            <div className="relative mt-8">
              {/* Line */}
              <div className="absolute top-3 left-0 right-0 h-px bg-velore-border" />
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
                className="absolute top-3 left-0 h-px bg-velore-gold"
              />

              <div className="relative flex justify-between">
                {TIMELINE.map((item, i) => (
                  <motion.div
                    key={item.year}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15 }}
                    className="flex flex-col items-center gap-3"
                  >
                    <div className={`w-3 h-3 rounded-full border-2 z-10
                      ${i === TIMELINE.length - 1
                        ? 'border-velore-gold bg-velore-gold'
                        : 'border-velore-gold bg-velore-black'
                      }`} />
                    <div className="text-center mt-1">
                      <p className="text-[10px] tracking-widest text-velore-white font-medium">
                        {item.year}
                      </p>
                      <p className="text-[8px] tracking-wide text-velore-gold mt-0.5">
                        {item.label}
                      </p>
                      <p className="text-[8px] text-velore-gray mt-1 max-w-[80px] leading-relaxed hidden md:block">
                        {item.sub}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Founder quote */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="border border-velore-border/40 p-8"
          >
            {/* IMAGE PLACEHOLDER — founder writing */}
            {/* Add: /public/images/world/founder.jpg */}
            <div className="w-full h-40 bg-velore-surface border border-velore-border/40
                            flex items-center justify-center mb-6">
              <span className="font-serif text-5xl text-velore-border/30">F</span>
            </div>

            <p className="text-[9px] tracking-[0.3em] uppercase text-velore-gold mb-4">
              Founder's Vision
            </p>
            <blockquote className="font-serif text-xl md:text-2xl font-light text-velore-white
                                    leading-relaxed italic mb-4">
              "Elegance is not about being noticed, it's about being remembered."
            </blockquote>
            <p className="text-[10px] tracking-[0.2em] uppercase text-velore-gray">
              — Alexandre Veloré<br />
              <span className="text-velore-gold/70">Founder &amp; Creative Director</span>
            </p>
            <button className="mt-5 text-[9px] tracking-[0.25em] uppercase text-velore-gold
                               border-b border-velore-gold/40 pb-0.5 hover:border-velore-gold
                               transition-colors duration-300">
              Read the Full Letter →
            </button>
          </motion.div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="px-8 md:px-12 lg:px-16 py-20 border-t border-velore-border/30">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="section-label mb-3">Our Philosophy</p>
          <h2 className="font-serif text-3xl md:text-4xl font-light text-velore-white">
            We Believe in More<br />
            <em className="text-velore-gold">Than Fashion.</em>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {PHILOSOPHY.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center p-6 border border-velore-border/40
                         hover:border-velore-gold/30 transition-colors duration-300 group"
            >
              <span className="text-2xl text-velore-gold/60 group-hover:text-velore-gold
                               transition-colors duration-300 block mb-3">
                {item.icon}
              </span>
              <p className="text-[10px] tracking-[0.2em] uppercase text-velore-white mb-2">
                {item.label}
              </p>
              <p className="text-[10px] text-velore-gray leading-relaxed">{item.sub}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  )
}