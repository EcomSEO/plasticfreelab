# plasticfreelab.com

The Next.js 14 source for **plasticfreelab.com** — calm, cited, evidence-led non-toxic living.

Read [CLAUDE.md](./CLAUDE.md) first.

## Local dev

```bash
# requires Node 20+ and pnpm 9+
pnpm install
pnpm dev              # http://localhost:3001
pnpm build            # verify production build
```

## Deploy

Auto-deployed to Vercel on every push to `main`. The `SITE.launched` flag in `lib/content/site.ts` controls indexing — keep it `false` until the launch checklist in `docs/site-spec.md` §8 is green.

## Structure at a glance

- `app/` — Next.js App Router pages
- `components/` — UI components + page templates + JSON-LD schema
- `lib/content/` — site config, hubs, posts metadata
- `lib/seo.ts` — metadata helpers
- `content/brand-book.md` — voice and audience
- `docs/` — site spec, topical map, briefs, affiliate partners, competitive analysis

## Key docs

- [docs/site-spec.md](./docs/site-spec.md) — information architecture, templates, launch checklist
- [docs/topical-map.md](./docs/topical-map.md) — all 150 posts, 5 hubs, Wave 1 priority list
- [docs/sample-briefs.md](./docs/sample-briefs.md) — 5 anchor briefs for the editorial pipeline
- [docs/affiliate-partners.md](./docs/affiliate-partners.md) — brands to review per category
- [docs/competitive-analysis.md](./docs/competitive-analysis.md) — SERP analysis + positioning moves
