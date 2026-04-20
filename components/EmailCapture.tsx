"use client";

import { FormEvent, useState } from "react";

export function EmailCapture({
  headline = "Get the Kitchen Swap Audit.",
  subhead = "A printable checklist of 50+ kitchen items, each ranked swap now / swap eventually / don't bother. Free. Delivered instantly.",
  variant = "inline",
}: {
  headline?: string;
  subhead?: string;
  variant?: "inline" | "end-of-article";
}) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    // Beehiiv wiring lands with launch checklist §8. Pre-launch: local-only confirmation.
    await new Promise((r) => setTimeout(r, 400));
    setStatus("ok");
  }

  const wrapper =
    variant === "end-of-article"
      ? "my-12 p-8 rounded-lg bg-sage/10 border border-sage/20 text-center"
      : "my-12 p-8 rounded-lg bg-white/70 border border-forest/10 text-center";

  return (
    <section id="email-capture" className={wrapper}>
      <h2 className="font-serif text-2xl text-forest mb-2">{headline}</h2>
      <p className="text-charcoal/80 max-w-xl mx-auto">{subhead}</p>
      {status === "ok" ? (
        <p className="mt-6 text-forest">Thanks — check your inbox.</p>
      ) : (
        <form
          onSubmit={onSubmit}
          className="mt-6 flex flex-col sm:flex-row gap-2 justify-center max-w-md mx-auto"
        >
          <label htmlFor="email" className="sr-only">
            Email address
          </label>
          <input
            id="email"
            type="email"
            required
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 rounded-md border border-forest/20 px-4 py-3 bg-white"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="rounded-md bg-forest px-6 py-3 text-cream hover:bg-sage transition disabled:opacity-50"
          >
            {status === "loading" ? "Sending…" : "Send me the audit"}
          </button>
        </form>
      )}
      <p className="mt-4 text-xs text-charcoal/50 max-w-md mx-auto">
        By subscribing, you agree to our{" "}
        <a href="/privacy" className="underline">
          Privacy Policy
        </a>
        . One calm email a week. Unsubscribe anytime.
      </p>
    </section>
  );
}
