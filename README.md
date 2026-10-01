# Trader

Next.js admin for the trade journal.

```bash
cp .env.example .env
# add NOTION_API_KEY
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Charts and Journal are listed in `src/routes.js`.

Notion data is fetched on the server and cached for 60 seconds.
