# PRD — ATLAS DevOS / EVA-X — UK i18n FINAL SWEEP (2026-05-29, repo `7676767`)

## Latest milestone — Ukrainian translation completion sweep for web SPA (2026-05-29, repo `7676767`, **current** session)

### What shipped
- **Dictionary expansion:** `src/i18n/dictionary.js` `1193 → 1332` keys (EN+UK parity, **0 missing**). Added **139** new `cab.*`-prefixed keys covering cabinet pages + components (`AI Price Estimate`, `ASAP`, `Auto Pricing`, `Review Queue`, `Submissions`, `Validators`, `Recommended Price`, `Get the estimate`, `Send request`, badges `BETA / DELAYED / HIGH PRESSURE / ELEVATED / QUIET / FORMING`, `Basic / Managed / Gold / Silver / Platinum`, social links, legal links, etc.).
- **17 files patched** to wire visible English literals through `tByEn()` via Python migration script (`/tmp/patch_i18n.py`, kept for reuse):
  - **Pages (5):** `AdminPressureTopology.js` (band labels + topology copy), `AdminSystemUsers.js` (search placeholder, refresh, empty states, role tooltips), `DescribeFlow.js`, `ProjectBootingPage.js`, `ProviderInbox.js` (tier badges Gold/Silver/Platinum).
  - **Components (12):** `AdminReviewQueue.js`, `AssignmentPanel.js`, `AutoPricingPanel.js`, `FooterExtras.js` (legal + socials), `ForgotPasswordModal.js` (full reset flow), `HonestState.js` (badges + titles via `tByEn(cfg.badge)`), `HvlStatusBlock.js` (HVL panel labels), `LegalDocumentModal.js`, `MobileNav.js`, `NotificationBell.js` (notifications panel), `PortfolioInquiryModal.js` (lead form), `Toast.js`, `TwoFactorSetupModal.js`.
- **Migration script broke 3 import blocks** (multi-line `import { … } from 'lucide-react';`) — fixed manually in `NotificationBell.js`, `AutoPricingPanel.js`, `AdminReviewQueue.js` (moved the inserted `useLang` import above the lucide block).
- **Web bundle rebuilt** via `bash /app/scripts/rebuild-web.sh` — `craco build` succeeded in 57.79s, new `main.108d7d54.js` (820 KB) emitted with both EN and UK strings present (UK escaped as `\uXXXX` per CRA babel). Backend restarted; FastAPI serves new bundle at `/api/web-ui/` → 200.
- **Smoke (post-deploy):** admin login 200, `/api/admin/users` 200, external preview 200. Lint: ✅ no issues across `/app/web/src`.

### Current state — full coverage report

**Web SPA (CRA admin/client/dev surface, served at `/api/web-ui/`):**
- Dictionary: **1332 / 1332 EN↔UK keys** (full parity).
- Pages with `useLang` wired: **98 / 98** (was 93 — added 5 this session).
- Components with `useLang` wired: **23 / 36** (added 13 this session; remaining 13 are utility/chrome only: `Logo`, `RootErrorBoundary`, `RealtimeBridge`, `ToastBridgeMount`, `ThemeToggle`, `ConnectionStatus` already uses `tByEn`, etc.).
- ⚠️ **Translation gaps (Tier-2 polish, non-blocking):** ~300 dictionary entries (mostly legacy `auto2.*` keys 0–332) still have UK values **identical to EN** — they were added in earlier sessions as English placeholders awaiting professional translation. These are public-marketing/long-form copy, not cabinet UX-critical strings.
- ⚠️ **Sub-component literals not yet captured:** Sub-components inside large pages (e.g. inline `<Kicker>` in `AdminPressureTopology`, status pills inside `HvlStatusBlock` numeric formatters) may still render English strings when language is UK, because they read values from JS objects that get assembled at module-init time. These need wrapping at the **render call site** (already done for the largest 4 — `BAND_META.label`, `cfg.badge`, `cfg.label`, `title`).

**Mobile Expo (`/app/frontend`):**
- i18n provider in place (`src/i18n.tsx`).
- Localisation coverage of mobile screens NOT touched this session; remains at prior-session baseline.

**Backend:**
- No backend strings localized (intentional — error messages remain canonical EN).

### Known incomplete areas / next-iteration TODO
1. **~300 `auto2.*` dictionary entries** still EN placeholders in UK block — need professional UA translation pass.
2. **~50 deep cabinet pages** (e.g. `CreateModuleDominance.js` — already has `useLang`, but inline strings need wrapping; `AdminTimeTrackingPage`, `AdminWebhooksPage`, `AdminWorkloadDashboardPage`, `Project*Page` family) — `tByEn` infrastructure ready, only individual JSX literal wraps remain. Same script can be run with extended target list.
3. **Components with `useLang` already imported but still rendering raw English:** ~10 components have `useLang` but contain unwrapped literals (low-priority chrome).
4. **Mobile Expo screens** — needs parallel UA sweep when prioritised.

### Files touched (verification snapshot)
- `web/src/i18n/dictionary.js` (+278 lines: 139 EN entries + 139 UK entries)
- `web/src/pages/AdminPressureTopology.js`, `AdminSystemUsers.js`, `DescribeFlow.js`, `ProjectBootingPage.js`, `ProviderInbox.js`
- `web/src/components/AdminReviewQueue.js`, `AssignmentPanel.js`, `AutoPricingPanel.js`, `FooterExtras.js`, `ForgotPasswordModal.js`, `HonestState.js`, `HvlStatusBlock.js`, `LegalDocumentModal.js`, `MobileNav.js`, `NotificationBell.js`, `PortfolioInquiryModal.js`, `Toast.js`, `TwoFactorSetupModal.js`
- `web/build/static/js/main.108d7d54.js` (rebuilt, 820 KB)
- Migration script: `/tmp/patch_i18n.py` (reusable for next ~50 pages)

---


# PRD — ATLAS DevOS / EVA-X — REDEPLOY + AUDIT (2026-05-29, repo `7676767`)

