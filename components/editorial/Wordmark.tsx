import Link from "next/link";

export function Wordmark({
  size = "md",
  asLink = true,
  className = "",
}: {
  size?: "sm" | "md" | "lg" | "xl";
  asLink?: boolean;
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

  const inner = (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/brand/mark.svg"
        alt=""
        aria-hidden
        className={`${markSize} shrink-0`}
      />
      <span className="inline-flex items-baseline">
        <span
          className={`font-serif ${sizeClass} text-forest font-semibold tracking-tight`}
          style={{ fontVariationSettings: '"opsz" 144, "SOFT" 40' }}
        >
          PlasticFree
        </span>
        <span
          className={`font-serif ${sizeClass} text-terracotta font-semibold tracking-tight`}
          style={{ fontVariationSettings: '"opsz" 144, "SOFT" 40' }}
        >
          Lab
        </span>
        <span
          aria-hidden
          className="ml-1 mt-1 h-1.5 w-1.5 rounded-full bg-sage self-end mb-2"
        />
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
