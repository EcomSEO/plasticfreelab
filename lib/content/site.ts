import type { Locale } from "@/i18n/routing";

type LocaleSite = {
  tagline?: string;
  description?: string;
};

export const SITE = {
  name: "PlasticFreeLab",
  url: "https://plasticfreelab.com",
  tagline: "The non-toxic lab for everyday life.",
  description:
    "We test the swaps, read the studies, and publish calm, cited guides to microplastics, PFAS, and the household changes actually worth making.",
  author: "The PlasticFreeLab Team",
  email: "hello@plasticfreelab.com",
  launched: true,
  volume: "Vol. I",
  issue: "No. 01",
  i18n: {
    de: {
      tagline: "Das schadstoffarme Labor für den Alltag.",
      description:
        "Wir prüfen die Alternativen, lesen die Studien und veröffentlichen ruhige, belegte Leitfäden zu Mikroplastik, PFAS und den Veränderungen im Haushalt, die sich tatsächlich lohnen.",
    },
    fr: {
      tagline: "Le laboratoire non toxique pour le quotidien.",
      description:
        "Nous testons les alternatives, lisons les études et publions des guides apaisés, sourcés, sur les microplastiques, les PFAS et les changements domestiques qui valent la peine.",
    },
  } satisfies Partial<Record<Locale, LocaleSite>>,
} as const;

export function siteTagline(locale: Locale): string {
  return SITE.i18n[locale as keyof typeof SITE.i18n]?.tagline ?? SITE.tagline;
}

export function siteDescription(locale: Locale): string {
  return SITE.i18n[locale as keyof typeof SITE.i18n]?.description ?? SITE.description;
}
