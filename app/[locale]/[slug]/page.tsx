import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { getPost, posts, tPost } from "@/lib/content/posts";
import { PillarTemplate } from "@/components/templates/PillarTemplate";
import { ComparisonTemplate } from "@/components/templates/ComparisonTemplate";
import { ClusterTemplate } from "@/components/templates/ClusterTemplate";
import { ListicleTemplate } from "@/components/templates/ListicleTemplate";
import { pageMetadata } from "@/lib/seo";
import { routing, type Locale } from "@/i18n/routing";

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
  return routing.locales.flatMap((locale) =>
    posts.map((p) => ({ locale, slug: p.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale: raw, slug } = await params;
  if (!hasLocale(routing.locales, raw)) return {};
  if (RESERVED.has(slug)) return {};
  const post = getPost(slug);
  if (!post) return {};
  const locale = raw as Locale;
  const pt = tPost(post, locale);
  const suffix =
    post.postType === "comparison"
      ? ` (${
          locale === "de" ? "Getestet " : locale === "fr" ? "Testé " : "Tested "
        }${new Date(post.updatedAt).getFullYear()})`
      : "";
  return pageMetadata({
    title: `${pt.title}${suffix}`,
    description: pt.description,
    path: `/${post.slug}`,
    locale,
    ogType: "article",
  });
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: raw, slug } = await params;
  if (!hasLocale(routing.locales, raw)) notFound();
  setRequestLocale(raw as Locale);
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
