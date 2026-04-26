import { getTranslations, getLocale } from "next-intl/server";
import { tPost, type Post } from "@/lib/content/posts";
import { tHub, getHub } from "@/lib/content/hubs";
import { relatedPosts } from "@/lib/content/posts";
import type { Locale } from "@/i18n/routing";
import { Breadcrumbs } from "../Breadcrumbs";
import { ReviewStamp } from "../ReviewStamp";
import { AffiliateDisclosure } from "../AffiliateDisclosure";
import { AuthorBio } from "../AuthorBio";
import { RelatedPosts } from "../RelatedPosts";
import { SourcesList } from "../SourcesList";
import { EmailCapture } from "../EmailCapture";
import { TranslationPendingBanner } from "../TranslationPendingBanner";
import { ArticleJsonLd } from "../schema/ArticleJsonLd";
import { BreadcrumbJsonLd } from "../schema/BreadcrumbJsonLd";
import { FaqJsonLd } from "../schema/FaqJsonLd";
import { ItemListJsonLd } from "../schema/ItemListJsonLd";
import { WideArticleShell } from "./PageShell";
import { Eyebrow } from "../editorial/Eyebrow";
import { DotRule, LabRule } from "../editorial/DotRule";
import { TierBadge } from "../editorial/TierBadge";
import { MethodologyBlock } from "../editorial/MethodologyBlock";
import { WhatWouldChangeOurMind } from "../editorial/WhatWouldChangeOurMind";
import { PFLScore } from "../editorial/PFLScore";
import { MethodologyByline } from "../editorial/MethodologyByline";

const DATE_LOCALE: Record<string, string> = {
  en: "en-US",
  de: "de-DE",
  fr: "fr-FR",
};

