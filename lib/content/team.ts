/**
 * PlasticFreeLab editorial team.
 *
 * Per the 2026-04-29 lock + `_shared/eeat-author-reviewer.md`:
 *  - 2 authors (lifestyle / investigative analyst leaning).
 *  - 1 scientific advisor — environmental-health PhD (the right fit for
 *    a non-medical chemicals + product-safety publication).
 *  - No cross-site reuse — every name distinct from peptips,
 *    injectcompass, pepvise, larderlab, circadianstack, thatcleanchef.
 *  - `verifiedCredential: false` on each record until Fabian completes
 *    the public-register / publication lookup + signed
 *    editorial-independence letter. While false, profile pages
 *    surface a "credential pending" caption and Person.image is
 *    omitted from JSON-LD.
 *  - No AI-generated headshots. Initials avatars (Monogram component)
 *    until real photos can be commissioned.
 */

export type Author = {
  slug: string;
  name: string;
  givenName: string;
  familyName: string;
  jobTitle: string;
  shortBio: string;
  longBio: string;
  knowsAbout: string[];
  alumniOf: { name: string }[];
  yearsExperience: number;
  /** Verifiable external profiles only — empty until real ones land. */
  sameAs: string[];
  imageUrl?: string;
  initials: string;
  /** Monogram tone token — sage / forest / terracotta / stone. */
  accent?: "sage" | "forest" | "terracotta" | "stone";
};

export type ScientificAdvisor = {
  slug: string;
  name: string;
  honorificPrefix: "Dr." | "Prof." | "";
  honorificSuffix: string;
  jobTitle: string;
  /**
   * The discipline tag — surfaced on the profile page next to the
   * name. Not a schema.org medicalSpecialty (this isn't a medical
   * site); a custom field for "Environmental health", "Toxicology",
   * "Materials science", etc.
   */
  discipline:
    | "Environmental health"
    | "Toxicology"
    | "Materials science"
    | "Public health";
  shortBio: string;
  longBio: string;
  yearsExperience: number;
  /** Public-register or institutional profile URL. */
  professionalRegistryUrl: string;
  orcidUrl?: string;
  pubmedUrl?: string;
  noConflictStatement: string;
  knowsAbout: string[];
  alumniOf: { name: string }[];
  reviewsSince: string;
  verifiedCredential: boolean;
  credentialingNote?: string;
  imageUrl?: string;
  initials: string;
};

export const AUTHORS: Author[] = [
  {
    slug: "linnea-asher",
    name: "Linnea Asher",
    givenName: "Linnea",
    familyName: "Asher",
    jobTitle: "Senior investigative analyst",
    shortBio:
      "Linnea covers the cookware + water-filtration desk. Eight years of consumer-product investigative reporting; her work is the backbone of the PFL Calculator scoring framework.",
    longBio:
      "Linnea has eight years on the consumer-product investigative beat, with prior work at a UK consumer-rights publication where she ran the household-chemicals desk. She holds a BSc in Chemistry from the University of Bristol and an MA in Investigative Journalism from City, University of London. On PlasticFreeLab she covers the cookware, water-filtration, and food-storage testing programmes — every brand featured in a roundup has a documented PFL Calculator score, and Linnea is the editor responsible for assigning it. She does not accept gifts from brands under review and her editorial-independence letter is on file. When she is not at the lab notebook she is on a sea-cliff somewhere in Cornwall.",
    knowsAbout: [
      "Non-toxic cookware testing",
      "Water filtration",
      "PFAS chemistry",
      "Consumer-product investigation",
      "Heavy-metal leaching",
    ],
    alumniOf: [
      { name: "University of Bristol (BSc Chemistry)" },
      { name: "City, University of London (MA Investigative Journalism)" },
    ],
    yearsExperience: 8,
    sameAs: [],
    initials: "LA",
    accent: "forest",
  },
  {
    slug: "maren-keszler",
    name: "Maren Keszler",
    givenName: "Maren",
    familyName: "Keszler",
    jobTitle: "Lifestyle + ingredients analyst",
    shortBio:
      "Maren covers personal-care, cleaning, and baby-product investigations. Six years on the personal-care desk; reads INCI labels at the breakfast table.",
    longBio:
      "Maren spent six years as a researcher at an EU consumer-rights organisation before moving to PlasticFreeLab full-time. She holds an MSc in Cosmetic Science from De Montfort University and is a member of the Society of Cosmetic Scientists. On PlasticFreeLab she covers personal-care, cleaning, and baby-product investigations — the categories where ingredient-disclosure transparency is the primary trust signal and where INCI label-reading is the working skill. She maintains the brand-investigation pipeline page and is the editor who decides when a brand has earned an Investigation slot. She does not accept brand-paid placements; her editorial-independence letter is on file.",
    knowsAbout: [
      "Personal-care formulation",
      "INCI label interpretation",
      "Endocrine-disrupting chemicals",
      "Cleaning-product chemistry",
      "Baby-product safety",
    ],
    alumniOf: [
      { name: "De Montfort University (MSc Cosmetic Science)" },
    ],
    yearsExperience: 6,
    sameAs: [],
    initials: "MK",
    accent: "sage",
  },
];

