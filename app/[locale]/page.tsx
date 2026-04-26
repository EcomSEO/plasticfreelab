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

  return (
    <main>
      {/* HERO — runrepeat-style 2-col, white bg */}
      <section className="bg-white border-b border-gray-line">
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-12 md:py-16 grid lg:grid-cols-2 gap-10 items-center">
          <div>
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
              The investigation
            </span>
            <h1
              className="mt-4"
              style={{
                fontFamily: "Roboto, sans-serif",
                fontWeight: 700,
                fontSize: "clamp(2.25rem, 5vw, 3.75rem)",
                lineHeight: 1.0,
                color: "#1A3338",
                letterSpacing: 0,
              }}
              data-balance
            >
              We test what&apos;s actually inside the products in your kitchen.
            </h1>
            <p
              className="mt-6 max-w-[60ch]"
              style={{
                fontFamily: "Roboto, sans-serif",
                fontSize: 18,
                fontWeight: 400,
                color: "#000000",
                lineHeight: 1.5,
              }}
            >
              We send pans, food storage, water filters, and bottles to an accredited lab. We home-test in real kitchens. We publish what we find — including what we wouldn&apos;t buy ourselves.
            </p>
            <p
              className="mt-5 caps-label"
              style={{ color: "#666666" }}
            >
              {counts.testing} currently testing &middot; {counts.researching} queued &middot; updated weekly
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/best-non-toxic-cookware" className="btn-primary">
                Read the cookware investigation <span aria-hidden>→</span>
              </Link>
              <Link href="/pipeline" className="btn-secondary">
                See what we&apos;re testing
              </Link>
            </div>
          </div>

          {/* Hero photo placeholder */}
          <div
            className="aspect-[4/3] rounded-sm flex items-center justify-center"
            style={{
              backgroundColor: "#EEEEEE",
              border: "1px solid #EEEEEE",
            }}
            aria-hidden
          >
            <span
              style={{
                fontFamily: "Roboto, sans-serif",
                fontWeight: 700,
                fontSize: 64,
                color: "#FFFFFF",
                letterSpacing: 0,
                opacity: 0.6,
              }}
            >
              PFL
            </span>
          </div>
        </div>
      </section>

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
              { label: "Cleaning", href: "/guides/cleaning" },
              { label: "Personal care", href: "/guides/personal-care" },
              { label: "Bedding", href: "/guides/bedding" },
              { label: "Underwear", href: "/guides/underwear" },
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

      {/* INVESTIGATION TILES — 4 large featured tiles */}
      <InvestigationTiles />

      {/* PINNED INVESTIGATION */}
      {featured && (
        <PinnedInvestigation post={featured} hub={getHub(featured.hub)} />
      )}

      {/* LATEST INVESTIGATIONS — horizontal-scroll row */}
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
                      className="aspect-[4/3] relative"
                      style={{ backgroundColor: "#F7F7F7" }}
                      aria-hidden
                    >
                      {p.pflScore && (
                        <span
                          style={{
                            position: "absolute",
                            top: 8,
                            right: 8,
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
