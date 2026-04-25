import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Eyebrow } from "./editorial/Eyebrow";
import { VerifiedSeal } from "./editorial/VerifiedSeal";

type TileKey = "cookware" | "storage" | "filter" | "bottles";

const TILES: Array<{
  key: TileKey;
  href: string;
  status: "testing" | "published";
  tint: "sage" | "terracotta" | "forest" | "stone";
}> = [
  { key: "cookware", href: "/best-non-toxic-cookware", status: "published", tint: "sage" },
  { key: "storage", href: "/12-things-to-throw-out-of-your-kitchen", status: "published", tint: "terracotta" },
  { key: "filter", href: "/best-water-filters", status: "published", tint: "forest" },
  { key: "bottles", href: "/brita-vs-berkey-vs-aquatru", status: "testing", tint: "stone" },
];

export async function InvestigationTiles() {
  const t = await getTranslations("investigationTiles");

  return (
    <section
      className="inv-tiles border-b border-forest/10"
      data-reveal
      aria-labelledby="in-the-lab"
    >
      <div className="mx-auto max-w-7xl px-6 py-14 md:py-20">
        <div className="inv-tiles__head">
          <Eyebrow tone="terracotta">{t("eyebrow")}</Eyebrow>
          <h2
            id="in-the-lab"
            className="font-serif text-3xl md:text-4xl text-forest mt-3 leading-tight"
            data-balance
          >
            {t("title.before")}{" "}
            <span className="font-instrument italic text-terracotta">
              {t("title.italic")}
            </span>{" "}
            {t("title.after")}
          </h2>
        </div>

        <ul className="inv-tiles__grid">
          {TILES.map((tile) => {
            const label = t(`tiles.${tile.key}.label` as const);
            const blurb = t(`tiles.${tile.key}.blurb` as const);
            const status =
              tile.status === "testing" ? t("statusTesting") : t("statusPublished");
            return (
              <li key={tile.key}>
                <Link href={tile.href} className="inv-tile group">
                  <div className={`inv-tile__image inv-tile__image--${tile.tint}`}>
                    <div className="inv-tile__gradient" aria-hidden />
                    <div className="inv-tile__grain" aria-hidden />
                    <VerifiedSeal
                      size={64}
                      variant={tile.status === "testing" ? "currently-testing" : "verified"}
                      className="inv-tile__seal"
                    />
                  </div>
                  <div className="inv-tile__body">
                    <span
                      className={`inv-tile__status inv-tile__status--${tile.status}`}
                    >
                      {t("statusLabel", { status })}
                    </span>
                    <h3 className="inv-tile__label">{label}</h3>
                    <p className="inv-tile__blurb">{blurb}</p>
                    <span className="inv-tile__underline" aria-hidden />
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
