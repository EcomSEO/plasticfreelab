import { getTranslations, getLocale } from "next-intl/server";
import { tPost, type Post } from "@/lib/content/posts";
import { tHub, getHub } from "@/lib/content/hubs";
import { relatedPosts } from "@/lib/content/posts";
import type { Locale } from "@/i18n/routing";
import { Breadcrumbs } from "../Breadcrumbs";
import { ReviewStamp } from "../ReviewStamp";
import { AuthorBio } from "../AuthorBio";
import { RelatedPosts } from "../RelatedPosts";
import { SourcesList } from "../SourcesList";
import { EmailCapture } from "../EmailCapture";
import { TranslationPendingBanner } from "../TranslationPendingBanner";
import { ArticleJsonLd } from "../schema/ArticleJsonLd";
import { BreadcrumbJsonLd } from "../schema/BreadcrumbJsonLd";
import { FaqJsonLd } from "../schema/FaqJsonLd";
import { WideArticleShell } from "./PageShell";
import { Eyebrow } from "../editorial/Eyebrow";
import { DotRule, LabRule } from "../editorial/DotRule";
import { KeyTakeaway } from "../editorial/KeyTakeaway";
import { PullQuote } from "../editorial/PullQuote";

const DATE_LOCALE: Record<string, string> = {
  en: "en-US",
  de: "de-DE",
  fr: "fr-FR",
};

export async function PillarTemplate({ post }: { post: Post }) {
  const t = await getTranslations("pillar");
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

      <WideArticleShell
        aside={
          <nav className="space-y-6">
            <div>
              <Eyebrow tone="stone">{tChrome("onThisPage")}</Eyebrow>
              <ul className="mt-3 space-y-2 text-[14px]">
                <li>
                  <a href="#lede" className="text-forest hover:text-sage">
                    {tChrome("shortAnswer")}
                  </a>
                </li>
                {post.faq && post.faq.length > 0 && (
                  <li>
                    <a href="#faq" className="text-forest hover:text-sage">
                      {tChrome("frequentlyAsked")}
                    </a>
                  </li>
                )}
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
          <Eyebrow tone="sage">{t("eyebrow")}</Eyebrow>
          {hub && (
            <span className="caps-label text-stone">· {ht.shortName}</span>
          )}
        </div>

        <h1
          id="lede"
          className="display-headline text-forest mt-4 text-[2.35rem] md:text-[3.2rem] leading-[1.04]"
        >
          {pt.h1}
        </h1>

        <div className="mt-6 flex flex-wrap items-center gap-4">
          <ReviewStamp
            updatedAt={post.updatedAt}
            readingTime={post.readingTime}
          />
        </div>

        <LabRule className="mt-8" />

        <TranslationPendingBanner />

        <p className="drop-cap mt-10 text-[1.12rem] md:text-[1.17rem] leading-[1.7] text-charcoal/90 max-w-[62ch]">
          {pt.description}
        </p>

        <PullQuote attribution={t("pullQuoteAttribution")}>
          {t("pullQuote")}
        </PullQuote>

        <KeyTakeaway variant="key-takeaway" title={t("keyTakeawayTitle")}>
          {t("keyTakeawayBody")}
        </KeyTakeaway>

        {post.faq && post.faq.length > 0 && (
          <section id="faq" className="mt-14">
            <Eyebrow tone="terracotta">{t("faqEyebrow")}</Eyebrow>
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
