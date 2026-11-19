import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    agentFeedback: true,
  },
  // Old category URLs from before the client's category rename.
  async redirects() {
    return [
      { source: "/categories/body-bath", destination: "/categories/body-care", permanent: true },
      { source: "/categories/lotions-butters", destination: "/categories/body-care", permanent: true },
      { source: "/categories/fragrance-mists", destination: "/categories/body-care", permanent: true },
      { source: "/categories/mens-grooming", destination: "/categories/mens-care", permanent: true },
    ];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
