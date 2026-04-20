import Link from "next/link";
import type { Post } from "@/lib/content/posts";
import { getHub } from "@/lib/content/hubs";

const typeLabel: Record<Post["postType"], string> = {
  pillar: "Guide",
  comparison: "Comparison",
  cluster: "Explainer",
  listicle: "Listicle",
};

export function PostCard({ post, variant = "compact" }: { post: Post; variant?: "compact" | "feature" }) {
  const hub = getHub(post.hub);
  if (variant === "feature") {
    return (
      <Link
        href={`/${post.slug}`}
        className="block p-8 bg-white/70 border border-forest/10 rounded-lg hover:border-sage transition"
      >
        <span className="text-xs uppercase tracking-wide text-sage">
          {hub?.shortName} · {typeLabel[post.postType]}
        </span>
        <h3 className="font-serif text-2xl text-forest mt-2 mb-3">{post.title}</h3>
        <p className="text-charcoal/80 text-[15px] leading-relaxed">{post.description}</p>
        <span className="mt-4 inline-block text-sage text-sm">Read the full comparison →</span>
      </Link>
    );
  }
  return (
    <Link
      href={`/${post.slug}`}
      className="block p-5 bg-white/60 border border-forest/10 rounded-lg hover:border-sage transition"
    >
      <span className="text-xs uppercase tracking-wide text-sage">
        {hub?.shortName} · {typeLabel[post.postType]}
      </span>
      <h3 className="font-serif text-lg text-forest mt-2 mb-2 leading-snug">{post.title}</h3>
      <p className="text-sm text-charcoal/70 line-clamp-2">{post.description}</p>
      <span className="mt-3 inline-block text-xs text-charcoal/50">
        {post.readingTime} min read
      </span>
    </Link>
  );
}
