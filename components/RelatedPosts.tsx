import { getTranslations, getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { tPost, type Post } from "@/lib/content/posts";
import { tHub, getHub } from "@/lib/content/hubs";
import type { Locale } from "@/i18n/routing";
import { Eyebrow } from "./editorial/Eyebrow";

export async function RelatedPosts({ posts }: { posts: Post[] }) {
  if (posts.length === 0) return null;
  const t = await getTranslations("related");
  const tType = await getTranslations("postType");
  const tCommon = await getTranslations("common");
  const locale = (await getLocale()) as Locale;
  return (
    <section className="mt-16">
      <Eyebrow tone="terracotta">{t("eyebrow")}</Eyebrow>
      <h2 className="font-serif text-2xl text-forest mt-2 mb-6 leading-tight">
        {t("title")}
      </h2>
      <ul className="divide-y divide-forest/10 border-y border-forest/10">
        {posts.map((p) => {
          const hub = getHub(p.hub);
          const ht = tHub(hub, locale);
          const pt = tPost(p, locale);
          return (
            <li key={p.slug}>
              <Link
                href={`/${p.slug}`}
                className="group grid md:grid-cols-[auto_1fr_auto] gap-5 py-5 items-baseline hover:bg-cream-deep/30 -mx-2 px-2 transition"
              >
                <span className="caps-label text-stone whitespace-nowrap">
                  {tType(p.postType)}
                </span>
                <div>
                  <h3 className="font-serif text-lg text-forest group-hover:text-sage transition leading-snug">
                    {pt.title}
                  </h3>
                  <p className="text-[13.5px] text-charcoal/70 mt-1 line-clamp-1">
                    {ht.shortName} · {pt.description}
                  </p>
                </div>
                <span className="caps-label text-stone tnum whitespace-nowrap">
                  {tCommon("min", { n: p.readingTime })}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
