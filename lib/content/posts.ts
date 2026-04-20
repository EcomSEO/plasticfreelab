export type PostType = "pillar" | "comparison" | "cluster" | "listicle";

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
  ourPick?: { name: string; tier: string; reason: string };
  products?: Array<{
    rank: number;
    name: string;
    tier: string;
    summary: string;
  }>;
  items?: Array<{ rank: number; name: string; summary: string }>;
  faq?: Array<{ q: string; a: string }>;
  sources?: Array<{ label: string; url: string }>;
  featured?: boolean;
};

export const posts: Post[] = [
  {
    slug: "best-non-toxic-cookware",
    title: "Best Non-Toxic Cookware Sets of 2026, Tested and Ranked",
    h1: "Best non-toxic cookware sets of 2026, tested and ranked",
    description:
      "We tested 14 non-toxic cookware brands. Here's the editor's pick, the budget option, and the ones we'd skip — with sources.",
    hub: "non-toxic-kitchen",
    postType: "comparison",
    publishedAt: "2026-04-20",
    updatedAt: "2026-04-20",
    readingTime: 16,
    status: "stub",
    featured: true,
    ourPick: {
      name: "TODO: Editor's pick (per brief)",
      tier: "Best overall",
      reason: "TODO: two-sentence reason pulled from the full brief.",
    },
    products: [
      { rank: 1, name: "TODO: Best overall", tier: "Best overall", summary: "TODO: draft" },
      { rank: 2, name: "TODO: Best mid-range", tier: "Best mid-range", summary: "TODO: draft" },
      { rank: 3, name: "TODO: Best budget", tier: "Best budget", summary: "TODO: draft" },
    ],
    faq: [
      { q: "What is the safest cookware material?", a: "TODO: draft" },
      { q: "Is stainless steel cookware non-toxic?", a: "TODO: draft" },
      { q: "Are ceramic pans actually safe?", a: "TODO: draft" },
    ],
    sources: [
      { label: "EWG cookware database", url: "https://www.ewg.org/" },
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
    status: "stub",
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
    status: "stub",
  },
  {
    slug: "non-toxic-kitchen-guide",
    title:
      "The Complete Non-Toxic Kitchen Guide: Everything to Swap, in Priority Order",
    h1: "The complete non-toxic kitchen guide",
    description:
      "Everything worth swapping in your kitchen, ranked by impact. Cookware, water, storage, small appliances, utensils — the complete priority list.",
    hub: "non-toxic-kitchen",
    postType: "pillar",
    publishedAt: "2026-04-20",
    updatedAt: "2026-04-20",
    readingTime: 22,
    status: "stub",
  },
  {
    slug: "microplastics-and-edcs-guide",
    title:
      "The Complete Guide to Microplastics and Endocrine Disruptors",
    h1: "The complete guide to microplastics and endocrine disruptors",
    description:
      "What microplastics and EDCs are, where they come from, what the science actually says, and what to do about it — without the panic.",
    hub: "microplastics-and-edcs",
    postType: "pillar",
    publishedAt: "2026-04-20",
    updatedAt: "2026-04-20",
    readingTime: 24,
    status: "stub",
  },
  {
    slug: "teflon-pfas-truth",
    title: "The Truth About Teflon and PFAS in Non-Stick Pans",
    h1: "The truth about Teflon and PFAS in non-stick pans",
    description:
      "Teflon, PFAS, PFOA — what's actually in your non-stick pan, what the evidence shows about exposure, and when it's worth replacing.",
    hub: "non-toxic-kitchen",
    postType: "cluster",
    publishedAt: "2026-04-20",
    updatedAt: "2026-04-20",
    readingTime: 9,
    status: "stub",
  },
  {
    slug: "cast-iron-vs-ceramic-vs-stainless",
    title: "Cast Iron vs Ceramic vs Stainless Steel: Which Is Actually Safest?",
    h1: "Cast iron vs ceramic vs stainless steel: which is actually safest?",
    description:
      "A calm, cited comparison of the three main non-toxic cookware materials — with a verdict for each use case.",
    hub: "non-toxic-kitchen",
    postType: "cluster",
    publishedAt: "2026-04-20",
    updatedAt: "2026-04-20",
    readingTime: 10,
    status: "stub",
  },
  {
    slug: "brita-vs-berkey-vs-aquatru",
    title: "Brita vs Berkey vs AquaTru: The Gravity Filter vs Counter Filter Debate",
    h1: "Brita vs Berkey vs AquaTru",
    description:
      "Brita, Berkey, AquaTru — three filters, three different jobs. Here's the honest comparison with the contaminant data.",
    hub: "non-toxic-kitchen",
    postType: "cluster",
    publishedAt: "2026-04-20",
    updatedAt: "2026-04-20",
    readingTime: 11,
    status: "stub",
  },
  {
    slug: "what-are-microplastics",
    title: "What Are Microplastics? A Plain-English Explainer",
    h1: "What are microplastics?",
    description:
      "Microplastics are small plastic fragments under 5mm. Here's what they're made of, where they come from, and what the evidence says about human health — calmly.",
    hub: "microplastics-and-edcs",
    postType: "cluster",
    publishedAt: "2026-04-20",
    updatedAt: "2026-04-20",
    readingTime: 8,
    status: "stub",
  },
  {
    slug: "12-things-to-throw-out-of-your-kitchen",
    title: "12 Things to Throw Out of Your Kitchen This Weekend",
    h1: "12 things to throw out of your kitchen this weekend",
    description:
      "The kitchen audit checklist — 12 items worth replacing, in priority order, with a one-line reason and a one-line swap for each.",
    hub: "non-toxic-kitchen",
    postType: "listicle",
    publishedAt: "2026-04-20",
    updatedAt: "2026-04-20",
    readingTime: 7,
    status: "stub",
    items: [
      { rank: 1, name: "Plastic cutting boards", summary: "TODO: draft" },
      { rank: 2, name: "Non-stick pans with damaged coating", summary: "TODO: draft" },
      { rank: 3, name: "Plastic food storage containers", summary: "TODO: draft" },
      { rank: 4, name: "Plastic water bottles", summary: "TODO: draft" },
      { rank: 5, name: "Plastic utensils and spatulas", summary: "TODO: draft" },
      { rank: 6, name: "Old plastic kettles", summary: "TODO: draft" },
      { rank: 7, name: "Scratched Teflon cookware", summary: "TODO: draft" },
      { rank: 8, name: "Vinyl tablecloths", summary: "TODO: draft" },
      { rank: 9, name: "Plastic-handled coffee makers", summary: "TODO: draft" },
      { rank: 10, name: "Aluminum foil for high-heat cooking", summary: "TODO: draft" },
      { rank: 11, name: "Plastic coffee filter baskets", summary: "TODO: draft" },
      { rank: 12, name: "Plastic-lined tea bags", summary: "TODO: draft" },
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
