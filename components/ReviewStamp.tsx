import { getTranslations, getLocale } from "next-intl/server";

const DATE_LOCALE: Record<string, string> = {
  en: "en-US",
  de: "de-DE",
  fr: "fr-FR",
};

export async function ReviewStamp({
  updatedAt,
  readingTime,
  author,
}: {
  updatedAt: string;
  readingTime: number;
  author?: string;
}) {
  const t = await getTranslations("common");
  const tBio = await getTranslations("authorBio");
  const locale = await getLocale();
  const formatted = new Date(updatedAt).toLocaleDateString(
    DATE_LOCALE[locale] ?? "en-US",
    { year: "numeric", month: "long", day: "numeric" }
  );
  const name = author ?? tBio("name");
  return (
    <p className="flex flex-wrap items-center gap-2 text-[13px] text-stone">
      <span className="font-serif text-forest">
        {t("by")} {name}
      </span>
      <span aria-hidden className="h-1 w-1 rounded-full bg-sage/60" />
      <span>{t("updated", { date: formatted })}</span>
      <span aria-hidden className="h-1 w-1 rounded-full bg-sage/60" />
      <span className="tnum">{t("minRead", { n: readingTime })}</span>
    </p>
  );
}
