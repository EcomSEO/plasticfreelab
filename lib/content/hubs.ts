import type { Locale } from "@/i18n/routing";

export type LocaleHub = {
  name?: string;
  shortName?: string;
  oneLiner?: string;
  thesis?: string;
};

export type Hub = {
  slug: string;
  name: string;
  shortName: string;
  oneLiner: string;
  thesis: string;
  i18n?: Partial<Record<Locale, LocaleHub>>;
};

export const hubs: Hub[] = [
  {
    slug: "microplastics-and-edcs",
    name: "Microplastics & EDCs",
    shortName: "Microplastics",
    oneLiner:
      "The science, in plain English. What's actually known, what's still debated, and what to do about it.",
    thesis:
      "Microplastics and endocrine-disrupting chemicals are the foundational concept readers need to understand before any specific swap makes sense. This hub educates, the others act.",
    i18n: {
      de: {
        name: "Mikroplastik & EDCs",
        shortName: "Mikroplastik",
        oneLiner:
          "Die Forschung, verständlich erklärt. Was tatsächlich bekannt ist, was weiterhin offen ist und was sich daraus ableiten lässt.",
        thesis:
          "Mikroplastik und hormonell wirksame Stoffe sind das Grund­konzept, das Lesende einordnen müssen, bevor ein konkreter Wechsel überhaupt Sinn ergibt. Diese Rubrik klärt auf, die anderen handeln.",
      },
      fr: {
        name: "Microplastiques & PE",
        shortName: "Microplastiques",
        oneLiner:
          "La science, en français clair. Ce qui est établi, ce qui reste débattu et ce que cela implique au quotidien.",
        thesis:
          "Les microplastiques et les perturbateurs endocriniens forment le cadre que les lectrices doivent saisir avant qu’un changement précis ait du sens. Cette rubrique éclaire, les autres agissent.",
      },
    },
  },
  {
    slug: "non-toxic-kitchen",
    name: "Non-Toxic Kitchen",
    shortName: "Kitchen",
    oneLiner:
      "The highest-impact swaps in your home, ranked by how much they matter. Cookware, water, storage, the works.",
    thesis:
      "The kitchen is the highest-impact room for non-toxic swaps. Readers come here ready to act. This hub is action-oriented, comparison-heavy, money-page-dense.",
    i18n: {
      de: {
        name: "Schadstoffarme Küche",
        shortName: "Küche",
        oneLiner:
          "Die wirksamsten Wechsel im Haushalt, geordnet nach Bedeutung. Kochgeschirr, Wasser, Aufbewahrung – das ganze Sortiment.",
        thesis:
          "Die Küche ist der Raum mit der größten Wirkung für schadstoff­arme Wechsel. Lesende kommen hierher mit Handlungs­absicht. Diese Rubrik ist umsetzungsorientiert, vergleichs­stark und dicht an Kauf­empfehlungen.",
      },
      fr: {
        name: "Cuisine non toxique",
        shortName: "Cuisine",
        oneLiner:
          "Les changements à plus fort impact dans le foyer, classés par importance. Ustensiles, eau, stockage — tout y est.",
        thesis:
          "La cuisine est la pièce qui rend le plus pour des changements non toxiques. Les lectrices y viennent prêtes à agir. Cette rubrique est tournée vers l’action, riche en comparatifs et dense en pages d’achat.",
      },
    },
  },
  {
    slug: "non-toxic-personal-care",
    name: "Personal Care",
    shortName: "Personal Care",
    oneLiner:
      "Shampoo to sunscreen, the calm truth about what's in your bathroom and what's worth replacing.",
    thesis:
      "Personal care products sit on skin for hours a day. This hub separates the swaps that matter from the marketing claims that don't.",
    i18n: {
      de: {
        name: "Körperpflege",
        shortName: "Körperpflege",
        oneLiner:
          "Vom Shampoo bis zur Sonnencreme – die ruhige Wahrheit darüber, was im Bad steht und was sich zu ersetzen lohnt.",
        thesis:
          "Körperpflege­produkte verbleiben stundenlang täglich auf der Haut. Diese Rubrik trennt die Wechsel, die zählen, von den Werbe­versprechen, die es nicht tun.",
      },
      fr: {
        name: "Hygiène et soins",
        shortName: "Hygiène",
        oneLiner:
          "Du shampoing à la crème solaire, la vérité posée sur ce qui occupe la salle de bains et ce qui mérite d’être remplacé.",
        thesis:
          "Les produits d’hygiène restent des heures sur la peau, chaque jour. Cette rubrique sépare les changements qui comptent des promesses marketing qui ne tiennent pas.",
      },
    },
  },
  {
    slug: "non-toxic-home",
    name: "Home Environment",
    shortName: "Home",
    oneLiner:
      "Mattresses, cleaning products, air quality, and the quiet exposures you never think about.",
    thesis:
      "Indoor air is two to five times more polluted than outdoor air. Your mattress, your cleaning supplies, and your flooring are usually why. This hub covers the environment you actually live in.",
    i18n: {
      de: {
        name: "Wohnumgebung",
        shortName: "Wohnen",
        oneLiner:
          "Matratzen, Reinigungs­mittel, Raumluft – und die leisen Belastungen, an die niemand denkt.",
        thesis:
          "Innenraum­luft ist zwei- bis fünfmal stärker belastet als die Außenluft. In aller Regel sind Matratze, Reinigungs­mittel und Bodenbelag die Ursache. Diese Rubrik widmet sich der Umgebung, in der Sie tatsächlich leben.",
      },
      fr: {
        name: "Environnement intérieur",
        shortName: "Maison",
        oneLiner:
          "Matelas, produits ménagers, qualité de l’air — et les expositions discrètes auxquelles personne ne pense.",
        thesis:
          "L’air intérieur est deux à cinq fois plus pollué que l’air extérieur. Votre matelas, vos produits ménagers et vos revêtements en sont le plus souvent la cause. Cette rubrique traite de l’environnement où vous vivez vraiment.",
      },
    },
  },
  {
    slug: "non-toxic-clothing-and-textiles",
    name: "Clothing & Textiles",
    shortName: "Clothing",
    oneLiner:
      "Microplastics, PFAS in clothes, and the textile supply chain — with the brands worth buying.",
    thesis:
      "Synthetic fabrics shed microplastics every wash and many carry PFAS from the factory. This hub covers what's in your wardrobe and which brands have done the work.",
    i18n: {
      de: {
        name: "Kleidung & Textilien",
        shortName: "Textilien",
        oneLiner:
          "Mikroplastik, PFAS in Kleidung und die Liefer­kette der Textilindustrie – mit den Marken, die ihre Hausaufgaben gemacht haben.",
        thesis:
          "Synthetische Textilien geben bei jedem Waschgang Mikroplastik ab; viele tragen schon ab Werk PFAS. Diese Rubrik beschäftigt sich damit, was in Ihrem Kleiderschrank steckt – und welche Marken die Arbeit gemacht haben.",
      },
      fr: {
        name: "Vêtements & textiles",
        shortName: "Textile",
        oneLiner:
          "Microplastiques, PFAS dans les vêtements et chaîne d’approvisionnement textile — avec les marques qui ont fait le travail.",
        thesis:
          "Les tissus synthétiques relâchent des microplastiques à chaque lavage et beaucoup portent des PFAS dès l’usine. Cette rubrique examine ce qui occupe votre garde-robe — et les marques qui ont fait le travail.",
      },
    },
  },
];

export function getHub(slug: string): Hub | undefined {
  return hubs.find((h) => h.slug === slug);
}

/** Locale-aware accessor for a hub field. Falls back to English if absent. */
export function tHub(hub: Hub | undefined, locale: Locale): {
  name: string;
  shortName: string;
  oneLiner: string;
  thesis: string;
} {
  if (!hub) {
    return { name: "", shortName: "", oneLiner: "", thesis: "" };
  }
  const t = hub.i18n?.[locale];
  return {
    name: t?.name ?? hub.name,
    shortName: t?.shortName ?? hub.shortName,
    oneLiner: t?.oneLiner ?? hub.oneLiner,
    thesis: t?.thesis ?? hub.thesis,
  };
}
