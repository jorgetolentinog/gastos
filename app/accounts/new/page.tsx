import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

async function createAccount(formData: FormData) {
    'use server';
    
    const name = formData.get('name');
    const provider = formData.get('provider');
    const currency = formData.get('currency');
    const initialBalance = formData.get('initialBalance');

    // Aquí va tu lógica para guardar en base de datos
    // Convertir el balance a minor units (centavos): amount * 100
    // Por ejemplo: await db.account.create({ name, provider, currency, initialBalanceMinor: BigInt(Number(initialBalance) * 100) })
    
    revalidatePath('/accounts');
    redirect('/accounts');
}

export default function NewAccountPage() {
    return (
        <div className="max-w-2xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Nueva Cuenta</h1>
            
            <form action={createAccount} className="space-y-4">
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

                <div>
                    <label className="block text-sm font-medium mb-3">
                        Moneda
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {[
                            { value: '1', label: 'USD', icon: '💵', description: 'Dólar' },
                            { value: '2', label: 'EUR', icon: '💶', description: 'Euro' },
                            { value: '3', label: 'MXN', icon: '🇲🇽', description: 'Peso Mexicano' },
                        ].map((currency) => (
                            <label
                                key={currency.value}
                                className="relative flex flex-col items-center justify-center p-4 rounded-lg border-2 border-gray-200 cursor-pointer transition-all hover:border-gray-300 hover:shadow-sm has-[:checked]:border-blue-600 has-[:checked]:bg-blue-50 has-[:checked]:shadow-md"
                            >
                                <input
                                    type="radio"
                                    name="currency"
                                    value={currency.value}
                                    required
                                    className="sr-only peer"
                                />
                                <span className="text-3xl mb-2">{currency.icon}</span>
                                <span className="text-sm font-medium text-gray-700 peer-checked:text-blue-600">
                                    {currency.label}
                                </span>
                                <span className="text-xs text-gray-500">
                                    {currency.description}
                                </span>
                            </label>
                        ))}
                    </div>
                </div>
                
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
        </div>
    );
}
