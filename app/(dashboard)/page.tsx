import { redirect } from "next/navigation";

export default function Home() {

  // redirect("/transactions");

  return (
    // <div>
    //   <h1 className="text-3xl font-bold text-gray-900">Buenos días, Jorge</h1>
    //   <p className="mt-2 text-gray-600">Esto es lo que debes saber sobre tu dinero hoy</p>
    // </div>


    <div>

    <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-sm text-gray-600">Resumen de tu situación financiera</p>
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition">+ Nueva Transacción</button>
        </div>
    </header>

    <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-6 text-white mb-8 shadow-lg">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <p className="text-sm opacity-90 mb-1">Patrimonio Total Consolidado</p>
                    <h2 className="text-4xl font-bold">US$ 81.810,50</h2>
                </div>
                <div className="flex gap-2">
                    <button className="bg-opacity-20 px-3 py-1 rounded text-sm font-medium hover:bg-opacity-30 transition">Mensual</button>
                    <select className="bg-opacity-20 px-3 py-1 rounded text-sm font-medium hover:bg-opacity-30 transition appearance-none cursor-pointer">
                        <option>USD</option>
                        <option>EUR</option>
                        <option>ARS</option>
                    </select>
                </div>
            </div>
            <div className="flex gap-4 text-sm">
                <span className="flex items-center gap-1">
                    <span className="opacity-90">+US$ 805,30</span>
                    <span className="text-green-300">+0.99%</span>
                </span>
                <span className="opacity-75">último período</span>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                <p className="text-sm text-gray-600 mb-2">Patrimonio Total</p>
                <p className="text-xs text-gray-500 mb-3">USD</p>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">US$ 45.250,50</h3>
                <p className="text-sm text-green-600">+US$ 1.250,30 (+2.85%)</p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                <p className="text-sm text-gray-600 mb-2">Patrimonio Total</p>
                <p className="text-xs text-gray-500 mb-3">EUR</p>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">EUR 32.100,00</h3>
                <p className="text-sm text-red-600">-EUR 450.00 (-1.38%)</p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                <p className="text-sm text-gray-600 mb-2">Patrimonio Total</p>
                <p className="text-xs text-gray-500 mb-3">ARS</p>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">$ 1.250.000,00</h3>
                <p className="text-sm text-green-600">+$ 50.000,00 (+4.17%)</p>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-gray-900">Ingresos</h3>
                    <div className="text-2xl">💰</div>
                </div>
                <p className="text-3xl font-bold text-green-600 mb-1">US$ 3.500,00</p>
                <p className="text-sm text-gray-600">Este mes</p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-gray-900">Gastos</h3>
                    <div className="text-2xl">💸</div>
                </div>
                <p className="text-3xl font-bold text-red-600 mb-1">US$ 1.850,00</p>
                <p className="text-sm text-gray-600">Este mes</p>
            </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden mb-8">
            <div className="px-6 py-4 border-b border-gray-100">
                <h3 className="text-lg font-bold text-gray-900">Transacciones Recientes</h3>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-gray-100 bg-gray-50">
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Descripción</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Categoría</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Tipo</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Monto</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Fecha</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        <tr>
                            <td className="px-6 py-4 text-sm text-gray-900">Almuerzo</td>
                            <td className="px-6 py-4 text-sm"><span className="inline-block bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-medium">Comida</span></td>
                            <td className="px-6 py-4 text-sm text-red-600">Gasto</td>
                            <td className="px-6 py-4 text-sm font-semibold text-gray-900">-US$ 25,00</td>
                            <td className="px-6 py-4 text-sm text-gray-600">Hoy 12:45</td>
                        </tr>
                        <tr>
                            <td className="px-6 py-4 text-sm text-gray-900">Salario Mensual</td>
                            <td className="px-6 py-4 text-sm"><span className="inline-block bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-medium">Ingreso</span></td>
                            <td className="px-6 py-4 text-sm text-green-600">Ingreso</td>
                            <td className="px-6 py-4 text-sm font-semibold text-gray-900">+US$ 3.500,00</td>
                            <td className="px-6 py-4 text-sm text-gray-600">27 Dic</td>
                        </tr>
                        <tr>
                            <td className="px-6 py-4 text-sm text-gray-900">Uber</td>
                            <td className="px-6 py-4 text-sm"><span className="inline-block bg-orange-100 text-orange-700 px-2 py-1 rounded text-xs font-medium">Transporte</span></td>
                            <td className="px-6 py-4 text-sm text-red-600">Gasto</td>
                            <td className="px-6 py-4 text-sm font-semibold text-gray-900">-US$ 15,50</td>
                            <td className="px-6 py-4 text-sm text-gray-600">26 Dic</td>
                        </tr>
                        <tr>
                            <td className="px-6 py-4 text-sm text-gray-900">Película Netflix</td>
                            <td className="px-6 py-4 text-sm"><span className="inline-block bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs font-medium">Entretenimiento</span></td>
                            <td className="px-6 py-4 text-sm text-red-600">Gasto</td>
                            <td className="px-6 py-4 text-sm font-semibold text-gray-900">-US$ 15,99</td>
                            <td className="px-6 py-4 text-sm text-gray-600">25 Dic</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Distribución de Gastos</h3>
            <div className="space-y-4">
                <div>
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-700">🍔 Comida</span>
                        <span className="text-sm font-semibold text-gray-900">US$ 245,00 (32%)</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-orange-500 h-2 rounded-full" style={{width: '32%'}}></div>
                    </div>
                </div>

                <div>
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-700">🚗 Transporte</span>
                        <span className="text-sm font-semibold text-gray-900">US$ 120,50 (16%)</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{width: '16%'}}></div>
                    </div>
                </div>

                <div>
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-700">🎮 Entretenimiento</span>
                        <span className="text-sm font-semibold text-gray-900">US$ 175,00 (23%)</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-purple-500 h-2 rounded-full" style={{width: '23%'}}></div>
                    </div>
                </div>

                <div>
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-700">🏠 Servicios</span>
                        <span className="text-sm font-semibold text-gray-900">US$ 309,50 (41%)</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{width: '41%'}}></div>
                    </div>
                </div>
            </div>
        </div>
    </main>
    </div>
  );
}
