"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Post } from "@/lib/content/posts";
import type { Hub } from "@/lib/content/hubs";
import { Eyebrow } from "./editorial/Eyebrow";

/**
 * PinnedInvestigation — the signature scroll moment.
 *
 * A ~200vh tall section where the headline stays pinned as the reader
 * scrolls, and three investigative claims reveal one-by-one. On the
 * final beat, the featured card arrives with a bleed-right grid break.
 *
 * The card itself BLEEDS past the right edge of the viewport — a
 * dramatic magazine grid break. Byline sits in the right gutter.
 *
 * Reduced motion: everything falls into a normal stacked layout.
 */
const CLAIMS = [
  {
    n: "01",
    label: "Material composition",
    body: "Every brand's own filings, not the marketing copy. Which layers are disclosed, which aren't, and what \u201Cnon-toxic\u201D actually ends up meaning in a claim.",
  },
  {
    n: "02",
    label: "Heat & abrasion behaviour",
    body: "Six weeks on the lab bench. Infrared temperature maps, cast-iron comparison, and the one test most reviewers skip.",
  },
  {
    n: "03",
    label: "Who disagrees, and why",
    body: "We name the critics, link their work, and say where we still disagree. Investigative, not performative.",
  },
] as const;

export function PinnedInvestigation({
  post,
  hub,
}: {
  post: Post;
  hub: Hub | undefined;
}) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setActive(CLAIMS.length - 1);
      setProgress(1);
      return;
    }

    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const rect = wrap.getBoundingClientRect();
        const vh = window.innerHeight;
        const total = rect.height - vh;
        // 0 at start of pin, 1 at end of pin
        const p = Math.max(0, Math.min(1, -rect.top / total));
        setProgress(p);
        // 3 claims, plus a final "card" beat (so 4 stops: 0, 1, 2, 3)
        const step = Math.min(CLAIMS.length, Math.floor(p * (CLAIMS.length + 0.5)));
        setActive(step);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      ref={wrapRef}
      className="pinned-investigation"
      aria-labelledby="pinned-investigation-title"
    >
      <div className="pinned-investigation__pin">
        <div className="pinned-investigation__grid">
          {/* LEFT — pinned headline & claims */}
          <div className="pinned-investigation__lede">
            <Eyebrow tone="terracotta">The Investigation</Eyebrow>
            <h2
              id="pinned-investigation-title"
              className="pinned-investigation__title"
              data-balance
            >
              The one we&apos;re{" "}
              <span className="font-instrument italic text-terracotta">
                pushing
              </span>{" "}
              this month.
            </h2>

            {/* Progress track — thin sage line fills as reader scrolls */}
            <div className="pinned-investigation__track" aria-hidden>
              <span
                className="pinned-investigation__track-fill"
                style={{ transform: `scaleX(${progress})` }}
              />
            </div>

            <ol className="pinned-investigation__claims">
              {CLAIMS.map((c, i) => (
                <li
                  key={c.n}
                  data-active={i <= active}
                  className="pinned-investigation__claim"
                >
                  <span className="pinned-investigation__claim-num">{c.n}</span>
                  <div>
                    <div className="pinned-investigation__claim-label">
                      {c.label}
                    </div>
                    <p className="pinned-investigation__claim-body">{c.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* RIGHT — card that bleeds off right edge on the final beat */}
          <article
            className="pinned-investigation__card"
            data-reveal={active >= CLAIMS.length ? "in" : undefined}
          >
            <Link href={`/${post.slug}`} className="group block">
              <div className="pinned-investigation__card-meta">
                <span className="tier-badge">Editor&apos;s pick</span>
                <span className="caps-label text-stone">
                  {hub?.shortName} · {post.readingTime} min read
                </span>
              </div>
              <h3 className="pinned-investigation__card-title">{post.title}</h3>
              <p className="pinned-investigation__card-body">
                {post.description}
              </p>
              {post.ourPick && (
                <div className="pinned-investigation__pick">
                  <span className="caps-label text-stone shrink-0">Our pick</span>
                  <span className="font-serif text-forest text-lg">
                    {post.ourPick.name}
                  </span>
                </div>
              )}
              <span className="pinned-investigation__cta">
                Read the full investigation
                <span aria-hidden>→</span>
              </span>
            </Link>
            {/* Byline bleed into the right gutter */}
            <aside className="pinned-investigation__byline" aria-hidden>
              <span className="pinned-investigation__byline-label">By</span>
              <span className="pinned-investigation__byline-name">
                The PlasticFreeLab
                <br />
                Editorial Team
              </span>
              <span className="pinned-investigation__byline-date">
                April · MMXXVI
              </span>
            </aside>
          </article>
        </div>
      </div>
    </section>
  );
}
