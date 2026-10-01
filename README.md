# Trader

Next.js admin for the trade journal.

```bash
cp .env.example .env
# add NOTION_API_KEY, AUTH_SECRET (npx auth secret) and ALLOWED_EMAILS
npm install
npm run db:migrate
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and register with an email listed in `ALLOWED_EMAILS`. App pages live under `/app` and are listed in `src/routes.js`.

Notion data is fetched on the server and cached for 60 seconds.

## Auth

- Auth.js (email + password) with users stored in SQLite via Prisma (`prisma/dev.db`).
- Every route except `/login`, `/register` and `/api/auth/*` requires a session (`src/middleware.js`, plus a check in `src/app/app/layout.jsx`).
- Only emails in `ALLOWED_EMAILS` can register or sign in. Removing an email blocks new sign-ins; existing sessions last until they expire (30 days).
- When self-hosting with `next start`, set `AUTH_TRUST_HOST=true`.
