/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'brown-sugar': ['Brown Sugar', 'cursive'],
        'cinzel': ['Cinzel', 'serif'],
      },
    },
  },
  plugins: [],
};
