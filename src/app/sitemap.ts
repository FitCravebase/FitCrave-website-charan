import type { MetadataRoute } from "next";

const BASE = "https://www.fitcrave.co.in";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/privacy", "/terms", "/account-deletion"].map((path) => ({
    url: `${BASE}${path}`,
    changeFrequency: path ? "yearly" : "weekly",
    priority: path ? 0.3 : 1,
  }));
}
