/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production'

const nextConfig = {
  output: 'export',
  // Only use basePath and assetPrefix for production builds (GitHub Pages)
  ...(isProd && {
    basePath: '/rusker_landing',
    assetPrefix: '/rusker_landing',
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

