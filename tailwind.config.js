/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        rausch: '#FF385C', // primary Airbnb accent
        babu: '#00A699',
        hof: '#484848',
        foggy: '#767676',
        border: '#DDDDDD',
      },
      fontFamily: {
        circular: [
          'var(--font-inter)',
          '"Circular Std"',
          '-apple-system',
          'BlinkMacSystemFont',
          'Roboto',
          'Helvetica Neue',
          'sans-serif',
        ],
      },
      boxShadow: {
        card: '0 6px 16px rgba(0,0,0,0.12)',
        panel: '0 6px 16px rgba(0,0,0,0.2)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.97)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 200ms ease-out',
        scaleIn: 'scaleIn 200ms ease-out',
        slideUp: 'slideUp 250ms ease-out',
      },
    },
  },
  plugins: [],
};