import { getTranslations } from "next-intl/server";
import { Eyebrow } from "./editorial/Eyebrow";
import { Monogram } from "./editorial/Monogram";

type RoleKey = "research" | "testing" | "medical" | "sourcing";

const ROLES: Array<{
  key: RoleKey;
  letter: string;
  tone: "sage" | "forest" | "terracotta" | "stone";
}> = [
  { key: "research", letter: "R", tone: "sage" },
  { key: "testing", letter: "T", tone: "terracotta" },
  { key: "medical", letter: "M", tone: "forest" },
  { key: "sourcing", letter: "S", tone: "stone" },
];

export async function EditorialBoard() {
  const t = await getTranslations("editorialBoard");

  return (
    <section
      className="editorial-board border-b border-forest/10"
      data-reveal
      aria-labelledby="editorial-board-title"
    >
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <div className="editorial-board__head">
          <Eyebrow tone="sage">{t("eyebrow")}</Eyebrow>
          <h2
            id="editorial-board-title"
            className="font-serif text-3xl md:text-4xl text-forest mt-3 leading-tight"
            data-balance
          >
            {t("title")}
          </h2>
          <p className="editorial-board__lede">{t("lede")}</p>
        </div>

        <div className="editorial-board__grid">
          {ROLES.map((r) => (
            <article key={r.key} className="editorial-board__card">
              <Monogram size={72} letters={r.letter} tone={r.tone} />
              <h3 className="editorial-board__role">
                {t(`roles.${r.key}.title` as const)}
              </h3>
              <p className="editorial-board__bio">
                {t(`roles.${r.key}.bio` as const)}
              </p>
              <span className="editorial-board__rule" aria-hidden />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
