"use client";

import { useLocale } from "next-intl";
import { SITE } from "@/lib/content/site";

const DATE_LOCALE: Record<string, string> = {
  en: "en-US",
  de: "de-DE",
  fr: "fr-FR",
};

function currentMonth(locale: string) {
  const d = new Date();
  return d.toLocaleString(DATE_LOCALE[locale] ?? "en-US", {
    month: "long",
    year: "numeric",
  });
}

export function Dateline({ className = "" }: { className?: string }) {
  const locale = useLocale();
  return (
    <div className={`dateline flex items-center gap-3 ${className}`}>
      <span>{SITE.volume}</span>
      <span aria-hidden>·</span>
      <span>{SITE.issue}</span>
      <span aria-hidden>·</span>
      <span>{currentMonth(locale)}</span>
      <span aria-hidden>·</span>
      <span>{SITE.url.replace(/^https?:\/\//, "")}</span>
    </div>
  );
}
