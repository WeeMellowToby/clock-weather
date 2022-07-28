/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    fontFamily: {
      'tech': ['monospace', 'Share Tech Mono'],
    },
    backgroundSize: {
      'auto': 'auto',
      'cover': 'cover',
      'contain': 'contain',
      '50%': '50%',
      '16': '4rem',
      '100%': '100%',
    }
  },
  plugins: [],
}
