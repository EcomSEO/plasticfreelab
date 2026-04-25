import type { Metadata } from "next";
import { Instrument_Serif } from "next/font/google";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale, getTranslations } from "next-intl/server";
import { routing, type Locale, locales } from "@/i18n/routing";
import "../globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CookieBanner } from "@/components/CookieBanner";
import { ScrollReveal } from "@/components/ScrollReveal";
import { CustomCursor } from "@/components/CustomCursor";
import { IntroOverlay } from "@/components/IntroOverlay";
import { KeyboardShortcuts } from "@/components/KeyboardShortcuts";
import { OrganizationJsonLd } from "@/components/schema/OrganizationJsonLd";
import { SITE, siteTagline, siteDescription } from "@/lib/content/site";
import { robotsMeta, localeUrl } from "@/lib/seo";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});

const OG_LOCALE: Record<Locale, string> = {
  en: "en_US",
  de: "de_DE",
  fr: "fr_FR",
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
  // Allow static rendering of this layout per-locale.
  setRequestLocale(locale);
  const messages = await getMessages();
  const tCommon = await getTranslations({ locale, namespace: "common" });

  return (
    <html lang={locale} className={instrumentSerif.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <noscript>
          <style>{`
            .masthead-reveal-1, .masthead-reveal-2, .masthead-reveal-3,
            .masthead-reveal-4, .masthead-reveal-5, .masthead-reveal-6,
            .masthead-reveal-7, .masthead-reveal-8, .masthead-reveal-9 {
              opacity: 1 !important; transform: none !important; animation: none !important;
            }
            .botanical-draw { stroke-dashoffset: 0 !important; animation: none !important; }
            .botanical-bud, .botanical-bud-outer, .botanical-root { opacity: 1 !important; animation: none !important; }
            .masthead__botanical { opacity: 1 !important; animation: none !important; }
            .masthead__gutter-rule { transform: scaleY(1) !important; animation: none !important; }
          `}</style>
        </noscript>
      </head>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <a href="#main-content" className="sr-only focus:not-sr-only">
            {tCommon("skipToContent")}
          </a>
          <IntroOverlay />
          <OrganizationJsonLd />
          <Header />
          <div id="main-content">{children}</div>
          <Footer />
          <CookieBanner />
          <ScrollReveal />
          <CustomCursor />
          <KeyboardShortcuts />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
