import type { Metadata } from "next";
import Link from "next/link";
import { TrustPageTemplate } from "@/components/templates/TrustPageTemplate";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description: "What we collect, how we use it, and your rights.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <TrustPageTemplate title="Privacy Policy">
      <p className="text-sm text-charcoal/60">Last updated: April 20, 2026.</p>
      <p>
        This Privacy Policy describes how PlasticFreeLab (&ldquo;we,&rdquo;
        &ldquo;us,&rdquo; or &ldquo;our&rdquo;) collects, uses, and shares
        information when you visit plasticfreelab.com.
      </p>

      <h2>1. Information we collect</h2>
      <p>
        <strong>Information you provide:</strong> When you subscribe to our
        newsletter, we collect your email address and any preferences you
        share.
      </p>
      <p>
        <strong>Information collected automatically:</strong> Like most
        websites, we collect standard web analytics: pages visited, referring
        URL, approximate location (country, region), device type, browser, and
        anonymized session identifiers. We do not collect your name, precise
        location, or any data that directly identifies you.
      </p>
      <p>
        <strong>Cookies:</strong> We use a small number of cookies: one for
        session continuity, one for analytics, and (where applicable) one to
        remember your cookie consent choice. We do not use third-party
        advertising cookies.
      </p>

      <h2>2. How we use it</h2>
      <ul>
        <li>To deliver the site and the newsletter</li>
        <li>To understand which content is useful and which isn&apos;t</li>
        <li>To improve the product</li>
        <li>To comply with legal obligations</li>
      </ul>
      <p>We do not sell, rent, or trade your personal information.</p>

      <h2>3. Third parties</h2>
      <p>We use the following third-party services:</p>
      <ul>
        <li><strong>Vercel</strong> — hosting and delivery</li>
        <li><strong>Neon</strong> — analytics database (anonymized traffic data only)</li>
        <li><strong>Beehiiv</strong> — newsletter delivery</li>
        <li><strong>Supabase</strong> — asset storage (images, PDFs)</li>
        <li><strong>Google Search Console</strong> / <strong>Bing Webmaster Tools</strong> — SEO performance data (no personal information collected via these)</li>
      </ul>
      <p>Each of these operates under its own privacy policy.</p>

      <h2>4. Affiliate links</h2>
      <p>
        Some product links on this site are affiliate links. When you click one
        and make a purchase, the retailer may share information with us about
        the transaction (product, date, commission). We do not receive your
        name, address, or payment information.
      </p>
      <p>
        See our <Link href="/affiliate-disclosure">Affiliate Disclosure</Link>{" "}
        for more detail.
      </p>

      <h2>5. Your rights</h2>
      <p>
        Depending on your location, you may have rights under the GDPR (EU/UK),
        CCPA (California), or other privacy laws. These may include:
      </p>
      <ul>
        <li>The right to access information we hold about you</li>
        <li>The right to correct or delete that information</li>
        <li>The right to object to or restrict processing</li>
        <li>The right to data portability</li>
        <li>The right to withdraw consent at any time</li>
      </ul>
      <p>
        To exercise any of these rights, email us at
        privacy@plasticfreelab.com. We respond within 30 days.
      </p>

      <h2>6. Children</h2>
      <p>
        PlasticFreeLab is not directed at children under 13. We do not
        knowingly collect information from children under 13. If we learn we
        have collected such information, we will delete it.
      </p>

      <h2>7. Data retention</h2>
      <p>
        We retain newsletter subscriber data until you unsubscribe. We retain
        anonymized analytics data indefinitely. We retain correspondence (such
        as corrections or feedback) for up to 3 years.
      </p>

      <h2>8. Security</h2>
      <p>
        We protect your information with standard industry safeguards,
        including encryption in transit (HTTPS) and access controls on our
        databases. No system is perfectly secure. If a breach occurs, we will
        notify affected users consistent with applicable law.
      </p>

      <h2>9. Changes</h2>
      <p>
        We may update this Privacy Policy. Material changes will be highlighted
        on this page with a new &ldquo;Last updated&rdquo; date.
      </p>

      <h2>10. Contact</h2>
      <p>Questions? Email privacy@plasticfreelab.com.</p>
    </TrustPageTemplate>
  );
}
