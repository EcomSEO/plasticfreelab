"use client";

import { useEffect, useState } from "react";

/**
 * BackToMasthead — floating circular return-to-hero control.
 * Desktop-only (>=lg), appears after one viewport of scroll.
 * Respects prefers-reduced-motion.
 */
export function BackToMasthead() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onClick = () => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Back to masthead"
      className={`back-to-masthead ${visible ? "is-visible" : ""}`}
    >
      <span aria-hidden>↑</span>
    </button>
  );
}
