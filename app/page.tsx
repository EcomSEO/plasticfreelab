import Link from "next/link";
import { hubs } from "@/lib/content/hubs";
import { featuredPost, latestPosts, posts } from "@/lib/content/posts";
import { getHub } from "@/lib/content/hubs";
import { Eyebrow } from "@/components/editorial/Eyebrow";
import { DotRule, LabRule } from "@/components/editorial/DotRule";
import { RankNumeral } from "@/components/editorial/RankNumeral";
import { EmailCapture } from "@/components/EmailCapture";

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

  return (
    <main>
      {/* === HERO: editorial front page === */}
      <section className="hero-light border-b border-forest/10">
        <div className="mx-auto max-w-6xl px-6 pt-14 md:pt-20 pb-14 md:pb-20">
          <div className="grid md:grid-cols-12 gap-10 items-start">
            <div className="md:col-span-8">
              <div className="stagger-1">
                <Eyebrow tone="terracotta">
                  Issue No. 01 &nbsp;·&nbsp; The Launch Edition
                </Eyebrow>
              </div>
              <h1 className="display-headline text-forest mt-5 text-[2.75rem] sm:text-5xl md:text-[4.25rem] leading-[1.02]">
                <span className="stagger-2 block">
                  Calm, cited guides to the things
                </span>
                <span className="stagger-3 block">
                  <em className="not-italic text-terracotta quiet-accent">
                    quietly
                  </em>{" "}
                  leaching into your house.
                </span>
              </h1>
              <p className="stagger-4 mt-7 text-lg md:text-xl text-charcoal/85 max-w-2xl leading-[1.55]">
                PlasticFreeLab reads the studies, tests the swaps, and publishes
                what we'd tell a friend — with sources. No scolding, no
                lifestyle pastel, no "10 shocking toxins" fear bait.
              </p>
              <div className="stagger-5 mt-9 flex flex-wrap gap-3">
                <Link href="/guides/non-toxic-kitchen" className="btn-primary">
                  Start with the kitchen
                  <span aria-hidden>→</span>
                </Link>
                <Link href="#issue-contents" className="btn-secondary">
                  In this issue
                </Link>
              </div>
            </div>

            {/* Editorial "in this issue" sidebar — items walk down one by one */}
            <aside className="md:col-span-4 md:pl-8 md:border-l md:border-forest/10">
              <div className="eyebrow text-stone mb-4 stagger-3">
                In this issue
              </div>
              <ul className="space-y-4">
                {[featured, ...comparisons.filter((c) => c.slug !== featured?.slug)]
                  .slice(0, 4)
                  .filter((p): p is NonNullable<typeof p> => Boolean(p))
                  .map((p, i) => {
                    const hub = getHub(p.hub);
                    return (
                      <li key={p.slug} className="issue-item flex gap-3">
                        <span className="rank-numeral !text-xl !text-sage/50 tnum shrink-0">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <div>
                          <Link
                            href={`/${p.slug}`}
                            className="font-serif text-[17px] leading-snug text-forest hover:text-sage transition block"
                          >
                            {p.title}
                          </Link>
                          <div className="text-[11px] uppercase tracking-[0.14em] text-stone mt-1">
                            {hub?.shortName} · {p.readingTime} min
                          </div>
                        </div>
                      </li>
                    );
                  })}
              </ul>
            </aside>
          </div>
        </div>
      </section>

      {/* === FEATURED INVESTIGATION === */}
      {featured && (
        <section className="border-b border-forest/10 bg-cream-deep/30" data-reveal>
          <div className="mx-auto max-w-6xl px-6 py-14 md:py-20">
            <div className="grid md:grid-cols-12 gap-10 items-start">
              <div className="md:col-span-5">
                <Eyebrow tone="terracotta">The Investigation</Eyebrow>
                <h2 className="font-serif text-3xl md:text-4xl text-forest mt-4 leading-[1.1]">
                  The one we're pushing this month.
                </h2>
                <p className="mt-5 text-charcoal/75 text-[15px] leading-relaxed">
                  Every month we anchor one long read — the post that took real
                  testing, real reading, and a willingness to name names. This
                  one has been on our lab bench for six weeks.
                </p>
              </div>

              <article className="md:col-span-7">
                <Link
                  href={`/${featured.slug}`}
                  className="group block bg-paper border border-forest/15 rounded-sm p-8 md:p-10 shadow-soft hover:shadow-card hover:border-sage/60 transition"
                >
                  <div className="flex items-center gap-3 mb-5">
                    <span className="tier-badge">Editor's pick</span>
                    <span className="caps-label text-stone">
                      {getHub(featured.hub)?.shortName} · {featured.readingTime} min read
                    </span>
                  </div>
                  <h3 className="font-serif text-[1.9rem] md:text-[2.3rem] leading-[1.08] text-forest">
                    {featured.title}
                  </h3>
                  <p className="mt-5 text-charcoal/80 text-[15.5px] leading-relaxed">
                    {featured.description}
                  </p>
                  {featured.ourPick && (
                    <div className="mt-6 flex items-center gap-3 pt-5 border-t border-forest/10">
                      <span className="caps-label text-stone shrink-0">Our pick</span>
                      <span className="font-serif text-forest text-lg">
                        {featured.ourPick.name}
                      </span>
                    </div>
                  )}
                  <span className="mt-6 inline-flex items-center gap-1.5 text-sage group-hover:text-terracotta transition text-sm font-medium">
                    Read the full comparison
                    <span aria-hidden>→</span>
                  </span>
                </Link>
              </article>
            </div>
          </div>
        </section>
      )}

      {/* === THE FIVE HUBS — editorial index === */}
      <section id="issue-contents" className="border-b border-forest/10" data-reveal>
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
          <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
            <div>
              <Eyebrow tone="sage">The Table of Contents</Eyebrow>
              <h2 className="font-serif text-3xl md:text-4xl text-forest mt-3 leading-tight">
                Five hubs. One hundred and fifty posts on the way.
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

      {/* === LATEST — two-column editorial === */}
      <section className="border-b border-forest/10" data-reveal>
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
          <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
            <div>
              <Eyebrow tone="terracotta">The Latest</Eyebrow>
              <h2 className="font-serif text-3xl md:text-4xl text-forest mt-3 leading-tight">
                Freshly tested, freshly cited.
              </h2>
            </div>
          </div>

          <div className="grid md:grid-cols-12 gap-10">
            {/* Big feature — first recent */}
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
                  <h3 className="font-serif text-2xl md:text-3xl text-forest leading-[1.12] group-hover:text-terracotta transition">
                    {recent[0].title}
                  </h3>
                  <p className="mt-3 text-charcoal/80 text-[15.5px] leading-relaxed line-clamp-3">
                    {recent[0].description}
                  </p>
                  <div className="mt-4 caps-label text-stone">
                    {getHub(recent[0].hub)?.shortName} · {recent[0].readingTime} min read
                  </div>
                </Link>
              </article>
            )}

            {/* Stack of 4 recent headlines */}
            <div className="md:col-span-5 space-y-0">
              {recent.slice(1, 5).map((p) => (
                <article
                  key={p.slug}
                  className="py-5 border-b border-forest/10 first:border-t first:pt-0 first:mt-0 last:border-b-0"
                >
                  <Link href={`/${p.slug}`} className="group block">
                    <div className="caps-label text-stone mb-1.5">
                      {typeLabel[p.postType]} · {getHub(p.hub)?.shortName}
                    </div>
                    <h3 className="font-serif text-lg text-forest leading-snug group-hover:text-sage transition">
                      {p.title}
                    </h3>
                    <p className="mt-1.5 text-[13.5px] text-charcoal/70 leading-snug line-clamp-2">
                      {p.description}
                    </p>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* === THE CREDO — what we stand for === */}
      <section className="border-b border-forest/10 bg-forest text-cream relative overflow-hidden" data-reveal>
        <div className="mx-auto max-w-5xl px-6 py-20 md:py-28 relative">
          <div className="absolute top-8 left-6 right-6">
            <LabRule className="text-sage-light" />
          </div>
          <Eyebrow tone="terracotta" className="!text-terracotta">The Credo</Eyebrow>
          <h2 className="font-serif text-3xl md:text-4xl mt-4 leading-[1.15] text-cream">
            <span className="text-sage-light">We promise</span> a site where
            every claim is sourced, every ranking is earned, and every product
            we reject is named.
          </h2>
          <div className="grid md:grid-cols-3 gap-10 mt-12">
            <div>
              <div className="rank-numeral !text-sage-light mb-2">01</div>
              <h3 className="font-serif text-xl text-cream mb-2">Every claim cited.</h3>
              <p className="text-cream/80 text-[14.5px] leading-relaxed">
                If it isn't in a peer-reviewed paper, a regulatory filing, or a
                manufacturer disclosure, it doesn't publish.
              </p>
            </div>
            <div>
              <div className="rank-numeral !text-sage-light mb-2">02</div>
              <h3 className="font-serif text-xl text-cream mb-2">Methodology, open.</h3>
              <p className="text-cream/80 text-[14.5px] leading-relaxed">
                Every comparison explains how we picked, what we verified, and
                who disagrees with us — and why.
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
                <h2 className="font-serif text-3xl text-forest mt-3 leading-tight">
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
            <h2 className="font-serif text-3xl md:text-[2.5rem] text-forest mt-3 leading-[1.1] max-w-2xl mx-auto">
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
    </main>
  );
}
