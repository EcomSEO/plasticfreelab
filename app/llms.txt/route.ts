import { SITE } from "@/lib/content/site";
import { hubs, tHub } from "@/lib/content/hubs";
import { locales, defaultLocale } from "@/i18n/routing";
import { localeUrl } from "@/lib/seo";

export const dynamic = "force-static";

export function GET() {
  const sections = locales.map((locale) => {
    const isDefault = locale === defaultLocale;
    const heading = isDefault
      ? `# ${SITE.name}`
      : `# ${SITE.name} (${locale.toUpperCase()})`;
    const description = isDefault
      ? SITE.description
      : SITE.i18n[locale as keyof typeof SITE.i18n]?.description ?? SITE.description;
    const guideHeading =
      locale === "de" ? "## Rubriken" : locale === "fr" ? "## Rubriques" : "## Guides";
    const editorialHeading =
      locale === "de" ? "## Redaktion" : locale === "fr" ? "## Rédaction" : "## Editorial";
    const standardsLabel =
      locale === "de"
        ? "Redaktionelle Standards"
        : locale === "fr"
        ? "Charte éditoriale"
        : "Editorial standards";
    const aboutLabel = locale === "de" ? "Über uns" : locale === "fr" ? "À propos" : "About";
    const lines = [
      heading,
      "",
      `> ${description}`,
      "",
      guideHeading,
      ...hubs.map((h) => {
        const th = tHub(h, locale);
        return `- [${th.name}](${localeUrl(locale, `/guides/${h.slug}`)})`;
      }),
      "",
      editorialHeading,
      `- [${standardsLabel}](${localeUrl(locale, "/editorial-standards")})`,
      `- [${aboutLabel}](${localeUrl(locale, "/about")})`,
      "",
    ];
    return lines.join("\n");
  });

  return new Response(sections.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
