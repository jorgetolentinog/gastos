import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { accountTable, db, transactionTable } from '@/database';

async function createTransaction(formData: FormData) {
    'use server';
    
    const accountId = formData.get('account') as string;
    const date = formData.get('date') as string;
    const description = formData.get('description') as string;
    const amount = parseFloat(formData.get('amount') as string) || 0;

    await db.insert(transactionTable).values({
        transactionId: crypto.randomUUID(),
        accountId,
        amountMinor: BigInt(Math.round(amount * 100)),
        description,
        date: BigInt(new Date(date).getTime()),
    });

    revalidatePath('/transactions');
    redirect('/transactions');
}

export default async function NewTransactionPage() {
    const accounts = await db.select().from(accountTable);

    return (
        <div className="max-w-2xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Nueva Transacción</h1>
            
            <form action={createTransaction} className="space-y-4">
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
                            <option key={account.accountId} value={account.accountId}>
                                {account.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label htmlFor="date" className="block text-sm font-medium mb-2">
                        Fecha
                    </label>
                    <input
                        type="date"
                        id="date"
                        name="date"
                        required
                        defaultValue={new Date().toISOString().split('T')[0]}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                </div>

                <div>
                    <label htmlFor="description" className="block text-sm font-medium mb-2">
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