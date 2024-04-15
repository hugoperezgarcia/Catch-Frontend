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
      }
    },
  },
  plugins: [
    require('tailwindcss-animated')
  ],
}
