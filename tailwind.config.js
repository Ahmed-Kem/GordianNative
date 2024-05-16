/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}', './src/**/**/*.{js,jsx,ts,tsx}'],
  theme: {
    colors: {
      black: '#000',
      white: '#fff',
      dark1: '#222222',
      dark2: '#363636',
      dark3: '#454545',
      amber: '#fffbeb',
      lightpurple: '#8b5cf6',
      purple: '#7c3aed',
      lightgrey: '#C1C1C1',
      green: '#8BC926',
      yellow: '#FEBD01',
      red: '#e76b6b',
    },
    extend: {},
  },
  plugins: [],
};
