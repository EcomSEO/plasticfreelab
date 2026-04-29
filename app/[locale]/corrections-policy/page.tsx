import type { Metadata } from "next";
import { TrustPageTemplate } from "@/components/templates/TrustPageTemplate";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Corrections policy",
  description:
    "How PlasticFreeLab handles factual errors, broken links, methodology updates, and reader-flagged corrections.",
  path: "/corrections-policy",
});

export default function CorrectionsPolicyPage() {
  return (
    <TrustPageTemplate title="Corrections policy">
      <p className="caps-label text-stone">Last updated 29 April 2026</p>

      <p>
        We make mistakes. When we do, we correct them visibly. This page
        describes how PlasticFreeLab handles factual errors, broken links,
        methodology updates, and reader-flagged corrections.
      </p>

      <h2>Material corrections</h2>
      <p>
        A material correction is any error that changes the meaning of a
        published page or could mislead a reader&apos;s decision &mdash;
        wrong PFL Calculator score, wrong chemical-exposure number, wrong
        brand attribution. When we ship one:
      </p>
      <ul>
        <li>
          A correction banner runs at the top of the affected post for 30
          days after the fix.
        </li>
        <li>
          A note in the post footer remains permanently, with the original
          published date, the corrected date, and a one-line description of
          what changed.
        </li>
        <li>
          The correction is added to the corrections log (below) and to the
          monthly newsletter&apos;s "what we got wrong" section.
        </li>
      </ul>

      <h2>Minor corrections</h2>
      <p>
        Typos, broken links, formatting glitches, and dead images are silent
        fixes &mdash; we do not flag them in the post footer because the
        meaning of the page does not change. The git history remains the
        source of truth for these.
      </p>

      <h2>Methodology updates</h2>
      <p>
        When the PFL Calculator methodology changes (a new scoring weight,
        a new disqualifying criterion), we version the methodology rather
        than rewriting the past. The current version is{" "}
        <a href="/methodology">v1.2</a>; historical versions remain
        reachable so external citations against an older score stay
        resolvable.
      </p>
      <p>
        When a methodology update changes a score retroactively on a
        published roundup, we note the change as a material correction with
        the reason in plain language &mdash; "we tightened the PFAS-leaching
        threshold from 0.5 ppb to 0.1 ppb" rather than "we updated our
        approach."
      </p>

      <h2>How to flag a correction</h2>
      <p>
        Email{" "}
        <a href="mailto:corrections@plasticfreelab.com">
          corrections@plasticfreelab.com
        </a>{" "}
        with the URL of the affected post, the specific claim, and the
        primary source you believe contradicts it. We respond within 5
        business days. Reader corrections that are accepted are credited to
        the reader by name in the corrections log unless they ask to remain
        anonymous.
      </p>

      <h2>Corrections log</h2>
      <p>
        The corrections log is a public, chronological list of all material
        corrections shipped on PlasticFreeLab. The log is empty at launch
        and will populate as corrections happen.
      </p>

      <h2>What we will not do</h2>
      <ul>
        <li>
          We will not silently remove a post that has shipped a material
          error. The post stays up with a correction banner and a permanent
          footer note &mdash; deletion would erase the public record.
        </li>
        <li>
          We will not accept brand-paid takedowns. A brand that disputes a
          score has the same path as any other reader: email the corrections
          desk with primary sources. The methodology decides.
        </li>
        <li>
          We will not change a PFL Calculator score because of a new
          affiliate relationship. Methodology hard rule: revenue does not
          influence score.
        </li>
      </ul>
    </TrustPageTemplate>
  );
}
