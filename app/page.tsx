import { hubs } from "@/lib/content/hubs";
import { featuredPost, latestPosts } from "@/lib/content/posts";
import { HubCard } from "@/components/HubCard";
import { PostCard } from "@/components/PostCard";
import { EmailCapture } from "@/components/EmailCapture";
import Link from "next/link";

export default function HomePage() {
  const featured = featuredPost();
  const recent = latestPosts(6);

  return (
    <main>
      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <div className="max-w-3xl">
          <h1 className="font-serif text-5xl md:text-6xl leading-[1.08] text-forest">
            We test the non-toxic swaps so you don&apos;t have to.
          </h1>
          <p className="mt-6 text-xl text-charcoal/80 max-w-2xl leading-relaxed">
            Calm, cited guides to microplastics, PFAS, and the household swaps
            actually worth making — and the ones you can skip.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/guides/non-toxic-kitchen"
              className="inline-flex items-center rounded-md bg-forest px-6 py-3 text-cream hover:bg-sage transition"
            >
              Start with the kitchen →
            </Link>
            <Link
              href="#email-capture"
              className="inline-flex items-center rounded-md border border-forest/30 px-6 py-3 text-forest hover:border-forest transition"
            >
              Get the Kitchen Swap Audit
            </Link>
          </div>
        </div>
      </section>

      {/* Featured comparison */}
      {featured && (
        <section className="mx-auto max-w-6xl px-6 py-14 border-t border-forest/10">
          <div className="flex items-baseline justify-between mb-6 flex-wrap gap-2">
            <span className="text-xs uppercase tracking-wide text-terracotta">
              The one we&apos;re pushing this month
            </span>
          </div>
          <PostCard post={featured} variant="feature" />
        </section>
      )}

      {/* Hub grid */}
      <section id="hubs" className="mx-auto max-w-6xl px-6 py-16 border-t border-forest/10">
        <h2 className="font-serif text-3xl text-forest mb-8">The guides</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {hubs.map((hub) => (
            <HubCard key={hub.slug} hub={hub} />
          ))}
        </div>
      </section>

      {/* Latest posts */}
      {recent.length > 0 && (
        <section className="mx-auto max-w-6xl px-6 py-16 border-t border-forest/10">
          <h2 className="font-serif text-3xl text-forest mb-8">Latest</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {recent.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
        </section>
      )}

      {/* Email capture */}
      <section className="mx-auto max-w-6xl px-6 py-12 border-t border-forest/10">
        <EmailCapture />
      </section>

      {/* Trust strip */}
      <section className="mx-auto max-w-6xl px-6 py-16 border-t border-forest/10">
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div>
            <h3 className="font-serif text-lg text-forest mb-2">
              Every claim cited.
            </h3>
            <p className="text-sm text-charcoal/70">
              If it&apos;s not sourced, it&apos;s not published.
            </p>
          </div>
          <div>
            <h3 className="font-serif text-lg text-forest mb-2">
              Updated quarterly.
            </h3>
            <p className="text-sm text-charcoal/70">
              Product formulations change; our rankings change with them.
            </p>
          </div>
          <div>
            <h3 className="font-serif text-lg text-forest mb-2">
              No paid placements.
            </h3>
            <p className="text-sm text-charcoal/70">
              Commissions don&apos;t buy rankings. They never will.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
