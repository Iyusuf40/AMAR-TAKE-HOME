import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    API_BASE_URL: "http://127.0.0.1:2025"
  },
  devIndicators: false
};

export default nextConfig;
