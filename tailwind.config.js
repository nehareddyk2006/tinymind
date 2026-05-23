/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: '#FFF6E9',
        brutalPink: '#FF007F',
        brutalYellow: '#FFDE4D',
        brutalBlue: '#4BA3E3',
        brutalGreen: '#38E54D',
        brutalOrange: '#FF6B35',
        brutalPurple: '#7B2CBF',
        brutalNavy: '#1E1E2F',
      },
      fontFamily: {
        sans: ['Nunito', 'sans-serif'],
        fredoka: ['Fredoka', 'sans-serif'],
      },
      boxShadow: {
        'brutal-sm': '3px 3px 0px 0px rgba(0,0,0,1)',
        'brutal': '6px 6px 0px 0px rgba(0,0,0,1)',
        'brutal-lg': '10px 10px 0px 0px rgba(0,0,0,1)',
        'brutal-xl': '14px 14px 0px 0px rgba(0,0,0,1)',
        'brutal-active': '3px 3px 0px 0px rgba(0,0,0,1)',
      },
      keyframes: {
        wobble: {
          '0%, 100%': { transform: 'rotate(-2deg)' },
          '50%': { transform: 'rotate(2deg)' },
        },
        bounceSlow: {
          '0%, 100%': { transform: 'translateY(-5%)' },
          '50%': { transform: 'translateY(5%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-15px) rotate(3deg)' },
        },
        spinSlow: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        }
      },
      animation: {
        wobble: 'wobble 0.5s ease-in-out infinite',
        'wobble-slow': 'wobble 3s ease-in-out infinite',
        'bounce-slow': 'bounceSlow 3s ease-in-out infinite',
        float: 'float 6s ease-in-out infinite',
        'spin-slow': 'spinSlow 20s linear infinite',
      }
    },
  },
  plugins: [],
}
