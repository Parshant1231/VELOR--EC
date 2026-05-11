'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Navbar from '../components/layout/Navbar'

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-velore-black flex flex-col">
      <Navbar />
      <div className="flex-1 flex flex-col items-center justify-center text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="font-serif text-[20vw] text-velore-border/10 leading-none select-none mb-0">
            404
          </p>
          <p className="section-label mb-4 -mt-4">Page Not Found</p>
          <h1 className="font-serif text-3xl md:text-4xl font-light text-velore-white mb-4 leading-tight">
            This piece has left<br />
            <em className="text-velore-gold">the collection.</em>
          </h1>
          <p className="text-velore-gray text-sm tracking-wide mb-8 max-w-xs mx-auto">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/" className="btn-primary">Return Home</Link>
            <Link href="/collections" className="btn-ghost">Browse Collections</Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}