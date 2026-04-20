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
import { ItemListJsonLd } from "../schema/ItemListJsonLd";
import { ArticleShell } from "./PageShell";

export function ListicleTemplate({ post }: { post: Post }) {
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
      {post.items && (
        <ItemListJsonLd
          items={post.items.map((i) => ({ rank: i.rank, name: i.name }))}
        />
      )}

      <ArticleShell>
        <Breadcrumbs crumbs={crumbs} />
        <h1 className="font-serif text-3xl md:text-4xl text-forest mt-4 leading-tight">
          {post.h1}
        </h1>
        <div className="mt-3">
          <ReviewStamp updatedAt={post.updatedAt} readingTime={post.readingTime} />
        </div>

        <p className="mt-6 text-lg text-charcoal/90 leading-relaxed">
          {post.description}
        </p>

        {post.items && (
          <ol className="mt-10 space-y-6">
            {post.items.map((item) => (
              <li
                key={item.rank}
                className="p-5 rounded-lg border border-forest/10 bg-white/60"
              >
                <h2 className="font-serif text-xl text-forest">
                  <span className="text-sage">{item.rank}.</span> {item.name}
                </h2>
                <p className="mt-2 text-charcoal/80 text-[15px]">{item.summary}</p>
              </li>
            ))}
          </ol>
        )}

        <SourcesList sources={post.sources ?? []} />
        <AuthorBio />
        <RelatedPosts posts={related} />
        <EmailCapture variant="end-of-article" />
      </ArticleShell>
    </>
  );
}
