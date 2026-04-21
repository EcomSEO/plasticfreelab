import type { Post } from "@/lib/content/posts";
import { getHub } from "@/lib/content/hubs";
import { relatedPosts } from "@/lib/content/posts";
import { Breadcrumbs } from "../Breadcrumbs";
import { ReviewStamp } from "../ReviewStamp";
import { AuthorBio } from "../AuthorBio";
import { RelatedPosts } from "../RelatedPosts";
import { SourcesList } from "../SourcesList";
import { EmailCapture } from "../EmailCapture";
import { ArticleJsonLd } from "../schema/ArticleJsonLd";
import { BreadcrumbJsonLd } from "../schema/BreadcrumbJsonLd";
import { FaqJsonLd } from "../schema/FaqJsonLd";
import { WideArticleShell } from "./PageShell";
import { Eyebrow } from "../editorial/Eyebrow";
import { DotRule, LabRule } from "../editorial/DotRule";
import { KeyTakeaway } from "../editorial/KeyTakeaway";
import { PullQuote } from "../editorial/PullQuote";

export function PillarTemplate({ post }: { post: Post }) {
  const hub = getHub(post.hub);
  const crumbs = [
    { label: "Home", href: "/" },
    { label: "Guides", href: "/#issue-contents" },
    hub ? { label: hub.name, href: `/guides/${hub.slug}` } : { label: "" },
    { label: post.title },
  ];
  const related = relatedPosts(post);

  return (
    <>
      <ArticleJsonLd
        path={`/${post.slug}`}
        headline={post.h1}
        description={post.description}
        datePublished={post.publishedAt}
        dateModified={post.updatedAt}
      />
      <BreadcrumbJsonLd crumbs={crumbs} />
      {post.faq && <FaqJsonLd faq={post.faq} />}

      <WideArticleShell
        aside={
          <nav className="space-y-6">
            <div>
              <Eyebrow tone="stone">On this page</Eyebrow>
              <ul className="mt-3 space-y-2 text-[14px]">
                <li>
                  <a href="#lede" className="text-forest hover:text-sage">
                    The short answer
                  </a>
                </li>
                {post.faq && post.faq.length > 0 && (
                  <li>
                    <a href="#faq" className="text-forest hover:text-sage">
                      Frequently asked questions
                    </a>
                  </li>
                )}
                <li>
                  <a href="#sources" className="text-forest hover:text-sage">
                    Sources
                  </a>
                </li>
              </ul>
            </div>
            <div className="pt-6 border-t border-forest/10">
              <Eyebrow tone="stone">The lab</Eyebrow>
              <dl className="mt-3 space-y-2.5 text-[13.5px]">
                <div className="flex justify-between">
                  <dt className="text-stone">Cited</dt>
                  <dd className="text-forest tnum">
                    {(post.sources ?? []).length} sources
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-stone">Read time</dt>
                  <dd className="text-forest tnum">{post.readingTime} min</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-stone">Last updated</dt>
                  <dd className="text-forest">
                    {new Date(post.updatedAt).toLocaleDateString("en-US", {
                      month: "short",
                      year: "numeric",
                    })}
                  </dd>
                </div>
              </dl>
            </div>
          </nav>
        }
      >
        <Breadcrumbs crumbs={crumbs} />

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Eyebrow tone="sage">The Guide</Eyebrow>
          {hub && (
            <span className="caps-label text-stone">· {hub.shortName}</span>
          )}
        </div>

        <h1
          id="lede"
          className="display-headline text-forest mt-4 text-[2.35rem] md:text-[3.2rem] leading-[1.04]"
        >
          {post.h1}
        </h1>

        <div className="mt-6 flex flex-wrap items-center gap-4">
          <ReviewStamp
            updatedAt={post.updatedAt}
            readingTime={post.readingTime}
          />
        </div>

        <LabRule className="mt-8" />

        <p className="drop-cap mt-10 text-[1.12rem] md:text-[1.17rem] leading-[1.7] text-charcoal/90 max-w-[62ch]">
          {post.description}
        </p>

        <PullQuote attribution="PlasticFreeLab house view">
          We'd rather answer the question you actually asked in the first
          paragraph, then earn your trust by showing the work.
        </PullQuote>

        <KeyTakeaway variant="key-takeaway" title="What this guide covers">
          What the best available evidence says today, what's still genuinely
          uncertain, and what you can actually do this week — in priority order,
          with every claim sourced.
        </KeyTakeaway>

        {post.faq && post.faq.length > 0 && (
          <section id="faq" className="mt-14">
            <Eyebrow tone="terracotta">The FAQ</Eyebrow>
            <h2 className="font-serif text-3xl text-forest mt-2 mb-6 leading-tight">
              The questions people actually bring us.
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
