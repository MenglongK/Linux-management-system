import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Add this configuration to allow your Cloudflare domain
  experimental: {
    serverActions: {
      allowedOrigins: ["dashboard.rotana-dev.online", "localhost:3000", "dashboard.rotana-dev.online/resource"]
    }
  }
};
module.exports = {
  allowedDevOrigins: ['local-origin.dev', '*.local-origin.dev', 'dashboard.rotana-dev.online'],
}
export default nextConfig;
