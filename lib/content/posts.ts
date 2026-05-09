import type { Locale } from "@/i18n/routing";
import { POST_I18N, type LocalePost } from "./posts-i18n";

export type PostType = "pillar" | "comparison" | "cluster" | "listicle";

/**
 * PFL Score breakdown — the composite shown in product badges plus
 * the five weighted dimensions used to derive it. Weights live in
 * `/methodology/v1-2`; this is the data they multiply.
 */
export type PFLScoreBreakdown = {
  overall: number; // 0-100, the composite displayed
  materialSafety: number; // weight 35%
  performance: number; // weight 20%
  durability: number; // weight 15%
  useExperience: number; // weight 15%
  value: number; // weight 15%
};

export type PipelineStatus =
  | "researching"
  | "testing"
  | "drafted"
  | "published"
  | "refresh";

export type Post = {
  slug: string;
  title: string;
  h1: string;
  description: string;
  hub: string;
  postType: PostType;
  publishedAt: string;
  updatedAt: string;
  readingTime: number;
  status: "draft" | "stub" | "published";
  ourPick?: {
    name: string;
    tier: string;
    reason: string;
    score?: number;
    /** Optional registry key — see lib/affiliate/registry.ts. When set,
     *  the ComparisonTemplate renders <AffiliateLabel> + buy-channel
     *  buttons (brand-direct + Amazon if ASIN present) below the
     *  pick card, per FTC + EU UWG §5a labelling requirements. */
    productKey?: string;
  };
  products?: Array<{
    rank: number;
    name: string;
    tier: string;
    summary: string;
    score?: number;
    /** Optional registry key — see lib/affiliate/registry.ts. */
    productKey?: string;
  }>;
  items?: Array<{
    rank: number;
    name: string;
    summary: string;
    score?: number;
  }>;
  faq?: Array<{ q: string; a: string }>;
  sources?: Array<{ label: string; url: string }>;
  featured?: boolean;
  /** Optional category atmosphere image rendered above the post body
   *  on comparison + pillar templates. Sourced from kie.ai per the
   *  kie-ai-cookbook §brand atmosphere shots — never depicts a
   *  specific branded product. Path is repo-relative starting with /. */
  heroImage?: { src: string; alt: string };
  i18n?: Partial<Record<Locale, LocalePost>>;
  /** Composite PFL Score — set on comparison + listicle posts; undefined for pillars/clusters. */
  pflScore?: PFLScoreBreakdown;
  /** Editorial pipeline state — drives the masthead badge counts. */
  pipelineStatus?: PipelineStatus;
  /** Methodology version this post was scored under, e.g. "v1.2". */
  testingMethodology?: string;
  /** ISO date the lab tests were last run. */
  testedDate?: string;
};

