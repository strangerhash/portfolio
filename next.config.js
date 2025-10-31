/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true, // Required for Netlify static hosting
  },
  eslint: {
    ignoreDuringBuilds: true, // Allow build with ESLint warnings
  },
  typescript: {
    ignoreBuildErrors: false,
  },
}

module.exports = nextConfig

