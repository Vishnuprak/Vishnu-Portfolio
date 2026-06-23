/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
      },
      colors: {
        dark: {
          950: '#030712',
          900: '#0b0f19',
          800: '#1e293b',
          700: '#334155'
        }
      }
    },
  },
  plugins: [],
}
