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
    it: {
      tagline: "Il laboratorio non tossico per la vita quotidiana.",
      description:
        "Proviamo le alternative, leggiamo gli studi e pubblichiamo guide sobrie e documentate sui microplastici, le PFAS e i cambiamenti domestici che valgono davvero la pena.",
    },
    es: {
      tagline: "El laboratorio sin tóxicos para la vida diaria.",
      description:
        "Probamos las alternativas, leemos los estudios y publicamos guías serenas y documentadas sobre microplásticos, PFAS y los cambios domésticos que de verdad merecen la pena.",
    },
    nl: {
      tagline: "Het giftvrije laboratorium voor het dagelijks leven.",
      description:
        "Wij testen de alternatieven, lezen de studies en publiceren rustige, onderbouwde gidsen over microplastics, PFAS en de huishoudelijke veranderingen die werkelijk de moeite waard zijn.",
    },
    pl: {
      tagline: "Laboratorium bez toksyn na co dzień.",
      description:
        "Sprawdzamy zamienniki, czytamy badania i publikujemy spokojne, udokumentowane przewodniki o mikroplastiku, PFAS i domowych zmianach, które naprawdę warto wprowadzić.",
    },
    sv: {
      tagline: "Det giftfria labbet för vardagen.",
      description:
        "Vi testar bytena, läser studierna och publicerar lugna, källbelagda guider om mikroplaster, PFAS och de hushållsförändringar som verkligen är värda besväret.",
    },
    pt: {
      tagline: "O laboratório sem tóxicos para o dia a dia.",
      description:
        "Provamos as alternativas, lemos os estudos e publicamos guias calmos e fundamentados sobre microplásticos, PFAS e as mudanças domésticas que valem mesmo a pena.",
    },
    ro: {
      tagline: "Laboratorul fără toxine pentru viața de zi cu zi.",
      description:
        "Încercăm alternativele, citim studiile și publicăm ghiduri liniștite, documentate, despre microplastice, PFAS și schimbările casnice care chiar merită făcute.",
    },
    cs: {
      tagline: "Netoxická laboratoř pro každý den.",
      description:
        "Zkoušíme alternativy, čteme studie a vydáváme klidné, doložené průvodce mikroplasty, PFAS a domácími změnami, které opravdu stojí za to.",
    },
    no: {
      tagline: "Det giftfrie laboratoriet for hverdagen.",
      description:
        "Vi prøver byttene, leser studiene og publiserer rolige, kildebelagte guider om mikroplast, PFAS og hverdagsendringene som virkelig er verdt strevet.",
    },
  } satisfies Partial<Record<Locale, LocaleSite>>,
} as const;

export function siteTagline(locale: Locale): string {
  return SITE.i18n[locale as keyof typeof SITE.i18n]?.tagline ?? SITE.tagline;
}

export function siteDescription(locale: Locale): string {
  return SITE.i18n[locale as keyof typeof SITE.i18n]?.description ?? SITE.description;
}
