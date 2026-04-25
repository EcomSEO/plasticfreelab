import { getTranslations } from "next-intl/server";

export async function AffiliateDisclosure() {
  const t = await getTranslations("affiliate");
  return (
    <div className="flex items-start gap-3 text-[13px] text-charcoal/80 bg-sage/10 border-l-2 border-sage/60 px-4 py-3 my-5 rounded-r-sm">
      <span
        aria-hidden
        className="mt-1 h-1.5 w-1.5 rounded-full bg-sage shrink-0"
      />
      <p className="leading-relaxed">
        <span className="caps-label text-sage">{t("label")}</span>
        <span className="mx-2 text-sage/50">·</span>
        {t("body")}
      </p>
    </div>
  );
}
