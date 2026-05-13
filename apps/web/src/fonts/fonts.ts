import localFont from 'next/font/local'

// Inter - Sans-serif font (weights: 400, 500, 600, 700)
export const inter = localFont({
  src: [
    {
      path: './inter/Inter-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './inter/Inter-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: './inter/Inter-SemiBold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: './inter/Inter-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
})

// Cormorant Garamond - Serif font (weights: 300, 400, 500, 600, 700 + italic variants)
export const cormorantGaramond = localFont({
  src: [
    {
      path: './cormorant-garamond/CormorantGaramond-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: './cormorant-garamond/CormorantGaramond-LightItalic.woff2',
      weight: '300',
      style: 'italic',
    },
    {
      path: './cormorant-garamond/CormorantGaramond-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './cormorant-garamond/CormorantGaramond-Italic.woff2',
      weight: '400',
      style: 'italic',
    },
    {
      path: './cormorant-garamond/CormorantGaramond-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: './cormorant-garamond/CormorantGaramond-MediumItalic.woff2',
      weight: '500',
      style: 'italic',
    },
    {
      path: './cormorant-garamond/CormorantGaramond-SemiBold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: './cormorant-garamond/CormorantGaramond-SemiBoldItalic.woff2',
      weight: '600',
      style: 'italic',
    },
    {
      path: './cormorant-garamond/CormorantGaramond-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: './cormorant-garamond/CormorantGaramond-BoldItalic.woff2',
      weight: '700',
      style: 'italic',
    },
  ],
  variable: '--font-cormorant',
  display: 'swap',
  preload: true,
})
