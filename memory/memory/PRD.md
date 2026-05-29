# PRD — ATLAS DevOS / EVA-X — FULL REDEPLOY (2026-05-26)

## Source

GitHub: `https://github.com/svetlanaslinko057/5757576YT7` (branch `main`, commit `c0e0ec2`).
Cloned + rsync'ed to `/app` on 2026-05-26.

## Latest milestone — FULL REDEPLOY + AUDIT (2026-05-26)

- Repo cloned (17,188 files) and rsynced to `/app` preserving `.env`, `.git`, `.emergent`, `node_modules`, `.metro-cache`.
- 170 backend deps reinstalled (`pip install -r requirements.txt --no-cache-dir`).
- Frontend deps refreshed (`yarn install`, 39s, lockfile regenerated).
- `EMERGENT_LLM_KEY` + `CORS_ORIGINS` appended to `backend/.env`.
- `memory/test_credentials.md` restored.
- Supervisor restart: backend (732 routes, lifespan ok) + expo (1465+1544 modules, tunnel ready) + mongodb + nginx — all green.
- Smoke (live, 11 checks): `/api/healthz`, all 4 role logins, `/api/web-ui/`, `/api/integrations/manifest`, `/api/contracts/my`, `/api/client/invoices`, `/api/auth/me` — all 200.
- All background loops live: Guardian (120s), Module Motion (15s), Operator (300s), Event (15min), PAY-V2 worker/reaper/advancer/scheduler, Reconciler (1800s), Contract Reminder, Auto-Balancer.
- All integrations in MOCK (Stripe/PayPal/Resend/Cloudinary/Google OAuth/Settlement adapters DORMANT). AI ready via `EMERGENT_LLM_KEY`.
- Welcome screen Expo renders correctly (EVA-X branding "Build real products. Not tasks.").
- Audit report: `audit/AUDIT_2026-05-26_REDEPLOY_E1_RU.md`.

## Architecture summary

- **Backend FastAPI:** 732 routes, 193 .py files, 27.8K LOC server.py + 100+ modules.
- **Mobile Expo:** 100 .tsx screens in 11 role branches.
- **Web CRA admin:** 183 JS/TS files + built bundle at `/api/web-ui/` (530 KB gzip).
- **MongoDB:** 43 collections, 12 users seeded, 3 projects, 99 modules, 6 invoices.
- **Sealed substrates:** Money Phase 2C-B, Web Stabilization Line (P3..P6), Contracts P3..P8, Payouts V2 P0+P1+P2A+P3+P4+P5.

## Deployment status — `/app`

| Service | Status | Port | Notes |
|---|---|---|---|
| backend (FastAPI) | ✅ RUNNING | 8001 | 732 routes, all loops up |
| expo (Metro tunnel) | ✅ RUNNING | 3000 | bundle ok, tunnel connected |
| mongodb | ✅ RUNNING | 27017 | seeded |
| Web admin (CRA build) | ✅ SERVED | `/api/web-ui/` | 530 KB gzip |

## Test credentials

See `/app/memory/test_credentials.md` (admin/john/client/tester @ atlas.dev with admin123/dev123/client123/tester123).

## Integrations status

| Capability | Mode | Flip-to-live env |
|---|---|---|
| payment | mock | `STRIPE_SECRET_KEY` |
| mail | mock | `RESEND_API_KEY` |
| storage | mock | `CLOUDINARY_*` |
| oauth | unavailable | `GOOGLE_CLIENT_ID` |
| ai | **ready** | `EMERGENT_LLM_KEY` ✅ (set) |
| settlement-stripe | DORMANT | `STRIPE_API_KEY` |
| settlement-paypal | DORMANT | `PAYPAL_CLIENT_ID` + `PAYPAL_CLIENT_SECRET` + `PAYPAL_WEBHOOK_ID` |
| sentry | DORMANT | `SENTRY_DSN` |

## Open items (code-side sealed — only env flips remain)

1. Resend live mail
2. Stripe Connect live + webhook URL
3. Cloudinary
4. Sentry DSN
5. Reconciler live-truth (~40 LOC swap when Stripe live)
6. `yarn.lock` not in repo — recommend commit
7. CUDA/torch in requirements.txt (~5GB) — consider CPU-only slim

## What's unblocked

Stabilization line sealed; freeze on new features lifted (per `active_issues.md`):
- AI / automation
- Analytics
- Payout V2 → P2B (PayPal live)
- Billing V2
- Forecasting
- Growth / referral
- Operator systems

## Next action items

1. Awaiting user steer on next feature direction (AI feature pickup, P2B PayPal live, analytics, etc.).
