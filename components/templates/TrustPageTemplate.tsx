import { ReactNode } from "react";
import { Breadcrumbs } from "../Breadcrumbs";

export function TrustPageTemplate({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <article className="mx-auto max-w-3xl px-6 py-12 md:py-16">
      <Breadcrumbs
        crumbs={[{ label: "Home", href: "/" }, { label: title }]}
      />
      <h1 className="font-serif text-4xl md:text-5xl text-forest mt-4 leading-tight">
        {title}
      </h1>
      <div className="mt-8 space-y-6 text-[17px] leading-relaxed text-charcoal/90 [&_h2]:font-serif [&_h2]:text-2xl [&_h2]:text-forest [&_h2]:mt-10 [&_h2]:mb-3 [&_h3]:font-serif [&_h3]:text-xl [&_h3]:text-forest [&_h3]:mt-6 [&_h3]:mb-2 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:space-y-2 [&_a]:text-sage [&_a]:underline [&_strong]:text-forest">
        {children}
      </div>
    </article>
  );
}
