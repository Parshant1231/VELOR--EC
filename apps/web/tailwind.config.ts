import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // VELORÉ Design System
        velore: {
          black:   '#0A0A0A',
          dark:    '#111111',
          surface: '#1A1A1A',
          border:  '#2A2A2A',
          gold:    '#C9A96E',
          'gold-light': '#E8C98A',
          'gold-muted': '#8B7355',
          cream:   '#F5F0E8',
          white:   '#FFFFFF',
          gray:    '#888888',
          'gray-light': '#CCCCCC',
        }
      },
      fontFamily: {
        serif:  ['var(--font-cormorant)', 'Georgia', 'serif'],
        sans:   ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display:['var(--font-cormorant)', 'Georgia', 'serif'],
      },
      fontSize: {
        'display-2xl': ['6rem',   { lineHeight: '1', letterSpacing: '-0.02em' }],
        'display-xl':  ['4.5rem', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'display-lg':  ['3.75rem',{ lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-md':  ['3rem',   { lineHeight: '1.1', letterSpacing: '-0.01em' }],
        'display-sm':  ['2.25rem',{ lineHeight: '1.2' }],
      },
      animation: {
        'fade-in':     'fadeIn 0.6s ease-out forwards',
        'slide-up':    'slideUp 0.6s ease-out forwards',
        'slide-down':  'slideDown 0.3s ease-out forwards',
      },
      keyframes: {
        fadeIn:    { '0%': { opacity: '0' },                       '100%': { opacity: '1' } },
        slideUp:   { '0%': { opacity: '0', transform: 'translateY(20px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        slideDown: { '0%': { opacity: '0', transform: 'translateY(-10px)' },'100%': { opacity: '1', transform: 'translateY(0)' } },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'noise': "url('/images/noise.png')",
      }
    },
  },
  plugins: [],
}

export default config
