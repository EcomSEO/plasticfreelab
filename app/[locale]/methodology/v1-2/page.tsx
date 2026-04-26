import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { TrustPageTemplate } from "@/components/templates/TrustPageTemplate";
import { Eyebrow } from "@/components/editorial/Eyebrow";
import { Monogram } from "@/components/editorial/Monogram";
import { pageMetadata } from "@/lib/seo";
import { routing, type Locale } from "@/i18n/routing";

const DIMENSIONS = [
  {
    key: "materialSafety",
    weight: 35,
    tone: "sage" as const,
    subtests: ["pfasPanel", "leadCadmium", "phthalate", "vocChamber", "supplier"],
  },
  {
    key: "performance",
    weight: 20,
    tone: "forest" as const,
    subtests: ["heatMap", "deglaze", "filterEfficacy", "loadCycle"],
  },
  {
    key: "durability",
    weight: 15,
    tone: "stone" as const,
    subtests: ["coatingWear", "warrantyAudit", "fieldReports"],
  },
  {
    key: "useExperience",
    weight: 15,
    tone: "terracotta" as const,
    subtests: ["weight", "cleanability", "panelScores"],
  },
  {
    key: "value",
    weight: 15,
    tone: "sage" as const,
    subtests: ["costPerYear", "warrantyDelta", "marketComparable"],
  },
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!hasLocale(routing.locales, raw)) return {};
  const locale = raw as Locale;
  const t = await getTranslations({ locale, namespace: "methodologyV12" });
  return pageMetadata({
    title: t("metaTitle"),
    description: t("metaDescription"),
    path: "/methodology/v1-2",
    locale,
  });
}

export default async function MethodologyV12Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!hasLocale(routing.locales, raw)) notFound();
  setRequestLocale(raw as Locale);
  const t = await getTranslations("methodologyV12");

  return (
    <TrustPageTemplate title={t("h1")}>
      <Eyebrow tone="terracotta">{t("eyebrow")}</Eyebrow>
      <p className="caps-label text-stone">
        {t("updated")} ·{" "}
        <Link href="/methodology" className="text-sage">
          {t("changelogLink")}
        </Link>
      </p>

      <p className="font-serif text-xl text-forest leading-relaxed">
        {t("intro")}
      </p>

      <h2>{t("weightsTitle")}</h2>
      <p>{t("weightsBody")}</p>
      <ul>
        {DIMENSIONS.map((d) => (
          <li key={d.key}>
            <strong>{t(`dimension.${d.key}.title`)}</strong> ({d.weight}%):{" "}
            {t(`dimension.${d.key}.oneLiner`)}
          </li>
        ))}
      </ul>

      {DIMENSIONS.map((d) => (
        <section key={d.key}>
          <h2>
            {t(`dimension.${d.key}.title`)} · {d.weight}%
          </h2>
          <p>{t(`dimension.${d.key}.body`)}</p>
          <h3>{t("subtestsTitle")}</h3>
          <ul>
            {d.subtests.map((st) => (
              <li key={st}>
                <strong>{t(`subtest.${st}.title`)}:</strong>{" "}
                {t(`subtest.${st}.body`)}
              </li>
            ))}
          </ul>
        </section>
      ))}

      <h2>{t("labPartnersTitle")}</h2>
      <p>{t("labPartnersBody")}</p>

      <h2>{t("reviewersTitle")}</h2>
      <p>{t("reviewersIntro")}</p>
      <div className="not-prose grid sm:grid-cols-2 gap-6 my-6">
        {(["research", "testing", "medical", "sourcing"] as const).map((r) => {
          const tone =
            r === "research"
              ? "sage"
              : r === "testing"
              ? "terracotta"
              : r === "medical"
              ? "forest"
              : "stone";
          const letter =
            r === "research"
              ? "R"
              : r === "testing"
              ? "T"
              : r === "medical"
              ? "M"
              : "S";
          return (
            <div key={r} className="flex gap-3 items-start">
              <Monogram size={36} letters={letter} tone={tone} />
              <div>
                <div className="caps-label text-forest">
                  {t(`reviewers.${r}.title`)}
                </div>
                <p className="text-[14.5px] text-charcoal/85 mt-1 leading-relaxed">
                  {t(`reviewers.${r}.bio`)}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <h2>{t("disputeTitle")}</h2>
      <p>{t("disputeBody")}</p>

      <h2>{t("changelogTitle")}</h2>
      <ul>
        <li>
          <strong>v1.2 (April 2026):</strong> {t("changeLog.v12")}
        </li>
        <li>
          <strong>v1.1 (January 2026):</strong> {t("changeLog.v11")}
        </li>
      </ul>
    </TrustPageTemplate>
  );
}
