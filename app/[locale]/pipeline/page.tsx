import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Eyebrow } from "@/components/editorial/Eyebrow";
import { LabRule, DotRule } from "@/components/editorial/DotRule";
import { Monogram } from "@/components/editorial/Monogram";
import {
  pipeline,
  pipelineByStatus,
  pipelineCounts,
  type PipelineEntry,
  type PipelineReviewerRole,
} from "@/lib/content/pipeline";
import { hubs, getHub, tHub } from "@/lib/content/hubs";
import { pageMetadata } from "@/lib/seo";
import { routing, type Locale } from "@/i18n/routing";

const ROLE_MAP: Record<
  PipelineReviewerRole,
  { letter: string; tone: "sage" | "forest" | "terracotta" | "stone" }
> = {
  research: { letter: "R", tone: "sage" },
  testing: { letter: "T", tone: "terracotta" },
  medical: { letter: "M", tone: "forest" },
  sourcing: { letter: "S", tone: "stone" },
};

const DATE_LOCALE: Record<string, string> = {
  en: "en-US",
  de: "de-DE",
  fr: "fr-FR",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!hasLocale(routing.locales, raw)) return {};
  const locale = raw as Locale;
  const t = await getTranslations({ locale, namespace: "pipelinePage" });
  return pageMetadata({
    title: t("metaTitle"),
    description: t("metaDescription"),
    path: "/pipeline",
    locale,
  });
}

export default async function PipelinePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!hasLocale(routing.locales, raw)) notFound();
  const locale = raw as Locale;
  setRequestLocale(locale);

  const t = await getTranslations("pipelinePage");
  const tCrumb = await getTranslations("hubPage");

  const counts = pipelineCounts();
  const testing = pipelineByStatus("testing");
  const drafted = pipelineByStatus("drafted");
  const researching = pipelineByStatus("researching");

  const todayLabel = new Date().toLocaleDateString(
    DATE_LOCALE[locale] ?? "en-US",
    { month: "short", year: "numeric" }
  );

  const renderRow = (entry: PipelineEntry) => {
    const hub = getHub(entry.hub);
    const ht = tHub(hub, locale);
    const role = ROLE_MAP[entry.reviewerRole];
    const expected = entry.expectedAt
      ? new Date(entry.expectedAt).toLocaleDateString(
          DATE_LOCALE[locale] ?? "en-US",
          { month: "short", day: "numeric", year: "numeric" }
        )
      : t("expectedTBD");
    const pillClass =
      entry.status === "testing"
        ? "pipeline-pill pipeline-pill--testing"
        : entry.status === "drafted"
        ? "pipeline-pill pipeline-pill--drafted"
        : "pipeline-pill pipeline-pill--researching";
    return (
      <li key={entry.slug} className="pipeline-row">
        <Monogram size={28} letters={role.letter} tone={role.tone} />
        <div>
          <h3 className="pipeline-row__title">{entry.workingTitle}</h3>
          <div className="pipeline-row__meta">
            {ht.shortName} · {entry.category}
          </div>
        </div>
        <span className={pillClass}>{t(`status.${entry.status}`)}</span>
        <span className="pipeline-row__meta hidden md:inline">
          {t(`reviewerRole.${entry.reviewerRole}`)}
        </span>
        <span className="pipeline-row__date">{expected}</span>
      </li>
    );
  };

  const crumbs = [
    { label: tCrumb("crumbHome"), href: "/" },
    { label: t("crumbLabel") },
  ];

  // For sanity: pick a few hubs we'll mention in the secondary nav
  const hubLinks = hubs.slice(0, 3);

  return (
    <article className="mx-auto max-w-5xl px-6 py-12 md:py-16">
      <Breadcrumbs crumbs={crumbs} />

      <div className="mt-6">
        <Eyebrow tone="terracotta">{t("eyebrow")}</Eyebrow>
        <h1 className="display-headline text-forest mt-3 text-[2.25rem] md:text-[3rem] leading-[1.04]">
          {t("h1")}
        </h1>
        <p className="mt-6 text-lg md:text-[1.18rem] text-charcoal/85 max-w-[60ch] leading-[1.55]">
          {t("subtitle")}
        </p>
      </div>

      <LabRule className="mt-10" />

      {/* Counters strip */}
      <div className="mt-8 grid grid-cols-3 gap-4 md:gap-8 max-w-2xl">
        <div>
          <div className="font-serif text-3xl text-forest tnum">
            {counts.testing}
          </div>
          <div className="caps-label text-stone mt-1">
            {t("status.testing")}
          </div>
        </div>
        <div>
          <div className="font-serif text-3xl text-forest tnum">
            {counts.drafted}
          </div>
          <div className="caps-label text-stone mt-1">
            {t("status.drafted")}
          </div>
        </div>
        <div>
          <div className="font-serif text-3xl text-forest tnum">
            {counts.researching}
          </div>
          <div className="caps-label text-stone mt-1">
            {t("status.researching")}
          </div>
        </div>
      </div>

      {/* In the lab */}
      <section className="mt-14">
        <div className="flex items-baseline justify-between gap-3 border-t border-sage/40 pt-3 mb-2">
          <Eyebrow tone="sage">{t("section.testing")}</Eyebrow>
          <span className="caps-label text-stone tnum">
            {t("itemsCount", { n: counts.testing })}
          </span>
        </div>
        <ul>{testing.map(renderRow)}</ul>
      </section>

      {/* Drafted */}
      {drafted.length > 0 && (
        <section className="mt-14">
          <div className="flex items-baseline justify-between gap-3 border-t border-sage/40 pt-3 mb-2">
            <Eyebrow tone="terracotta">{t("section.drafted")}</Eyebrow>
            <span className="caps-label text-stone tnum">
              {t("itemsCount", { n: counts.drafted })}
            </span>
          </div>
          <ul>{drafted.map(renderRow)}</ul>
        </section>
      )}

      {/* Researching */}
      <section className="mt-14">
        <div className="flex items-baseline justify-between gap-3 border-t border-sage/40 pt-3 mb-2">
          <Eyebrow tone="stone">{t("section.researching")}</Eyebrow>
          <span className="caps-label text-stone tnum">
            {t("itemsCount", { n: counts.researching })}
          </span>
        </div>
        <ul>{researching.map(renderRow)}</ul>
      </section>

      <DotRule className="my-14" />

      <div className="caps-label text-stone">
        {t("methodologyFooter", { date: todayLabel })}{" "}
        <Link href="/methodology" className="text-forest underline">
          /methodology
        </Link>
      </div>

      <div className="mt-10 text-[14.5px] text-charcoal/85">
        {t("hubsLine")}{" "}
        {hubLinks.map((h, i) => {
          const ht = tHub(h, locale);
          return (
            <span key={h.slug}>
              <Link href={`/guides/${h.slug}`} className="text-sage underline">
                {ht.shortName}
              </Link>
              {i < hubLinks.length - 1 ? ", " : "."}
            </span>
          );
        })}
      </div>

      {/* Stable enumerable so search engines can see the full list (also helps debugging) */}
      <noscript>
        <pre className="hidden">{JSON.stringify(pipeline, null, 2)}</pre>
      </noscript>
    </article>
  );
}
