import { getTranslations, getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { tPost, type Post } from "@/lib/content/posts";
import { tHub, getHub } from "@/lib/content/hubs";
import type { Locale } from "@/i18n/routing";
import { Byline } from "./editorial/Monogram";
import { PFLScore } from "./editorial/PFLScore";

export async function PostCard({
  post,
  variant = "compact",
}: {
  post: Post;
  variant?: "compact" | "feature";
}) {
  const t = await getTranslations("postType");
  const locale = (await getLocale()) as Locale;
  const hub = getHub(post.hub);
  const ht = tHub(hub, locale);
  const pt = tPost(post, locale);
  const hasScore = typeof post.pflScore?.overall === "number";

  if (variant === "feature") {
    return (
      <Link
        href={`/${post.slug}`}
        className="card-editorial block p-8 bg-white/70 border border-forest/10 rounded-lg relative"
      >
        <span className="text-xs uppercase tracking-wide text-sage">
          {ht.shortName} · {t(post.postType)}
        </span>
        <h3 className="font-serif text-2xl text-forest mt-2 mb-3">{pt.title}</h3>
        <p className="text-charcoal/80 text-[15px] leading-relaxed">
          {pt.description}
        </p>
        <div className="mt-4 flex items-center justify-between gap-3">
          <Byline readingTime={post.readingTime} />
          {hasScore && (
            <PFLScore
              score={post.pflScore!.overall}
              size="sm"
              showTier={false}
            />
          )}
        </div>
      </Link>
    );
  }
  return (
    <Link
      href={`/${post.slug}`}
      className="card-editorial block p-5 bg-white/60 border border-forest/10 rounded-lg relative"
    >
      <span className="text-xs uppercase tracking-wide text-sage">
        {ht.shortName} · {t(post.postType)}
      </span>
      <h3 className="font-serif text-lg text-forest mt-2 mb-2 leading-snug pr-10">
        {pt.title}
      </h3>
      <p className="text-sm text-charcoal/70 line-clamp-2">{pt.description}</p>
      <div className="mt-3 flex items-center justify-between gap-2">
        <Byline readingTime={post.readingTime} compact />
        {hasScore && (
          <span className="shrink-0">
            <PFLScore
              score={post.pflScore!.overall}
              size="sm"
              showTier={false}
            />
          </span>
        )}
      </div>
    </Link>
  );
}
