import type { NextConfig } from "next";
import { withContentlayer } from "next-contentlayer2";

/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./env.mjs";

const nextConfig: NextConfig = {
  output: "standalone",
  eslint: {
    // Warning: This disables ESLint during builds.
    // Ensure ESLint is run as a separate step in your CI/CD pipeline.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Warning: This disables type checking during builds.
    // Ensure type checking is run as a separate step in your CI/CD pipeline.
    ignoreBuildErrors: true,
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "6mb",
    },
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "randomuser.me",
      },
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
    ],
  },

  serverExternalPackages: [
    "@prisma/client",
    "@react-email/components",
    "@react-email/tailwind",
  ],
};

module.exports = withContentlayer(nextConfig);
