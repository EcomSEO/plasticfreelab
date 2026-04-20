import { ReactNode } from "react";

type Variant = "note" | "key-takeaway" | "warning" | "source";

const variantClass: Record<Variant, string> = {
  note: "border-sage bg-sage/5",
  "key-takeaway": "border-forest bg-cream",
  warning: "border-terracotta bg-terracotta/5",
  source: "border-charcoal/20 bg-white/60",
};

const variantLabel: Record<Variant, string> = {
  note: "Note",
  "key-takeaway": "Key takeaway",
  warning: "Heads up",
  source: "Source",
};

export function Callout({
  variant = "note",
  title,
  children,
}: {
  variant?: Variant;
  title?: string;
  children: ReactNode;
}) {
  return (
    <aside
      className={`border-l-4 rounded-r px-5 py-4 my-6 ${variantClass[variant]}`}
    >
      <p className="font-serif text-sm text-forest mb-1">
        {title ?? variantLabel[variant]}
      </p>
      <div className="text-charcoal/90 text-[15px] leading-relaxed">{children}</div>
    </aside>
  );
}
