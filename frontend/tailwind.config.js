/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        tadelakt: '#FDFBF7',
        terracotta: '#B22222', // Updated to L'm3ALEM Brick Red
        zellige: '#2A9D8F',
        majorelle: '#2B59C3',
        medina: {
          dark: '#2B2D42',
          muted: '#8D99AE'
        }
      },
      boxShadow: {
        'soft-arabesque': '0 10px 40px -10px rgba(0,0,0,0.05)',
      }
    },
  },
  plugins: [],
}
