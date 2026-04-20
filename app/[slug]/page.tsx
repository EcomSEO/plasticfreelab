import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPost, posts } from "@/lib/content/posts";
import { PillarTemplate } from "@/components/templates/PillarTemplate";
import { ComparisonTemplate } from "@/components/templates/ComparisonTemplate";
import { ClusterTemplate } from "@/components/templates/ClusterTemplate";
import { ListicleTemplate } from "@/components/templates/ListicleTemplate";
import { pageMetadata } from "@/lib/seo";

// Avoid colliding with /about, /contact, etc — static pages take precedence over this dynamic route.
const RESERVED = new Set([
  "about",
  "contact",
  "privacy",
  "terms",
  "affiliate-disclosure",
  "editorial-standards",
  "newsletter",
  "guides",
  "sitemap.xml",
  "robots.txt",
  "llms.txt",
]);

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (RESERVED.has(slug)) return {};
  const post = getPost(slug);
  if (!post) return {};
  const suffix =
    post.postType === "comparison"
      ? ` (Tested ${new Date(post.updatedAt).getFullYear()})`
      : "";
  return pageMetadata({
    title: `${post.title}${suffix}`,
    description: post.description,
    path: `/${post.slug}`,
    ogType: "article",
  });
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (RESERVED.has(slug)) notFound();
  const post = getPost(slug);
  if (!post) notFound();

  switch (post.postType) {
    case "pillar":
      return <PillarTemplate post={post} />;
    case "comparison":
      return <ComparisonTemplate post={post} />;
    case "listicle":
      return <ListicleTemplate post={post} />;
    case "cluster":
    default:
      return <ClusterTemplate post={post} />;
  }
}
