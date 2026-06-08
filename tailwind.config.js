/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Enable class-based dark mode
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#E5F9F3', // Light Green Background
          DEFAULT: '#00D09C', // Groww Green
          dark: '#00B386', // Darker Green for hover
        },
        // Backward compatibility for existing 'gold' usage, mapped to primary green
        gold: {
          light: '#E5F9F3',
          DEFAULT: '#00D09C',
          dark: '#00B386',
        },
        ivory: '#F5F7F8', // Groww-like Light Gray Background
        champagne: '#FFFFFF', // Secondary Background

        // Text Colors
        obsidian: '#44475B', // Primary Text (Dark Slate)
        charcoal: '#7C7E8C', // Secondary Text (Cool Gray)
        ash: '#9EA0A5', // Disabled/Tertiary

        // Semantic Colors
        success: '#00D09C',
        error: '#EB5B3C', // Groww Red/Orange
        warning: '#FFD147',

        // Backgrounds
        pearl: '#FFFFFF', // Card Background
        'dark-bg': '#121212',
        'dark-card': '#1E1E1E',
        'dark-text': '#EAECEF',
      },
      fontFamily: {
        sans: ['Roboto', 'sans-serif'], // Android style text
        heading: ['Roboto', 'sans-serif'], // Clean headings
      },
      boxShadow: {
        'soft': '0 2px 8px rgba(0, 0, 0, 0.04)',
        'card': '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
        'top': '0 -4px 6px -1px rgba(0, 0, 0, 0.05)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-down': 'slideDown 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        'pulse-slow': 'pulse 3s infinite',
        'marquee-vertical': 'marquee-vertical 60s linear infinite',
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
        'marquee-vertical': {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-50%)' },
        },
      },
    },
  },
  plugins: [],
}
