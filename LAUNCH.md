# Launch Runbook — 7-Site Health Network

What you (the human) need to do to flip each site from `*.vercel.app` to fully live, indexed, and tracked. Everything code-side is already done.

---

## Prerequisites you need in hand

1. **Domain ownership** of the seven `.com` domains — confirm with `whois plasticfreelab.com` etc.
2. **Registrar access** (GoDaddy / Namecheap / Cloudflare / Porkbun — wherever you bought them) to edit DNS.
3. **Google account** for Search Console.
4. **Microsoft account** for Bing Webmaster Tools (optional but recommended).
5. **Vercel CLI token** — already stored in session as `VERCEL_TOKEN`.
6. **Supabase account + project** (when you want to unblock Nano Banana hero images).

---

## Per-site launch sequence

Do each site end-to-end before moving to the next, so you can catch any weirdness early. Order doesn't matter — but I'd do plasticfreelab first since it's the most polished.

### Step 1 — Connect custom domain to Vercel

**STATUS (2026-04-24): All 14 domains already added to their Vercel projects via API.** You don't need to `vercel domains add` again. See `Step 1b` for the DNS change still needed.

The domains added, all verified=true at Vercel:

| Site | Apex + www | Project |
|---|---|---|
| plasticfreelab | plasticfreelab.com + www | `prj_WZqmwpwzi83MTotFjoy6ztWUvO0G` |
| peptips | peptips.com + www | `prj_4YbdsL4qYedZe5MtVyeAlkfq5RKY` |
| circadianstack | circadianstack.com + www | `prj_RQ6iwMRHif9Uw0OPahdOeXUvpKjF` |
| injectcompass | injectcompass.com + www | `prj_DzhouyAK10A63IEqHECqULdRvhax` |
| larderlab | larderlab.com + www | `prj_5LLbzpeGwrhGEc4ixJntysPE9F7f` |
| pepvise | pepvise.com + www | `prj_VvSJPRqDdNuNCAkBMCitLkefmBRX` |
| thatcleanchef | thatcleanchef.com + www | `prj_2cRQMPyo7yJuOhbFziT0bANJUNB7` |

### Step 1b — DNS: change the 7 domains at GoDaddy from parked → Vercel

