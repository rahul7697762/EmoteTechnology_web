import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  // Prevent Next.js from bundling firebase-admin — it must run as native Node.js
  // to avoid ERR_REQUIRE_ESM errors from jose/jwks-rsa ESM-only modules
  serverExternalPackages: ['firebase-admin', 'jwks-rsa', 'jose'],
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'emotetechnology.in' },
    ],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
    ];
  },
};

export default nextConfig;
