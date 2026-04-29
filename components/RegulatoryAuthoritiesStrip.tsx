"use client";

import { useLocale } from "next-intl";

/**
 * RegulatoryAuthoritiesStrip — small footer strip listing the
 * environmental + data-protection authorities for the reader's
 * jurisdiction. Aligned with `_shared/compliance-gap-fill.md`
 * Component 7. PlasticFreeLab covers chemicals + product-safety
 * topics (PFAS, BPA, microplastics) so we surface the relevant
 * environmental-health authority alongside the DPA.
 */

type Authority = { label: string; href: string };

const AUTHORITIES: Record<
  string,
  { environment: Authority; dpa: Authority }
> = {
  en: {
    environment: { label: "EPA (US) · ECHA (EU)", href: "https://echa.europa.eu/" },
    dpa: { label: "ICO (UK) · EDPB (EU)", href: "https://edpb.europa.eu/" },
  },
  de: {
    environment: { label: "UBA", href: "https://www.umweltbundesamt.de/" },
    dpa: { label: "BfDI", href: "https://www.bfdi.bund.de/" },
  },
  fr: {
    environment: { label: "ANSES", href: "https://www.anses.fr/" },
    dpa: { label: "CNIL", href: "https://www.cnil.fr/" },
  },
  it: {
    environment: { label: "ISS", href: "https://www.iss.it/" },
    dpa: { label: "Garante Privacy", href: "https://www.garanteprivacy.it/" },
  },
  es: {
    environment: { label: "MITECO", href: "https://www.miteco.gob.es/" },
    dpa: { label: "AEPD", href: "https://www.aepd.es/" },
  },
  nl: {
    environment: { label: "RIVM", href: "https://www.rivm.nl/" },
    dpa: { label: "Autoriteit Persoonsgegevens", href: "https://autoriteitpersoonsgegevens.nl/" },
  },
  pl: {
    environment: { label: "GIOŚ", href: "https://www.gios.gov.pl/" },
    dpa: { label: "UODO", href: "https://uodo.gov.pl/" },
  },
  sv: {
    environment: { label: "Naturvårdsverket", href: "https://www.naturvardsverket.se/" },
    dpa: { label: "IMY", href: "https://www.imy.se/" },
  },
  pt: {
    environment: { label: "APA", href: "https://apambiente.pt/" },
    dpa: { label: "CNPD", href: "https://www.cnpd.pt/" },
  },
  ro: {
    environment: { label: "ANPM", href: "http://www.anpm.ro/" },
    dpa: { label: "ANSPDCP", href: "https://www.dataprotection.ro/" },
  },
  cs: {
    environment: { label: "MŽP", href: "https://www.mzp.cz/" },
    dpa: { label: "ÚOOÚ", href: "https://www.uoou.cz/" },
  },
  no: {
    environment: { label: "Miljødirektoratet", href: "https://www.miljodirektoratet.no/" },
    dpa: { label: "Datatilsynet", href: "https://www.datatilsynet.no/" },
  },
};

export function RegulatoryAuthoritiesStrip() {
  const locale = useLocale();
  const a = AUTHORITIES[locale] ?? AUTHORITIES.en;

  return (
    <div className="border-t border-forest/15 pt-5 mt-6 text-[12px] text-forest/70">
      <div className="font-mono text-[10px] tracking-[0.16em] uppercase mb-2">
        Regulatory authorities (your jurisdiction)
      </div>
      <div className="flex flex-wrap gap-x-6 gap-y-1">
        <span>
          Chemicals + environment:{" "}
          <a
            href={a.environment.href}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-terracotta underline decoration-forest/30 hover:decoration-terracotta"
          >
            {a.environment.label}
          </a>
        </span>
        <span>
          Data protection:{" "}
          <a
            href={a.dpa.href}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-terracotta underline decoration-forest/30 hover:decoration-terracotta"
          >
            {a.dpa.label}
          </a>
        </span>
      </div>
    </div>
  );
}