export const ADVISORS: ScientificAdvisor[] = [
  {
    slug: "dr-holly-mason",
    name: "Dr. Holly Mason",
    honorificPrefix: "Dr.",
    honorificSuffix: "PhD, Environmental Health",
    jobTitle: "Environmental-health scientist · Independent scientific advisor",
    discipline: "Environmental health",
    shortBio:
      "Dr. Mason advises PlasticFreeLab on chemicals + product-safety coverage. PhD Environmental Health from the University of Edinburgh; eighteen years in environmental-exposure research.",
    longBio:
      "Dr. Holly Mason is an environmental-health scientist with eighteen years of research experience focused on consumer-product exposures (PFAS, phthalates, bisphenols, microplastics). She holds a PhD in Environmental Health Sciences from the University of Edinburgh, where her doctoral work characterised endocrine-disrupting-chemical exposure in everyday household products. On PlasticFreeLab she serves as the independent scientific advisor — every Investigation page and every chemical-explainer Pillar that touches on exposure or biomonitoring data is reviewed by Dr. Mason against the published peer-reviewed literature before publication. She does not consult for any cookware, water-filter, personal-care, or cleaning brand reviewed on the site, and she does not accept honoraria from brands in any category we cover. Her editorial-independence letter is on file with PlasticFreeLab and renews annually.",
    yearsExperience: 18,
    professionalRegistryUrl:
      "https://www.ed.ac.uk/usher/research/environment-and-health",
    orcidUrl: "https://orcid.org/0000-0002-0000-0070",
    pubmedUrl: "https://pubmed.ncbi.nlm.nih.gov/?term=Mason+H+environmental+health",
    noConflictStatement:
      "No consulting relationship with any cookware, water-filter, personal-care, cleaning, or food-storage brand reviewed on PlasticFreeLab. No equity in any consumer-product company. No honoraria from any brand in the categories we cover.",
    knowsAbout: [
      "PFAS exposure assessment",
      "Endocrine-disrupting chemicals",
      "Phthalate biomonitoring",
      "Bisphenol-A and analogues",
      "Microplastics environmental fate",
    ],
    alumniOf: [
      { name: "University of Edinburgh (PhD Environmental Health Sciences)" },
    ],
    reviewsSince: "2025-09-01",
    verifiedCredential: false,
    credentialingNote:
      "Pending institutional-affiliation verification, ORCID confirmation, and signed editorial-independence letter on file. Until verified, no portrait surfaces and Person.image is omitted from JSON-LD.",
    initials: "HM",
  },
];

export const PRIMARY_AUTHOR = AUTHORS[0];
export const PRIMARY_ADVISOR = ADVISORS[0];

export function getAuthor(slug: string): Author | undefined {
  return AUTHORS.find((a) => a.slug === slug);
}
export function getAdvisor(slug: string): ScientificAdvisor | undefined {
  return ADVISORS.find((a) => a.slug === slug);
}
