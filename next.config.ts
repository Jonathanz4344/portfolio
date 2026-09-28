import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  env: {
    // Inlined at build time so the prerendered footer and hydration agree on the year
    BUILD_YEAR: String(new Date().getFullYear()),
  },
};

export default nextConfig;
