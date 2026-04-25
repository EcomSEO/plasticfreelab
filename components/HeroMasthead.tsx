import { getTranslations, getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { tPost, type Post } from "@/lib/content/posts";
import { tHub, type Hub } from "@/lib/content/hubs";
import type { Locale } from "@/i18n/routing";
import { BotanicalHero } from "./editorial/BotanicalHero";
import { SITE } from "@/lib/content/site";

export async function HeroMasthead({
  issueItems,
}: {
  issueItems: Array<{ post: Post; hub: Hub | undefined }>;
}) {
  const t = await getTranslations("masthead");
  const locale = (await getLocale()) as Locale;

  return (
    <section className="masthead" aria-labelledby="masthead-title">
      <div className="masthead__gutter-rule" aria-hidden />

      <div className="masthead__botanical" aria-hidden>
        <BotanicalHero />
      </div>

      <div className="masthead__container">
        {/* Top imprint — small-caps mono metadata */}
        <div className="masthead__imprint masthead-reveal-1">
          <span className="masthead__imprint-mark" aria-hidden />
          <span>Issue No. 01</span>
          <span aria-hidden>·</span>
          <span>{SITE.volume}</span>
          <span aria-hidden>·</span>
          <span>{t("imprintEdition")}</span>
          <span aria-hidden className="masthead__imprint-dot" />
          <span>MMXXVI</span>
        </div>

        {/* Headline */}
        <h1 id="masthead-title" className="masthead__headline" data-balance>
          <span className="masthead__line masthead-reveal-2">
            {t("headlineLine1")}
          </span>
          <span className="masthead__line masthead-reveal-3">
            <span className="masthead__word">{t("headlineWordLab")}</span>
            <span className="masthead__ampersand" aria-hidden>
              &amp;
            </span>
            <span className="masthead__word">{t("headlineWordThe")}</span>
          </span>
          <span className="masthead__line masthead-reveal-4">
            <span className="masthead__quietly">{t("headlineQuietly")}</span>
          </span>
          <span className="masthead__line masthead__line--small masthead-reveal-5">
            {t("headlineLast")}
          </span>
        </h1>

        {/* Floating pullquote footnote */}
        <aside className="masthead__footnote masthead-reveal-6" aria-hidden>
          <span className="masthead__footnote-rule" />
          <span className="masthead__footnote-text">
            <em>{t("footnoteFig")}</em> {t("footnoteText")}
          </span>
        </aside>

        {/* Body + CTAs */}
        <div className="masthead__lede masthead-reveal-7">
          <p className="masthead__body">
            {t("ledeBefore")}{" "}
            <span className="font-instrument italic">&ldquo;{t("ledeQuote")}&rdquo;</span>{" "}
            {t("ledeAfter")}
          </p>
          <div className="masthead__ctas">
            <Link href="/guides/non-toxic-kitchen" className="btn-primary">
              {t("ctaPrimary")}
              <span aria-hidden>→</span>
            </Link>
            <Link href="#issue-contents" className="btn-secondary">
              {t("ctaSecondary")}
            </Link>
          </div>
        </div>

        {/* "In this issue" — bottom-left */}
        <aside
          className="masthead__issue masthead-reveal-8"
          aria-labelledby="masthead-issue-label"
        >
          <div id="masthead-issue-label" className="masthead__issue-label">
            {t("issueLabel")}
          </div>
          <ol className="masthead__issue-list">
            {issueItems.slice(0, 4).map(({ post, hub }, i) => {
              const pt = tPost(post, locale);
              const ht = tHub(hub, locale);
              return (
                <li key={post.slug}>
                  <Link
                    href={`/${post.slug}`}
                    className="masthead__issue-link"
                  >
                    <span className="masthead__issue-num tnum">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="masthead__issue-title">{pt.title}</span>
                    <span className="masthead__issue-meta">
                      {ht.shortName} · {post.readingTime} min
                    </span>
                  </Link>
                </li>
              );
            })}
          </ol>
        </aside>

        {/* Bottom folio */}
        <div className="masthead__folio masthead-reveal-9">
          <span className="masthead__folio-rule" aria-hidden />
          <span className="masthead__folio-text">{t("folioText")}</span>
          <span className="masthead__folio-arrow" aria-hidden>↓</span>
        </div>
      </div>
    </section>
  );
}
