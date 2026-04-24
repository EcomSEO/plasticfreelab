"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

/**
 * KeyboardShortcuts — editorial-style G-chord navigation.
 *
 *   G H  →  home
 *   G I  →  the issue (home #issue-contents)
 *   G N  →  newsletter
 *
 * Announces itself once per device (localStorage). Ignores inputs
 * and any element with contentEditable. Shows a sage toast on first
 * navigation hinting at the next shortcut, then hides.
 */
const HINT_KEY = "pfl:kb-hinted";
const HINT_MS = 4500;

export function KeyboardShortcuts() {
  const router = useRouter();
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let gPressed = 0;
    let gTimer: number | null = null;

    const shouldIgnore = (target: EventTarget | null) => {
      if (!(target instanceof HTMLElement)) return false;
      const tag = target.tagName.toLowerCase();
      if (tag === "input" || tag === "textarea" || tag === "select") return true;
      if (target.isContentEditable) return true;
      return false;
    };

    const showHintOnce = () => {
      if (window.localStorage.getItem(HINT_KEY) === "1") return;
      window.localStorage.setItem(HINT_KEY, "1");
      setToast("Nav shortcuts: press G then H home · I issue · N newsletter");
      window.setTimeout(() => setToast(null), HINT_MS);
    };

    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (shouldIgnore(e.target)) return;

      const key = e.key.toLowerCase();

      if (key === "g") {
        gPressed = Date.now();
        if (gTimer) window.clearTimeout(gTimer);
        gTimer = window.setTimeout(() => (gPressed = 0), 900);
        return;
      }

      if (!gPressed || Date.now() - gPressed > 900) return;

      if (key === "h") {
        e.preventDefault();
        router.push("/");
        gPressed = 0;
        showHintOnce();
      } else if (key === "i") {
        e.preventDefault();
        router.push("/#issue-contents");
        gPressed = 0;
        showHintOnce();
      } else if (key === "n") {
        e.preventDefault();
        router.push("/newsletter");
        gPressed = 0;
        showHintOnce();
      } else if (key === "?") {
        e.preventDefault();
        setToast("G H home · G I issue · G N newsletter");
        window.setTimeout(() => setToast(null), HINT_MS);
      }
    };

    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      if (gTimer) window.clearTimeout(gTimer);
    };
  }, [router]);

  if (!toast) return null;
  return (
    <div className="pfl-toast" role="status" aria-live="polite">
      <span className="pfl-toast__kbd">G</span>
      <span className="pfl-toast__text">{toast}</span>
    </div>
  );
}
