import type { Post } from "@/lib/content/posts";
import { getHub } from "@/lib/content/hubs";
import { relatedPosts } from "@/lib/content/posts";
import { Breadcrumbs } from "../Breadcrumbs";
import { ReviewStamp } from "../ReviewStamp";
import { AffiliateDisclosure } from "../AffiliateDisclosure";
import { AuthorBio } from "../AuthorBio";
import { RelatedPosts } from "../RelatedPosts";
import { SourcesList } from "../SourcesList";
import { EmailCapture } from "../EmailCapture";
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

export function ComparisonTemplate({ post }: { post: Post }) {
  const hub = getHub(post.hub);
  const crumbs = [
    { label: "Home", href: "/" },
    { label: "Guides", href: "/#issue-contents" },
    hub ? { label: hub.name, href: `/guides/${hub.slug}` } : { label: "" },
    { label: post.title },
  ];
  const related = relatedPosts(post);

  // Split products: top pick vs runners-up vs skips
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
        headline={post.h1}
        description={post.description}
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
              <Eyebrow tone="stone">On this page</Eyebrow>
              <ul className="mt-3 space-y-2 text-[14px]">
                {post.ourPick && (
                  <li>
                    <a href="#our-pick" className="text-forest hover:text-sage">
                      Our pick
                    </a>
                  </li>
                )}
                <li>
                  <a href="#short-list" className="text-forest hover:text-sage">
                    The ranked list
                  </a>
                </li>
                {skips.length > 0 && (
                  <li>
                    <a href="#skips" className="text-forest hover:text-sage">
                      What we'd skip
                    </a>
                  </li>
                )}
                <li>
                  <a href="#methodology" className="text-forest hover:text-sage">
                    Methodology
                  </a>
                </li>
                {post.faq && post.faq.length > 0 && (
                  <li>
                    <a href="#faq" className="text-forest hover:text-sage">
                      FAQ
                    </a>
                  </li>
                )}
                <li>
                  <a href="#change-mind" className="text-forest hover:text-sage">
                    What would change our mind
                  </a>
                </li>
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
                  <dt className="text-stone">Tested</dt>
                  <dd className="text-forest tnum">{picks.length}+ products</dd>
                </div>
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

        {/* Eyebrow + hub chip */}
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Eyebrow tone="terracotta">The Comparison</Eyebrow>
          {hub && (
            <span className="caps-label text-stone">· {hub.shortName}</span>
          )}
        </div>

        <h1 className="display-headline text-forest mt-4 text-[2.25rem] md:text-[3.1rem] leading-[1.04]">
          {post.h1}
        </h1>

        <p className="mt-6 text-lg md:text-[1.22rem] text-charcoal/85 max-w-[60ch] leading-[1.55]">
          {post.description}
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-4">
          <ReviewStamp
            updatedAt={post.updatedAt}
            readingTime={post.readingTime}
          />
        </div>

        <div className="mt-4">
          <AffiliateDisclosure />
        </div>

        <LabRule className="mt-10" />

        {/* Our Pick — hero callout */}
        {post.ourPick && (
          <section id="our-pick" className="mt-10">
            <div className="relative overflow-hidden bg-gradient-to-br from-cream-deep to-paper border border-sage/40 rounded-sm p-7 md:p-10">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-sage" />
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <TierBadge tier={post.ourPick.tier} />
                <Eyebrow tone="sage">Our pick</Eyebrow>
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
                <Eyebrow tone="terracotta">The Ranked List</Eyebrow>
                <h2 className="font-serif text-3xl text-forest mt-2 leading-tight">
                  Everything we'd buy, in order.
                </h2>
              </div>
              <div className="caps-label text-stone">
                {picks.length} picks · ranked by merit
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

        {/* Skip section — contrarian credibility */}
        {skips.length > 0 && (
          <section id="skips" className="mt-14">
            <div className="bg-forest/[0.04] border border-forest/15 rounded-sm p-7 md:p-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="h-1.5 w-1.5 rounded-full bg-terracotta" />
                <Eyebrow tone="terracotta">What we'd skip — and why</Eyebrow>
              </div>
              <h2 className="font-serif text-2xl text-forest mb-5 leading-tight">
                Named, not hinted at.
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

        {/* Methodology — the wedge */}
        <div id="methodology">
          <MethodologyBlock />
        </div>

        {/* FAQ */}
        {post.faq && post.faq.length > 0 && (
          <section id="faq" className="mt-14">
            <Eyebrow tone="sage">The FAQ</Eyebrow>
            <h2 className="font-serif text-3xl text-forest mt-2 mb-6 leading-tight">
              What people ask us most.
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

        {/* What would change our mind */}
        <div id="change-mind">
          <WhatWouldChangeOurMind>
            <p>
              New independent lab testing that contradicts our current ranking.
              A reformulation by a top pick that quietly drops a disclosed
              certification. A peer-reviewed paper that changes the safety
              picture on one of the materials above. We'll update this page
              within a week and mark what changed.
            </p>
          </WhatWouldChangeOurMind>
        </div>

        <DotRule className="my-14" />

        {/* Sources */}
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
