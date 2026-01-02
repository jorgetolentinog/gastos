import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import dotenv from "dotenv";
import { userTable, currencyTable, categoryTable } from "../database/schema";

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
        minorUnits: 2,
        flag: "🇵🇪",
      },
      {
        id: "00000000-0000-0000-0000-000000000002",
        code: "USD",
        name: "US Dollar",
        minorUnits: 2,
        flag: "🇺🇸",
      },
    ]);

  await db
    .insert(userTable)
    .values({
      id: "00000000-0000-0000-0000-000000000001",
      email: "test@example.com",
    });

  await db.insert(categoryTable).values([
    { id: "10000000-0000-0000-0000-000000000001", name: "Food" },
    { id: "10000000-0000-0000-0000-000000000002", name: "Transport" },
    { id: "10000000-0000-0000-0000-000000000003", name: "Salary" },
    { id: "10000000-0000-0000-0000-000000000004", name: "Entertainment" },
  ]);

  console.log("✅ Seeding completed!");
  await client.end();
}

main().catch((error) => {
  console.error("❌ Seeding failed:", error);
  process.exit(1);
});
