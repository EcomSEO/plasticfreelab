import { getTranslations } from "next-intl/server";
import { Eyebrow } from "./editorial/Eyebrow";

export async function AuthorBio() {
  const t = await getTranslations("authorBio");
  return (
    <section className="mt-14 bg-cream-deep/40 border border-forest/10 rounded-sm p-7 md:p-8">
      <div className="flex flex-col md:flex-row gap-6 items-start">
        <div
          aria-hidden
          className="shrink-0 h-16 w-16 rounded-full bg-forest text-cream flex items-center justify-center font-serif text-xl"
          style={{ fontVariationSettings: '"opsz" 144, "SOFT" 40' }}
        >
          PL
        </div>
        <div>
          <Eyebrow tone="stone">{t("eyebrow")}</Eyebrow>
          <h3 className="font-serif text-xl text-forest mt-1.5 mb-2">
            {t("name")}
          </h3>
          <p className="text-charcoal/85 leading-relaxed text-[15px] max-w-[62ch]">
            {t("body")}
          </p>
          <div className="mt-4 flex items-center gap-4 text-[13px]">
            <a
              href="/editorial-standards"
              className="text-sage hover:text-terracotta transition"
            >
              {t("standardsLink")}
            </a>
            <span aria-hidden className="h-1 w-1 rounded-full bg-sage/50" />
            <a
              href="/contact"
              className="text-sage hover:text-terracotta transition"
            >
              {t("correctionLink")}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
