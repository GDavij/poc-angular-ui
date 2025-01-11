/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-accent": "#ff5555",
        "secondary-accent": "#ff0055",
      }
    },
  },
  plugins: [require('tailwindcss-motion')],
}