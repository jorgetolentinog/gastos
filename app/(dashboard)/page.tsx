import { db } from "@/database/client";
import { categoryTable, transactionTable } from "@/database/schema";
import {
  desc,
  eq,
  getTableColumns,
  sum,
  sql,
  gte,
  lte,
  and,
  gt,
  lt,
} from "drizzle-orm";
import { DistributionExpenses } from "./widget/distribution-expenses";

export default async function Home() {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const endOfMonth = new Date(
    now.getFullYear(),
    now.getMonth() + 1,
    0,
    23,
    59,
    59
  );

  const [incomes] = await db
    .select({
      total: sql<bigint>`COALESCE(SUM(${transactionTable.amountMinor}), 0)::bigint`,
    })
    .from(transactionTable)
    .where(
      and(
        gte(transactionTable.date, startOfMonth),
        lte(transactionTable.date, endOfMonth),
        gt(transactionTable.amountMinor, BigInt(0))
      )
    );

  const [expenses] = await db
    .select({
      total: sql<bigint>`COALESCE(SUM(${transactionTable.amountMinor}), 0)::bigint`,
    })
    .from(transactionTable)
    .where(
      and(
        gte(transactionTable.date, startOfMonth),
        lte(transactionTable.date, endOfMonth),
        lt(transactionTable.amountMinor, BigInt(0))
      )
    );

  const lastTransactions = await db
    .select({
      ...getTableColumns(transactionTable),
      category: categoryTable,
    })
    .from(transactionTable)
    .innerJoin(categoryTable, eq(transactionTable.categoryId, categoryTable.id))
    .limit(5)
    .orderBy(desc(transactionTable.date));

  return (
    <main className="max-w-7xl mx-auto px-6 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900">Ingresos</h3>
            <div className="text-2xl">💰</div>
          </div>
          <p className="text-3xl font-bold text-green-600 mb-1">
            US$ {(Number(incomes.total) / 100).toFixed(2)}
          </p>
          <p className="text-sm text-gray-600">Este mes</p>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900">Gastos</h3>
            <div className="text-2xl">💸</div>
          </div>
          <p className="text-3xl font-bold text-red-600 mb-1">
            US$ {(Number(expenses.total) / 100).toFixed(2)}
          </p>
          <p className="text-sm text-gray-600">Este mes</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden mb-8">
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="text-lg font-bold text-gray-900">
            Transacciones Recientes
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                  Descripción
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                  Categoría
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                  Tipo
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                  Monto
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                  Fecha
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {lastTransactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {transaction.description}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    {transaction.category.name}
                  </td>
                  <td
                    className={`px-6 py-4 text-sm ${
                      transaction.amountMinor > 0
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {transaction.amountMinor > 0 ? "Ingreso" : "Gasto"}
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                    {transaction.amountMinor > 0 ? "+" : "-"}US${" "}
                    {(Number(transaction.amountMinor) / 100).toFixed(2)}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {transaction.date.toISOString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-6">
          Distribución de Gastos
        </h3>
        <div className="space-y-4">
          <DistributionExpenses />
        </div>
      </div>
    </main>
  );
}
