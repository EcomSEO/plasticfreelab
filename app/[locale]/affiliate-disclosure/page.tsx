import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { TrustPageTemplate } from "@/components/templates/TrustPageTemplate";
import { TranslationPendingBanner } from "@/components/TranslationPendingBanner";
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
  const t = await getTranslations({ locale, namespace: "trustPages" });
  return pageMetadata({
    title: t("affiliateDisclosure.title"),
    description: t("affiliateDisclosure.metaDescription"),
    path: "/affiliate-disclosure",
    locale,
  });
}

export default async function AffiliateDisclosurePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!hasLocale(routing.locales, raw)) notFound();
  setRequestLocale(raw as Locale);
  const t = await getTranslations("trustPages");

  return (
    <TrustPageTemplate title={t("affiliateDisclosure.title")}>
      <p className="font-serif text-xl text-forest leading-relaxed">
        {t("affiliateDisclosure.intro")}
      </p>
      <TranslationPendingBanner />

      <h2>How we use affiliate links</h2>
      <ul>
        <li>We link to products we recommend on their merits, not their commission rate</li>
        <li>We disclose on every page that includes affiliate links, clearly and above the product list</li>
        <li>We never accept payment for placement</li>
        <li>We never raise a product&apos;s ranking because its affiliate program pays better</li>
        <li>We test our #1 picks against alternatives we don&apos;t earn commission from</li>
      </ul>

      <h2>Programs we participate in</h2>
      <ul>
        <li>Amazon Associates</li>
        <li>ShareASale</li>
        <li>Impact</li>
        <li>Awin</li>
        <li>Direct affiliate programs with selected manufacturers (disclosed per post when relevant)</li>
      </ul>
      <p>We may add or remove programs over time.</p>

      <p className="text-sm text-stone">Last updated: April 2026.</p>
    </TrustPageTemplate>
  );
}
