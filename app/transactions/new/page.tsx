import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

async function createTransaction(formData: FormData) {
    'use server';
    
    const amount = formData.get('amount');
    const description = formData.get('description');
    const category = formData.get('category');
    const date = formData.get('date');
    
    // Aquí va tu lógica para guardar en base de datos
    // Por ejemplo: await db.transaction.create({ amount, description, category, date })
    
    revalidatePath('/transactions');
    redirect('/transactions');
}

export default function NewTransactionPage() {
    return (
        <div className="max-w-2xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Nueva Transacción</h1>
            
            <form action={createTransaction} className="space-y-4">
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
                    <label htmlFor="category" className="block text-sm font-medium mb-2">
                        Categoría
                    </label>
                    <select
                        id="category"
                        name="category"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    >
                        <option value="">Seleccionar categoría</option>
                        <option value="comida">Comida</option>
                        <option value="transporte">Transporte</option>
                        <option value="entretenimiento">Entretenimiento</option>
                        <option value="servicios">Servicios</option>
                        <option value="otros">Otros</option>
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