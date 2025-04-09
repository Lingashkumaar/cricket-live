import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    RAPIDAPI_KEY: process.env.RAPIDAPI_KEY,
  },
  images: {
    domains: ['cricketchampion.co.in','ui-avatars.com'],
  },
};

export default nextConfig;
