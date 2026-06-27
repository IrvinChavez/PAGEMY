/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        dark: {
          900: '#050816',
          800: '#0B1120',
          700: '#0D1530',
        },
        neon: {
          blue: '#00D4FF',
          cyan: '#00F5FF',
          purple: '#A855F7',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundSize: {
        '300%': '300%',
      },
    },
  },
  plugins: [],
}
