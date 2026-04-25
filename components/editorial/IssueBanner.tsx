import { getTranslations } from "next-intl/server";

/**
 * IssueBanner — thin sage strip that sits just below the masthead.
 * Sets the "this is a published issue" frame.
 */
export async function IssueBanner() {
  const t = await getTranslations("issueBanner");
  return (
    <div className="issue-banner" role="complementary" aria-label={t("issue")}>
      <div className="issue-banner__inner">
        <span className="issue-banner__mark" aria-hidden />
        <span>{t("issue")}</span>
        <span aria-hidden className="issue-banner__dot" />
        <span>{t("edition")}</span>
        <span aria-hidden className="issue-banner__dot" />
        <span>{t("investigations")}</span>
      </div>
    </div>
  );
}