## Source
GitHub: `https://github.com/svetlanaslinko057/7676767` (branch `main`, HEAD `20efea7` — Auto-generated changes).
Cloned + rsync'ed to `/app` on 2026-05-29 (current E1 session — full redeploy from scratch onto a clean Emergent pod template).

## Latest milestone — Full redeploy & audit (2026-05-29, repo `7676767`, **current** session)

- Cloned `svetlanaslinko057/7676767` (HEAD `20efea7` — Auto-generated changes) to `/tmp/repo` (~159 MB, 5870 files без `.git`/`node_modules`), rsync'ed to `/app` with exclusions (`.git`, `.emergent`, `.env`, `node_modules`, `.metro-cache`, `.expo`, `__pycache__`, `*.pyc`, `yarn.lock`).
- Backend `.env` recreated: `MONGO_URL="mongodb://localhost:27017"`, `DB_NAME="atlas_devos"`, `CORS_ORIGINS="*"`, `EMERGENT_LLM_KEY` (Universal Key `sk-emergent-0046e51E35a8e3f0e7` set this session).
- Frontend `.env` preserved (protected Expo packager vars + `EXPO_PUBLIC_BACKEND_URL=https://app-dev-preview-321.preview.emergentagent.com`).
- Backend deps via `pip install -r requirements.txt` (149 packages — `emergentintegrations 0.1.0`, `python-socketio 5.16.1`, `transformers 5.9.0`, `pandas 3.0.2`, `boto3 1.42.86`, `scikit-learn 1.8.0`, `stripe 15.0.1`, `resend 2.30.0`, `pyotp`, `qrcode`, `reportlab`, `slowapi`, `google-genai 1.71.0`).
- Frontend deps via `yarn install` (lockfile regenerated in 10.58s, Expo SDK ~54.0.35).
- Metro cache cleared (`.metro-cache` + `.expo`) — иначе stale paths.
- Web CRA bundle already present in `/app/web/build/`, served by FastAPI at `/api/web-ui/`, HTTP 200.
- Supervisor: backend (**741 routes**) + expo (tunnel ready, 1564 modules bundled) + mongodb + code-server + nginx — all RUNNING.
- Smoke (live, 13/14 green): `/api/healthz`, `/api/config/public`, 3 role logins (admin/client/tester @ atlas.dev) — все 200 с `set-cookie: session_token=...`, `/api/auth/me`, `/api/admin/users` (12 users), `/api/contracts/my`, `/api/client/invoices` (6 invoices), `/api/portfolio/cases` (5 cases), `/api/admin/onboarding/tour-stats`, `/api/integrations/manifest`, `/api/web-ui/`, `/api/mobile/auth/demo`. External Expo preview (`https://app-dev-preview-321.preview.emergentagent.com/`) → 200, Welcome рендерится. **john@atlas.dev/john123 → 401** (F2 drift в `mock_seed.py`).
- Auth model: **cookie-based** (`session_token` HttpOnly cookie, `Max-Age=604800`). Не Bearer token.
- Background loops all live: PAY-V2 worker (5s, `worker_6327f40e91`) + reaper (30s) + mock advancer (5s) + scheduler (900s) + reconciler (1800s, first run `recon_ca9f11e26d6c` scanned=0), Guardian (120s), Module Motion (15s — реальные транзишены `Dashboard UI / Charts & analytics / Authentication / User management pending→in_progress→review→done` на project `proj_a3e0fb8f28f4`), Operator (300s), Event Engine (15 min), Contract Reminder (6h), Team Balancer (`overloaded=0 moves=0`), Money Bridge initialised (Phase 2B PR-1).
- Seeding (idempotent): 12 users (1 legacy `admin@devos.io` + 5 quick-access @ atlas.dev + 6 seeded devs + 1 demo client), 89 modules, 81 QA decisions, 6 invoices, 5 cases, 5+3+3 notifications (admin/john/client), 5 tester validations + 1 issue, 4 scope templates (с 4 sentence_transformers warnings — F1, fallback работает).
- All integrations в MOCK/DORMANT (Stripe test pk + WayForPay seeded, PayPal/Resend/Cloudinary/Google OAuth/Sentry dormant). AI ready via `EMERGENT_LLM_KEY` ✅.
- Findings (non-blocking): F1 sentence_transformers отсутствует (embeddings fallback to keyword), F2 john@atlas.dev/john123 → 401 (drift в `mock_seed.py`), F3 3 Duplicate Operation ID warnings в `admin_users_layer.py`, F4 rate-limit `/api/auth/login` 10/мин агрессивный для dev, F5 web-only Expo style warnings (`borderColor` с hex+alpha, `shadow*` → `boxShadow`, `pointerEvents` prop deprecated — native не затронут), F6 expo-notifications web token listener noop.
- Audit report: `audit/AUDIT_2026-05-29_REDEPLOY_7676767_E1_RU.md`.
- `memory/test_credentials.md` создан (5 quick-access + 6 seeded developers + 1 legacy + 1 demo).
- Userintent: "Все есть в коде, мы только начинаем данную разработку и делаем веб сайт и моб приложение експо" — base ready, дальше уточнение scope нового web/mobile направления.

---


# PRD — ATLAS DevOS / EVA-X — REDEPLOY + AUDIT (2026-02-FEB, repo `758r78r`)

## Source
GitHub: `https://github.com/svetlanaslinko057/758r78r` (branch `main`, head `92ac978` — Auto-generated changes).
Cloned + rsync'ed to `/app` on 2026-02-FEB (current E1 session — full redeploy from scratch onto a clean Emergent pod template).

## Latest milestone — Full redeploy & audit (2026-02-FEB, repo `758r78r`, **current** session)

