import Link from "next/link";
import type { Post } from "@/lib/content/posts";
import type { Hub } from "@/lib/content/hubs";
import { getHub } from "@/lib/content/hubs";
import { Eyebrow } from "./editorial/Eyebrow";
import { Byline, Monogram } from "./editorial/Monogram";
import { VerifiedSeal } from "./editorial/VerifiedSeal";

const typeLabel: Record<Post["postType"], string> = {
  pillar: "The Guide",
  comparison: "The Comparison",
  cluster: "The Explainer",
  listicle: "The Audit",
};

/**
 * MagazineGrid — 3-column editorial density block, inspired by
 * organicauthority.com's first-viewport magazine hero, but executed
 * in Fraunces/Inter/Instrument Serif with our sage/cream palette.
 *
 * LEFT (span 5): a single featured Investigation with image slot,
 *   eyebrow, headline, deck, byline and read-time.
 * CENTER (span 4): a vertical list of 7–8 headlines with monogram
 *   avatar, byline caps, and thin sage dividers. Each row gets a
 *   3px sage accent bar on hover.
 * RIGHT (span 3): 3 stacked "Currently testing" cards with round
 *   VerifiedSeal graphics in the top-right.
 */
export function MagazineGrid({
  featured,
  headlines,
  testing,
}: {
  featured: { post: Post; hub: Hub | undefined };
  headlines: Array<{ post: Post; hub: Hub | undefined }>;
  testing: Array<{ post: Post; hub: Hub | undefined }>;
}) {
  return (
    <section
      className="mag-grid border-b border-forest/10"
      data-reveal
      aria-labelledby="in-this-issue"
    >
      <div className="mx-auto max-w-7xl px-6 py-14 md:py-20">
        {/* Header */}
        <div className="mag-grid__head">
          <div>
            <Eyebrow tone="sage">In this issue</Eyebrow>
            <h2
              id="in-this-issue"
              className="font-serif text-3xl md:text-4xl text-forest mt-3 leading-tight"
              data-balance
            >
              Twelve investigations,{" "}
              <span className="font-instrument italic text-terracotta">
                one calm page
              </span>
              .
            </h2>
          </div>
          <Link
            href="#issue-contents"
            className="text-sage hover:text-terracotta text-sm font-medium mag-grid__toc"
          >
            Skip to the table of contents →
          </Link>
        </div>

        {/* 12-col editorial grid */}
        <div className="mag-grid__grid">
          {/* LEFT — one big featured */}
          <article className="mag-grid__featured">
            <Link
              href={`/${featured.post.slug}`}
              className="mag-grid__featured-link group block"
            >
              <div className="mag-grid__image mag-grid__image--featured">
                <div className="mag-grid__image-gradient" aria-hidden />
                <span className="mag-grid__chip">
                  {typeLabel[featured.post.postType]} ·{" "}
                  {featured.hub?.shortName}
                </span>
                <svg
                  aria-hidden
                  viewBox="0 0 24 24"
                  className="mag-grid__leaf"
                  width="56"
                  height="56"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.1}
                >
                  <path d="M6 2L12 8L18 2" />
                  <path d="M6 14C6 10 9 8 12 8C15 8 18 10 18 14V22H6V14Z" />
                </svg>
              </div>
              <div className="mag-grid__meta-caps">
                Featured Investigation · {featured.hub?.shortName}
              </div>
              <h3
                className="mag-grid__featured-title"
                data-balance
              >
                {featured.post.title}
              </h3>
              <p className="mag-grid__featured-deck">
                {featured.post.description}
              </p>
              <div className="mag-grid__byline-row">
                <Byline readingTime={featured.post.readingTime} monogramSize={28} />
                <span className="mag-grid__testing-lead" aria-hidden>
                  <span className="mag-grid__sage-dot" />
                  Testing lead
                </span>
              </div>
            </Link>
          </article>

          {/* CENTER — vertical list of headlines */}
          <div className="mag-grid__headlines" aria-label="Latest headlines">
            <div className="mag-grid__headlines-head">
              <Eyebrow tone="terracotta">From the desk</Eyebrow>
            </div>
            <ul className="mag-grid__list">
              {headlines.map(({ post, hub }) => (
                <li key={post.slug} className="mag-grid__list-item">
                  <Link
                    href={`/${post.slug}`}
                    className="mag-grid__row group"
                  >
                    <span className="mag-grid__row-accent" aria-hidden />
                    <Monogram size={28} />
                    <div className="mag-grid__row-body">
                      <h4 className="mag-grid__row-title">{post.title}</h4>
                      <div className="mag-grid__row-meta">
                        The PlasticFreeLab Team
                        <span aria-hidden>·</span>
                        {hub?.shortName}
                        <span aria-hidden>·</span>
                        {post.readingTime} MIN
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* RIGHT — 3 stacked "Currently testing" cards */}
          <aside
            className="mag-grid__testing"
            aria-label="Currently testing"
          >
            <Eyebrow tone="sage" className="mag-grid__testing-head">
              Currently testing
            </Eyebrow>
            <ul className="mag-grid__testing-list">
              {testing.map(({ post, hub }) => (
                <li key={post.slug}>
                  <Link
                    href={`/${post.slug}`}
                    className="mag-grid__testing-card group"
                  >
                    <div className="mag-grid__testing-image">
                      <div className="mag-grid__testing-gradient" aria-hidden />
                      <VerifiedSeal
                        size={56}
                        variant="currently-testing"
                        className="mag-grid__testing-seal"
                      />
                    </div>
                    <div className="mag-grid__testing-body">
                      <span className="mag-grid__eyebrow-xs">
                        {hub?.shortName} · {typeLabel[post.postType]}
                      </span>
                      <h4 className="mag-grid__testing-title">
                        {post.title}
                      </h4>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </div>
    </section>
  );
}

export { getHub };
