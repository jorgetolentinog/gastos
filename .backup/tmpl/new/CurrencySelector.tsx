'use client';

import { useState } from 'react';

interface Currency {
  code: string;
  name: string;
  flag: string;
  isFavorite?: boolean;
}

const CURRENCIES: Currency[] = [
  { code: 'USD', name: 'Dólar estadounidense', flag: '🇺🇸', isFavorite: true },
  { code: 'EUR', name: 'Euro', flag: '🇪🇺', isFavorite: true },
  { code: 'MXN', name: 'Peso Mexicano', flag: '🇲🇽', isFavorite: true },
  { code: 'GBP', name: 'Libra esterlina', flag: '🇬🇧', isFavorite: true },
  { code: 'AUD', name: 'Dólar australiano', flag: '🇦🇺', isFavorite: true },
  { code: 'JPY', name: 'Yen japonés', flag: '🇯🇵' },
  { code: 'CAD', name: 'Dólar canadiense', flag: '🇨🇦' },
  { code: 'CHF', name: 'Franco suizo', flag: '🇨🇭' },
  { code: 'CNY', name: 'Yuan chino', flag: '🇨🇳' },
  { code: 'INR', name: 'Rupia India', flag: '🇮🇳' },
  { code: 'BRL', name: 'Real brasileño', flag: '🇧🇷' },
  { code: 'ZAR', name: 'Rand sudafricano', flag: '🇿🇦' },
];

interface CurrencySelectorProps {
  value?: string;
  onChange: (code: string) => void;
  name?: string;
}

export default function CurrencySelector({ value, onChange, name = 'currency' }: CurrencySelectorProps) {
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState<Set<string>>(
    new Set(CURRENCIES.filter(c => c.isFavorite).map(c => c.code))
  );

  const selectedCurrency = CURRENCIES.find(c => c.code === value);
  const favoriteCurrencies = CURRENCIES.filter(c => favorites.has(c.code));

  const filteredCurrencies = CURRENCIES.filter(currency =>
    currency.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    currency.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleFavorite = (code: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(code)) {
        newFavorites.delete(code);
      } else {
        newFavorites.add(code);
      }
      return newFavorites;
    });
  };

  const selectCurrency = (code: string) => {
    onChange(code);
    setShowModal(false);
    setSearchQuery('');
  };

  return (
    <>
      <input type="hidden" name={name} value={value || ''} required />
      
      <div className="space-y-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Moneda</h3>
          
          {/* Selected Currency */}
          <button
            type="button"
            onClick={() => setShowModal(true)}
            className="w-full bg-gray-50 rounded-lg p-4 flex items-center justify-between hover:bg-gray-100 transition-colors"
          >
            {selectedCurrency ? (
              <div className="flex items-center gap-3">
                <span className="text-2xl">{selectedCurrency.flag}</span>
                <div className="text-left">
                  <div className="font-medium text-gray-900">{selectedCurrency.code}</div>
                  <div className="text-sm text-gray-500">{selectedCurrency.name}</div>
                </div>
              </div>
            ) : (
              <span className="text-gray-500">Selecciona una moneda</span>
            )}
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Favorites */}
          <div className="mt-4">
            <h4 className="text-sm text-gray-600 mb-2">Tus favoritos</h4>
            <div className="grid grid-cols-5 gap-2">
              {favoriteCurrencies.map((currency) => (
                <button
                  key={currency.code}
                  type="button"
                  onClick={() => selectCurrency(currency.code)}
                  className={`flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-all hover:border-gray-300 ${
                    value === currency.code
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-200 bg-white'
                  }`}
                >
                  <span className="text-2xl mb-1">{currency.flag}</span>
                  <span className={`text-xs font-medium ${
                    value === currency.code ? 'text-blue-600' : 'text-gray-700'
                  }`}>
                    {currency.code}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Ver más monedas button */}
          <button
            type="button"
            onClick={() => setShowModal(true)}
            className="w-full mt-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 flex items-center justify-center gap-2 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
            </svg>
            Ver más monedas
          </button>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-lg w-full max-h-[80vh] flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold">Selecciona una moneda</h2>
              <button
                type="button"
                onClick={() => {
                  setShowModal(false);
                  setSearchQuery('');
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Search */}
            <div className="p-4">
              <div className="relative">
                <svg
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar por código o nombre..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Currency Grid */}
            <div className="flex-1 overflow-y-auto p-4">
              <div className="grid grid-cols-2 gap-3">
                {filteredCurrencies.map((currency) => (
                  <button
                    key={currency.code}
                    type="button"
                    onClick={() => selectCurrency(currency.code)}
                    className={`relative flex flex-col items-center p-4 rounded-lg border-2 transition-all hover:border-gray-300 ${
                      value === currency.code
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-200 bg-white'
                    }`}
                  >
                    {/* Favorite star */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(currency.code);
                      }}
                      className="absolute top-2 right-2"
                    >
                      <svg
                        className={`w-5 h-5 ${
                          favorites.has(currency.code)
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'fill-none text-gray-300'
                        }`}
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                      </svg>
                    </button>

                    <span className="text-3xl mb-2">{currency.flag}</span>
                    <div className="text-center">
                      <div className={`text-sm font-medium ${
                        value === currency.code ? 'text-blue-600' : 'text-gray-900'
                      }`}>
                        {currency.code}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">{currency.name}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
