import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // AVIF first (roughly 20 to 30% smaller than WebP), WebP as the fallback.
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    // Tree-shake icon barrels so only the icons actually used ship.
    optimizePackageImports: ["lucide-react", "@icons-pack/react-simple-icons"],
  },
};

export default nextConfig;
