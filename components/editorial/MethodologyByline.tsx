import { getTranslations, getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { Post } from "@/lib/content/posts";
import type { Locale } from "@/i18n/routing";

const DATE_LOCALE: Record<string, string> = {
  en: "en-US",
  de: "de-DE",
  fr: "fr-FR",
};

/**
 * MethodologyByline — runrepeat-style plain inline byline.
 *
 *   [Author photo 32px round] Carlos Sánchez · Sep 11, 2025 · Reviewed using methodology v1.2
 *
 * Roboto 400, 14px, gray-mute. Methodology link in ink, underlined on hover.
 */
export async function MethodologyByline({ post }: { post: Post }) {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("methodologyByline");
  const dateOpts: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
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
        <span
          aria-hidden
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: 32,
            height: 32,
            borderRadius: "50%",
            backgroundColor: "#EEEEEE",
            color: "#1A3338",
            fontFamily: "Roboto, sans-serif",
            fontWeight: 700,
            fontSize: 12,
          }}
        >
          {(t("scored.reviewerName")?.[0] ?? "T").toUpperCase()}
        </span>
        <span className="method-byline__name">{t("scored.reviewerName")}</span>
        <span className="method-byline__sep">·</span>
        <span>{testedDateLabel}</span>
        <span className="method-byline__sep">·</span>
        <Link href={versionPath} className="method-byline__link">
          {t("scored.testedVia", { version: version.toUpperCase() })}
        </Link>
      </div>
    );
  }

  const publishedLabel = new Date(post.publishedAt).toLocaleDateString(
    dateLocale,
    dateOpts
  );
  const refreshedLabel = new Date(post.updatedAt).toLocaleDateString(
    dateLocale,
    dateOpts
  );

  return (
    <div className="method-byline">
      <span
        aria-hidden
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: 32,
          height: 32,
          borderRadius: "50%",
          backgroundColor: "#EEEEEE",
          color: "#1A3338",
          fontFamily: "Roboto, sans-serif",
          fontWeight: 700,
          fontSize: 12,
        }}
      >
        P
      </span>
      <span className="method-byline__name">{t("plain.team")}</span>
      <span className="method-byline__sep">·</span>
      <span>{t("plain.published", { date: publishedLabel })}</span>
      <span className="method-byline__sep">·</span>
      <span>{t("plain.refreshed", { date: refreshedLabel })}</span>
    </div>
  );
}
