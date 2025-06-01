/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#540F93',
          dark: '#400B70',
          light: '#6811B6'
        },
        accent: {
          DEFAULT: '#7B2CBF',
          light: '#9D4EDD',
          dark: '#5A189A'
        },
        secondary: {
          DEFAULT: '#FF6B6B',
          light: '#FF8787',
          dark: '#FA5252'
        }
      },
      spacing: {
        '128': '32rem',
      },
      height: {
        'screen-90': '90vh',
      },
      maxWidth: {
        'screen-2xl': '1440px',
      },
      animation: {
        'fade-in': 'fade-in 0.5s ease-out',
        'marquee': 'marquee 25s linear infinite',
        'marquee-reverse': 'marquee-reverse 25s linear infinite',
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'marquee': {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};