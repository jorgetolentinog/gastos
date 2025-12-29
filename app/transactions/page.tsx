import Link from "next/link";

interface Transaction {
    id: string;
    date: string;
    description: string;
    amount: number;
    category: string;
    tag: string;
    type: string;
    account: string;
}

export default function TransactionsPage() {
    const transactions: Transaction[] = [
        {
            id: '1',
            date: '2024-01-15',
            description: 'Grocery Shopping',
            amount: 125.50,
            category: 'Food',
            tag: 'groceries',
            type: 'expense',
            account: 'Credit Card',
        },
    ];

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Transactions</h1>

            <div className="mb-4">
                <Link
                    href="/transactions/new" 
                    className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg transition-colors"
                >
                    New Transaction
                </Link>
            </div>
            
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Date</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Description</th>
                            <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">Amount</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Category</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Tag</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Type</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Account</th>
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
                                <td className="px-4 py-3 text-sm text-gray-700">{transaction.tag}</td>
                                <td className="px-4 py-3 text-sm text-gray-700">
                                    <span className={`px-2 py-1 rounded-full text-xs ${
                                        transaction.type === 'expense' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
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