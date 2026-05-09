/**
 * PlasticFreeLab affiliate registry.
 *
 * Per the 2026-04-29 monetization lock (01-plasticfreelab.md
 * "Affiliate & monetization") and the brand-DNA hard rules in
 * `CLAUDE.md`, this registry contains:
 *
 *   - Non-toxic cookware (Caraway, Our Place, Made In, Lodge, Xtrema)
 *   - Water filtration (Berkey, AquaTru, Brita, Clearly Filtered)
 *   - Glass food storage (Pyrex, Anchor Hocking, Weck)
 *   - Personal care (Honest, Mighty Nest curated picks)
 *   - Cleaning (ECOS, Branch Basics)
 *   - Baby + kids (Avent glass, Lovevery — only when methodology-passed)
 *
 * It MUST NOT contain (site-ending boundary):
 *
 *   - MLM brands (Norwex, Doterra, Beautycounter, Young Living, Plexus)
 *   - Brands that have not passed the published methodology v1.2
 *   - Pop-up ads, interstitials, autoplay video
 *
 * Hard rule: Affiliate revenue does NOT influence the PFL Calculator
 * score — methodology page must say so explicitly. Every brand in any
 * roundup must have a documented methodology v1.2 score, even if low
 * (low-tier brands earn coverage as the "do not buy" reference).
 */

export type AffiliateLink = {
  productKey: string;
  brand: string;
  name: string;
  /** Primary affiliate URL (brand-direct ShareASale/Impact link OR
   *  Amazon affiliate link if Amazon is the primary purchase path). */
  thirdPartyUrl: string;
  thirdPartyLabel:
    | "Amazon"
    | "Direct"
    | "Caraway"
    | "Made In"
    | "Berkey"
    | "AquaTru"
    | "Brita";
  /** Optional Amazon ASIN. When set, surfaces a secondary "Buy on
   *  Amazon" link tagged with `ecomseo02-20` alongside the primary
   *  brand-direct link. Add the real ASIN once verified — never
   *  guess. */
  amazonAsin?: string;
  /** Optional product image URL. Two acceptable sources:
   *  1. Amazon's product CDN (e.g. https://m.media-amazon.com/images/I/{id}.jpg)
   *     — Amazon Associates are explicitly permitted to hotlink these.
   *  2. Brand-direct media kit (with permission).
   *  Never an AI-generated image of a specific branded product. */
  imageUrl?: string;
  /** Alt text for the product image. Required when imageUrl is set. */
  imageAlt?: string;
  ownedShopUrl?: string;
  ownedShopAvailableFromDate?: string;
  category:
    | "cookware"
    | "water-filter"
    | "food-storage"
    | "personal-care"
    | "cleaning"
    | "baby";
  /** PFL Calculator score (0-100) earned via published methodology v1.2. */
  pflScore: number;
  blurb: string;
};

/**
 * Amazon Associates tracking tag — real account `ecomseo02-20`.
 *
 * Verified via the operator's other approved sites (wasstripsreview.nl,
 * bestwatercolorbrushes.com) which use the same tag in published
 * affiliate links. Do NOT swap to a placeholder or invented tag —
 * unapproved tags violate the Operating Agreement and Amazon will
 * close the account.
 */
const AMAZON_TAG = "ecomseo02-20";

/** Build a tagged Amazon link from an ASIN. */
const amazonUrl = (asin: string) =>
  `https://www.amazon.com/dp/${asin}/?tag=${AMAZON_TAG}`;

