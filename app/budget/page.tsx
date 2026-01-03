"use client";

import React, { useState } from "react";
import {
  TrendingUp,
  TrendingDown,
  ChevronDown,
  ChevronRight,
  Folder,
  File,
  Plus,
  X,
  ChevronLeft,
  Repeat,
  Trash2,
  Target,
  Wallet,
} from "lucide-react";

const FinanceTable = () => {
  const [expandedCategories, setExpandedCategories] = useState(["food"]);
  const [filterView, setFilterView] = useState("all");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [data, setData] = useState([
    {
      id: "income",
      name: "Income",
      type: "income",
      isCategory: false,
      amount: 4500.0,
      projected: null,
      percentage: 0,
      isRecurring: true,
      children: [],
    },
    {
      id: "prestamo",
      name: "Préstamo",
      type: "income",
      isCategory: false,
      amount: 600.0,
      projected: null,
      percentage: 0,
      isRecurring: false,
      children: [],
    },
    {
      id: "shopping",
      name: "Shopping",
      type: "expense",
      isCategory: false,
      amount: 193.93,
      projected: null,
      percentage: 1,
      isRecurring: false,
      children: [],
    },
    {
      id: "ridesharing",
      name: "Ridesharing",
      type: "expense",
      isCategory: false,
      amount: 6.96,
      projected: null,
      percentage: 0.1,
      isRecurring: false,
      children: [],
    },
    {
      id: "home-auto",
      name: "Home, Auto",
      type: "expense",
      isCategory: false,
      amount: 9041.48,
      projected: 9236.48,
      percentage: 69,
      isRecurring: true,
      children: [],
    },
    {
      id: "food",
      name: "Food",
      type: "expense",
      isCategory: true,
      amount: null,
      projected: null,
      percentage: 27,
      children: [
        {
          id: "coffee",
          name: "Coffee Shops",
          type: "expense",
          isCategory: false,
          amount: 3336.79,
          percentage: 26,
          isRecurring: false,
          children: [],
        },
        {
          id: "delivery",
          name: "Food Delivery",
          type: "expense",
          isCategory: false,
          amount: 29.24,
          percentage: 0.2,
          isRecurring: false,
          children: [],
        },
        {
          id: "groceries-cat",
          name: "Groceries Category",
          type: "expense",
          isCategory: true,
          amount: null,
          percentage: 1.6,
          children: [
            {
              id: "groceries-store-a",
              name: "Supermarket A",
              type: "expense",
              isCategory: false,
              amount: 45.5,
              percentage: 0.3,
              isRecurring: false,
            },
            {
              id: "groceries-store-b",
              name: "Supermarket B",
              type: "expense",
              isCategory: false,
              amount: 42.42,
              percentage: 0.3,
              isRecurring: false,
            },
          ],
        },
        {
          id: "restaurants",
          name: "Restaurants",
          type: "expense",
          isCategory: false,
          amount: 121.22,
          percentage: 0.9,
          isRecurring: false,
          children: [],
        },
      ],
    },
    {
      id: "alcohol",
      name: "Alcohol, Bars",
      type: "expense",
      isCategory: false,
      amount: 8.47,
      projected: null,
      percentage: 0.1,
      isRecurring: false,
      children: [],
    },
    {
      id: "savings-goal",
      name: "Ahorro Vacaciones",
      type: "goal",
      isCategory: false,
      amount: 1500.0,
      projected: 3000.0,
      percentage: 0,
      isRecurring: false,
      goalType: "monthly",
      children: [],
    },
    {
      id: "emergency-fund",
      name: "Fondo de Emergencia",
      type: "savings",
      isCategory: false,
      amount: 5000.0,
      projected: 10000.0,
      percentage: 0,
      isRecurring: false,
      children: [],
    },
  ]);

  const [showAddMenu, setShowAddMenu] = useState(null);
  const [hoveredRow, setHoveredRow] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false);

  const monthNames = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  const formatMonthYear = (date) => {
    return `${monthNames[date.getMonth()]} ${date.getFullYear()}`;
  };

  const changeMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const isCurrentMonth = () => {
    const now = new Date();
    return (
      currentDate.getMonth() === now.getMonth() &&
      currentDate.getFullYear() === now.getFullYear()
    );
  };

  const calculateCategoryTotal = (item) => {
    if (!item.isCategory || item.children.length === 0) {
      return item.amount || 0;
    }
    return item.children.reduce(
      (sum, child) => sum + calculateCategoryTotal(child),
      0
    );
  };

  const toggleCategory = (id) => {
    setExpandedCategories((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const addNewItem = (type, parentId = null) => {
    const newItem = {
      id: `item-${Date.now()}`,
      name:
        type === "category"
          ? "Nueva Categoría"
          : type === "goal"
          ? "Nueva Meta"
          : type === "savings"
          ? "Nuevo Apartado"
          : "Nueva Entrada",
      type: type === "category" ? "expense" : type,
      isCategory: type === "category",
      amount: type === "category" ? null : 0,
      projected: type === "goal" || type === "savings" ? 0 : null,
      percentage: 0,
      isRecurring: false,
      goalType: type === "goal" ? "monthly" : undefined,
      children: [],
    };

    if (parentId === null) {
      setData([...data, newItem]);
    } else {
      const addToParent = (items) => {
        return items.map((item) => {
          if (item.id === parentId) {
            return { ...item, children: [...item.children, newItem] };
          }
          if (item.children.length > 0) {
            return { ...item, children: addToParent(item.children) };
          }
          return item;
        });
      };
      setData(addToParent(data));
      setExpandedCategories([...expandedCategories, parentId]);
    }
    setShowAddMenu(null);
  };

  const toggleRecurring = (itemId, path = []) => {
    const toggleInItems = (items) => {
      return items.map((item) => {
        if (item.id === itemId) {
          return { ...item, isRecurring: !item.isRecurring };
        }
        if (item.children.length > 0) {
          return { ...item, children: toggleInItems(item.children) };
        }
        return item;
      });
    };
    setData(toggleInItems(data));
  };

  const deleteItem = (itemId) => {
    const deleteFromItems = (items) => {
      return items.filter((item) => {
        if (item.id === itemId) {
          return false;
        }
        if (item.children.length > 0) {
          item.children = deleteFromItems(item.children);
        }
        return true;
      });
    };
    setData(deleteFromItems(data));
  };

  const openItemSidebar = (item) => {
    setSelectedItem(item);
    setShowSidebar(true);
  };

  const closeSidebar = () => {
    setShowSidebar(false);
    setTimeout(() => setSelectedItem(null), 300);
  };

  const addTransaction = (transaction) => {
    // Aquí podrías agregar la lógica para guardar la transacción
    console.log("Nueva transacción:", transaction);
    // Por ahora solo cerramos el sidebar
    closeSidebar();
  };

  const filteredData = data.filter((item) => {
    if (filterView === "all") return true;
    return item.type === filterView;
  });

  const totalIncome = data
    .filter((d) => d.type === "income")
    .reduce((sum, d) => sum + calculateCategoryTotal(d), 0);
  const totalExpense = data
    .filter((d) => d.type === "expense")
    .reduce((sum, d) => sum + calculateCategoryTotal(d), 0);
  const balance = totalIncome - totalExpense;

  const AddButton = ({ parentId, level }) => {
    const isActive = showAddMenu?.parentId === parentId;

    return (
      <div className="relative">
        <button
          onClick={() => setShowAddMenu(isActive ? null : { parentId, level })}
          className="flex items-center gap-1 px-2 py-1 text-xs text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors"
        >
          <Plus size={14} />
          <span>Nuevo</span>
        </button>

        {isActive && (
          <div className="absolute left-0 top-8 z-10 bg-white border border-gray-200 rounded-lg shadow-lg py-1 min-w-[180px]">
            <button
              onClick={() => addNewItem("income", parentId)}
              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <TrendingUp size={16} className="text-green-600" />
              <span>Ingreso</span>
            </button>
            <button
              onClick={() => addNewItem("expense", parentId)}
              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <TrendingDown size={16} className="text-red-600" />
              <span>Gasto</span>
            </button>
            <div className="border-t border-gray-200 my-1"></div>
            <button
              onClick={() => addNewItem("category", parentId)}
              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <Folder size={16} className="text-blue-600" />
              <span>Categoría</span>
            </button>
            <div className="border-t border-gray-200 my-1"></div>
            <button
              onClick={() => addNewItem("goal", parentId)}
              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <Target size={16} className="text-purple-600" />
              <span>Meta</span>
            </button>
            <button
              onClick={() => addNewItem("savings", parentId)}
              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <Wallet size={16} className="text-indigo-600" />
              <span>Apartado/Cartera</span>
            </button>
          </div>
        )}
      </div>
    );
  };

  const RenderItem = ({ item, level = 0, parentId = null }) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedCategories.includes(item.id);
    const itemTotal = calculateCategoryTotal(item);
    const paddingLeft = `${level * 2 + 1.5}rem`;
    const isHovered = hoveredRow === item.id;

    return (
      <>
        <tr
          className={`hover:bg-gray-50 transition-colors ${
            level > 0 ? "bg-gray-50" : ""
          } ${!item.isCategory ? "cursor-pointer" : ""}`}
          onMouseEnter={() => setHoveredRow(item.id)}
          onMouseLeave={() => setHoveredRow(null)}
          onClick={() => !item.isCategory && openItemSidebar(item)}
        >
          <td className="py-4 px-6" style={{ paddingLeft }}>
            <div className="flex items-center gap-2">
              {hasChildren ? (
                <button
                  onClick={() => toggleCategory(item.id)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  {isExpanded ? (
                    <ChevronDown size={16} />
                  ) : (
                    <ChevronRight size={16} />
                  )}
                </button>
              ) : (
                <div className="w-4" />
              )}

              {item.isCategory ? (
                <Folder size={16} className="text-blue-500" />
              ) : item.type === "goal" ? (
                <Target size={16} className="text-purple-500" />
              ) : item.type === "savings" ? (
                <Wallet size={16} className="text-indigo-500" />
              ) : (
                <File size={16} className="text-gray-400" />
              )}

              <span
                className={`${
                  item.isCategory
                    ? "font-semibold text-gray-900"
                    : "font-medium text-gray-700"
                }`}
              >
                {item.name}
              </span>

              {!item.isCategory && isHovered && (
                <>
                  <button
                    onClick={() => toggleRecurring(item.id)}
                    className={`ml-2 p-1 rounded transition-colors ${
                      item.isRecurring
                        ? "bg-purple-100 text-purple-600 hover:bg-purple-200"
                        : "text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                    }`}
                    title={item.isRecurring ? "Recurrente" : "Hacer recurrente"}
                  >
                    <Repeat size={14} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteItem(item.id);
                    }}
                    className="ml-1 p-1 rounded text-gray-400 hover:bg-red-50 hover:text-red-600 transition-colors"
                    title="Eliminar"
                  >
                    <Trash2 size={14} />
                  </button>
                </>
              )}

              {!item.isCategory && item.isRecurring && !isHovered && (
                <span className="ml-2 text-purple-600" title="Recurrente">
                  <Repeat size={14} />
                </span>
              )}

              {isHovered && item.isCategory && (
                <>
                  <AddButton parentId={item.id} level={level + 1} />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteItem(item.id);
                    }}
                    className="ml-1 p-1 rounded text-gray-400 hover:bg-red-50 hover:text-red-600 transition-colors"
                    title="Eliminar categoría"
                  >
                    <Trash2 size={14} />
                  </button>
                </>
              )}
            </div>
          </td>
          <td className="py-4 px-6">
            {item.isCategory ? (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                <Folder size={12} />
                Categoría
              </span>
            ) : item.type === "goal" ? (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                <Target size={12} />
                Meta{" "}
                {/* {item.goalType === "weekly"
                  ? "Semanal"
                  : item.goalType === "monthly"
                  ? "Mensual"
                  : "Anual"} */}
              </span>
            ) : item.type === "savings" ? (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                <Wallet size={12} />
                Apartado
              </span>
            ) : (
              <span
                className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                  item.type === "income"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {item.type === "income" ? (
                  <>
                    <TrendingUp size={12} />
                    Ingreso
                  </>
                ) : (
                  <>
                    <TrendingDown size={12} />
                    Gasto
                  </>
                )}
              </span>
            )}
          </td>
          <td className="py-4 px-6 text-right">
            <span
              className={`${
                item.isCategory ? "font-bold text-gray-900" : "font-semibold"
              } ${
                !item.isCategory && item.type === "income"
                  ? "text-green-600"
                  : !item.isCategory && item.type === "expense"
                  ? "text-red-600"
                  : !item.isCategory &&
                    (item.type === "goal" || item.type === "savings")
                  ? "text-purple-600"
                  : "text-gray-900"
              }`}
            >
              {item.projected ? `S/ ${item.projected.toFixed(2)}` : "—"}
            </span>
          </td>
          <td className="py-4 px-6 text-right">
            <span
              className={`${
                item.isCategory ? "font-bold text-gray-900" : "font-semibold"
              } ${
                !item.isCategory && item.type === "income"
                  ? "text-green-600"
                  : !item.isCategory && item.type === "expense"
                  ? "text-red-600"
                  : !item.isCategory &&
                    (item.type === "goal" || item.type === "savings")
                  ? "text-purple-600"
                  : "text-gray-900"
              }`}
            >
              S/ {itemTotal.toFixed(2)}
              {item.isCategory && (
                <span className="text-xs text-gray-500 ml-1">(suma)</span>
              )}
            </span>
          </td>
          <td className="py-4 px-6 text-right text-gray-900 font-medium">
            {item.percentage > 0 ? `${item.percentage}%` : "—"}
          </td>
          <td className="py-4 px-6">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full ${
                  item.isCategory
                    ? "bg-blue-500"
                    : item.type === "income"
                    ? "bg-green-500"
                    : item.type === "expense"
                    ? "bg-red-500"
                    : item.type === "goal" || item.type === "savings"
                    ? "bg-purple-500"
                    : "bg-gray-500"
                }`}
                style={{ width: `${Math.min(item.percentage, 100)}%` }}
              />
            </div>
          </td>
        </tr>

        {isExpanded &&
          hasChildren &&
          item.children.map((child) => (
            <RenderItem
              key={child.id}
              item={child}
              level={level + 1}
              parentId={item.id}
            />
          ))}
      </>
    );
  };

  const TransactionSidebar = () => {
    const [formData, setFormData] = useState({
      description: "",
      amount: "",
      date: new Date().toISOString().split("T")[0],
      notes: "",
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      addTransaction({
        ...formData,
        itemId: selectedItem.id,
        itemName: selectedItem.name,
      });
      setFormData({
        description: "",
        amount: "",
        date: new Date().toISOString().split("T")[0],
        notes: "",
      });
    };

    if (!selectedItem) return null;

    return (
      <>
        {/* Overlay */}
        <div
          className={`fixed inset-0 bg-black transition-opacity duration-300 z-40 ${
            showSidebar ? "opacity-50" : "opacity-0 pointer-events-none"
          }`}
          onClick={closeSidebar}
        ></div>

        {/* Sidebar */}
        <div
          className={`fixed right-0 top-0 h-full w-96 bg-white shadow-2xl z-50 transform transition-transform duration-300 ${
            showSidebar ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Nueva Transacción
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {selectedItem.name}
                  </p>
                </div>
                <button
                  onClick={closeSidebar}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X size={20} className="text-gray-500" />
                </button>
              </div>

              <div
                className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium ${
                  selectedItem.type === "income"
                    ? "bg-green-100 text-green-800"
                    : selectedItem.type === "expense"
                    ? "bg-red-100 text-red-800"
                    : selectedItem.type === "goal"
                    ? "bg-purple-100 text-purple-800"
                    : selectedItem.type === "savings"
                    ? "bg-indigo-100 text-indigo-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {selectedItem.type === "income" ? (
                  <>
                    <TrendingUp size={12} />
                    <span>Ingreso</span>
                  </>
                ) : selectedItem.type === "expense" ? (
                  <>
                    <TrendingDown size={12} />
                    <span>Gasto</span>
                  </>
                ) : selectedItem.type === "goal" ? (
                  <>
                    <Target size={12} />
                    <span>Meta</span>
                  </>
                ) : (
                  <>
                    <Wallet size={12} />
                    <span>Apartado</span>
                  </>
                )}
              </div>
            </div>

            {/* Form */}
            <div className="flex-1 overflow-y-auto p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {selectedItem.type === "goal" ||
                    selectedItem.type === "savings"
                      ? "Descripción del aporte *"
                      : "Descripción *"}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    placeholder={
                      selectedItem.type === "goal"
                        ? "Ej: Aporte semanal"
                        : selectedItem.type === "savings"
                        ? "Ej: Depósito mensual"
                        : "Ej: Compra supermercado"
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {selectedItem.type === "goal" ||
                    selectedItem.type === "savings"
                      ? "Monto a aportar (S/) *"
                      : "Monto (S/) *"}
                  </label>
                  <input
                    type="number"
                    required
                    step="0.01"
                    min="0"
                    value={formData.amount}
                    onChange={(e) =>
                      setFormData({ ...formData, amount: e.target.value })
                    }
                    placeholder="0.00"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Fecha *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) =>
                      setFormData({ ...formData, date: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Notas
                  </label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) =>
                      setFormData({ ...formData, notes: e.target.value })
                    }
                    placeholder="Información adicional..."
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  />
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <button
                    type="submit"
                    className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-colors ${
                      selectedItem.type === "income"
                        ? "bg-green-600 hover:bg-green-700"
                        : selectedItem.type === "expense"
                        ? "bg-red-600 hover:bg-red-700"
                        : selectedItem.type === "goal" ||
                          selectedItem.type === "savings"
                        ? "bg-purple-600 hover:bg-purple-700"
                        : "bg-blue-600 hover:bg-blue-700"
                    }`}
                  >
                    {selectedItem.type === "goal" ||
                    selectedItem.type === "savings"
                      ? "Registrar Aporte"
                      : "Agregar Transacción"}
                  </button>
                </div>
              </form>
            </div>

            {/* Footer info */}
            <div className="p-6 border-t border-gray-200 bg-gray-50">
              <div className="text-sm text-gray-600">
                {selectedItem.type === "goal" ||
                selectedItem.type === "savings" ? (
                  <>
                    <div className="flex justify-between mb-2">
                      <span>Ahorrado:</span>
                      <span className="font-semibold text-purple-600">
                        S/ {selectedItem.amount?.toFixed(2) || "0.00"}
                      </span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span>Meta:</span>
                      <span className="font-semibold">
                        S/ {selectedItem.projected?.toFixed(2) || "0.00"}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                      <div
                        className="h-2 bg-purple-500 rounded-full transition-all"
                        style={{
                          width: `${Math.min(
                            (selectedItem.amount / selectedItem.projected) *
                              100,
                            100
                          )}%`,
                        }}
                      />
                    </div>
                    <div className="text-xs text-center text-gray-500">
                      {(
                        (selectedItem.amount / selectedItem.projected) *
                        100
                      ).toFixed(1)}
                      % completado
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex justify-between mb-2">
                      <span>Total actual:</span>
                      <span className="font-semibold">
                        S/ {selectedItem.amount?.toFixed(2) || "0.00"}
                      </span>
                    </div>
                    {selectedItem.projected && (
                      <div className="flex justify-between text-gray-500">
                        <span>Proyectado:</span>
                        <span>S/ {selectedItem.projected.toFixed(2)}</span>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6 bg-gray-50">
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6 border-b border-gray-200">
          {/* Selector de mes */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <button
                onClick={() => changeMonth(-1)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                title="Mes anterior"
              >
                <ChevronLeft size={20} className="text-gray-600" />
              </button>

              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-bold text-gray-900">
                  {formatMonthYear(currentDate)}
                </h2>
                {isCurrentMonth() && (
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                    Actual
                  </span>
                )}
              </div>

              <button
                onClick={() => changeMonth(1)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                title="Mes siguiente"
              >
                <ChevronRight size={20} className="text-gray-600" />
              </button>

              {!isCurrentMonth() && (
                <button
                  onClick={() => setCurrentDate(new Date())}
                  className="ml-2 px-3 py-1.5 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors font-medium"
                >
                  Ir a hoy
                </button>
              )}
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setFilterView("all")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filterView === "all"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Todos
              </button>
              <button
                onClick={() => setFilterView("income")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filterView === "income"
                    ? "bg-green-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Ingresos
              </button>
              <button
                onClick={() => setFilterView("expense")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filterView === "expense"
                    ? "bg-red-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Gastos
              </button>
            </div>
          </div>

          {/* Cards de resumen */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-green-50 rounded-lg p-4">
              <div className="flex items-center gap-2 text-green-700 mb-1">
                <TrendingUp size={18} />
                <span className="text-sm font-medium">Ingresos</span>
              </div>
              <div className="text-2xl font-bold text-green-900">
                S/ {totalIncome.toFixed(2)}
              </div>
            </div>

            <div className="bg-red-50 rounded-lg p-4">
              <div className="flex items-center gap-2 text-red-700 mb-1">
                <TrendingDown size={18} />
                <span className="text-sm font-medium">Gastos</span>
              </div>
              <div className="text-2xl font-bold text-red-900">
                S/ {totalExpense.toFixed(2)}
              </div>
            </div>

            <div
              className={`rounded-lg p-4 ${
                balance >= 0 ? "bg-blue-50" : "bg-orange-50"
              }`}
            >
              <div
                className={`text-sm font-medium mb-1 ${
                  balance >= 0 ? "text-blue-700" : "text-orange-700"
                }`}
              >
                Balance
              </div>
              <div
                className={`text-2xl font-bold ${
                  balance >= 0 ? "text-blue-900" : "text-orange-900"
                }`}
              >
                S/ {balance.toFixed(2)}
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nombre
                </th>
                <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tipo
                </th>
                <th className="text-right py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Proyectado
                </th>
                <th className="text-right py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actividad
                </th>
                <th className="text-right py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  % del Total
                </th>
                <th className="py-3 px-6">
                  <div className="w-full text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Visualización
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredData.map((item) => (
                <RenderItem key={item.id} item={item} level={0} />
              ))}
              <tr>
                <td colSpan={6} className="py-2 px-6">
                  <AddButton parentId={null} level={0} />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Sidebar de transacciones */}
      <TransactionSidebar />
    </div>
  );
};

export default FinanceTable;
