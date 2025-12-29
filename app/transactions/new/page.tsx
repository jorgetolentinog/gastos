import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

async function createTransaction(formData: FormData) {
    'use server';
    
    const amount = formData.get('amount');
    const description = formData.get('description');
    const category = formData.get('category');
    const date = formData.get('date');
    const type = formData.get('type');
    const cuenta = formData.get('cuenta');

    // Aquí va tu lógica para guardar en base de datos
    // Por ejemplo: await db.transaction.create({ amount, description, category, date, type })
    
    revalidatePath('/transactions');
    redirect('/transactions');
}

export default function NewTransactionPage() {
    return (
        <div className="max-w-2xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Nueva Transacción</h1>
            
            <form action={createTransaction} className="space-y-4">
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
                
                <div>
                    <label className="block text-sm font-medium mb-3">
                        Categoría
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {[
                            { value: 'comida', label: 'Comida', icon: '🍔' },
                            { value: 'transporte', label: 'Transporte', icon: '🚗' },
                            { value: 'entretenimiento', label: 'Entretenimiento', icon: '🎮' },
                            { value: 'servicios', label: 'Servicios', icon: '💼' },
                            { value: 'otros', label: 'Otros', icon: '📦' },
                        ].map((category) => (
                            <label
                                key={category.value}
                                className="relative flex flex-col items-center justify-center p-4 rounded-lg border-2 border-gray-200 cursor-pointer transition-all hover:border-gray-300 hover:shadow-sm has-[:checked]:border-blue-600 has-[:checked]:bg-blue-50 has-[:checked]:shadow-md"
                            >
                                <input
                                    type="radio"
                                    name="category"
                                    value={category.value}
                                    required
                                    className="sr-only peer"
                                />
                                <span className="text-3xl mb-2">{category.icon}</span>
                                <span className="text-sm font-medium text-gray-700 peer-checked:text-blue-600">
                                    {category.label}
                                </span>
                            </label>
                        ))}
                    </div>
                </div>
                
                <div>
                    <label className="block text-sm font-medium mb-3">
                        Tipo
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                        {[
                            { value: 'ingreso', label: 'Ingreso', icon: '💰' },
                            { value: 'gasto', label: 'Gasto', icon: '💸' },
                        ].map((type) => (
                            <label
                                key={type.value}
                                className="relative flex flex-col items-center justify-center p-4 rounded-lg border-2 border-gray-200 cursor-pointer transition-all hover:border-gray-300 hover:shadow-sm has-[:checked]:border-blue-600 has-[:checked]:bg-blue-50 has-[:checked]:shadow-md"
                            >
                                <input
                                    type="radio"
                                    name="type"
                                    value={type.value}
                                    required
                                    className="sr-only peer"
                                />
                                <span className="text-3xl mb-2">{type.icon}</span>
                                <span className="text-sm font-medium text-gray-700 peer-checked:text-blue-600">
                                    {type.label}
                                </span>
                            </label>
                        ))}
                    </div>
                </div>
                
                <div>
                    <label className="block text-sm font-medium mb-3">
                        Cuenta
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                        {[
                            { value: 'efectivo', label: 'Efectivo', icon: '💵' },
                            { value: 'banco', label: 'Banco', icon: '🏦' },
                            { value: 'tarjeta', label: 'Tarjeta de Crédito', icon: '💳' },
                        ].map((cuenta) => (
                            <label
                                key={cuenta.value}
                                className="relative flex flex-col items-center justify-center p-4 rounded-lg border-2 border-gray-200 cursor-pointer transition-all hover:border-gray-300 hover:shadow-sm has-[:checked]:border-blue-600 has-[:checked]:bg-blue-50 has-[:checked]:shadow-md"
                            >
                                <input
                                    type="radio"
                                    name="cuenta"
                                    value={cuenta.value}
                                    required
                                    className="sr-only peer"
                                />
                                <span className="text-3xl mb-2">{cuenta.icon}</span>
                                <span className="text-sm font-medium text-gray-700 peer-checked:text-blue-600">
                                    {cuenta.label}
                                </span>
                            </label>
                        ))}
                    </div>
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