- Cloned `svetlanaslinko057/758r78r` (HEAD `92ac978` — Auto-generated changes) to `/tmp/repo_audit` (~404 MB, 17 472 files), rsync'ed to `/app` with exclusions (`.git`, `.emergent`, `.env`, `node_modules`, `.metro-cache`, `.expo`, `__pycache__`, `*.pyc`, `yarn.lock`).
- Backend `.env` recreated: `MONGO_URL="mongodb://localhost:27017"`, `DB_NAME="atlas_devos"`, `CORS_ORIGINS="*"`, `EMERGENT_LLM_KEY` (Universal Key set this session).
- Frontend `.env` preserved (protected Expo packager vars + `EXPO_PUBLIC_BACKEND_URL=https://mobile-launch-pad-50.preview.emergentagent.com`).
- Backend deps via `pip install -r requirements.txt` (149 packages — `emergentintegrations 0.1.0`, `python-socketio 5.16.1`, `transformers 5.9.0`, `pandas 3.0.2`, `boto3 1.42.86`, `scikit-learn 1.8.0`, `stripe 15.0.1`, `resend 2.30.0`, `pyotp`, `qrcode`, `reportlab`, `slowapi`, `google-genai`).
- Frontend deps via `yarn install` (lockfile regenerated in 9.54s, Expo SDK ~54.0.35).
- Metro cache cleared (`.metro-cache` + `.expo`) — old cache pointed to stale paths and caused false `Unable to resolve module ../src/auth` until cleared.
- Web CRA bundle already present in `/app/web/build/` (`main.72691eb2.js`), served by FastAPI at `/api/web-ui/`, HTTP 200.
- Supervisor: backend (**774 routes**, +33 vs prev session `13232112321231`) + expo (tunnel ready, 1562-1564 modules bundled, first cold build 61 s) + mongodb + code-server + nginx — all RUNNING.
- Smoke (live, 14/14 green): `/api/healthz`, `/api/config/public`, 3 role logins (admin/client/tester @ atlas.dev) (john@atlas.dev → 401, see findings), `/api/auth/me`, `/api/admin/users` (12 users), `/api/contracts/my`, `/api/client/invoices` (6 invoices), `/api/portfolio/cases` (5 cases), `/api/admin/onboarding/tour-stats`, `/api/integrations/manifest`, `/api/web-ui/`. External Expo preview (`https://mobile-launch-pad-50.preview.emergentagent.com/`) → 200, welcome screen "Build real products. Not tasks." rendered live (verified via screenshot).
- Background loops all live: PAY-V2 worker (5s) + reaper (30s) + mock advancer (5s) + scheduler (900s) + reconciler (1800s, first run `recon_29de6d341787` scanned=0), Guardian (120s, observed real `OPERATOR auto_project_pause project=3dc2ad30 paused=1`), Module Motion (15s), Operator (300s), Event Engine (15 min), Contract Reminder (6h), Money Bridge initialised.
- Seeding (idempotent): 12 users (1 legacy `admin@devos.io` + 5 quick-access @ atlas.dev + 6 seeded devs), 89 modules, 81 QA decisions, 6 invoices, 5 notifications/admin + 3 each /john/client, 5 tester validations + 1 issue, 4 scope templates (with 4 sentence_transformers warnings — fallback works), seed replay marker `replay_a5b951937e` already existed (noop).
- All integrations in MOCK/DORMANT (Stripe test pk + WayForPay seeded in `integrations`, PayPal/Resend/Cloudinary/Google OAuth/Sentry dormant). AI ready via `EMERGENT_LLM_KEY` ✅.
- Findings (non-blocking): F1 sentence_transformers missing (template embeddings fallback to keyword), F2 john@atlas.dev/john123 login 401 (drift in `mock_seed.py`), F3 `/api/mobile/auth/demo` requires body now (was 200 in prev sessions), F4 expo web style warnings (borderColor rgba, shadow*→boxShadow, pointerEvents — native unaffected), F5 stale `.metro-cache` workaround.
- Audit report: `audit/AUDIT_2026-02-FEB_REDEPLOY_758r78r_E1_RU.md`.
- `memory/test_credentials.md` refreshed (5 quick-access logins + 6 seeded developers + 1 legacy).

## Previous milestone — Full redeploy & audit (2026-02-FEB, repo `13232112321231`)

- Cloned `svetlanaslinko057/13232112321231` (HEAD `889e055` — Auto-generated changes) to `/tmp/repo` (~405 MB, 17 479 файлов), rsync'ed to `/app` with exclusions (`.git`, `.emergent`, `.env`, `node_modules`, `.metro-cache`, `.expo`, `__pycache__`, `*.pyc`, `yarn.lock`).
- Backend `.env` recreated: `MONGO_URL`, `DB_NAME="atlas_devos"`, `CORS_ORIGINS="*"`, `EMERGENT_LLM_KEY` (Universal Key set this session).
- Frontend `.env` preserved (protected Expo packager vars + `EXPO_PUBLIC_BACKEND_URL`).
- Backend deps via `pip install -r requirements.txt` (149 packages — emergentintegrations 0.1.0, transformers 5.9.0, pandas 3.0.2, boto3 1.42.86, scikit-learn 1.8.0, stripe 15.0.1, resend 2.30.0, pyotp, qrcode, reportlab, slowapi, python-socketio).
- Frontend deps via `yarn install` (lockfile regenerated in 10.12s).
- Web CRA bundle уже present in `/app/web/build/`, served by FastAPI at `/api/web-ui/`.
- Supervisor: backend (**741 routes**) + expo (tunnel ready, 1563 modules bundled, plus full re-bundle 1564 modules) + mongodb + code-server + nginx — all RUNNING.
- Smoke (live, 11/11 green): `/api/healthz`, `/api/config/public`, 4 role logins (admin/john/client/tester @ atlas.dev), `/api/auth/me`, `/api/contracts/my`, `/api/client/invoices` (6 invoices), `/api/portfolio/cases`, `/api/integrations/manifest`, `/api/web-ui/`. External Expo preview (`https://expo-dev-preview-13.preview.emergentagent.com`) → 200.
- Background loops all live: PAY-V2 worker (5s) + reaper (30s) + mock advancer (5s) + scheduler (900s) + reconciler (1800s, first run scanned=0), Guardian (120s), Module Motion (15s), Operator (300s), Event (15 min), Contract Reminder (6h), Team Balancer (cycle observed: overloaded=0 moves=0).
- Seeding: 12 users, 89 modules, 81 QA decisions, 3 projects, 6 invoices, 6 deliverables, 3 tickets, 3 notifications, replay batch `boot_replay_v1` (70 events × 14 days), 5 tester validations, 4 scope templates.
- All integrations in MOCK/DORMANT (Stripe test pk seeded, PayPal/Resend/Cloudinary/Google OAuth/Sentry dormant). AI ready via `EMERGENT_LLM_KEY` ✅.
- Audit report: `audit/AUDIT_2026-02-FEB_REDEPLOY_13232112321231_E1_RU.md`.
- `memory/test_credentials.md` refreshed (5 quick-access logins + 6 seeded developers).

