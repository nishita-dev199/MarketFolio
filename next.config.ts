import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    turbopack: {
      root: ".",
    },
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload',
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: https://www.googletagmanager.com https://www.google-analytics.com https://*.google-analytics.com; font-src 'self' https://fonts.gstatic.com; connect-src 'self' https://www.google-analytics.com https://*.google-analytics.com; frame-src 'self' https://www.googletagmanager.com;",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
