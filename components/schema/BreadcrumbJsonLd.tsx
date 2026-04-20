import { canonical } from "@/lib/seo";
import type { Crumb } from "../Breadcrumbs";
import { JsonLd } from "./JsonLd";

export function BreadcrumbJsonLd({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: crumbs.map((c, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: c.label,
          item: c.href ? canonical(c.href) : undefined,
        })),
      }}
    />
  );
}
