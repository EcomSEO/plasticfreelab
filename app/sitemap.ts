import type { MetadataRoute } from "next";
import { SITE } from "@/lib/content/site";
import { hubs } from "@/lib/content/hubs";
import { posts } from "@/lib/content/posts";
import { defaultLocale, locales } from "@/i18n/routing";
import { localeUrl } from "@/lib/seo";

/**
 * Locale-aware sitemap. For every URL we emit one entry per locale and
 * mirror the others (plus x-default → English) into `alternates.languages`,
 * which Next translates into proper xhtml:link hreflang entries.
 *
 * Phase-1 paths are identical across locales (English slugs). When we
 * add translated slugs later, swap the path string per-locale here.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  const buildEntry = (
    path: string,
    opts: {
      lastModified?: string;
      changeFrequency?: MetadataRoute.Sitemap[number]["changeFrequency"];
      priority?: number;
    } = {}
  ): MetadataRoute.Sitemap => {
    const languages: Record<string, string> = {};
    for (const l of locales) {
      languages[l] = localeUrl(l, path);
    }
    languages["x-default"] = localeUrl(defaultLocale, path);

    return locales.map((l) => ({
      url: localeUrl(l, path),
      lastModified: opts.lastModified ?? now,
      changeFrequency: opts.changeFrequency,
      priority: opts.priority,
      alternates: { languages },
    }));
  };

  const entries: MetadataRoute.Sitemap = [
    ...buildEntry("/", { changeFrequency: "weekly", priority: 1 }),
    ...hubs.flatMap((h) =>
      buildEntry(`/guides/${h.slug}`, {
        changeFrequency: "weekly",
        priority: 0.8,
      })
    ),
    ...posts.flatMap((p) =>
      buildEntry(`/${p.slug}`, {
        lastModified: p.updatedAt,
        changeFrequency: "monthly",
        priority:
          p.postType === "pillar" || p.postType === "comparison" ? 0.9 : 0.7,
      })
    ),
    ...[
      "/about",
      "/editorial-standards",
      "/privacy",
      "/terms",
      "/affiliate-disclosure",
      "/contact",
      "/newsletter",
    ].flatMap((path) =>
      buildEntry(path, { changeFrequency: "yearly", priority: 0.3 })
    ),
  ];
  return entries;
}

// Silence unused-import warning if SITE is not directly referenced.
void SITE;