Confirmed state:
- All 7 domains are registered at **GoDaddy** (nameservers = `ns*.domaincontrol.com`)
- All currently parked on AWS (`3.33.130.190`, `15.197.148.33` — GoDaddy's default parking)
- All need to point to Vercel's edge: `76.76.21.21` (apex) + `cname.vercel-dns.com` (www)

**GoDaddy clickpath (same for all 7 domains):**

1. Log in to https://dcc.godaddy.com/ → My Products → Domains → click the domain
2. Go to DNS → Manage Zones (or the "DNS Records" tab)
3. **Delete the two existing A records** pointing to `3.33.130.190` and `15.197.148.33` (parking)
4. **Add one new A record:**
   - Type: `A`
   - Name: `@`
   - Value: `76.76.21.21`
   - TTL: 600 seconds (or lowest available)
5. **Update the `www` CNAME:**
   - Type: `CNAME`
   - Name: `www`
   - Value: `cname.vercel-dns.com`
   - TTL: 600 seconds
6. Save. Propagation is 5–60 min.

Do this for each of the 7 domains. Confirm with:

```bash
dig +short plasticfreelab.com A
# expect: 76.76.21.21

dig +short www.plasticfreelab.com CNAME
# expect: cname.vercel-dns.com.
```

Once DNS is correct, Vercel auto-provisions the Let's Encrypt cert (2–15 min) and the domain goes live.

**Alternative (faster, one-time):** Change the nameservers to Vercel's (`ns1.vercel-dns.com`, `ns2.vercel-dns.com`) via GoDaddy → Domain → Nameservers → "Use custom nameservers." Then Vercel manages DNS entirely and the above A/CNAME work happens automatically. Downside: you lose any non-Vercel DNS records (MX for email, etc.). Only use this path if you don't have email or other services on these domains yet.

**Fastest for you if you want me to do it:** give me a GoDaddy API key + secret (https://developer.godaddy.com/keys) and I'll batch-update all 7 domains' DNS in one call. Otherwise the clickpath above takes ~5 min per domain × 7 = ~35 min manual.

### Step 2 — Verify HTTPS + Vercel confirms domain

```bash
curl -I https://plasticfreelab.com
# Should return 200 OK with valid SSL cert (Vercel auto-provisions via Let's Encrypt)
```

### Step 3 — Update `SITE.url` in each repo

Each site's `lib/content/site.ts` should have `url` pointing to the new custom domain (not `*.vercel.app`). Confirm this is the case — if not, edit, commit, push. Canonical URLs in metadata + sitemap + schema depend on this.

### Step 4 — Search Console

1. Go to https://search.google.com/search-console/
2. Add property → "Domain" → enter `plasticfreelab.com`
3. Google gives you a TXT record to add to DNS → add it at your registrar
4. Wait 5–10 min, click Verify
5. Once verified, submit sitemap: `https://plasticfreelab.com/sitemap.xml`
6. Request indexing on these first 3 URLs (high-priority):
   - `https://plasticfreelab.com/` (home)
   - `https://plasticfreelab.com/best-non-toxic-cookware` (top comparison)
   - `https://plasticfreelab.com/guides/non-toxic-kitchen` (top hub)

Repeat per site with the site-specific top-3 URLs:
- **peptips**: `/`, `/ozempic-week-by-week`, `/guides/glp1-101`
- **circadianstack**: `/`, `/morning-sunlight-protocol`, `/guides/light-and-zeitgebers`
- **injectcompass**: `/`, `/how-to-use-ozempic-pen`, `/guides/injection-technique`
- **larderlab**: `/`, `/best-protein-powders`, `/guides/macros-protein`
- **pepvise**: `/`, `/bpc-157`, `/guides/compound-profiles`
- **thatcleanchef**: `/`, `/anti-inflammatory-golden-chicken-soup`, `/guides/diet-specific`

### Step 5 — Bing Webmaster Tools (optional but recommended, 10 min per site)

1. https://www.bing.com/webmasters/
2. Add site → enter `https://plasticfreelab.com`
3. Import from Google Search Console if you already did step 4 (one-click)
4. Submit sitemap

### Step 6 — Re-run the SEOGets tools

Once a domain is verified in GSC, ask Claude:

> "List my GSC sites again and pull `get_indexing_overview` for each health-network site"

Claude can then report indexation progress, at-risk pages, coverage state, and pull performance data.

---

## Post-launch content follow-ups (weeks 1–8)

Claude can help with all of these on request — each is a focused agent job:

- **Week 1–2**: Monitor GSC Coverage daily, fix any "Discovered — not indexed" pages by improving internal linking.
- **Week 2–3**: Write Wave 2 of posts per site (Wave 1 = 12 posts live; Wave 2 target = +28 to reach 40 posts per site). Topical maps in each site's `docs/topical-map.md` list Wave 2 priorities.
- **Week 4**: First refresh cycle on Wave 1 posts — flag anything ranking 11–20 for refresh.
- **Week 6**: Add real hero photography for thatcleanchef (needs Supabase or a waiver on the no-binary-commits rule).
- **Week 8**: Performance optimization — image placeholders, font subsetting, Lighthouse pass per site.

---

## Troubleshooting — common issues

| Symptom | Cause | Fix |
|---|---|---|
| `curl https://plasticfreelab.com` returns 404 Vercel | Domain added but no project attached | `vercel link` from the plasticfreelab-standalone directory, link to correct project |
| SSL cert pending | First-time Let's Encrypt provisioning | Wait 5–15 min. If still pending after 60 min, check DNS propagation with `dig plasticfreelab.com` |
| Search Console "Couldn't fetch" sitemap | robots.txt still blocking | Confirm `SITE.launched: true` is deployed — verify with `curl https://plasticfreelab.com/robots.txt` — should say `Allow: /` |
| Wrong canonical URLs in metadata | `SITE.url` still points to vercel.app | Edit `lib/content/site.ts`, commit, push — auto-redeploys |

---

## What's ALREADY done (no action needed)

- [x] All 7 sites deployed with unique editorial design systems
- [x] `SITE.launched: true` → robots.txt now permissive on all 7
- [x] `app/not-found.tsx`, `app/error.tsx`, `app/icon.tsx`, `app/apple-icon.tsx`, `app/opengraph-image.tsx`, `app/twitter-image.tsx` live on all 7
- [x] JSON-LD schema: Article, FAQPage, BreadcrumbList, Organization, ItemList (comparisons), Recipe (thatcleanchef)
- [x] Zero cross-network linking (operator footprint clean)
- [x] Zero peptide vendor URLs on injectcompass + pepvise (legal rail)
- [x] All `[VERIFY]` content flags resolved
- [x] Medical disclaimers on peptips / injectcompass / pepvise
- [x] Sitemaps live at `/sitemap.xml`, 23 URLs each
- [x] llms.txt live at `/llms.txt`
- [x] Stable Vercel aliases set: `{site}-ecom-seo.vercel.app`
- [x] Vercel SSO / Deployment Protection disabled

---

## Contact cheat sheet

- Vercel dashboard: https://vercel.com/ecom-seo
- GitHub org: https://github.com/EcomSEO
- Token location: session env `$VERCEL_TOKEN` + `$KIE_AI_API_KEY` (DataForSEO creds also stored)

---

## When in doubt

Paste this document into a fresh Claude session, tell it which site you're launching, and say "Walk me through Step N." Claude will read this file and execute the exact commands.
