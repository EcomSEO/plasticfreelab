import { getTranslations } from "next-intl/server";

/**
 * TranslationPendingBanner — shown above article body content on
 * non-English locales when only the title/description has been
 * translated for phase 1. Body copy renders in English below.
 */
export async function TranslationPendingBanner() {
  const t = await getTranslations("postChrome");
  const body = t("translationBanner");
  if (!body) return null;
  return (
    <aside
      role="note"
      className="mt-8 mb-2 px-5 py-4 border-l-2 border-terracotta/60 bg-terracotta/5 rounded-r-sm"
    >
      <p className="text-[14px] text-charcoal/85 leading-relaxed">{body}</p>
    </aside>
  );
}
