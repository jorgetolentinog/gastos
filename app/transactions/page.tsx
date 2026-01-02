import { db } from "@/database/client";
import { accountTable, transactionTable } from "@/database/schema";
import { eq } from "drizzle-orm";
import Link from "next/link";

export default async function TransactionsPage() {
    const transactions = await db.select().from(transactionTable).innerJoin(accountTable, eq(transactionTable.accountId, accountTable.accountId));

    return (
        <div className="container mx-auto p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Transacciones</h1>
                <Link
                    href="/transactions/new" 
                    className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg transition-colors"
                >
                    Nueva Transacción
                </Link>
            </div>
            
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Cuenta</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Fecha</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Descripción</th>
                            <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">Monto</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map((transaction) => (
                            <tr key={transaction.transaction.transactionId} className="border-t border-gray-200 hover:bg-gray-50">
                                <td className="px-4 py-3 text-sm text-gray-700">{transaction.account.name}</td>
                                <td className="px-4 py-3 text-sm text-gray-900">{transaction.transaction.date.toISOString()}</td>
                                <td className="px-4 py-3 text-sm text-gray-900">{transaction.transaction.description}</td>
                                <td className="px-4 py-3 text-sm text-right text-gray-900">
                                    ${(Number(transaction.transaction.amountMinor) / 100).toFixed(2)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}