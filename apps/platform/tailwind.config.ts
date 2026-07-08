import type { Config } from 'tailwindcss'
import ruskerPreset from '@rusker/ui/tailwind-preset'

const config: Config = {
  presets: [ruskerPreset],
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  plugins: [],
}
export default config
