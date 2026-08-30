# Muhammad Luqman — Portfolio & Admin CMS

A full-stack personal portfolio with a private admin dashboard for managing
every piece of content — education, experience, skills, projects,
certifications, documents, and contact messages — without touching code.

Built with Next.js 14 (App Router) + TypeScript + Tailwind CSS + SQLite.

## Known dependency notice

`npm audit` will report advisories against the Next.js 14.x line (fixed
only in the 16.x major line as of this writing). This project intentionally
stays on 14.x (App Router APIs used here are stable on that line) rather
than jumping to an untested major version. Before a production launch, run
`npm audit` yourself and check https://nextjs.org/blog for the latest
patched 14.x/15.x release, and upgrade if one is available.

## Quick start

```bash
npm install
npm run db:seed     # loads your CV data into the local database
npm run dev
```

Open http://localhost:3000 for the public site.

Open http://localhost:3000/admin — since no admin account exists yet, you'll
land on a one-time setup screen to create your administrator login. After
that, `/admin/setup` disables itself and all further access goes through
`/admin/login`.

## What's included

- **Public site** (`/`): hero, about, education timeline, experience
  timeline, research interests, skills, certifications, projects, documents,
  and a contact form — all pulling live from the database.
- **Admin CMS** (`/admin/*`): full CRUD for every section, drag-free
  reordering (up/down), file uploads for documents and profile photo,
  contact-message inbox, and site settings (SEO title/description).
- **Auth**: bcrypt-hashed passwords, signed JWT session cookies (httpOnly,
  secure in production), route protection via middleware.
- **Database**: SQLite via `better-sqlite3` — zero setup, a single file
  (`dev.db`), typed data-access layer in `src/lib/repo.ts`.
- **File storage**: local disk (`public/uploads`) by default; see
  "Moving to production" below to switch to S3-compatible cloud storage.
- **Validation & security**: Zod schemas on every write endpoint, a
  honeypot + rate limiter on the public contact form, rate limiting on
  login/setup, file-type/size validation on uploads, no secrets in
  client-side code.

## Content rules

Every piece of content in the public site comes from the database — there is
no hardcoded biographical text left in the templates. If a section (e.g.
Projects) has no entries yet, it either shows an empty state or hides itself
entirely, rather than displaying placeholder content. The initial seed
(`prisma/seed.ts`) contains only what was present on the original CV.

## Project structure

```
src/
  app/                  Next.js App Router pages
    (public sections)   src/components/sections/*.tsx
    admin/              Admin dashboard pages (client components)
    api/                API routes (public + /api/admin/* protected)
  components/           Shared UI components
  lib/
    db.ts               SQLite connection + schema bootstrap
    schema.sql           Raw table definitions
    repo.ts             Typed data-access layer (the only place that runs SQL)
    auth.ts             Password hashing + session cookies
    storage.ts          File upload abstraction (local disk / S3)
    validation.ts       Zod schemas + rate limiter
```

## Moving to production

This app is fully functional locally out of the box. Three things are
intentionally left as a short checklist rather than pre-wired, because they
require your own accounts/credentials:

### 1. Database

SQLite works fine for a single-instance deployment with persistent disk
(e.g. a small VPS, Fly.io, Railway with a volume). If you need a fully
managed database instead:

- Create a Postgres instance (Neon, Supabase, Railway, etc.)
- Swap `src/lib/db.ts` for a `pg` connection pool and adjust the SQL in
  `src/lib/repo.ts` (queries are simple and map over almost unchanged —
  mainly swapping `?` placeholders for `$1, $2...` and adapting
  `datetime('now')` to `now()`)
- Set `DATABASE_URL` in your hosting provider's environment variables

### 2. File storage

Local disk storage (`public/uploads`) is **not persistent** on most hosting
platforms (files vanish on redeploy/restart). For production:

- Create an S3-compatible bucket (AWS S3, Cloudflare R2, Backblaze B2)
- Fill in `STORAGE_S3_*` variables in `.env` (see `.env.example`)
- Implement the marked S3 branch in `src/lib/storage.ts` (two functions:
  `uploadFile` and `deleteFile`) using your provider's SDK

### 3. Environment variables

Copy `.env.example` to `.env` and fill in:

- `SESSION_SECRET` — generate with `openssl rand -base64 32`
- `DATABASE_URL` — see above
- `STORAGE_S3_*` — optional, see above
- `RESEND_API_KEY` / `CONTACT_NOTIFY_EMAIL` — optional, for email
  notifications when someone submits the contact form

### Build & deploy

```bash
npm run build
npm run start
```

Deploys as a standard Next.js app to Vercel, Railway, Fly.io, or any
Node-capable host. If deploying to a platform without persistent disk
(e.g. Vercel), you must configure S3-compatible storage first (step 2) —
local file uploads won't survive a redeploy there.

## Managing content day-to-day

Once logged into `/admin`:

- **Profile** — name, title, summary, about text, research/career
  interests, contact links, and profile photo
- **Education / Experience** — add, edit, delete, reorder with ↑/↓
- **Skills** — add skills under any category name; matching categories
  group together automatically on the public site
- **Projects / Certifications** — add entries with optional links; to
  attach a file (e.g. a certificate PDF), upload it in **Documents** first
  and paste its link into the relevant field
- **Documents** — upload PDFs/images or link externally, categorize, and
  toggle public/private visibility per document
- **Messages** — view and reply to contact form submissions
- **Settings** — site title and meta description for SEO/social previews

Changes save immediately and appear on the public site on next page load —
no rebuild or redeploy needed.
