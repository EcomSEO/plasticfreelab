import type { Metadata } from "next";
import { EmailCapture } from "@/components/EmailCapture";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Newsletter",
  description:
    "One calm email a week — the most-useful post we published, plus the swap we'd make first. Free. Unsubscribe anytime.",
  path: "/newsletter",
});

export default function NewsletterPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="font-serif text-4xl md:text-5xl text-forest leading-tight">
        One calm email a week.
      </h1>
      <p className="mt-6 text-lg text-charcoal/80 leading-relaxed">
        A single useful thing — the most important post we published, the
        swap we&apos;d make first, or a study we read so you don&apos;t have to. No
        upsells, no affiliate spam, no 4,000-word emails.
      </p>
      <p className="mt-3 text-lg text-charcoal/80 leading-relaxed">
        Subscribers also get the{" "}
        <strong className="text-forest">Kitchen Swap Audit</strong> — a
        printable checklist of 50+ kitchen items, each ranked swap now / swap
        eventually / don&apos;t bother.
      </p>
      <EmailCapture
        variant="end-of-article"
        headline="Start with the audit."
        subhead="Add your email and we'll send the PDF right away."
      />
    </main>
  );
}
