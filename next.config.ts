import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['cdn.shopify.com'],
  },
  redirects: async () => [
    {
      source: '/',
      destination: '/home',
      permanent: true,
    }, 
  ],
};

export default nextConfig;
