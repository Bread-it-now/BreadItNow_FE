import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['picsum.photos', 'placehold.co'],
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NAVER_CLIENT_ID: process.env.NAVER_CLIENT_ID,
    NAVER_CLIENT_SECRET: process.env.NAVER_CLIENT_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  },
  async rewrites() {
    return [
      {
        source: "/auth-api/:path*",
        destination: "https://api.breaditnow.com/auth-api/api/v1/auth/:path*"
      }
    ]
  }
  /* config options here */
};

export default nextConfig;
