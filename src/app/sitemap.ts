import type { MetadataRoute } from "next";
import { RESOURCES } from "@/content/resources";

const BASE_URL = "https://codely.ai";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/features", "/pricing", "/contact", "/resources"].map(
    (path) => ({
      url: `${BASE_URL}${path}`,
      lastModified: new Date(),
    })
  );

  const resourceRoutes = RESOURCES.map((resource) => ({
    url: `${BASE_URL}/resources/${resource.slug}`,
    lastModified: resource.date,
  }));

  return [...staticRoutes, ...resourceRoutes];
}
