import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["picsum.photos", "is1-ssl.mzstatic.com", "*"],
  },
};

export default nextConfig;
