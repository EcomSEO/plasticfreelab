import { getTranslations, getLocale, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { hubs, getHub, tHub } from "@/lib/content/hubs";
import { tPost, featuredPost, latestPosts, posts } from "@/lib/content/posts";
import { hasLocale } from "next-intl";
import { routing, type Locale } from "@/i18n/routing";
import { notFound } from "next/navigation";
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

const DATE_LOCALE: Record<string, string> = {
  en: "en-US",
  de: "de-DE",
  fr: "fr-FR",
};

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!hasLocale(routing.locales, raw)) notFound();
  setRequestLocale(raw as Locale);
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("postType");
  const tHomeHubs = await getTranslations("homeHubs");
  const tLatest = await getTranslations("latest");
  const tCredo = await getTranslations("credo");
  const tExp = await getTranslations("explainers");
  const tNL = await getTranslations("newsletterBlock");
  const tCommon = await getTranslations("common");

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

  const magFeaturedPost = featured ?? comparisons[0] ?? posts[0]!;
  const magFeatured = { post: magFeaturedPost, hub: getHub(magFeaturedPost.hub) };

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
  pushUnique(posts);

  const magHeadlines = mixed.slice(0, 7);

  const testingPool = posts.filter((p) => !seen.has(p.slug));
  const magTesting = (testingPool.length >= 3 ? testingPool : posts)
    .slice(0, 3)
    .map((p) => ({ post: p, hub: getHub(p.hub) }));

  return (
    <main className="home-warmshift">
      <HeroMasthead issueItems={issueItems} />
      <IssueBanner />

      <MagazineGrid
        featured={magFeatured}
        headlines={magHeadlines}
        testing={magTesting}
      />

      <InvestigationTiles />

      {featured && (
        <PinnedInvestigation post={featured} hub={getHub(featured.hub)} />
      )}

      <div className="mx-auto max-w-6xl px-6">
        <SignatureDivider label="— § —" />
      </div>

      {/* === THE FIVE HUBS — editorial index === */}
      <section id="issue-contents" className="border-b border-forest/10" data-reveal>
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
          <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
            <div>
              <Eyebrow tone="sage">{tHomeHubs("eyebrow")}</Eyebrow>
              <h2 className="font-serif text-3xl md:text-4xl text-forest mt-3 leading-tight" data-balance>
                {tHomeHubs("title.before")}{" "}
                <span className="font-instrument italic text-terracotta">
                  {tHomeHubs("title.italic")}
                </span>{" "}
                {tHomeHubs("title.after")}
              </h2>
            </div>
            <Link
              href="/about"
              className="text-sage hover:text-terracotta text-sm font-medium"
            >
              {tHomeHubs("linkAbout")}
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-0 border-t border-forest/10">
            {hubs.map((hub, i) => {
              const th = tHub(hub, locale);
              return (
                <Link
                  key={hub.slug}
                  href={`/guides/${hub.slug}`}
                  className="group relative flex flex-col p-6 border-b lg:border-b-0 lg:border-r border-forest/10 last:border-r-0 hover:bg-cream-deep/40 transition"
                >
                  <span className="rank-numeral !text-4xl mb-3">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-serif text-xl text-forest leading-tight mb-2">
                    {th.name}
                  </h3>
                  <p className="text-sm text-charcoal/70 leading-relaxed flex-1">
                    {th.oneLiner}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1 text-sage group-hover:text-terracotta text-xs font-medium uppercase tracking-[0.14em]">
                    {tCommon("openHub")}
                    <span aria-hidden>→</span>
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <EditorialBoard />
      <LabNotebook />

      {/* === LATEST === */}
      <section className="border-b border-forest/10" data-reveal>
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
          <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
            <div>
              <Eyebrow tone="terracotta">{tLatest("eyebrow")}</Eyebrow>
              <h2 className="font-serif text-3xl md:text-4xl text-forest mt-3 leading-tight" data-balance>
                {tLatest("title")}
              </h2>
            </div>
          </div>

          <div className="grid md:grid-cols-12 gap-10">
            {recent[0] && (() => {
              const r0 = tPost(recent[0], locale);
              return (
                <article className="md:col-span-7">
                  <Link href={`/${recent[0].slug}`} className="group block">
                    <div className="aspect-[16/9] bg-gradient-to-br from-sage/20 via-cream-deep to-terracotta/15 rounded-sm mb-5 relative overflow-hidden border border-forest/10">
                      <div className="absolute bottom-5 left-5">
                        <span className="caps-label text-forest bg-paper/80 backdrop-blur px-2 py-1 rounded-sm">
                          {t(recent[0].postType)}
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
                      {r0.title}
                    </h3>
                    <p className="mt-3 text-charcoal/80 text-[15.5px] leading-relaxed line-clamp-3">
                      {r0.description}
                    </p>
                    <div className="mt-4">
                      <Byline readingTime={recent[0].readingTime} />
                    </div>
                  </Link>
                </article>
              );
            })()}

            <div className="md:col-span-5 space-y-0">
              {recent.slice(1, 5).map((p) => {
                const pt = tPost(p, locale);
                const hub = getHub(p.hub);
                const ht = tHub(hub, locale);
                return (
                  <Link
                    key={p.slug}
                    href={`/${p.slug}`}
                    className="post-card-edit group"
                  >
                    <div className="caps-label text-stone mb-1.5">
                      {t(p.postType)} · {ht.shortName}
                    </div>
                    <h3 className="post-card-edit__title font-serif text-lg text-forest leading-snug">
                      {pt.title}
                    </h3>
                    <p className="mt-1.5 text-[13.5px] text-charcoal/70 leading-snug line-clamp-2">
                      {pt.description}
                    </p>
                    <div className="mt-2">
                      <Byline readingTime={p.readingTime} compact />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* === THE CREDO === */}
      <section className="border-b border-forest/10 bg-forest text-cream credo-dusk" data-reveal>
        <div className="mx-auto max-w-5xl px-6 py-20 md:py-28 relative">
          <div className="absolute top-8 left-6 right-6">
            <LabRule className="text-sage-light" />
          </div>
          <Eyebrow tone="terracotta" className="!text-terracotta">{tCredo("eyebrow")}</Eyebrow>
          <h2 className="font-serif text-3xl md:text-4xl mt-4 leading-[1.15] text-cream" data-balance>
            <span className="font-instrument italic text-sage-light">
              {tCredo("title.italic")}
            </span>{" "}
            {tCredo("title.after")}
          </h2>
          <div className="grid md:grid-cols-3 gap-10 mt-12">
            <div>
              <div className="rank-numeral !text-sage-light mb-2">01</div>
              <h3 className="font-serif text-xl text-cream mb-2">{tCredo("01.title")}</h3>
              <p className="text-cream/80 text-[14.5px] leading-relaxed">
                {tCredo("01.body")}
              </p>
            </div>
            <div>
              <div className="rank-numeral !text-sage-light mb-2">02</div>
              <h3 className="font-serif text-xl text-cream mb-2">{tCredo("02.title")}</h3>
              <p className="text-cream/80 text-[14.5px] leading-relaxed">
                {tCredo("02.body")}
              </p>
            </div>
            <div>
              <div className="rank-numeral !text-sage-light mb-2">03</div>
              <h3 className="font-serif text-xl text-cream mb-2">{tCredo("03.title")}</h3>
              <p className="text-cream/80 text-[14.5px] leading-relaxed">
                {tCredo("03.body")}
              </p>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-sage-light/30">
            <Link
              href="/editorial-standards"
              className="inline-flex items-center gap-1.5 text-sage-light hover:text-terracotta text-sm font-medium"
            >
              {tCredo("fullStandards")}
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
                <Eyebrow tone="sage">{tExp("eyebrow")}</Eyebrow>
                <h2 className="font-serif text-3xl text-forest mt-3 leading-tight" data-balance>
                  {tExp("title")}
                </h2>
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-0 border-t border-forest/10">
              {explainers.map((p, i) => {
                const pt = tPost(p, locale);
                return (
                  <Link
                    key={p.slug}
                    href={`/${p.slug}`}
                    className="group p-6 border-b md:border-b-0 md:border-r border-forest/10 last:border-r-0 hover:bg-cream-deep/40 transition"
                  >
                    <RankNumeral n={i + 1} />
                    <h3 className="font-serif text-xl text-forest leading-tight mt-3 group-hover:text-sage transition">
                      {pt.title}
                    </h3>
                    <p className="text-sm text-charcoal/75 mt-2 leading-relaxed line-clamp-3">
                      {pt.description}
                    </p>
                    <div className="mt-4">
                      <Byline readingTime={p.readingTime} compact />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* === NEWSLETTER === */}
      <section className="bg-cream-deep/60 border-b border-forest/10" data-reveal>
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-20">
          <div className="text-center mb-8">
            <Eyebrow tone="terracotta">{tNL("eyebrow")}</Eyebrow>
            <h2 className="font-serif text-3xl md:text-[2.5rem] text-forest mt-3 leading-[1.1] max-w-2xl mx-auto" data-balance>
              {tNL("title")}
            </h2>
            <p className="mt-5 text-charcoal/80 text-[15.5px] max-w-xl mx-auto leading-relaxed">
              {tNL("body")}
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
            {tCommon("lastUpdated", {
              date: new Date().toLocaleString(DATE_LOCALE[locale] ?? "en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              }),
            })}
          </p>
        </div>
      </section>

      <BackToMasthead />
    </main>
  );
}
