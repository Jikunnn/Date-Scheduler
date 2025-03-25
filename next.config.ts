import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true, // Disable default image optimization
  },
  assetPrefix: isProd ? '/date-scheduler/' : '',
  basePath: isProd ? '/date-scheduler' : '',
  output: 'export'
};

export default nextConfig;