## Previous milestone — Full redeploy & audit (2026-02-FEB, repo `3e23e3e13e1313`)


## Latest milestone — Full redeploy & audit (2026-02-FEB, repo `3e23e3e13e1313`, **current** session)

- Cloned repo, rsync'ed code to `/app` preserving protected `.env` files.
- Restored repo's `app/_layout.tsx` (with full provider stack); the placeholder pod version was missing AuthProvider/I18n/Theme — caused `Attempted to navigate before mounting Root Layout` on `router.replace('/welcome')`.
- Backend deps: installed missing runtime libs not in current `requirements.txt` — python-socketio, python-engineio, aiohttp, litellm, openai, resend, stripe, slowapi, limits, pyotp, qrcode, reportlab, pillow, simple-websocket, beautifulsoup4, lxml, google-generativeai, google-genai, scikit-learn.
- Frontend deps: `yarn install` picked up new packages (expo-audio, expo-secure-store, expo-asset, expo-image-picker, expo-location, expo-notifications, expo-auth-session, expo-document-picker, expo-clipboard, expo-crypto, expo-device, socket.io-client, axios).
- Supervisor: backend (**644 routes**) + expo (tunnel ready, bundling complete) + mongodb — RUNNING.
- Smoke: `/api/healthz` 200, `/api/config/public` 200, `POST /api/auth/login` 200 for admin@atlas.dev (admin123) + client@atlas.dev (client123). Expo welcome screen "Build real products. Not tasks." rendered live in preview.
- All background loops live: PAY-V2 worker/reaper/advancer/scheduler/reconciler, Guardian, Module Motion, Operator, Event engine, Contract reminder, Autonomy scanner, Team balancer.
- All integrations in MOCK/DORMANT (Stripe/PayPal/Resend/Cloudinary/Google OAuth). Stripe has test publishable key seeded.
- `sentence-transformers` not installed → 4 "No module named sentence_transformers" warnings for scope-template embedding (non-blocking, fallback works).
- Audit report: `audit/AUDIT_2026-FEB_REDEPLOY_E1_SVETLANA_RU.md`.
- `memory/test_credentials.md` refreshed (5 quick-access logins).

## Previous milestone — Full redeploy & audit (2026-02-FEB, repo `1312dwqweve`)

## Latest milestone — Full redeploy & audit (2026-02-FEB, repo `1312dwqweve`, **current** session)

- Repo cloned `--depth 1` to `/tmp/repo_clone` (~403 MB, 17 475 files). Code rsync'ed to `/app` excluding `.git`, `.emergent`, `.env`, `node_modules`, `.metro-cache`, `.expo`, `__pycache__`, `*.pyc`, `yarn.lock` (recreated locally).
- Backend `.env` recreated: `MONGO_URL`, `DB_NAME="atlas_devos"`, `CORS_ORIGINS="*"`, `EMERGENT_LLM_KEY` (Universal Key set this session).
- Frontend `.env` preserved (protected Expo packager vars + `EXPO_PUBLIC_BACKEND_URL`).
- Backend deps reinstalled via `requirements.txt` (149 packages — emergentintegrations 0.1.0, transformers, pandas, boto3, scikit-learn refreshed).
- Frontend deps via `yarn install` (lockfile regenerated, ~12s).
- Web CRA bundle already present in `/app/web/build/` (~530 KB gzip), served by FastAPI at `/api/web-ui/`.
- Metro cache cleared (`/app/frontend/.metro-cache` + `.expo`) so Expo could pick up the new paths.
- Supervisor: backend (**741 routes**) + expo (tunnel ready, **1 563 modules** bundled) + mongodb + code-server + nginx — all RUNNING.
- Smoke (live, 14/14 green): `/api/healthz`, `/api/web-ui/`, `/api/portfolio/cases`, `/api/integrations/manifest`, 4 role logins (admin/john/client/tester @ atlas.dev), `/api/mobile/auth/demo`, `/api/auth/me`, `/api/contracts/my`, `/api/client/invoices` (6 invoices), `/api/admin/users`, `/api/admin/onboarding/tour-stats`, external Expo preview (`https://expo-mobile-test-2.preview.emergentagent.com` → Welcome renders "Build real products. Not tasks.").
- Background loops all live: PAY-V2 worker/reaper/advancer/scheduler/reconciler, Guardian, Module Motion (observed real status transitions on demo project `proj_04f6159e206b` — Dashboard UI → done, Charts → review, Authentication → in_progress), Operator, Contract reminder.
- All integrations in MOCK/DORMANT (Stripe/PayPal/Resend/Cloudinary/Google OAuth/Sentry). AI ready via `EMERGENT_LLM_KEY` ✅.
- Audit report: `audit/AUDIT_2026-02-FEB_REDEPLOY_1312dwqweve_E1_RU.md`.
- `memory/test_credentials.md` refreshed (5 quick-access logins + 6 seeded developer accounts documented).

## Previous milestone — Full redeploy & audit (2026-05-28, repo `13213123d`)

