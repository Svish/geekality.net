const { withContentlayer } = require('next-contentlayer')

/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  reactStrictMode: true,
  experimental: {
    typedRoutes: true,
  },
}

module.exports = withContentlayer(nextConfig)
