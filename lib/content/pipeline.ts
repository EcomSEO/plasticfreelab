/**
 * Editorial pipeline — every investigation in flight, queued, or in writeup.
 *
 * The pipeline is published. The masthead chip pulls live counts from this
 * file at build time, and `/pipeline` renders the full list. Working titles
 * live here as plain strings (not in the post `i18n` table) because they
 * change before publication and aren't worth hydrating in three locales
 * until they ship as real posts in `posts.ts`.
 *
 * Counts shipped at v1.2: 12 in the lab, 4 drafted, 47 queued.
 */

export type PipelineEntryStatus = "researching" | "testing" | "drafted";

export type PipelineReviewerRole = "research" | "testing" | "medical" | "sourcing";

export type PipelineEntry = {
  /** Future canonical slug — placeholder until publication. */
  slug: string;
  /** Working title. Will be edited or replaced before publish. */
  workingTitle: string;
  /** Hub the finished post will join. Matches `lib/content/hubs.ts`. */
  hub: string;
  /** Free-text category — finer than hub, used for grouping in /pipeline. */
  category: string;
  /** Stage in the editorial workflow. */
  status: PipelineEntryStatus;
  /** ISO date the brief was opened. */
  startedAt: string;
  /** ISO date target for publication, when known. */
  expectedAt?: string;
  /** Which board role currently owns the work. */
  reviewerRole: PipelineReviewerRole;
};

