/** @type {import('next').NextConfig} */
// For Vercel: No basePath needed (works with custom domains automatically)
// For GitHub Pages: Set NEXT_PUBLIC_BASE_PATH='/rusker_landing' if needed
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''

const nextConfig = {
  output: 'export',
  // Only use basePath if explicitly set (for GitHub Pages compatibility)
  // Vercel deployments don't need basePath
  ...(basePath && basePath !== '' && {
    basePath: basePath,
    assetPrefix: basePath,
  }),
  images: {
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
}

module.exports = nextConfig

