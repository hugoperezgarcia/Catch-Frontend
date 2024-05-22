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
        'titulo2':['titulo2','sans-serif'],
        'titulo1':['titulo1','sans-serif']
      }
    },
  },
  plugins: [
    require('tailwindcss-animated')
  ],
}
