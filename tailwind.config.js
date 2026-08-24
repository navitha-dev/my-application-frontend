/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#E5F9F3', // Light Green bg
          DEFAULT: '#00D09C', // Groww Green
          dark: '#00B386', // Darker Green
        },
        // Mapping 'gold' to primary green to adapt existing usages
        gold: {
          light: '#E5F9F3',
          DEFAULT: '#00D09C',
          dark: '#00B386',
        },
        ivory: '#FFFFFF', // Pure White
        champagne: '#F6F8FA', // Light Gray background (common in finance apps)
        obsidian: '#44475B', // Groww Dark Text
        charcoal: '#7C7E8C', // Secondary Text
        ash: '#9EA0A5', // Disabled/Light Text
        pearl: '#F2F2F2', // Inputs/Cards bg
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Outfit', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
        'bounce-slow': 'bounce 3s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
