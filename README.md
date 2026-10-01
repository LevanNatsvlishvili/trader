# Trader

Next.js admin for the trade journal.

```bash
cp .env.example .env
# add NOTION_API_KEY, AUTH_SECRET (npx auth secret), ALLOWED_EMAILS,
# and the Neon DATABASE_URL (pooled) + DIRECT_URL (direct)
npm install
npm run db:deploy   # create tables in Neon
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and register with an email listed in `ALLOWED_EMAILS`. App pages live under `/app` and are listed in `src/routes.js`.

Notion data is fetched on the server and cached for 60 seconds.

## Auth

- Auth.js (email + password) with users stored in Neon Postgres via Prisma (`@prisma/adapter-neon`).
- Every route except `/login`, `/register` and `/api/auth/*` requires a session (`src/middleware.js`, plus a check in `src/app/app/layout.jsx`).
- Only emails in `ALLOWED_EMAILS` can register or sign in. Removing an email blocks new sign-ins; existing sessions last until they expire (30 days).
- When self-hosting with `next start`, set `AUTH_TRUST_HOST=true`.

## Database

- `npm run db:deploy` applies pending migrations to the database in `DIRECT_URL`.
- After changing `prisma/schema.prisma`, run `npm run db:migrate -- --name <change>` against a Neon dev branch to create a new migration.
- On Netlify, set `DATABASE_URL`, `DIRECT_URL`, `AUTH_SECRET`, `AUTH_URL` (your site URL), `ALLOWED_EMAILS` and `NOTION_API_KEY`. Migrations are not run during the build; run `npm run db:deploy` before deploying a schema change.
