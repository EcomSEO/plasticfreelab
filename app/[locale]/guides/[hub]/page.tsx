import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import {
  getTranslations,
  getLocale,
  setRequestLocale,
} from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getHub, hubs, tHub } from "@/lib/content/hubs";
import { postsByHub, tPost } from "@/lib/content/posts";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { BreadcrumbJsonLd } from "@/components/schema/BreadcrumbJsonLd";
import { EmailCapture } from "@/components/EmailCapture";
import { pageMetadata } from "@/lib/seo";
import { routing, type Locale } from "@/i18n/routing";
import { Eyebrow } from "@/components/editorial/Eyebrow";
import { LabRule, DotRule } from "@/components/editorial/DotRule";
import { RankNumeral } from "@/components/editorial/RankNumeral";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    hubs.map((h) => ({ locale, hub: h.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; hub: string }>;
}): Promise<Metadata> {
  const { locale: raw, hub: hubSlug } = await params;
  if (!hasLocale(routing.locales, raw)) return {};
  const hub = getHub(hubSlug);
  if (!hub) return {};
  const locale = raw as Locale;
  const th = tHub(hub, locale);
  return pageMetadata({
    title: th.name,
    description: th.oneLiner,
    path: `/guides/${hub.slug}`,
    locale,
  });
}

