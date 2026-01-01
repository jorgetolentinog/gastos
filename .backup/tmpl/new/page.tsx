'use client';

// import { redirect } from 'next/navigation';
// import { revalidatePath } from 'next/cache';
import { useState } from 'react';
import CurrencySelector from './CurrencySelector';

// async function createAccount(formData: FormData) {
//     'use server';
    
//     const name = formData.get('name');
//     const provider = formData.get('provider');
//     const currency = formData.get('currency');
//     const initialBalance = formData.get('initialBalance');

//     // Aquí va tu lógica para guardar en base de datos
//     // Convertir el balance a minor units (centavos): amount * 100
//     // Por ejemplo: await db.account.create({ name, provider, currency, initialBalanceMinor: BigInt(Number(initialBalance) * 100) })
    
//     revalidatePath('/accounts');
//     redirect('/accounts');
// }

function NewAccountForm() {
    const [selectedCurrency, setSelectedCurrency] = useState<string>('');

    return (
        <form className="space-y-4">
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

            <CurrencySelector 
                value={selectedCurrency} 
                onChange={setSelectedCurrency}
                name="currency"
            />
            
            <div>
                <label htmlFor="initialBalance" className="block text-sm font-medium mb-2">
                    Balance Inicial
                </label>
                <input
                    type="number"
                    id="initialBalance"
                    name="initialBalance"
                    step="0.01"
                    required
                    defaultValue="0.00"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
            </div>

            <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
            >
                Crear Cuenta
            </button>
        </form>
    );
}

export default function NewAccountPage() {
    return (
        <div className="max-w-2xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Nueva Cuenta</h1>
            <NewAccountForm />
        </div>
    );
}
