/** @type {import('next').NextConfig} */
// For Vercel: No basePath needed, no static export needed (Vercel handles Next.js natively)
// For GitHub Pages: Use static export with basePath='/rusker_landing'
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''
// Only use static export for GitHub Pages, not for Vercel
// Vercel automatically sets VERCEL=1 environment variable
const useStaticExport = !process.env.VERCEL

const nextConfig = {
  // Only use static export for GitHub Pages (not for Vercel)
  ...(useStaticExport && { output: 'export' }),
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

