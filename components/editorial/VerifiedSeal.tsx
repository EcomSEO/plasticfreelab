/**
 * VerifiedSeal — runrepeat-style squared rectangle status pill.
 *
 * Replaces the old round rotating textPath seal (Fraunces, sage/terracotta).
 * Now renders as a flat 2px-radius rectangle, Roboto 700 white text on
 * a colored fill, sized to match the PFL Score "sm" badge so it can stand
 * in as a status indicator on tiles where no score has been published yet.
 *
 * Variants:
 *   - verified          → score-green, "VERIFIED"
 *   - editors-pick      → orange,      "PICK"
 *   - currently-testing → yellow,      "TESTING"  (black text)
 */
type Variant = "verified" | "editors-pick" | "currently-testing";

const VARIANT_COLORS: Record<Variant, { bg: string; text: string }> = {
  verified: { bg: "#098040", text: "#FFFFFF" },
  "editors-pick": { bg: "#F55310", text: "#FFFFFF" },
  "currently-testing": { bg: "#FFB717", text: "#000000" },
};

const VARIANT_LABEL: Record<Variant, string> = {
  verified: "VERIFIED",
  "editors-pick": "PICK",
  "currently-testing": "TESTING",
};

export function VerifiedSeal({
  size = 64,
  variant = "verified",
  label,
  className = "",
}: {
  /** Approximate height in px. Width auto-scales. */
  size?: number;
  variant?: Variant;
  label?: string;
  className?: string;
}) {
  const colors = VARIANT_COLORS[variant];
  const text = label ?? VARIANT_LABEL[variant];

  // Scale font + padding from `size` so existing call sites that passed
  // size=64/96 still produce a reasonable chip.
  const height = Math.max(20, Math.round(size * 0.4));
  const fontSize = Math.max(9, Math.round(size * 0.13));
  const paddingX = Math.round(fontSize * 0.9);

  return (
    <span
      className={`pfl-seal pfl-seal--${variant} ${className}`}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        height,
        padding: `0 ${paddingX}px`,
        background: colors.bg,
        color: colors.text,
        fontFamily: "Roboto, sans-serif",
        fontWeight: 700,
        fontSize,
        letterSpacing: "0.05em",
        textTransform: "uppercase",
        borderRadius: 2,
        lineHeight: 1,
      }}
      aria-hidden="true"
    >
      {text}
    </span>
  );
}
