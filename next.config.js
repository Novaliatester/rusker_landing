/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // Uncomment these for GitHub Pages deployment:
  // basePath: '/rusker_landing',
  // assetPrefix: '/rusker_landing',
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig

