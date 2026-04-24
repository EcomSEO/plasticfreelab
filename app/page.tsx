import Link from "next/link";
import { hubs, getHub } from "@/lib/content/hubs";
import { featuredPost, latestPosts, posts } from "@/lib/content/posts";
import { Eyebrow } from "@/components/editorial/Eyebrow";
import { DotRule, LabRule } from "@/components/editorial/DotRule";
import { RankNumeral } from "@/components/editorial/RankNumeral";
import { EmailCapture } from "@/components/EmailCapture";
import { HeroMasthead } from "@/components/HeroMasthead";
import { PinnedInvestigation } from "@/components/PinnedInvestigation";
import { IssueBanner } from "@/components/editorial/IssueBanner";
import { SignatureDivider } from "@/components/editorial/SignatureDivider";
import { MagazineGrid } from "@/components/MagazineGrid";
import { InvestigationTiles } from "@/components/InvestigationTiles";
import { EditorialBoard } from "@/components/EditorialBoard";
import { LabNotebook } from "@/components/LabNotebook";
import { BackToMasthead } from "@/components/BackToMasthead";
import { Byline } from "@/components/editorial/Monogram";

const typeLabel: Record<string, string> = {
  pillar: "The Guide",
  comparison: "The Comparison",
  cluster: "The Explainer",
  listicle: "The Audit",
};

export default function HomePage() {
  const featured = featuredPost();
  const recent = latestPosts(6);
  const comparisons = posts.filter((p) => p.postType === "comparison").slice(0, 3);
  const explainers = posts.filter((p) => p.postType === "cluster").slice(0, 3);
  const pillars = posts.filter((p) => p.postType === "pillar").slice(0, 3);

  const issueItems = [
    featured,
    ...comparisons.filter((c) => c.slug !== featured?.slug),
  ]
    .slice(0, 4)
    .filter((p): p is NonNullable<typeof p> => Boolean(p))
    .map((p) => ({ post: p, hub: getHub(p.hub) }));

  // ---- Magazine grid slots ------------------------------------------------
  // Left: the featured investigation (falls back to first comparison).
  const magFeaturedPost = featured ?? comparisons[0] ?? posts[0]!;
  const magFeatured = { post: magFeaturedPost, hub: getHub(magFeaturedPost.hub) };

  // Center: a vertical list of 7 headlines covering a mix of pillars +
  // comparisons + clusters, excluding whatever sits in the featured slot.
  const seen = new Set<string>([magFeaturedPost.slug]);
  const mixed: Array<{ post: (typeof posts)[number]; hub: ReturnType<typeof getHub> }> = [];
  const pushUnique = (pool: typeof posts) => {
    for (const p of pool) {
      if (seen.has(p.slug)) continue;
      mixed.push({ post: p, hub: getHub(p.hub) });
      seen.add(p.slug);
      if (mixed.length >= 7) return;
    }
  };
  pushUnique(pillars);
  pushUnique(comparisons);
  pushUnique(explainers);
  pushUnique(posts); // fill remainder in declared order

  const magHeadlines = mixed.slice(0, 7);

  // Right: 3 "currently testing" cards.
  const testingPool = posts.filter((p) => !seen.has(p.slug));
  const magTesting = (testingPool.length >= 3 ? testingPool : posts)
    .slice(0, 3)
    .map((p) => ({ post: p, hub: getHub(p.hub) }));

  return (
    <main className="home-warmshift">
      {/* === HERO: extreme editorial masthead ===
          Fluid-scale (clamp) Fraunces headline with an enlarged
          Instrument Serif italic "quietly" as the signature moment.
          Botanical SVG responds to cursor proximity. Vertical sage
          rule in the left gutter. Floating footnote in the right
          gutter (≥lg). Staggered post-intro cascade. */}
      <HeroMasthead issueItems={issueItems} />

      {/* === ISSUE BANNER — thin sage strip below the masthead === */}
      <IssueBanner />

      {/* === MAGAZINE GRID — density below the hero === */}
      <MagazineGrid
        featured={magFeatured}
        headlines={magHeadlines}
        testing={magTesting}
      />

      {/* === SHOP THE INVESTIGATIONS — 4-up category row === */}
      <InvestigationTiles />

      {/* === FEATURED INVESTIGATION — pinned, scroll-narrated ===
          The signature scroll moment: headline & three claims pin
          while the reader scrolls, each claim activating in sequence.
          On the final beat, the featured card arrives with a
          bleed-right grid break; byline set vertical in the gutter. */}
      {featured && (
        <PinnedInvestigation post={featured} hub={getHub(featured.hub)} />
      )}

      {/* === SIGNATURE DIVIDER === */}
      <div className="mx-auto max-w-6xl px-6">
        <SignatureDivider label="— § —" />
      </div>

      {/* === THE FIVE HUBS — editorial index === */}
      <section id="issue-contents" className="border-b border-forest/10" data-reveal>
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
          <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
            <div>
              <Eyebrow tone="sage">The Table of Contents</Eyebrow>
              <h2 className="font-serif text-3xl md:text-4xl text-forest mt-3 leading-tight" data-balance>
                Five hubs.{" "}
                <span className="font-instrument italic text-terracotta">
                  One hundred and fifty
                </span>{" "}
                posts on the way.
              </h2>
            </div>
            <Link
              href="/about"
              className="text-sage hover:text-terracotta text-sm font-medium"
            >
              Why we built it this way →
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-0 border-t border-forest/10">
            {hubs.map((hub, i) => (
              <Link
                key={hub.slug}
                href={`/guides/${hub.slug}`}
                className="group relative flex flex-col p-6 border-b lg:border-b-0 lg:border-r border-forest/10 last:border-r-0 hover:bg-cream-deep/40 transition"
              >
                <span className="rank-numeral !text-4xl mb-3">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-serif text-xl text-forest leading-tight mb-2">
                  {hub.name}
                </h3>
                <p className="text-sm text-charcoal/70 leading-relaxed flex-1">
                  {hub.oneLiner}
                </p>
                <span className="mt-5 inline-flex items-center gap-1 text-sage group-hover:text-terracotta text-xs font-medium uppercase tracking-[0.14em]">
                  Open hub
                  <span aria-hidden>→</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* === EDITORIAL BOARD — trust signal === */}
      <EditorialBoard />

      {/* === LAB NOTEBOOK — Q&A dialogue block === */}
      <LabNotebook />

      {/* === LATEST — editorial two-column with choreographed hover === */}
      <section className="border-b border-forest/10" data-reveal>
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
          <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
            <div>
              <Eyebrow tone="terracotta">The Latest</Eyebrow>
              <h2 className="font-serif text-3xl md:text-4xl text-forest mt-3 leading-tight" data-balance>
                Freshly tested, freshly cited.
              </h2>
            </div>
          </div>

          <div className="grid md:grid-cols-12 gap-10">
            {recent[0] && (
              <article className="md:col-span-7">
                <Link href={`/${recent[0].slug}`} className="group block">
                  <div className="aspect-[16/9] bg-gradient-to-br from-sage/20 via-cream-deep to-terracotta/15 rounded-sm mb-5 relative overflow-hidden border border-forest/10">
                    <div className="absolute bottom-5 left-5">
                      <span className="caps-label text-forest bg-paper/80 backdrop-blur px-2 py-1 rounded-sm">
                        {typeLabel[recent[0].postType]}
                      </span>
                    </div>
                    <svg
                      className="absolute top-5 right-5 text-sage/50"
                      width="44"
                      height="44"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      aria-hidden
                    >
                      <path d="M6 2L12 8L18 2" />
                      <path d="M6 14C6 10 9 8 12 8C15 8 18 10 18 14V22H6V14Z" />
                    </svg>
                  </div>
                  <h3 className="font-serif text-2xl md:text-3xl text-forest leading-[1.12] group-hover:text-terracotta transition" data-balance>
                    {recent[0].title}
                  </h3>
                  <p className="mt-3 text-charcoal/80 text-[15.5px] leading-relaxed line-clamp-3">
                    {recent[0].description}
                  </p>
                  <div className="mt-4">
                    <Byline readingTime={recent[0].readingTime} />
                  </div>
                </Link>
              </article>
            )}

            {/* Stack of 4 recent — editorial hover choreography */}
            <div className="md:col-span-5 space-y-0">
              {recent.slice(1, 5).map((p) => (
                <Link
                  key={p.slug}
                  href={`/${p.slug}`}
                  className="post-card-edit group"
                >
                  <div className="caps-label text-stone mb-1.5">
                    {typeLabel[p.postType]} · {getHub(p.hub)?.shortName}
                  </div>
                  <h3 className="post-card-edit__title font-serif text-lg text-forest leading-snug">
                    {p.title}
                  </h3>
                  <p className="mt-1.5 text-[13.5px] text-charcoal/70 leading-snug line-clamp-2">
                    {p.description}
                  </p>
                  <div className="mt-2">
                    <Byline readingTime={p.readingTime} compact />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* === THE CREDO — what we stand for (dusk is falling) === */}
      <section className="border-b border-forest/10 bg-forest text-cream credo-dusk" data-reveal>
        <div className="mx-auto max-w-5xl px-6 py-20 md:py-28 relative">
          <div className="absolute top-8 left-6 right-6">
            <LabRule className="text-sage-light" />
          </div>
          <Eyebrow tone="terracotta" className="!text-terracotta">The Credo</Eyebrow>
          <h2 className="font-serif text-3xl md:text-4xl mt-4 leading-[1.15] text-cream" data-balance>
            <span className="font-instrument italic text-sage-light">
              We promise
            </span>{" "}
            a site where every claim is sourced, every ranking is earned, and
            every product we reject is named.
          </h2>
          <div className="grid md:grid-cols-3 gap-10 mt-12">
            <div>
              <div className="rank-numeral !text-sage-light mb-2">01</div>
              <h3 className="font-serif text-xl text-cream mb-2">Every claim cited.</h3>
              <p className="text-cream/80 text-[14.5px] leading-relaxed">
                If it isn&apos;t in a peer-reviewed paper, a regulatory filing, or a
                manufacturer disclosure, it doesn&apos;t publish.
              </p>
            </div>
            <div>
              <div className="rank-numeral !text-sage-light mb-2">02</div>
              <h3 className="font-serif text-xl text-cream mb-2">Methodology, open.</h3>
              <p className="text-cream/80 text-[14.5px] leading-relaxed">
                Every comparison explains how we picked, what we verified, and
                who disagrees with us, and why.
              </p>
            </div>
            <div>
              <div className="rank-numeral !text-sage-light mb-2">03</div>
              <h3 className="font-serif text-xl text-cream mb-2">No paid rankings.</h3>
              <p className="text-cream/80 text-[14.5px] leading-relaxed">
                Commissions pay for the testing. They have never, and will
                never, buy a position on this page.
              </p>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-sage-light/30">
            <Link
              href="/editorial-standards"
              className="inline-flex items-center gap-1.5 text-sage-light hover:text-terracotta text-sm font-medium"
            >
              Read our full editorial standards
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* === EXPLAINERS === */}
      {explainers.length > 0 && (
        <section className="border-b border-forest/10" data-reveal>
          <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
            <div className="flex items-end justify-between mb-8 flex-wrap gap-3">
              <div>
                <Eyebrow tone="sage">The Explainers</Eyebrow>
                <h2 className="font-serif text-3xl text-forest mt-3 leading-tight" data-balance>
                  The terms you keep seeing, in plain English.
                </h2>
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-0 border-t border-forest/10">
              {explainers.map((p, i) => (
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
                  <div className="mt-4">
                    <Byline readingTime={p.readingTime} compact />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* === NEWSLETTER === */}
      <section className="bg-cream-deep/60 border-b border-forest/10" data-reveal>
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-20">
          <div className="text-center mb-8">
            <Eyebrow tone="terracotta">The Dispatch</Eyebrow>
            <h2 className="font-serif text-3xl md:text-[2.5rem] text-forest mt-3 leading-[1.1] max-w-2xl mx-auto" data-balance>
              One calm, cited email every week.
            </h2>
            <p className="mt-5 text-charcoal/80 text-[15.5px] max-w-xl mx-auto leading-relaxed">
              No scare headlines. No daily fire-hose. One thing we verified or
              changed our mind about, every Tuesday morning. Plus the free
              Kitchen Swap Audit when you subscribe.
            </p>
          </div>
          <EmailCapture />
        </div>
      </section>

      {/* === CLOSING DATELINE === */}
      <section data-reveal>
        <div className="mx-auto max-w-6xl px-6 py-10">
          <DotRule className="rule-draw" />
          <p className="text-center caps-label text-stone mt-6">
            Last updated · {new Date().toLocaleString("en-US", { month: "long", day: "numeric", year: "numeric" })}
          </p>
        </div>
      </section>

      {/* === BACK-TO-MASTHEAD FAB === */}
      <BackToMasthead />
    </main>
  );
}
