import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import localFont from 'next/font/local'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

// Cormorant Garamond via Google Fonts
import { Cormorant_Garamond } from 'next/font/google'
const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-cormorant',
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'VELORÉ — Engineered Elegance.',
  description: 'A new expression of modern luxury. Thoughtfully engineered. Beautifully effortless.',
  keywords: 'luxury fashion, engineered elegance, VELORÉ',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable}`}>
      <body className="bg-velore-black text-velore-white antialiased">
        {children}
      </body>
    </html>
  )
}
