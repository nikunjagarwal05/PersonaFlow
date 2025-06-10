/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        lightbg: '#ececf3', // deeper, softer white for light mode
        lightcard: '#e5e7ef', // soft card
        lightborder: '#d1d5db',
        accent: {
          DEFAULT: '#7c3aed', // deep purple for light mode
          dark: '#6d28d9', // even deeper purple
          light: '#a78bfa', // lighter purple
        },
        darkaccent: {
          DEFAULT: '#06b6d4', // cyan/teal for dark mode
          dark: '#0e7490',
          light: '#67e8f9',
        },
      },
    },
  },
  plugins: [],
  darkMode: 'class',
};
