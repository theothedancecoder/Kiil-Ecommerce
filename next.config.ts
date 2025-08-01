 import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Disable ESLint during builds to prevent deployment failures
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // Enable experimental features for better performance
  experimental: {
    optimizePackageImports: ['@clerk/nextjs', '@sanity/icons', 'lucide-react'],
  },

  // Image optimization - Disable for production to fix static image issues
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      }
    ],
    // Completely disable optimization in production
    unoptimized: true,
    // Legacy domains support
    domains: ['cdn.sanity.io'],
  },

  // Compiler optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Performance optimizations
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,

  // Static optimization
  trailingSlash: false,
  
  // Headers for better caching
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
      {
        source: '/images/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