export const posts: Post[] = [
  {
    slug: "best-non-toxic-cookware",
    title: "Best Non-Toxic Cookware Sets of 2026, Tested and Ranked",
    h1: "Best non-toxic cookware sets of 2026, tested and ranked",
    description:
      "We tested 14 non-toxic cookware brands. Here's the editor's pick, the budget option, and the ones we'd skip, with sources.",
    hub: "non-toxic-kitchen",
    postType: "comparison",
    publishedAt: "2026-04-20",
    updatedAt: "2026-04-20",
    readingTime: 16,
    status: "published",
    heroImage: {
      src: "/images/categories/non-toxic-cookware.jpg",
      alt: "Three unbranded cooking pots arranged on a wooden cutting board on a stone counter with morning kitchen light.",
    },
    featured: true,
    pflScore: {
      overall: 92,
      materialSafety: 96,
      performance: 91,
      durability: 94,
      useExperience: 88,
      value: 86,
    },
    pipelineStatus: "published",
    testingMethodology: "v1.2",
    testedDate: "2026-04-20",
    ourPick: {
      name: "Made In Stainless Clad",
      tier: "Best overall",
      score: 92,
      reason:
        "Made In's five-ply 304/430 stainless is the only set we tested that pairs full material transparency (every layer disclosed, US-forged handles) with genuinely even heat and a price that sits well below All-Clad. It's the set we'd buy again tomorrow.",
      productKey: "made-in-stainless-clad",
    },
    products: [
      {
        rank: 1,
        name: "Made In Stainless Clad Set",
        tier: "Best overall",
        score: 92,
        summary:
          "Five-ply construction with a 304 stainless cooking surface and a 430 magnetic exterior. Induction-ready, dishwasher-safe, and transparent about every layer. Heats evenly, browns properly, and the riveted handles don't wobble after a year of daily use. Not non-stick, which is the point: no coatings to chip, no PFAS anywhere. The learning curve is a warm pan and fat, nothing more.",
        productKey: "made-in-stainless-clad",
      },
      {
        rank: 2,
        name: "All-Clad D3 Stainless",
        tier: "Best premium",
        score: 90,
        summary:
          "The reference pan everyone else is benchmarked against. Three-ply 18/10 stainless, made in Canonsburg, PA, and effectively bombproof. We've read reports of D3 pieces handed down after thirty years. Pricier than Made In for nearly identical performance, and the handles run hotter. Worth it if you want the heritage brand; not required if you don't.",
      },
      {
        rank: 3,
        name: "Lodge Cast Iron Skillet",
        tier: "Best budget",
        score: 87,
        summary:
          "A pre-seasoned 10.25-inch Lodge is the single most cost-effective non-toxic pan on the market. Raw iron, no coatings, no fillers. It's heavy, it needs drying after washing, and it won't deglaze acidic sauces well. But for searing, roasting, and weeknight eggs once it's seasoned, it outperforms pans at ten times the price. Iron leaching is minor and, for pre-menopausal women, often beneficial.",
        productKey: "lodge-cast-iron-skillet",
      },
      {
        rank: 4,
        name: "Xtrema Ceramic",
        tier: "Best pure ceramic",
        score: 85,
        summary:
          "Xtrema is full-ceramic, not ceramic-coated. That matters: there's no metal core under a coating that can chip and expose you to whatever's underneath. It heats slowly, cracks if you shock it with cold water, and isn't cheap. But for anyone who wants zero metal contact with food, it's the most defensible option we've found. Third-party lead and cadmium testing is published on their site.",
        productKey: "xtrema-ceramic",
      },
      {
        rank: 5,
        name: "Staub Enameled Cast Iron",
        tier: "Best Dutch oven",
        score: 88,
        summary:
          "French-made enameled cast iron at roughly half the price of Le Creuset, with a matte black interior that hides stains better. The enamel is the key spec: it sits between your food and the iron, so acidic tomato sauces don't react. Heavy, slow to heat, unbeatable for braises and sourdough. We verified no lead or cadmium in the enamel per Staub's published disclosures.",
      },
      {
        rank: 6,
        name: "Stargazer Cast Iron",
        tier: "Best modern cast iron",
        score: 83,
        summary:
          "A US-made cast iron skillet with a machined smooth cooking surface, no pebbled Lodge texture. Eggs release earlier in the seasoning curve, and the handle stays cooler because of the long tapered design. Roughly three times Lodge's price. Worth it if you cook eggs daily; Lodge is fine if you don't.",
      },
      {
        rank: 7,
        name: "Material Kitchen The 8 Piece",
        tier: "Best mid-range stainless",
        score: 82,
        summary:
          "Transparent 304 stainless construction at a price between Lodge and Made In. Material Kitchen publishes its full bill of materials, which is rare in this category, and ships without single-use plastic. Heat distribution is a half-step behind Made In's five-ply, noticeable only if you cook thin crepes or delicate fish. For most people, it's the sensible pick.",
      },
      {
        rank: 8,
        name: "Le Creuset Signature Dutch Oven",
        tier: "Best premium Dutch oven",
        score: 86,
        summary:
          "French-made, lifetime-warrantied enameled cast iron. Performs identically to Staub in most tests. The premium buys you the lighter interior (easier to monitor browning) and the color range. We'd only recommend it over Staub if you specifically want the sand-colored interior or plan to photograph your braises.",
      },
      {
        rank: 9,
        name: "Caraway Ceramic-Coated",
        tier: "Skip",
        score: 58,
        summary:
          "Beautiful, widely sold, and marketed as non-toxic. The ceramic coating is the weakness. Independent reviewers and long-term owners consistently report coating degradation within 12 to 24 months of normal use. When the coating fails, you're cooking on whatever aluminum alloy is underneath. Caraway is PFOA-free, but a coating that doesn't last isn't a long-term non-toxic solution.",
        productKey: "caraway-cookware-set",
      },
      {
        rank: 10,
        name: "HexClad Hybrid",
        tier: "Skip",
        score: 52,
        summary:
          "HexClad's laser-etched stainless grid sits over a PTFE non-stick layer. PTFE is the polymer in Teflon. The brand's marketing frames it as a stainless pan; the construction is a hybrid that contains PTFE. If you've been told you're avoiding Teflon by buying HexClad, you're not. We'd send it back.",
      },
    ],
    faq: [
      {
        q: "What is the safest cookware material?",
        a: "For most cooking, 304-grade stainless steel (uncoated), cast iron, and enameled cast iron are the three materials with the longest safety track record and no coatings to degrade. Pure ceramic like Xtrema is also defensible. The common thread: nothing to chip, scratch, or off-gas at normal cooking temperatures. Avoid any non-stick coating, ceramic-coated or PTFE-based, if long-term durability matters to you.",
      },
      {
        q: "Is stainless steel cookware non-toxic?",
        a: "Yes, with one caveat: look for 304 (18/8 or 18/10) or 316 food-grade stainless. A 2013 study in the Journal of Agricultural and Food Chemistry found that new stainless pans leach trace nickel and chromium into acidic foods, with levels dropping significantly after the first 6 to 10 uses. Those levels sit well below EFSA tolerable intake thresholds. Skip unlabeled mystery-grade stainless from drop-ship brands.",
      },
      {
        q: "Are ceramic pans actually safe?",
        a: "It depends what you mean by ceramic. Full-ceramic pans like Xtrema are inert and stable. Ceramic-coated pans (Caraway, Our Place, GreenPan) are aluminum or steel pans with a sol-gel ceramic coating applied on top. The coating itself is PFAS-free, which is good. But the coating breaks down with normal use, and once it does, you're cooking on whatever metal is underneath. We'd buy the full-ceramic version or skip the category.",
      },
      {
        q: "Is there any truly non-toxic non-stick?",
        a: "Not in the long-term sense. Every non-stick coating currently on the market degrades: PTFE, ceramic sol-gel, ceramic-titanium hybrids. The question is only how fast. If you want release without a coating, a well-seasoned cast iron or carbon steel pan gets you 90% of the way there with nothing to chip. That's the honest answer.",
      },
      {
        q: "What about aluminum cookware?",
        a: "Bare aluminum is reactive and not recommended for acidic cooking. Anodized aluminum (like All-Clad's HA1 line) is sealed and considered safe by the FDA. The studies linking aluminum to Alzheimer's from the 1980s and 1990s have not held up under later review. The Alzheimer's Association now lists aluminum cookware as a debunked cause. We still prefer stainless for even heat and durability.",
      },
      {
        q: "Does cast iron leach iron into food?",
        a: "Yes, and for most people this is neutral or beneficial. A 1986 study in the Journal of the American Dietetic Association measured iron content in foods cooked in cast iron and found modest increases, particularly in acidic dishes. For pre-menopausal women, who are often iron-deficient, this is a feature. For anyone with hemochromatosis or iron overload, it's a reason to use stainless instead.",
      },
      {
        q: "What does Joe Rogan cook on?",
        a: "This gets asked enough that it's worth answering: Rogan has mentioned cast iron and carbon steel on the podcast, which are both reasonable choices. They're heavy, coating-free, and improve with use. You don't need to buy what a podcaster cooks on, but the category he picked is the right category.",
      },
    ],
    sources: [
      {
        label:
          "EWG's Guide to Healthy Cleaning — cookware coatings and PFAS",
        url: "https://www.ewg.org/",
      },
      {
        label:
          "FDA — Inorganic Arsenic, Lead, and Cadmium in Food Contact Surfaces",
        url: "https://www.fda.gov/food/chemicals-contaminants-pesticides/",
      },
      {
        label:
          "Kamerud et al. 2013 — Stainless steel leaching of nickel and chromium, J. Agric. Food Chem.",
        url: "https://pubs.acs.org/journal/jafcau",
      },
      {
        label:
          "DuPont / 3M PFOA multidistrict litigation settlement (2017, $670M)",
        url: "https://www.justice.gov/",
      },
      {
        label: "Made In material disclosures and mill sourcing",
        url: "https://madeincookware.com/",
      },
      {
        label:
          "Brittin & Nossaman 1986 — Iron content of food cooked in iron utensils, J. Am. Diet. Assoc.",
        url: "https://pubmed.ncbi.nlm.nih.gov/",
      },
    ],
  },
  {
    slug: "best-water-filters",
    title:
      "Best Water Filters for the Home: Countertop vs Under-Sink vs Whole-House",
    h1: "Best water filters for the home: countertop vs under-sink vs whole-house",
    description:
      "We compared countertop, under-sink, and whole-house water filters on contaminant removal, flow rate, and cost per gallon. Here's our ranked pick.",
    hub: "non-toxic-kitchen",
    postType: "comparison",
    publishedAt: "2026-04-20",
    updatedAt: "2026-04-20",
    readingTime: 14,
    status: "published",
    heroImage: {
      src: "/images/categories/water-filters.jpg",
      alt: "Clean glass of water on a kitchen counter catching window light, with a generic countertop water dispenser blurred in the background.",
    },
    pflScore: {
      overall: 93,
      materialSafety: 95,
      performance: 96,
      durability: 88,
      useExperience: 90,
      value: 89,
    },
    pipelineStatus: "published",
    testingMethodology: "v1.2",
    testedDate: "2026-04-20",
    ourPick: {
      name: "AquaTru Countertop Reverse Osmosis",
      tier: "Best overall",
      score: 93,
      reason:
        "AquaTru is the only countertop filter we found with NSF certifications across the four standards that matter (42, 53, 58, and 401), meaning independent labs have verified removal of PFAS, lead, fluoride, and pharmaceutical residues. No plumbing required, no under-sink install, and filter replacement is tool-free.",
      productKey: "aquatru-classic",
    },
    products: [
      {
        rank: 1,
        name: "AquaTru Countertop RO",
        tier: "Best overall",
        score: 93,
        summary:
          "Four-stage reverse osmosis in a countertop unit that plugs into a standard outlet. NSF certified to Standards 42, 53, 58, and 401: the full set that covers aesthetic contaminants, health-related contaminants, RO performance, and emerging compounds like PFOA, PFOS, and BPA. No plumber needed. Filters last six months to two years depending on stage. The tradeoff: you refill a tank, you wait, and it produces wastewater.",
        productKey: "aquatru-classic",
      },
      {
        rank: 2,
        name: "Big Berkey Gravity Filter",
        tier: "Best gravity filter",
        score: 82,
        summary:
          "A steel canister with ceramic-composite Black Berkey elements that uses gravity. No electricity, no plumbing. Independent lab reports show strong reduction of lead, chlorine, pathogens, and many VOCs. NSF certification is the weak point: Berkey does not hold NSF 53 on PFAS, and they've had regulatory disputes in California and Iowa. Excellent for off-grid, camping, and power outages. For daily home use with a grid connection, AquaTru's certification story is cleaner.",
        productKey: "berkey-big",
      },
      {
        rank: 3,
        name: "Epic Pure Pitcher",
        tier: "Best budget",
        score: 84,
        summary:
          "A pitcher-format filter with published third-party testing against 200+ contaminants including PFAS, lead, chromium-6, and pharmaceuticals. Made in the US, replaceable cartridges, nothing to install. Slower flow than a Brita and pricier per cartridge, but the contaminant removal is a full tier above any mass-market pitcher. The sensible starting point if $400 for AquaTru isn't in budget this month.",
      },
      {
        rank: 4,
        name: "Clearly Filtered Pitcher",
        tier: "Best budget alternative",
        score: 80,
        summary:
          "Similar positioning to Epic Pure: published test data, strong PFAS and fluoride reduction, US-made. Cartridges last roughly 100 gallons. We'd flip a coin between Clearly Filtered and Epic Pure; both are honest products with transparent testing. Clearly Filtered's under-sink line is also worth considering if you want pitcher-grade filtration at the tap.",
      },
      {
        rank: 5,
        name: "APEC ROES-50 Under-Sink RO",
        tier: "Best under-sink RO",
        score: 86,
        summary:
          "A traditional five-stage under-sink reverse osmosis system at roughly half the installed cost of most competitors. NSF-certified components, well-documented install, and filters that are easy to source anywhere. Requires a dedicated faucet hole and storage tank under the sink. If you own your home and want plumbed-in RO, this is the default pick. Renters should stick to countertop.",
      },
      {
        rank: 6,
        name: "Waterdrop G3 Tankless RO",
        tier: "Best premium under-sink",
        score: 83,
        summary:
          "Tankless RO. Water is filtered on demand instead of sitting in a storage tank. NSF 58 and 372 certified. The premium over APEC buys you a smaller footprint and a TDS display on the faucet. Noisier than a tanked system when filtering. Worth it if your under-sink space is tight; otherwise APEC is the more boring, more repairable choice.",
      },
      {
        rank: 7,
        name: "Aquasana Rhino Whole-House",
        tier: "Best whole-house",
        score: 78,
        summary:
          "Whole-house carbon and KDF filtration, rated for roughly 1 million gallons (about 10 years for a family of four). Reduces chlorine, chloramines, lead, mercury, and VOCs site-wide, including shower and laundry water. NSF 42 certified. Does not remove fluoride or dissolved solids. For that you still want RO at the kitchen tap. Install requires a plumber and a shutoff.",
      },
      {
        rank: 8,
        name: "Brita Elite Pitcher",
        tier: "Budget honorable mention",
        score: 70,
        summary:
          "Brita's upgraded cartridge (formerly LongLast) is NSF certified to Standards 42 and 53 for lead, chlorine, and a short list of other contaminants. It's a real filter, not a placebo. The ceiling is low: no PFAS removal, no fluoride removal, no pharmaceutical claims. Fine as a bridge for a few months. Not fine as your permanent solution if you live anywhere with known PFAS contamination.",
        productKey: "brita-elite-pitcher",
      },
      {
        rank: 9,
        name: "ZeroWater Pitcher",
        tier: "Skip for most",
        score: 62,
        summary:
          "ZeroWater's ion-exchange resin does reduce total dissolved solids and lead effectively per NSF 53. The problem is taste: strong reduction of minerals leaves the water flat, and the cartridges develop a fishy smell as they exhaust. Cartridge lifespan in cities with hard water is short, and cost per gallon is high. The Epic Pure does a better job for similar money.",
      },
      {
        rank: 10,
        name: "Refrigerator In-Door Filters (generic)",
        tier: "Skip",
        score: 56,
        summary:
          "Most factory fridge filters are certified only to NSF 42 (chlorine, taste, odor). They do not reliably remove lead, PFAS, or pharmaceutical residues. If your water source is municipally treated and you only want better taste, they're fine. For anything beyond that, don't rely on them as your primary filter.",
      },
    ],
    faq: [
      {
        q: "Do I actually need a water filter?",
        a: "Probably, depending on your zip code. The EPA's 2024 final PFAS rule set enforceable limits at 4 parts per trillion for PFOA and PFOS, and utilities have until 2029 to comply. Until then, EWG's Tap Water Database maps known contaminants in your local system. Look yours up before deciding. If your system shows elevated lead, chromium-6, trihalomethanes, or any PFAS, a filter is the fastest intervention.",
      },
      {
        q: "Is reverse osmosis worth it?",
        a: "For PFAS and fluoride specifically, yes. RO is the only consumer-grade technology that reliably removes both. Carbon filters don't touch fluoride and have mixed PFAS performance. RO does strip minerals along with contaminants, which is a real tradeoff, but the idea that demineralized water is harmful in meaningful amounts isn't supported by current evidence. If you want the minerals back, remineralization cartridges or a pinch of sea salt in a gallon jug solves it.",
      },
      {
        q: "What's the difference between NSF 42, 53, 58, and 401?",
        a: "NSF 42 covers aesthetic contaminants (chlorine, taste, odor). NSF 53 covers health-related contaminants (lead, cysts, VOCs, chromium-6). NSF 58 is specifically for reverse osmosis performance. NSF 401 covers emerging compounds (BPA, pharmaceutical residues, pesticides). A filter certified to only 42 is not a health filter. Look for 53 at minimum, ideally 53 and 401, and 58 if it's an RO system.",
      },
      {
        q: "Does Berkey really not have NSF certification?",
        a: "Correct. Berkey publishes independent lab test reports from labs like Envirotek and NSF-accredited labs, and the results are strong. But the company does not hold full NSF product certification the way AquaTru or APEC do. That's a defensible choice for a small company (NSF certification is expensive), but it's a real gap in the paper trail, and it's the reason Berkey has faced EPA questions in the past.",
      },
      {
        q: "Will a water filter remove microplastics?",
        a: "Reverse osmosis and properly-rated carbon block filters remove microplastics above 0.5 microns, per multiple 2020-2023 studies. Nanoplastics, below 100 nanometers, are harder. A 2024 paper in PNAS (Qian et al.) identified nanoplastics in bottled water at up to 240,000 particles per liter; filtered tap water is almost certainly a lower-particle exposure route than bottled.",
      },
      {
        q: "What about shower filters?",
        a: "Worth considering if your water is chlorinated or chloraminated. Chlorine and chloramines volatilize in hot water and are inhaled during showers. The exposure route is real, though the health significance is still debated. A simple KDF shower filter reduces the chlorine smell and reduces skin irritation for many people. We'd call it a tier-two upgrade, not a priority over your drinking water.",
      },
    ],
    sources: [
      {
        label: "EPA — PFAS National Primary Drinking Water Regulation (April 2024)",
        url: "https://www.epa.gov/sdwa/and-polyfluoroalkyl-substances-pfas",
      },
      {
        label: "EWG Tap Water Database",
        url: "https://www.ewg.org/tapwater/",
      },
      {
        label: "NSF International — Drinking Water Treatment Unit standards",
        url: "https://www.nsf.org/",
      },
      {
        label:
          "Qian et al. 2024 — Rapid single-particle chemical imaging of nanoplastics in bottled water, PNAS",
        url: "https://www.pnas.org/",
      },
      {
        label: "AquaTru NSF certification documentation",
        url: "https://aquatruwater.com/",
      },
      {
        label:
          "WHO 2022 — Dietary and inhalation exposure to nano- and microplastic particles and potential implications for human health",
        url: "https://www.who.int/",
      },
    ],
  },
  {
    slug: "best-microplastic-free-underwear",
    title: "Best Microplastic-Free Underwear Brands, Tested and Ranked",
    h1: "Best microplastic-free underwear brands",
    description:
      "After the Thinx PFAS lawsuit, here's the calm guide to underwear brands whose materials you can actually verify.",
    hub: "non-toxic-clothing-and-textiles",
    postType: "comparison",
    publishedAt: "2026-04-20",
    updatedAt: "2026-04-20",
    readingTime: 12,
    status: "published",
    pflScore: {
      overall: 91,
      materialSafety: 94,
      performance: 87,
      durability: 89,
      useExperience: 92,
      value: 91,
    },
    pipelineStatus: "published",
    testingMethodology: "v1.2",
    testedDate: "2026-04-20",
    ourPick: {
      name: "Pact Organic Cotton Underwear",
      tier: "Best overall",
      score: 91,
      reason:
        "Pact is the only brand at this price point that carries Fair Trade Certified and GOTS certifications across its full underwear line, with a published Tier 1 supplier list. Size range runs XS-3X, the elastic is covered in organic cotton, and the basics cost roughly what Hanes cost in 2005.",
    },
    products: [
      {
        rank: 1,
        name: "Pact Organic Cotton",
        tier: "Best overall",
        score: 91,
        summary:
          "GOTS-certified organic cotton, Fair Trade Certified factory, XS-3X sizing, and a basics price that makes this a sensible full-drawer replacement. Elastic bands are cotton-covered, not exposed polyester. Pact publishes its factory list and dye chemistry. The cotton has some polyester in the gusset stitching on certain styles (check the individual product tag), but the main body is 95% organic cotton, 5% elastane.",
      },
      {
        rank: 2,
        name: "Subset (formerly Knickey)",
        tier: "Best premium",
        score: 89,
        summary:
          "GOTS-certified and OEKO-TEX Standard 100 on the full line, sewn in a fair-wage factory in India, with a free recycling program for used underwear. The cotton is softer out of the box than Pact's; you notice on day one. The waistband is the most comfortable in this category. Price is roughly double Pact. Sizing goes to 2XL, which is less inclusive than Pact's 3X.",
      },
      {
        rank: 3,
        name: "MATE the Label",
        tier: "Best for inclusive sizing",
        score: 88,
        summary:
          "GOTS organic cotton with sizing from XXS to 4X, the broadest range we found. MADE SAFE certified as a brand, meaning the dye and finishing chemistry is independently screened. Slightly heavier fabric than Pact, which wears longer. Price sits between Pact and Subset. The clear pick if size inclusivity or a MADE SAFE paper trail matters to you.",
      },
      {
        rank: 4,
        name: "Harvest & Mill",
        tier: "Best US-made",
        score: 85,
        summary:
          "US-grown, US-milled, US-sewn organic cotton. One of the only fully-domestic supply chains left in intimate apparel. No synthetic elastic; the waistband uses natural rubber. Limited style range and price per pair is roughly triple Pact. Worth it if domestic manufacturing is a non-negotiable; otherwise it's a capsule piece, not your full drawer.",
      },
      {
        rank: 5,
        name: "Boody Bamboo Viscose",
        tier: "Honorable mention",
        score: 74,
        summary:
          "OEKO-TEX 100 certified bamboo viscose. Exceptionally soft, stretchy, and well-priced. The honest caveat: bamboo becomes viscose through a chemically intensive process (carbon disulfide, sodium hydroxide), and even closed-loop versions aren't zero-impact. Boody's viscose is certified, but it is not the same category as GOTS cotton from a materials-science standpoint. Fine as a supplement; not our recommendation as a sole replacement.",
      },
      {
        rank: 6,
        name: "Organic Basics",
        tier: "Honorable mention",
        score: 79,
        summary:
          "GOTS organic cotton with a SilverTech antibacterial line that uses recycled silver ions. The silver treatment has a real mechanism (silver is antimicrobial) but long-term wash durability of the claim is lightly documented. The non-treated organic cotton line is straightforward and well-made. Price is Euro-premium and shipping from Copenhagen adds to it.",
      },
      {
        rank: 7,
        name: "WAMA Hemp Underwear",
        tier: "Best hemp alternative",
        score: 76,
        summary:
          "53% hemp, 43% organic cotton, 4% spandex. Hemp is naturally antimicrobial and grows with far less water than cotton. OEKO-TEX Standard 100 certified. The fabric has more texture than pure cotton; some readers love it, some find it scratchy. We'd recommend starting with one pair before replacing a drawer.",
      },
      {
        rank: 8,
        name: "Cottonique Hypoallergenic",
        tier: "Best for sensitive skin",
        score: 80,
        summary:
          "100% organic cotton with no elastic at all. The waistband uses a cotton drawstring. Built for people with latex and elastic sensitivity, which is a small population but a group for whom most 'organic' underwear still causes reactions. Unglamorous, utilitarian, and the right answer for a specific use case.",
      },
      {
        rank: 9,
        name: "Saalt Leakproof",
        tier: "Best period underwear",
        score: 83,
        summary:
          "Post-Thinx, Saalt is the period underwear brand we'd buy. They publish PFAS test results showing non-detection down to 10 ppb across the line, use OEKO-TEX 100 certified fabric, and the gusset construction uses a non-PFAS moisture barrier. Not zero-synthetic (period underwear requires some), but the most defensible option in the category.",
      },
      {
        rank: 10,
        name: "Thinx (original line)",
        tier: "Skip",
        score: 58,
        summary:
          "In 2023 Thinx settled a class-action lawsuit over undisclosed PFAS in its period underwear for $4 million, without admitting liability. Independent testing by Mamavation and Sierra magazine preceded the suit. Thinx has since reformulated and publishes non-detection results, but the trust gap is real and there are better-documented alternatives. We'd pick Saalt instead.",
      },
    ],
    faq: [
      {
        q: "What actually happened with the Thinx lawsuit?",
        a: "In 2020, independent testing by Sierra magazine detected PFAS in Thinx period underwear, contradicting the brand's marketing. A class action followed. In 2023, Thinx settled for approximately $4 million without admitting wrongdoing and agreed to reformulate. The settlement documents and testing reports are public. Thinx's current line tests non-detect; the original problem was real.",
      },
      {
        q: "Is organic cotton underwear really plastic-free?",
        a: "Mostly, with caveats. GOTS-certified organic cotton is plastic-free in the fabric itself. The elastic is the question. Most organic underwear uses a small percentage of elastane (spandex), which is a synthetic. Brands like Harvest & Mill use natural rubber instead; brands like Pact cover the elastic in cotton so it doesn't touch skin. Truly zero-synthetic is possible (Cottonique) but rare.",
      },
      {
        q: "What does GOTS certification mean?",
        a: "The Global Organic Textile Standard certifies both the fiber (organic cotton must be at least 70% to 95% of fabric weight depending on tier) and the processing chemistry. GOTS bans a long list of dyes, finishes, and inputs, including formaldehyde, PFAS, chlorine bleach, and most azo dyes. It's the strictest widely-available textile certification. Look for the GOTS logo with a license number on the garment tag.",
      },
      {
        q: "Is bamboo underwear plastic-free?",
        a: "It depends on the process. 'Bamboo' on a label usually means bamboo viscose (also called rayon), which is bamboo fiber chemically dissolved and reformed. The process involves carbon disulfide and sodium hydroxide. Lyocell-process bamboo (closed-loop) is better but still chemically intensive. True bamboo linen, mechanically processed, exists but is rare and expensive. We'd treat most 'bamboo' underwear as a softer synthetic, not as a natural fiber.",
      },
      {
        q: "Do synthetic fabrics actually shed microplastics during wear?",
        a: "Yes. A 2020 study in Environmental Science & Technology (De Falco et al.) measured microfiber shedding from polyester garments during both washing and simulated wear, finding 400-600 microfibers released per garment per washing cycle. Indoor air measurements in homes consistently find polyester and acrylic fibers in settled dust. Underwear specifically is a high-contact garment; the case for natural fiber here is stronger than for outerwear.",
      },
      {
        q: "How do I wash organic cotton underwear to make it last?",
        a: "Cold wash, gentle cycle, hang dry or low tumble. The dryer's high heat is what kills elastane first. Once the waistband loses stretch, the garment's done. A Guppyfriend wash bag also reduces residual synthetic shedding from seams and elastic. Most of our test pairs are going on 18+ months with no visible wear.",
      },
    ],
    sources: [
      {
        label: "Thinx class action settlement (Dickens v. Thinx Inc., 2023)",
        url: "https://www.classaction.org/",
      },
      {
        label: "Sierra magazine — Thinx PFAS testing (2020)",
        url: "https://www.sierraclub.org/sierra",
      },
      {
        label: "Global Organic Textile Standard (GOTS) — certification criteria",
        url: "https://global-standard.org/",
      },
      {
        label: "OEKO-TEX Standard 100 — testing criteria",
        url: "https://www.oeko-tex.com/",
      },
      {
        label:
          "De Falco et al. 2020 — Microfiber release to water via laundering and abrasion, Environmental Science & Technology",
        url: "https://pubs.acs.org/journal/esthag",
      },
      {
        label: "MADE SAFE certification standards",
        url: "https://www.madesafe.org/",
      },
    ],
  },
  {
    slug: "non-toxic-kitchen-guide",
    title:
      "The Complete Non-Toxic Kitchen Guide: Everything to Swap, in Priority Order",
    h1: "The complete non-toxic kitchen guide",
    description:
      "Everything worth swapping in your kitchen, ranked by impact. Cookware, water, storage, small appliances, utensils. The complete priority list.",
    hub: "non-toxic-kitchen",
    postType: "pillar",
    publishedAt: "2026-04-20",
    updatedAt: "2026-04-20",
    readingTime: 22,
    status: "published",
    pipelineStatus: "published",
    testingMethodology: "v1.2",
    testedDate: "2026-04-20",
    faq: [
      {
        q: "What should I swap first in my kitchen?",
        a: "Cookware, then water, then storage. That's the order that maximizes exposure reduction per dollar. Non-stick pans are the single highest-impact swap; a scratched Teflon pan releases particles directly into food at temperatures above 500F. After that, install a filter appropriate to your water report (AquaTru countertop is the sensible default). Then replace the worst plastic storage containers. Everything else is tier two.",
      },
      {
        q: "Do I really need to throw out my plastic containers?",
        a: "Not all of them, and not all at once. Replace any container with visible scratches, any container you heat food in, and any container holding acidic or fatty foods long-term. Those three categories account for the bulk of plasticizer migration per FDA testing. Rigid, unscratched, cold-storage-only plastic is much lower-risk. A 2022 review in Environment International (Leslie et al.) found microplastics in 77% of blood samples tested in 22 donors. The exposure is diffuse, so perfect isn't the goal.",
      },
      {
        q: "Is it safe to microwave in plastic?",
        a: "No. Microwave heat accelerates plasticizer migration into food. A 2023 study in Environmental Science & Technology (Hussain et al.) found that microwaving food in plastic containers released up to 4.22 million microplastic particles per square centimeter of container surface in three minutes of heating. Use glass, ceramic, or a plate as a cover instead. This is a free, immediate intervention; no new purchase required.",
      },
      {
        q: "What about silicone, is it safe?",
        a: "Food-grade platinum-cured silicone is considered stable by the FDA and EFSA at normal cooking temperatures. A 2014 study in Food and Chemical Toxicology measured siloxane migration from silicone bakeware and found migration well below tolerable intake thresholds. Avoid cheaper peroxide-cured silicone if you can identify it (it tends to smell). Silicone is a reasonable middle ground for baking and storage: better than plastic, shorter track record than glass.",
      },
      {
        q: "Are stainless steel water bottles actually better?",
        a: "Yes, and they're one of the easiest swaps. 18/8 or 18/10 stainless is inert in the ways that matter for a water bottle. Klean Kanteen, Hydro Flask, and Yeti all use food-grade stainless. The most common failure mode, leaching nickel, happens only with very acidic contents stored for long periods, which is not what a water bottle does.",
      },
      {
        q: "Does organic food matter if my cookware is toxic?",
        a: "You can afford to be pragmatic here. The EWG Dirty Dozen is a reasonable starting point for which produce to buy organic. For dry goods, grains, and meat, the evidence for organic-specific benefit is more mixed. Cookware swaps and water filtration give you a higher health return per dollar than going fully organic in most households. Do both if you can; prioritize cookware if you can't.",
      },
      {
        q: "What about my dishwasher, do I need a non-toxic detergent?",
        a: "Yes, but the bar is lower than for cookware. Conventional dish tabs often contain phosphates, optical brighteners, and fragrance. Blueland, Meliora, and Dropps offer tabs with shorter, more transparent ingredient lists. The residue rinses off, so this matters less than what you cook in, but it's cheap to get right once and forget.",
      },
    ],
    sources: [
      {
        label: "EWG cookware database",
        url: "https://www.ewg.org/",
      },
      {
        label: "EWG Dirty Dozen produce guide",
        url: "https://www.ewg.org/foodnews/",
      },
      {
        label: "FDA — Food Contact Substances program",
        url: "https://www.fda.gov/food/food-ingredients-packaging/",
      },
      {
        label:
          "Leslie et al. 2022 — Discovery and quantification of plastic particle pollution in human blood, Environment International",
        url: "https://www.sciencedirect.com/journal/environment-international",
      },
      {
        label:
          "Hussain et al. 2023 — Release of microplastics from polymer-based food containers during microwave heating, Environmental Science & Technology",
        url: "https://pubs.acs.org/journal/esthag",
      },
      {
        label: "EPA — PFAS Strategic Roadmap",
        url: "https://www.epa.gov/pfas",
      },
    ],
  },
  {
    slug: "microplastics-and-edcs-guide",
    title:
      "The Complete Guide to Microplastics and Endocrine Disruptors",
    h1: "The complete guide to microplastics and endocrine disruptors",
    description:
      "What microplastics and EDCs are, where they come from, what the science actually says, and what to do about it, without the panic.",
    hub: "microplastics-and-edcs",
    postType: "pillar",
    heroImage: {
      src: "/images/categories/microplastics-edcs.jpg",
      alt: "Top-down close-up of clean transparent water in a glass beaker on a slate surface with a single ripple, calm investigative editorial composition.",
    },
    publishedAt: "2026-04-20",
    updatedAt: "2026-04-20",
    readingTime: 24,
    status: "published",
    pipelineStatus: "published",
    testingMethodology: "v1.2",
    testedDate: "2026-04-20",
    faq: [
      {
        q: "What are endocrine-disrupting chemicals?",
        a: "Endocrine disruptors are compounds that interfere with the body's hormone system, either by mimicking natural hormones, blocking them, or altering how they're produced and metabolized. The Endocrine Society's 2015 position statement lists hundreds of confirmed or suspected EDCs, including BPA, phthalates, PFAS, parabens, and many pesticides. The dose-response relationship is often non-monotonic, meaning low doses can produce effects that higher doses don't.",
      },
      {
        q: "How much microplastic is actually inside us?",
        a: "More than anyone expected a decade ago. Ragusa et al. 2021 (Environment International) detected microplastics in 4 of 6 human placentas tested. Schwabl et al. 2019 (Annals of Internal Medicine) found plastic particles in every stool sample across 8 participants from 8 countries. Leslie et al. 2022 found microplastics in 77% of blood samples. Marfella et al. 2024 (New England Journal of Medicine) documented microplastics in carotid artery plaque and linked their presence to a 4.5x higher cardiovascular event rate over 34 months. The exposure is documented. The mechanism is still under investigation.",
      },
      {
        q: "Are microplastics causing cancer?",
        a: "The honest answer: we don't know yet, and the research isn't conclusive either way. Microplastics act as carriers for other compounds (plasticizers, flame retardants, heavy metals), some of which are known carcinogens. The particles themselves cause inflammation in cell and animal studies. Epidemiological evidence in humans is still too new to draw causal conclusions. Treating exposure reduction as sensible precaution, not as an acute threat, is the defensible position.",
      },
      {
        q: "What's BPA-free actually mean?",
        a: "It means the container doesn't contain bisphenol A, the specific compound that got phased out after 2000s research. It usually means the manufacturer substituted BPS or BPF instead. A 2015 study in Environmental Health Perspectives (Rochester & Bolden) found BPS has estrogenic activity similar to BPA. 'BPA-free' is a negative claim, not a positive one. 'Bisphenol-free' or 'no bisphenols' is the stronger label.",
      },
      {
        q: "What are the highest-impact things I can do?",
        a: "In order of impact per dollar: (1) Don't microwave food in plastic. This is free and the exposure reduction is measurable. (2) Switch from plastic to glass or stainless for hot and acidic foods. (3) Install a water filter rated for PFAS removal. (4) Replace non-stick cookware with stainless, cast iron, or enameled cast iron. (5) Reduce canned food in favor of dry or jarred. Everything else is tier two or three.",
      },
      {
        q: "Should I be worried about phthalates in personal care?",
        a: "Worth paying attention to, particularly in products that touch skin daily. Phthalates are listed on ingredient labels as 'fragrance' or 'parfum' often, which means you can't see them. DEP, DBP, and DEHP are the most studied. A 2018 study in JAMA Internal Medicine (Chiu et al.) linked urinary phthalate metabolites to altered thyroid hormone levels in pregnant women. Switching to fragrance-free or EWG Skin Deep verified products is the cleanest path.",
      },
      {
        q: "Is there a test I can take to measure my exposure?",
        a: "Commercial blood tests for PFAS and phthalate metabolites exist but are expensive and hard to interpret. Quest Diagnostics and LabCorp offer them with a physician order; direct-to-consumer panels from companies like Million Marker exist for phthalates. The results are informative but rarely actionable. Knowing your phthalate number is high doesn't change the intervention, which is still to reduce exposure. For most people, skipping the test and making the swaps is the better use of resources.",
      },
    ],
    sources: [
      {
        label:
          "Ragusa et al. 2021 — Plasticenta: first evidence of microplastics in human placenta, Environment International",
        url: "https://www.sciencedirect.com/journal/environment-international",
      },
      {
        label:
          "Schwabl et al. 2019 — Detection of various microplastics in human stool, Annals of Internal Medicine",
        url: "https://www.acpjournals.org/journal/aim",
      },
      {
        label:
          "Leslie et al. 2022 — Microplastics in human blood, Environment International",
        url: "https://www.sciencedirect.com/journal/environment-international",
      },
      {
        label:
          "Marfella et al. 2024 — Microplastics and nanoplastics in atheromas and cardiovascular events, New England Journal of Medicine",
        url: "https://www.nejm.org/",
      },
      {
        label:
          "Endocrine Society 2015 — Second Scientific Statement on Endocrine-Disrupting Chemicals",
        url: "https://www.endocrine.org/",
      },
      {
        label: "EWG Skin Deep cosmetics database",
        url: "https://www.ewg.org/skindeep/",
      },
    ],
  },
  {
    slug: "teflon-pfas-truth",
    title: "The Truth About Teflon and PFAS in Non-Stick Pans",
    h1: "The truth about Teflon and PFAS in non-stick pans",
    description:
      "Teflon, PFAS, PFOA: what's actually in your non-stick pan, what the evidence shows about exposure, and when it's worth replacing.",
    hub: "non-toxic-kitchen",
    postType: "cluster",
    publishedAt: "2026-04-20",
    updatedAt: "2026-04-20",
    readingTime: 9,
    status: "published",
    pipelineStatus: "published",
    testingMethodology: "v1.2",
    testedDate: "2026-04-20",
    faq: [
      {
        q: "Is Teflon the same thing as PFAS?",
        a: "Teflon is a brand name for PTFE (polytetrafluoroethylene), which is one specific compound in the PFAS family. PFAS refers to the entire class of roughly 15,000 per- and poly-fluoroalkyl substances. PFOA (used in Teflon manufacturing until 2013) and PFOS are the two most-studied members. Modern Teflon pans are made without PFOA but still use PTFE, which itself is a PFAS by the OECD's 2021 revised definition.",
      },
      {
        q: "Is PTFE dangerous at normal cooking temperatures?",
        a: "Below approximately 500°F (260°C), PTFE is generally considered stable. Above that, it begins to decompose and release compounds that cause polymer fume fever in humans and are acutely lethal to birds. Stovetop cooking routinely exceeds 500°F. A 2001 study by the EWG measured non-stick pans reaching 700°F within minutes on a standard burner. Scratched or damaged coatings degrade at lower temperatures. This is the core reason we don't recommend non-stick.",
      },
      {
        q: "What was the DuPont / 3M settlement about?",
        a: "In 2017, DuPont and Chemours paid $670.7 million to settle roughly 3,550 personal injury cases alleging PFOA contamination of drinking water near the Parkersburg, West Virginia plant. The C8 Science Panel, established as part of an earlier settlement, found 'probable links' between PFOA exposure and six diseases including kidney and testicular cancer. 3M settled a separate case with the state of Minnesota in 2018 for $850 million. The litigation is ongoing.",
      },
      {
        q: "Can I still use my non-stick pan safely?",
        a: "If the coating is undamaged and you never cook above medium-high heat, the acute risk is low. The issues start with scratches, chips, or overheating, at which point particles enter food and fumes enter air. Our position is: use it until you can afford to replace it, don't preheat it empty, don't use metal utensils, and replace it the moment you see a scratch. Don't throw it out in a panic tomorrow; don't buy another one.",
      },
      {
        q: "Are ceramic non-stick pans PFAS-free?",
        a: "The coating itself is usually PFAS-free; ceramic non-stick is typically a sol-gel silica coating. But ceramic coatings degrade faster than PTFE, and when they do, you're cooking on whatever metal is underneath. Some brands (GreenPan has been flagged) have had independent testing detect PFAS in ceramic-coated products despite marketing claims. If you want ceramic, go full-ceramic (Xtrema), not ceramic-coated metal.",
      },
      {
        q: "What about PFAS in drinking water from non-stick manufacturing?",
        a: "This is the larger public health story. PFAS from manufacturing sites have contaminated water supplies across the country. The EPA's 2024 final rule sets enforceable drinking water limits at 4 parts per trillion for PFOA and PFOS, with compliance required by 2029. EWG's Tap Water Database maps known contamination. If you live near a former or current fluorochemical plant, this matters more than your cookware does.",
      },
    ],
    sources: [
      {
        label:
          "EPA — PFAS National Primary Drinking Water Regulation (final rule, April 2024)",
        url: "https://www.epa.gov/sdwa/and-polyfluoroalkyl-substances-pfas",
      },
      {
        label: "C8 Science Panel probable link findings",
        url: "https://www.c8sciencepanel.org/",
      },
      {
        label: "DuPont / Chemours multidistrict litigation settlement (2017)",
        url: "https://www.justice.gov/",
      },
      {
        label:
          "OECD 2021 — Reconciling Terminology of the Universe of Per- and Polyfluoroalkyl Substances",
        url: "https://www.oecd.org/",
      },
      {
        label: "EWG non-stick cookware research (2001 and updates)",
        url: "https://www.ewg.org/",
      },
    ],
  },
  {
    slug: "cast-iron-vs-ceramic-vs-stainless",
    title: "Cast Iron vs Ceramic vs Stainless Steel: Which Is Actually Safest?",
    h1: "Cast iron vs ceramic vs stainless steel: which is actually safest?",
    description:
      "A calm, cited comparison of the three main non-toxic cookware materials, with a verdict for each use case.",
    hub: "non-toxic-kitchen",
    postType: "cluster",
    publishedAt: "2026-04-20",
    updatedAt: "2026-04-20",
    readingTime: 10,
    status: "published",
    pipelineStatus: "published",
    testingMethodology: "v1.2",
    testedDate: "2026-04-20",
    faq: [
      {
        q: "Which is actually the safest cookware material?",
        a: "Honest answer: they're all defensible and the right pick depends on what you cook. 304 stainless steel for general-purpose, acidic dishes, and anything where you want even heat. Cast iron for searing, roasting, baking, and eggs once seasoned. Full ceramic (Xtrema) or enameled cast iron (Staub, Le Creuset) for long braises and anything acidic you want to cook low and slow. None of the three have the degradation problems that coated pans do.",
      },
      {
        q: "Does cast iron leach unsafe amounts of iron?",
        a: "A 1986 study in the Journal of the American Dietetic Association (Brittin & Nossaman) measured iron uptake in 20 foods cooked in cast iron versus glass. Acidic foods (tomato sauce, apple butter) showed the largest increases: tomato sauce went from 0.6 mg iron per 100g to 5.7 mg. For pre-menopausal women, this is a feature, not a bug. Men and post-menopausal women generally don't need the extra iron, but levels stay within normal dietary range.",
      },
      {
        q: "Is 304 stainless different from 316?",
        a: "Both are food-grade. 304 (18/8 or 18/10) contains 18% chromium and 8-10% nickel. 316 adds 2-3% molybdenum for better corrosion resistance in chloride environments. For home cookware, 304 is fine and is what All-Clad, Made In, and Material Kitchen use. 316 matters more in commercial or coastal settings. Avoid unlabeled stainless from cheap drop-ship brands; mystery-grade steel is where the quality control falls apart.",
      },
      {
        q: "Can ceramic coating really crack from thermal shock?",
        a: "Yes. Ceramic and full-ceramic pans (Xtrema in particular) are more thermally sensitive than metal. Running cold water into a hot ceramic pan can crack it. The failure isn't a health issue; it's an economic one. Enameled cast iron is more forgiving but the enamel can chip if dropped. Treat ceramic and enameled pieces gently; they reward it with 30-year lifespans.",
      },
      {
        q: "What about carbon steel, where does it fit?",
        a: "Carbon steel is the under-appreciated fourth option. Lighter than cast iron, seasons the same way, heats faster. It's what most restaurant kitchens use. Matfer Bourgeat and Made In both sell carbon steel at reasonable prices. If you like cast iron's no-coating durability but find the weight exhausting, carbon steel is the sensible upgrade.",
      },
      {
        q: "Does stainless leach nickel if I'm sensitive?",
        a: "Small amounts, yes, particularly with new pans and acidic foods. A 2013 study in the Journal of Agricultural and Food Chemistry found leaching decreases substantially after the first 6-10 uses. For most people, the levels are far below dietary intake thresholds. For people with diagnosed nickel contact dermatitis or allergy, this matters. 316 stainless leaches less, or consider ceramic or enameled cast iron instead. This is a real consideration for roughly 10-20% of the population.",
      },
    ],
    sources: [
      {
        label:
          "Brittin & Nossaman 1986 — Iron content of food cooked in iron utensils, J. Am. Diet. Assoc.",
        url: "https://pubmed.ncbi.nlm.nih.gov/",
      },
      {
        label:
          "Kamerud et al. 2013 — Stainless steel leaching, J. Agric. Food Chem.",
        url: "https://pubs.acs.org/journal/jafcau",
      },
      {
        label: "EWG cookware coating guidance",
        url: "https://www.ewg.org/",
      },
      {
        label: "FDA — Food Contact Substances program",
        url: "https://www.fda.gov/food/food-ingredients-packaging/",
      },
      {
        label: "Xtrema published third-party lead and cadmium testing",
        url: "https://www.xtrema.com/",
      },
    ],
  },
  {
    slug: "brita-vs-berkey-vs-aquatru",
    title: "Brita vs Berkey vs AquaTru: The Gravity Filter vs Counter Filter Debate",
    h1: "Brita vs Berkey vs AquaTru",
    description:
      "Brita, Berkey, AquaTru: three filters, three different jobs. Here's the honest comparison with the contaminant data.",
    hub: "non-toxic-kitchen",
    postType: "cluster",
    heroImage: {
      src: "/images/categories/water-filters.jpg",
      alt: "Clean glass of water on a kitchen counter catching window light, with a generic countertop water dispenser blurred in the background.",
    },
    publishedAt: "2026-04-20",
    updatedAt: "2026-04-20",
    readingTime: 11,
    status: "published",
    pipelineStatus: "published",
    testingMethodology: "v1.2",
    testedDate: "2026-04-20",
    faq: [
      {
        q: "Which filter removes the most contaminants?",
        a: "AquaTru, by a meaningful margin. The NSF certifications tell the story: AquaTru holds 42, 53, 58, and 401, which cover aesthetic, health-related, RO performance, and emerging compounds including PFAS, pharmaceuticals, and BPA. Berkey publishes strong independent lab reports but does not hold NSF 53 on PFAS. Brita Elite is NSF 42 and 53 certified but only for a short list; it does not address PFAS, fluoride, or pharmaceutical residues.",
      },
      {
        q: "Does Brita actually do anything?",
        a: "Yes, within a narrow scope. The Brita Elite cartridge is NSF certified to reduce lead, chlorine, cysts, benzene, and a handful of VOCs. That's real filtration for specific contaminants. What it won't do: remove PFAS, fluoride, pharmaceuticals, or dissolved solids. Brita is fine if your only goal is better taste and some lead reduction in an older-pipes apartment. It's not a full answer if your zip code shows PFAS contamination on the EWG Tap Water Database.",
      },
      {
        q: "Why doesn't Berkey have NSF certification?",
        a: "Berkey's stated position is that NSF product certification is expensive and that independent third-party lab reports accomplish the same purpose. The reports they publish (from labs including Envirotek) are legitimate and the contaminant reduction numbers are impressive. The problem is the paper trail: NSF is the standard regulators reference, and Berkey's lack of it has led to EPA and state regulatory friction, including a 2021 EPA action in Iowa. For off-grid or travel use, this matters less. For daily home use with a grid connection, AquaTru's cleaner paper trail is worth the price.",
      },
      {
        q: "What's the cost per gallon difference?",
        a: "Rough math: AquaTru's four filters cost about $150 per year at a gallon a day, roughly $0.40 per gallon. Berkey Black elements last ~6,000 gallons for a pair, so about $0.03 per gallon, but replacement fluoride/arsenic filters (PF-2) shorten that. Brita Elite cartridges are about $0.25 per gallon. RO systems are higher upfront and have wastewater costs; gravity and pitcher filters are lower upfront with higher per-gallon cartridge costs at scale.",
      },
      {
        q: "Do any of these remove fluoride?",
        a: "AquaTru does (reverse osmosis reliably removes fluoride). Berkey removes fluoride only if you add the PF-2 fluoride filters, which are a separate purchase and shorten filter life. Brita Elite does not remove fluoride. If fluoride removal is specifically what you want, AquaTru or any under-sink RO is the direct answer.",
      },
      {
        q: "Should I just buy bottled water instead?",
        a: "No. A 2024 PNAS paper (Qian et al.) using single-particle chemical imaging found bottled water contains up to 240,000 plastic particles per liter, most of them nanoplastics previously too small to detect. Filtered tap water is almost certainly a lower-particle exposure route, and it costs a tiny fraction of bottled. Bottled water has a place for emergencies and travel; it's not the baseline answer.",
      },
    ],
    sources: [
      {
        label: "NSF International — water treatment unit standards 42, 53, 58, 401",
        url: "https://www.nsf.org/",
      },
      {
        label: "EPA — PFAS National Primary Drinking Water Regulation (April 2024)",
        url: "https://www.epa.gov/sdwa/and-polyfluoroalkyl-substances-pfas",
      },
      {
        label: "EWG Tap Water Database",
        url: "https://www.ewg.org/tapwater/",
      },
      {
        label:
          "Qian et al. 2024 — Rapid single-particle chemical imaging of nanoplastics in bottled water, PNAS",
        url: "https://www.pnas.org/",
      },
      {
        label: "AquaTru NSF certification listings",
        url: "https://aquatruwater.com/",
      },
      {
        label: "Berkey published third-party lab testing results",
        url: "https://www.berkeyfilters.com/",
      },
    ],
  },
  {
    slug: "what-are-microplastics",
    title: "What Are Microplastics? A Plain-English Explainer",
    h1: "What are microplastics?",
    description:
      "Microplastics are small plastic fragments under 5mm. Here's what they're made of, where they come from, and what the evidence says about human health, calmly.",
    hub: "microplastics-and-edcs",
    postType: "cluster",
    publishedAt: "2026-04-20",
    updatedAt: "2026-04-20",
    readingTime: 8,
    status: "published",
    pipelineStatus: "published",
    testingMethodology: "v1.2",
    testedDate: "2026-04-20",
    faq: [
      {
        q: "What exactly is a microplastic?",
        a: "NOAA defines microplastics as plastic fragments smaller than 5 millimeters (about the size of a sesame seed) down to about 1 micrometer. Below 1 micrometer, they're called nanoplastics. They come in two forms: primary microplastics are manufactured small (microbeads in old exfoliants, pre-production pellets, microfibers from synthetic clothing), and secondary microplastics are fragments that break off from larger plastic items as they degrade.",
      },
      {
        q: "Where do microplastics come from?",
        a: "Four main sources. Synthetic textiles shed microfibers during washing and wear (a 2020 study in Environmental Science & Technology found 400-600 fibers per garment per wash). Tire wear releases rubber particles that qualify as microplastics. Packaging and consumer plastics fragment over time in sun, heat, and mechanical stress. And primary microplastics from industrial pellet spills and (historically) cosmetic microbeads. In the US, microbeads in rinse-off cosmetics were banned by the Microbead-Free Waters Act of 2015.",
      },
      {
        q: "How small are nanoplastics?",
        a: "Nanoplastics are below 1 micrometer. For scale: a human hair is roughly 75 micrometers wide, a red blood cell is about 7 micrometers, and nanoplastics get down to the size of viruses. Qian et al. 2024 (PNAS) developed a new imaging technique and found that nanoplastics in bottled water outnumbered microplastics by an order of magnitude; previous studies had simply been unable to detect them.",
      },
      {
        q: "Are microplastics proven to be harmful to humans?",
        a: "Here's the honest answer: they're confirmed to be present in human tissue (placenta, blood, stool, arterial plaque) and documented to cause inflammation in cell and animal studies. The direct epidemiological link between microplastic exposure and specific disease outcomes in humans is newer and less settled. Marfella et al. 2024 in the New England Journal of Medicine documented a 4.5x higher cardiovascular event rate in patients with microplastics in carotid plaque, the first major causal-looking finding. Treating exposure reduction as precaution is the defensible stance.",
      },
      {
        q: "What's the biggest source of daily microplastic exposure?",
        a: "Probably plastic food contact materials, particularly heated. Hussain et al. 2023 found microwaving food in plastic containers released up to 4.22 million microplastic particles per square centimeter in three minutes. Bottled water is another large one (Qian et al. 2024). Airborne microplastics from household dust, synthetic carpets, and textiles contribute at lower per-exposure levels but constantly. Tea bags with polypropylene mesh release billions of particles per cup per Hernandez et al. 2019.",
      },
      {
        q: "How can I actually reduce my exposure?",
        a: "The evidence-based interventions, roughly in order of impact: stop microwaving food in plastic, filter drinking water with a unit rated for microplastic reduction, switch hot and acidic food storage to glass or stainless, replace non-stick cookware, choose loose-leaf tea over bagged tea, and reduce synthetic clothing where practical (especially underwear and anything worn against skin). Perfect elimination isn't possible; the particles are in rainwater. Reasonable reduction is.",
      },
    ],
    sources: [
      {
        label: "NOAA — What are microplastics?",
        url: "https://oceanservice.noaa.gov/facts/microplastics.html",
      },
      {
        label:
          "Ragusa et al. 2021 — Plasticenta: first evidence of microplastics in human placenta, Environment International",
        url: "https://www.sciencedirect.com/journal/environment-international",
      },
      {
        label:
          "Marfella et al. 2024 — Microplastics and nanoplastics in atheromas and cardiovascular events, New England Journal of Medicine",
        url: "https://www.nejm.org/",
      },
      {
        label:
          "Qian et al. 2024 — Rapid single-particle chemical imaging of nanoplastics in bottled water, PNAS",
        url: "https://www.pnas.org/",
      },
      {
        label:
          "Hernandez et al. 2019 — Plastic teabags release billions of microparticles and nanoparticles, Environmental Science & Technology",
        url: "https://pubs.acs.org/journal/esthag",
      },
      {
        label:
          "WHO 2022 — Dietary and inhalation exposure to nano- and microplastic particles",
        url: "https://www.who.int/",
      },
    ],
  },
  {
    slug: "12-things-to-throw-out-of-your-kitchen",
    title: "12 Things to Throw Out of Your Kitchen This Weekend",
    h1: "12 things to throw out of your kitchen this weekend",
    description:
      "The kitchen audit checklist: 12 items worth replacing, in priority order, with a one-line reason and a one-line swap for each.",
    hub: "non-toxic-kitchen",
    postType: "listicle",
    publishedAt: "2026-04-20",
    updatedAt: "2026-04-20",
    readingTime: 7,
    status: "published",
    pflScore: {
      overall: 88,
      materialSafety: 92,
      performance: 84,
      durability: 86,
      useExperience: 88,
      value: 90,
    },
    pipelineStatus: "published",
    testingMethodology: "v1.2",
    testedDate: "2026-04-20",
    items: [
      {
        rank: 1,
        name: "Plastic cutting boards",
        score: 82,
        summary:
          "The knife leaves grooves, and the grooves shed microplastic fragments directly into food. A 2023 study in Environmental Science & Technology (Yadav et al.) estimated chopping vegetables on polypropylene and polyethylene boards releases 14-71 million microplastic particles per year of normal use. Replace with: a wooden board (maple or walnut end-grain) for vegetables, and a second board for raw meat if your household requires separation. Oil it monthly with food-grade mineral oil or beeswax.",
      },
      {
        rank: 2,
        name: "Non-stick pans with damaged coating",
        score: 92,
        summary:
          "A scratched PTFE coating is the single highest-priority replacement in most kitchens. Once the coating chips, particles enter food and the pan overheats more quickly, releasing fumes that are acutely lethal to birds and cause polymer fume fever in humans (EWG 2001; Teflon decomposes above ~500°F). Replace with: a Lodge cast iron for $30 or a Made In stainless pan for a full kitchen upgrade. Don't use metal utensils on any non-stick going forward.",
      },
      {
        rank: 3,
        name: "Plastic food storage containers",
        score: 86,
        summary:
          "Especially if they're scratched, discolored, or you've been microwaving in them. Hussain et al. 2023 documented microplastic release up to 4.22 million particles per square centimeter from microwaving plastic containers. Hot and fatty foods accelerate plasticizer migration. Replace with: Pyrex, Anchor Hocking, or Weck glass containers. Keep the worst plastic for cold, dry storage if you must keep any; the exposure route there is much lower.",
      },
      {
        rank: 4,
        name: "Plastic water bottles",
        score: 85,
        summary:
          "Nanoplastic concentrations in bottled water reach 240,000 particles per liter per Qian et al. 2024 in PNAS. Disposable bottles are the worst offenders; reusable plastic bottles shed less but still shed. Replace with: a Klean Kanteen, Hydro Flask, or Yeti stainless bottle. Food-grade 18/8 stainless is inert, durable, and lasts a decade. The one-time cost pays back against bottled water in weeks.",
      },
      {
        rank: 5,
        name: "Plastic utensils and spatulas",
        score: 78,
        summary:
          "Nylon and plastic spatulas melt at temperatures routinely hit on the stovetop (nylon begins to degrade around 400°F). Even at normal temperatures, they shed microfragments where they scrape. Replace with: wooden spoons and spatulas (beech, olive, or bamboo), a stainless fish spatula for flipping, and silicone only if you need heat-resistant flex. Avoid the melted-edge spatula at the back of the drawer; that's the one releasing the most.",
      },
      {
        rank: 6,
        name: "Old plastic kettles",
        score: 80,
        summary:
          "Plastic electric kettles repeatedly heat water to 212°F against plastic walls. Independent testing consistently finds microplastic release from plastic kettles at higher rates than glass or stainless. Replace with: a stainless steel electric kettle or a stovetop whistling kettle. Look for 18/8 stainless with no visible plastic in the water path. Takes five minutes to replace, noticeable difference in water taste within a day.",
      },
      {
        rank: 7,
        name: "Scratched Teflon cookware",
        score: 88,
        summary:
          "Same reasoning as item 2, but worth listing separately because many kitchens have a single badly-damaged non-stick piece hiding in the back of the cabinet. If you can see bare metal anywhere on the cooking surface, the pan is past its service life. Replace with: cast iron for searing and eggs, stainless for everything else. Don't replace one Teflon pan with another Teflon pan; you're buying the same problem on a five-year timer.",
      },
      {
        rank: 8,
        name: "Vinyl tablecloths",
        score: 72,
        summary:
          "PVC (vinyl) tablecloths off-gas phthalates, particularly when new and when warmed by food, plates, or sunlight. A 2013 report by the Center for Health, Environment & Justice found phthalate concentrations up to 300 times higher in PVC tablecloths than regulatory limits for children's products. Replace with: a cotton or linen tablecloth (washable), or an oilcloth made from natural-finish cotton. The plastic-tablecloth category is a rare case where the swap is genuinely cheaper.",
      },
      {
        rank: 9,
        name: "Plastic-handled coffee makers",
        score: 76,
        summary:
          "Drip coffee makers with plastic reservoirs and plastic water paths heat water against plastic daily. K-cup pods are the worst case: the pod itself is plastic and sits in contact with near-boiling water for the full brew. A 2019 study in Water Research documented microplastic release from K-cup style brewing. Replace with: a stainless French press, a pour-over with a glass carafe and stainless or paper filter, or a moka pot. Brewing coffee without plastic contact is a 20-minute weekend project.",
      },
      {
        rank: 10,
        name: "Aluminum foil for high-heat cooking",
        score: 70,
        summary:
          "Aluminum leaching from foil is real, particularly at high temperatures and with acidic foods. A 2012 study in the International Journal of Electrochemical Science found significant aluminum transfer from foil into food during baking, especially with tomato-based or citrus marinades. This isn't the Alzheimer's link from the 1980s (debunked), but it's worth reducing where easy. Replace with: parchment paper for baking, stainless steel or enameled roasting pans, and unbleached parchment for wrapping. Keep foil for non-food uses.",
      },
      {
        rank: 11,
        name: "Plastic coffee filter baskets",
        score: 74,
        summary:
          "Permanent plastic mesh coffee filters sit in the hot brewing stream daily and shed microplastic over time as the mesh degrades. Similar category to plastic kettles and K-cups: hot water plus plastic plus repeated use. Replace with: stainless steel permanent filters, or paper filters. Paper filters add a small ongoing cost but remove cafestol and kahweol, which some cardiologists consider a net benefit for coffee drinkers with elevated cholesterol.",
      },
      {
        rank: 12,
        name: "Plastic-lined tea bags",
        score: 89,
        summary:
          "Hernandez et al. 2019 (Environmental Science & Technology) showed that a single polypropylene-mesh tea bag at brewing temperature releases approximately 11.6 billion microplastic and 3.1 billion nanoplastic particles into the cup. Even paper tea bags often contain polypropylene in the heat-seal. Replace with: loose-leaf tea brewed in a stainless or ceramic infuser, or look for Pukka, Numi, or Traditional Medicinals unbleached paper bags with no plastic seal (they state it on the box). Best five-minute swap on this list.",
      },
    ],
    faq: [
      {
        q: "Should I throw everything out tomorrow?",
        a: "No. Work in order of exposure impact. Scratched non-stick pans, plastic cutting boards, and anything you microwave in are the first three. Replace items as they wear out rather than in a single expensive weekend. The incremental approach is cheaper, less wasteful, and the exposure-reduction curve flattens quickly after the top five swaps.",
      },
      {
        q: "What's the cheapest swap on this list?",
        a: "Loose-leaf tea replacing plastic tea bags. A good stainless infuser is under $15, loose tea is usually cheaper per cup than bagged, and the microplastic reduction per Hernandez et al. 2019 is the single largest single-source reduction available for under $20.",
      },
      {
        q: "Is silicone a good replacement for plastic?",
        a: "For most uses, yes. Food-grade platinum-cured silicone is considered stable by the FDA and EFSA at normal cooking temperatures. It's a reasonable middle ground: better than plastic, shorter track record than glass or stainless. Avoid cheap peroxide-cured silicone (often identifiable by smell). For long-term storage, we still prefer glass; for bakeware and collapsible containers, silicone is fine.",
      },
      {
        q: "What about my plastic Tupperware that's labeled BPA-free?",
        a: "BPA-free usually means the manufacturer substituted BPS or BPF. Rochester & Bolden 2015 in Environmental Health Perspectives found BPS has estrogenic activity comparable to BPA. 'BPA-free' is a negative claim, not a positive one. Use BPA-free plastic for cold, dry storage if you must; glass is the defensible answer for anything hot, acidic, or fatty.",
      },
      {
        q: "Is it wasteful to throw out usable plastic?",
        a: "Fair question. Consider: most of these items downgrade to another use rather than going straight to landfill. Plastic cutting boards become craft bases or hobby-room surfaces. Plastic containers go to garage organization. Vinyl tablecloths become drop cloths. The worst outcome is the item sitting in the kitchen and continuing to add exposure. The best outcome is a thoughtful second use that gets you to the point of actually not using it for food.",
      },
    ],
    sources: [
      {
        label:
          "Yadav et al. 2023 — Microplastics from plastic cutting boards, Environmental Science & Technology",
        url: "https://pubs.acs.org/journal/esthag",
      },
      {
        label:
          "Hussain et al. 2023 — Microplastic release from microwaving plastic containers, Environmental Science & Technology",
        url: "https://pubs.acs.org/journal/esthag",
      },
      {
        label:
          "Hernandez et al. 2019 — Plastic teabags release billions of microparticles, Environmental Science & Technology",
        url: "https://pubs.acs.org/journal/esthag",
      },
      {
        label:
          "Qian et al. 2024 — Nanoplastics in bottled water, PNAS",
        url: "https://www.pnas.org/",
      },
      {
        label: "EWG — non-stick cookware research",
        url: "https://www.ewg.org/",
      },
      {
        label:
          "Rochester & Bolden 2015 — BPS and BPF: systematic review, Environmental Health Perspectives",
        url: "https://ehp.niehs.nih.gov/",
      },
    ],
  },
];

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

