import type { NextConfig } from 'next';

const config: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [320, 420, 640, 768, 1024, 1280, 1920],
    minimumCacheTTL: 86400,
    remotePatterns: [
      { protocol: 'https', hostname: '**.cloudflare.com' },
      { protocol: 'https', hostname: '**.r2.dev' },
      { protocol: 'https', hostname: 'res.cloudinary.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' }, // dev only
    ],
  },
  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
  },
};

export default config;
