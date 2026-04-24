import Link from "next/link";
import type { Post } from "@/lib/content/posts";
import type { Hub } from "@/lib/content/hubs";
import { BotanicalHero } from "./editorial/BotanicalHero";
import { SITE } from "@/lib/content/site";

/**
 * HeroMasthead — the stunning editorial masthead.
 *
 * An extreme-scale fluid typographic composition (`clamp(3.5rem, 10vw, 11rem)`)
 * that mixes Fraunces heavy display with an enlarged Instrument Serif italic
 * "quietly" — the signature moment, set larger than the rest of the headline
 * and given a slight rotation.
 *
 * Structural cues:
 *   - ISSUE NO. 01 · VOL. I · THE LAUNCH EDITION small-caps at the very top
 *   - Vertical sage rule running up the left gutter
 *   - Floating "footnote" in the right margin
 *   - BotanicalHero anchored behind the type, responsive to cursor
 *
 * Grid break: the whole composition bleeds past max-width; the footnote
 * sits in the page's right gutter.
 */
export function HeroMasthead({
  issueItems,
}: {
  issueItems: Array<{ post: Post; hub: Hub | undefined }>;
}) {
  return (
    <section className="masthead" aria-labelledby="masthead-title">
      {/* Thin sage rule running vertically through the left gutter.
          Animates in as part of the load choreography. */}
      <div className="masthead__gutter-rule" aria-hidden />

      {/* Botanical SVG — anchored back-right, behind the type */}
      <div className="masthead__botanical" aria-hidden>
        <BotanicalHero />
      </div>

      <div className="masthead__container">
        {/* Top imprint — small-caps mono metadata */}
        <div className="masthead__imprint masthead-reveal-1">
          <span className="masthead__imprint-mark" aria-hidden />
          <span>Issue No. 01</span>
          <span aria-hidden>·</span>
          <span>{SITE.volume}</span>
          <span aria-hidden>·</span>
          <span>The Launch Edition</span>
          <span aria-hidden className="masthead__imprint-dot" />
          <span>MMXXVI</span>
        </div>

        {/* Headline — extreme scale, editorial typographic composition */}
        <h1 id="masthead-title" className="masthead__headline" data-balance>
          <span className="masthead__line masthead-reveal-2">
            The non-toxic
          </span>
          <span className="masthead__line masthead-reveal-3">
            <span className="masthead__word">lab</span>
            <span className="masthead__ampersand" aria-hidden>
              &amp;
            </span>
            <span className="masthead__word">the</span>
          </span>
          <span className="masthead__line masthead-reveal-4">
            <span className="masthead__quietly">quietly</span>
          </span>
          <span className="masthead__line masthead__line--small masthead-reveal-5">
            cited guide to every swap that matters.
          </span>
        </h1>

        {/* Floating pullquote footnote — right gutter grid break */}
        <aside className="masthead__footnote masthead-reveal-6" aria-hidden>
          <span className="masthead__footnote-rule" />
          <span className="masthead__footnote-text">
            <em>Fig. 1.</em> A field guide to the exposures your house keeps
            quiet — published one cited page at a time.
          </span>
        </aside>

        {/* Body + CTAs — left column, lower */}
        <div className="masthead__lede masthead-reveal-7">
          <p className="masthead__body">
            PlasticFreeLab reads the studies, tests the swaps, and publishes
            what we'd tell a friend, with sources. No scolding, no lifestyle
            pastel, no <span className="font-instrument italic">"10 shocking toxins"</span> fear bait.
          </p>
          <div className="masthead__ctas">
            <Link href="/guides/non-toxic-kitchen" className="btn-primary">
              Start with the kitchen
              <span aria-hidden>→</span>
            </Link>
            <Link href="#issue-contents" className="btn-secondary">
              In this issue
            </Link>
          </div>
        </div>

        {/* "In this issue" — drawn as a folio note, bottom-left */}
        <aside
          className="masthead__issue masthead-reveal-8"
          aria-labelledby="masthead-issue-label"
        >
          <div id="masthead-issue-label" className="masthead__issue-label">
            In this issue
          </div>
          <ol className="masthead__issue-list">
            {issueItems.slice(0, 4).map(({ post, hub }, i) => (
              <li key={post.slug}>
                <Link
                  href={`/${post.slug}`}
                  className="masthead__issue-link"
                >
                  <span className="masthead__issue-num tnum">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="masthead__issue-title">{post.title}</span>
                  <span className="masthead__issue-meta">
                    {hub?.shortName} · {post.readingTime} min
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </aside>

        {/* Bottom folio */}
        <div className="masthead__folio masthead-reveal-9">
          <span className="masthead__folio-rule" aria-hidden />
          <span className="masthead__folio-text">
            Scroll — the table of contents is below
          </span>
          <span className="masthead__folio-arrow" aria-hidden>↓</span>
        </div>
      </div>
    </section>
  );
}
