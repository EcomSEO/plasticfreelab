# PlasticFreeLab — Launch Blockers (2026-04-29)

What stands between plasticfreelab today and "leave it alone for 3 months and just upload content."

Status as of `main` post 2026-04-29 audit-fix sweep + monetization scaffolding + EU compliance gap-fill.

---

## TL;DR — Fabian-side decisions only

The 2026-04-29 audit-fix sweep is complete on the feature branch.
Hreflang restored to EN-only flat-root per recommendation (a),
empty sister-site footer kept clean, fonts already self-hosted via
`next/font`, affiliate registry + `<AffiliateLabel>` +
`<RegulatoryAuthoritiesStrip>` + `forbidden-claims` shipped,
methodology versioning helper in place. Editorial board uses initials
avatars (`<Monogram>`) — no AI portraits, no cross-site reuse.

| # | Blocker | Owner | Time | Status |
|---|---|---|---|---|
| 1 | Operator placeholders in impressum / terms / privacy | Fabian + lawyer | 30 min + lawyer | ❌ pending |
| 2 | Vercel env: `BEEHIIV_API_KEY` | Fabian | 5 min | ❌ pending |
| 3 | Vercel env: real Amazon Associates tag (current placeholder: `plasticfreelab-20`) | Fabian | 5 min | ❌ pending |
| 4 | Editorial board roster — flip the four chairs from role-only to named real people, distinct from any other network site's pool | Fabian | 1–2 hr | ❌ pending |
| 5 | Custom domain DNS to plasticfreelab.com | Fabian | 30 min | ❌ pending |
| 6 | Real photography pass — kie.ai batch (hero + 5 categories + author/reviewer headshots), or commissioned photography | Fabian | external | ⏸ deferred |

After those six, plasticfreelab is in pure content-upload mode.

## 2026-04-29 audit-fix status (Claude side)

| Audit blocker | Status |
|---|---|
| Hreflang drift (12 declared without backing routing) | ✅ resolved — sitemap + layout `alternates.languages` + OpenGraph trimmed to en + x-default. Other locale routes still resolve so inbound URLs don't break. |
| Sister-site footer | ✅ verified clean — none referenced |
| Editorial board ("Four chairs") | ✅ rendered with role-keyed initials avatars; no Sara Lin / Maya Rao reuse |
| Self-host fonts via `next/font` | ✅ verified — Roboto via `next/font/google` |
| Affiliate registry scaffolded | ✅ `lib/affiliate/registry.ts` — 14 SKUs across cookware (Caraway, Made In, Lodge, Xtrema), water filtration (Berkey, AquaTru, Brita), glass food storage (Pyrex, Weck), personal care (Honest), cleaning (Branch Basics, ECOS), baby (Avent glass). Every entry carries a PFL Calculator score. ZERO MLM brands. |
| AffiliateLabel component (12-locale pill) | ✅ `components/AffiliateLabel.tsx` |
| RegulatoryAuthoritiesStrip | ✅ `components/RegulatoryAuthoritiesStrip.tsx` — 12-locale environment + DPA authority pairs, mounted in Footer |
| forbidden-claims module | ✅ `lib/compliance/forbidden-claims.ts` — EFSA / HWG / ANSM rules + brand-voice rules ("toxic chemicals", "detox your home", "must-have") |
| Methodology versioning helper | ✅ `lib/content/methodology-version.ts` |

## Genuinely deferred (multi-week or env-gated)

- **Phase 1**: Keyword research × EN-UK + EN-US (DataForSEO API run — needs `DATAFORSEO_LOGIN`)
- **Phase 5**: Real photography pass via kie.ai (hero + 5 category images + author/reviewer headshots) — needs `KIE_AI_KEY`
- **Phase 8 content production**: 40-post Wave 1 priority list at 5 posts/week
- **Phase 10**: Production Lighthouse + on-page-instant audit (post-DNS)
- **Phase 11**: Search Console + Bing Webmaster sitemap submission (post-DNS)

The site is structurally launch-ready pending the six Fabian-side decisions.
