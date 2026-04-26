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
    title: t("contact.title"),
    description: t("contact.metaDescription"),
    path: "/contact",
    locale,
  });
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!hasLocale(routing.locales, raw)) notFound();
  setRequestLocale(raw as Locale);
  const t = await getTranslations("trustPages");

  return (
    <TrustPageTemplate title={t("contact.title")}>
      <p className="font-serif text-xl text-forest leading-relaxed">
        {t("contact.intro")}
      </p>
      <TranslationPendingBanner />

      <h2>General</h2>
      <p>For feedback, questions, product tips, and everything else, write to <strong>hello@plasticfreelab.com</strong>.</p>

      <h2>Corrections</h2>
      <p>Spotted something wrong? Email <strong>corrections@plasticfreelab.com</strong>. We respond within 5 business days and publish corrections publicly when warranted.</p>

      <h2>Privacy</h2>
      <p>For questions about data, deletion requests, and anything GDPR or CCPA-related, email <strong>privacy@plasticfreelab.com</strong>.</p>

      <h2>Response times</h2>
      <p>We&apos;re a small team. We read everything. We respond to most emails within 3-5 business days.</p>
    </TrustPageTemplate>
  );
}
