import type { NextConfig } from 'next';

const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: isProd ? '/AI_VIBE_NK/my-community' : '',
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'igwwpabkruchhnkjiejr.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
};

export default nextConfig;