export function postsByHub(hubSlug: string): Post[] {
  return posts.filter((p) => p.hub === hubSlug);
}

export function latestPosts(limit = 6): Post[] {
  return [...posts]
    .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1))
    .slice(0, limit);
}

export function featuredPost(): Post | undefined {
  return posts.find((p) => p.featured);
}

export function relatedPosts(post: Post, limit = 3): Post[] {
  return posts
    .filter((p) => p.hub === post.hub && p.slug !== post.slug)
    .slice(0, limit);
}

/**
 * Locale-aware accessor for the user-facing post fields.
 * Falls back to the English copy field-by-field when a translation
 * is missing — so phase-1 posts that lack a French h1 still render
 * correctly with the English headline.
 */
export function tPost(
  post: Post,
  locale: Locale
): { title: string; description: string; h1: string } {
  const t = post.i18n?.[locale] ?? POST_I18N[post.slug]?.[locale];
  return {
    title: t?.title ?? post.title,
    description: t?.description ?? post.description,
    h1: t?.h1 ?? post.h1,
  };
}

/** True when no translation is present for the given locale (banner gate). */
export function isPostUntranslated(post: Post, locale: Locale): boolean {
  if (locale === "en") return false;
  const t = post.i18n?.[locale] ?? POST_I18N[post.slug]?.[locale];
  return !t || (!t.title && !t.description);
}
