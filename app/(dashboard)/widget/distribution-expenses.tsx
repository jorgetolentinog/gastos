import { db } from "@/database/client";
import { categoryTable, transactionTable } from "@/database/schema";
import { desc, sum, sql, lt } from "drizzle-orm";

const colors = [
  "bg-orange-500",
  "bg-blue-500",
  "bg-purple-500",
  "bg-green-500",
  "bg-red-500",
  "bg-yellow-500",
  "bg-pink-500",
  "bg-indigo-500",
];

export async function DistributionExpenses() {
  // Consultar transacciones agrupadas por categoría (solo gastos - valores negativos)
  const results = await db
    .select({
      categoryId: transactionTable.categoryId,
      categoryName: categoryTable.name,
      categoryEmoji: categoryTable.emojiIcon,
      totalAmount: sum(transactionTable.amountMinor),
    })
    .from(transactionTable)
    .innerJoin(
      categoryTable,
      sql`${transactionTable.categoryId} = ${categoryTable.id}`
    )
    .where(lt(transactionTable.amountMinor, sql`0`)) // Solo gastos (valores negativos)
    .groupBy(
      transactionTable.categoryId,
      categoryTable.name,
      categoryTable.emojiIcon
    )
    .orderBy(desc(sum(transactionTable.amountMinor)));

  // Calcular el total de gastos (en valor absoluto)
  const totalExpenses = results.reduce(
    (acc, item) => acc + BigInt(item.totalAmount || 0) * BigInt(-1),
    BigInt(0)
  );

  // Si no hay gastos, mostrar mensaje
  if (totalExpenses === BigInt(0)) {
    return (
      <div className="text-center text-gray-500 py-4">
        No hay gastos registrados
      </div>
    );
  }

  return (
    <>
      {results.map((item, index) => {
        const amount = BigInt(item.totalAmount || 0) * BigInt(-1); // Convertir a positivo para mostrar
        const percentage =
          totalExpenses > 0
            ? Number((amount * BigInt(100)) / totalExpenses)
            : 0;
        const formattedAmount = (Number(amount) / 100).toFixed(2);
        const colorClass = colors[index % colors.length];

        return (
          <div key={item.categoryId}>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">
                {item.categoryEmoji} {item.categoryName}
              </span>
              <span className="text-sm font-semibold text-gray-900">
                ${formattedAmount} ({percentage}%)
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`${colorClass} h-2 rounded-full`}
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
          </div>
        );
      })}
    </>
  );
}
