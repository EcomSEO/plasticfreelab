import { getTranslations, getLocale, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { hubs, getHub, tHub } from "@/lib/content/hubs";
import { tPost, featuredPost, latestPosts, posts } from "@/lib/content/posts";
import { hasLocale } from "next-intl";
import { routing, type Locale } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { Eyebrow } from "@/components/editorial/Eyebrow";
import { EmailCapture } from "@/components/EmailCapture";
import { PinnedInvestigation } from "@/components/PinnedInvestigation";
import { InvestigationTiles } from "@/components/InvestigationTiles";
import { EditorialBoard } from "@/components/EditorialBoard";
import { LabNotebook } from "@/components/LabNotebook";
import { BackToMasthead } from "@/components/BackToMasthead";
import { PFLScore } from "@/components/editorial/PFLScore";
import { pipelineCounts } from "@/lib/content/pipeline";

const DATE_LOCALE: Record<string, string> = {
  en: "en-US",
  de: "de-DE",
  fr: "fr-FR",
};

const ALPHA = [
  "A","B","C","D","E","F","G","H","I","J","K","L","M",
  "N","O","P","Q","R","S","T","U","V","W","X","Y","Z",
];

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
  const tLatest = await getTranslations("latest");
  const tNL = await getTranslations("newsletterBlock");
  const tCommon = await getTranslations("common");

  const featured = featuredPost();
  const recent = latestPosts(7);
  const counts = pipelineCounts();

  // Featured "New and now" cards: cookware + water filter top picks
  const cookwarePost = posts.find((p) => p.slug === "best-non-toxic-cookware");
  const waterPost = posts.find((p) => p.slug === "best-water-filters");

  const trending = [
    { label: "non-toxic cookware", href: "/best-non-toxic-cookware" },
    { label: "PFAS water filter", href: "/best-water-filters" },
    { label: "glass food storage", href: "/12-things-to-throw-out-of-your-kitchen" },
    { label: "microplastic-free underwear", href: "/best-microplastic-free-underwear" },
    { label: "stainless steel safe", href: "/cast-iron-vs-ceramic-vs-stainless" },
    { label: "Brita vs Berkey", href: "/brita-vs-berkey-vs-aquatru" },
    { label: "Teflon and PFAS", href: "/teflon-pfas-truth" },
  ];

  return (
    <main>
      {/* HERO — drugs.com-style centered tagline + search-led */}
      <section className="bg-white border-b border-gray-line">
        <div className="mx-auto max-w-3xl px-4 md:px-6 py-16 md:py-24 text-center">
          <span
            style={{
              fontFamily: "Roboto, sans-serif",
              fontSize: 12,
              fontWeight: 500,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              color: "#F55310",
            }}
          >
            The lab &middot; MMXXVI
          </span>
          <h1
            className="mt-4"
            style={{
              fontFamily: "Roboto, sans-serif",
              fontWeight: 700,
              fontSize: "clamp(2.5rem, 5vw, 4rem)",
              lineHeight: 1.0,
              color: "#1A3338",
              letterSpacing: 0,
            }}
            data-balance
          >
            We test what&apos;s actually inside the products in your kitchen.
          </h1>
          <p
            className="mt-6 max-w-2xl mx-auto"
            style={{
              fontFamily: "Roboto, sans-serif",
              fontSize: 18,
              fontWeight: 400,
              color: "#666666",
              lineHeight: 1.5,
            }}
          >
            A small group of researchers reading the studies, sending products to accredited labs, and publishing what we&apos;d tell a friend, with sources. No fear bait.
          </p>

          {/* Wide pill search input */}
          <form
            role="search"
            action="/"
            className="mt-8 max-w-[720px] mx-auto"
          >
            <label className="relative block">
              <span className="sr-only">Search investigations, brands, swaps</span>
              <span
                aria-hidden
                className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-mute"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="7" />
                  <path d="m20 20-3.5-3.5" strokeLinecap="round" />
                </svg>
              </span>
              <input
                type="search"
                name="q"
                placeholder="Search investigations, brands, swaps"
                className="w-full bg-white focus:outline-none focus:ring-2 focus:ring-orange/40"
                style={{
                  fontFamily: "Roboto, sans-serif",
                  fontSize: 18,
                  fontWeight: 400,
                  color: "#1A3338",
                  border: "1px solid #EEEEEE",
                  borderRadius: 100,
                  padding: "16px 24px 16px 56px",
                }}
              />
            </label>
          </form>

          {/* Trending searches */}
          <div className="mt-7">
            <span
              className="caps-label"
              style={{ color: "#666666" }}
            >
              Trending searches:
            </span>
            <ul className="mt-3 flex flex-wrap justify-center gap-x-2 gap-y-2">
              {trending.map((tile) => (
                <li key={tile.href}>
                  <Link
                    href={tile.href}
                    className="inline-block rounded-full hover:bg-gray-soft transition"
                    style={{
                      fontFamily: "Roboto, sans-serif",
                      fontWeight: 500,
                      fontSize: 14,
                      color: "#1A3338",
                      border: "1px solid #EEEEEE",
                      padding: "6px 14px",
                    }}
                  >
                    {tile.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <p
            className="mt-7 caps-label"
            style={{ color: "#666666" }}
          >
            {counts.testing} currently testing &middot; {counts.researching} queued &middot; updated weekly
          </p>
        </div>
      </section>

      {/* B. UTILITY TILE SHORTCUT ROW — drugs.com Pill Identifier-style */}
      <section className="bg-white border-b border-gray-line">
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-10">
          <ul className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              {
                label: "The PFL Calculator",
                caption: "Score any product against our v1.2 rubric",
                href: "/methodology/v1-2",
                icon: (
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <rect x="4" y="2" width="16" height="20" rx="2" />
                    <line x1="8" y1="6" x2="16" y2="6" />
                    <line x1="8" y1="11" x2="8.01" y2="11" />
                    <line x1="12" y1="11" x2="12.01" y2="11" />
                    <line x1="16" y1="11" x2="16.01" y2="11" />
                    <line x1="8" y1="15" x2="8.01" y2="15" />
                    <line x1="12" y1="15" x2="12.01" y2="15" />
                    <line x1="16" y1="15" x2="16.01" y2="15" />
                    <line x1="8" y1="19" x2="16" y2="19" />
                  </svg>
                ),
              },
              {
                label: "What we're testing now",
                caption: "Open log, updated every week",
                href: "/pipeline",
                icon: (
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M5 22h14" />
                    <path d="M5 2h14" />
                    <path d="M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22" />
                    <path d="M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2" />
                  </svg>
                ),
              },
              {
                label: "Methodology v1.2",
                caption: "Five dimensions, 23 sub-tests, public",
                href: "/methodology/v1-2",
                icon: (
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                    <line x1="10" y1="9" x2="8" y2="9" />
                  </svg>
                ),
              },
              {
                label: "Editorial board",
                caption: "Four chairs, each can kill a sentence",
                href: "/about",
                icon: (
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                ),
              },
            ].map((tile) => (
              <li key={tile.label}>
                <Link
                  href={tile.href}
                  className="block bg-white border border-gray-line rounded-sm p-6 hover:-translate-y-0.5 hover:shadow-card motion-reduce:hover:transform-none transition"
                  style={{ color: "#1A3338" }}
                >
                  <div style={{ color: "#1A3338" }}>{tile.icon}</div>
                  <h3
                    className="mt-3"
                    style={{
                      fontFamily: "Roboto, sans-serif",
                      fontWeight: 700,
                      fontSize: 16,
                      lineHeight: 1.3,
                      color: "#1A3338",
                    }}
                  >
                    {tile.label}
                  </h3>
                  <p
                    className="mt-1"
                    style={{
                      fontFamily: "Roboto, sans-serif",
                      fontSize: 13,
                      color: "#666666",
                      lineHeight: 1.45,
                    }}
                  >
                    {tile.caption}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* INVESTIGATION TILES — 4 large featured tiles */}
      <InvestigationTiles />

      {/* PINNED INVESTIGATION */}
      {featured && (
        <PinnedInvestigation post={featured} hub={getHub(featured.hub)} />
      )}

      {/* E. NEW AND NOW — 2-col goodrx-style teaser cards */}
      {(cookwarePost || waterPost) && (
        <section className="bg-white border-b border-gray-line">
          <div className="mx-auto max-w-7xl px-4 md:px-6 py-12 md:py-16">
            <div className="mb-8">
              <Eyebrow tone="terracotta">New and now</Eyebrow>
              <h2
                className="mt-3"
                style={{
                  fontFamily: "Roboto, sans-serif",
                  fontWeight: 300,
                  fontSize: 30,
                  lineHeight: 1.2,
                  color: "#000000",
                  letterSpacing: 0,
                }}
                data-balance
              >
                The two investigations we just published.
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {cookwarePost && (
                <Link
                  href={`/${cookwarePost.slug}`}
                  className="block rounded-sm p-8 md:p-12 relative hover:-translate-y-0.5 motion-reduce:hover:transform-none transition"
                  style={{ backgroundColor: "#E8EDE5" }}
                >
                  {cookwarePost.pflScore && (
                    <span className="absolute top-6 right-6">
                      <PFLScore
                        score={cookwarePost.pflScore.overall}
                        size="sm"
                        showTier={false}
                      />
                    </span>
                  )}
                  <span
                    style={{
                      fontFamily: "Roboto, sans-serif",
                      fontSize: 12,
                      fontWeight: 500,
                      letterSpacing: "0.05em",
                      textTransform: "uppercase",
                      color: "#F55310",
                    }}
                  >
                    Cookware investigation
                  </span>
                  <h3
                    className="mt-3"
                    style={{
                      fontFamily: "Roboto, sans-serif",
                      fontWeight: 700,
                      fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
                      lineHeight: 1.15,
                      color: "#1A3338",
                    }}
                    data-balance
                  >
                    {tPost(cookwarePost, locale).h1}
                  </h3>
                  <p
                    className="mt-3 max-w-prose"
                    style={{
                      fontFamily: "Roboto, sans-serif",
                      fontSize: 15,
                      color: "#1A3338",
                      lineHeight: 1.5,
                    }}
                  >
                    {tPost(cookwarePost, locale).description}
                  </p>
                  <span
                    className="mt-6 inline-flex items-center gap-1"
                    style={{
                      fontFamily: "Roboto, sans-serif",
                      fontWeight: 700,
                      fontSize: 13,
                      letterSpacing: "0.03em",
                      color: "#F55310",
                    }}
                  >
                    Read the investigation <span aria-hidden>→</span>
                  </span>
                </Link>
              )}
              {waterPost && (
                <Link
                  href={`/${waterPost.slug}`}
                  className="block rounded-sm p-8 md:p-12 relative hover:-translate-y-0.5 motion-reduce:hover:transform-none transition"
                  style={{ backgroundColor: "#F7F7F7" }}
                >
                  {waterPost.pflScore && (
                    <span className="absolute top-6 right-6">
                      <PFLScore
                        score={waterPost.pflScore.overall}
                        size="sm"
                        showTier={false}
                      />
                    </span>
                  )}
                  <span
                    style={{
                      fontFamily: "Roboto, sans-serif",
                      fontSize: 12,
                      fontWeight: 500,
                      letterSpacing: "0.05em",
                      textTransform: "uppercase",
                      color: "#F55310",
                    }}
                  >
                    Water filter investigation
                  </span>
                  <h3
                    className="mt-3"
                    style={{
                      fontFamily: "Roboto, sans-serif",
                      fontWeight: 700,
                      fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
                      lineHeight: 1.15,
                      color: "#1A3338",
                    }}
                    data-balance
                  >
                    {tPost(waterPost, locale).h1}
                  </h3>
                  <p
                    className="mt-3 max-w-prose"
                    style={{
                      fontFamily: "Roboto, sans-serif",
                      fontSize: 15,
                      color: "#1A3338",
                      lineHeight: 1.5,
                    }}
                  >
                    {tPost(waterPost, locale).description}
                  </p>
                  <span
                    className="mt-6 inline-flex items-center gap-1"
                    style={{
                      fontFamily: "Roboto, sans-serif",
                      fontWeight: 700,
                      fontSize: 13,
                      letterSpacing: "0.03em",
                      color: "#F55310",
                    }}
                  >
                    Read the investigation <span aria-hidden>→</span>
                  </span>
                </Link>
              )}
            </div>
          </div>
        </section>
      )}

      {/* CATEGORY TILES — 8 across like runrepeat reviews row */}
      <section className="bg-white border-b border-gray-line">
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-10">
          <h2
            style={{
              fontFamily: "Roboto, sans-serif",
              fontWeight: 300,
              fontSize: 30,
              lineHeight: 1.2,
              color: "#000000",
              letterSpacing: 0,
              marginBottom: "1.5rem",
            }}
          >
            Browse by category
          </h2>
          <ul className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {[
              { label: "Cookware", href: "/best-non-toxic-cookware" },
              { label: "Food storage", href: "/12-things-to-throw-out-of-your-kitchen" },
              { label: "Water filters", href: "/best-water-filters" },
              { label: "Cleaning", href: "/guides/non-toxic-home" },
              { label: "Personal care", href: "/guides/non-toxic-personal-care" },
              { label: "Bedding", href: "/guides/non-toxic-home" },
              { label: "Underwear", href: "/best-microplastic-free-underwear" },
              { label: "Drinkware", href: "/brita-vs-berkey-vs-aquatru" },
            ].map((tile) => (
              <li key={tile.label}>
                <Link
                  href={tile.href}
                  className="card-editorial block aspect-square p-3 flex flex-col justify-between"
                >
                  <div
                    className="rounded-sm flex-1 mb-2"
                    style={{
                      backgroundColor: "#F7F7F7",
                      border: "1px solid #EEEEEE",
                    }}
                    aria-hidden
                  />
                  <span
                    style={{
                      fontFamily: "Roboto, sans-serif",
                      fontWeight: 700,
                      fontSize: 13,
                      color: "#1A3338",
                      lineHeight: 1.3,
                    }}
                  >
                    {tile.label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* LATEST INVESTIGATIONS — horizontal grid */}
      <section className="bg-white border-b border-gray-line">
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-12 md:py-16">
          <div className="flex items-end justify-between mb-8 flex-wrap gap-3">
            <div>
              <Eyebrow tone="terracotta">{tLatest("eyebrow")}</Eyebrow>
              <h2
                className="mt-3"
                style={{
                  fontFamily: "Roboto, sans-serif",
                  fontWeight: 300,
                  fontSize: 30,
                  lineHeight: 1.2,
                  color: "#000000",
                  letterSpacing: 0,
                }}
                data-balance
              >
                {tLatest("title")}
              </h2>
            </div>
          </div>

          <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {recent.slice(0, 8).map((p) => {
              const pt = tPost(p, locale);
              const hub = getHub(p.hub);
              const ht = tHub(hub, locale);
              return (
                <li key={p.slug}>
                  <Link href={`/${p.slug}`} className="card-editorial block h-full">
                    <div
                      className="aspect-[4/3] relative overflow-hidden"
                      style={{ backgroundColor: "#F7F7F7" }}
                    >
                      {p.heroImage ? (
                        <img
                          src={p.heroImage.src}
                          alt={p.heroImage.alt}
                          loading="lazy"
                          decoding="async"
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      ) : null}
                      {p.pflScore && (
                        <span
                          style={{
                            position: "absolute",
                            top: 8,
                            right: 8,
                            zIndex: 1,
                          }}
                        >
                          <PFLScore
                            score={p.pflScore.overall}
                            size="sm"
                            showTier={false}
                          />
                        </span>
                      )}
                    </div>
                    <div className="p-3">
                      <span className="caps-label">
                        {t(p.postType)} &middot; {ht.shortName}
                      </span>
                      <h3
                        className="mt-1"
                        style={{
                          fontFamily: "Roboto, sans-serif",
                          fontWeight: 700,
                          fontSize: 15,
                          lineHeight: 1.3,
                          color: "#1A3338",
                        }}
                      >
                        {pt.title}
                      </h3>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* C. BROWSE BRANDS A-Z */}
      <section className="bg-white border-b border-gray-line">
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-12 md:py-16">
          <h2
            className="mb-6"
            style={{
              fontFamily: "Roboto, sans-serif",
              fontWeight: 300,
              fontSize: 30,
              lineHeight: 1.2,
              color: "#000000",
              letterSpacing: 0,
            }}
          >
            Browse brands A-Z
          </h2>
          <p
            className="mb-6 max-w-prose"
            style={{
              fontFamily: "Roboto, sans-serif",
              fontSize: 14,
              color: "#666666",
              lineHeight: 1.5,
            }}
          >
            Every brand we&apos;ve tested, scored, or rejected. New letters fill in as the index grows.
          </p>
          <ul
            className="grid gap-2"
            style={{ gridTemplateColumns: "repeat(auto-fill, minmax(44px, 1fr))" }}
          >
            {ALPHA.map((letter) => (
              <li key={letter}>
                <Link
                  href={`/brands/${letter.toLowerCase()}`}
                  className="flex items-center justify-center transition"
                  style={{
                    fontFamily: "Roboto, sans-serif",
                    fontWeight: 700,
                    fontSize: 14,
                    color: "#1A3338",
                    backgroundColor: "#FFFFFF",
                    border: "1px solid #EEEEEE",
                    height: 44,
                    width: "100%",
                  }}
                  aria-label={`Brands starting with ${letter}`}
                >
                  {letter}
                </Link>
              </li>
            ))}
            <li className="col-span-2 sm:col-span-1">
              <Link
                href="/brands/0-9"
                className="flex items-center justify-center transition"
                style={{
                  fontFamily: "Roboto, sans-serif",
                  fontWeight: 700,
                  fontSize: 14,
                  color: "#1A3338",
                  backgroundColor: "#FFFFFF",
                  border: "1px solid #EEEEEE",
                  height: 44,
                  width: "100%",
                }}
              >
                0-9
              </Link>
            </li>
          </ul>
          <div className="mt-4">
            <Link
              href="/pipeline"
              className="inline-block transition hover:opacity-75"
              style={{
                fontFamily: "Roboto, sans-serif",
                fontWeight: 700,
                fontSize: 14,
                color: "#1A3338",
                backgroundColor: "#F7F7F7",
                border: "1px solid #EEEEEE",
                padding: "10px 16px",
              }}
            >
              Advanced search <span aria-hidden>→</span>
            </Link>
          </div>
          <p
            className="mt-6"
            style={{
              fontFamily: "Roboto, sans-serif",
              fontSize: 13,
              color: "#666666",
            }}
          >
            Browse all:{" "}
            <Link href="/pipeline" className="underline hover:no-underline" style={{ color: "#1A3338" }}>
              brands
            </Link>{" "}
            ·{" "}
            <Link href="#issue-contents" className="underline hover:no-underline" style={{ color: "#1A3338" }}>
              categories
            </Link>{" "}
            ·{" "}
            <Link href="/methodology/v1-2" className="underline hover:no-underline" style={{ color: "#1A3338" }}>
              materials
            </Link>{" "}
            ·{" "}
            <Link href="/best-non-toxic-cookware" className="underline hover:no-underline" style={{ color: "#1A3338" }}>
              price tiers
            </Link>
          </p>
        </div>
      </section>

      {/* TESTING PROCESS — 3-photo strip */}
      <section className="bg-gray-soft border-b border-gray-line">
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-12 md:py-16">
          <h2
            className="mb-8"
            style={{
              fontFamily: "Roboto, sans-serif",
              fontWeight: 300,
              fontSize: 30,
              lineHeight: 1.2,
              color: "#000000",
              letterSpacing: 0,
            }}
          >
            How we test
          </h2>
          <ol className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                n: "01",
                title: "We buy with our own money",
                body: "Every product is purchased anonymously at retail. We send a sample to an ISO 17025 accredited lab and screen for the analytes that matter for that category.",
              },
              {
                n: "02",
                title: "We home-test in real kitchens",
                body: "Every product runs through real-life use cases. Cookware gets seared, scrubbed, dishwashed. Filters get challenged with spiked water. Bottles get drop-tested.",
              },
              {
                n: "03",
                title: "Tests are standardized",
                body: "Same protocol for every product in a category. Results are comparable across products. Methodology is published, versioned, and revisable.",
              },
            ].map((step) => (
              <li
                key={step.n}
                className="bg-white border border-gray-line rounded-sm p-5"
              >
                <div
                  className="aspect-[4/3] mb-4 rounded-sm"
                  style={{ backgroundColor: "#EEEEEE" }}
                  aria-hidden
                />
                <span
                  style={{
                    fontFamily: "Roboto, sans-serif",
                    fontWeight: 700,
                    fontSize: 11,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "#F55310",
                  }}
                >
                  Step {step.n}
                </span>
                <h3
                  className="mt-2"
                  style={{
                    fontFamily: "Roboto, sans-serif",
                    fontWeight: 700,
                    fontSize: 18,
                    lineHeight: 1.3,
                    color: "#1A3338",
                  }}
                >
                  {step.title}
                </h3>
                <p
                  className="mt-2"
                  style={{
                    fontFamily: "Roboto, sans-serif",
                    fontSize: 14,
                    color: "#000000",
                    lineHeight: 1.55,
                  }}
                >
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* EDITORIAL BOARD */}
      <EditorialBoard />

      {/* LAB NOTEBOOK */}
      <LabNotebook />

      {/* THE FIVE HUBS */}
      <section className="bg-white border-b border-gray-line" id="issue-contents">
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-12 md:py-16">
          <h2
            className="mb-8"
            style={{
              fontFamily: "Roboto, sans-serif",
              fontWeight: 300,
              fontSize: 30,
              lineHeight: 1.2,
              color: "#000000",
              letterSpacing: 0,
            }}
          >
            The five hubs
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-0 border-t border-gray-line">
            {hubs.map((hub, i) => {
              const th = tHub(hub, locale);
              return (
                <Link
                  key={hub.slug}
                  href={`/guides/${hub.slug}`}
                  className="group p-5 border-b lg:border-b-0 lg:border-r border-gray-line last:border-r-0 hover:bg-gray-soft transition"
                >
                  <span
                    style={{
                      fontFamily: "Roboto, sans-serif",
                      fontWeight: 700,
                      fontSize: 32,
                      color: "#666666",
                      lineHeight: 1,
                      fontVariantNumeric: "tabular-nums",
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3
                    className="mt-3"
                    style={{
                      fontFamily: "Roboto, sans-serif",
                      fontWeight: 700,
                      fontSize: 18,
                      lineHeight: 1.3,
                      color: "#1A3338",
                    }}
                  >
                    {th.name}
                  </h3>
                  <p
                    className="mt-2"
                    style={{
                      fontFamily: "Roboto, sans-serif",
                      fontSize: 13,
                      color: "#000000",
                      lineHeight: 1.5,
                    }}
                  >
                    {th.oneLiner}
                  </p>
                  <span
                    className="mt-4 inline-flex items-center gap-1"
                    style={{
                      fontFamily: "Roboto, sans-serif",
                      fontWeight: 700,
                      fontSize: 11,
                      letterSpacing: "0.05em",
                      textTransform: "uppercase",
                      color: "#F55310",
                    }}
                  >
                    {tCommon("openHub")} <span aria-hidden>→</span>
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="bg-gray-soft border-b border-gray-line">
        <div className="mx-auto max-w-3xl px-4 md:px-6 py-12 md:py-16 text-center">
          <Eyebrow tone="terracotta">{tNL("eyebrow")}</Eyebrow>
          <h2
            className="mt-3"
            style={{
              fontFamily: "Roboto, sans-serif",
              fontWeight: 300,
              fontSize: 30,
              lineHeight: 1.2,
              color: "#000000",
              letterSpacing: 0,
            }}
            data-balance
          >
            {tNL("title")}
          </h2>
          <p
            className="mt-4 max-w-xl mx-auto"
            style={{
              fontFamily: "Roboto, sans-serif",
              fontSize: 16,
              color: "#000000",
              lineHeight: 1.5,
            }}
          >
            {tNL("body")}
          </p>
          <div className="mt-6">
            <EmailCapture />
          </div>
        </div>
      </section>

      {/* CLOSING DATELINE */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-8 text-center">
          <p className="caps-label">
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
