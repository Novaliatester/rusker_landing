/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/rusker_landing',
  assetPrefix: '/rusker_landing',
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig

