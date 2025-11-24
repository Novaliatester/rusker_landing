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
        'rusker-blue': '#277396',
        'text-dark': '#333333',
        'bg-light': '#F6F6F6',
      },
      fontFamily: {
        sans: ['Inter', 'Space Grotesk', 'system-ui', 'sans-serif'],
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

