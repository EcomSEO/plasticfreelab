import type { Metadata } from "next";
import { TrustPageTemplate } from "@/components/templates/TrustPageTemplate";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Impressum",
  description:
    "Anbieterkennzeichnung gemäß § 5 TMG / § 5 DDG für plasticfreelab.com.",
  path: "/impressum",
});

/**
 * German law (TMG / DDG) requires every commercial site accessible in
 * Germany to publish an Impressum: operator name, postal address,
 * contact channel (email or phone), and the responsible party for
 * editorial content (V.i.S.d.P. per § 18 Abs. 2 MStV).
 *
 * `[Operator …]` placeholders are Fabian-side decisions tracked in
 * docs/launch-blockers.md. The page ships with the German legal
 * boilerplate so search engines see the URL and the placeholders are
 * filled in before the public domain flips on.
 */
export default function ImpressumPage() {
  return (
    <TrustPageTemplate title="Impressum">
      <p className="caps-label text-stone">Stand: 29. April 2026</p>

      <h2>Angaben gemäß § 5 TMG / § 5 DDG</h2>
      <p>
        [Operator Name]
        <br />
        [Operator postal address — Straße + Hausnummer]
        <br />
        [PLZ Ort]
        <br />
        [Land]
      </p>

      <h2>Kontakt</h2>
      <p>
        E-Mail:{" "}
        <a href="mailto:hello@plasticfreelab.com">hello@plasticfreelab.com</a>
      </p>

      <h2>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
      <p>
        [Operator Name]
        <br />
        [Operator postal address]
      </p>

      <h2>Streitschlichtung</h2>
      <p>
        Die Europäische Kommission stellt eine Plattform zur
        Online-Streitbeilegung (OS) bereit:{" "}
        <a
          href="https://ec.europa.eu/consumers/odr/"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://ec.europa.eu/consumers/odr/
        </a>
        . Wir sind nicht bereit oder verpflichtet, an
        Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle
        teilzunehmen.
      </p>

      <h2>Haftung für Inhalte</h2>
      <p>
        Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte
        auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich.
        Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht
        verpflichtet, übermittelte oder gespeicherte fremde Informationen zu
        überwachen.
      </p>

      <h2>Haftung für Links</h2>
      <p>
        Unser Angebot enthält Links zu externen Webseiten Dritter, auf
        deren Inhalte wir keinen Einfluss haben. Für die Inhalte der
        verlinkten Seiten ist stets der jeweilige Anbieter verantwortlich.
      </p>

      <h2>Urheberrecht</h2>
      <p>
        Die durch die Seitenbetreiber erstellten Inhalte und Werke auf
        diesen Seiten unterliegen dem deutschen Urheberrecht.
      </p>
    </TrustPageTemplate>
  );
}
