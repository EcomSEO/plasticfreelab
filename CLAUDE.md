# PlasticFreeLab — Claude Code Guide

Read this file first. It's the source of truth for how plasticfreelab.com is built, how content is made, and what the rules are.

---

## What this repo is

The live Next.js site at **plasticfreelab.com** — a calm, cited, evidence-led non-toxic living resource. Female-skewing audience (see `content/brand-book.md` §2 "Sarah, 34"), Pinterest-native distribution, Wirecutter-grade editorial standards.

## Stack

- **Framework:** Next.js 14 (App Router, RSC)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + brand tokens (sage / cream / forest / terracotta)
- **Fonts:** Fraunces (serif) + Inter (sans)
- **Hosting:** Vercel
- **Analytics:** Neon Postgres (planned, not yet wired — see site spec §8)
- **Assets/CDN:** Supabase Storage (planned)
- **Newsletter:** Beehiiv (planned)

## Repo layout

```
plasticfreelab/
├── app/                        # Next.js App Router
│   ├── layout.tsx              # Root layout w/ Header, Footer, CookieBanner, JsonLd
│   ├── page.tsx                # Home
│   ├── [slug]/page.tsx         # Dynamic post routes (template switched by postType)
│   ├── guides/[hub]/page.tsx   # Hub landing pages
│   ├── about/, privacy/, terms/, editorial-standards/, affiliate-disclosure/, contact/, newsletter/
│   ├── robots.ts               # robots.txt (noindex while SITE.launched=false)
│   ├── sitemap.ts              # sitemap.xml
│   └── llms.txt/route.ts       # llms.txt
├── components/
│   ├── templates/              # PillarTemplate, ComparisonTemplate, ClusterTemplate, ListicleTemplate, TrustPageTemplate
│   ├── schema/                 # JSON-LD components (Article, Breadcrumb, FAQ, ItemList, Organization)
│   ├── Header, Footer, Breadcrumbs, PostCard, HubCard, EmailCapture, CookieBanner, etc.
├── lib/
│   ├── content/
│   │   ├── site.ts             # Site-level constants (SITE.launched flag)
│   │   ├── hubs.ts             # The 5 content hubs
│   │   └── posts.ts            # Post metadata for the 10 launch stubs (will grow)
│   └── seo.ts                  # Metadata helpers (canonical, OG, robots)
├── content/
│   └── brand-book.md           # Voice, audience, visual identity (read before drafting)
└── docs/
    ├── site-spec.md            # IA, templates, trust page copy, SEO spec, launch checklist
    ├── topical-map.md          # All 150 posts across 5 hubs + Wave 1 priority list (40)
    ├── sample-briefs.md        # 5 fully-fleshed example briefs
    ├── affiliate-partners.md   # Brands to review, networks, commission expectations
    └── competitive-analysis.md # SERP analysis + 10 positioning moves
```

---

## Content states (future)

When the editorial pipeline lands:

- `content/briefs/{slug}.md` → brief, ready to draft
- `content/drafts/{slug}.mdx` → drafted, in review
- `content/posts/{slug}.mdx` → published
- `content/refresh-queue/{slug}.md` → flagged for refresh

Git is the editorial system. State = folder location.

---

## Editorial principles (every post)

1. **Truth over trust.** Every claim cited to a primary source.
2. **Intent match the SERP.** Brief generator runs SERP intelligence before drafting.
3. **Humanize.** No em-dash overuse, AI vocabulary, rule-of-three.
4. **Kill banned phrases.** Run the `ai-copy-blacklist` skill.
5. **Cite or cut.** Peer-reviewed / regulatory / manufacturer sources only.
6. **One original sentence per section.** Every H2 has original perspective.
7. **No fake urgency, no fake scarcity, no fake reviews.**
8. **Affiliate disclosure** on every affiliate page — FTC-compliant, above the fold. Enforced via `<AffiliateDisclosure>` on `ComparisonTemplate`.

---

## Voice

Calm, evidence-led, slightly investigative. Not crunchy-mom. See `content/brand-book.md` for the full voice rules, side-by-side do/don't examples, tone calibration per post type.

Forbidden: fearmongering, alarm caps, wellness-influencer-coded prose, conspiratorial framing, mom-blog tone.

---

## The launch flag

`lib/content/site.ts` exports a `SITE.launched` boolean.

- **While `false`:** `robots.ts` returns `Disallow: /`, `layout.tsx` sets `robots: { index: false, follow: false }`. Site is crawlable only by you.
- **Flip to `true`** when every item in `docs/site-spec.md` §8 (Launch checklist) is green — trust pages live, 10 posts live, sitemap in Search Console, analytics wired, etc.

Do not flip early.

---

## Commands

```bash
pnpm install          # first time only
pnpm dev              # http://localhost:3001
pnpm build            # production build
pnpm typecheck        # TS check
pnpm lint             # eslint
```

---

## Daily workflow with Claude Code

1. `cd ~/Developer/active/plasticfreelab-standalone` (or wherever it's cloned)
2. Open Claude Code
3. Common tasks:
   - **Stub → real content:** "Read `content/brand-book.md` and `docs/sample-briefs.md`. Replace the TODO in `lib/content/posts.ts` for `best-non-toxic-cookware` with the drafted body, following the brand voice."
   - **New post:** "Add a new post to `lib/content/posts.ts` with slug X, following the topical map entry Y."
   - **UI work:** "Update `components/templates/ComparisonTemplate.tsx` to add a specs table per product."
   - **Refresh:** "Update the Ozempic-week-by-week post per the latest Search Console data."

---

## What not to do

- Do not flip `SITE.launched` to `true` without completing the launch checklist (`docs/site-spec.md` §8).
- Do not commit binary files (images go to Supabase CDN when that's wired).
- Do not write affiliate copy without applying the `truth-vs-trust` skill first.
- Do not write scary headlines. The brand book is explicit — alarm caps, fearmongering, mommy-blog panic language are all forbidden.
- Do not link out to other sites in the network (this is a standalone site — cross-network linking exposes operator footprint).

---

## Pointers

- Voice + audience: `content/brand-book.md`
- All 150 posts: `docs/topical-map.md`
- Wave 1 priority: last section of `docs/topical-map.md`
- How to build a site page: `docs/site-spec.md`
- Brand-to-review candidates: `docs/affiliate-partners.md`
- Why we'll win the SERP: `docs/competitive-analysis.md`
