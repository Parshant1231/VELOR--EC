'use client'

import { motion } from 'framer-motion'

export default function AnnouncementBar() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full bg-velore-black border-b border-velore-border py-2.5 text-center"
    >
      <p className="text-[10px] tracking-[0.35em] text-velore-gray-light uppercase">
        ● &nbsp; Complimentary Worldwide Shipping &amp; Returns
      </p>
    </motion.div>
  )
}