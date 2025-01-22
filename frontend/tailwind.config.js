/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-accent": "#26532b",
        "secondary-accent": "#399e5a",
      }
    },
  },
  plugins: [require('tailwindcss-motion')],
}