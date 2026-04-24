"use client";

import Link from "next/link";
import { useEffect } from "react";
import { Eyebrow } from "@/components/editorial/Eyebrow";
import { DotRule } from "@/components/editorial/DotRule";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Surface the error to the console for now; wire to telemetry when it lands.
    // eslint-disable-next-line no-console
    console.error(error);
  }, [error]);

  return (
    <main>
      <section className="border-b border-forest/10">
        <div className="mx-auto max-w-3xl px-6 pt-16 md:pt-24 pb-16 md:pb-20">
          <Eyebrow tone="terracotta">Error &middot; Something slipped</Eyebrow>
          <h1 className="display-headline text-forest mt-5 text-[2.5rem] sm:text-5xl md:text-[3.5rem] leading-[1.04]">
            Something broke on our side.
          </h1>

          <p className="mt-7 text-charcoal/85 text-[1.0625rem] leading-[1.75] max-w-2xl">
            Not the reader&apos;s fault. A page failed to render the way it was
            supposed to. Try again &mdash; if it keeps happening, head back to
            the front page and the rest of the site should still behave.
          </p>

          <div className="mt-10" data-reveal>
            <DotRule className="rule-draw" />
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => reset()}
              className="btn-primary"
            >
              Try again
              <span aria-hidden>&rarr;</span>
            </button>
            <Link href="/" className="btn-secondary">
              Back to home
            </Link>
          </div>

          {error?.digest && (
            <p className="mt-10 caps-label text-stone">
              Reference &middot; {error.digest}
            </p>
          )}
        </div>
      </section>
    </main>
  );
}
