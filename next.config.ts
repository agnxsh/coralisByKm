import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['cdn.shopify.com', 'localhost', 'coralis-images.blr1.digitaloceanspaces.com', 'coralis-images.blr1.cdn.digitaloceanspaces.com'],
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
