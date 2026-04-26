/**
 * PFLScore — round numeric badge with rotating textPath ring.
 *
 * The flagship signal: every product carries a 0-100 composite score,
 * tier-mapped to a brand color. Mirrors `VerifiedSeal` for visual and
 * implementation parity (same SVG strategy, same rotation animation,
 * same `prefers-reduced-motion` respect).
 *
 * Sizes:
 *   - "lg" → 96px, used on review hero, comparison hero, methodology
 *     feature blocks. Carries rotating perimeter text + tier label.
 *   - "sm" → 40px, used on cards, magazine grid, listicle rows. Plain
 *     filled circle with the number centered. No rotation.
 *
 * Tier mapping (composite score → tier + colors):
 *   90-100  Excellent     · sage bg / cream number
 *   80-89   Strong buy    · sage bg / cream number
 *   70-79   Good          · cream-deep bg, sage border / forest number
 *   60-69   Caveat buy    · cream-deep bg, terracotta border / forest number,
 *                           terracotta label
 *   0-59    Skip          · terracotta-deep bg / cream number
 */

export type PFLScoreTier =
  | "excellent"
  | "strongBuy"
  | "good"
  | "caveatBuy"
  | "skip";

export type PFLScoreSize = "lg" | "sm";

const TIER_LABEL_EN: Record<PFLScoreTier, string> = {
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
  border?: string;
  number: string;
  label: string;
  ring: string;
};

const COLORS: Record<PFLScoreTier, TierColors> = {
  excellent: {
    bg: "#7A8B6F", // sage
    number: "#F4EFE6", // cream
    label: "#F4EFE6",
    ring: "#F4EFE6",
  },
  strongBuy: {
    bg: "#7A8B6F",
    number: "#F4EFE6",
    label: "#F4EFE6",
    ring: "#F4EFE6",
  },
  good: {
    bg: "#EBE2D1", // cream-deep
    border: "#7A8B6F",
    number: "#2C3E2F", // forest
    label: "#2C3E2F",
    ring: "#2C3E2F",
  },
  caveatBuy: {
    bg: "#EBE2D1",
    border: "#C97D4F", // terracotta
    number: "#2C3E2F",
    label: "#C97D4F",
    ring: "#2C3E2F",
  },
  skip: {
    bg: "#A35E36", // terracotta-deep
    number: "#F4EFE6",
    label: "#F4EFE6",
    ring: "#F4EFE6",
  },
};

function ringTextFor(tier: PFLScoreTier): string {
  if (tier === "skip") return "PLASTICFREELAB · NOT RECOMMENDED · ";
  if (tier === "caveatBuy") return "PLASTICFREELAB · CAVEAT BUY · ";
  return "PLASTICFREELAB · PFL SCORE · METHODOLOGY V1.2 · ";
}

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
  const tierLabel = TIER_LABEL_EN[tier];

  if (size === "sm") {
    const px = 40;
    const numberSize = 16;
    return (
      <span
        className={`pfl-score pfl-score--sm pfl-score--${tier} ${className}`}
        style={{
          width: px,
          height: px,
          background: colors.bg,
          border: colors.border ? `1px solid ${colors.border}` : "none",
        }}
        aria-label={`PFL Score ${safeScore} of 100, ${tierLabel}`}
      >
        <span
          className="pfl-score__num pfl-score__num--sm"
          style={{
            color: colors.number,
            fontSize: numberSize,
          }}
        >
          {safeScore}
        </span>
        {showTier && (
          <span
            className="pfl-score__sm-label"
            aria-hidden="true"
            style={{ color: "#6B6B68" }}
          >
            {tierLabel}
          </span>
        )}
      </span>
    );
  }

  // Large variant
  const px = 96;
  const cx = px / 2;
  const cy = px / 2;
  const rOuter = px / 2 - 1;
  const rTextPath = px / 2 - 8;
  const rInner = px / 2 - 14;
  const ringFontSize = Math.max(6, px * 0.082);
  const ringText = ringTextFor(tier);
  const repeatedText = `${ringText}${ringText}`;
  const id = `pfl-score-${tier}-${safeScore}-${px}`;
  const pathId = `${id}-path`;

  return (
    <span
      className={`pfl-score pfl-score--lg pfl-score--${tier} ${className}`}
      style={{ width: px, height: px }}
      aria-label={`PFL Score ${safeScore} of 100, ${tierLabel}`}
    >
      <svg
        viewBox={`0 0 ${px} ${px}`}
        width={px}
        height={px}
        className="pfl-score__svg"
        aria-hidden="true"
      >
        <defs>
          <path
            id={pathId}
            d={`M ${cx},${cy} m -${rTextPath},0 a ${rTextPath},${rTextPath} 0 1,1 ${
              rTextPath * 2
            },0 a ${rTextPath},${rTextPath} 0 1,1 -${rTextPath * 2},0`}
            fill="none"
          />
        </defs>

        {/* Outer disk (filled brand color) */}
        <circle cx={cx} cy={cy} r={rOuter} fill={colors.bg} />

        {/* Optional 1px tier border for cream-deep tiers */}
        {colors.border && (
          <circle
            cx={cx}
            cy={cy}
            r={rOuter - 0.5}
            fill="none"
            stroke={colors.border}
            strokeWidth={1}
          />
        )}

        {/* Rotating perimeter text */}
        <g className="pfl-score__ring">
          <text
            fill={colors.ring}
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 600,
              fontSize: ringFontSize,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
            }}
            opacity={0.7}
          >
            <textPath href={`#${pathId}`} startOffset="0%">
              {repeatedText}
            </textPath>
          </text>
        </g>

        {/* Number */}
        <text
          x={cx}
          y={cy + (showTier ? 2 : 8)}
          textAnchor="middle"
          fill={colors.number}
          style={{
            fontFamily: "Fraunces, Georgia, serif",
            fontWeight: 600,
            fontSize: 36,
            fontVariantNumeric: "tabular-nums",
            letterSpacing: "-0.02em",
          }}
        >
          {safeScore}
        </text>

        {/* Tier label */}
        {showTier && (
          <text
            x={cx}
            y={cy + 18}
            textAnchor="middle"
            fill={colors.label}
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 600,
              fontSize: 9,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
            }}
          >
            {tierLabel}
          </text>
        )}

        {/* Inner hairline */}
        <circle
          cx={cx}
          cy={cy}
          r={rInner}
          fill="none"
          stroke={colors.ring}
          strokeWidth={0.5}
          opacity={0.25}
        />
      </svg>
    </span>
  );
}

/**
 * PFLScoreInline — small score + tier name laid out side by side.
 * Useful for ranked product rows in comparisons and listicles.
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
  const tierLabel = TIER_LABEL_EN[tier];
  return (
    <span className={`pfl-score-inline ${className}`}>
      <PFLScore score={safeScore} size="sm" showTier={false} />
      <span className="pfl-score-inline__label">{tierLabel}</span>
    </span>
  );
}
