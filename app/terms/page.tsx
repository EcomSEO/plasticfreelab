import type { Metadata } from "next";
import Link from "next/link";
import { TrustPageTemplate } from "@/components/templates/TrustPageTemplate";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Terms of Service",
  description: "The terms that govern your use of PlasticFreeLab.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <TrustPageTemplate title="Terms of Service">
      <p className="text-sm text-stone">Last updated: April 20, 2026.</p>
      <p>
        By accessing plasticfreelab.com (&ldquo;the Site&rdquo;), you agree to
        these Terms. If you don&apos;t agree, don&apos;t use the Site.
      </p>

      <h2>1. The Site is informational</h2>
      <p>
        PlasticFreeLab publishes editorial content about non-toxic living,
        consumer product safety, and related topics.{" "}
        <strong>
          Nothing on this Site is medical advice, legal advice, or professional
          advice of any kind.
        </strong>{" "}
        We describe what studies, regulatory bodies, and manufacturers have
        published. We do not diagnose, treat, cure, or prevent any disease or
        condition.
      </p>
      <p>
        Always consult a qualified professional (a physician, pediatrician,
        environmental health specialist) before making decisions based on
        content you read here, especially regarding pregnancy, infants, medical
        conditions, or regulatory compliance.
      </p>

      <h2>2. Accuracy</h2>
      <p>
        We work hard to be accurate. We cite every claim. We update quarterly.
        But we are not infallible, regulatory frameworks change, products are
        reformulated, and new evidence arrives. Content on the Site is
        provided &ldquo;as is&rdquo; without warranties of any kind.
      </p>

      <h2>3. Affiliate links</h2>
      <p>
        Some links on the Site are affiliate links. We may earn a commission
        when you buy through them. Our use of affiliate links never affects our
        recommendations. See our{" "}
        <Link href="/affiliate-disclosure">Affiliate Disclosure</Link> for
        detail.
      </p>

      <h2>4. Intellectual property</h2>
      <p>
        All content on the Site (text, images, logos, design) is owned by
        PlasticFreeLab or licensed to us. You may share excerpts with
        attribution. You may not republish articles in full, train AI models
        on our content at scale, or use our name or brand in a way that
        implies endorsement.
      </p>

      <h2>5. User submissions</h2>
      <p>
        If you send us an email, product tip, or correction, you grant us a
        non-exclusive right to use that feedback to improve the Site. We won&apos;t
        publish your name or identifying details without permission.
      </p>

      <h2>6. Third-party sites</h2>
      <p>
        We link to third-party sites (studies, regulatory documents, retailers).
        We don&apos;t control those sites and aren&apos;t responsible for their content,
        practices, or changes.
      </p>

      <h2>7. Limitation of liability</h2>
      <p>
        To the maximum extent permitted by law, PlasticFreeLab is not liable
        for any indirect, incidental, consequential, or punitive damages
        arising from your use of the Site. Our total liability for any claim
        related to the Site is limited to $100.
      </p>

      <h2>8. Changes to these Terms</h2>
      <p>
        We may update these Terms. Material changes will be highlighted on
        this page with a new &ldquo;Last updated&rdquo; date. Continued use of
        the Site after a change constitutes acceptance.
      </p>

      <h2>9. Governing law</h2>
      <p>
        These Terms are governed by the laws of the State of Delaware, United
        States. Disputes will be resolved in the state or federal courts of
        Delaware.
      </p>

      <h2>10. Contact</h2>
      <p>Questions about these Terms? Email hello@plasticfreelab.com.</p>
    </TrustPageTemplate>
  );
}
