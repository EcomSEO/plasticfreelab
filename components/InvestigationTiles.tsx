import Link from "next/link";
import { Eyebrow } from "./editorial/Eyebrow";
import { VerifiedSeal } from "./editorial/VerifiedSeal";

type Tile = {
  label: string;
  href: string;
  status: "testing" | "published";
  blurb: string;
  /** Gradient hint for the placeholder image. */
  tint: "sage" | "terracotta" | "forest" | "stone";
};

const TILES: Tile[] = [
  {
    label: "Non-toxic cookware",
    href: "/best-non-toxic-cookware",
    status: "published",
    blurb: "14 sets, six weeks, one pick we'd buy again.",
    tint: "sage",
  },
  {
    label: "Plastic-free food storage",
    href: "/12-things-to-throw-out-of-your-kitchen",
    status: "published",
    blurb: "What to keep, what to replace, what to toss this weekend.",
    tint: "terracotta",
  },
  {
    label: "Water filter",
    href: "/best-water-filters",
    status: "published",
    blurb: "Brita vs Berkey vs AquaTru, one clear recommendation.",
    tint: "forest",
  },
  {
    label: "Glass bottles",
    href: "/brita-vs-berkey-vs-aquatru",
    status: "testing",
    blurb: "Borosilicate, soda-lime, stainless — we're measuring each.",
    tint: "stone",
  },
];

/**
 * InvestigationTiles — 4-column "Currently in the lab" row.
 *
 * Square 1:1 tiles with a gradient photo placeholder, a floating
 * VerifiedSeal in the top-right, and a sage underline that draws
 * in on hover. Organicauthority's "Shop best sellers" pattern,
 * executed in our palette and typography.
 */
export function InvestigationTiles() {
  return (
    <section
      className="inv-tiles border-b border-forest/10"
      data-reveal
      aria-labelledby="in-the-lab"
    >
      <div className="mx-auto max-w-7xl px-6 py-14 md:py-20">
        <div className="inv-tiles__head">
          <Eyebrow tone="terracotta">Currently in the lab</Eyebrow>
          <h2
            id="in-the-lab"
            className="font-serif text-3xl md:text-4xl text-forest mt-3 leading-tight"
            data-balance
          >
            The categories we&apos;re{" "}
            <span className="font-instrument italic text-terracotta">
              working through
            </span>{" "}
            this quarter.
          </h2>
        </div>

        <ul className="inv-tiles__grid">
          {TILES.map((t) => (
            <li key={t.label}>
              <Link href={t.href} className="inv-tile group">
                <div className={`inv-tile__image inv-tile__image--${t.tint}`}>
                  <div className="inv-tile__gradient" aria-hidden />
                  <div className="inv-tile__grain" aria-hidden />
                  <VerifiedSeal
                    size={64}
                    variant={t.status === "testing" ? "currently-testing" : "verified"}
                    className="inv-tile__seal"
                  />
                </div>
                <div className="inv-tile__body">
                  <span
                    className={`inv-tile__status inv-tile__status--${t.status}`}
                  >
                    Status · {t.status === "testing" ? "Testing" : "Published"}
                  </span>
                  <h3 className="inv-tile__label">{t.label}</h3>
                  <p className="inv-tile__blurb">{t.blurb}</p>
                  <span className="inv-tile__underline" aria-hidden />
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
