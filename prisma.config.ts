import 'dotenv/config'
import { defineConfig } from 'prisma/config'

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
  },
  datasource: {
    // Migrations need Neon's direct (non-pooled) connection; the app uses the pooled DATABASE_URL.
    url: process.env['DIRECT_URL'] ?? process.env['DATABASE_URL'],
  },
})
