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
import { ItemListJsonLd } from "../schema/ItemListJsonLd";
import { ArticleShell } from "./PageShell";
import { Eyebrow } from "../editorial/Eyebrow";
import { DotRule, LabRule } from "../editorial/DotRule";
import { PFLScore } from "../editorial/PFLScore";
import { MethodologyByline } from "../editorial/MethodologyByline";

export async function ListicleTemplate({ post }: { post: Post }) {
  const t = await getTranslations("listicle");
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
      {post.items && (
        <ItemListJsonLd
          items={post.items.map((i) => ({ rank: i.rank, name: i.name }))}
        />
      )}

      <ArticleShell>
        <Breadcrumbs crumbs={crumbs} />

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Eyebrow tone="terracotta">{t("eyebrow")}</Eyebrow>
          {hub && (
            <span className="caps-label text-stone">· {ht.shortName}</span>
          )}
        </div>

        <h1 className="display-headline text-forest mt-4 text-[2.1rem] md:text-[2.85rem] leading-[1.06]">
          {pt.h1}
        </h1>

        {/* Optional category atmosphere image — kie.ai sourced per
         *  kie-ai-cookbook compliance rules. Never depicts a specific
         *  branded product. */}
        {post.heroImage && (
          <figure className="mt-7 -mx-5 md:mx-0 overflow-hidden md:rounded-sm">
            <img
              src={post.heroImage.src}
              alt={post.heroImage.alt}
              loading="lazy"
              decoding="async"
              className="w-full h-auto object-cover aspect-[16/9]"
            />
          </figure>
        )}

        <div className="mt-5">
          <MethodologyByline post={post} />
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-4">
          <ReviewStamp
            updatedAt={post.updatedAt}
            readingTime={post.readingTime}
          />
        </div>

        <LabRule className="mt-7" />

        <TranslationPendingBanner />

        <p className="mt-8 text-[1.08rem] md:text-[1.14rem] leading-[1.65] text-charcoal/90 max-w-[60ch]">
          {pt.description}
        </p>

        {post.items && post.items.length > 0 && (
          <ol className="mt-12 space-y-0 border-t border-forest/10">
            {post.items.map((item) => (
              <li
                key={item.rank}
                className="group grid grid-cols-[auto_1fr] gap-5 md:gap-7 py-7 border-b border-forest/10"
              >
                <div className="pt-1">
                  <span className="rank-numeral">
                    {String(item.rank).padStart(2, "0")}
                  </span>
                </div>
                <div>
                  <div className="flex items-start justify-between gap-4">
                    <h2 className="font-serif text-[1.4rem] md:text-[1.55rem] text-forest leading-tight group-hover:text-sage transition">
                      {item.name}
                    </h2>
                    {typeof item.score === "number" && (
                      <span className="shrink-0">
                        <PFLScore
                          score={item.score}
                          size="sm"
                          showTier={false}
                        />
                      </span>
                    )}
                  </div>
                  <p className="mt-2.5 text-[15px] text-charcoal/85 leading-relaxed max-w-[62ch]">
                    {item.summary}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        )}

        <DotRule className="my-14" />

        <SourcesList sources={post.sources ?? []} />
        <AuthorBio />
        <RelatedPosts posts={related} />

        <div className="mt-14">
          <EmailCapture variant="end-of-article" />
        </div>
      </ArticleShell>
    </>
  );
}
