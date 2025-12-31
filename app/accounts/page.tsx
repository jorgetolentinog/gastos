import { accountTable, currencyTable, db, transactionTable } from "@/database";
import { eq, sql } from "drizzle-orm";

export default async function AccountsPage() {
  const accounts = await db
    .select({
      accountId: accountTable.accountId,
      name: accountTable.name,
      currencyCode: currencyTable.code,
      balanceMinor: sql<bigint>`(
        ${accountTable.initialBalanceMinor} + 
        COALESCE(
          (SELECT SUM(${transactionTable.amountMinor}) 
           FROM ${transactionTable} 
           WHERE ${transactionTable.accountId} = ${accountTable.accountId}),
          0
        )
      )::bigint`.as('balance_minor'),
    })
    .from(accountTable)
    .innerJoin(currencyTable, eq(accountTable.currency, currencyTable.id))

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Mis Cuentas</h1>
      </div>

      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Cuentas de Ahorro</h2>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            + Nueva Cuenta
          </button>
        </div>
        <div className="bg-white rounded-lg shadow overflow-hidden border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cuenta</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Saldo</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {accounts.map((account) => (
                  <tr key={account.accountId} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{account.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="text-sm font-semibold text-gray-900">
                        {account.currencyCode} {(Number(account.balanceMinor) / 100).toFixed(2)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <button className="text-blue-600 hover:text-blue-800 text-sm font-medium mr-3">Ver</button>
                      <button className="text-gray-600 hover:text-gray-800 text-sm font-medium">Editar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}