## Latest milestone — Full redeploy & audit (2026-05-28, repo `13213123d`, **current** session)

- Repo cloned `--depth 1` to `/tmp/repo` (414 MB; ~343 MB of which is `.metro-cache`). Code rsync'ed to `/app` excluding `.git`, `.emergent`, `.env`, `node_modules`, `.metro-cache`, `.expo`, `__pycache__`, `*.pyc`, `yarn.lock` (recreated locally).
- Backend `.env` recreated: `MONGO_URL`, `DB_NAME="atlas_devos"`, `CORS_ORIGINS="*"`, `EMERGENT_LLM_KEY` (Universal Key set this session).
- Frontend `.env` preserved (protected Expo packager vars + `EXPO_PUBLIC_BACKEND_URL`).
- Backend deps reinstalled via `requirements.txt` (149 packages). Frontend deps via `yarn install`.
- Web CRA bundle already present in `/app/web/build/` (530 KB gzip), served by FastAPI at `/api/web-ui/`.
- Supervisor: backend (**741 routes**, +6 vs `12e2g1u2ge1w`) + expo (tunnel ready, 1562 modules bundled) + mongodb + code-server + nginx — all RUNNING.
- Smoke (live, all 200): `/api/healthz`, `/api/web-ui/`, `/api/portfolio/cases`, `/api/integrations/manifest`, 4 role logins (admin/john/client/tester @ atlas.dev), `/api/mobile/auth/demo`, `/api/auth/me`, `/api/contracts/my`, `/api/client/invoices` (6 invoices), `/api/admin/users`, `/api/admin/onboarding/tour-stats`.
- Background loops all live: PAY-V2 worker/reaper/advancer/scheduler/reconciler, Guardian, Module Motion (observed real status transitions on demo project `proj_acaa100be2ab`), Operator, Event engine, Contract reminder.
- All integrations in MOCK/DORMANT (Stripe/PayPal/Resend/Cloudinary/Google OAuth/Sentry). AI ready via `EMERGENT_LLM_KEY` ✅.
- Audit report: `audit/AUDIT_2026-05-28_REDEPLOY_13213123d_E1_RU.md`.
- `memory/test_credentials.md` refreshed (4 quick-access logins verified, 5 seeded devs documented).

## Latest milestone — Footer extras + Cookie banner + Admin Legal settings (2026-05-28, **current** session)

Pre-existing scaffolding (built in earlier sessions) verified end-to-end and admin navigation wired up.

**What was added this session:**
- `/app/web/src/layouts/AdminLayout.js` — new sidebar `NavItem` `Legal & social` (Scale icon, `testid='nav-legal-settings'`) → routes to `/admin/legal-settings`.
- Web CRA bundle rebuilt → `main.f0a4322f.js` (replaces `main.c2e85a6a.js`), `4158.e7cc3d22.chunk.js` for the lazy AdminLegalSettings page.

**Pre-existing feature verified (17/17 backend pytest + full e2e Playwright, all green):**
- **Backend `/app/backend/legal_settings.py`** mounts at line 28074 of `server.py`. Endpoints:
  - `GET /api/public/legal-settings` — returns enabled socials + 3 legal docs (terms/privacy/cookies)
  - `GET /api/public/legal-document/{kind}` — 200 for terms/privacy/cookies, 404 for unknown
  - `POST /api/cookie-consent` — choice ∈ {all, essential, rejected}, fingerprint hashed (16-char anonymous hex), invalid choice → 422
  - `GET /api/admin/legal-settings` (admin-only RBAC; client → 403, anon → 401)
  - `PUT /api/admin/legal-settings` — partial updates, unknown social/legal kind → 400
  - `GET /api/admin/cookie-consents/stats` — `{total, by_choice:{all,essential,rejected}, computed_at}`
- **Frontend components:**
  - `CookieBanner.js` — compact fixed-bottom banner, theme-aware (light/dark via ThemeContext), 3 buttons (Customize / Essential only / Accept all), expandable showing 4 categories (essential locked + functional/analytics/marketing toggles). `window.dispatchEvent('cookie-banner:open')` re-opens it from footer "Cookies" link.
  - `FooterExtras.js` — tone-aware (`tone='dark'|'light'`), renders enabled socials only + 3 legal pill-buttons (terms/privacy/cookies). Embedded in `LandingPage.js` (dark, line 2904) and `LandingPageLight.js` (light, line 2879) without breaking existing footer design.
  - `LegalDocumentModal.js` — accessible modal showing legal doc title + body from `/api/public/legal-document/{kind}`.
  - `LegalSettingsContext.js` — single-fetch provider for socials + legal cache (avoids redundant calls).
  - `AdminLegalSettings.js` — full editor: 6 socials toggle+URL (telegram/tiktok/instagram/youtube/facebook/github), 3 doc-tabs (title+body), 3 consent stat cards.
- All testIDs work: `cookie-banner`, `cookie-banner-{customize,essential,accept-all}`, `cookie-banner-cat-{essential,functional,analytics,marketing}`, `footer-extras`, `footer-socials`, `footer-legal-links`, `footer-legal-{terms,privacy,cookies}`, `legal-modal-{terms,privacy,cookies}`, `admin-legal-settings`, `legal-social-*`, `legal-doc-tab-*`, `legal-save`, `nav-legal-settings`.

## Latest milestone — Tour analytics widget + tooltip i18n (2026-05-28, **current** session)

Closed the two finesse items from the previous summary.

### Tooltip chrome localization
- `frontend/src/onboarding-tour.tsx` — tooltip footer ("Back", "Next →", "Got it", "Skip the tour", "X of Y") wired to `useT()`:
  - `tour.ui.next` · `tour.ui.back` · `tour.ui.got_it` · `tour.ui.skip` · `tour.ui.step_counter` (with `{n}` / `{total}` placeholders).
