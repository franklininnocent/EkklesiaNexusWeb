import path from "node:path";
import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

const scriptSrc = isDev
  ? "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com"
  : "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com";

/** Origins allowed to embed `/preview/*` in an iframe (parish admin app). */
const previewFrameAncestors =
  process.env.MARKETING_PREVIEW_FRAME_ANCESTORS?.trim() ||
  (isDev
    ? "http://localhost:4200 http://127.0.0.1:4200"
    : "https://app.ekklesianexus.com");

function contentSecurityPolicy(frameAncestors: string): string {
  return [
    "default-src 'self'",
    scriptSrc,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob: https://www.googletagmanager.com https://www.google-analytics.com",
    "font-src 'self'",
    "connect-src 'self' https://www.google-analytics.com https://www.googletagmanager.com https://*.google-analytics.com https://*.analytics.google.com",
    "base-uri 'self'",
    "form-action 'self'",
    `frame-ancestors ${frameAncestors}`,
    "object-src 'none'",
  ].join("; ");
}

const nextConfig: NextConfig = {
  outputFileTracingRoot: path.join(process.cwd()),
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    const sharedHeaders = [
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      {
        key: "Permissions-Policy",
        value: "camera=(), microphone=(), geolocation=()",
      },
      ...(!isDev
        ? [{ key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" }]
        : []),
    ];

    const homepageCacheControl = { key: "Cache-Control", value: "private, no-store" };

    return [
      {
        source: "/",
        headers: [
          ...sharedHeaders,
          { key: "X-Frame-Options", value: "DENY" },
          {
            key: "Content-Security-Policy",
            value: contentSecurityPolicy("'none'"),
          },
          homepageCacheControl,
        ],
      },
      {
        source: "/pt-br",
        headers: [
          ...sharedHeaders,
          { key: "X-Frame-Options", value: "DENY" },
          {
            key: "Content-Security-Policy",
            value: contentSecurityPolicy("'none'"),
          },
          homepageCacheControl,
        ],
      },
      {
        source: "/preview/:path*",
        headers: [
          ...sharedHeaders.filter((header) => header.key !== "Referrer-Policy"),
          { key: "Referrer-Policy", value: "no-referrer" },
          {
            key: "Content-Security-Policy",
            value: contentSecurityPolicy(previewFrameAncestors),
          },
        ],
      },
      {
        source: "/((?!preview/).*)",
        headers: [
          ...sharedHeaders,
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "Content-Security-Policy",
            value: contentSecurityPolicy("'none'"),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
