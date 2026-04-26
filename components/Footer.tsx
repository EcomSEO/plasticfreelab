import { getTranslations, getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { hubs, tHub } from "@/lib/content/hubs";
import type { Locale } from "@/i18n/routing";

/**
 * Footer — runrepeat-style dark-teal utilitarian footer.
 *
 * 4-column links layout (Content / Masthead / Fine print / Hubs).
 * Dark teal #1A3338 bg, white text. No decorative bleed type, no
 * imprint pulse, no italic taglines.
 */
export async function Footer() {
  const t = await getTranslations("footer");
  const locale = (await getLocale()) as Locale;

  return (
    <footer
      className="mt-20"
      style={{ backgroundColor: "#1A3338", color: "#FFFFFF" }}
    >
      <div className="mx-auto max-w-7xl px-4 md:px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h4
              style={{
                fontFamily: "Roboto, sans-serif",
                fontWeight: 700,
                fontSize: 14,
                color: "#FFFFFF",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                marginBottom: "0.75rem",
              }}
            >
              {t("fiveHubs")}
            </h4>
            <ul className="space-y-2">
              {hubs.map((hub) => {
                const th = tHub(hub, locale);
                return (
                  <li key={hub.slug}>
                    <Link
                      href={`/guides/${hub.slug}`}
                      className="text-[14px] text-white/80 hover:text-white transition"
                    >
                      {th.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          <div>
            <h4
              style={{
                fontFamily: "Roboto, sans-serif",
                fontWeight: 700,
                fontSize: 14,
                color: "#FFFFFF",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                marginBottom: "0.75rem",
              }}
            >
              {t("masthead")}
            </h4>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-[14px] text-white/80 hover:text-white transition">{t("about")}</Link></li>
              <li><Link href="/editorial-standards" className="text-[14px] text-white/80 hover:text-white transition">{t("editorialStandards")}</Link></li>
              <li><Link href="/contact" className="text-[14px] text-white/80 hover:text-white transition">{t("contact")}</Link></li>
              <li><Link href="/newsletter" className="text-[14px] text-white/80 hover:text-white transition">{t("newsletter")}</Link></li>
            </ul>
          </div>

          <div>
            <h4
              style={{
                fontFamily: "Roboto, sans-serif",
                fontWeight: 700,
                fontSize: 14,
                color: "#FFFFFF",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                marginBottom: "0.75rem",
              }}
            >
              {t("finePrint")}
            </h4>
            <ul className="space-y-2">
              <li><Link href="/affiliate-disclosure" className="text-[14px] text-white/80 hover:text-white transition">{t("affiliateDisclosure")}</Link></li>
              <li><Link href="/privacy" className="text-[14px] text-white/80 hover:text-white transition">{t("privacy")}</Link></li>
              <li><Link href="/terms" className="text-[14px] text-white/80 hover:text-white transition">{t("terms")}</Link></li>
              <li><Link href="/methodology" className="text-[14px] text-white/80 hover:text-white transition">Methodology</Link></li>
            </ul>
          </div>

          <div className="col-span-2 md:col-span-1">
            <h4
              style={{
                fontFamily: "Roboto, sans-serif",
                fontWeight: 700,
                fontSize: 14,
                color: "#FFFFFF",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                marginBottom: "0.75rem",
              }}
            >
              About
            </h4>
            <p className="text-[13px] leading-relaxed text-white/70 max-w-sm">
              {t("leadParagraph")}
            </p>
          </div>
        </div>
      </div>

      {/* Bottom strip */}
      <div className="border-t border-white/15">
        <div
          className="mx-auto max-w-7xl px-4 md:px-6 py-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-2 text-[12px] text-white/70"
          style={{ fontFamily: "Roboto, sans-serif" }}
        >
          <div>
            Copyright &copy; {new Date().getFullYear()} PlasticFreeLab.com
          </div>
          <div className="text-white/50">
            {t("imprint")}
          </div>
        </div>
      </div>
    </footer>
  );
}
