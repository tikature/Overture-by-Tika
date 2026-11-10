import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV !== "production";

function buildCsp() {
  const scriptSrc = [
    "'self'",
    "'unsafe-inline'",
    isDev && "'unsafe-eval'",
    "https://va.vercel-scripts.com",
  ].filter(Boolean).join(" ");

  const styleSrc = [
    "'self'",
    "'unsafe-inline'",
    "https://fonts.googleapis.com",
  ].join(" ");

  const imgSrc = [
    "'self'",
    "data:",
    "blob:",
    "https://opengraph.githubassets.com",
    "https://*.vercel.app",
    "https://*.netlify.app",
    "https://*.github.io",
    "https://thevalidly.com",
    "https://ayopilih.site",
  ].join(" ");

  const fontSrc = [
    "'self'",
    "data:",
    "https://fonts.gstatic.com",
  ].join(" ");

  const frameSrc = [
    "'self'",
    "https://*.vercel.app",
    "https://*.netlify.app",
    "https://*.github.io",
    "https://thevalidly.com",
    "https://ayopilih.site",
  ].join(" ");

  const connectSrc = [
    "'self'",
    "https://va.vercel-scripts.com",
    "https://vitals.vercel-insights.com",
  ].join(" ");

  const csp = [
    `default-src 'self'`,
    `script-src ${scriptSrc}`,
    `style-src ${styleSrc}`,
    `img-src ${imgSrc}`,
    `font-src ${fontSrc}`,
    `frame-src ${frameSrc}`,
    `connect-src ${connectSrc}`,
    "form-action 'self'",
    "base-uri 'self'",
    "object-src 'none'",
    "frame-ancestors 'none'",
    !isDev && "upgrade-insecure-requests",
  ].filter(Boolean).join("; ");

  return csp;
}

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "ts", "tsx"],
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "opengraph.githubassets.com" },
      { protocol: "https", hostname: "*.vercel.app" },
      { protocol: "https", hostname: "*.netlify.app" },
      { protocol: "https", hostname: "*.github.io" },
      { protocol: "https", hostname: "thevalidly.com" },
      { protocol: "https", hostname: "ayopilih.site" },
    ],
    domains: [
      "opengraph.githubassets.com",
      "thevalidly.com",
      "ayopilih.site",
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "Content-Security-Policy", value: buildCsp() },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
      {
        source: "/images/(.*)",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ];
  },
};

export default nextConfig;