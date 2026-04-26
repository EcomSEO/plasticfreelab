import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale, getTranslations } from "next-intl/server";
import { routing, type Locale, locales } from "@/i18n/routing";
import "../globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CookieBanner } from "@/components/CookieBanner";
import { ScrollReveal } from "@/components/ScrollReveal";
import { KeyboardShortcuts } from "@/components/KeyboardShortcuts";
import { OrganizationJsonLd } from "@/components/schema/OrganizationJsonLd";
import { SITE, siteTagline, siteDescription } from "@/lib/content/site";
import { robotsMeta, localeUrl } from "@/lib/seo";

const roboto = Roboto({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-roboto",
  display: "swap",
});

const OG_LOCALE: Record<Locale, string> = {
  en: "en_US",
  de: "de_DE",
  fr: "fr_FR",
  it: "it_IT",
  es: "es_ES",
  nl: "nl_NL",
  pl: "pl_PL",
  sv: "sv_SE",
  pt: "pt_PT",
  ro: "ro_RO",
  cs: "cs_CZ",
  no: "no_NO",
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!hasLocale(routing.locales, raw)) return {};
  const locale = raw as Locale;
  const tagline = siteTagline(locale);
  const description = siteDescription(locale);

  const languages: Record<string, string> = {};
  for (const l of routing.locales) {
    languages[l] = localeUrl(l, "/");
  }
  languages["x-default"] = localeUrl("en", "/");

  return {
    metadataBase: new URL(SITE.url),
    title: {
      default: `${SITE.name} — ${tagline}`,
      template: `%s — ${SITE.name}`,
    },
    description,
    alternates: {
      canonical: localeUrl(locale, "/"),
      languages,
    },
    openGraph: {
      type: "website",
      siteName: SITE.name,
      locale: OG_LOCALE[locale],
      alternateLocale: locales.filter((l) => l !== locale).map((l) => OG_LOCALE[l]),
    },
    twitter: {
      card: "summary_large_image",
    },
    robots: robotsMeta(),
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!hasLocale(routing.locales, raw)) {
    notFound();
  }
  const locale = raw as Locale;
  setRequestLocale(locale);
  const messages = await getMessages();
  const tCommon = await getTranslations({ locale, namespace: "common" });

  return (
    <html lang={locale} className={roboto.variable}>
      <body className={roboto.className}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <a href="#main-content" className="sr-only focus:not-sr-only">
            {tCommon("skipToContent")}
          </a>
          <OrganizationJsonLd />
          <Header />
          <div id="main-content">{children}</div>
          <Footer />
          <CookieBanner />
          <ScrollReveal />
          <KeyboardShortcuts />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
