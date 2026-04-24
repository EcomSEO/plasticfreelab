import type { Metadata } from "next";
import { Instrument_Serif } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CookieBanner } from "@/components/CookieBanner";
import { ScrollReveal } from "@/components/ScrollReveal";
import { CustomCursor } from "@/components/CustomCursor";
import { IntroOverlay } from "@/components/IntroOverlay";
import { KeyboardShortcuts } from "@/components/KeyboardShortcuts";
import { OrganizationJsonLd } from "@/components/schema/OrganizationJsonLd";
import { SITE } from "@/lib/content/site";
import { robotsMeta } from "@/lib/seo";

// Instrument Serif (italic only) — secondary display for hero italic
// emphasis and the biggest section leads. Fraunces remains primary.
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — ${SITE.tagline}`,
    template: `%s — ${SITE.name}`,
  },
  description: SITE.description,
  openGraph: {
    type: "website",
    siteName: SITE.name,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: robotsMeta(),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={instrumentSerif.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        {/* Fallback: if JS never runs, render masthead visible immediately. */}
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
        <IntroOverlay />
        <OrganizationJsonLd />
        <Header />
        {children}
        <Footer />
        <CookieBanner />
        <ScrollReveal />
        <CustomCursor />
        <KeyboardShortcuts />
      </body>
    </html>
  );
}
