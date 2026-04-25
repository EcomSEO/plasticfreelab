import { getTranslations, getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { hubs, tHub } from "@/lib/content/hubs";
import { Wordmark } from "./editorial/Wordmark";
import { SITE, siteTagline } from "@/lib/content/site";
import type { Locale } from "@/i18n/routing";

export async function Footer() {
  const t = await getTranslations("footer");
  const locale = (await getLocale()) as Locale;

  return (
    <footer className="mt-24 bg-cream-deep/40 border-t border-forest/10">
      {/* Masthead row */}
      <div className="mx-auto max-w-6xl px-6 pt-14 pb-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-10 border-b border-forest/15">
          <div>
            <Wordmark size="lg" asLink={false} />
            <p className="mt-3 font-serif text-lg text-forest italic max-w-md">
              {siteTagline(locale)}
            </p>
          </div>
          <div className="max-w-md text-sm text-stone leading-relaxed">
            {t("leadParagraph")}
          </div>
        </div>

        <div className="grid md:grid-cols-12 gap-10 mt-10">
          <div className="md:col-span-5">
            <h4 className="eyebrow text-stone mb-4">{t("fiveHubs")}</h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5">
              {hubs.map((hub, i) => {
                const th = tHub(hub, locale);
                return (
                  <li key={hub.slug}>
                    <Link
                      href={`/guides/${hub.slug}`}
                      className="group flex items-center gap-2 text-forest hover:text-sage transition"
                    >
                      <span className="rank-numeral !text-sm !text-sage/50 group-hover:!text-sage tnum">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-[15px]">{th.name}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="md:col-span-3">
            <h4 className="eyebrow text-stone mb-4">{t("masthead")}</h4>
            <ul className="space-y-2.5 text-[15px]">
              <li><Link href="/about" className="text-forest hover:text-sage transition">{t("about")}</Link></li>
              <li><Link href="/editorial-standards" className="text-forest hover:text-sage transition">{t("editorialStandards")}</Link></li>
              <li><Link href="/contact" className="text-forest hover:text-sage transition">{t("contact")}</Link></li>
              <li><Link href="/newsletter" className="text-forest hover:text-sage transition">{t("newsletter")}</Link></li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <h4 className="eyebrow text-stone mb-4">{t("finePrint")}</h4>
            <ul className="space-y-2.5 text-[15px]">
              <li><Link href="/affiliate-disclosure" className="text-forest hover:text-sage transition">{t("affiliateDisclosure")}</Link></li>
              <li><Link href="/privacy" className="text-forest hover:text-sage transition">{t("privacy")}</Link></li>
              <li><Link href="/terms" className="text-forest hover:text-sage transition">{t("terms")}</Link></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Imprint strip */}
      <div className="border-t border-forest/10">
        <div className="mx-auto max-w-6xl px-6 py-6 flex flex-col md:flex-row justify-between gap-3 text-[11px] tracking-[0.14em] uppercase text-stone">
          <div className="flex items-center gap-3">
            <span>©&nbsp;{new Date().getFullYear()} PlasticFreeLab</span>
            <span aria-hidden className="text-sage/50">·</span>
            <span
              className="imprint-pulse"
              title="Registered volume & issue"
            >
              {SITE.volume} · {SITE.issue}
            </span>
          </div>
          <div className="normal-case tracking-normal text-stone text-xs max-w-xl md:text-right leading-relaxed">
            {t("imprint")}
          </div>
        </div>
      </div>

      {/* Signature bleed type — "plasticfreelab" clipping off the bottom */}
      <div className="footer-bleed" aria-hidden>
        <div className="footer-bleed__type">
          plastic<span className="footer-bleed__type-accent">free</span>lab
          <span className="footer-bleed__type-dot" />
        </div>
      </div>
    </footer>
  );
}