export const pipeline: PipelineEntry[] = [
  // ============================================================
  // IN THE LAB — 12 entries, status = "testing"
  // ============================================================
  {
    slug: "best-stainless-food-storage-2026",
    workingTitle: "Best stainless food storage 2026 — six-week wear panel",
    hub: "non-toxic-kitchen",
    category: "food-storage",
    status: "testing",
    startedAt: "2026-03-12",
    expectedAt: "2026-05-18",
    reviewerRole: "testing",
  },
  {
    slug: "cast-iron-coating-pfas-panel",
    workingTitle:
      "Cast iron coating PFAS panel — lab back week of May 6",
    hub: "non-toxic-kitchen",
    category: "cookware",
    status: "testing",
    startedAt: "2026-02-28",
    expectedAt: "2026-05-25",
    reviewerRole: "sourcing",
  },
  {
    slug: "best-glass-water-bottles",
    workingTitle: "Borosilicate vs soda-lime vs stainless — 50-bottle drop test",
    hub: "non-toxic-kitchen",
    category: "water-bottles",
    status: "testing",
    startedAt: "2026-03-04",
    expectedAt: "2026-05-12",
    reviewerRole: "testing",
  },
  {
    slug: "best-non-toxic-mattresses-2026",
    workingTitle: "Best non-toxic mattresses 2026 — VOC chamber results pending",
    hub: "non-toxic-home",
    category: "mattresses",
    status: "testing",
    startedAt: "2026-02-18",
    expectedAt: "2026-06-08",
    reviewerRole: "sourcing",
  },
  {
    slug: "shower-filter-deep-dive",
    workingTitle:
      "Shower filter deep-dive — chlorine + chloramine reduction across 9 brands",
    hub: "non-toxic-kitchen",
    category: "water-filter",
    status: "testing",
    startedAt: "2026-03-20",
    expectedAt: "2026-05-30",
    reviewerRole: "testing",
  },
  {
    slug: "best-non-toxic-bras",
    workingTitle: "Best non-toxic bras — PFAS panel ordered, results week of May 13",
    hub: "non-toxic-clothing-and-textiles",
    category: "intimates",
    status: "testing",
    startedAt: "2026-03-09",
    expectedAt: "2026-06-01",
    reviewerRole: "testing",
  },
  {
    slug: "menstrual-cup-comparison",
    workingTitle: "Menstrual cup material comparison — silicone grade audit",
    hub: "non-toxic-personal-care",
    category: "period-care",
    status: "testing",
    startedAt: "2026-03-16",
    expectedAt: "2026-06-04",
    reviewerRole: "medical",
  },
  {
    slug: "non-toxic-deodorant-rankings",
    workingTitle: "Non-toxic deodorant rankings — 14 brands, eight-week wear panel",
    hub: "non-toxic-personal-care",
    category: "deodorant",
    status: "testing",
    startedAt: "2026-03-25",
    expectedAt: "2026-06-12",
    reviewerRole: "testing",
  },
  {
    slug: "air-purifier-pfas-test",
    workingTitle:
      "Air purifier PFAS in HEPA filters — 7 popular models on the bench",
    hub: "non-toxic-home",
    category: "air-quality",
    status: "testing",
    startedAt: "2026-02-22",
    expectedAt: "2026-05-22",
    reviewerRole: "sourcing",
  },
  {
    slug: "kids-stainless-water-bottles",
    workingTitle:
      "Kids' stainless water bottles — lead surveillance test, 11 brands",
    hub: "non-toxic-kitchen",
    category: "kids",
    status: "testing",
    startedAt: "2026-03-01",
    expectedAt: "2026-05-20",
    reviewerRole: "medical",
  },
  {
    slug: "non-toxic-laundry-detergent",
    workingTitle:
      "Non-toxic laundry detergent — fragrance audit + clean-rinse panel",
    hub: "non-toxic-home",
    category: "cleaning",
    status: "testing",
    startedAt: "2026-03-30",
    expectedAt: "2026-06-15",
    reviewerRole: "testing",
  },
  {
    slug: "best-cutting-boards-2026",
    workingTitle: "Best cutting boards 2026 — wood, bamboo, composite, stainless",
    hub: "non-toxic-kitchen",
    category: "kitchen-tools",
    status: "testing",
    startedAt: "2026-04-02",
    expectedAt: "2026-06-22",
    reviewerRole: "testing",
  },

  // ============================================================
  // DRAFTED — 4 entries, status = "drafted"
  // ============================================================
  {
    slug: "best-non-stick-alternatives",
    workingTitle: "Non-stick alternatives that aren't a coating — final draft in review",
    hub: "non-toxic-kitchen",
    category: "cookware",
    status: "drafted",
    startedAt: "2026-02-04",
    expectedAt: "2026-05-08",
    reviewerRole: "medical",
  },
  {
    slug: "phthalates-in-personal-care",
    workingTitle: "Phthalates in personal care — what 'fragrance' actually contains",
    hub: "microplastics-and-edcs",
    category: "explainer",
    status: "drafted",
    startedAt: "2026-01-28",
    expectedAt: "2026-05-05",
    reviewerRole: "medical",
  },
  {
    slug: "best-natural-sunscreens",
    workingTitle: "Best mineral sunscreens 2026 — 18 brands, EWG and Skin Cancer Foundation cross-referenced",
    hub: "non-toxic-personal-care",
    category: "sunscreen",
    status: "drafted",
    startedAt: "2026-02-10",
    expectedAt: "2026-05-15",
    reviewerRole: "research",
  },
  {
    slug: "microfiber-shedding-laundry-fix",
    workingTitle: "Microfiber shedding — Guppyfriend, Cora Ball, and lint filters benchmarked",
    hub: "non-toxic-clothing-and-textiles",
    category: "laundry",
    status: "drafted",
    startedAt: "2026-02-25",
    expectedAt: "2026-05-10",
    reviewerRole: "research",
  },

  // ============================================================
  // RESEARCHING / QUEUED — 47 entries, status = "researching"
  // ============================================================
  // Kitchen hub — queued
  {
    slug: "best-tea-kettles-2026",
    workingTitle: "Best electric tea kettles — fully stainless water path",
    hub: "non-toxic-kitchen",
    category: "small-appliance",
    status: "researching",
    startedAt: "2026-04-10",
    expectedAt: "2026-07-06",
    reviewerRole: "research",
  },
  {
    slug: "best-blenders-non-toxic",
    workingTitle: "Best blenders — BPA in jars, motor durability, and warranty math",
    hub: "non-toxic-kitchen",
    category: "small-appliance",
    status: "researching",
    startedAt: "2026-04-08",
    reviewerRole: "research",
  },
  {
    slug: "best-coffee-makers-no-plastic",
    workingTitle: "Best coffee makers without plastic in the brew path",
    hub: "non-toxic-kitchen",
    category: "small-appliance",
    status: "researching",
    startedAt: "2026-04-15",
    reviewerRole: "research",
  },
  {
    slug: "instant-pot-vs-stovetop-pressure",
    workingTitle: "Instant Pot vs stovetop pressure — what's actually inside",
    hub: "non-toxic-kitchen",
    category: "small-appliance",
    status: "researching",
    startedAt: "2026-04-18",
    reviewerRole: "research",
  },
  {
    slug: "carbon-steel-pan-deep-dive",
    workingTitle: "Carbon steel pans — the under-appreciated 4th option",
    hub: "non-toxic-kitchen",
    category: "cookware",
    status: "researching",
    startedAt: "2026-04-04",
    expectedAt: "2026-06-30",
    reviewerRole: "research",
  },
  {
    slug: "best-baking-pans",
    workingTitle: "Best baking pans — coatings, finishes, and what releases",
    hub: "non-toxic-kitchen",
    category: "bakeware",
    status: "researching",
    startedAt: "2026-04-12",
    reviewerRole: "research",
  },
  {
    slug: "best-cooking-utensils",
    workingTitle: "Best cooking utensils — wood, stainless, silicone reviewed",
    hub: "non-toxic-kitchen",
    category: "kitchen-tools",
    status: "researching",
    startedAt: "2026-04-16",
    reviewerRole: "research",
  },
  {
    slug: "stainless-steel-grades-explained",
    workingTitle: "Stainless steel grades for cookware, explained",
    hub: "non-toxic-kitchen",
    category: "explainer",
    status: "researching",
    startedAt: "2026-04-20",
    reviewerRole: "research",
  },
  {
    slug: "best-glass-storage-containers",
    workingTitle: "Best glass storage containers — Pyrex, Anchor, Weck, OXO benchmarked",
    hub: "non-toxic-kitchen",
    category: "food-storage",
    status: "researching",
    startedAt: "2026-04-06",
    reviewerRole: "research",
  },
  {
    slug: "kitchen-sponge-bacteria-microplastic",
    workingTitle: "Kitchen sponges — bacteria, microplastic shedding, and the alternatives",
    hub: "non-toxic-kitchen",
    category: "kitchen-tools",
    status: "researching",
    startedAt: "2026-04-22",
    reviewerRole: "research",
  },
  {
    slug: "tap-water-by-zip-code",
    workingTitle: "Tap water contaminants by zip code — how to actually read the report",
    hub: "non-toxic-kitchen",
    category: "water-filter",
    status: "researching",
    startedAt: "2026-04-14",
    reviewerRole: "research",
  },

  // Microplastics & EDCs hub
  {
    slug: "what-are-pfas",
    workingTitle: "What are PFAS — the calm explainer with the full chemistry",
    hub: "microplastics-and-edcs",
    category: "explainer",
    status: "researching",
    startedAt: "2026-04-05",
    expectedAt: "2026-06-15",
    reviewerRole: "research",
  },
  {
    slug: "endocrine-disruptors-list",
    workingTitle: "The endocrine-disruptor list — 12 compounds and where they hide",
    hub: "microplastics-and-edcs",
    category: "explainer",
    status: "researching",
    startedAt: "2026-04-09",
    reviewerRole: "research",
  },
  {
    slug: "bpa-vs-bps-vs-bpf",
    workingTitle: "BPA, BPS, BPF — the bisphenol family in plain English",
    hub: "microplastics-and-edcs",
    category: "explainer",
    status: "researching",
    startedAt: "2026-04-11",
    reviewerRole: "research",
  },
  {
    slug: "microplastics-in-blood",
    workingTitle: "Microplastics in human blood — what Leslie 2022 actually found",
    hub: "microplastics-and-edcs",
    category: "explainer",
    status: "researching",
    startedAt: "2026-04-13",
    reviewerRole: "medical",
  },
  {
    slug: "microplastics-in-placenta",
    workingTitle: "Microplastics in the placenta — Ragusa 2021 reread",
    hub: "microplastics-and-edcs",
    category: "explainer",
    status: "researching",
    startedAt: "2026-04-17",
    reviewerRole: "medical",
  },
  {
    slug: "phthalates-explained",
    workingTitle: "Phthalates — the family, the labels, the regulation",
    hub: "microplastics-and-edcs",
    category: "explainer",
    status: "researching",
    startedAt: "2026-04-19",
    reviewerRole: "research",
  },
  {
    slug: "parabens-explained",
    workingTitle: "Parabens — what's banned in the EU and why the US hasn't followed",
    hub: "microplastics-and-edcs",
    category: "explainer",
    status: "researching",
    startedAt: "2026-04-21",
    reviewerRole: "research",
  },
  {
    slug: "plastic-recycling-codes-explained",
    workingTitle: "Plastic recycling codes — what each number actually means",
    hub: "microplastics-and-edcs",
    category: "explainer",
    status: "researching",
    startedAt: "2026-04-23",
    reviewerRole: "research",
  },

  // Personal care hub
  {
    slug: "best-shampoos-clean",
    workingTitle: "Best clean-ingredient shampoos — 14 brands cross-referenced with EWG",
    hub: "non-toxic-personal-care",
    category: "haircare",
    status: "researching",
    startedAt: "2026-04-07",
    reviewerRole: "research",
  },
  {
    slug: "best-toothpaste-no-fluoride",
    workingTitle: "Best toothpastes — fluoride, hydroxyapatite, and the SLS question",
    hub: "non-toxic-personal-care",
    category: "oral-care",
    status: "researching",
    startedAt: "2026-04-10",
    reviewerRole: "medical",
  },
  {
    slug: "best-clean-makeup-foundation",
    workingTitle: "Best clean foundations — pigment safety + skin compatibility",
    hub: "non-toxic-personal-care",
    category: "makeup",
    status: "researching",
    startedAt: "2026-04-12",
    reviewerRole: "research",
  },
  {
    slug: "best-clean-mascara",
    workingTitle: "Best clean mascaras — short list with full ingredient audit",
    hub: "non-toxic-personal-care",
    category: "makeup",
    status: "researching",
    startedAt: "2026-04-14",
    reviewerRole: "research",
  },
  {
    slug: "best-natural-perfumes",
    workingTitle: "Best natural perfumes — what 'fragrance' usually hides",
    hub: "non-toxic-personal-care",
    category: "fragrance",
    status: "researching",
    startedAt: "2026-04-16",
    reviewerRole: "research",
  },
  {
    slug: "best-body-wash",
    workingTitle: "Best body washes — clean fragrance, clean preservative",
    hub: "non-toxic-personal-care",
    category: "bath",
    status: "researching",
    startedAt: "2026-04-18",
    reviewerRole: "research",
  },
  {
    slug: "best-hair-conditioner",
    workingTitle: "Best conditioners — silicone-free, sulfate-free, actually working",
    hub: "non-toxic-personal-care",
    category: "haircare",
    status: "researching",
    startedAt: "2026-04-20",
    reviewerRole: "research",
  },
  {
    slug: "tampons-cotton-vs-rayon",
    workingTitle: "Tampons — organic cotton vs rayon, dioxin testing reread",
    hub: "non-toxic-personal-care",
    category: "period-care",
    status: "researching",
    startedAt: "2026-04-22",
    reviewerRole: "medical",
  },
  {
    slug: "best-natural-lip-balm",
    workingTitle: "Best natural lip balms — petroleum vs beeswax vs plant",
    hub: "non-toxic-personal-care",
    category: "skincare",
    status: "researching",
    startedAt: "2026-04-24",
    reviewerRole: "research",
  },
  {
    slug: "best-clean-moisturizer",
    workingTitle: "Best clean moisturizers — preservative systems audited",
    hub: "non-toxic-personal-care",
    category: "skincare",
    status: "researching",
    startedAt: "2026-04-26",
    reviewerRole: "research",
  },

  // Home hub
  {
    slug: "best-non-toxic-pillows",
    workingTitle: "Best non-toxic pillows — wool, latex, kapok benchmarked",
    hub: "non-toxic-home",
    category: "bedding",
    status: "researching",
    startedAt: "2026-04-03",
    reviewerRole: "research",
  },
  {
    slug: "best-organic-sheets",
    workingTitle: "Best organic cotton sheets — GOTS thread count audit",
    hub: "non-toxic-home",
    category: "bedding",
    status: "researching",
    startedAt: "2026-04-05",
    reviewerRole: "research",
  },
  {
    slug: "best-non-toxic-rugs",
    workingTitle: "Best non-toxic rugs — wool, jute, and what backing actually is",
    hub: "non-toxic-home",
    category: "flooring",
    status: "researching",
    startedAt: "2026-04-07",
    reviewerRole: "research",
  },
  {
    slug: "best-air-purifiers",
    workingTitle: "Best air purifiers 2026 — HEPA + carbon, full-room CADR",
    hub: "non-toxic-home",
    category: "air-quality",
    status: "researching",
    startedAt: "2026-04-09",
    reviewerRole: "testing",
  },
  {
    slug: "vocs-in-paint-explained",
    workingTitle: "VOCs in paint — what 'low-VOC' and 'zero-VOC' actually mean",
    hub: "non-toxic-home",
    category: "renovation",
    status: "researching",
    startedAt: "2026-04-11",
    reviewerRole: "research",
  },
  {
    slug: "best-cleaning-products",
    workingTitle: "Best non-toxic cleaning products — all rooms, ranked",
    hub: "non-toxic-home",
    category: "cleaning",
    status: "researching",
    startedAt: "2026-04-13",
    reviewerRole: "research",
  },
  {
    slug: "best-dish-soap",
    workingTitle: "Best dish soaps — fragrance audit + grease performance",
    hub: "non-toxic-home",
    category: "cleaning",
    status: "researching",
    startedAt: "2026-04-15",
    reviewerRole: "testing",
  },
  {
    slug: "best-dishwasher-detergent",
    workingTitle: "Best dishwasher detergents — pods vs powder, residue tested",
    hub: "non-toxic-home",
    category: "cleaning",
    status: "researching",
    startedAt: "2026-04-17",
    reviewerRole: "testing",
  },
  {
    slug: "fluoride-in-toothpaste-debate",
    workingTitle: "Fluoride in toothpaste — the calm survey of the actual evidence",
    hub: "non-toxic-personal-care",
    category: "oral-care",
    status: "researching",
    startedAt: "2026-04-19",
    reviewerRole: "medical",
  },
  {
    slug: "indoor-air-quality-monitors",
    workingTitle: "Indoor air-quality monitors — what the cheap ones actually measure",
    hub: "non-toxic-home",
    category: "air-quality",
    status: "researching",
    startedAt: "2026-04-21",
    reviewerRole: "research",
  },

  // Clothing hub
  {
    slug: "pfas-in-rain-jackets",
    workingTitle: "PFAS in rain jackets — 8 brands tested at SGS",
    hub: "non-toxic-clothing-and-textiles",
    category: "outerwear",
    status: "researching",
    startedAt: "2026-04-04",
    expectedAt: "2026-07-12",
    reviewerRole: "sourcing",
  },
  {
    slug: "best-organic-baby-clothing",
    workingTitle: "Best organic baby clothing — GOTS-certified, machine-washable",
    hub: "non-toxic-clothing-and-textiles",
    category: "kids",
    status: "researching",
    startedAt: "2026-04-08",
    reviewerRole: "research",
  },
  {
    slug: "best-natural-fiber-socks",
    workingTitle: "Best natural-fiber socks — merino, cotton, alpaca compared",
    hub: "non-toxic-clothing-and-textiles",
    category: "basics",
    status: "researching",
    startedAt: "2026-04-12",
    reviewerRole: "research",
  },
  {
    slug: "best-organic-cotton-tshirts",
    workingTitle: "Best organic cotton t-shirts — drawer-replacement basics",
    hub: "non-toxic-clothing-and-textiles",
    category: "basics",
    status: "researching",
    startedAt: "2026-04-14",
    reviewerRole: "research",
  },
  {
    slug: "best-non-toxic-yoga-pants",
    workingTitle: "Best non-toxic yoga pants — synthetic blend audit",
    hub: "non-toxic-clothing-and-textiles",
    category: "activewear",
    status: "researching",
    startedAt: "2026-04-16",
    reviewerRole: "research",
  },
  {
    slug: "best-non-toxic-bras-ranked",
    workingTitle: "Bras ranked — wired, wireless, organic cotton",
    hub: "non-toxic-clothing-and-textiles",
    category: "intimates",
    status: "researching",
    startedAt: "2026-04-18",
    reviewerRole: "research",
  },
  {
    slug: "wool-vs-synthetic-base-layers",
    workingTitle: "Wool vs synthetic base layers — performance + microplastic shed",
    hub: "non-toxic-clothing-and-textiles",
    category: "outerwear",
    status: "researching",
    startedAt: "2026-04-20",
    reviewerRole: "research",
  },
  {
    slug: "best-non-toxic-shoes",
    workingTitle: "Best non-toxic shoes — leather alternatives, glue audit",
    hub: "non-toxic-clothing-and-textiles",
    category: "footwear",
    status: "researching",
    startedAt: "2026-04-22",
    reviewerRole: "research",
  },
];

/**
 * Counts derived live at build/render time. Imported by `PipelineBadge`
 * and `/pipeline` so the masthead chip and the public log can never drift
 * apart.
 */
export function pipelineCounts(): {
  testing: number;
  drafted: number;
  researching: number;
  total: number;
} {
  let testing = 0;
  let drafted = 0;
  let researching = 0;
  for (const e of pipeline) {
    if (e.status === "testing") testing += 1;
    else if (e.status === "drafted") drafted += 1;
    else if (e.status === "researching") researching += 1;
  }
  return {
    testing,
    drafted,
    researching,
    total: testing + drafted + researching,
  };
}

export function pipelineByStatus(status: PipelineEntryStatus): PipelineEntry[] {
  return pipeline.filter((p) => p.status === status);
}
