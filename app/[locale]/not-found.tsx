import { getTranslations, getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { Metadata } from "next";
import { hubs, tHub } from "@/lib/content/hubs";
import { Eyebrow } from "@/components/editorial/Eyebrow";
import { DotRule } from "@/components/editorial/DotRule";
import type { Locale } from "@/i18n/routing";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("notFound");
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    robots: { index: false, follow: false },
  };
}

export default async function NotFound() {
  const t = await getTranslations("notFound");
  const locale = (await getLocale()) as Locale;

  return (
    <main>
      <section className="relative border-b border-gray-line overflow-hidden bg-white">
        <div
          className="hidden md:flex absolute top-1/2 right-8 -translate-y-1/2 items-center justify-center"
          aria-hidden
          style={{
            width: 220,
            height: 160,
            background: "#1A3338",
            color: "#FFFFFF",
            borderRadius: 2,
            fontFamily: "Roboto, sans-serif",
            opacity: 0.95,
          }}
        >
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 64, fontWeight: 700, lineHeight: 1, letterSpacing: 0 }}>404</div>
            <div
              style={{
                marginTop: 10,
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#F55310",
              }}
            >
              {t("stampSub")}
            </div>
          </div>
        </div>

        <div className="relative mx-auto max-w-4xl px-6 pt-16 md:pt-24 pb-16 md:pb-20">
          <Eyebrow tone="terracotta">{t("eyebrow")}</Eyebrow>
          <h1 className="display-headline text-forest mt-5 text-[2.5rem] sm:text-5xl md:text-[3.75rem] leading-[1.04]">
            {t("title")}
          </h1>

          <div className="mt-8 max-w-2xl text-charcoal/85 text-[1.0625rem] leading-[1.75] space-y-4">
            <p>{t("p1")}</p>
            <p>{t("p2")}</p>
          </div>

          <div className="mt-10" data-reveal>
            <DotRule className="rule-draw" />
          </div>

          <div className="mt-10">
            <div className="eyebrow text-stone mb-5">{t("tryHubs")}</div>
            <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-5">
              {hubs.map((hub, i) => {
                const th = tHub(hub, locale);
                return (
                  <li key={hub.slug}>
                    <Link
                      href={`/guides/${hub.slug}`}
                      className="group flex items-start gap-4"
                    >
                      <span className="rank-numeral !text-2xl !text-sage/60 group-hover:!text-sage shrink-0">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <div className="font-serif text-lg text-forest leading-snug group-hover:text-terracotta transition">
                          {th.name}
                        </div>
                        <div className="text-[14px] text-charcoal/70 mt-1 leading-snug">
                          {th.oneLiner}
                        </div>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="mt-12 flex flex-wrap gap-3">
            <Link href="/" className="btn-primary">
              {t("primary")}
              <span aria-hidden>&rarr;</span>
            </Link>
            <Link href="/newsletter" className="btn-secondary">
              {t("secondary")}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
