import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { EmailCapture } from "@/components/EmailCapture";
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
    title: t("newsletter.title"),
    description: t("newsletter.metaDescription"),
    path: "/newsletter",
    locale,
  });
}

export default async function NewsletterPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!hasLocale(routing.locales, raw)) notFound();
  setRequestLocale(raw as Locale);
  const t = await getTranslations("newsletterPage");

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="font-serif text-4xl md:text-5xl text-forest leading-tight">
        {t("title")}
      </h1>
      <p className="mt-6 text-lg text-charcoal/80 leading-relaxed">
        {t("p1.before")}
      </p>
      <p className="mt-3 text-lg text-charcoal/80 leading-relaxed">
        {t("p2.before")}{" "}
        <strong className="text-forest">{t("p2.bold")}</strong>{" "}
        {t("p2.after")}
      </p>
      <EmailCapture
        variant="end-of-article"
        headline={t("captureHeadline")}
        subhead={t("captureSubhead")}
      />
    </main>
  );
}