export async function ComparisonTemplate({ post }: { post: Post }) {
  const t = await getTranslations("comparison");
  const tChrome = await getTranslations("postChrome");
  const tHubPage = await getTranslations("hubPage");
  const locale = (await getLocale()) as Locale;
  const hub = getHub(post.hub);
  const ht = tHub(hub, locale);
  const pt = tPost(post, locale);
  const crumbs = [
    { label: tHubPage("crumbHome"), href: "/" },
    { label: tHubPage("crumbGuides"), href: "/#issue-contents" },
    hub ? { label: ht.name, href: `/guides/${hub.slug}` } : { label: "" },
    { label: pt.title },
  ];
  const related = relatedPosts(post);

  const skips = (post.products ?? []).filter((p) =>
    p.tier.toLowerCase().includes("skip")
  );
  const picks = (post.products ?? []).filter(
    (p) => !p.tier.toLowerCase().includes("skip")
  );

  return (
    <>
      <ArticleJsonLd
        path={`/${post.slug}`}
        headline={pt.h1}
        description={pt.description}
        datePublished={post.publishedAt}
        dateModified={post.updatedAt}
      />
      <BreadcrumbJsonLd crumbs={crumbs} />
      {post.faq && <FaqJsonLd faq={post.faq} />}
      {post.products && (
        <ItemListJsonLd
          items={post.products.map((p) => ({ rank: p.rank, name: p.name }))}
        />
      )}

      <WideArticleShell
        aside={
          <nav className="space-y-6">
            <div>
              <Eyebrow tone="stone">{tChrome("onThisPage")}</Eyebrow>
              <ul className="mt-3 space-y-2 text-[14px]">
                {post.ourPick && (
                  <li>
                    <a href="#our-pick" className="text-forest hover:text-sage">
                      {t("ourPickEyebrow")}
                    </a>
                  </li>
                )}
                <li>
                  <a href="#short-list" className="text-forest hover:text-sage">
                    {tChrome("rankedList")}
                  </a>
                </li>
                {skips.length > 0 && (
                  <li>
                    <a href="#skips" className="text-forest hover:text-sage">
                      {tChrome("wouldSkip")}
                    </a>
                  </li>
                )}
                <li>
                  <a href="#methodology" className="text-forest hover:text-sage">
                    {tChrome("methodologyTOC")}
                  </a>
                </li>
                {post.faq && post.faq.length > 0 && (
                  <li>
                    <a href="#faq" className="text-forest hover:text-sage">
                      {tChrome("faqShort")}
                    </a>
                  </li>
                )}
                <li>
                  <a href="#change-mind" className="text-forest hover:text-sage">
                    {tChrome("changeMind")}
                  </a>
                </li>
                <li>
                  <a href="#sources" className="text-forest hover:text-sage">
                    {tChrome("sources")}
                  </a>
                </li>
              </ul>
            </div>

            <div className="pt-6 border-t border-forest/10">
              <Eyebrow tone="stone">{tChrome("labLabel")}</Eyebrow>
              <dl className="mt-3 space-y-2.5 text-[13.5px]">
                <div className="flex justify-between">
                  <dt className="text-stone">{tChrome("tested")}</dt>
                  <dd className="text-forest tnum">
                    {tChrome("testedValue", { n: picks.length })}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-stone">{tChrome("cited")}</dt>
                  <dd className="text-forest tnum">
                    {tChrome("citedValue", { n: (post.sources ?? []).length })}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-stone">{tChrome("readTime")}</dt>
                  <dd className="text-forest tnum">
                    {tChrome("readTimeValue", { n: post.readingTime })}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-stone">{tChrome("lastUpdated")}</dt>
                  <dd className="text-forest">
                    {new Date(post.updatedAt).toLocaleDateString(
                      DATE_LOCALE[locale] ?? "en-US",
                      { month: "short", year: "numeric" }
                    )}
                  </dd>
                </div>
              </dl>
            </div>
          </nav>
        }
      >
        <Breadcrumbs crumbs={crumbs} />

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Eyebrow tone="terracotta">{t("eyebrow")}</Eyebrow>
          {hub && (
            <span className="caps-label text-stone">· {ht.shortName}</span>
          )}
        </div>

        {/* Hero — runrepeat-style 2-col with H1 + deck on left, large PFL Score on right */}
        <div className="mt-4 grid lg:grid-cols-[1fr_auto] gap-8 items-start">
          <div>
            <h1 className="display-headline text-forest text-[2.25rem] md:text-[3.1rem] leading-[1.04]">
              {pt.h1}
            </h1>
            <p className="mt-6 text-lg md:text-[1.22rem] text-charcoal/85 max-w-[60ch] leading-[1.55]">
              {pt.description}
            </p>
          </div>
          {post.pflScore && (
            <div className="flex flex-col items-start lg:items-center gap-3">
              <PFLScore score={post.pflScore.overall} size="lg" />
              <div className="caps-label text-stone">
                {tChrome("pflScoreEyebrow")}
              </div>
            </div>
          )}
        </div>

        <div className="mt-6">
          <MethodologyByline post={post} />
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-4">
          <ReviewStamp
            updatedAt={post.updatedAt}
            readingTime={post.readingTime}
          />
        </div>

        <div className="mt-4">
          <AffiliateDisclosure />
        </div>

        <LabRule className="mt-10" />

        <TranslationPendingBanner />

        {/* Score breakdown — 5 dimensions as horizontal bars */}
        {post.pflScore && (
          <section id="score-breakdown" className="mt-10">
            <Eyebrow tone="sage">{tChrome("scoreBreakdownEyebrow")}</Eyebrow>
            <h2 className="font-serif text-2xl md:text-[1.7rem] text-forest mt-2 mb-5 leading-tight">
              {tChrome("scoreBreakdownTitle")}
            </h2>
            <div className="pfl-breakdown max-w-2xl">
              {([
                ["materialSafety", post.pflScore.materialSafety, 35],
                ["performance", post.pflScore.performance, 20],
                ["durability", post.pflScore.durability, 15],
                ["useExperience", post.pflScore.useExperience, 15],
                ["value", post.pflScore.value, 15],
              ] as const).map(([key, value, weight]) => (
                <div key={key} className="pfl-breakdown__row">
                  <span className="pfl-breakdown__label">
                    {tChrome(`scoreDim.${key}` as const)} · {weight}%
                  </span>
                  <span className="pfl-breakdown__bar">
                    <span
                      className="pfl-breakdown__fill"
                      style={{ width: `${value}%` }}
                    />
                  </span>
                  <span className="pfl-breakdown__value">{value}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Our Pick */}
        {post.ourPick && (
          <section id="our-pick" className="mt-12">
            <div className="relative overflow-hidden bg-gradient-to-br from-cream-deep to-paper border border-sage/40 rounded-sm p-7 md:p-10">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-sage" />
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <TierBadge tier={post.ourPick.tier} />
                <Eyebrow tone="sage">{t("ourPickEyebrow")}</Eyebrow>
                {typeof post.ourPick.score === "number" && (
                  <span className="ml-auto">
                    <PFLScore
                      score={post.ourPick.score}
                      size="sm"
                      showTier={false}
                    />
                  </span>
                )}
              </div>
              <h2 className="font-serif text-[1.9rem] md:text-[2.35rem] text-forest leading-[1.08]">
                {post.ourPick.name}
              </h2>
              <p className="mt-5 text-[16.5px] text-charcoal/90 leading-relaxed max-w-[62ch]">
                {post.ourPick.reason}
              </p>
            </div>
          </section>
        )}

        {/* Ranked list */}
        {picks.length > 0 && (
          <section id="short-list" className="mt-14">
            <div className="flex items-end justify-between flex-wrap gap-3 mb-6">
              <div>
                <Eyebrow tone="terracotta">{t("rankedEyebrow")}</Eyebrow>
                <h2 className="font-serif text-3xl text-forest mt-2 leading-tight">
                  {t("rankedTitle")}
                </h2>
              </div>
              <div className="caps-label text-stone">
                {t("rankedMeta", { n: picks.length })}
              </div>
            </div>

            <ol className="space-y-4">
              {picks.map((p) => {
                const isFirst = p.rank === 1;
                return (
                  <li
                    key={p.rank}
                    id={`pick-${p.rank}`}
                    className={`group relative bg-paper border rounded-sm p-6 md:p-7 transition ${
                      isFirst
                        ? "border-sage/50 shadow-card"
                        : "border-forest/10 hover:border-sage/40"
                    }`}
                  >
                    <div className="grid grid-cols-[auto_1fr] gap-5 md:gap-7">
                      <div className="flex flex-col items-start pt-1">
                        <span className="rank-numeral">
                          {String(p.rank).padStart(2, "0")}
                        </span>
                        <div className="mt-2 h-1 w-8 bg-sage/40 rounded-full" />
                      </div>
                      <div>
                        <div className="flex flex-wrap items-center gap-3 mb-3">
                          <TierBadge tier={p.tier} />
                          {typeof p.score === "number" && (
                            <span className="ml-auto">
                              <PFLScore
                                score={p.score}
                                size="sm"
                                showTier={false}
                              />
                            </span>
                          )}
                        </div>
                        <h3 className="font-serif text-2xl text-forest leading-tight">
                          {p.name}
                        </h3>
                        <p className="mt-3 text-[15.5px] text-charcoal/85 leading-relaxed">
                          {p.summary}
                        </p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>
          </section>
        )}

        {/* Skip section */}
        {skips.length > 0 && (
          <section id="skips" className="mt-14">
            <div className="bg-forest/[0.04] border border-forest/15 rounded-sm p-7 md:p-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="h-1.5 w-1.5 rounded-full bg-terracotta" />
                <Eyebrow tone="terracotta">{t("skipsEyebrow")}</Eyebrow>
              </div>
              <h2 className="font-serif text-2xl text-forest mb-5 leading-tight">
                {t("skipsTitle")}
              </h2>
              <div className="space-y-5">
                {skips.map((p) => (
                  <div
                    key={p.rank}
                    className="pl-5 border-l-2 border-terracotta/50"
                  >
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-serif text-lg text-forest">
                        {p.name}
                      </h3>
                      <TierBadge tier={p.tier} />
                      {typeof p.score === "number" && (
                        <span className="ml-auto">
                          <PFLScore
                            score={p.score}
                            size="sm"
                            showTier={false}
                          />
                        </span>
                      )}
                    </div>
                    <p className="text-[14.5px] text-charcoal/85 leading-relaxed">
                      {p.summary}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        <div id="methodology">
          <MethodologyBlock />
        </div>

        {post.faq && post.faq.length > 0 && (
          <section id="faq" className="mt-14">
            <Eyebrow tone="sage">{t("faqEyebrow")}</Eyebrow>
            <h2 className="font-serif text-3xl text-forest mt-2 mb-6 leading-tight">
              {t("faqTitle")}
            </h2>
            <dl className="divide-y divide-forest/10 border-y border-forest/10">
              {post.faq.map((f, i) => (
                <div
                  key={i}
                  className="grid md:grid-cols-[1fr_2fr] gap-5 py-6 first:pt-0 last:pb-0"
                >
                  <dt className="font-serif text-lg text-forest leading-snug">
                    {f.q}
                  </dt>
                  <dd className="text-[15.5px] text-charcoal/85 leading-relaxed">
                    {f.a}
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        )}

        <div id="change-mind">
          <WhatWouldChangeOurMind>
            <p>{t("changeMindBody")}</p>
          </WhatWouldChangeOurMind>
        </div>

        <DotRule className="my-14" />

        <div id="sources">
          <SourcesList sources={post.sources ?? []} />
        </div>

        <AuthorBio />
        <RelatedPosts posts={related} />

        <div className="mt-14">
          <EmailCapture variant="end-of-article" />
        </div>
      </WideArticleShell>
    </>
  );
}
