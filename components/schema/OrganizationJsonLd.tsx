import { SITE } from "@/lib/content/site";
import { JsonLd } from "./JsonLd";

export function OrganizationJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "Organization",
            "@id": `${SITE.url}#org`,
            name: SITE.name,
            url: SITE.url,
            logo: `${SITE.url}/logo.png`,
          },
          {
            "@type": "WebSite",
            "@id": `${SITE.url}#site`,
            url: SITE.url,
            name: SITE.name,
            publisher: { "@id": `${SITE.url}#org` },
            potentialAction: {
              "@type": "SearchAction",
              target: `${SITE.url}/?q={search_term_string}`,
              "query-input": "required name=search_term_string",
            },
          },
        ],
      }}
    />
  );
}
