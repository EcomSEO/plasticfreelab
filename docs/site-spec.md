# PlasticFreeLab — Site Build Spec

The complete spec for building plasticfreelab.com on Next.js + Vercel. Pairs with `brand-book-plasticfreelab.md`, `topical-map-plasticfreelab.md`, `sample-briefs.md`, `CLAUDE.md`, and `implementation-plan.md`.

This is the last research document before Vercel. It closes the gap between "strategy is locked" and "Claude Code can scaffold the site."

---

## 1. Information architecture

### URL structure

Flat, keyword-first, no dates, no category slugs in URLs. Hubs are navigational only, not part of the URL — this is intentional: it keeps URLs short, lets posts move between hubs without redirects, and avoids keyword dilution.

```
https://plasticfreelab.com/
https://plasticfreelab.com/{slug}                          # every post lives at root level
https://plasticfreelab.com/guides/{hub-slug}               # hub landing (pillar + curated children)
https://plasticfreelab.com/about
https://plasticfreelab.com/editorial-standards
https://plasticfreelab.com/privacy
https://plasticfreelab.com/terms
https://plasticfreelab.com/affiliate-disclosure
https://plasticfreelab.com/contact
https://plasticfreelab.com/newsletter                      # standalone subscribe LP
https://plasticfreelab.com/sitemap.xml
https://plasticfreelab.com/robots.txt
https://plasticfreelab.com/llms.txt
https://plasticfreelab.com/feed.xml                        # RSS
```

Hub slugs:
- `guides/microplastics-and-edcs`
- `guides/non-toxic-kitchen`
- `guides/non-toxic-personal-care`
- `guides/non-toxic-home`
- `guides/non-toxic-clothing-and-textiles`

### Canonical rules

- Every post has `rel="canonical"` pointing to itself
- Pillar → canonical to itself. Clusters canonical to themselves (not to the pillar — this is the mistake most hub/spoke sites make)
- Trailing slash: **no trailing slash**. Configure Vercel to strip. Pick one and enforce.
- `www.` redirects 301 → apex
- `http` redirects 301 → `https`

### Breadcrumbs

Every post renders breadcrumbs in-page and in JSON-LD:

```
Home → Guides → Non-Toxic Kitchen → Best Non-Toxic Cookware Sets of 2026
```

Breadcrumb JSON-LD schema on every post page. Visible breadcrumb UI shown above the H1 on desktop, collapsed to "← Kitchen" back-link on mobile.

### Global navigation (header)

```
[Logo]   Guides ▾   About   Newsletter                        [email CTA button]

Guides dropdown:
  Microplastics & EDCs    →  /guides/microplastics-and-edcs
  Non-Toxic Kitchen       →  /guides/non-toxic-kitchen
  Personal Care           →  /guides/non-toxic-personal-care
  Home Environment        →  /guides/non-toxic-home
  Clothing & Textiles     →  /guides/non-toxic-clothing-and-textiles
```

Mobile: hamburger → full-screen sheet with the same structure, no accordion (flat list, easier to scan).

### Footer

Three columns + a bottom strip:

```
Column 1 — Guides
  (the 5 hub links)

Column 2 — About
  About PlasticFreeLab
  Editorial Standards
  Our Methodology
  Contact

Column 3 — Fine print
  Privacy Policy
  Terms of Service
  Affiliate Disclosure

Bottom strip:
  © 2026 PlasticFreeLab · [RSS] · [Newsletter]
  Affiliate disclosure (one sentence, always visible): "We sometimes earn a commission from links on this page. We never accept payment for placement."
```

---

## 2. Page templates

Five templates. Each has a fixed structure so Claude Code can scaffold them deterministically and editors know what every module does.

### Template A — HomePage (`/`)

Sections top to bottom:

