import type { ReactNode } from "react";

type Tone = "terracotta" | "sage" | "forest" | "stone";

export function Eyebrow({
  children,
  tone = "terracotta",
  className = "",
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  const toneClass =
    tone === "sage"
      ? "text-sage"
      : tone === "forest"
      ? "text-forest"
      : tone === "stone"
      ? "text-stone"
      : "text-terracotta";
  return (
    <span className={`eyebrow ${toneClass} ${className}`}>{children}</span>
  );
}
