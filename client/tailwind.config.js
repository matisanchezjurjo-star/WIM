/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        wim: {
          blue: '#0b3a75',
          orange: '#e8622c',
        },
      },
    },
  },
  plugins: [],
};
