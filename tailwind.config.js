/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        rail: {
          bg: '#07111F',
          surface: '#0D1B2A',
          surfaceAlt: '#112438',
          surfaceElevated: '#162B40',
          border: '#233B52',
          borderLight: '#314F6D',
          textPrimary: '#F4F7FB',
          textSecondary: '#9BAFC3',
          textMuted: '#64798E',
          accent: '#2F80ED',
          liveBlue: '#3BA7FF',
          success: '#20C997',
          warning: '#F5B942',
          critical: '#EF5350',
        }
      },
      boxShadow: {
        'rail-card': '0 4px 20px -2px rgba(0, 0, 0, 0.45)',
        'rail-glow-blue': '0 0 16px -2px rgba(47, 128, 237, 0.35)',
        'rail-glow-green': '0 0 14px -2px rgba(32, 201, 151, 0.35)',
        'rail-glow-amber': '0 0 14px -2px rgba(245, 185, 66, 0.35)',
        'rail-glow-red': '0 0 14px -2px rgba(239, 83, 80, 0.35)',
      }
    },
  },
  plugins: [],
}