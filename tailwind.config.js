/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2563eb',
        secondary: '#1e40af',
      },
      keyframes: {
        'keypress-correct': {
          '0%': { backgroundColor: '#ffffff', transform: 'scale(1)' },
          '50%': { backgroundColor: '#22c55e', transform: 'scale(0.95)' },
          '100%': { backgroundColor: '#ffffff', transform: 'scale(1)' },
        },
        'keypress-incorrect': {
          '0%': { backgroundColor: '#ffffff', transform: 'scale(1)' },
          '50%': { backgroundColor: '#ef4444', transform: 'scale(0.95)' },
          '100%': { backgroundColor: '#ffffff', transform: 'scale(1)' },
        },
      },
      animation: {
        'keypress-correct': 'keypress-correct 200ms ease-in-out',
        'keypress-incorrect': 'keypress-incorrect 200ms ease-in-out',
      },
    },
  },
  plugins: [],
} 