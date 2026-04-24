import type { Metadata } from "next";
import { TrustPageTemplate } from "@/components/templates/TrustPageTemplate";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Affiliate Disclosure",
  description:
    "How affiliate links work on PlasticFreeLab and what that means for you.",
  path: "/affiliate-disclosure",
});

export default function AffiliateDisclosurePage() {
  return (
    <TrustPageTemplate title="Affiliate Disclosure">
      <p>
        PlasticFreeLab participates in affiliate programs. That means that
        some (not all) of the product links on this site are tracked, and we
        earn a small commission when you buy through them, at no additional
        cost to you.
      </p>

      <h2>How we use affiliate links</h2>
      <ul>
        <li>We link to products we recommend on their merits, not their commission rate</li>
        <li>We disclose on every page that includes affiliate links, clearly and above the product list</li>
        <li>We never accept payment for placement</li>
        <li>We never raise a product&apos;s ranking because its affiliate program pays better</li>
        <li>We test our #1 picks against alternatives we don&apos;t earn commission from</li>
      </ul>
      <p>
        When we have a choice between two genuinely-tied products, and one has
        an affiliate program and one doesn&apos;t, we go with the one that&apos;s
        actually better, and we&apos;ll tell you about the one without the link in
        the post.
      </p>

      <h2>Programs we participate in</h2>
      <ul>
        <li>Amazon Associates</li>
        <li>ShareASale</li>
        <li>Impact</li>
        <li>Awin</li>
        <li>Direct affiliate programs with selected manufacturers (disclosed per post when relevant)</li>
      </ul>
      <p>We may add or remove programs over time.</p>

      <h2>Why we&apos;re OK with this</h2>
      <p>
        Advertising is the traditional way independent publishers make a
        living. Banner ads, sponsored posts, and paid brand partnerships are
        worse for readers than affiliate commissions because they put
        advertiser demands in front of reader trust. Affiliate links align
        our interests with yours: we only earn when we recommend something
        you actually buy and (presumably) find useful.
      </p>
      <p>
        If you have any concerns about this model, email us at
        hello@plasticfreelab.com.
      </p>

      <p className="text-sm text-charcoal/60">Last updated: April 2026.</p>
    </TrustPageTemplate>
  );
}
