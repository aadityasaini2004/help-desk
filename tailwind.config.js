/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        // Dark theme premium palette
        background: '#0a0a0a',
        surface: '#121212',
        primary: '#3b82f6',
        secondary: '#64748b',
        accent: '#8b5cf6',
      }
    },
  },
  plugins: [],
}

