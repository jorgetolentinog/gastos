import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import dotenv from "dotenv";
import { sql } from "drizzle-orm";

dotenv.config();

async function main() {
    const client = postgres(process.env.DATABASE_URL!, { max: 1 });

    const db = drizzle(client);

    console.log("🔄 Reiniciando la base de datos...");

    await db.execute(sql`DROP SCHEMA IF EXISTS public CASCADE;`);
    await db.execute(sql`CREATE SCHEMA public;`);
    await db.execute(sql`GRANT ALL ON SCHEMA public TO public;`);

    console.log("✅ Base de datos reiniciada correctamente.");

    await client.end();
}

main().catch((error) => {
    console.error("❌ Reset falló:", error);
    process.exit(1);
});
