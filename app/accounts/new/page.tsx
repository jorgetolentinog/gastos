import { db } from "@/database/client";
import { accountTable, currencyTable } from "@/database/schema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

async function create(formData: FormData) {
  "use server";

  const name = formData.get("name") as string;
  const currencyId = formData.get("currency") as string;
  const initialBalance =
    parseFloat(formData.get("initialBalance") as string) || 0;

  await db.insert(accountTable).values({
    id: crypto.randomUUID(),
    userId: "00000000-0000-0000-0000-000000000001",
    name,
    currencyId,
    initialBalanceMinor: BigInt(Math.round(initialBalance * 100)),
  });

  revalidatePath("/accounts");
  redirect("/accounts");
}

export default async function NewAccountForm() {
  const currencies = await db.select().from(currencyTable);

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Nueva Cuenta</h1>
      <form className="space-y-4" action={create}>
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-2">
            Nombre de la Cuenta
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            placeholder="Ej: Cuenta de Ahorros"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label htmlFor="currency" className="block text-sm font-medium mb-2">
            Moneda
          </label>
          <select
            id="currency"
            name="currency"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            {currencies.map((currency) => (
              <option key={currency.id} value={currency.id}>
                {currency.code} - {currency.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="initialBalance"
            className="block text-sm font-medium mb-2"
          >
            Balance Inicial
          </label>
          <input
            type="number"
            id="initialBalance"
            name="initialBalance"
            step="0.01"
            defaultValue="0.00"
            placeholder="0.00"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
        >
          Crear cuenta
        </button>
      </form>
    </div>
  );
}
