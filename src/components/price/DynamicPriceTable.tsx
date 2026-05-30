"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import type { DynamicTable } from "@/types/price";

interface DynamicPriceTableProps {
  table: DynamicTable;
  defaultOpen?: boolean;
}

const DynamicPriceTable = ({
  table,
  defaultOpen = false,
}: DynamicPriceTableProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const formatPrice = (price: string) => {
    if (!price) return "-";
    // Remove non-numeric chars just in case, then format
    const num = parseInt(price.replace(/[^0-9]/g, ""), 10);
    if (isNaN(num)) return price;
    return num.toLocaleString("fa-IR");
  };

  const renderCell = (col: any, value: string) => {
    if (!value) return "-";

    if (col.type === "price") {
      return (
        <span className="font-medium text-gray-900">
          {formatPrice(value)}{" "}
          <span className="text-xs text-gray-500 font-normal">تومان</span>
        </span>
      );
    }

    if (col.type === "status") {
      let colorClass = "bg-gray-100 text-gray-800";
      if (value === "موجود") colorClass = "bg-green-100 text-green-800";
      else if (value === "ناموجود") colorClass = "bg-red-100 text-red-800";
      else if (value === "محدود") colorClass = "bg-yellow-100 text-yellow-800";
      else if (value === "تماس بگیرید") colorClass = "bg-blue-100 text-blue-800";

      return (
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colorClass}`}
        >
          {value}
        </span>
      );
    }
    
    if (col.type === "select") {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-button bg-blue-50 text-blue-700 text-sm border border-blue-100">
          {value}
        </span>
      );
    }

    return value;
  };

  return (
    <div className="bg-white rounded-card shadow-lg overflow-hidden mb-6 border border-gray-100">
      {/* Table Header / Title */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between p-6 bg-gradient-to-r from-gray-50 to-white cursor-pointer hover:from-gray-100 transition-colors select-none"
      >
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-1 flex items-center gap-2">
            <span className="w-1 h-6 bg-blue-600 rounded-full inline-block"></span>
            {table.title}
          </h3>
          <p className="text-sm text-gray-500 mr-3">
            {table.rows?.length || 0} ردیف
          </p>
        </div>
        <div className="flex items-center gap-3">
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <FiChevronDown className="text-gray-400" size={24} />
          </motion.div>
        </div>
      </div>

      {/* Table Content */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="border-t border-gray-200"
          >
            <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full">
                <thead className="bg-gray-50/80">
                  <tr>
                    {table.columns.map((col) => (
                      <th
                        key={col.id}
                        className="px-6 py-4 text-right text-sm font-bold text-gray-700 whitespace-nowrap border-b border-gray-200 first:pr-8"
                      >
                        {col.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 bg-white">
                  {table.rows.map((row, idx) => (
                    <tr
                      key={row.id}
                      className={`hover:bg-blue-50/30 transition-colors ${
                        idx % 2 === 0 ? "bg-white" : "bg-gray-50/30"
                      }`}
                    >
                      {table.columns.map((col) => (
                        <td
                          key={`${row.id}-${col.id}`}
                          className="px-6 py-4 text-sm text-gray-600 whitespace-nowrap first:pr-8"
                        >
                          {renderCell(col, row.cells[col.id] || "")}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {table.rows.length === 0 && (
              <div className="p-8 text-center text-gray-500 bg-gray-50">
                اطلاعاتی برای نمایش وجود ندارد.
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DynamicPriceTable;
