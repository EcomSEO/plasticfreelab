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

  const inner = (
    <span className={`inline-flex items-baseline ${className}`}>
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
  );

  if (!asLink) return inner;
  return (
    <Link href="/" aria-label="PlasticFreeLab — home" className="inline-block">
      {inner}
    </Link>
  );
}
