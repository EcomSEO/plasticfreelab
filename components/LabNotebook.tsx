import { getTranslations } from "next-intl/server";
import { Eyebrow } from "./editorial/Eyebrow";

const KEYS = ["01", "02", "03", "04", "05", "06"] as const;

export async function LabNotebook() {
  const t = await getTranslations("labNotebook");

  return (
    <section
      className="lab-notebook border-b border-forest/10"
      data-reveal
      aria-labelledby="lab-notebook-title"
    >
      <div className="mx-auto max-w-4xl px-6 py-16 md:py-20">
        <div className="lab-notebook__head">
          <Eyebrow tone="terracotta">{t("eyebrow")}</Eyebrow>
          <h2
            id="lab-notebook-title"
            className="font-serif text-3xl md:text-4xl text-forest mt-3 leading-tight"
            data-balance
          >
            {t("title.before")}{" "}
            <span className="font-instrument italic text-terracotta">
              {t("title.italic")}
            </span>
            {t("title.after")}
          </h2>
        </div>

        <dl className="lab-notebook__list">
          {KEYS.map((k) => (
            <div key={k} className="lab-notebook__item">
              <dt className="lab-notebook__q">
                <span className="lab-notebook__marker" aria-hidden>
                  {t("qMarker")}
                </span>
                <span>{t(`entries.${k}.q` as const)}</span>
              </dt>
              <dd className="lab-notebook__a">
                <span
                  className="lab-notebook__marker lab-notebook__marker--a"
                  aria-hidden
                >
                  {t("aMarker")}
                </span>
                <span>{t(`entries.${k}.a` as const)}</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
