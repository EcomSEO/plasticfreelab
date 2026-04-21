import Link from "next/link";
import type { Post } from "@/lib/content/posts";
import { getHub } from "@/lib/content/hubs";
import { Eyebrow } from "./editorial/Eyebrow";

const typeLabel: Record<string, string> = {
  pillar: "The Guide",
  comparison: "The Comparison",
  cluster: "The Explainer",
  listicle: "The Audit",
};

export function RelatedPosts({ posts }: { posts: Post[] }) {
  if (posts.length === 0) return null;
  return (
    <section className="mt-16">
      <Eyebrow tone="terracotta">Keep reading</Eyebrow>
      <h2 className="font-serif text-2xl text-forest mt-2 mb-6 leading-tight">
        Related in this hub.
      </h2>
      <ul className="divide-y divide-forest/10 border-y border-forest/10">
        {posts.map((p) => {
          const hub = getHub(p.hub);
          return (
            <li key={p.slug}>
              <Link
                href={`/${p.slug}`}
                className="group grid md:grid-cols-[auto_1fr_auto] gap-5 py-5 items-baseline hover:bg-cream-deep/30 -mx-2 px-2 transition"
              >
                <span className="caps-label text-stone whitespace-nowrap">
                  {typeLabel[p.postType]}
                </span>
                <div>
                  <h3 className="font-serif text-lg text-forest group-hover:text-sage transition leading-snug">
                    {p.title}
                  </h3>
                  <p className="text-[13.5px] text-charcoal/70 mt-1 line-clamp-1">
                    {hub?.shortName} · {p.description}
                  </p>
                </div>
                <span className="caps-label text-stone tnum whitespace-nowrap">
                  {p.readingTime} min
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
