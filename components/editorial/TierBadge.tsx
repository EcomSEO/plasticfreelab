type Tier =
  | "Best overall"
  | "Best mid-range"
  | "Best budget"
  | "Best for X"
  | "Best for durability"
  | "Best for families"
  | "Best for sensitive skin"
  | "Editor's pick"
  | "Skip"
  | string;

function classFor(tier: string): string {
  const t = tier.toLowerCase();
  if (t.includes("skip") || t.includes("avoid")) return "tier-badge tier-badge-skip";
  if (t.includes("budget") || t.includes("affordable")) return "tier-badge tier-badge-budget";
  if (t.includes("mid")) return "tier-badge tier-badge-mid";
  return "tier-badge";
}

export function TierBadge({ tier }: { tier: Tier }) {
  return <span className={classFor(tier)}>{tier}</span>;
}