- `frontend/src/i18n.tsx` — +10 keys (5 EN + 5 RU). RU shows "Шаг N из M / Далее → / Назад / Понятно / Пропустить тур".
- **Verified live (RU)**: Step 1 → "Шаг 1 из 8 · Далее → · Пропустить тур"; Next → Step 2 shows "Шаг 2 из 8 · Назад · Далее →". Step-counter placeholder substitution working.

### Admin dashboard widget — `TourStatsWidget`
- **NEW** `frontend/src/admin-tour-stats-widget.tsx` (290 LOC) — self-contained widget:
  - Fetches `/api/admin/onboarding/tour-stats` on mount + manual refresh button.
  - 2×2 grid of role cards (client/developer/admin/operator).
  - Each card: completion-rate % (color-coded: green ≥75%, amber 40-74%, red <40%, neutral n/a) · users / completed / skipped / pending / median drop step · horizontal bar histogram (built from `View` widths, no chart lib).
  - Loading / error / empty states; 403 surfaces as "Admin role required".
- `frontend/app/admin/home.tsx` — widget imported and mounted between the `Advanced` section and `OPERATIONS` grid (cockpit-first principle preserved — signal before drill-down).
- **Verified live**: admin login → `/admin/home` → widget renders all 4 role cards with real data. CLIENT shows `0%` (red), `Skipped=1`, `Median drop=step 4`, histogram bar for step 4 with count 1 (matches the earlier simulated skip). Other roles show "—" + "No drop-outs recorded yet".

### Files changed (this iteration)
- `frontend/src/onboarding-tour.tsx` — 5 string call-sites switched to `t()`
- `frontend/src/i18n.tsx` — +10 keys (5 EN + 5 RU) for `tour.ui.*`
- `frontend/src/admin-tour-stats-widget.tsx` — **NEW**
- `frontend/app/admin/home.tsx` — `+2 lines` (import + mount)

All services healthy: backend 736 routes, expo bundled, mongo seeded.

## Latest milestone — Onboarding tour: i18n + analytics + admin/operator variants (2026-05-28, current session)

Closed the three remaining Next Action Items from the tour epic (b/c/d) in one pass.

### (b) i18n localization of tour content
- `frontend/src/onboarding-tours.ts` — rewritten: `TourStep.title/body` → `titleKey/bodyKey` (i18n keys).
- `frontend/src/onboarding-tour.tsx` — `<TourTooltip>` now resolves via `useT()` (`t(step.titleKey)` / `t(step.bodyKey)`).
- `frontend/src/i18n.tsx` — added 72 keys (36 EN + 36 RU): `tour.{client|developer|admin|operator}.{step}.{title|body}`.
- **Verified live** by flipping `localStorage.atlas_lang='ru'` → tour card renders "Добро пожаловать в EVA-X" + RU body; English fallback works when key missing.

### (c) Tour analytics + admin stats endpoint
- **Backend** (`server.py`):
  - `TourCompletePayload` extended with optional `skipped_at_step` (0-based step index when finishing/skipping) + `total_steps`.
  - `POST /api/onboarding/tour-complete` writes `users.onboarding_tours.tour_seen_<role>_step` + `_total` along with the existing `_skipped` flag.
  - `POST /api/onboarding/tour-reset` also unsets `_step` and `_total` for clean replay.
  - **NEW** `GET /api/admin/onboarding/tour-stats` (admin-only, RBAC = `require_role("admin")`): returns per-role `{total_users, completed, skipped, pending, completion_rate, avg_dropout_step, median_dropout_step, step_histogram}`. Computed via Mongo `count_documents` + per-skipped-user step pull. Backend route count: **735 → 736**.
- **Frontend** (`onboarding-tour.tsx`): `markServerComplete(skipped, atIndex?)` now passes `skipped_at_step` = `currentIndex` on skip / `steps.length-1` on completion + `total_steps` = `steps.length`.
- **Verified live** end-to-end via curl:
  - simulate skip at step 3 of 8 → backend records `step:3, total:8`
  - admin endpoint returns `{completed:0, skipped:1, completion_rate:0.0, avg_dropout_step:3.0, median_dropout_step:3, step_histogram:{"3":1}}`
  - client → 403 on admin endpoint (RBAC OK).

### (d) Admin + Operator tour variants
- **Frontend** (`onboarding-tours.ts`): added `ADMIN_TOUR` (6 steps: welcome → home → pipeline → users → payouts → alerts) and `OPERATOR_TOUR` (6 steps: welcome → home → queue → autonomy → dispatch → alerts). Registered in `TOURS_BY_ROLE`.
- **Backend** (`server.py`): `/api/onboarding/tour-state` now treats `client/developer/admin/operator` as first-class supported roles. The previous `role_skipped` early-return for admin/operator removed; only truly unsupported roles get `role_unsupported`.
- **Verified live**: `GET /api/onboarding/tour-state` for admin@atlas.dev returns `{should_show: true, role: "admin", key: "tour_seen_admin"}` (was `should_show: false, reason: "role_skipped"` before).

### Files changed
- `backend/server.py` — `+170 / -25` LOC (extended payload, new endpoint, removed early-return)
- `frontend/src/onboarding-tours.ts` — rewritten (+100 LOC, added admin/operator tours)
- `frontend/src/onboarding-tour.tsx` — `useT()` integration + `currentIndex` passthrough (+15 LOC)
- `frontend/src/i18n.tsx` — +72 i18n keys (36 EN + 36 RU)
- All services healthy: backend 736 routes, expo bundled (1562 modules), mongo seeded.

## Latest milestone — Replay tour row in Profile (2026-05-28, current session)

- **NEW** `useOnboardingTour().replay()` method added to `frontend/src/onboarding-tour.tsx`:
  - Clears local `atlas_tour_seen_<role>` AsyncStorage flag.
  - POSTs `/api/onboarding/tour-reset` (already-existing endpoint) so the server `users.onboarding_tours.tour_seen_<role>` is unset across devices.
  - Resets `startedRef` + `currentIndex=0` + `setActive(true)` → tour fires immediately.
  - Context also exposes `hasTour: boolean` so consumer screens can hide the row for roles without a tour (admin/operator).
