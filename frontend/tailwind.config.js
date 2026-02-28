/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        artisan: {
          orange: '#e85d04',
          dark: '#1a1a2e',
          cream: '#fefae0',
        },
      },
    },
  },
  plugins: [],
}
