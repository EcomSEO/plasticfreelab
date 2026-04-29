import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TrustPageTemplate } from "@/components/templates/TrustPageTemplate";
import { Monogram } from "@/components/editorial/Monogram";
import { JsonLd } from "@/components/schema/JsonLd";
import { pageMetadata, canonical } from "@/lib/seo";
import { SITE } from "@/lib/content/site";
import { ADVISORS, getAdvisor } from "@/lib/content/team";

export function generateStaticParams() {
  return ADVISORS.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const a = getAdvisor(slug);
  if (!a) return {};
  return pageMetadata({
    title: `${a.honorificPrefix} ${a.name} — ${a.jobTitle}`,
    description: a.shortBio,
    path: `/scientific-advisors/${a.slug}`,
  });
}

export default async function AdvisorPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const a = getAdvisor(slug);
  if (!a) notFound();

  const sameAs = [a.professionalRegistryUrl, a.orcidUrl, a.pubmedUrl].filter(
    (x): x is string => Boolean(x),
  );

  // Person schema with hasCredential. Person.image is OMITTED while
  // verifiedCredential is false — no AI-generated headshots ever surface
  // in JSON-LD per the operator-isolation lock.
  const personLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE.url}/scientific-advisors/${a.slug}#person`,
    name: a.name,
    honorificPrefix: a.honorificPrefix || undefined,
    honorificSuffix: a.honorificSuffix,
    url: canonical(`/scientific-advisors/${a.slug}`),
    jobTitle: a.jobTitle,
    description: a.shortBio,
    knowsAbout: a.knowsAbout,
    alumniOf: a.alumniOf.map((x) => ({
      "@type": "EducationalOrganization",
      name: x.name,
    })),
    hasCredential: [
      {
        "@type": "EducationalOccupationalCredential",
        name: a.honorificSuffix,
        credentialCategory: "degree",
      },
    ],
    sameAs,
    affiliation: { "@type": "Organization", "@id": `${SITE.url}#org` },
    ...(a.verifiedCredential && a.imageUrl
      ? { image: `${SITE.url}${a.imageUrl}` }
      : {}),
  };

  return (
    <>
      <JsonLd data={personLd} />
      <TrustPageTemplate title={`${a.honorificPrefix} ${a.name}`}>
        <div className="flex items-start gap-6 not-prose">
          <Monogram size={120} letters={a.initials} tone="forest" />
          <div>
            <p className="caps-label text-stone">{a.jobTitle}</p>
            <p className="mt-2 text-charcoal/80 text-[14px]">
              {a.honorificSuffix} · {a.yearsExperience} years experience
            </p>
          </div>
        </div>

        {!a.verifiedCredential && a.credentialingNote && (
          <div className="mt-5 rounded-sm border border-terracotta/40 bg-terracotta/5 p-3 text-[13px] leading-relaxed text-charcoal/80 not-prose">
            <span className="block font-mono uppercase tracking-[0.14em] text-terracotta text-[10.5px] mb-1">
              Credential pending
            </span>
            {a.credentialingNote}
          </div>
        )}

        <h2>Biography</h2>
        <p>{a.longBio}</p>

        <h2>Conflict-of-interest disclosure</h2>
        <p>{a.noConflictStatement}</p>

        <h2>Areas of focus</h2>
        <ul>
          {a.knowsAbout.map((k) => (
            <li key={k}>{k}</li>
          ))}
        </ul>

        <h2>Education + affiliation</h2>
        <ul>
          {a.alumniOf.map((al) => (
            <li key={al.name}>{al.name}</li>
          ))}
        </ul>

        {sameAs.length > 0 && (
          <>
            <h2>Verifiable profiles</h2>
            <ul>
              {sameAs.map((u) => (
                <li key={u}>
                  <a href={u} target="_blank" rel="noopener noreferrer">
                    {u}
                  </a>
                </li>
              ))}
            </ul>
          </>
        )}

        <h2>Reviews PlasticFreeLab content since</h2>
        <p>{a.reviewsSince}</p>
      </TrustPageTemplate>
    </>
  );
}
