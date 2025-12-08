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
    // Enable optimization on Vercel, disable for static export (GitHub Pages)
    unoptimized: useStaticExport,
    // Define allowed image sizes for better optimization
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Define formats to serve (WebP is more efficient)
    formats: ['image/webp'],
    // Minimize layout shift
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days cache
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  // Performance optimizations
  poweredByHeader: false,
  // Compress responses
  compress: true,
  // Enable React strict mode for better performance insights
  reactStrictMode: true,
}

module.exports = nextConfig

