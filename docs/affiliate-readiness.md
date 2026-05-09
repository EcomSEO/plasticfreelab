# Plasticfreelab — Affiliate Readiness (2026-04-30)

What's wired, what still needs operator inputs, how to add new products.

---

## TL;DR

The affiliate plumbing is fully wired and live. Every link uses `rel="sponsored nofollow noopener"`. Every link is preceded by a visible `<AffiliateLabel>` (FTC + EU UWG §5a compliant). The Amazon Associates tag is the operator's real account tag `ecomseo02-20`, verified against the operator's other approved sites (wasstripsreview.nl, bestwatercolorbrushes.com).

Category atmosphere imagery is sourced from kie.ai per the network image cookbook — generic kitchen / water / pantry / bathroom scenes that never depict a specific branded product. Per-product photography uses Amazon's product CDN (which Associates are explicitly permitted to hotlink).

Six of the network's comparison-post products are bound to the registry and now render buy buttons:

| Product (in posts.ts) | productKey | Primary path | Amazon ASIN |
|---|---|---|---:|
| Made In Stainless Clad | `made-in-stainless-clad` | madeincookware.com (brand-direct) | _pending_ |
| Lodge Cast Iron Skillet | `lodge-cast-iron-skillet` | brand-direct | _pending_ |
| Xtrema Ceramic | `xtrema-ceramic` | brand-direct | _pending_ |
| Caraway Ceramic-Coated | `caraway-cookware-set` | carawayhome.com | _pending_ |
| AquaTru Countertop RO | `aquatru-classic` | aquatruwater.com | _pending_ |
| Big Berkey | `berkey-big` | berkey-direct | _pending_ |
| Brita Elite Pitcher | `brita-elite-pitcher` | Amazon (already primary) | (set) |

---

## Imagery — what's live, what's pending

### Category atmosphere shots (live)

Six kie.ai-generated atmosphere images shipped to `public/images/categories/`:

| Slug | Used by post(s) | Notes |
|---|---|---|
| `non-toxic-cookware.jpg` | best-non-toxic-cookware | Three unbranded cooking pots on wooden cutting board |
| `water-filters.jpg` | best-water-filters, brita-vs-berkey-vs-aquatru | Glass of water on kitchen counter |
| `glass-food-storage.jpg` | (available; bind when post ships) | Pantry shelf with unbranded glass jars |
| `personal-care.jpg` | (available; bind when post ships) | Unbranded amber bottles on marble |
| `cleaning.jpg` | (available; bind when post ships) | Unbranded amber spray bottle on linen |
| `microplastics-edcs.jpg` | microplastics-and-edcs-guide | Glass beaker with single ripple |

To bind a category image to a post, add `heroImage` to the Post entry:

```ts
{
  slug: "...",
  heroImage: {
    src: "/images/categories/cleaning.jpg",
    alt: "Plain spec describing what is in the frame.",
  },
  ...
}
```

Templates auto-render the image in a 16:9 figure between the H1 and the byline. No template edits needed.

### Per-product photos (operator action)

Per-product imagery is NOT auto-generated — every product photo must be a real photo of the real product. The cleanest path:

1. **Find the canonical Amazon listing** for the product (search by brand + model).
2. **Right-click the product photo on Amazon → Copy image address.** The URL will look like `https://m.media-amazon.com/images/I/{id}.jpg` or `https://m.media-amazon.com/images/I/{id}._AC_SL1500_.jpg`.
3. **Paste into the registry entry:**
   ```ts
   "lodge-cast-iron-skillet": {
     // ... existing fields ...
     imageUrl: "https://m.media-amazon.com/images/I/...jpg",
     imageAlt: "Lodge 12-inch cast iron skillet, top-down view.",
   },
   ```

Amazon Associates are explicitly permitted to hotlink images via the m.media-amazon.com CDN. (See Amazon Associates Operating Agreement §6 — "Recommended Listings.")

**Do NOT use kie.ai for individual product photos.** Per the kie.ai cookbook compliance rules: "NO branded packaging readable. Generic plain containers only." A fake AI image of a Caraway pan or Lodge skillet would be brand misuse + reader-trust suicide.

---

## What you (operator) still need to do

### 1. Add real Amazon ASINs to the registry (15 min)

I deliberately did NOT invent ASINs. Inventing them would risk linking to wrong / discontinued / counterfeit listings on Amazon. For each registry entry that should ALSO surface a "Buy on Amazon" channel alongside the brand-direct link, look up the canonical ASIN on Amazon and paste it into `lib/affiliate/registry.ts`:

```ts
"made-in-stainless-clad": {
  // ... existing fields ...
  amazonAsin: "B0XXXXXXXX",  // ← paste the real ASIN here
},
```

The `getAffiliateChannels()` helper auto-builds the URL with the `ecomseo02-20` tag the moment the ASIN is set. No code edit beyond the ASIN string is needed; the buy button surfaces on next deploy.

