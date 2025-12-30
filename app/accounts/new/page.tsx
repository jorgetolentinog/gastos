export default function NewAccountForm() {
    return (
        <div className="max-w-2xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Nueva Cuenta</h1>
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

                <div>
                    <label className="block text-xl font-bold mb-4">
                        Seleccionar Moneda
                    </label>
                    <div className="space-y-3">
                        <div className="flex gap-3">
                            <label className="cursor-pointer">
                                <input
                                    type="radio"
                                    name="currency"
                                    value="USD"
                                    className="peer sr-only"
                                />
                                <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 peer-checked:bg-gray-800 peer-checked:text-white">
                                    <span>🇺🇸</span>
                                    <span>USD</span>
                                </div>
                            </label>
                            <label className="cursor-pointer">
                                <input
                                    type="radio"
                                    name="currency"
                                    value="EUR"
                                    className="peer sr-only"
                                />
                                <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 peer-checked:bg-gray-800 peer-checked:text-white">
                                    <span>🇪🇺</span>
                                    <span>EUR</span>
                                </div>
                            </label>
                            <label className="cursor-pointer">
                                <input
                                    type="radio"
                                    name="currency"
                                    value="MXN"
                                    className="peer sr-only"
                                />
                                <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 peer-checked:bg-gray-800 peer-checked:text-white">
                                    <span>🇲🇽</span>
                                    <span>MXN</span>
                                </div>
                            </label>
                            <button
                                type="button"
                                className="px-4 py-2 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200"
                            >
                                + Más
                            </button>
                        </div>
                        <p className="text-sm text-gray-600">
                            Seleccionado: USD - Dólar
                        </p>
                    </div>
                </div>


            </form>
        </div>
    )
}
