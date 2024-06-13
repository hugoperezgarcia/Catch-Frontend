/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'azul-oscuro': '#00159E',
      },
      fontFamily: {
        'normal':['normal','sans-serif'],
        'titulo':['titulo','sans-serif']
      }
    },
  },
  plugins: [
    require('tailwindcss-animated')
  ],
}
