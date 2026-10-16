import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    // Placeholders usados enquanto as fotos reais não estão em public/images.
    // TODO: remover quando site.ts deixar de usar placeholders.
    remotePatterns: [new URL("https://placehold.co/**")],
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
