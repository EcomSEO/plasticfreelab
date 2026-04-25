import type { Metadata } from "next";
import { SITE } from "./content/site";
import { defaultLocale, locales, type Locale } from "@/i18n/routing";

const INDEX_WHEN_LAUNCHED: Metadata["robots"] = {
  index: true,
  follow: true,
};

const NO_INDEX_PRE_LAUNCH: Metadata["robots"] = {
  index: false,
  follow: false,
};

export function robotsMeta(): Metadata["robots"] {
  return SITE.launched ? INDEX_WHEN_LAUNCHED : NO_INDEX_PRE_LAUNCH;
}

/**
 * Build a canonical URL for the given locale + path.
 * Default locale gets no prefix; others get `/de/...`, `/fr/...`.
 */
export function localePath(locale: Locale, path: string): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  if (locale === defaultLocale) {
    return clean === "/" ? "" : clean;
  }
  return clean === "/" ? `/${locale}` : `/${locale}${clean}`;
}

export function localeUrl(locale: Locale, path: string): string {
  return `${SITE.url}${localePath(locale, path)}` || `${SITE.url}/`;
}

const OG_LOCALE: Record<Locale, string> = {
  en: "en_US",
  de: "de_DE",
  fr: "fr_FR",
};

export function canonical(path: string): string {
  return localeUrl(defaultLocale, path);
}

/**
 * Build a Metadata object for a page in a given locale, including:
 *  - locale-aware canonical
 *  - hreflang `alternates.languages` for every supported locale + x-default
 *  - localized OG locale tag
 */
export function pageMetadata(opts: {
  title: string;
  description: string;
  path: string;
  locale?: Locale;
  ogType?: "website" | "article";
}): Metadata {
  const locale = opts.locale ?? defaultLocale;
  const url = localeUrl(locale, opts.path);

  const languages: Record<string, string> = {};
  for (const l of locales) {
    languages[l] = localeUrl(l, opts.path);
  }
  languages["x-default"] = localeUrl(defaultLocale, opts.path);

  return {
    title: opts.title,
    description: opts.description,
    alternates: {
      canonical: url,
      languages,
    },
    robots: robotsMeta(),
    openGraph: {
      type: opts.ogType ?? "website",
      url,
      title: opts.title,
      description: opts.description,
      siteName: SITE.name,
      locale: OG_LOCALE[locale],
      alternateLocale: locales.filter((l) => l !== locale).map((l) => OG_LOCALE[l]),
    },
    twitter: {
      card: "summary_large_image",
      title: opts.title,
      description: opts.description,
    },
  };
}
