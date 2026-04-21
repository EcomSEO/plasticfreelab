import { Eyebrow } from "./editorial/Eyebrow";

export function AuthorBio() {
  return (
    <section className="mt-14 bg-cream-deep/40 border border-forest/10 rounded-sm p-7 md:p-8">
      <div className="flex flex-col md:flex-row gap-6 items-start">
        {/* Monogram mark */}
        <div
          aria-hidden
          className="shrink-0 h-16 w-16 rounded-full bg-forest text-cream flex items-center justify-center font-serif text-xl"
          style={{ fontVariationSettings: '"opsz" 144, "SOFT" 40' }}
        >
          PL
        </div>
        <div>
          <Eyebrow tone="stone">About the byline</Eyebrow>
          <h3 className="font-serif text-xl text-forest mt-1.5 mb-2">
            The PlasticFreeLab Team
          </h3>
          <p className="text-charcoal/85 leading-relaxed text-[15px] max-w-[62ch]">
            A small group of researchers and writers cutting through the noise
            around non-toxic living. We read the studies, read the labels, test
            the products — and update our recommendations as the science
            evolves. We do not accept payment for product placement, we
            disclose every affiliate relationship, and we name the brands we
            reject.
          </p>
          <div className="mt-4 flex items-center gap-4 text-[13px]">
            <a
              href="/editorial-standards"
              className="text-sage hover:text-terracotta transition"
            >
              Our editorial standards →
            </a>
            <span aria-hidden className="h-1 w-1 rounded-full bg-sage/50" />
            <a
              href="/contact"
              className="text-sage hover:text-terracotta transition"
            >
              Send us a correction →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
