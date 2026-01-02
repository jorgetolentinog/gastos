import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import {
  accountTable,
  categoryTable,
  transactionTable,
} from "@/database/schema";
import { db } from "@/database/client";

async function createTransaction(formData: FormData) {
  "use server";

  const accountId = formData.get("account") as string;
  const date = formData.get("date") as string;
  const description = formData.get("description") as string;
  const amount = parseFloat(formData.get("amount") as string) || 0;
  const categoryId = formData.get("category") as string;

  await db.insert(transactionTable).values({
    id: crypto.randomUUID(),
    accountId,
    categoryId: categoryId,
    amountMinor: BigInt(Math.round(amount * 100)),
    description,
    date: new Date(date),
  });

  revalidatePath("/transactions");
  redirect("/transactions");
}

export default async function NewTransactionPage() {
  const accounts = await db.select().from(accountTable);
  const categories = await db.select().from(categoryTable);

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Nueva Transacción</h1>

      <form action={createTransaction} className="space-y-4">
        <div>
          <label htmlFor="date" className="block text-sm font-medium mb-2">
            Fecha
          </label>
          <input
            type="date"
            id="date"
            name="date"
            required
            defaultValue={new Date().toISOString().split("T")[0]}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label htmlFor="account" className="block text-sm font-medium mb-2">
            Cuenta
          </label>
          <select
            id="account"
            name="account"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="">Seleccionar cuenta</option>
            {accounts.map((account) => (
              <option key={account.id} value={account.id}>
                {account.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium mb-2">
            Categoría
          </label>
          <select
            id="category"
            name="category"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="">Seleccionar categoría</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium mb-2"
          >
            Descripción
          </label>
          <input
            type="text"
            id="description"
            name="description"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label htmlFor="amount" className="block text-sm font-medium mb-2">
            Monto
          </label>
          <input
            type="number"
            id="amount"
            name="amount"
            step="0.01"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
        >
          Registrar Transacción
        </button>
      </form>
    </div>
  );
}
