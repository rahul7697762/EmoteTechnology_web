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
  // Serves the self-contained WhatsApp Business Automation page (public/*.html)
  // at its canonical extensionless URL. Array-form rewrites resolve after the
  // filesystem/public check, so the .html file is found first.
  async rewrites() {
    return [
      {
        source: '/whatsapp-business-automation',
        destination: '/whatsapp-business-automation.html',
      },
    ];
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
