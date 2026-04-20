import type { MetadataRoute } from "next";
import { SITE } from "@/lib/content/site";
import { hubs } from "@/lib/content/hubs";
import { posts } from "@/lib/content/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();
  const entries: MetadataRoute.Sitemap = [
    { url: SITE.url, lastModified: now, changeFrequency: "weekly", priority: 1 },
    ...hubs.map((h) => ({
      url: `${SITE.url}/guides/${h.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...posts.map((p) => ({
      url: `${SITE.url}/${p.slug}`,
      lastModified: p.updatedAt,
      changeFrequency: "monthly" as const,
      priority: p.postType === "pillar" || p.postType === "comparison" ? 0.9 : 0.7,
    })),
    ...[
      "/about",
      "/editorial-standards",
      "/privacy",
      "/terms",
      "/affiliate-disclosure",
      "/contact",
      "/newsletter",
    ].map((path) => ({
      url: `${SITE.url}${path}`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    })),
  ];
  return entries;
}
