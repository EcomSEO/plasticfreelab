export type Hub = {
  slug: string;
  name: string;
  shortName: string;
  oneLiner: string;
  thesis: string;
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
  },
  {
    slug: "non-toxic-kitchen",
    name: "Non-Toxic Kitchen",
    shortName: "Kitchen",
    oneLiner:
      "The highest-impact swaps in your home, ranked by how much they matter. Cookware, water, storage, the works.",
    thesis:
      "The kitchen is the highest-impact room for non-toxic swaps. Readers come here ready to act. This hub is action-oriented, comparison-heavy, money-page-dense.",
  },
  {
    slug: "non-toxic-personal-care",
    name: "Personal Care",
    shortName: "Personal Care",
    oneLiner:
      "Shampoo to sunscreen, the calm truth about what's in your bathroom and what's worth replacing.",
    thesis:
      "Personal care products sit on skin for hours a day. This hub separates the swaps that matter from the marketing claims that don't.",
  },
  {
    slug: "non-toxic-home",
    name: "Home Environment",
    shortName: "Home",
    oneLiner:
      "Mattresses, cleaning products, air quality, and the quiet exposures you never think about.",
    thesis:
      "Indoor air is two to five times more polluted than outdoor air. Your mattress, your cleaning supplies, and your flooring are usually why. This hub covers the environment you actually live in.",
  },
  {
    slug: "non-toxic-clothing-and-textiles",
    name: "Clothing & Textiles",
    shortName: "Clothing",
    oneLiner:
      "Microplastics, PFAS in clothes, and the textile supply chain — with the brands worth buying.",
    thesis:
      "Synthetic fabrics shed microplastics every wash and many carry PFAS from the factory. This hub covers what's in your wardrobe and which brands have done the work.",
  },
];

export function getHub(slug: string): Hub | undefined {
  return hubs.find((h) => h.slug === slug);
}
