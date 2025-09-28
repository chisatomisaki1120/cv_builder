import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';
const repoName = 'chisato_cv'; // Thay đổi thành tên repository GitHub của bạn

const nextConfig: NextConfig = {
  // GitHub Pages configuration
  output: 'export',
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  distDir: 'out',

  // Base path cho GitHub Pages (nếu deploy vào repo subdirectory)
  basePath: isProd ? `/${repoName}` : '',
  assetPrefix: isProd ? `/${repoName}/` : '',

  // Performance optimizations
  compress: true,
  poweredByHeader: false,

  // Image optimization for static export
  images: {
    unoptimized: true, // Cần thiết cho static export
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Experimental features for better performance
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },

  // ESLint
  eslint: {
    ignoreDuringBuilds: false,
  },

  // TypeScript
  typescript: {
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
