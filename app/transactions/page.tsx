import Link from "next/link";

interface Transaction {
    id: string;
    date: string;
    description: string;
    amount: number;
    category: string;
    type: string;
    account: string;
}

export default function TransactionsPage() {
    const transactions: Transaction[] = [
        {
            id: '1',
            date: '2024-01-15',
            description: 'Compra de Supermercado',
            amount: 125.50,
            category: 'Comida',
            type: 'gasto',
            account: 'Tarjeta de Crédito',
        },
    ];

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
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Fecha</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Descripción</th>
                            <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">Monto</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Categoría</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Tipo</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Cuenta</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map((transaction) => (
                            <tr key={transaction.id} className="border-t border-gray-200 hover:bg-gray-50">
                                <td className="px-4 py-3 text-sm text-gray-900">{transaction.date}</td>
                                <td className="px-4 py-3 text-sm text-gray-900">{transaction.description}</td>
                                <td className="px-4 py-3 text-sm text-right text-gray-900">
                                    ${transaction.amount.toFixed(2)}
                                </td>
                                <td className="px-4 py-3 text-sm text-gray-700">{transaction.category}</td>
                                <td className="px-4 py-3 text-sm text-gray-700">
                                    <span className={`px-2 py-1 rounded-full text-xs ${
                                        transaction.type === 'gasto' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                                    }`}>
                                        {transaction.type}
                                    </span>
                                </td>
                                <td className="px-4 py-3 text-sm text-gray-700">{transaction.account}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}