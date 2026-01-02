import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import dotenv from "dotenv";
import {
  userTable,
  currencyTable,
  categoryTable,
  accountTable,
} from "../database/schema";

dotenv.config();

async function main() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL no está definida");
  }

  const client = postgres(process.env.DATABASE_URL, { max: 1 });
  const db = drizzle(client);

  try {
    console.log("🌱 Insertando datos iniciales...");

    console.log("  💱 Creando monedas...");
    await db.insert(currencyTable).values([
      {
        id: "00000000-0000-0000-0000-000000000001",
        code: "PEN",
        name: "Peruvian Sol",
        minorUnits: 2,
        emojiFlag: "🇵🇪",
      },
      {
        id: "00000000-0000-0000-0000-000000000002",
        code: "USD",
        name: "US Dollar",
        minorUnits: 2,
        emojiFlag: "🇺🇸",
      },
    ]);

    console.log("  👤 Creando usuario de prueba...");
    await db.insert(userTable).values({
      id: "00000000-0000-0000-0000-000000000001",
      email: "test@example.com",
    });

    console.log("  📁 Creando categorías...");
    await db.insert(categoryTable).values([
      {
        id: "10000000-0000-0000-0000-000000000001",
        name: "Food",
        emojiIcon: "🍔",
      },
      {
        id: "10000000-0000-0000-0000-000000000002",
        name: "Transport",
        emojiIcon: "🚌",
      },
      {
        id: "10000000-0000-0000-0000-000000000003",
        name: "Salary",
        emojiIcon: "💼",
      },
      {
        id: "10000000-0000-0000-0000-000000000004",
        name: "Entertainment",
        emojiIcon: "🎮",
      },
    ]);

    console.log("👉 Creando cuentas...");
    await db.insert(accountTable).values([
      {
        id: "20000000-0000-0000-0000-000000000001",
        userId: "00000000-0000-0000-0000-000000000001",
        name: "Cash",
        currencyId: "00000000-0000-0000-0000-000000000001",
        initialBalanceMinor: BigInt(500000), // 5000.00 PEN
      },
    ]);

    console.log("✅ Datos iniciales insertados correctamente");
  } finally {
    await client.end();
  }
}

main().catch((error) => {
  console.error("❌ Seed falló:", error);
  process.exit(1);
});
