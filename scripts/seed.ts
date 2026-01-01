import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import dotenv from "dotenv";
import { userTable, currencyTable } from "../database/schema";
import { sql } from "drizzle-orm";

dotenv.config();

async function main() {
  const client = postgres(process.env.DATABASE_URL as string, { max: 1 });
  const db = drizzle(client);

  console.log("🌱 Seeding database...");

  await db
    .insert(currencyTable)
    .values([
      {
        id: "00000000-0000-0000-0000-000000000001",
        code: "PEN",
        name: "Peruvian Sol",
        flag: "🇵🇪",
      },
      {
        id: "00000000-0000-0000-0000-000000000002",
        code: "USD",
        name: "US Dollar",
        flag: "🇺🇸",
      },
    ])
    .onConflictDoUpdate({
      target: currencyTable.code,
      set: {
        name: sql`excluded.name`,
        flag: sql`excluded.flag`,
      },
    });

  await db
    .insert(userTable)
    .values({
      id: "00000000-0000-0000-0000-000000000001",
      email: "test@example.com",
    })
    .onConflictDoUpdate({
      target: userTable.email,
      set: {
        email: sql`excluded.email`,
      },
    });

  console.log("✅ Seeding completed!");
  await client.end();
}

main().catch((error) => {
  console.error("❌ Seeding failed:", error);
  process.exit(1);
});
