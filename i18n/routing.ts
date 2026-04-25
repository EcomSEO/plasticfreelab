import { defineRouting } from "next-intl/routing";

/**
 * Locale routing for plasticfreelab.com.
 *
 * Phase 1 ships English (default), German, and French.
 *
 * Architecture is intentionally additive: dropping a new locale into
 * `locales` plus a matching dictionary file in `i18n/dictionaries/<code>.json`
 * and i18n entries on hubs/posts is all that's required to add e.g. Italian.
 *
 * Default locale (`en`) is served from the root path with no prefix —
 * `/best-non-toxic-cookware`. Other locales are prefix-required —
 * `/de/best-non-toxic-cookware`, `/fr/best-non-toxic-cookware`. Slugs
 * stay in English in phase 1 (route translation is phase 2).
 */
export const locales = ["en", "de", "fr"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const routing = defineRouting({
  locales,
  defaultLocale,
  // Default locale is served without a prefix; other locales must be prefixed.
  localePrefix: "as-needed",
});
