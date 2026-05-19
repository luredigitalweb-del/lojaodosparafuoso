/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        amarelo: '#FFD500',
        'amarelo-dark': '#E6BF00',
        navy: '#0D2340',
        'navy-light': '#15315A',
        'navy-deep': '#081A33',
        vermelho: '#E63946',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Barlow', 'Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
