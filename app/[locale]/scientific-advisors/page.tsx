import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { TrustPageTemplate } from "@/components/templates/TrustPageTemplate";
import { Monogram } from "@/components/editorial/Monogram";
import { JsonLd } from "@/components/schema/JsonLd";
import { pageMetadata, canonical } from "@/lib/seo";
import { ADVISORS } from "@/lib/content/team";

export const metadata: Metadata = pageMetadata({
  title: "Scientific advisors",
  description:
    "Independent environmental-health scientists review every PlasticFreeLab investigation against the published peer-reviewed literature before publication.",
  path: "/scientific-advisors",
});

export default function AdvisorsIndexPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Scientific advisors — PlasticFreeLab",
          url: canonical("/scientific-advisors"),
          mainEntity: {
            "@type": "ItemList",
            itemListElement: ADVISORS.map((a, i) => ({
              "@type": "ListItem",
              position: i + 1,
              url: canonical(`/scientific-advisors/${a.slug}`),
              name: a.name,
            })),
          },
        }}
      />
      <TrustPageTemplate title="Scientific advisors">
        <p>
          Independent scientists review PlasticFreeLab investigations against
          the published peer-reviewed literature before publication. They are
          not employees and they do not consult for any brand reviewed on the
          site. The reviewer&apos;s editorial-independence letter is on file
          for every advisor and renews annually.
        </p>
        <ul className="!list-none !pl-0 !space-y-8 mt-10">
          {ADVISORS.map((a) => (
            <li key={a.slug} className="flex flex-col sm:flex-row gap-5 not-prose">
              <Monogram size={88} letters={a.initials} tone="forest" />
              <div className="flex-1">
                <h3 className="font-serif text-2xl text-forest leading-tight">
                  <Link
                    href={("/scientific-advisors/" + a.slug) as never}
                    className="!no-underline hover:!underline"
                  >
                    {a.honorificPrefix} {a.name}
                  </Link>
                </h3>
                <p className="caps-label text-stone mt-1">
                  {a.honorificSuffix}
                </p>
                <p className="mt-3 text-charcoal/85 text-[15px] leading-relaxed">
                  {a.shortBio}
                </p>
                {!a.verifiedCredential && (
                  <p className="mt-3 text-[12px] uppercase tracking-[0.14em] text-terracotta">
                    Credential verification pending
                  </p>
                )}
              </div>
            </li>
          ))}
        </ul>
      </TrustPageTemplate>
    </>
  );
}
