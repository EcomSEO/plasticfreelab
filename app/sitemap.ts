import type { MetadataRoute } from "next";
import { SITE } from "@/lib/content/site";
import { hubs } from "@/lib/content/hubs";
import { posts } from "@/lib/content/posts";
import { defaultLocale, type Locale } from "@/i18n/routing";

/**
 * Per the 2026-04-29 audit-fix sweep (01-plasticfreelab.md Phase 0
 * recommendation a): hreflang declarations are restored to EN +
 * x-default only through Wave 1 close. Other locale routes still
 * resolve so inbound URLs keep working, but the sitemap surface is
 * EN-only to avoid Search Console "alternate page with wrong hreflang"
 * errors. Re-evaluate at Wave 4.
 */
const HREFLANG_LOCALES: readonly Locale[] = ["en"];
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
    for (const l of HREFLANG_LOCALES) {
      languages[l] = localeUrl(l, path);
    }
    languages["x-default"] = localeUrl(defaultLocale, path);

    return HREFLANG_LOCALES.map((l) => ({
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
      "/corrections-policy",
      "/methodology",
      "/pipeline",
      "/authors",
      "/scientific-advisors",
      "/privacy",
      "/terms",
      "/affiliate-disclosure",
      "/impressum",
      "/contact",
      "/newsletter",
    ].flatMap((path) =>
      buildEntry(path, { changeFrequency: "yearly", priority: 0.3 })
    ),
    // Per-author and per-advisor profile pages.
    ...[
      "/authors/linnea-asher",
      "/authors/maren-keszler",
      "/scientific-advisors/dr-holly-mason",
    ].flatMap((path) =>
      buildEntry(path, { changeFrequency: "monthly", priority: 0.5 })
    ),
  ];
  return entries;
}

// Silence unused-import warning if SITE is not directly referenced.
void SITE;
