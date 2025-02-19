import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['picsum.photos', 'placehold.co'],
  },
  /* config options here */
};

export default nextConfig;
