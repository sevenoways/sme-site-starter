import type { MetadataRoute } from "next";
import { site } from "@/site.config.ts";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/services", "/contact", "/privacy", "/cookies", "/accessibility"].map((path) => ({
    url: `${site.url}${path}`,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.6,
  }));
}
