# Phase 7 — Performance baseline (local laboratory)

**Environment:** `next build` + `next start` on `http://127.0.0.1:3012` (loopback allowed by production host guard)  
**Date:** 2026-10-18 (UTC)  
**Lighthouse:** 12.6.1, headless Chrome, default mobile emulation  
**Label:** **Local lab measurements — not Google CrUX field data. Not production `ekklesianexus.com`.**

Production Lighthouse on live URL: **NOT RUN** (deploy pending; Phase 4 host/GSC blockers unchanged).

---

## Commands

```bash
cd EkklesiaNexusWeb
npm run build
PORT=3012 npm run start
npx lighthouse@12.6.1 http://127.0.0.1:3012/ \
  --chrome-flags="--headless --no-sandbox --disable-gpu" \
  --only-categories=performance,accessibility,best-practices,seo \
  --output=json --output-path=./lh-report.json
```

---

## Before remediation (pre–Phase 7 code changes)

| Metric | Value |
|--------|-------|
| Performance score | **86** |
| Accessibility score | **96** |
| LCP | **4.1 s** |
| FCP | **0.9 s** |
| TBT (lab diagnostic) | **80 ms** |
| CLS | **0** |
| INP (field) | **Not measured** |

**Inferred LCP candidates:** Hero brand text (`EkklesiaNexus` wordmark) and/or circular badge image (`ekklesia-circular-badge.png` ~233 KB source before WebP path change).

---

## After remediation (2 runs, post-change)

| Run | Performance | Accessibility | LCP | TBT | CLS |
|-----|-------------|---------------|-----|-----|-----|
| 1 | **95** | **96** | **2.9 s** | **0 ms** | **0** |
| 2 | **92** | **98** | **3.3 s** | **40 ms** | **0** |

Use **median-style** interpretation: LCP improved from **~4.1 s** toward **~3.0–3.3 s** in this environment. Still above **2.5 s** “good” threshold in lab — further gains may need CDN/TTFB/production deploy measurement.

---

## Limitations

- Single machine; no network throttling flags recorded in these runs.
- `npm run start` uses `NODE_ENV=production` middleware; not identical to Vercel/droplet Apache proxy latency.
- INP requires field data or scripted interaction traces — **not assessed** this cycle.