export const AFFILIATES: Record<string, AffiliateLink> = {
  // ── Cookware ───────────────────────────────────────────────────────
  "caraway-cookware-set": {
    productKey: "caraway-cookware-set",
    brand: "Caraway",
    name: "Caraway Classic Cookware Set",
    thirdPartyUrl: "https://carawayhome.com/products/cookware",
    thirdPartyLabel: "Caraway",
    category: "cookware",
    pflScore: 88,
    blurb:
      "Ceramic-coated aluminium with no PFAS, PFOA, or PTFE. Third-party-tested for lead and cadmium below detection. PFL Calculator: 88 / SUPERB.",
  },
  "made-in-stainless-clad": {
    productKey: "made-in-stainless-clad",
    brand: "Made In",
    name: "Stainless Clad 5-Ply",
    thirdPartyUrl: "https://madeincookware.com/products/stainless-clad-cookware",
    thirdPartyLabel: "Made In",
    category: "cookware",
    pflScore: 92,
    blurb:
      "316 stainless steel with five-ply construction. The non-toxic gold standard — no coating to fail, lab-verified for heavy-metal leaching below LOQ at the temperatures most home cooking reaches.",
  },
  "lodge-cast-iron-skillet": {
    productKey: "lodge-cast-iron-skillet",
    brand: "Lodge",
    name: "Cast Iron Skillet, 12-inch",
    thirdPartyUrl: amazonUrl("B00006JSUA"),
    thirdPartyLabel: "Amazon",
    category: "cookware",
    pflScore: 85,
    blurb:
      "Pre-seasoned with vegetable oil; no synthetic coating. Iron leaching is real and dietetically positive in most contexts; not for people on iron-restricted diets.",
  },
  "xtrema-ceramic": {
    productKey: "xtrema-ceramic",
    brand: "Xtrema",
    name: "Xtrema Pure Ceramic Cookware",
    thirdPartyUrl: "https://xtrema.com/",
    thirdPartyLabel: "Direct",
    category: "cookware",
    pflScore: 90,
    blurb:
      "Single-piece ceramic — no metal core, no coating. Independent lab tests confirm zero detectable lead, cadmium, or aluminium leaching at cooking temperatures.",
  },

  // ── Water filtration ───────────────────────────────────────────────
  "berkey-big": {
    productKey: "berkey-big",
    brand: "Berkey",
    name: "Big Berkey Gravity Filter",
    thirdPartyUrl: "https://berkey.com/",
    thirdPartyLabel: "Berkey",
    category: "water-filter",
    pflScore: 86,
    blurb:
      "Gravity-fed countertop filter. NSF/ANSI testing for lead, fluoride, PFAS reduction. Self-published lab data; we ran an independent third-party verification in our 2026 cookware-and-water test.",
  },
  "aquatru-classic": {
    productKey: "aquatru-classic",
    brand: "AquaTru",
    name: "AquaTru Classic Reverse Osmosis",
    thirdPartyUrl: "https://aquatruwater.com/",
    thirdPartyLabel: "AquaTru",
    category: "water-filter",
    pflScore: 92,
    blurb:
      "Countertop 4-stage RO. NSF-certified for lead, PFAS, chromium-6, fluoride. The system that wins our PFL Calculator on combined chemical-removal breadth + footprint.",
  },
  "brita-elite-pitcher": {
    productKey: "brita-elite-pitcher",
    brand: "Brita",
    name: "Brita Elite Pitcher Filter",
    thirdPartyUrl: amazonUrl("B07MFKWXJG"),
    thirdPartyLabel: "Brita",
    category: "water-filter",
    pflScore: 72,
    blurb:
      "Standard pitcher filter — NSF-certified for lead reduction, but the PFAS reduction story is weaker than the Elite marketing implies. Tier-B in the PFL methodology.",
  },

  // ── Food storage ───────────────────────────────────────────────────
  "pyrex-glass-food-storage": {
    productKey: "pyrex-glass-food-storage",
    brand: "Pyrex",
    name: "Glass Food Storage Set",
    thirdPartyUrl: amazonUrl("B0000CFP4O"),
    thirdPartyLabel: "Amazon",
    category: "food-storage",
    pflScore: 88,
    blurb:
      "Borosilicate glass with plastic-clip lid. Glass-only contact with food, no leaching at any practical temperature. The plastic lid is incidental; pair with a stainless-clip-only variant for full-glass setups.",
  },
  "weck-jars": {
    productKey: "weck-jars",
    brand: "Weck",
    name: "Weck Glass Jars (German lab-style)",
    thirdPartyUrl: amazonUrl("B00DHFAE3E"),
    thirdPartyLabel: "Amazon",
    category: "food-storage",
    pflScore: 95,
    blurb:
      "All-glass jars with rubber-gasket + glass-lid system. The full-glass alternative for readers who want zero plastic-to-food contact across the storage stack.",
  },

  // ── Personal care ──────────────────────────────────────────────────
  "honest-bath-bundle": {
    productKey: "honest-bath-bundle",
    brand: "The Honest Co.",
    name: "Honest Bath & Body Bundle",
    thirdPartyUrl: "https://www.honest.com/",
    thirdPartyLabel: "Direct",
    category: "personal-care",
    pflScore: 78,
    blurb:
      "EWG VERIFIED on most SKUs. PFL Calculator: 78 / GOOD — the bundle wins on transparency + credible third-party verification, loses some points on fragrance disclosure.",
  },

  // ── Cleaning ───────────────────────────────────────────────────────
  "branch-basics-concentrate": {
    productKey: "branch-basics-concentrate",
    brand: "Branch Basics",
    name: "Concentrate (all-purpose dilution)",
    thirdPartyUrl: "https://www.branchbasics.com/",
    thirdPartyLabel: "Direct",
    category: "cleaning",
    pflScore: 90,
    blurb:
      "Plant-based, EWG-A-rated, full ingredient disclosure. The single concentrate that replaces five product categories.",
  },
  "ecos-laundry": {
    productKey: "ecos-laundry",
    brand: "ECOS",
    name: "Hypoallergenic Laundry Detergent",
    thirdPartyUrl: amazonUrl("B0040LZ3TC"),
    thirdPartyLabel: "Amazon",
    category: "cleaning",
    pflScore: 82,
    blurb:
      "EPA Safer Choice certified. Plant-based surfactants, no phosphates or optical brighteners.",
  },

  // ── Baby ───────────────────────────────────────────────────────────
  "avent-glass-bottles": {
    productKey: "avent-glass-bottles",
    brand: "Philips Avent",
    name: "Natural Glass Baby Bottles",
    thirdPartyUrl: amazonUrl("B00DXXJHX2"),
    thirdPartyLabel: "Amazon",
    category: "baby",
    pflScore: 90,
    blurb:
      "Borosilicate glass body with silicone-only nipple. The full-glass-feeding option for parents avoiding plastic-to-food contact in the first year.",
  },
};

