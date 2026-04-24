import Link from "next/link";
import type { Metadata } from "next";
import { hubs } from "@/lib/content/hubs";
import { Eyebrow } from "@/components/editorial/Eyebrow";
import { DotRule } from "@/components/editorial/DotRule";

export const metadata: Metadata = {
  title: "Not on file",
  description:
    "The page you asked for isn't on our index. A few places that might have what you were after.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main>
      <section className="relative border-b border-forest/10 overflow-hidden">
        {/* "NOT ON FILE" stamp — pure SVG, no JS, decorative */}
        <div className="missing-stamp hidden md:block" aria-hidden>
          <svg
            width="280"
            height="280"
            viewBox="0 0 280 280"
            fill="none"
            className="text-terracotta/70"
          >
            <circle
              cx="140"
              cy="140"
              r="120"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeDasharray="3 5"
            />
            <circle
              cx="140"
              cy="140"
              r="102"
              stroke="currentColor"
              strokeWidth="1"
            />
            <text
              x="140"
              y="125"
              textAnchor="middle"
              fontFamily="Fraunces, serif"
              fontSize="28"
              fontWeight="600"
              letterSpacing="4"
              fill="currentColor"
            >
              NOT ON
            </text>
            <text
              x="140"
              y="165"
              textAnchor="middle"
              fontFamily="Fraunces, serif"
              fontSize="28"
              fontWeight="600"
              letterSpacing="4"
              fill="currentColor"
            >
              FILE
            </text>
            <text
              x="140"
              y="200"
              textAnchor="middle"
              fontFamily="Inter, sans-serif"
              fontSize="9"
              letterSpacing="3"
              fill="currentColor"
              opacity="0.7"
            >
              · PLASTICFREELAB ARCHIVE ·
            </text>
          </svg>
        </div>

        <div className="relative mx-auto max-w-4xl px-6 pt-16 md:pt-24 pb-16 md:pb-20">
          <Eyebrow tone="terracotta">404 &middot; Not on file</Eyebrow>
          <h1 className="display-headline text-forest mt-5 text-[2.5rem] sm:text-5xl md:text-[3.75rem] leading-[1.04]">
            We couldn&apos;t find that page.
          </h1>

          <div className="mt-8 max-w-2xl text-charcoal/85 text-[1.0625rem] leading-[1.75] space-y-4">
            <p>
              Sometimes a URL changes when we reorganize a hub. Sometimes a post
              gets retired because the science moved and we&apos;d rather pull
              it than leave a stale recommendation on the internet.
            </p>
            <p>
              Either way, nothing useful lives at this address. The five hubs
              below cover everything we publish &mdash; one of them almost
              certainly has what you were looking for.
            </p>
          </div>

          <div className="mt-10" data-reveal>
            <DotRule className="rule-draw" />
          </div>

          <div className="mt-10">
            <div className="eyebrow text-stone mb-5">Try the hubs</div>
            <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-5">
              {hubs.map((hub, i) => (
                <li key={hub.slug}>
                  <Link
                    href={`/guides/${hub.slug}`}
                    className="group flex items-start gap-4"
                  >
                    <span className="rank-numeral !text-2xl !text-sage/60 group-hover:!text-sage shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <div className="font-serif text-lg text-forest leading-snug group-hover:text-terracotta transition">
                        {hub.name}
                      </div>
                      <div className="text-[14px] text-charcoal/70 mt-1 leading-snug">
                        {hub.oneLiner}
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-12 flex flex-wrap gap-3">
            <Link href="/" className="btn-primary">
              Back to the front page
              <span aria-hidden>&rarr;</span>
            </Link>
            <Link href="/newsletter" className="btn-secondary">
              Get the weekly dispatch
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
