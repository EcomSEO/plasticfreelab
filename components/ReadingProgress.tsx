"use client";

import { useEffect, useRef } from "react";

/**
 * ReadingProgress — renders a 2px sage→forest→terracotta bar pinned to the
 * bottom edge of the masthead. Width scales with scroll position. Uses a
 * single rAF loop and writes via a CSS custom property so no React re-renders.
 *
 * Respects prefers-reduced-motion — the bar still shows current position,
 * but without the easing transition (handled in CSS).
 */
export function ReadingProgress() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    const update = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const max =
        (document.documentElement.scrollHeight || 0) - window.innerHeight;
      const progress = max > 0 ? Math.min(Math.max(scrollTop / max, 0), 1) : 0;
      el.style.setProperty("--reading-progress", progress.toFixed(4));
    };

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        update();
        raf = 0;
      });
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="reading-progress"
      aria-hidden
      role="presentation"
    />
  );
}
