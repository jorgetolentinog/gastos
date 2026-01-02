import { db } from "@/database/client";
import { categoryTable, transactionTable } from "@/database/schema";
import { desc, eq, getTableColumns } from "drizzle-orm";

export default async function Home() {
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
          <p className="text-3xl font-bold text-green-600 mb-1">US$ 3.500,00</p>
          <p className="text-sm text-gray-600">Este mes</p>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900">Gastos</h3>
            <div className="text-2xl">💸</div>
          </div>
          <p className="text-3xl font-bold text-red-600 mb-1">US$ 1.850,00</p>
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
                <tr key={transaction.transactionId}>
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
                    {new Date(transaction.date).toLocaleDateString(undefined, {
                      day: "2-digit",
                      month: "short",
                      ...(new Date(transaction.date).getFullYear() !==
                      new Date().getFullYear()
                        ? { year: "numeric" }
                        : {}),
                    })}
                  </td>
                </tr>
              ))}

              <tr>
                <td className="px-6 py-4 text-sm text-gray-900">Almuerzo</td>
                <td className="px-6 py-4 text-sm">
                  <span className="inline-block bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-medium">
                    Comida
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-red-600">Gasto</td>
                <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                  -US$ 25,00
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">Hoy 12:45</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm text-gray-900">
                  Salario Mensual
                </td>
                <td className="px-6 py-4 text-sm">
                  <span className="inline-block bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-medium">
                    Ingreso
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-green-600">Ingreso</td>
                <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                  +US$ 3.500,00
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">27 Dic</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm text-gray-900">Uber</td>
                <td className="px-6 py-4 text-sm">
                  <span className="inline-block bg-orange-100 text-orange-700 px-2 py-1 rounded text-xs font-medium">
                    Transporte
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-red-600">Gasto</td>
                <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                  -US$ 15,50
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">26 Dic</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm text-gray-900">
                  Película Netflix
                </td>
                <td className="px-6 py-4 text-sm">
                  <span className="inline-block bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs font-medium">
                    Entretenimiento
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-red-600">Gasto</td>
                <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                  -US$ 15,99
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">25 Dic</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-6">
          Distribución de Gastos
        </h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">
                🍔 Comida
              </span>
              <span className="text-sm font-semibold text-gray-900">
                US$ 245,00 (32%)
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-orange-500 h-2 rounded-full"
                style={{ width: "32%" }}
              ></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">
                🚗 Transporte
              </span>
              <span className="text-sm font-semibold text-gray-900">
                US$ 120,50 (16%)
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full"
                style={{ width: "16%" }}
              ></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">
                🎮 Entretenimiento
              </span>
              <span className="text-sm font-semibold text-gray-900">
                US$ 175,00 (23%)
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-purple-500 h-2 rounded-full"
                style={{ width: "23%" }}
              ></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">
                🏠 Servicios
              </span>
              <span className="text-sm font-semibold text-gray-900">
                US$ 309,50 (41%)
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-500 h-2 rounded-full"
                style={{ width: "41%" }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