export default async function HubPage({
  params,
}: {
  params: Promise<{ locale: string; hub: string }>;
}) {
  const { locale: raw, hub: hubSlug } = await params;
  if (!hasLocale(routing.locales, raw)) notFound();
  setRequestLocale(raw as Locale);
  const hub = getHub(hubSlug);
  if (!hub) notFound();

  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("hubPage");
  const tType = await getTranslations("postType");
  const tCommon = await getTranslations("common");
  const th = tHub(hub, locale);

  const hubIndex = hubs.findIndex((h) => h.slug === hub.slug);
  const hubPosts = postsByHub(hub.slug);
  const pillar = hubPosts.find((p) => p.postType === "pillar");
  const comparisons = hubPosts.filter((p) => p.postType === "comparison");
  const explainers = hubPosts.filter((p) => p.postType === "cluster");
  const listicles = hubPosts.filter((p) => p.postType === "listicle");

  const crumbs = [
    { label: t("crumbHome"), href: "/" },
    { label: t("crumbGuides"), href: "/#issue-contents" },
    { label: th.name },
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
                  <Eyebrow tone="terracotta">
                    {t("hubXofY", { i: hubIndex + 1, n: hubs.length })}
                  </Eyebrow>
                </div>
                <h1 className="display-headline text-forest mt-3 text-[2.5rem] md:text-[3.6rem] leading-[1.02]">
                  {th.name}
                </h1>
                <p className="mt-6 font-instrument italic text-2xl md:text-[1.8rem] text-charcoal/85 max-w-2xl leading-[1.35]">
                  {th.oneLiner}
                </p>
              </div>
              <div className="md:col-span-4 md:pl-6 md:border-l md:border-forest/10">
                <Eyebrow tone="stone">{t("ourThesisLabel")}</Eyebrow>
                <p className="mt-3 text-[14.5px] text-charcoal/85 leading-relaxed">
                  {th.thesis}
                </p>
                <dl className="mt-5 pt-5 border-t border-forest/10 space-y-2 text-[13px]">
                  <div className="flex justify-between">
                    <dt className="text-stone">{t("totalLive")}</dt>
                    <dd className="text-forest tnum">{hubPosts.length}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-stone">{t("planned")}</dt>
                    <dd className="text-forest tnum">30</dd>
                  </div>
                </dl>
              </div>
            </div>

            <div data-reveal className="mt-14">
              <LabRule className="rule-draw" />
            </div>
          </div>
        </section>

        {/* Start here — pillar */}
        {pillar && (() => {
          const pt = tPost(pillar, locale);
          return (
            <section className="border-b border-forest/10">
              <div className="mx-auto max-w-6xl px-6 py-14 md:py-20">
                <Eyebrow tone="sage">{t("startHereEyebrow")}</Eyebrow>
                <h2 className="font-serif text-3xl md:text-4xl text-forest mt-3 mb-8 leading-tight">
                  {t("startHereTitle")}
                </h2>
                <Link
                  href={`/${pillar.slug}`}
                  className="group block bg-paper border border-forest/15 rounded-sm p-8 md:p-10 shadow-soft hover:shadow-card hover:border-sage/50 transition"
                >
                  <Eyebrow tone="terracotta">{t("guideEyebrow")}</Eyebrow>
                  <h3 className="font-serif text-[1.8rem] md:text-[2.2rem] text-forest leading-[1.08] mt-3">
                    {pt.title}
                  </h3>
                  <p className="mt-5 text-charcoal/85 text-[15.5px] leading-relaxed max-w-[62ch]">
                    {pt.description}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-1.5 text-sage group-hover:text-terracotta transition text-sm font-medium">
                    {t("readPillar")}
                    <span aria-hidden>→</span>
                  </span>
                </Link>
              </div>
            </section>
          );
        })()}

        {/* Comparisons */}
        {comparisons.length > 0 && (
          <section className="border-b border-forest/10">
            <div className="mx-auto max-w-6xl px-6 py-14 md:py-20">
              <div className="flex items-end justify-between flex-wrap gap-3 mb-8">
                <div>
                  <Eyebrow tone="terracotta">{t("comparisonsEyebrow")}</Eyebrow>
                  <h2 className="font-serif text-3xl md:text-4xl text-forest mt-3 leading-tight">
                    {t("comparisonsTitle")}
                  </h2>
                </div>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-0 border-t border-forest/10">
                {comparisons.map((p, i) => {
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
                      <div className="mt-4 caps-label text-stone">
                        {tCommon("minRead", { n: p.readingTime })}
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* Explainers */}
        {explainers.length > 0 && (
          <section className="border-b border-forest/10">
            <div className="mx-auto max-w-6xl px-6 py-14 md:py-20">
              <Eyebrow tone="sage">{t("explainersEyebrow")}</Eyebrow>
              <h2 className="font-serif text-3xl md:text-4xl text-forest mt-3 mb-8 leading-tight">
                {t("explainersTitle")}
              </h2>
              <ul className="divide-y divide-forest/10 border-y border-forest/10">
                {explainers.map((p) => {
                  const pt = tPost(p, locale);
                  return (
                    <li key={p.slug}>
                      <Link
                        href={`/${p.slug}`}
                        className="group grid md:grid-cols-[auto_1fr_auto] gap-5 py-5 items-baseline hover:bg-cream-deep/30 px-2 transition"
                      >
                        <span className="caps-label text-stone">
                          {tType(p.postType)}
                        </span>
                        <div>
                          <h3 className="font-serif text-lg text-forest group-hover:text-sage transition leading-snug">
                            {pt.title}
                          </h3>
                          <p className="text-sm text-charcoal/70 mt-1 line-clamp-1">
                            {pt.description}
                          </p>
                        </div>
                        <span className="caps-label text-stone tnum whitespace-nowrap">
                          {tCommon("min", { n: p.readingTime })}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </section>
        )}

        {/* Listicles */}
        {listicles.length > 0 && (
          <section className="border-b border-forest/10">
            <div className="mx-auto max-w-6xl px-6 py-14 md:py-20">
              <Eyebrow tone="terracotta">{t("auditsEyebrow")}</Eyebrow>
              <h2 className="font-serif text-3xl md:text-4xl text-forest mt-3 mb-8 leading-tight">
                {t("auditsTitle")}
              </h2>
              <div className="grid md:grid-cols-2 gap-0 border-t border-forest/10">
                {listicles.map((p, i) => {
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
                      <p className="text-sm text-charcoal/75 mt-2 leading-relaxed line-clamp-2">
                        {pt.description}
                      </p>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {hubPosts.length === 0 && (
          <section className="mx-auto max-w-6xl px-6 py-20">
            <p className="text-charcoal/70 text-lg">
              {t("emptyBefore")}{" "}
              <Link href="/" className="text-sage underline">
                {t("emptyHomeLink")}
              </Link>{" "}
              {t("emptyAfter")}
            </p>
          </section>
        )}

        <section className="bg-cream-deep/50">
          <div className="mx-auto max-w-5xl px-6 py-16">
            <EmailCapture />
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-10" data-reveal>
          <DotRule className="rule-draw" />
        </section>
      </main>
    </>
  );
}
