import type { Config } from 'tailwindcss'
import ruskerPreset from '@rusker/ui/tailwind-preset'

const config: Config = {
  presets: [ruskerPreset],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
export default config