1. **Hero** — Serif H1 ("We test the non-toxic swaps so you don't have to."), one-sentence subhead, primary CTA ("Start with the kitchen →" → /guides/non-toxic-kitchen), secondary CTA ("Get the audit checklist" → #email-capture). No hero image — a single photograph of a worn wood cutting board + glass jar, right-aligned, cream background.
2. **Featured comparison** — One large card pointing at the current hero comparison post (Wave 1: "Best Non-Toxic Cookware Sets of 2026"). Shows the editor's pick, 3 bullet reasons, "Read the full comparison →".
3. **Five hub grid** — 5 cards, one per hub, each with hub name, one-sentence description, and a "Browse →" link.
4. **Latest posts** — 6 most-recent posts in a 3-column grid. Image, title, hub tag, reading time.
5. **Email capture (inline)** — "Get the Kitchen Swap Audit." One-line benefit, email field, submit button. Checkbox for consent.
6. **Trust strip** — Three icon + one-liner units: "Every claim cited," "Updated quarterly," "No paid placements."
7. **Footer**

### Template B — HubPage (`/guides/{hub-slug}`)

1. **Hub hero** — Serif H1 with the hub name. One paragraph explainer from the topical map's hub thesis.
2. **The pillar card** — Full-width card linking to the hub pillar post.
3. **Start here (3 cards)** — The 3 highest-priority posts in the hub (the 3 comparison pages).
4. **All posts in this hub** — Grid, 2 columns, all cluster + listicle posts. Each card: title, 1-line description, post type tag (Comparison / Explainer / Listicle).
5. **Email capture (inline)** — Hub-specific lead magnet offer (future; Wave 1 uses the generic Kitchen Swap Audit).
6. **Footer**

### Template C — PillarPage (long-form guide)

Used for: all 5 hub pillars, the long explainers.

1. **Breadcrumbs** (above H1)
2. **H1** — Serif, 48-64px
3. **Review stamp** — "By The PlasticFreeLab Team · Updated April 20, 2026 · 18 min read"
4. **Intro (60-120 words)** — Answers the search question in the first paragraph. No "in this post we'll cover."
5. **Sticky TOC** (desktop sidebar, mobile collapsed drawer) — generated from H2s
6. **Body** — H2/H3 sections following the brief's required structure. Callout boxes (cream background, sage left border) for key takeaways. Inline images (CDN-hosted, lazy-loaded, WebP with PNG fallback).
7. **Key takeaways** — Bulleted summary at the end of each major section
8. **FAQ section** — H2 "Frequently asked questions," each Q as H3. Schema-marked as FAQPage.
9. **Sources** — Numbered list. Full citation format (author, title, journal, year, URL).
10. **Author bio block** — The PlasticFreeLab Team bio from the brand book §8
11. **Related posts** (3 cards, same hub)
12. **Email capture (end-of-article)**
13. **Footer**

### Template D — ComparisonPage (money page)

Used for: all "Best X of 2026, tested and ranked" posts.

1. **Breadcrumbs + H1**
2. **Review stamp** + **Affiliate disclosure note** (FTC-compliant, plain English, one line): "PlasticFreeLab tests and recommends products independently. We sometimes earn a commission when you buy through our links — it never affects our rankings."
3. **"Our pick" card** (large, above the fold) — Winner product, photo, 2-sentence reason, "Check price →" button
4. **The short list** — 8-10 products in a ranked list, each with:
   - Rank number, product name, category tag ("Best Overall," "Best Budget," etc.)
   - Hero photo
   - 250-400 words: what it's for, materials, tradeoffs, who it's for, who should skip it
   - Specs table (materials, dimensions, price range, where made)
   - "Check price on [retailer]" CTA (affiliate link with `rel="sponsored nofollow"`)
5. **How we tested** — Methodology section. 3-5 paragraphs. What we evaluated, how we scored, what we physically tested vs. evaluated from research. Explicit about limitations.
6. **What to look for** — Buyer's criteria section. 5-8 H3s.
7. **FAQ** (schema-marked)
8. **Sources** (numbered)
9. **Related posts**
10. **Email capture**

### Template E — ClusterPage (long-tail Q&A)

Used for: "What are microplastics?", "Are ceramic pans safe?", "Hydroxyapatite vs fluoride toothpaste," etc.

1. **Breadcrumbs + H1**
2. **Review stamp**
3. **Direct-answer paragraph** (first 60 words answers the query literally) — this is the featured snippet target
4. **Body** — 1,500-2,500 words, H2/H3 structure
5. **Key takeaways** (bulleted)
6. **FAQ (2-4 questions)** — schema-marked
7. **Sources**
8. **Related posts**
9. **Email capture**

### Template F — ListiclePage (Pinterest-native)

Used for: "12 things to throw out of your kitchen this weekend," etc.

1. **Breadcrumbs + H1**
2. **Review stamp**
3. **Intro (80-100 words)** — What this list is, how it's ordered, one line of voice
4. **Numbered items** — Each item has:
   - Numbered H2 ("1. The plastic cutting board")
   - Hero photo (Pinterest-friendly ratio 1000×1500 or 1200×1600)
   - 80-150 words
   - Inline "Why it matters" + "What to use instead" two-line blocks
5. **Pin-this block** (mid-listicle) — a save-to-Pinterest card
6. **FAQ** (optional)
7. **Sources**
8. **Related posts**
9. **Email capture**

---

## 3. Component inventory

Components live in `packages/ui`. Anything prefixed `Pfl` is plasticfreelab-specific; unprefixed is shared.

Core:
- `Layout` — shell (Header + Footer + children)
- `Header`, `MobileNav`, `NavDropdown`
- `Footer`
- `Breadcrumbs` + `BreadcrumbsJsonLd`
- `ReviewStamp` — byline + date + reading time
- `TableOfContents` (sticky desktop, drawer mobile)
- `Callout` — variants: `note`, `key-takeaway`, `warning`, `source`
- `PullQuote`
- `CitationLink` + `SourcesList`
- `AuthorBio`
- `RelatedPosts`
- `AffiliateDisclosure` (one-liner + expanded modal)
- `AffiliateLink` — wraps links with `rel="sponsored nofollow noopener"` + fires the affiliate_clicks analytics event
- `CookieBanner`

Cards:
- `PostCard` (compact + feature variants)
- `HubCard`
- `PflProductCard` — product with photo, specs, pros/cons, affiliate CTA
- `PflSpecsTable`
- `PflMethodologyCard`

Forms:
- `EmailCapture` (inline + slide-up + full-page variants) — Beehiiv API wired
- `NewsletterForm`

Schema:
- `ArticleJsonLd`
- `FaqJsonLd`
- `ItemListJsonLd` (for comparison rankings)
- `BreadcrumbListJsonLd`
- `OrganizationJsonLd`

Content primitives (MDX):
- Standard markdown rendering + custom components: `<Callout>`, `<ProductCard>`, `<SpecsTable>`, `<FAQ>`, `<PinThis>`, `<Sources>`

---

## 4. SEO technical spec

### Meta tag patterns

| Page | Title pattern | Description pattern |
|---|---|---|
| Home | `PlasticFreeLab — We test the non-toxic swaps so you don't have to.` | `Calm, cited, investigative guides to reducing plastic, PFAS, and endocrine disruptors in your home. Tested recommendations, quarterly updates.` |
| Hub | `{Hub name} — PlasticFreeLab` | First paragraph of hub hero, trimmed to 155 chars |
| Pillar | `{H1 exact} — PlasticFreeLab` | First 155 chars of the intro paragraph |
| Comparison | `{H1 exact} (Tested {year}) — PlasticFreeLab` | "We tested {N} {category}. Here's the editor's pick, the budget option, and the ones we'd skip — with sources." (155 chars) |
| Cluster | `{H1 exact}` | Direct-answer paragraph trimmed |
| Listicle | `{H1 exact}` | One-sentence summary of the list angle |

### Open Graph + Twitter cards

Every page: `og:title`, `og:description`, `og:image` (1200×630, generated from the hero image or a branded template), `og:type` (article for posts, website for home/hubs), `og:url`, `twitter:card` = `summary_large_image`.

### JSON-LD schema by template

| Template | Schema types |
|---|---|
| Home | `Organization` + `WebSite` + `SearchAction` |
| Hub | `CollectionPage` + `BreadcrumbList` |
| Pillar | `Article` + `BreadcrumbList` + `FAQPage` (if present) |
| Comparison | `Article` + `BreadcrumbList` + `ItemList` (ranked products) + `FAQPage` + `Review` per product |
| Cluster | `Article` + `BreadcrumbList` + `FAQPage` |
| Listicle | `Article` + `BreadcrumbList` + `ItemList` |

Every `Article` includes: `headline`, `description`, `image`, `datePublished`, `dateModified`, `author` (Organization: "The PlasticFreeLab Team"), `publisher` (Organization: PlasticFreeLab + logo URL).

### robots.txt

```
User-agent: *
Allow: /

# AI crawlers — allowed. GEO is a priority channel.
User-agent: GPTBot
Allow: /
User-agent: ClaudeBot
Allow: /
User-agent: PerplexityBot
Allow: /
User-agent: Google-Extended
Allow: /

Sitemap: https://plasticfreelab.com/sitemap.xml
```

### llms.txt (`/llms.txt`)

```
# PlasticFreeLab

> Calm, cited, evidence-led guides to non-toxic living — microplastics, PFAS, endocrine disruptors, and the kitchen, personal care, home, and clothing swaps worth making.

## Guides
- [Non-toxic kitchen](https://plasticfreelab.com/guides/non-toxic-kitchen)
- [Microplastics and EDCs](https://plasticfreelab.com/guides/microplastics-and-edcs)
- [Personal care](https://plasticfreelab.com/guides/non-toxic-personal-care)
- [Home environment](https://plasticfreelab.com/guides/non-toxic-home)
- [Clothing and textiles](https://plasticfreelab.com/guides/non-toxic-clothing-and-textiles)

## Editorial
- [Editorial standards](https://plasticfreelab.com/editorial-standards)
- [About](https://plasticfreelab.com/about)
```

### Sitemap

Single `sitemap.xml` (under 50k URLs, no need to split for years). Generated at build time. Includes home, hub pages, all posts, trust pages. Excludes: `/drafts/*`, `/preview/*`, any `noindex` pages. Submitted to Google Search Console + Bing Webmaster on Day 5 per the implementation plan.

### Internal linking rules

- Every cluster post links **up** to its hub pillar (in-body, natural anchor)
- Every pillar links **down** to at least 6 cluster posts in the same hub (in-body, not a sidebar widget)
- Every comparison page links to 2-3 supporting cluster posts (the "why it matters" ones)
- Every post has a "Related posts" block with 3 siblings (same hub preferred)
- No cross-network links. Ever.
- Anchor text rules: natural variation, no exact-match stuffing. At least 3 different anchors for the same target URL across the site.

### Core Web Vitals targets (enforced on deploy)

- LCP < 2.5s (p75)
- INP < 200ms (p75)
- CLS < 0.1 (p75)

Enforcement: Vercel Analytics + PageSpeed Insights checked weekly. Budgets in `next.config.js` for images (hero < 150KB after optimization, inline < 80KB).

---

## 5. Trust pages — ready-to-publish copy

Drop these into `content/plasticfreelab/posts/_pages/` as MDX with `page: true` frontmatter. Build a minimal page layout for them (no TOC, no related posts, just clean reading layout).

### 5.1 About (`/about`)

```markdown
---
title: About PlasticFreeLab
description: Who we are, what we do, and why we built this.
layout: page
---

# About PlasticFreeLab

PlasticFreeLab exists because the information about non-toxic living is a mess.

Some of it is real — peer-reviewed science on microplastics, PFAS, and endocrine disruptors, moving faster than most people realize. Some of it is garbage — wellness influencers with a supplement line to sell, scaring their audience about something that isn't actually a problem. A lot of it is somewhere in between, from well-meaning writers who didn't have time to read the studies.

We built PlasticFreeLab to be the calm, cited, investigative resource we kept wishing existed. We read the studies. We test the products. We tell you the three things that actually matter and the seven things you can stop worrying about.

## What we do

- **We test.** When we recommend a product, we either bought it ourselves, tested it in our own homes, or we tell you explicitly that we evaluated it from research. We don't blur the line.
- **We cite.** Every health claim has a source you can check — a peer-reviewed paper, a regulatory document, a manufacturer disclosure. No "studies show." No "experts say."
- **We update.** Product formulations change. Studies get retracted. New evidence arrives. We review every comparison page quarterly and update the ranking when the evidence moves.
- **We rank.** When we compare products, we commit to a #1 pick. "Here are some options to consider" is not useful. We tell you what to buy, why, and what to skip.

## What we don't do

- We don't take money for placement. Affiliate commissions never affect our rankings.
- We don't write scary headlines. A real risk described in a calm voice lands harder than the loudest panic post.
- We don't tell you everything is toxic. Most things are fine. A small number of things are worth replacing. We help you know which is which.

## How to get in touch

Found a mistake? We want to know. Have a product we should test? Tell us. Write to us at hello@plasticfreelab.com.

The PlasticFreeLab Team
```

### 5.2 Editorial Standards (`/editorial-standards`)

```markdown
---
title: Editorial Standards
description: Our public-facing editorial policies — sourcing, corrections, affiliate disclosure, AI tooling.
layout: page
---

# Editorial Standards

Every site promises to be trustworthy. Here's what that actually means on PlasticFreeLab.

## Sourcing

Every factual health claim on this site is cited to at least one of the following:

- A peer-reviewed paper (PubMed-indexed or equivalent)
- A regulatory document (FDA, EPA, EU REACH, CDC, NIH)
- A manufacturer's official disclosure (ingredient list, safety data sheet)
- A well-established database (EWG, ToxNet, Open Food Facts)

For any significant health claim, we require **two** independent sources — one peer-reviewed study and one regulatory or industry reference. When the science is genuinely mixed, we say so in the text. We don't pretend to have certainty we don't have.

## Testing vs. researching

When we recommend a product:

- **"We tested this"** — we physically bought or received the product and used it for long enough to form a real opinion. We disclose the length of test and what we evaluated.
- **"We evaluated this from research"** — we didn't physically test it, but we read the manufacturer documentation, third-party lab results, and user reports carefully. We label this clearly.

We never blur the line.

## Rankings

Every comparison page on this site commits to a #1 pick. When we update a page — quarterly, at minimum — and our pick changes, we note the change at the top of the post and keep an archive of the previous ranking.

## Corrections

If we're wrong, we want to know.

When we fix a factual error, we:
1. Correct the text
2. Add a dated correction note at the bottom of the post
3. Don't silently edit — the history stays visible

Email corrections to: hello@plasticfreelab.com. We respond within 5 business days.

## Affiliate relationships

PlasticFreeLab earns a commission on some (not all) of the products we link to. When we do, we disclose it clearly on the page, above the product list, in plain English.

**Affiliate commissions never influence our rankings.** We've turned down placements that paid better to keep a lower-paying product as the #1 pick because it was genuinely better. Trust is the only thing on this site that compounds. We don't trade it.

## AI and our editorial process

We use AI tools — including large language models — in parts of our editorial workflow: research synthesis, draft generation, grammar checks, and formatting. Every post on this site is reviewed, fact-checked, and edited by a human before publication. No post is published that hasn't been through that human review.

When AI tooling is used in a way that materially shapes a post's conclusions, we say so explicitly.

## What we don't do

- We don't accept payment for editorial placement
- We don't publish content written by brands
- We don't pretend research we didn't do
- We don't write fake reviews, fake urgency, or fake scarcity
- We don't link between our sites — each site stands on its own editorial merit

## Reviewing our work

Our methodology, sources, and tooling are visible on every post. If you spot something that looks wrong, tell us. That feedback is how the site gets better.

Last updated: April 2026.
```

### 5.3 Privacy Policy (`/privacy`)

```markdown
---
title: Privacy Policy
description: What we collect, how we use it, and your rights.
layout: page
---

# Privacy Policy

Last updated: April 20, 2026.

This Privacy Policy describes how PlasticFreeLab ("we," "us," or "our") collects, uses, and shares information when you visit plasticfreelab.com.

## 1. Information we collect

**Information you provide:** When you subscribe to our newsletter, we collect your email address and any preferences you share.

**Information collected automatically:** Like most websites, we collect standard web analytics: pages visited, referring URL, approximate location (country, region), device type, browser, and anonymized session identifiers. We do not collect your name, precise location, or any data that directly identifies you.

**Cookies:** We use a small number of cookies — one for session continuity, one for analytics, and (where applicable) one to remember your cookie consent choice. We do not use third-party advertising cookies.

## 2. How we use it

- To deliver the site and the newsletter
- To understand which content is useful and which isn't
- To improve the product
- To comply with legal obligations

We do not sell, rent, or trade your personal information.

## 3. Third parties

We use the following third-party services:

- **Vercel** — hosting and delivery
- **Neon** — analytics database (anonymized traffic data only)
- **Beehiiv** — newsletter delivery
- **Supabase** — asset storage (images, PDFs)
- **Google Search Console** / **Bing Webmaster Tools** — SEO performance data (no personal information collected via these)

Each of these operates under its own privacy policy.

## 4. Affiliate links

Some product links on this site are affiliate links. When you click one and make a purchase, the retailer may share information with us about the transaction (product, date, commission). We do not receive your name, address, or payment information.

See our [Affiliate Disclosure](/affiliate-disclosure) for more detail.

## 5. Your rights

Depending on your location, you may have rights under the GDPR (EU/UK), CCPA (California), or other privacy laws. These may include:

- The right to access information we hold about you
- The right to correct or delete that information
- The right to object to or restrict processing
- The right to data portability
- The right to withdraw consent at any time

To exercise any of these rights, email us at privacy@plasticfreelab.com. We respond within 30 days.

## 6. Children

PlasticFreeLab is not directed at children under 13. We do not knowingly collect information from children under 13. If we learn we have collected such information, we will delete it.

## 7. Data retention

We retain newsletter subscriber data until you unsubscribe. We retain anonymized analytics data indefinitely. We retain correspondence (such as corrections or feedback) for up to 3 years.

## 8. Security

We protect your information with standard industry safeguards, including encryption in transit (HTTPS) and access controls on our databases. No system is perfectly secure — if a breach occurs, we will notify affected users consistent with applicable law.

## 9. Changes

We may update this Privacy Policy. Material changes will be highlighted on this page with a new "Last updated" date.

## 10. Contact

Questions? Email privacy@plasticfreelab.com.
```

### 5.4 Terms of Service (`/terms`)

```markdown
---
title: Terms of Service
description: The terms that govern your use of PlasticFreeLab.
layout: page
---

# Terms of Service

Last updated: April 20, 2026.

By accessing plasticfreelab.com ("the Site"), you agree to these Terms. If you don't agree, don't use the Site.

## 1. The Site is informational

PlasticFreeLab publishes editorial content about non-toxic living, consumer product safety, and related topics. **Nothing on this Site is medical advice, legal advice, or professional advice of any kind.** We describe what studies, regulatory bodies, and manufacturers have published. We do not diagnose, treat, cure, or prevent any disease or condition.

Always consult a qualified professional — a physician, pediatrician, environmental health specialist — before making decisions based on content you read here, especially regarding pregnancy, infants, medical conditions, or regulatory compliance.

## 2. Accuracy

We work hard to be accurate. We cite every claim. We update quarterly. But we are not infallible, regulatory frameworks change, products are reformulated, and new evidence arrives. Content on the Site is provided "as is" without warranties of any kind.

## 3. Affiliate links

Some links on the Site are affiliate links. We may earn a commission when you buy through them. Our use of affiliate links never affects our recommendations. See our [Affiliate Disclosure](/affiliate-disclosure) for detail.

## 4. Intellectual property

All content on the Site — text, images, logos, design — is owned by PlasticFreeLab or licensed to us. You may share excerpts with attribution. You may not republish articles in full, train AI models on our content at scale, or use our name or brand in a way that implies endorsement.

## 5. User submissions

If you send us an email, product tip, or correction, you grant us a non-exclusive right to use that feedback to improve the Site. We won't publish your name or identifying details without permission.

## 6. Third-party sites

We link to third-party sites (studies, regulatory documents, retailers). We don't control those sites and aren't responsible for their content, practices, or changes.

## 7. Limitation of liability

To the maximum extent permitted by law, PlasticFreeLab is not liable for any indirect, incidental, consequential, or punitive damages arising from your use of the Site. Our total liability for any claim related to the Site is limited to $100.

## 8. Changes to these Terms

We may update these Terms. Material changes will be highlighted on this page with a new "Last updated" date. Continued use of the Site after a change constitutes acceptance.

## 9. Governing law

These Terms are governed by the laws of the State of Delaware, United States. Disputes will be resolved in the state or federal courts of Delaware.

## 10. Contact

Questions about these Terms? Email hello@plasticfreelab.com.
```

### 5.5 Affiliate Disclosure (`/affiliate-disclosure`)

```markdown
---
title: Affiliate Disclosure
description: How affiliate links work on PlasticFreeLab and what that means for you.
layout: page
---

# Affiliate Disclosure

PlasticFreeLab participates in affiliate programs. That means that some (not all) of the product links on this site are tracked, and we earn a small commission when you buy through them, at no additional cost to you.

## How we use affiliate links

- We link to products we recommend on their merits, not their commission rate
- We disclose on every page that includes affiliate links, clearly and above the product list
- We never accept payment for placement
- We never raise a product's ranking because its affiliate program pays better
- We test our #1 picks against alternatives we don't earn commission from

When we have a choice between two genuinely-tied products, and one has an affiliate program and one doesn't, we go with the one that's actually better — and we'll tell you about the one without the link in the post.

## Programs we participate in

- Amazon Associates
- ShareASale
- Impact
- Awin
- Direct affiliate programs with selected manufacturers (disclosed per post when relevant)

We may add or remove programs over time.

## Why we're OK with this

Advertising is the traditional way independent publishers make a living. Banner ads, sponsored posts, and paid brand partnerships are worse for readers than affiliate commissions because they put advertiser demands in front of reader trust. Affiliate links align our interests with yours: we only earn when we recommend something you actually buy and (presumably) find useful.

If you have any concerns about this model, email us at hello@plasticfreelab.com.

Last updated: April 2026.
```

### 5.6 Contact (`/contact`)

```markdown
---
title: Contact PlasticFreeLab
description: How to reach us.
layout: page
---

# Contact

## General

**hello@plasticfreelab.com** — feedback, questions, product tips, everything else.

## Corrections

**corrections@plasticfreelab.com** — spotted something wrong? We want to know. We respond within 5 business days and publish corrections publicly when warranted.

## Privacy

**privacy@plasticfreelab.com** — questions about data, deletion requests, anything GDPR or CCPA-related.

## What we're not

We're not a clinic. We can't diagnose anything. We can't recommend a specific product for your specific medical condition. If you have a health concern, please talk to your physician.

## Response times

We're a small team. We read everything. We respond to most emails within 3-5 business days.
```

---

## 6. Homepage copy (ready to paste)

### Hero

**H1:** We test the non-toxic swaps so you don't have to.

**Subhead:** Calm, cited guides to microplastics, PFAS, and the household swaps actually worth making — and the ones you can skip.

**Primary CTA:** Start with the kitchen →
**Secondary CTA:** Get the Kitchen Swap Audit

### Featured comparison block

**Label:** The one we're pushing this month
**Title:** Best Non-Toxic Cookware Sets of 2026, Tested and Ranked
**Eyebrow:** Editor's pick
**Three bullets:** (pulled from the post — methodology summary, who the pick is for, what to skip)
**CTA:** Read the full comparison →

### Hub grid (5 cards)

1. **Microplastics & EDCs** — The science, in plain English. What's actually known, what's still debated, and what to do about it.
2. **Non-Toxic Kitchen** — The highest-impact swaps in your home, ranked by how much they matter. Cookware, water, storage, the works.
3. **Personal Care** — Shampoo to sunscreen, the calm truth about what's in your bathroom and what's worth replacing.
4. **Home Environment** — Mattresses, cleaning products, air quality, and the quiet exposures you never think about.
5. **Clothing & Textiles** — Microplastics, PFAS in clothes, and the textile supply chain — with the brands worth buying.

### Email capture block

**Headline:** Get the Kitchen Swap Audit.
**Subhead:** A printable checklist of 50+ kitchen items, each ranked swap now / swap eventually / don't bother. Free. Delivered instantly.
**Field:** Email address
**Button:** Send me the audit
**Consent line:** By subscribing, you agree to our [Privacy Policy](/privacy). One calm email a week. Unsubscribe anytime.

### Trust strip

- **Every claim cited.** If it's not sourced, it's not published.
- **Updated quarterly.** Product formulations change; our rankings change with them.
- **No paid placements.** Commissions don't buy rankings. They never will.

---

## 7. Lead magnet spec — "The Kitchen Swap Audit"

12-page PDF, 1200×1553 (A4 portrait, printable). Design brief:

- Cover: brand logo, title ("The PlasticFreeLab Kitchen Swap Audit"), subtitle ("50+ items, ranked by priority"), hero illustration (a clean linework drawing of kitchen objects — cast iron, glass jar, wood board, brass faucet)
- Page 2: Intro (100 words) — what this audit is, how to use it, the three-tier system
- Pages 3-10: The audit. Organized by category (cookware, storage, water, small appliances, utensils, textiles, cleaning, disposables). Each item gets:
  - Item name (H3)
  - Priority tier tag (Swap now / Swap eventually / Don't bother)
  - Why (1 sentence)
  - What to use instead (1 sentence)
- Page 11: "What to do first" — a starter list for readers on a tight budget
- Page 12: About PlasticFreeLab + CTA to the website + the Kitchen hub

Produced by Claude Code via the `pdf` + `docx` skills. Uses brand colors and typography. Stored in Supabase CDN under `plasticfreelab/lead-magnets/kitchen-swap-audit-v1.pdf`.

### Welcome email sequence (3 emails over 7 days)

**Email 1 — instant, on signup:**
- Subject: Your Kitchen Swap Audit is here
- Body (80-120 words): "Thanks for subscribing. The audit is attached. It's organized by priority — start with the 'swap now' items, then work through the rest at your own pace. A few notes before you dive in..." + calm voice, no upsell, link to the Kitchen hub.

**Email 2 — Day 3:**
- Subject: The three kitchen swaps we'd do first
- Body (150 words): The three highest-impact kitchen swaps (non-stick cookware, plastic storage, water filter) with one-sentence rationale each and links to the relevant posts.

**Email 3 — Day 7:**
- Subject: What's actually in your water?
- Body (150 words): Teaser for the water filter comparison post + link. "This is the second-most-important swap after cookware. Here's the 15-minute version."

From Day 8 onward: one email per week, the Sunday digest — one question answered, calmly.

---

## 8. Launch checklist

Must be true before indexing is requested:

- [ ] Domain resolves to Vercel, SSL active
- [ ] `www.` → apex redirect configured
- [ ] `http` → `https` redirect configured
- [ ] All trust pages live (About, Editorial Standards, Privacy, Terms, Affiliate Disclosure, Contact)
- [ ] Home page live with real hero + featured comparison
- [ ] At least 1 hub page live (Non-Toxic Kitchen — the priority hub)
- [ ] At least 10 posts live
- [ ] Breadcrumb JSON-LD on every post page
- [ ] Article JSON-LD on every post page
- [ ] FAQ JSON-LD where applicable
- [ ] ItemList JSON-LD on comparison pages
- [ ] `robots.txt` live and permissive to major + AI crawlers
- [ ] `sitemap.xml` live, auto-generated, includes all published posts
- [ ] `llms.txt` live
- [ ] Cookie banner functional (GDPR/CCPA)
- [ ] Email capture wired to Beehiiv, lead magnet delivery tested end-to-end
- [ ] Analytics wired (pageviews landing in Neon)
- [ ] Logo + favicon registered in Supabase CDN
- [ ] OG images render correctly (tested in Twitter card validator + LinkedIn post inspector)
- [ ] Core Web Vitals green on 5 sample URLs (home, hub, pillar, comparison, cluster)
- [ ] Google Search Console verified
- [ ] Bing Webmaster verified
- [ ] Sitemap submitted to both
- [ ] Manual indexing requested for the 5 highest-priority posts per site

Once every box is checked, the site is "launched." Before that, leave `noindex` on every page and treat it as staging.

---

## 9. Content at launch (minimum viable)

The 10 posts from the Wave 1 priority list that ship with launch — the rest follow in Weeks 5-8. In priority order:

1. Pillar — The complete non-toxic kitchen guide *(topical map #31)*
2. Pillar — The complete guide to microplastics and EDCs *(topical map #1)*
3. Comparison — Best non-toxic cookware sets of 2026 *(topical map #32)*
4. Comparison — Best water filters *(topical map #33)*
5. Comparison — Best microplastic-free underwear brands *(topical map #122)*
6. Cluster — The truth about Teflon and PFAS *(topical map #36)*
7. Cluster — Cast iron vs ceramic vs stainless steel *(topical map #35)*
8. Cluster — Brita vs Berkey vs AquaTru *(topical map #50)*
9. Cluster — What are microplastics? *(topical map #5)*
10. Listicle — 12 things to throw out of your kitchen this weekend *(topical map #53)*

This set establishes topical authority in the Kitchen hub (most commercial) + the Microplastics hub (the educational anchor) at launch. The other three hubs fill in over Weeks 5-8.

---

## 10. What's still deferred (don't block Vercel on these)

These exist but aren't required for the first deploy:

- **Logo.** Claude Code generates via the `pencil` skill per implementation-plan Day 9. Placeholder wordmark acceptable on day 1.
- **Photography beyond hero.** Stock-free illustrations acceptable for sections where commissioned photography hasn't been produced yet.
- **Pinterest pin templates.** Start pinning Week 4 per implementation-plan Day 18.
- **Mediavine / display ads.** Not until 50k sessions/month per brand book §11. Do not insert ad slots pre-launch.
- **Second language (EN-DE).** Explicitly deferred per earlier decision (US English only).

---

## 11. Handoff to Claude Code

Once this doc is saved to `docs/plasticfreelab-site-spec.md` in the monorepo, the Claude Code prompt to kick off the site build is:

> Read `CLAUDE.md`, `content/plasticfreelab/brand-book.md`, `docs/topical-maps/plasticfreelab.md`, and `docs/plasticfreelab-site-spec.md`. Scaffold `apps/plasticfreelab` per the site spec: build the 6 page templates (Home, Hub, Pillar, Comparison, Cluster, Listicle) as React Server Components consuming the brand tokens from `packages/ui/themes/plasticfreelab.ts`. Implement the full component inventory from section 3. Build `/robots.txt`, `/llms.txt`, and `/sitemap.xml` per section 4. Implement all 6 trust pages from section 5 using the copy verbatim. Implement the homepage from section 6. Do not implement the lead magnet PDF or the welcome email sequence yet — those come in implementation-plan Day 19. Do not populate post content yet — stub the 10 launch posts with the titles from section 9 and "TODO: draft" bodies. Verify all Core Web Vitals targets from section 4 on a local production build before declaring complete. Commit as `feat(plasticfreelab): site scaffold per spec`.

That prompt, plus the existing foundation pack, gives Claude Code everything it needs to build the site end-to-end.