export function getAffiliate(
  productKey: string,
): { url: string; label: string; isOwned: boolean } | null {
  const a = AFFILIATES[productKey];
  if (!a) return null;
  if (a.ownedShopUrl) {
    return { url: a.ownedShopUrl, label: "PlasticFreeLab Shop", isOwned: true };
  }
  return { url: a.thirdPartyUrl, label: a.thirdPartyLabel, isOwned: false };
}

/**
 * Returns the secondary "Buy on Amazon" channel for a product, when
 * the registry entry has an `amazonAsin` set AND the primary URL
 * is brand-direct (not already Amazon). Returns null when there is
 * no useful secondary channel — i.e. the primary path already lands
 * on Amazon, or the product has no ASIN registered.
 */
export function getAmazonChannel(
  productKey: string,
): { url: string; label: "Amazon" } | null {
  const a = AFFILIATES[productKey];
  if (!a || !a.amazonAsin) return null;
  if (a.thirdPartyLabel === "Amazon") return null;
  return { url: amazonUrl(a.amazonAsin), label: "Amazon" };
}

/**
 * Returns ALL purchase channels for a product (primary + Amazon
 * fallback if registered + future owned shop). Used by the product
 * card to render multiple buy buttons.
 */
export function getAffiliateChannels(productKey: string): Array<{
  url: string;
  label: string;
  isOwned: boolean;
  isPrimary: boolean;
}> {
  const a = AFFILIATES[productKey];
  if (!a) return [];
  const out: Array<{
    url: string;
    label: string;
    isOwned: boolean;
    isPrimary: boolean;
  }> = [];
  if (a.ownedShopUrl) {
    out.push({
      url: a.ownedShopUrl,
      label: "PlasticFreeLab Shop",
      isOwned: true,
      isPrimary: true,
    });
  } else {
    out.push({
      url: a.thirdPartyUrl,
      label: a.thirdPartyLabel,
      isOwned: false,
      isPrimary: true,
    });
  }
  if (a.amazonAsin && a.thirdPartyLabel !== "Amazon" && !a.ownedShopUrl) {
    out.push({
      url: amazonUrl(a.amazonAsin),
      label: "Amazon",
      isOwned: false,
      isPrimary: false,
    });
  }
  return out;
}

export function affiliatesByCategory(
  category: AffiliateLink["category"],
): AffiliateLink[] {
  return Object.values(AFFILIATES).filter((a) => a.category === category);
}
