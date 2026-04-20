import type { Metadata } from "next";
import { TrustPageTemplate } from "@/components/templates/TrustPageTemplate";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Contact PlasticFreeLab",
  description: "How to reach us.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <TrustPageTemplate title="Contact">
      <h2>General</h2>
      <p>
        <strong>hello@plasticfreelab.com</strong> — feedback, questions,
        product tips, everything else.
      </p>

      <h2>Corrections</h2>
      <p>
        <strong>corrections@plasticfreelab.com</strong> — spotted something
        wrong? We want to know. We respond within 5 business days and publish
        corrections publicly when warranted.
      </p>

      <h2>Privacy</h2>
      <p>
        <strong>privacy@plasticfreelab.com</strong> — questions about data,
        deletion requests, anything GDPR or CCPA-related.
      </p>

      <h2>What we&apos;re not</h2>
      <p>
        We&apos;re not a clinic. We can&apos;t diagnose anything. We can&apos;t recommend a
        specific product for your specific medical condition. If you have a
        health concern, please talk to your physician.
      </p>

      <h2>Response times</h2>
      <p>
        We&apos;re a small team. We read everything. We respond to most emails
        within 3-5 business days.
      </p>
    </TrustPageTemplate>
  );
}
