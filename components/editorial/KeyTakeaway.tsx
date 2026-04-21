import type { ReactNode } from "react";

type Variant = "key-takeaway" | "watch-out" | "method" | "our-take";

const config: Record<
  Variant,
  { label: string; border: string; bg: string; dot: string }
> = {
  "key-takeaway": {
    label: "Key takeaway",
    border: "border-sage",
    bg: "bg-sage/8",
    dot: "bg-sage",
  },
  "watch-out": {
    label: "Watch out",
    border: "border-terracotta",
    bg: "bg-terracotta/8",
    dot: "bg-terracotta",
  },
  method: {
    label: "Method note",
    border: "border-forest",
    bg: "bg-forest/5",
    dot: "bg-forest",
  },
  "our-take": {
    label: "Our take",
    border: "border-sage",
    bg: "bg-cream-deep/60",
    dot: "bg-sage",
  },
};

export function KeyTakeaway({
  variant = "key-takeaway",
  title,
  children,
}: {
  variant?: Variant;
  title?: string;
  children: ReactNode;
}) {
  const c = config[variant];
  return (
    <aside
      className={`my-8 border-l-[3px] ${c.border} ${c.bg} pl-5 pr-5 py-5 rounded-r`}
    >
      <div className="flex items-center gap-2 mb-2">
        <span className={`h-1.5 w-1.5 rounded-full ${c.dot}`} />
        <span className="caps-label text-forest">{title ?? c.label}</span>
      </div>
      <div className="text-[15.5px] text-charcoal/90 leading-relaxed">
        {children}
      </div>
    </aside>
  );
}
