import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getHub, hubs } from "@/lib/content/hubs";
import { postsByHub } from "@/lib/content/posts";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { BreadcrumbJsonLd } from "@/components/schema/BreadcrumbJsonLd";
import { EmailCapture } from "@/components/EmailCapture";
import { pageMetadata } from "@/lib/seo";
import { Eyebrow } from "@/components/editorial/Eyebrow";
import { LabRule, DotRule } from "@/components/editorial/DotRule";
import { RankNumeral } from "@/components/editorial/RankNumeral";

const typeLabel: Record<string, string> = {
  pillar: "The Guide",
  comparison: "The Comparison",
  cluster: "The Explainer",
  listicle: "The Audit",
};

export function generateStaticParams() {
  return hubs.map((h) => ({ hub: h.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ hub: string }>;
}): Promise<Metadata> {
  const { hub: hubSlug } = await params;
  const hub = getHub(hubSlug);
  if (!hub) return {};
  return pageMetadata({
    title: hub.name,
    description: hub.oneLiner,
    path: `/guides/${hub.slug}`,
  });
}

export default async function HubPage({
  params,
}: {
  params: Promise<{ hub: string }>;
}) {
  const { hub: hubSlug } = await params;
  const hub = getHub(hubSlug);
  if (!hub) notFound();

  const hubIndex = hubs.findIndex((h) => h.slug === hub.slug);
  const hubPosts = postsByHub(hub.slug);
  const pillar = hubPosts.find((p) => p.postType === "pillar");
  const comparisons = hubPosts.filter((p) => p.postType === "comparison");
  const explainers = hubPosts.filter((p) => p.postType === "cluster");
  const listicles = hubPosts.filter((p) => p.postType === "listicle");

  const crumbs = [
    { label: "Home", href: "/" },
    { label: "Guides", href: "/#issue-contents" },
    { label: hub.name },
  ];

  return (
    <>
      <BreadcrumbJsonLd crumbs={crumbs} />
      <main>
        {/* Hub masthead */}
        <section className="border-b border-forest/10">
          <div className="mx-auto max-w-6xl px-6 pt-10 pb-14 md:pb-20">
            <Breadcrumbs crumbs={crumbs} />

            <div className="mt-8 grid md:grid-cols-12 gap-10 items-end">
              <div className="md:col-span-8">
                <div className="flex items-center gap-4">
                  <span className="rank-numeral !text-[3.5rem]">
                    {String(hubIndex + 1).padStart(2, "0")}
                  </span>
                  <Eyebrow tone="terracotta">Hub {hubIndex + 1} of {hubs.length}</Eyebrow>
                </div>
                <h1 className="display-headline text-forest mt-3 text-[2.5rem] md:text-[3.6rem] leading-[1.02]">
                  {hub.name}
                </h1>
                <p className="mt-6 font-serif italic text-xl md:text-2xl text-charcoal/80 max-w-2xl leading-[1.4]">
                  {hub.oneLiner}
                </p>
              </div>
              <div className="md:col-span-4 md:pl-6 md:border-l md:border-forest/10">
                <Eyebrow tone="stone">Our thesis</Eyebrow>
                <p className="mt-3 text-[14.5px] text-charcoal/85 leading-relaxed">
                  {hub.thesis}
                </p>
                <dl className="mt-5 pt-5 border-t border-forest/10 space-y-2 text-[13px]">
                  <div className="flex justify-between">
                    <dt className="text-stone">Total posts live</dt>
                    <dd className="text-forest tnum">{hubPosts.length}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-stone">Planned in hub</dt>
                    <dd className="text-forest tnum">30</dd>
                  </div>
                </dl>
              </div>
            </div>

            <LabRule className="mt-14" />
          </div>
        </section>

        {/* Start here — pillar */}
        {pillar && (
          <section className="border-b border-forest/10">
            <div className="mx-auto max-w-6xl px-6 py-14 md:py-20">
              <Eyebrow tone="sage">Start here</Eyebrow>
              <h2 className="font-serif text-3xl md:text-4xl text-forest mt-3 mb-8 leading-tight">
                The complete guide.
              </h2>
              <Link
                href={`/${pillar.slug}`}
                className="group block bg-paper border border-forest/15 rounded-sm p-8 md:p-10 shadow-soft hover:shadow-card hover:border-sage/50 transition"
              >
                <Eyebrow tone="terracotta">The Guide</Eyebrow>
                <h3 className="font-serif text-[1.8rem] md:text-[2.2rem] text-forest leading-[1.08] mt-3">
                  {pillar.title}
                </h3>
                <p className="mt-5 text-charcoal/85 text-[15.5px] leading-relaxed max-w-[62ch]">
                  {pillar.description}
                </p>
                <span className="mt-6 inline-flex items-center gap-1.5 text-sage group-hover:text-terracotta transition text-sm font-medium">
                  Read the pillar
                  <span aria-hidden>→</span>
                </span>
              </Link>
            </div>
          </section>
        )}

        {/* Comparisons */}
        {comparisons.length > 0 && (
          <section className="border-b border-forest/10">
            <div className="mx-auto max-w-6xl px-6 py-14 md:py-20">
              <div className="flex items-end justify-between flex-wrap gap-3 mb-8">
                <div>
                  <Eyebrow tone="terracotta">The ranked comparisons</Eyebrow>
                  <h2 className="font-serif text-3xl md:text-4xl text-forest mt-3 leading-tight">
                    What we'd actually buy.
                  </h2>
                </div>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-0 border-t border-forest/10">
                {comparisons.map((p, i) => (
                  <Link
                    key={p.slug}
                    href={`/${p.slug}`}
                    className="group p-6 border-b md:border-b-0 md:border-r border-forest/10 last:border-r-0 hover:bg-cream-deep/40 transition"
                  >
                    <RankNumeral n={i + 1} />
                    <h3 className="font-serif text-xl text-forest leading-tight mt-3 group-hover:text-sage transition">
                      {p.title}
                    </h3>
                    <p className="text-sm text-charcoal/75 mt-2 leading-relaxed line-clamp-3">
                      {p.description}
                    </p>
                    <div className="mt-4 caps-label text-stone">
                      {p.readingTime} min read
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Explainers */}
        {explainers.length > 0 && (
          <section className="border-b border-forest/10">
            <div className="mx-auto max-w-6xl px-6 py-14 md:py-20">
              <Eyebrow tone="sage">The Explainers</Eyebrow>
              <h2 className="font-serif text-3xl md:text-4xl text-forest mt-3 mb-8 leading-tight">
                Plain-English answers to the things people search.
              </h2>
              <ul className="divide-y divide-forest/10 border-y border-forest/10">
                {explainers.map((p) => (
                  <li key={p.slug}>
                    <Link
                      href={`/${p.slug}`}
                      className="group grid md:grid-cols-[auto_1fr_auto] gap-5 py-5 items-baseline hover:bg-cream-deep/30 px-2 transition"
                    >
                      <span className="caps-label text-stone">
                        {typeLabel[p.postType]}
                      </span>
                      <div>
                        <h3 className="font-serif text-lg text-forest group-hover:text-sage transition leading-snug">
                          {p.title}
                        </h3>
                        <p className="text-sm text-charcoal/70 mt-1 line-clamp-1">
                          {p.description}
                        </p>
                      </div>
                      <span className="caps-label text-stone tnum whitespace-nowrap">
                        {p.readingTime} min
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* Listicles */}
        {listicles.length > 0 && (
          <section className="border-b border-forest/10">
            <div className="mx-auto max-w-6xl px-6 py-14 md:py-20">
              <Eyebrow tone="terracotta">The Audits</Eyebrow>
              <h2 className="font-serif text-3xl md:text-4xl text-forest mt-3 mb-8 leading-tight">
                Weekend-ready checklists.
              </h2>
              <div className="grid md:grid-cols-2 gap-0 border-t border-forest/10">
                {listicles.map((p, i) => (
                  <Link
                    key={p.slug}
                    href={`/${p.slug}`}
                    className="group p-6 border-b md:border-b-0 md:border-r border-forest/10 last:border-r-0 hover:bg-cream-deep/40 transition"
                  >
                    <RankNumeral n={i + 1} />
                    <h3 className="font-serif text-xl text-forest leading-tight mt-3 group-hover:text-sage transition">
                      {p.title}
                    </h3>
                    <p className="text-sm text-charcoal/75 mt-2 leading-relaxed line-clamp-2">
                      {p.description}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {hubPosts.length === 0 && (
          <section className="mx-auto max-w-6xl px-6 py-20">
            <p className="text-charcoal/70 text-lg">
              Posts land here as they clear editorial review. See the{" "}
              <Link href="/" className="text-sage underline">
                home page
              </Link>{" "}
              for what's live today.
            </p>
          </section>
        )}

        <section className="bg-cream-deep/50">
          <div className="mx-auto max-w-5xl px-6 py-16">
            <EmailCapture />
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-10">
          <DotRule />
        </section>
      </main>
    </>
  );
}
