/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-accent": "#d8554d",
        "secondary-accent": "#522B9A"
      }
    },
  },
  plugins: [require('tailwindcss-motion')],
}