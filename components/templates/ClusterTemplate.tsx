import type { Post } from "@/lib/content/posts";
import { getHub } from "@/lib/content/hubs";
import { relatedPosts } from "@/lib/content/posts";
import { Breadcrumbs } from "../Breadcrumbs";
import { ReviewStamp } from "../ReviewStamp";
import { Callout } from "../Callout";
import { AuthorBio } from "../AuthorBio";
import { RelatedPosts } from "../RelatedPosts";
import { SourcesList } from "../SourcesList";
import { EmailCapture } from "../EmailCapture";
import { ArticleJsonLd } from "../schema/ArticleJsonLd";
import { BreadcrumbJsonLd } from "../schema/BreadcrumbJsonLd";
import { FaqJsonLd } from "../schema/FaqJsonLd";
import { ArticleShell } from "./PageShell";

export function ClusterTemplate({ post }: { post: Post }) {
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

      <ArticleShell>
        <Breadcrumbs crumbs={crumbs} />
        <h1 className="font-serif text-3xl md:text-4xl text-forest mt-4 leading-tight">
          {post.h1}
        </h1>
        <div className="mt-3">
          <ReviewStamp updatedAt={post.updatedAt} readingTime={post.readingTime} />
        </div>

        <p className="mt-8 text-lg text-charcoal/90 leading-relaxed">
          {post.description}
        </p>

        <Callout variant="note" title="Status">
          Stub. The direct-answer paragraph, body, and FAQ land once the draft clears review.
        </Callout>

        <div className="prose prose-lg mt-8 text-charcoal">
          <p className="text-charcoal/60 italic">TODO: draft body per brief.</p>
        </div>

        <SourcesList sources={post.sources ?? []} />
        <AuthorBio />
        <RelatedPosts posts={related} />
        <EmailCapture variant="end-of-article" />
      </ArticleShell>
    </>
  );
}
