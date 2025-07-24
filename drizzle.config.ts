import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './drizzle',
  schema: './server/database/schema.ts',
  dialect: 'mysql',
  dbCredentials: {
    host: process.env.DB_HOST ?? "localhost",
    database: process.env.DB_NAME ?? "steezepot",
    user: process.env.DB_USER ?? "root",
    password: process.env.DB_PASS ?? undefined,
    port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306
  }
});