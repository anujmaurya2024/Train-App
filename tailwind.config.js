/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        neu: {
          bg: '#e6ebf4',
          surface: '#edf2f7',
          card: '#e2e8f0',
          dark: '#0f172a',
          accent: '#0284c7',
          railBlue: '#1d4ed8',
          railGold: '#d97706',
          railGreen: '#059669',
          railRed: '#dc2626',
          railPurple: '#7c3aed',
        }
      },
      boxShadow: {
        'neu-flat': '7px 7px 15px #c8d0dc, -7px -7px 15px #ffffff',
        'neu-flat-sm': '4px 4px 8px #cad2de, -4px -4px 8px #ffffff',
        'neu-flat-lg': '12px 12px 24px #c2c9d6, -12px -12px 24px #ffffff',
        'neu-pressed': 'inset 4px 4px 8px #c8d0dc, inset -4px -4px 8px #ffffff',
        'neu-pressed-sm': 'inset 2px 2px 5px #c8d0dc, inset -2px -2px 5px #ffffff',
        'neu-badge': '2px 2px 5px #c8d0dc, -2px -2px 5px #ffffff',
        'neu-glow-blue': '0 0 15px rgba(29, 78, 216, 0.35)',
        'neu-glow-amber': '0 0 15px rgba(217, 119, 6, 0.35)',
        'neu-glow-green': '0 0 15px rgba(5, 150, 105, 0.35)',
      }
    },
  },
  plugins: [],
}