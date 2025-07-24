// server/db/index.ts
import "dotenv/config";
import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as schema from "./schema"; // Import your schema from schema.ts

// Create a MySQL connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_NAME || "steezepot",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "", // Use empty string if no password
});

// Initialize Drizzle with the connection pool and schema
export const db = drizzle(pool, { schema, mode: "default" });// server/db/index.ts
