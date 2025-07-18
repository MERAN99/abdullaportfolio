/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      height: {
        '120': '30rem', // 480px
        '150': '38rem', // 608px
      },
      colors: {
        primary: {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
          950: '#2a2a99',
        },
        secondary: '#4a4ad9',
        light: '#f8f9fa',
        dark: '#121212',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(to right, #2a2a99, #4a4ad9)',
        'gradient-secondary': 'linear-gradient(to right, #4338ca, #6366f1, #818cf8)',
        'gradient-vibrant': 'linear-gradient(to right, #3730a3, #4f46e5, #818cf8)',
      },
    },
  },
  plugins: [
    function({ addUtilities }) {
      const newUtilities = {
        '.text-gradient-primary': {
          'background-image': 'linear-gradient(to right, #2a2a99, #4a4ad9, #6366f1) !important',
          'color': 'transparent !important',
          '-webkit-background-clip': 'text !important',
          'background-clip': 'text !important',
          'display': 'inline-block'
        },
        '.text-gradient-secondary': {
          'background-image': 'linear-gradient(to right, #4338ca, #6366f1, #818cf8) !important',
          'color': 'transparent !important',
          '-webkit-background-clip': 'text !important',
          'background-clip': 'text !important',
          'display': 'inline-block'
        },
        '.text-gradient-vibrant': {
          'background-image': 'linear-gradient(to right, #3730a3, #4f46e5, #818cf8) !important',
          'color': 'transparent !important',
          '-webkit-background-clip': 'text !important',
          'background-clip': 'text !important',
          'display': 'inline-block'
        },
      }
      addUtilities(newUtilities)
    }
  ],
} 