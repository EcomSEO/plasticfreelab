import type { Post } from "@/lib/content/posts";
import { getHub, hubs } from "@/lib/content/hubs";
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
import { ArticleShell } from "./PageShell";

export function ComparisonTemplate({ post }: { post: Post }) {
  const hub = getHub(post.hub);
  const crumbs = [
    { label: "Home", href: "/" },
    { label: "Guides", href: "/#hubs" },
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
      {post.products && (
        <ItemListJsonLd
          items={post.products.map((p) => ({ rank: p.rank, name: p.name }))}
        />
      )}

      <ArticleShell>
        <Breadcrumbs crumbs={crumbs} />
        <h1 className="font-serif text-4xl md:text-5xl text-forest mt-4 leading-tight">
          {post.h1}
        </h1>
        <div className="mt-3">
          <ReviewStamp updatedAt={post.updatedAt} readingTime={post.readingTime} />
        </div>
        <AffiliateDisclosure />

        <p className="mt-4 text-lg text-charcoal/90 leading-relaxed">
          {post.description}
        </p>

        {post.ourPick && (
          <section className="mt-8 p-6 rounded-lg bg-terracotta/10 border border-terracotta/30">
            <div className="text-xs uppercase tracking-wide text-terracotta mb-1">
              Our pick · {post.ourPick.tier}
            </div>
            <h2 className="font-serif text-2xl text-forest mb-2">
              {post.ourPick.name}
            </h2>
            <p className="text-charcoal/80">{post.ourPick.reason}</p>
          </section>
        )}

        {post.products && (
          <section className="mt-10">
            <h2 className="font-serif text-2xl text-forest mb-4">The short list</h2>
            <ol className="space-y-6">
              {post.products.map((p) => (
                <li key={p.rank} className="p-5 border border-forest/10 rounded-lg bg-white/60">
                  <div className="flex items-baseline gap-3">
                    <span className="font-serif text-2xl text-sage">{p.rank}.</span>
                    <div>
                      <h3 className="font-serif text-xl text-forest">{p.name}</h3>
                      <span className="text-xs uppercase tracking-wide text-charcoal/50">
                        {p.tier}
                      </span>
                    </div>
                  </div>
                  <p className="mt-3 text-charcoal/80 text-[15px]">{p.summary}</p>
                </li>
              ))}
            </ol>
          </section>
        )}

        {post.faq && post.faq.length > 0 && (
          <section className="mt-10">
            <h2 className="font-serif text-2xl text-forest mb-3">
              Frequently asked questions
            </h2>
            <div className="space-y-4">
              {post.faq.map((f, i) => (
                <div key={i}>
                  <h3 className="font-serif text-lg text-forest">{f.q}</h3>
                  <p className="text-charcoal/80">{f.a}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        <SourcesList sources={post.sources ?? []} />
        <AuthorBio />
        <RelatedPosts posts={related} />
        <EmailCapture variant="end-of-article" />
      </ArticleShell>
    </>
  );
}
