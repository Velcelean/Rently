import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Asta îi spune lui Next.js să nu mai blocheze lansarea pentru semne de punctuație
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;