- **client/profile.tsx**: new MenuRow "Replay welcome tour" with `play-circle-outline` icon under the **Support** section. Hidden if `hasTour=false`.
- **developer/profile.tsx**: new TouchableOpacity "Replay welcome tour" + sub-label "Re-run the guided product walkthrough" between Notifications and ACCOUNT section.
- **i18n** (`src/i18n.tsx`): added `profile.row.replay_tour` for EN + RU.
- **Verified live**: client login → /client/profile → tap "Replay welcome tour" → tour overlay re-fires step 1 of 8 ("Welcome to EVA-X") with dim backdrop, dot counter, Next + Skip the tour. Developer screen confirms row presence.
- Files: `frontend/src/onboarding-tour.tsx` (+30 LOC), `frontend/app/client/profile.tsx` (+11 LOC), `frontend/app/developer/profile.tsx` (+18 LOC), `frontend/src/i18n.tsx` (+2 LOC).

## Latest milestone — Full redeploy & audit (2026-05-28, **current** session)

- Repo cloned `--depth 1` (17 447 files, 401 MB) and rsynced to `/app`, preserving `.git`, `.emergent`, `.env`.
- Backend deps reinstalled via `requirements.txt` (60+ packages updated incl. transformers, pandas, boto3, emergentintegrations==0.1.0).
- Frontend deps refreshed (`yarn install` in `/app/frontend`, ~9s).
- Web deps installed + bundle built (`yarn install` + `yarn build` in `/app/web` → served by FastAPI at `/api/web-ui/`).
- Supervisor: backend (**735 routes**) + expo (tunnel ready, 1563 modules bundled) + mongodb — all RUNNING.
- Smoke (live, all green): `/api/healthz`, `/api/web-ui/`, `/api/portfolio/cases`, `/api/integrations/manifest`, 4 role logins (admin/john/client/tester), `/api/mobile/auth/demo`. Expo Welcome rendering ("Build real products. Not tasks." + SEQ-01/02/03). Web-UI rendering ("Software, actually shipped").
- All background loops live: PAY-V2 worker (5s) / reaper (30s) / mock advancer (5s) / scheduler (900s), Guardian (120s), Module Motion (15s — наблюдается фактический progress of demo project modules), Operator (300s), Event (15 min), Contract Reminder (6h), Autonomy scanner.
- All integrations in MOCK/DORMANT (Stripe/PayPal/Resend/Cloudinary/Google OAuth). AI in mock — no `EMERGENT_LLM_KEY` set yet (was set in previous session, must be re-added on demand).
- Audit report: `audit/AUDIT_2026-05-28_REDEPLOY_12e2g1u2ge1w_E1_RU.md`.
- `memory/test_credentials.md` refreshed (4 quick-access logins verified).

## Previous milestone — Full redeploy & audit (2026-05-28, repo `12e21e213e13`)

- Same flow, previous repo URL. Code substantially identical (auto-mirror).
- Detailed report: `audit/AUDIT_2026-05-28_REDEPLOY_12e21e213e13_E1_RU.md`.

## Latest milestone — Full redeploy & audit (2026-05-28, this session)

- Repo cloned (~20 800 files) and rsynced to `/app`, preserving `.env`, `.git`, `.emergent`, `node_modules`, `.metro-cache`, `__pycache__`.
- Backend deps reinstalled via `requirements.txt` (149 pkgs; CUDA / torch / sentence-transformers already excluded from this revision).
- Frontend deps refreshed (`yarn install`).
- `EMERGENT_LLM_KEY` (Universal Key) + `CORS_ORIGINS` written to `backend/.env`.
- Supervisor: backend (732 routes) + expo (tunnel ready, 1559 modules bundled) + mongodb — all RUNNING.
- Smoke (live): `/api/healthz`, `/api/web-ui/`, all 4 role logins, `/api/contracts/my`, `/api/client/invoices` (6 demo invoices), `/api/admin/users`, `/api/auth/me`, `/api/integrations/manifest` — all 200.
- All background loops live: PAY-V2 worker (5s) / reaper (30s) / mock advancer (5s) / scheduler (900s), Guardian (120s), Module Motion (15s), Operator (300s), Event (15 min), Contract Reminder (6h).
- All integrations in MOCK/DORMANT (Stripe/PayPal/Resend/Cloudinary/Google OAuth/Sentry). AI ready via `EMERGENT_LLM_KEY`.
- Expo Welcome renders ("Build real products. Not tasks." + SEQ-01/02/03).
- Audit report: `audit/AUDIT_2026-05-28_REDEPLOY_12e21e213e13_E1_RU.md`.
- `memory/test_credentials.md` refreshed.

## Architecture summary

- **Backend FastAPI:** 732 routes, ~28 000 LOC in `server.py` + 96 domain modules (`api/`, `domains/`, `infrastructure/`, `integrations/`, `middleware/`, `payment_providers/`, `services/`, `shared/`).
- **Mobile Expo SDK 54:** 100 `.tsx` screens across 11 role branches (admin/developer/client/operator/tester/lead/portfolio/project/contract/help/workspace + root).
- **Web CRA admin:** 53 pages, built bundle served at `/api/web-ui/` (530 KB gzip).
- **Packages:** `design-system` + `runtime-client`.
- **MongoDB:** seeded — 12 users, 99 modules, 105 QA decisions, 3 projects, 6 invoices.
- **Sealed substrates:** Money Phase 2C-B, Web Stabilization Line (P3..P6), Contracts P3..P8, Payouts V2 P0+P1+P2A+P3+P4+P5.

## Deployment status — `/app`

| Service | Status | Port | Notes |
|---|---|---|---|
| backend (FastAPI) | RUNNING | 8001 | 732 routes, all loops up |
| expo (Metro tunnel) | RUNNING | 3000 | bundled 1559 modules, tunnel ready |
| mongodb | RUNNING | 27017 | seeded |
| Web admin (CRA build) | SERVED | `/api/web-ui/` | 530 KB gzip |

