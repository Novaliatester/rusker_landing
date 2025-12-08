import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Global neutral colors
        'neutral-light': '#f5f5f5',
        'neutral-dark': '#2f3433',
        'neutral-mid': '#cfcfcf',
        
        // Travel universe
        'travel': '#236a89',
        'travel-light': '#bfeff4',
        
        // Events universe
        'events': '#0d5c4a',
        'events-light': '#6ee3a8',
        
        // Network universe
        'network': '#a61e40',
        'network-light': '#ffdfeb',
        
        // Legacy (keep for backwards compatibility)
        'rusker-blue': '#236a89',
        'text-dark': '#2f3433',
        'bg-light': '#f5f5f5',
      },
      fontFamily: {
        sans: ['Poppins', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'card': '20px',
        'button': '16px',
      },
      boxShadow: {
        'soft': '0 4px 12px rgba(0, 0, 0, 0.05)',
        'soft-hover': '0 6px 18px rgba(0, 0, 0, 0.08)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(circle, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
export default config

