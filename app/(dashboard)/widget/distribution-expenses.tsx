import { db } from "@/database/client";
import { categoryTable, transactionTable } from "@/database/schema";
import {
  desc,
  eq,
  getTableColumns,
  sum,
  sql,
  gte,
  lte,
  and,
  gt,
  lt,
} from "drizzle-orm";

export async function DistributionExpenses() {
  return (
    <>
      <div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">🍔 Comida</span>
          <span className="text-sm font-semibold text-gray-900">
            US$ 245,00 (32%)
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-orange-500 h-2 rounded-full"
            style={{ width: "32%" }}
          ></div>
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">
            🚗 Transporte
          </span>
          <span className="text-sm font-semibold text-gray-900">
            US$ 120,50 (16%)
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-500 h-2 rounded-full"
            style={{ width: "16%" }}
          ></div>
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">
            🎮 Entretenimiento
          </span>
          <span className="text-sm font-semibold text-gray-900">
            US$ 175,00 (23%)
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-purple-500 h-2 rounded-full"
            style={{ width: "23%" }}
          ></div>
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">
            🏠 Servicios
          </span>
          <span className="text-sm font-semibold text-gray-900">
            US$ 309,50 (41%)
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-green-500 h-2 rounded-full"
            style={{ width: "41%" }}
          ></div>
        </div>
      </div>
    </>
  );
}
