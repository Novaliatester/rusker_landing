/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/rusker_landing',
  assetPrefix: '/rusker_landing',
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