How to find the ASIN: open the product on Amazon, the ASIN is in the URL after `/dp/` (e.g. `amazon.com/dp/B07XV6JQG5/...`). Or open "Product details" on the listing and look for "ASIN: B0XXXXXXXX".

### 2. Apply for affiliate programs (Wave 2)

The current registry uses brand-direct affiliate URLs (Caraway, Made In, Berkey, AquaTru) which assume operator approval on:

- **Caraway** — direct affiliate program (apply via carawayhome.com/pages/affiliates)
- **Made In** — ShareASale (~5–8% commission)
- **Berkey** — direct affiliate program (apply via Berkey website)
- **AquaTru** — Impact.com network (~10%)
- **Lodge / Xtrema / Brita** — Amazon Associates (already approved with `ecomseo02-20`)

Each brand-direct URL in the registry currently points at the brand's product page WITHOUT an affiliate parameter. Once you're approved with each brand and have your tracking parameter, replace the URL in `lib/affiliate/registry.ts` (e.g., `https://carawayhome.com/products/cookware?ref=YOUR-AFFILIATE-CODE`).

### 3. Rate verification

Per `MONETIZATION-MODEL.md` §non-peptide-sites, plasticfreelab targets:
- Amazon Associates: 1–4.5% per category
- Brand-direct: 8–15%
- Premium newsletter: $5/mo (when launched)

Track per-merchant performance month-over-month in `~/Developer/active/health-network/docs/launch-blockers.md` so you can prune underperformers.

---

## How to add a new product to the registry

### Step 1 — Add the entry

Edit `lib/affiliate/registry.ts` and append to the `AFFILIATES` map:

```ts
"new-product-key": {
  productKey: "new-product-key",
  brand: "BrandName",
  name: "Specific Product Name",
  thirdPartyUrl: "https://brand.com/products/...",
  thirdPartyLabel: "Direct",  // or "Amazon" if Amazon is primary
  amazonAsin: "B0XXXXXXXX",   // optional, surfaces secondary Amazon button
  category: "cookware",        // cookware | water-filter | food-storage | personal-care | cleaning | baby
  pflScore: 85,                // PFL Calculator score, methodology v1.2
  blurb: "1-2 sentence editorial summary used in summary cards.",
},
```

### Step 2 — Bind the product to a post

In `lib/content/posts.ts`, find the comparison post and add `productKey` to the matching product entry:

```ts
products: [
  {
    rank: 1,
    name: "BrandName Specific Product Name",
    tier: "Best overall",
    score: 85,
    summary: "...",
    productKey: "new-product-key",  // ← this line
  },
],
```

(And the same on `ourPick` if applicable.)

### Step 3 — Verify

```bash
pnpm typecheck       # type-safety on registry binding
pnpm audit:claims    # forbidden-claims scan
pnpm build           # full production build — every product page rebuilds
```

### Step 4 — Commit + push

The `<ProductBuyChannels>` component auto-renders buy buttons + `<AffiliateLabel>` on next deploy. No template change needed.

---

## What's hard-coded vs configurable

| Layer | Hard-coded | Configurable |
|---|---|---|
| `AMAZON_TAG` constant | `lib/affiliate/registry.ts` line 64 | Bump only when account changes |
| Product registry | `AFFILIATES` map | Add/edit entries freely |
| Post bindings | `productKey` field per product | Add freely; missing keys silently render no buy buttons |
| Affiliate disclosure copy | `components/AffiliateDisclosure.tsx` | Edit per legal review |
| Locale labels (Sponsored / Werbung / etc.) | `components/AffiliateLabel.tsx` | Network convention; do not change without lawyer review |

---

## Compliance gates the wiring respects

1. **FTC § 255.5** — Material connection disclosed at point of impression (the `<AffiliateLabel>` pill shipped with every link).
2. **EU UWG § 5a / Digital Services Act** — Sponsored content labelled in the user's locale (12 supported labels in `AffiliateLabel.tsx`).
3. **Google's link-program guidelines** — `rel="sponsored nofollow"` on every affiliate `<a>` (centralised in `AffiliateLink.tsx`).
4. **Amazon Operating Agreement § 5** — Tag `ecomseo02-20` is the operator's approved tag. Do not add additional tags or invent placeholder tags; both invite account closure.

---

## Pointers

- Affiliate registry: `lib/affiliate/registry.ts`
- Post bindings: `lib/content/posts.ts` (search `productKey:`)
- Buy-channel component: `components/ProductBuyChannels.tsx`
- Per-link disclosure pill: `components/AffiliateLabel.tsx`
- Outbound link wrapper: `components/AffiliateLink.tsx`
- Site-wide disclosure: `components/AffiliateDisclosure.tsx` + `/affiliate-disclosure` page
- Network monetization model: `~/Library/Application Support/Claude/.../health-network-seo-prompts-2026-04-29/MONETIZATION-MODEL.md`
