import type { NextConfig } from "next";

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
};

export default nextConfig;