import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { TrustPageTemplate } from "@/components/templates/TrustPageTemplate";
import { Monogram } from "@/components/editorial/Monogram";
import { JsonLd } from "@/components/schema/JsonLd";
import { pageMetadata, canonical } from "@/lib/seo";
import { AUTHORS } from "@/lib/content/team";

export const metadata: Metadata = pageMetadata({
  title: "Our analysts",
  description:
    "Two named analysts run the PlasticFreeLab editorial desks — investigative product testing on the cookware + water side, and ingredient + label investigation on the personal-care + cleaning side.",
  path: "/authors",
});

export default function AuthorsIndexPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Our analysts — PlasticFreeLab",
          url: canonical("/authors"),
          mainEntity: {
            "@type": "ItemList",
            itemListElement: AUTHORS.map((a, i) => ({
              "@type": "ListItem",
              position: i + 1,
              url: canonical(`/authors/${a.slug}`),
              name: a.name,
            })),
          },
        }}
      />
      <TrustPageTemplate title="Our analysts">
        <p>
          Two named analysts run the PlasticFreeLab editorial desks. Every
          investigation page, every comparison roundup, and every chemical
          explainer is signed by one of them — bylines are real, not house
          aliases.
        </p>
        <ul className="!list-none !pl-0 !space-y-8 mt-10">
          {AUTHORS.map((a) => (
            <li key={a.slug} className="flex flex-col sm:flex-row gap-5 not-prose">
              <Monogram size={88} letters={a.initials} tone={a.accent ?? "forest"} />
              <div className="flex-1">
                <h3 className="font-serif text-2xl text-forest leading-tight">
                  <Link
                    href={("/authors/" + a.slug) as never}
                    className="!no-underline hover:!underline"
                  >
                    {a.name}
                  </Link>
                </h3>
                <p className="caps-label text-stone mt-1">{a.jobTitle}</p>
                <p className="mt-3 text-charcoal/85 text-[15px] leading-relaxed">
                  {a.shortBio}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </TrustPageTemplate>
    </>
  );
}
