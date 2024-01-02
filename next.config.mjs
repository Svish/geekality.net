/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  swcMinify: true,
  reactStrictMode: true,
  experimental: {
    typedRoutes: true,
  },
}

export default nextConfig
