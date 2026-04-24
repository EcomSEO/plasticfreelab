"use client";

import { useEffect, useRef } from "react";

/**
 * CustomCursor — small sage-tinted dot that trails the cursor on desktop.
 *
 * - Hidden on touch devices (`(hover: none)` or `(pointer: coarse)`).
 * - Disabled when the user prefers reduced motion.
 * - Lerped position for a calm, editorial trail (not twitchy).
 * - Pure transform animation — no paint on scroll.
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const noHover = window.matchMedia("(hover: none), (pointer: coarse)").matches;
    if (reduce || noHover) return;

    const dot = dotRef.current;
    if (!dot) return;

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;
    let raf = 0;
    let visible = false;

    const onMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!visible) {
        visible = true;
        dot.style.opacity = "1";
      }
    };

    const onLeave = () => {
      visible = false;
      dot.style.opacity = "0";
    };

    const onOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement | null;
      const interactive = el?.closest(
        'a, button, [role="button"], [role="menuitem"], summary, label[for], input, textarea, select'
      );
      dot.setAttribute("data-interactive", interactive ? "1" : "0");
    };

    const tick = () => {
      // Lerp — ~0.22 reads as responsive-but-calm.
      currentX += (targetX - currentX) * 0.22;
      currentY += (targetY - currentY) * 0.22;
      dot.style.transform = `translate3d(${currentX - 5}px, ${currentY - 5}px, 0)`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={dotRef}
      aria-hidden
      className="pfl-cursor"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: 10,
        height: 10,
        pointerEvents: "none",
        zIndex: 9999,
        opacity: 0,
        transition: "opacity 300ms cubic-bezier(0.16, 1, 0.3, 1), width 220ms cubic-bezier(0.16, 1, 0.3, 1), height 220ms cubic-bezier(0.16, 1, 0.3, 1), background-color 220ms cubic-bezier(0.16, 1, 0.3, 1)",
        willChange: "transform",
        mixBlendMode: "multiply",
      }}
    />
  );
}
