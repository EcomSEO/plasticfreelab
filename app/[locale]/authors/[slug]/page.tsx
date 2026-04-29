import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TrustPageTemplate } from "@/components/templates/TrustPageTemplate";
import { Monogram } from "@/components/editorial/Monogram";
import { JsonLd } from "@/components/schema/JsonLd";
import { pageMetadata, canonical } from "@/lib/seo";
import { SITE } from "@/lib/content/site";
import { AUTHORS, getAuthor } from "@/lib/content/team";

export function generateStaticParams() {
  return AUTHORS.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const a = getAuthor(slug);
  if (!a) return {};
  return pageMetadata({
    title: `${a.name} — ${a.jobTitle}`,
    description: a.shortBio,
    path: `/authors/${a.slug}`,
  });
}

export default async function AuthorPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const a = getAuthor(slug);
  if (!a) notFound();

  const personLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE.url}/authors/${a.slug}#person`,
    name: a.name,
    givenName: a.givenName,
    familyName: a.familyName,
    url: canonical(`/authors/${a.slug}`),
    jobTitle: a.jobTitle,
    description: a.shortBio,
    knowsAbout: a.knowsAbout,
    alumniOf: a.alumniOf.map((x) => ({
      "@type": "EducationalOrganization",
      name: x.name,
    })),
    affiliation: { "@type": "Organization", "@id": `${SITE.url}#org` },
    sameAs: a.sameAs,
  };

  return (
    <>
      <JsonLd data={personLd} />
      <TrustPageTemplate title={a.name}>
        <div className="flex items-start gap-6 not-prose">
          <Monogram
            size={120}
            letters={a.initials}
            tone={a.accent ?? "forest"}
          />
          <div>
            <p className="caps-label text-stone">{a.jobTitle}</p>
            <p className="mt-2 text-charcoal/80 text-[14px]">
              {a.yearsExperience} years experience
            </p>
          </div>
        </div>

        <h2>Biography</h2>
        <p>{a.longBio}</p>

        <h2>Areas of focus</h2>
        <ul>
          {a.knowsAbout.map((k) => (
            <li key={k}>{k}</li>
          ))}
        </ul>

        <h2>Education</h2>
        <ul>
          {a.alumniOf.map((al) => (
            <li key={al.name}>{al.name}</li>
          ))}
        </ul>

        {a.sameAs.length > 0 && (
          <>
            <h2>Verifiable profiles</h2>
            <ul>
              {a.sameAs.map((u) => (
                <li key={u}>
                  <a href={u} target="_blank" rel="noopener noreferrer">
                    {u}
                  </a>
                </li>
              ))}
            </ul>
          </>
        )}
      </TrustPageTemplate>
    </>
  );
}
