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

                
            </form>
        </div>
    )
}
