/**
 * Monogram — small circular brand/author chip.
 *
 * Used as the avatar on every post card, hub card, and magazine
 * grid row. Fraunces on sage by default. Optional letter override
 * for role chips (R / T / M / S on the editorial board).
 */
export function Monogram({
  size = 24,
  letters = "PL",
  tone = "sage",
  className = "",
}: {
  size?: number;
  letters?: string;
  tone?: "sage" | "forest" | "terracotta" | "stone";
  className?: string;
}) {
  const bg =
    tone === "forest"
      ? "#2C3E2F"
      : tone === "terracotta"
      ? "#C97D4F"
      : tone === "stone"
      ? "#6B6B68"
      : "#7A8B6F";
  const fg = "#F4EFE6";

  return (
    <span
      className={`pfl-monogram ${className}`}
      style={{
        width: size,
        height: size,
        background: bg,
        color: fg,
        fontSize: Math.max(9, size * 0.42),
      }}
      aria-hidden="true"
    >
      {letters}
    </span>
  );
}

/**
 * Byline — the author treatment we apply to every card.
 * Monogram + "THE PLASTICFREELAB TEAM" caps + read time.
 */
export function Byline({
  readingTime,
  monogramSize = 24,
  className = "",
  compact = false,
}: {
  readingTime?: number;
  monogramSize?: number;
  className?: string;
  compact?: boolean;
}) {
  return (
    <div className={`pfl-byline ${compact ? "pfl-byline--compact" : ""} ${className}`}>
      <Monogram size={monogramSize} />
      <span className="pfl-byline__name">The PlasticFreeLab Team</span>
      {typeof readingTime === "number" && (
        <>
          <span className="pfl-byline__sep" aria-hidden>·</span>
          <span className="pfl-byline__time">{readingTime} MIN</span>
        </>
      )}
    </div>
  );
}
