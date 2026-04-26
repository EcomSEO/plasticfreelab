import Link from "next/link";

/**
 * Wordmark — runrepeat-style text logo.
 *
 * variant="light" (default): ink + orange text (light/white backgrounds).
 * variant="dark":            white + white text (dark masthead bg).
 *
 * Roboto throughout. The leaf SVG inherits the variant color.
 */
export function Wordmark({
  size = "md",
  asLink = true,
  variant = "light",
  className = "",
}: {
  size?: "sm" | "md" | "lg" | "xl";
  asLink?: boolean;
  variant?: "light" | "dark";
  className?: string;
}) {
  const sizeClass =
    size === "xl"
      ? "text-5xl md:text-6xl"
      : size === "lg"
      ? "text-4xl md:text-5xl"
      : size === "sm"
      ? "text-xl"
      : "text-2xl";

  const markSize =
    size === "xl"
      ? "h-10 w-10 md:h-12 md:w-12"
      : size === "lg"
      ? "h-9 w-9 md:h-10 md:w-10"
      : size === "sm"
      ? "h-5 w-5"
      : "h-7 w-7 md:h-8 md:w-8";

  const isDark = variant === "dark";
  const primaryColor = isDark ? "#FFFFFF" : "#1A3338";
  const accentColor = isDark ? "#FFFFFF" : "#F55310";
  const filter = isDark ? "brightness(0) invert(1)" : undefined;

  const inner = (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/brand/mark.svg"
        alt=""
        aria-hidden
        className={`${markSize} shrink-0`}
        style={filter ? { filter } : undefined}
      />
      <span className="inline-flex items-baseline">
        <span
          className={sizeClass}
          style={{
            fontFamily: "Roboto, sans-serif",
            fontWeight: 700,
            color: primaryColor,
            letterSpacing: 0,
          }}
        >
          PlasticFree
        </span>
        <span
          className={sizeClass}
          style={{
            fontFamily: "Roboto, sans-serif",
            fontWeight: isDark ? 400 : 700,
            color: accentColor,
            letterSpacing: 0,
          }}
        >
          Lab
        </span>
      </span>
    </span>
  );

  if (!asLink) return inner;
  return (
    <Link href="/" aria-label="PlasticFreeLab — home" className="inline-block">
      {inner}
    </Link>
  );
}
