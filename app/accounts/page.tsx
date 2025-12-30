export default function AccountsPage() {
  // Datos de ejemplo - reemplazar con datos reales del estado
  const portfolioSummary = [
    { currency: 'USD', total: 45250.50, change: 1250.30, changePercent: 2.85 },
    { currency: 'EUR', total: 32100.00, change: -450.00, changePercent: -1.38 },
    { currency: 'ARS', total: 1250000.00, change: 50000.00, changePercent: 4.17 },
  ];

  const savingsAccounts = [
    { id: 1, name: 'Cuenta Principal USD', bank: 'Banco Nacional', balance: 25000, currency: 'USD', rate: 0.5 },
    { id: 2, name: 'Cuenta EUR', bank: 'Banco Internacional', balance: 15000, currency: 'EUR', rate: 0.3 },
  ];

  const fixedTermAccounts = [
    { id: 3, name: 'Plazo Fijo 90 días', bank: 'Banco Provincial', balance: 10000, currency: 'USD', rate: 5.5, maturityDate: '2024-03-30' },
    { id: 4, name: 'Plazo Fijo UVA', bank: 'Banco Nacional', balance: 500000, currency: 'ARS', rate: 12.0, maturityDate: '2024-04-15' },
  ];

  const investments = [
    { id: 5, name: 'ETF S&P 500', type: 'ETF', balance: 15250.50, currency: 'USD', return: 8.5 },
    { id: 6, name: 'Bonos Gobierno', type: 'Bonos', balance: 5000, currency: 'USD', return: 4.2 },
    { id: 7, name: 'Acciones Tech', type: 'Acciones', balance: 12100, currency: 'EUR', return: -2.3 },
  ];

  const projectedYield = {
    monthly: 450.25,
    annual: 5403.00,
    currency: 'USD'
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Mis Cuentas</h1>
        <p className="text-gray-600">Resumen completo de tu patrimonio</p>
      </div>

      {/* Resumen Patrimonio Total Multi-Moneda */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {portfolioSummary.map((summary) => (
          <div key={summary.currency} className="bg-white rounded-lg shadow p-6 border border-gray-200">
            <div className="flex justify-between items-start mb-2">
              <span className="text-sm font-medium text-gray-600">Patrimonio Total</span>
              <span className="text-xs font-semibold px-2 py-1 rounded bg-gray-100">{summary.currency}</span>
            </div>
            <div className="text-3xl font-bold mb-2">
              {new Intl.NumberFormat('es-AR', {
                style: 'currency',
                currency: summary.currency,
                minimumFractionDigits: 2
              }).format(summary.total)}
            </div>
            <div className="flex items-center gap-2">
              <span className={`text-sm font-semibold ${summary.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {summary.change >= 0 ? '+' : ''}
                {new Intl.NumberFormat('es-AR', {
                  style: 'currency',
                  currency: summary.currency,
                  minimumFractionDigits: 2
                }).format(summary.change)}
              </span>
              <span className={`text-xs ${summary.changePercent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                ({summary.changePercent >= 0 ? '+' : ''}{summary.changePercent}%)
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Rendimiento Proyectado */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg shadow p-6 mb-8 border border-blue-200">
        <h2 className="text-lg font-semibold mb-4 text-blue-900">Rendimiento Proyectado</h2>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <span className="text-sm text-blue-700">Mensual</span>
            <div className="text-2xl font-bold text-blue-900">
              {new Intl.NumberFormat('es-AR', {
                style: 'currency',
                currency: projectedYield.currency,
                minimumFractionDigits: 2
              }).format(projectedYield.monthly)}
            </div>
          </div>
          <div>
            <span className="text-sm text-blue-700">Anual</span>
            <div className="text-2xl font-bold text-blue-900">
              {new Intl.NumberFormat('es-AR', {
                style: 'currency',
                currency: projectedYield.currency,
                minimumFractionDigits: 2
              }).format(projectedYield.annual)}
            </div>
          </div>
        </div>
      </div>

      {/* Cuentas de Ahorro */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Cuentas de Ahorro</h2>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            + Nueva Cuenta
          </button>
        </div>
        <div className="bg-white rounded-lg shadow overflow-hidden border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cuenta</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Banco</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Saldo</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Tasa</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {savingsAccounts.map((account) => (
                  <tr key={account.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{account.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600">{account.bank}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="text-sm font-semibold text-gray-900">
                        {new Intl.NumberFormat('es-AR', {
                          style: 'currency',
                          currency: account.currency
                        }).format(account.balance)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <span className="text-sm text-green-600 font-medium">{account.rate}%</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <button className="text-blue-600 hover:text-blue-800 text-sm font-medium mr-3">Ver</button>
                      <button className="text-gray-600 hover:text-gray-800 text-sm font-medium">Editar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Plazos Fijos */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Plazos Fijos</h2>
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
            + Nuevo Plazo Fijo
          </button>
        </div>
        <div className="bg-white rounded-lg shadow overflow-hidden border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cuenta</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Banco</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Saldo</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Tasa</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vencimiento</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {fixedTermAccounts.map((account) => (
                  <tr key={account.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{account.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600">{account.bank}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="text-sm font-semibold text-gray-900">
                        {new Intl.NumberFormat('es-AR', {
                          style: 'currency',
                          currency: account.currency
                        }).format(account.balance)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <span className="text-sm text-green-600 font-medium">{account.rate}%</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600">{account.maturityDate}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <button className="text-blue-600 hover:text-blue-800 text-sm font-medium mr-3">Ver</button>
                      <button className="text-gray-600 hover:text-gray-800 text-sm font-medium">Editar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Inversiones */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Inversiones</h2>
          <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
            + Nueva Inversión
          </button>
        </div>
        <div className="bg-white rounded-lg shadow overflow-hidden border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Valor</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Rendimiento</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {investments.map((investment) => (
                  <tr key={investment.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{investment.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-800">
                        {investment.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="text-sm font-semibold text-gray-900">
                        {new Intl.NumberFormat('es-AR', {
                          style: 'currency',
                          currency: investment.currency
                        }).format(investment.balance)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <span className={`text-sm font-medium ${investment.return >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {investment.return >= 0 ? '+' : ''}{investment.return}%
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <button className="text-blue-600 hover:text-blue-800 text-sm font-medium mr-3">Ver</button>
                      <button className="text-gray-600 hover:text-gray-800 text-sm font-medium">Editar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
