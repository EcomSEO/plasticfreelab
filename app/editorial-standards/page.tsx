import type { Metadata } from "next";
import { TrustPageTemplate } from "@/components/templates/TrustPageTemplate";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Editorial Standards",
  description:
    "Our public-facing editorial policies — sourcing, corrections, affiliate disclosure, AI tooling.",
  path: "/editorial-standards",
});

export default function EditorialStandardsPage() {
  return (
    <TrustPageTemplate title="Editorial Standards">
      <p>
        Every site promises to be trustworthy. Here&apos;s what that actually means
        on PlasticFreeLab.
      </p>

      <h2>Sourcing</h2>
      <p>
        Every factual health claim on this site is cited to at least one of the
        following:
      </p>
      <ul>
        <li>A peer-reviewed paper (PubMed-indexed or equivalent)</li>
        <li>A regulatory document (FDA, EPA, EU REACH, CDC, NIH)</li>
        <li>A manufacturer&apos;s official disclosure (ingredient list, safety data sheet)</li>
        <li>A well-established database (EWG, ToxNet, Open Food Facts)</li>
      </ul>
      <p>
        For any significant health claim, we require <strong>two</strong> independent
        sources: one peer-reviewed study and one regulatory or industry
        reference. When the science is genuinely mixed, we say so in the text.
        We don&apos;t pretend to have certainty we don&apos;t have.
      </p>

      <h2>Testing vs. researching</h2>
      <p>When we recommend a product:</p>
      <ul>
        <li>
          <strong>&ldquo;We tested this&rdquo;</strong> — we physically bought or
          received the product and used it for long enough to form a real
          opinion. We disclose the length of test and what we evaluated.
        </li>
        <li>
          <strong>&ldquo;We evaluated this from research&rdquo;</strong> — we
          didn&apos;t physically test it, but we read the manufacturer documentation,
          third-party lab results, and user reports carefully. We label this
          clearly.
        </li>
      </ul>
      <p>We never blur the line.</p>

      <h2>Rankings</h2>
      <p>
        Every comparison page on this site commits to a #1 pick. When we update
        a page (quarterly, at minimum) and our pick changes, we note the
        change at the top of the post and keep an archive of the previous
        ranking.
      </p>

      <h2>Corrections</h2>
      <p>If we&apos;re wrong, we want to know.</p>
      <p>When we fix a factual error, we:</p>
      <ol>
        <li>Correct the text</li>
        <li>Add a dated correction note at the bottom of the post</li>
        <li>Don&apos;t silently edit — the history stays visible</li>
      </ol>
      <p>
        Email corrections to: hello@plasticfreelab.com. We respond within 5
        business days.
      </p>

      <h2>Affiliate relationships</h2>
      <p>
        PlasticFreeLab earns a commission on some (not all) of the products we
        link to. When we do, we disclose it clearly on the page, above the
        product list, in plain English.
      </p>
      <p>
        <strong>Affiliate commissions never influence our rankings.</strong> We&apos;ve
        turned down placements that paid better to keep a lower-paying product
        as the #1 pick because it was genuinely better. Trust is the only thing
        on this site that compounds. We don&apos;t trade it.
      </p>

      <h2>AI and our editorial process</h2>
      <p>
        We use AI tools, including large language models, in parts of our
        editorial workflow: research synthesis, draft generation, grammar
        checks, and formatting. Every post on this site is reviewed,
        fact-checked, and edited by a human before publication. No post is
        published that hasn&apos;t been through that human review.
      </p>
      <p>
        When AI tooling is used in a way that materially shapes a post&apos;s
        conclusions, we say so explicitly.
      </p>

      <h2>What we don&apos;t do</h2>
      <ul>
        <li>We don&apos;t accept payment for editorial placement</li>
        <li>We don&apos;t publish content written by brands</li>
        <li>We don&apos;t pretend research we didn&apos;t do</li>
        <li>We don&apos;t write fake reviews, fake urgency, or fake scarcity</li>
        <li>We don&apos;t link between our sites — each site stands on its own editorial merit</li>
      </ul>

      <h2>Reviewing our work</h2>
      <p>
        Our methodology, sources, and tooling are visible on every post. If you
        spot something that looks wrong, tell us. That feedback is how the site
        gets better.
      </p>

      <p className="text-sm text-charcoal/60">Last updated: April 2026.</p>
    </TrustPageTemplate>
  );
}
