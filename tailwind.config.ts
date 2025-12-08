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
        
        // Travel universe (blue/teal)
        'travel': '#287497',
        'travel-light': '#bfeff4',
        'travel-dark': '#1f6580',
        
        // Events universe (green)
        'events': '#0b5d56',
        'events-light': '#6ee3a8',
        'events-dark': '#094a44',
        
        // Network universe (burgundy/red)
        'network': '#a61e3f',
        'network-light': '#ffdfeb',
        'network-dark': '#8a1935',
        
        // Legacy (keep for backwards compatibility)
        'rusker-blue': '#287497',
        'rusker-travel': '#287497',
        'rusker-events': '#0b5d56',
        'rusker-network': '#a61e3f',
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

