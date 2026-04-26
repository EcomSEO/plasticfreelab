/**
 * PFLScore — runrepeat-style squared rectangle pill.
 *
 * Replaces the previous round seal with rotating textPath ring.
 * Sizes:
 *   - "sm"  → 36×26  (cards, post tiles, comparison row badges)
 *   - "md"  → 56×40  (medium contexts)
 *   - "lg"  → 88×64  (review/comparison hero)
 *
 * Tier mapping → colors and label:
 *   90-100  Superb!     score-green  / white
 *   80-89   Great!      score-green  / white
 *   70-79   Good        yellow       / black
 *   60-69   Decent      yellow       / black
 *   0-59    Bad         red          / white
 */

export type PFLScoreTier =
  | "excellent"
  | "strongBuy"
  | "good"
  | "caveatBuy"
  | "skip";

export type PFLScoreSize = "lg" | "md" | "sm";

const TIER_LABEL: Record<PFLScoreTier, string> = {
  excellent: "SUPERB!",
  strongBuy: "GREAT!",
  good: "GOOD",
  caveatBuy: "DECENT",
  skip: "BAD",
};

const TIER_OUTER_LABEL: Record<PFLScoreTier, string> = {
  excellent: "EXCELLENT",
  strongBuy: "STRONG BUY",
  good: "GOOD",
  caveatBuy: "CAVEAT BUY",
  skip: "SKIP",
};

export function tierForScore(score: number): PFLScoreTier {
  if (score >= 90) return "excellent";
  if (score >= 80) return "strongBuy";
  if (score >= 70) return "good";
  if (score >= 60) return "caveatBuy";
  return "skip";
}

type TierColors = {
  bg: string;
  text: string;
  outerLabel: string;
};

const COLORS: Record<PFLScoreTier, TierColors> = {
  excellent: { bg: "#098040", text: "#FFFFFF", outerLabel: "#098040" },
  strongBuy: { bg: "#098040", text: "#FFFFFF", outerLabel: "#098040" },
  good: { bg: "#FFB717", text: "#000000", outerLabel: "#B27F00" },
  caveatBuy: { bg: "#FFB717", text: "#000000", outerLabel: "#B27F00" },
  skip: { bg: "#C53127", text: "#FFFFFF", outerLabel: "#C53127" },
};

const DIMENSIONS: Record<PFLScoreSize, { w: number; h: number; numFs: number; labelFs: number; outerFs: number }> = {
  sm: { w: 36, h: 26, numFs: 14, labelFs: 0, outerFs: 9 },
  md: { w: 56, h: 40, numFs: 22, labelFs: 8, outerFs: 10 },
  lg: { w: 88, h: 64, numFs: 36, labelFs: 11, outerFs: 11 },
};

export function PFLScore({
  score,
  size = "lg",
  showTier = true,
  className = "",
}: {
  score: number;
  size?: PFLScoreSize;
  showTier?: boolean;
  className?: string;
}) {
  const safeScore = Math.max(0, Math.min(100, Math.round(score)));
  const tier = tierForScore(safeScore);
  const colors = COLORS[tier];
  const tierLabel = TIER_LABEL[tier];
  const outerLabel = TIER_OUTER_LABEL[tier];
  const dim = DIMENSIONS[size];

  return (
    <span
      className={`pfl-score pfl-score--${size} pfl-score--${tier} ${className}`}
      style={{
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "center",
        gap: size === "sm" ? 0 : 4,
      }}
      aria-label={`PFL Score ${safeScore} of 100, ${outerLabel}`}
    >
      <span
        style={{
          display: "inline-flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: dim.w,
          height: dim.h,
          background: colors.bg,
          color: colors.text,
          borderRadius: 2,
          fontFamily: "Roboto, sans-serif",
          lineHeight: 1,
        }}
      >
        <span
          className="pfl-score__num"
          style={{
            fontWeight: 700,
            fontSize: dim.numFs,
            fontVariantNumeric: "tabular-nums",
            letterSpacing: 0,
          }}
        >
          {safeScore}
        </span>
        {size !== "sm" && (
          <span
            style={{
              fontFamily: "Roboto, sans-serif",
              fontSize: dim.labelFs,
              fontWeight: 400,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              marginTop: 2,
            }}
          >
            {tierLabel}
          </span>
        )}
      </span>
      {showTier && size !== "sm" && (
        <span
          style={{
            fontFamily: "Roboto, sans-serif",
            fontWeight: 700,
            fontSize: dim.outerFs,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: colors.outerLabel,
            marginTop: 2,
          }}
        >
          {outerLabel}
        </span>
      )}
    </span>
  );
}

/**
 * PFLScoreInline — small score + tier label laid out side by side.
 */
export function PFLScoreInline({
  score,
  className = "",
}: {
  score: number;
  className?: string;
}) {
  const safeScore = Math.max(0, Math.min(100, Math.round(score)));
  const tier = tierForScore(safeScore);
  const tierLabel = TIER_OUTER_LABEL[tier];
  const colors = COLORS[tier];
  return (
    <span className={`pfl-score-inline ${className}`}>
      <PFLScore score={safeScore} size="sm" showTier={false} />
      <span
        className="pfl-score-inline__label"
        style={{ color: colors.outerLabel }}
      >
        {tierLabel}
      </span>
    </span>
  );
}
