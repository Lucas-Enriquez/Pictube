/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [ "cdn.sanity.io", "lh3.googleusercontent.com"],
    remotePatterns: [
      {
        hostname: "images.pexels.com",
      }
    ]
  },
  experimental: {
    appDir: true,
  },
}


module.exports = nextConfig
