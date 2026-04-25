import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
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
    title: t("terms.title"),
    description: t("terms.metaDescription"),
    path: "/terms",
    locale,
  });
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!hasLocale(routing.locales, raw)) notFound();
  setRequestLocale(raw as Locale);
  const t = await getTranslations("trustPages");

  return (
    <TrustPageTemplate title={t("terms.title")}>
      <p className="text-sm text-stone">Last updated: April 20, 2026.</p>
      <p className="font-serif text-xl text-forest leading-relaxed">
        {t("terms.intro")}
      </p>
      <TranslationPendingBanner />

      <h2>1. The Site is informational</h2>
      <p>PlasticFreeLab publishes editorial content about non-toxic living. <strong>Nothing on this Site is medical advice, legal advice, or professional advice of any kind.</strong></p>

      <h2>2. Accuracy</h2>
      <p>We work hard to be accurate. We cite every claim. We update quarterly. But we are not infallible. Content is provided &ldquo;as is&rdquo; without warranties of any kind.</p>

      <h2>3. Affiliate links</h2>
      <p>Some links on the Site are affiliate links. See our <Link href="/affiliate-disclosure">Affiliate Disclosure</Link> for detail.</p>

      <h2>4. Intellectual property</h2>
      <p>All content on the Site is owned by PlasticFreeLab or licensed to us. You may share excerpts with attribution. You may not republish articles in full or train AI models on our content at scale.</p>

      <h2>5. Limitation of liability</h2>
      <p>To the maximum extent permitted by law, PlasticFreeLab is not liable for any indirect, incidental, consequential, or punitive damages arising from your use of the Site.</p>

      <h2>6. Contact</h2>
      <p>Questions? Email hello@plasticfreelab.com.</p>
    </TrustPageTemplate>
  );
}
