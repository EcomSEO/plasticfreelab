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
    title: t("privacy.title"),
    description: t("privacy.metaDescription"),
    path: "/privacy",
    locale,
  });
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!hasLocale(routing.locales, raw)) notFound();
  setRequestLocale(raw as Locale);
  const t = await getTranslations("trustPages");

  return (
    <TrustPageTemplate title={t("privacy.title")}>
      <p className="text-sm text-stone">Last updated: April 20, 2026.</p>
      <p className="font-serif text-xl text-forest leading-relaxed">
        {t("privacy.intro")}
      </p>
      <TranslationPendingBanner />

      <h2>1. Information we collect</h2>
      <p><strong>Information you provide:</strong> When you subscribe to our newsletter, we collect your email address and any preferences you share.</p>
      <p><strong>Information collected automatically:</strong> Like most websites, we collect standard web analytics: pages visited, referring URL, approximate location (country, region), device type, browser, and anonymized session identifiers.</p>
      <p><strong>Cookies:</strong> We use a small number of cookies: one for session continuity, one for analytics, and (where applicable) one to remember your cookie consent choice. We do not use third-party advertising cookies.</p>

      <h2>2. How we use it</h2>
      <ul>
        <li>To deliver the site and the newsletter</li>
        <li>To understand which content is useful and which isn&apos;t</li>
        <li>To improve the product</li>
        <li>To comply with legal obligations</li>
      </ul>
      <p>We do not sell, rent, or trade your personal information.</p>

      <h2>3. Third parties</h2>
      <p>We use the following third-party services:</p>
      <ul>
        <li><strong>Vercel</strong> — hosting and delivery</li>
        <li><strong>Neon</strong> — analytics database</li>
        <li><strong>Beehiiv</strong> — newsletter delivery</li>
        <li><strong>Supabase</strong> — asset storage</li>
      </ul>

      <h2>4. Affiliate links</h2>
      <p>Some product links on this site are affiliate links. See our <Link href="/affiliate-disclosure">Affiliate Disclosure</Link> for more detail.</p>

      <h2>5. Your rights</h2>
      <p>Depending on your location, you may have rights under the GDPR (EU/UK), CCPA (California), or other privacy laws. To exercise any of these rights, email us at privacy@plasticfreelab.com. We respond within 30 days.</p>

      <h2>6. Contact</h2>
      <p>Questions? Email privacy@plasticfreelab.com.</p>
    </TrustPageTemplate>
  );
}
