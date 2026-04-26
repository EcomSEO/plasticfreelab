import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { TrustPageTemplate } from "@/components/templates/TrustPageTemplate";
import { Eyebrow } from "@/components/editorial/Eyebrow";
import { pageMetadata } from "@/lib/seo";
import { routing, type Locale } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!hasLocale(routing.locales, raw)) return {};
  const locale = raw as Locale;
  const t = await getTranslations({ locale, namespace: "methodologyPage" });
  return pageMetadata({
    title: t("metaTitle"),
    description: t("metaDescription"),
    path: "/methodology",
    locale,
  });
}

export default async function MethodologyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!hasLocale(routing.locales, raw)) notFound();
  setRequestLocale(raw as Locale);
  const t = await getTranslations("methodologyPage");

  return (
    <TrustPageTemplate title={t("h1")}>
      <Eyebrow tone="sage">{t("eyebrow")}</Eyebrow>
      <p className="font-serif text-xl text-forest leading-relaxed">
        {t("intro")}
      </p>

      <h2>{t("currentVersionTitle")}</h2>
      <p>{t("currentVersionBody")}</p>
      <p>
        <Link href="/methodology/v1-2">{t("currentVersionLink")}</Link>
      </p>

      <h2>{t("philosophyTitle")}</h2>
      <p>{t("philosophyP1")}</p>
      <p>{t("philosophyP2")}</p>

      <h2>{t("changeLogTitle")}</h2>
      <ul>
        <li>
          <strong>v1.2 (April 2026):</strong> {t("changeLog.v12")}
        </li>
        <li>
          <strong>v1.1 (January 2026):</strong> {t("changeLog.v11")}
        </li>
      </ul>

      <h2>{t("disputeTitle")}</h2>
      <p>{t("disputeBody")}</p>
    </TrustPageTemplate>
  );
}
