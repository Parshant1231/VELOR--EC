import type { Metadata } from 'next'
import { inter, cormorantGaramond } from '@/src/fonts/fonts'
import './globals.css'

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
    <html lang="en" data-scroll-behavior="smooth" className={`${inter.variable} ${cormorantGaramond.variable}`}>
      <body className="bg-velore-black text-velore-white antialiased">
        {children}
      </body>
    </html>
  )
}
