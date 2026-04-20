import { SITE } from "@/lib/content/site";
import { canonical } from "@/lib/seo";
import { JsonLd } from "./JsonLd";

export function ArticleJsonLd({
  path,
  headline,
  description,
  datePublished,
  dateModified,
}: {
  path: string;
  headline: string;
  description: string;
  datePublished: string;
  dateModified: string;
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Article",
        headline,
        description,
        mainEntityOfPage: { "@type": "WebPage", "@id": canonical(path) },
        datePublished,
        dateModified,
        author: {
          "@type": "Organization",
          name: "The PlasticFreeLab Team",
          url: SITE.url,
        },
        publisher: {
          "@type": "Organization",
          name: SITE.name,
          url: SITE.url,
          logo: {
            "@type": "ImageObject",
            url: `${SITE.url}/logo.png`,
          },
        },
      }}
    />
  );
}
