/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}', './src/**/**/*.{js,jsx,ts,tsx}'],
  theme: {
    colors: {
      black: '#000',
      white: '#fff',
      dark1: '#222222',
      dark2: '#363636',
      amber: '#fffbeb',
      purple: '#7321F4',
      lightgrey: '#C1C1C1',
      green: '#8BC926',
      yellow: '#FEBD01',
      red: '#FF0054',
    },
    extend: {},
  },
  plugins: [],
};
