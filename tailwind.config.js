/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'neon-green': '#39FF14',
        'electric-blue': '#00FFFF',
      },
      fontFamily: {
        mono: ['Fira Code', 'Roboto Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
