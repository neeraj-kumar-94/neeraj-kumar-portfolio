import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keep old /premium links working now that the premium design is the home page
  async redirects() {
    return [{ source: "/premium", destination: "/", permanent: true }];
  },
};

export default nextConfig;
