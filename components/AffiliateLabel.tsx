"use client";

import { useLocale } from "next-intl";

/**
 * AffiliateLabel — visible affiliate-link badge.
 *
 * Required by EU consumer law (UWG §5a in Germany; similar across
 * member states): every commercial link must be labelled as such at
 * the point of impression, not only in a separate disclosure page.
 * Combined with `rel="sponsored nofollow"` on the underlying link
 * (already on `<AffiliateLink>`), this is the network-wide pattern
 * for compliance per `_shared/compliance-gap-fill.md` Component 2.
 */

const LABEL: Record<string, string> = {
  en: "Sponsored",
  de: "Werbung",
  fr: "Publicité",
  it: "Pubblicità",
  es: "Publicidad",
  nl: "Advertentie",
  pl: "Reklama",
  sv: "Annons",
  pt: "Publicidade",
  ro: "Publicitate",
  cs: "Reklama",
  no: "Annonse",
  nb: "Annonse",
};

export function AffiliateLabel({
  className = "",
}: {
  className?: string;
}) {
  const locale = useLocale();
  const label = LABEL[locale] ?? LABEL.en;

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide rounded ${className}`}
      style={{
        backgroundColor: "rgba(196, 102, 61, 0.12)",
        color: "#7A3D24",
        border: "1px solid rgba(196, 102, 61, 0.35)",
      }}
      role="note"
      aria-label={label}
    >
      {label}
    </span>
  );
}
