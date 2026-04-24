/**
 * VerifiedSeal — round editorial stamp with circular text path.
 *
 * Signature graphic. Rendered as inline SVG so it scales cleanly
 * and inherits currentColor. The outer ring carries the PFL
 * verification text along a circular path. The inner disk holds
 * the brand mark: "PFL" in Fraunces on sage with a terracotta dot.
 *
 * The outer text ring rotates slowly (20s, infinite) — ONLY when
 * the user has not requested reduced motion. The inner disk stays
 * still, so there's no perceived flicker.
 *
 * Variants:
 *   - verified         → sage stroke, standard
 *   - editors-pick     → terracotta accent ring
 *   - currently-testing→ stone dashed ring
 */
type Variant = "verified" | "editors-pick" | "currently-testing";

export function VerifiedSeal({
  size = 96,
  variant = "verified",
  label,
  className = "",
}: {
  size?: number;
  variant?: Variant;
  /** Custom perimeter text. Defaults vary by variant. */
  label?: string;
  className?: string;
}) {
  const id = `seal-${variant}-${size}`;
  const pathId = `${id}-path`;

  const defaultLabel =
    variant === "editors-pick"
      ? "PLASTICFREELAB · EDITOR'S PICK · MMXXVI · "
      : variant === "currently-testing"
      ? "PLASTICFREELAB · CURRENTLY TESTING · MMXXVI · "
      : "PLASTICFREELAB · VERIFIED NON-TOXIC · MMXXVI · ";

  const ringText = (label ?? defaultLabel).repeat(1);
  // Repeat until the text wraps the full circumference comfortably.
  const repeatedText = `${ringText}${ringText}`;

  const stroke =
    variant === "editors-pick"
      ? "#C97D4F"
      : variant === "currently-testing"
      ? "#6B6B68"
      : "#7A8B6F";

  const innerFill = "#FBF8F1";
  const markBg =
    variant === "editors-pick"
      ? "#C97D4F"
      : variant === "currently-testing"
      ? "#6B6B68"
      : "#7A8B6F";

  const dashed = variant === "currently-testing";

  // The text path is a circle; SVG text on path lays out along its length.
  // We use a nearly-full circle (radius slightly inside the outer ring).
  const cx = size / 2;
  const cy = size / 2;
  const rOuter = size / 2 - 1;
  const rTextPath = size / 2 - 8;
  const rInner = size / 2 - 16;
  const fontSize = Math.max(6, size * 0.085);

  return (
    <span
      className={`pfl-seal pfl-seal--${variant} ${className}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <svg
        viewBox={`0 0 ${size} ${size}`}
        width={size}
        height={size}
        className="pfl-seal__svg"
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

        {/* Outer ring */}
        <circle
          cx={cx}
          cy={cy}
          r={rOuter}
          fill="none"
          stroke={stroke}
          strokeWidth={1}
          strokeDasharray={dashed ? "2 3" : undefined}
          opacity={0.85}
        />

        {/* Rotating text ring — class target for CSS rotation */}
        <g className="pfl-seal__ring">
          <text
            fill={stroke}
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 600,
              fontSize,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
            }}
          >
            <textPath href={`#${pathId}`} startOffset="0%">
              {repeatedText}
            </textPath>
          </text>
        </g>

        {/* Inner disk */}
        <circle cx={cx} cy={cy} r={rInner} fill={innerFill} />
        <circle
          cx={cx}
          cy={cy}
          r={rInner - 1}
          fill="none"
          stroke={stroke}
          strokeWidth={0.6}
          opacity={0.45}
        />

        {/* Mark chip */}
        <circle cx={cx} cy={cy - 1} r={rInner - 8} fill={markBg} />
        <text
          x={cx}
          y={cy + fontSize * 0.5}
          textAnchor="middle"
          fill="#FBF8F1"
          style={{
            fontFamily: "Fraunces, Georgia, serif",
            fontWeight: 700,
            fontSize: fontSize * 1.75,
            letterSpacing: "-0.02em",
          }}
        >
          PFL
        </text>
        {/* Terracotta accent dot */}
        <circle
          cx={cx + fontSize * 1.35}
          cy={cy + fontSize * 0.55}
          r={Math.max(1.2, fontSize * 0.18)}
          fill="#C97D4F"
        />
      </svg>
    </span>
  );
}
