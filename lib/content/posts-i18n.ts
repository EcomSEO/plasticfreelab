import type { Locale } from "@/i18n/routing";

/**
 * Translated metadata (title + description) for each post.
 *
 * Phase 1 ships German + French. Slugs stay in English; body content
 * (faq, products, items, sources) stays in English and the article
 * pages render a translation-pending banner over the body.
 *
 * Adding a new locale = drop another `<locale>` key into each entry.
 */
export type LocalePost = {
  title?: string;
  description?: string;
  h1?: string;
};

export type PostI18n = Partial<Record<Locale, LocalePost>>;

export const POST_I18N: Record<string, PostI18n> = {
  "best-non-toxic-cookware": {
    de: {
      title: "Schadstoffarmes Kochgeschirr 2026: getestet und gerankt",
      h1: "Schadstoffarme Kochgeschirr-Sets 2026, getestet und gerankt",
      description:
        "Wir haben 14 Marken für schadstoffarmes Kochgeschirr geprüft. Hier sind die Empfehlung der Redaktion, die günstigste Wahl und die Sets, von denen wir abraten – jeweils mit Quellen.",
    },
    fr: {
      title: "Meilleurs ustensiles non toxiques 2026, testés et classés",
      h1: "Meilleures batteries non toxiques de 2026, testées et classées",
      description:
        "Nous avons testé 14 marques d’ustensiles non toxiques. Voici notre choix, l’option budget et celles que nous écartons, sources à l’appui.",
    },
  },
  "best-water-filters": {
    de: {
      title:
        "Wasserfilter für zu Hause: Auftischgerät, Untertisch oder zentral",
      h1: "Beste Wasserfilter für zu Hause: Auftischgerät, Untertisch oder zentral",
      description:
        "Wir haben Auftisch-, Untertisch- und Hauswasser­filter auf Schadstoff­entfernung, Durchfluss und Kosten je Liter verglichen. Hier ist unsere geordnete Empfehlung.",
    },
    fr: {
      title:
        "Meilleurs filtres à eau\u202F: comptoir, sous-évier, point d’entrée",
      h1: "Meilleurs filtres à eau pour la maison\u202F: comptoir, sous-évier ou point d’entrée",
      description:
        "Nous avons comparé les filtres de comptoir, sous-évier et point d’entrée selon la rétention des contaminants, le débit et le coût au litre. Voici notre choix classé.",
    },
  },
  "best-microplastic-free-underwear": {
    de: {
      title: "Mikroplastik­freie Unterwäsche-Marken, getestet und gerankt",
      h1: "Beste mikroplastik­freie Unterwäsche-Marken",
      description:
        "Nach der PFAS-Klage gegen Thinx ein ruhiger Leitfaden zu Unterwäsche-Marken, deren Materialien sich tatsächlich überprüfen lassen.",
    },
    fr: {
      title:
        "Meilleures marques de sous-vêtements sans microplastiques, testées",
      h1: "Meilleures marques de sous-vêtements sans microplastiques",
      description:
        "Après l’affaire PFAS de Thinx, voici le guide posé des marques de sous-vêtements dont les matériaux peuvent être réellement vérifiés.",
    },
  },
  "non-toxic-kitchen-guide": {
    de: {
      title:
        "Der vollständige Leitfaden zur schadstoff­armen Küche, nach Priorität",
      h1: "Der vollständige Leitfaden zur schadstoff­armen Küche",
      description:
        "Alles, was es in der Küche zu tauschen lohnt, geordnet nach Wirkung. Kochgeschirr, Wasser, Aufbewahrung, Klein­geräte, Utensilien – die vollständige Prioritäten­liste.",
    },
    fr: {
      title:
        "Le guide complet de la cuisine non toxique\u202F: tout ce qu’il faut changer, par priorité",
      h1: "Le guide complet de la cuisine non toxique",
      description:
        "Tout ce qui mérite d’être changé en cuisine, classé par impact. Ustensiles, eau, stockage, petit électroménager, accessoires — la liste de priorités complète.",
    },
  },
  "microplastics-and-edcs-guide": {
    de: {
      title: "Der vollständige Leitfaden zu Mikroplastik und EDCs",
      h1: "Der vollständige Leitfaden zu Mikroplastik und hormonell wirksamen Stoffen",
      description:
        "Was Mikroplastik und EDCs sind, woher sie kommen, was die Forschung tatsächlich sagt – und was sich daraus ableiten lässt, ohne Panik.",
    },
    fr: {
      title:
        "Le guide complet des microplastiques et des perturbateurs endocriniens",
      h1: "Le guide complet des microplastiques et des perturbateurs endocriniens",
      description:
        "Ce que sont les microplastiques et les perturbateurs endocriniens, d’où ils viennent, ce que dit réellement la science et ce que l’on peut en faire — sans céder à la panique.",
    },
  },
  "teflon-pfas-truth": {
    de: {
      title: "Die Wahrheit über Teflon und PFAS in Antihaft-Pfannen",
      h1: "Die Wahrheit über Teflon und PFAS in Antihaft-Pfannen",
      description:
        "Teflon, PFAS, PFOA: Was tatsächlich in Ihrer Antihaft-Pfanne steckt, was die Belege zur Belastung zeigen – und wann ein Austausch sinnvoll ist.",
    },
    fr: {
      title: "La vérité sur le Téflon et les PFAS dans les poêles antiadhésives",
      h1: "La vérité sur le Téflon et les PFAS dans les poêles antiadhésives",
      description:
        "Téflon, PFAS, PFOA\u202F: ce qu’il y a vraiment dans votre poêle antiadhésive, ce que disent les données sur l’exposition et quand le remplacement vaut la peine.",
    },
  },
  "cast-iron-vs-ceramic-vs-stainless": {
    de: {
      title:
        "Gusseisen vs. Keramik vs. Edelstahl: Was ist tatsächlich am sichersten?",
      h1: "Gusseisen vs. Keramik vs. Edelstahl: was ist tatsächlich am sichersten?",
      description:
        "Ein ruhiger, belegter Vergleich der drei wichtigsten schadstoff­armen Kochgeschirr­materialien – mit einer Empfehlung für jeden Anwendungsfall.",
    },
    fr: {
      title:
        "Fonte, céramique ou inox\u202F: lequel est vraiment le plus sûr\u202F?",
      h1: "Fonte, céramique ou inox\u202F: lequel est vraiment le plus sûr\u202F?",
      description:
        "Un comparatif posé et sourcé des trois principaux matériaux d’ustensiles non toxiques, avec un verdict pour chaque usage.",
    },
  },
  "brita-vs-berkey-vs-aquatru": {
    de: {
      title:
        "Brita vs. Berkey vs. AquaTru: Schwerkraft- gegen Auftischfilter",
      h1: "Brita vs. Berkey vs. AquaTru",
      description:
        "Brita, Berkey, AquaTru: drei Filter, drei verschiedene Aufgaben. Hier ist der ehrliche Vergleich mit den Schadstoff­daten.",
    },
    fr: {
      title:
        "Brita, Berkey ou AquaTru\u202F: filtre par gravité contre filtre de comptoir",
      h1: "Brita, Berkey ou AquaTru",
      description:
        "Brita, Berkey, AquaTru\u202F: trois filtres, trois usages distincts. Le comparatif honnête, données sur les contaminants à l’appui.",
    },
  },
  "what-are-microplastics": {
    de: {
      title: "Was sind Mikroplastik? Eine verständliche Einführung",
      h1: "Was sind Mikroplastik?",
      description:
        "Mikroplastik sind Kunststoff­fragmente unter 5 mm. Hier steht, woraus sie bestehen, woher sie kommen und was die Datenlage zur menschlichen Gesundheit ruhig betrachtet sagt.",
    },
    fr: {
      title:
        "Que sont les microplastiques\u202F? Un explicatif en français clair",
      h1: "Que sont les microplastiques\u202F?",
      description:
        "Les microplastiques sont de petits fragments de plastique inférieurs à 5\u202Fmm. Voici de quoi ils sont faits, d’où ils viennent et ce que disent calmement les données sur la santé humaine.",
    },
  },
  "12-things-to-throw-out-of-your-kitchen": {
    de: {
      title: "12 Dinge, die dieses Wochenende aus Ihrer Küche fliegen sollten",
      h1: "12 Dinge, die dieses Wochenende aus Ihrer Küche fliegen sollten",
      description:
        "Die Küchen-Checkliste: 12 Gegenstände, die sich zu ersetzen lohnen, nach Priorität, mit jeweils einem Satz Begründung und einem Satz Ersatz.",
    },
    fr: {
      title: "12 choses à sortir de votre cuisine ce week-end",
      h1: "12 choses à sortir de votre cuisine ce week-end",
      description:
        "La liste de l’audit cuisine\u202F: 12 objets à remplacer, par ordre de priorité, avec une raison et une alternative en une ligne pour chacun.",
    },
  },
};
