import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getHub, hubs } from "@/lib/content/hubs";
import { postsByHub } from "@/lib/content/posts";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { BreadcrumbJsonLd } from "@/components/schema/BreadcrumbJsonLd";
import { PostCard } from "@/components/PostCard";
import { EmailCapture } from "@/components/EmailCapture";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return hubs.map((h) => ({ hub: h.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ hub: string }>;
}): Promise<Metadata> {
  const { hub: hubSlug } = await params;
  const hub = getHub(hubSlug);
  if (!hub) return {};
  return pageMetadata({
    title: hub.name,
    description: hub.oneLiner,
    path: `/guides/${hub.slug}`,
  });
}

export default async function HubPage({
  params,
}: {
  params: Promise<{ hub: string }>;
}) {
  const { hub: hubSlug } = await params;
  const hub = getHub(hubSlug);
  if (!hub) notFound();

  const hubPosts = postsByHub(hub.slug);
  const pillar = hubPosts.find((p) => p.postType === "pillar");
  const comparisons = hubPosts.filter((p) => p.postType === "comparison");
  const others = hubPosts.filter(
    (p) => p.postType !== "pillar" && p.postType !== "comparison"
  );

  const crumbs = [
    { label: "Home", href: "/" },
    { label: "Guides" },
    { label: hub.name },
  ];

  return (
    <>
      <BreadcrumbJsonLd crumbs={crumbs} />
      <main className="mx-auto max-w-6xl px-6 py-12 md:py-16">
        <Breadcrumbs crumbs={crumbs} />
        <h1 className="font-serif text-4xl md:text-5xl text-forest mt-4 leading-tight max-w-3xl">
          {hub.name}
        </h1>
        <p className="mt-6 text-lg text-charcoal/80 max-w-2xl leading-relaxed">
          {hub.thesis}
        </p>

        {pillar && (
          <section className="mt-12">
            <h2 className="font-serif text-2xl text-forest mb-4">Start here</h2>
            <PostCard post={pillar} variant="feature" />
          </section>
        )}

        {comparisons.length > 0 && (
          <section className="mt-12">
            <h2 className="font-serif text-2xl text-forest mb-4">
              The ranked comparisons
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {comparisons.map((p) => (
                <PostCard key={p.slug} post={p} />
              ))}
            </div>
          </section>
        )}

        {others.length > 0 && (
          <section className="mt-12">
            <h2 className="font-serif text-2xl text-forest mb-4">Everything else in this hub</h2>
            <div className="grid md:grid-cols-2 gap-5">
              {others.map((p) => (
                <PostCard key={p.slug} post={p} />
              ))}
            </div>
          </section>
        )}

        {hubPosts.length === 0 && (
          <p className="mt-12 text-charcoal/60">
            Posts land here as they clear editorial review. See the{" "}
            <Link href="/" className="text-sage underline">
              home page
            </Link>{" "}
            for what&apos;s live today.
          </p>
        )}

        <EmailCapture />
      </main>
    </>
  );
}
