/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          100: '#0a0a0a',
          200: '#141414',
          300: '#1f1f1f',
          400: '#2a2a2a',
          500: '#333333',
        }
      }
    },
  },
  plugins: [],
}