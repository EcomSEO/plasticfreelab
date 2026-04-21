import type { ReactNode } from "react";

export function PullQuote({
  children,
  attribution,
}: {
  children: ReactNode;
  attribution?: string;
}) {
  return (
    <figure className="my-10 md:my-14 border-l-2 border-sage pl-6 md:pl-10 max-w-2xl">
      <blockquote className="font-serif text-2xl md:text-[1.65rem] leading-[1.3] text-forest italic">
        <span
          aria-hidden
          className="mr-1 font-serif text-sage/70 text-4xl leading-none align-[-0.2em]"
        >
          “
        </span>
        {children}
      </blockquote>
      {attribution && (
        <figcaption className="mt-4 caps-label">— {attribution}</figcaption>
      )}
    </figure>
  );
}
