js
/** @type {import('next').NextConfig} */
const nextConfig = {
  // This tells Next.js to ignore ESLint and TS errors during build
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // If you have jest setup, disable it for build
  webpack: (config) => {
    return config;
  },
};

module.exports = nextConfig;