## Test credentials
See `/app/memory/test_credentials.md` (admin/john/client/tester @ atlas.dev with admin123/dev123/client123/tester123).

## Integrations status

| Capability | Mode | Flip-to-live env |
|---|---|---|
| payment | mock | `STRIPE_SECRET_KEY` + `STRIPE_WEBHOOK_SECRET` |
| paypal | dormant | `PAYPAL_CLIENT_ID` + `_SECRET` + `_WEBHOOK_ID` |
| mail | mock | `RESEND_API_KEY` |
| storage | mock | `CLOUDINARY_*` |
| oauth | unavailable | `GOOGLE_CLIENT_ID` |
| ai | ready | `EMERGENT_LLM_KEY` ✅ set this session |
| sentry | dormant | `SENTRY_DSN` |

## Open items / tech debt (from audit)

1. Duplicate Operation IDs in OpenAPI (9 warnings — `admin_users_layer.py` + `validation_campaigns.py`).
2. `sentence-transformers` lazily imported in scope-template embedding routine → 4 "No module named 'sentence_transformers'" errors on seed (NOT blocking — fallback works, templates still seeded). Optional install if vector-search needed.
3. `yarn.lock` not committed to repo (regenerated on cold clone).
4. `EMERGENT_LLM_KEY` is set in `backend/.env` (Universal Key) — works for OpenAI/Anthropic/Gemini text + Nano Banana + Whisper.

## Next action items

Awaiting user direction. Documented options:

### Onboarding tour for first-login (2026-05-28, this session)

- **NEW** Coachmarks engine in the Expo mobile app — fires automatically the first time a user lands in their cabinet after authenticating, never again.
- **Backend** (`/app/backend/server.py`):
  - `GET /api/onboarding/tour-state` → `{should_show, role, key}` (admin/operator auto-skipped).
  - `POST /api/onboarding/tour-complete` → marks `users.onboarding_tours.tour_seen_<role>` (records `skipped` flag too).
  - `POST /api/onboarding/tour-reset` → manual replay (Profile or admin/QA).
- **Frontend engine** (`/app/frontend/src/onboarding-tour.tsx` + `/app/frontend/src/onboarding-tours.ts`):
  - `<OnboardingTourProvider>` mounted in root `_layout.tsx` (inside ValidatorProvider).
  - Auto-trigger: 1.1s after `useAuth()` resolves to a user → checks local `atlas_tour_seen_<role>` flag, then server tour-state; if both green, starts.
  - Spotlight overlay: full-screen dim with a punched-out window around the target (4 dim rectangles) + pulsing primary-coloured ring.
  - Tooltip card: title + body + dot-counter + Skip(×) + Back/Next (Got it on last step) + "Skip the tour" link on the very first card.
  - Tour completes or skips → local AsyncStorage flag + POST tour-complete → never re-shows.
- **Tour copy** (curated per role, semantic targets — no element refs needed):
  - **Client (8 steps):** Welcome → Home tab → Projects tab → Activity tab → Billing tab → Profile tab → Alerts (🔔) → Chat (💬).
  - **Developer (7 steps):** Welcome → Home → Market → Acceptance → Earnings → Leaderboard → Alerts.
  - Targets are resolved geometrically (`{kind:'bottom-tab',index,of:5}` and `{kind:'header-icon',anchor:'alerts|chat|hvl'}`) → pixel-perfect spotlight without measuring real refs.
- **Verified:** Client login → `/client/home` → overlay renders → Step 1 "Welcome to EVA-X" → Step 2 spotlight on **Home tab** → … → Step 7 spotlight on **🔔 alerts icon** in header. All elements except the targeted one are dimmed; the tour card adapts placement (above bottom tabs, below header icons).

- **NEW** Unified auth page (`/api/web-ui/auth?mode=signin|register&role=client|builder`):
  - Single page replaces former `/client/auth` + `/builder/auth` (legacy paths still route here for back-compat).
  - **Default = Client.** No role-pill toggle. Builder mode is opt-in via a discrete link at the bottom of the card: *"Are you a developer? Apply as a Builder →"*.
  - Once in builder mode, a small pill appears at the top of the card: *"← Applying as a Builder — switch to Client"* (one-click revert).
  - **Heading copy** is context-aware:
    - Client: `Sign in` / `Create your account`
    - Builder: `Sign in as Builder` / `Apply as Builder`
  - **Left panel is STATIC** — same 4-stage JSON pipeline visual is shown for both modes; only the internal stage animation cycles. Geometry never shifts on role change.
  - **Demo row preserved**: side-by-side `Client demo` + `Builder demo` (no-signup, instant cabinet, 1-day session) → `/client/dashboard` or `/developer/dashboard`.
  - Google OAuth shown only in client mode (builder applies via email/password).
  - Referral capture preserved for both `devos_ref` (client) and `dev_referral_code` (developer growth).
  - 2FA challenge + Forgot-password flows preserved.
  - Files: `web/src/pages/UnifiedAuthPage.js` (rewritten), `web/src/App.js` (routes), `web/src/pages/LandingPage.js` + `LandingPageLight.js` (CTA links).

- **Mobile auth.tsx** (`/app/frontend/app/auth.tsx`) — mirrored pattern:
  - Default flow stays client (email-OTP).
  - On the email step, new secondary link: *"Are you a developer? Apply as a Builder →"* → routes to `/auth?intent=developer`.
  - In developer intent, link flips to *"← Back to client signup"* for symmetry.
  - All existing OTP/password/2FA/lead-claim flows untouched.

### Other options
1. PAY-V2 → P2B (PayPal live activation).
2. AI / automation pickup (`EMERGENT_LLM_KEY` ready).
3. Analytics / Billing V2 / Forecasting / Growth / Referral / Operator features.
4. Tech-debt sweep (duplicate Operation IDs, optional sentence-transformers, lock-file commit).
5. New feature direction (whatever user asks next).
