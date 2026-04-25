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
import { ArticleShell } from "./PageShell";
import { Eyebrow } from "../editorial/Eyebrow";
import { DotRule, LabRule } from "../editorial/DotRule";
import { KeyTakeaway } from "../editorial/KeyTakeaway";

export async function ClusterTemplate({ post }: { post: Post }) {
  const t = await getTranslations("cluster");
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

      <ArticleShell>
        <Breadcrumbs crumbs={crumbs} />

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Eyebrow tone="sage">{t("eyebrow")}</Eyebrow>
          {hub && (
            <span className="caps-label text-stone">· {ht.shortName}</span>
          )}
        </div>

        <h1 className="display-headline text-forest mt-4 text-[2.1rem] md:text-[2.75rem] leading-[1.07]">
          {pt.h1}
        </h1>

        <div className="mt-5 flex flex-wrap items-center gap-4">
          <ReviewStamp
            updatedAt={post.updatedAt}
            readingTime={post.readingTime}
          />
        </div>

        <LabRule className="mt-7" />

        <TranslationPendingBanner />

        <p className="drop-cap mt-9 text-[1.08rem] leading-[1.75] text-charcoal/90">
          {pt.description}
        </p>

        <KeyTakeaway variant="key-takeaway" title={t("shortAnswerTitle")}>
          {t("shortAnswerBody")}
        </KeyTakeaway>

        {post.faq && post.faq.length > 0 && (
          <section className="mt-12">
            <Eyebrow tone="terracotta">{t("faqEyebrow")}</Eyebrow>
            <h2 className="font-serif text-2xl md:text-[1.75rem] text-forest mt-2 mb-5 leading-tight">
              {t("faqTitle")}
            </h2>
            <dl className="divide-y divide-forest/10 border-y border-forest/10">
              {post.faq.map((f, i) => (
                <div key={i} className="py-5 first:pt-0 last:pb-0">
                  <dt className="font-serif text-lg text-forest leading-snug mb-2">
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

        <DotRule className="my-12" />

        <SourcesList sources={post.sources ?? []} />
        <AuthorBio />
        <RelatedPosts posts={related} />

        <div className="mt-12">
          <EmailCapture variant="end-of-article" />
        </div>
      </ArticleShell>
    </>
  );
}
