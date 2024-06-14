/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      minHeight: {
        'screen-minus-80': 'calc(100vh - 83px)',
      },
      keyframes: {
        updown: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-30px)' },
        },
      },
      animation: {
        updown: 'updown 3s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}

