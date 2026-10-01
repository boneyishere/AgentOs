import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // AVIF first (roughly 20 to 30% smaller than WebP), WebP as the fallback.
    formats: ["image/avif", "image/webp"],
    // Next 16 defaults this to [75] and rejects anything else with a 400.
    // The industry photos are upscaled on HiDPI screens (their sources are
    // only 710px wide), so they opt into 90 to avoid stacking AVIF loss on
    // top of that; everything else stays on the 75 default.
    qualities: [75, 90],
  },
  experimental: {
    // Tree-shake icon barrels so only the icons actually used ship.
    optimizePackageImports: ["lucide-react", "@icons-pack/react-simple-icons"],
  },
};

export default nextConfig;
