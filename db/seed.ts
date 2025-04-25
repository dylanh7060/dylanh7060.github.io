import { db } from "./index";
import * as schema from "@shared/schema";

async function seed() {
  try {
    // Check if messages table exists, if not create it
    const existingTables = await db.query.pg.query(
      "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';"
    );
    
    const messageTableExists = existingTables.rows.some(
      (row) => row.table_name === "messages"
    );
    
    if (!messageTableExists) {
      console.log("Creating messages table...");
      await db.query.pg.query(`
        CREATE TABLE IF NOT EXISTS "messages" (
          "id" SERIAL PRIMARY KEY,
          "name" TEXT NOT NULL,
          "email" TEXT NOT NULL,
          "message" TEXT NOT NULL,
          "created_at" TIMESTAMP NOT NULL DEFAULT NOW(),
          "read" BOOLEAN NOT NULL DEFAULT FALSE
        );
      `);
      console.log("Messages table created successfully.");
    }
    
    // No need to seed any initial data for this application
    console.log("Database schema is ready.");
  } catch (error) {
    console.error("Error during seeding:", error);
  }
}

seed();
