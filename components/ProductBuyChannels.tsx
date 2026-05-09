import { AffiliateLink } from "./AffiliateLink";
import { AffiliateLabel } from "./AffiliateLabel";
import {
  AFFILIATES,
  amazonImageUrl,
  getAffiliateChannels,
} from "@/lib/affiliate/registry";

/**
 * ProductBuyChannels — renders the per-product affiliate buy buttons
 * below a ranked product card or below the Our Pick card.
 *
 * Rules (per `_shared/compliance-gap-fill.md` Component 2 +
 * `MONETIZATION-MODEL.md` Implementation pattern):
 *
 *  1. Every link has a visible <AffiliateLabel> at the point of
 *     impression — NOT only on the disclosure page (UWG §5a, FTC).
 *  2. Every <a> carries `rel="sponsored nofollow noopener"` — emitted
 *     by <AffiliateLink>.
 *  3. Owned-shop URL takes precedence over third-party when set.
 *  4. Amazon channel surfaces only when `amazonAsin` is registered AND
 *     the primary path is brand-direct.
 *  5. Variant `compact` is for the inline product-card placement;
 *     `full` is for the Our Pick hero card.
 *
 * Returns null when no productKey or no channels — keeps the post
 * editorial-pure when affiliate data is not yet wired for a given
 * product.
 */

export function ProductBuyChannels({
  productKey,
  variant = "compact",
}: {
  productKey?: string;
  variant?: "compact" | "full";
}) {
  if (!productKey) return null;
  const channels = getAffiliateChannels(productKey);
  if (channels.length === 0) return null;
  const a = AFFILIATES[productKey];

  /**
   * Resolve the product image:
   *  1. Operator-provided `imageUrl` wins (allows brand-direct media-kit
   *     overrides + manually-pasted Amazon `m.media-amazon.com` URLs).
   *  2. Else, when an `amazonAsin` is registered, derive the deterministic
   *     image URL from the ASIN (the bestwatercolorbrushes.com pattern).
   *  3. Else, when the primary URL is itself an Amazon affiliate link,
   *     parse the ASIN out of `/dp/{ASIN}/` and use that.
   *  4. Else, render no image (the buy buttons still show).
   */
  const asinFromPrimary =
    a?.thirdPartyUrl?.match(/\/dp\/([A-Z0-9]{10})/i)?.[1];
  const resolvedAsin = a?.amazonAsin ?? asinFromPrimary;
  const productImageUrl =
    a?.imageUrl ??
    (resolvedAsin ? amazonImageUrl(resolvedAsin) : undefined);
  const productImageAlt =
    a?.imageAlt ?? (a ? `${a.brand} ${a.name}` : "");

  if (variant === "full") {
    return (
      <div className="mt-6">
        {productImageUrl && (
          <figure className="mb-5 max-w-xs">
            <img
              src={productImageUrl}
              alt={productImageAlt}
              loading="lazy"
              decoding="async"
              className="w-full h-auto rounded-sm border border-forest/10 bg-white p-2"
            />
          </figure>
        )}
        <div className="flex flex-wrap items-center gap-3">
        <AffiliateLabel />
        {channels.map((c) => (
          <AffiliateLink
            key={c.url}
            href={c.url}
            className={
              c.isPrimary
                ? "inline-flex items-center px-5 py-2.5 bg-forest text-cream rounded-sm text-[14px] font-semibold tracking-wide uppercase hover:bg-forest/90 transition-colors"
                : "inline-flex items-center px-5 py-2.5 border border-forest/30 text-forest rounded-sm text-[14px] font-semibold tracking-wide uppercase hover:bg-forest/[0.04] transition-colors"
            }
          >
            {c.isOwned
              ? "Buy at PlasticFreeLab"
              : `Check price · ${c.label}`}
          </AffiliateLink>
        ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mt-4">
      {productImageUrl && (
        <figure className="mb-3 max-w-[140px]">
          <img
            src={productImageUrl}
            alt={productImageAlt}
            loading="lazy"
            decoding="async"
            className="w-full h-auto rounded-sm border border-forest/10 bg-white p-2"
          />
        </figure>
      )}
      <div className="flex flex-wrap items-center gap-2 text-[13px]">
      <AffiliateLabel />
      {channels.map((c, i) => (
        <span key={c.url} className="flex items-center gap-2">
          {i > 0 && <span className="text-stone">·</span>}
          <AffiliateLink
            href={c.url}
            className={
              c.isPrimary
                ? "text-forest hover:text-sage font-semibold underline underline-offset-2"
                : "text-stone hover:text-forest underline underline-offset-2"
            }
          >
            {c.isOwned ? "Buy at PlasticFreeLab" : `Check ${c.label}`}
          </AffiliateLink>
        </span>
      ))}
      </div>
    </div>
  );
}
