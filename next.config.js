/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['bit.ly', 'images.unsplash.com']
  }
}

module.exports = nextConfig