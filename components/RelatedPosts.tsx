import type { Post } from "@/lib/content/posts";
import { PostCard } from "./PostCard";

export function RelatedPosts({ posts }: { posts: Post[] }) {
  if (posts.length === 0) return null;
  return (
    <section className="mt-16">
      <h2 className="font-serif text-2xl text-forest mb-6">Related posts</h2>
      <div className="grid md:grid-cols-3 gap-5">
        {posts.map((p) => (
          <PostCard key={p.slug} post={p} />
        ))}
      </div>
    </section>
  );
}
