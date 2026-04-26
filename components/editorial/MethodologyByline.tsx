import { getTranslations, getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Monogram } from "./Monogram";
import type { Post } from "@/lib/content/posts";
import type { Locale } from "@/i18n/routing";

const DATE_LOCALE: Record<string, string> = {
  en: "en-US",
  de: "de-DE",
  fr: "fr-FR",
};

/**
 * MethodologyByline — caps Inter byline that appears under post H1.
 *
 * Two shapes:
 *  - Scored posts (comparison + listicle, when `post.pflScore` is set):
 *      [Monogram T] CARLOS SÁNCHEZ · TESTING LEAD  ·  TESTED VIA PFL METHODOLOGY V1.2 ↗  ·  LAB TESTS RUN APR 2026
 *  - Unscored posts (pillar + cluster):
 *      [Monogram] THE PLASTICFREELAB TEAM  ·  PUBLISHED APR 2026  ·  REFRESHED APR 2026
 *
 * The methodology version links to /methodology/v1-2 (or whatever
 * version is set on the post). Stone color, hover-underlined sage.
 */
export async function MethodologyByline({ post }: { post: Post }) {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("methodologyByline");
  const dateOpts: Intl.DateTimeFormatOptions = {
    month: "short",
    year: "numeric",
  };
  const dateLocale = DATE_LOCALE[locale] ?? "en-US";

  const scored = Boolean(post.pflScore);

  if (scored) {
    const version = post.testingMethodology ?? "v1.2";
    const versionPath = `/methodology/${version.replace(/\./g, "-")}`;
    const testedDateLabel = post.testedDate
      ? new Date(post.testedDate).toLocaleDateString(dateLocale, dateOpts)
      : new Date(post.updatedAt).toLocaleDateString(dateLocale, dateOpts);

    return (
      <div className="method-byline">
        <Monogram size={24} letters="T" tone="terracotta" />
        <span className="method-byline__name">{t("scored.reviewerName")}</span>
        <span className="method-byline__sep">·</span>
        <span>{t("scored.reviewerRole")}</span>
        <span className="method-byline__sep">·</span>
        <Link href={versionPath} className="method-byline__link">
          {t("scored.testedVia", { version: version.toUpperCase() })}
          <span aria-hidden> ↗</span>
        </Link>
        <span className="method-byline__sep">·</span>
        <span>
          {t("scored.labRun", { date: testedDateLabel.toUpperCase() })}
        </span>
      </div>
    );
  }

  const publishedLabel = new Date(post.publishedAt)
    .toLocaleDateString(dateLocale, dateOpts)
    .toUpperCase();
  const refreshedLabel = new Date(post.updatedAt)
    .toLocaleDateString(dateLocale, dateOpts)
    .toUpperCase();

  return (
    <div className="method-byline">
      <Monogram size={24} />
      <span className="method-byline__name">{t("plain.team")}</span>
      <span className="method-byline__sep">·</span>
      <span>{t("plain.published", { date: publishedLabel })}</span>
      <span className="method-byline__sep">·</span>
      <span>{t("plain.refreshed", { date: refreshedLabel })}</span>
    </div>
  );
}
