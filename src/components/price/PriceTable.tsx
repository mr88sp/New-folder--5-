'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown, FiChevronUp, FiShoppingCart } from 'react-icons/fi';
import Button from '@/components/ui/Button';
import { formatPrice } from '@/utils/format.util';
import type { PriceCategory } from '@/types/price';

/**
 * کامپوننت PriceTable - جدول قیمت محصولات
 * منطبق بر ساختار price-table در price.html
 */
interface PriceTableProps {
  category: PriceCategory;
  defaultOpen?: boolean;
}

const PriceTable = ({ category, defaultOpen = false }: PriceTableProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  // وضعیت موجودی
  const getStockBadge = (stock: string) => {
    switch (stock) {
      case 'موجود':
        return (
          <span className="inline-flex items-center gap-1 text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">
            <span className="w-1.5 h-1.5 bg-green-600 rounded-full"></span>
            موجود
          </span>
        );
      case 'محدود':
        return (
          <span className="inline-flex items-center gap-1 text-xs text-orange-600 bg-orange-50 px-2 py-1 rounded-full">
            <span className="w-1.5 h-1.5 bg-orange-600 rounded-full"></span>
            محدود
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 text-xs text-red-600 bg-red-50 px-2 py-1 rounded-full">
            <span className="w-1.5 h-1.5 bg-red-600 rounded-full"></span>
            ناموجود
          </span>
        );
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
      {/* هدر دسته‌بندی */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between p-6 bg-gradient-to-r from-gray-50 to-white cursor-pointer hover:from-gray-100 transition-colors"
      >
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-1">
            {category.name}
          </h3>
          <p className="text-sm text-gray-500">
            {category.products.length} محصول
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-500">
            آخرین بروزرسانی: ۱۴۰۳/۱۰/۲۵
          </span>
          {isOpen ? (
            <FiChevronUp className="text-gray-400" size={24} />
          ) : (
            <FiChevronDown className="text-gray-400" size={24} />
          )}
        </div>
      </div>

      {/* جدول محصولات */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="border-t border-gray-200"
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">
                      ضخامت (mm)
                    </th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">
                      ابعاد (mm)
                    </th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">
                      کارخانه
                    </th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">
                      قیمت واحد
                    </th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">
                      قیمت متر مربع
                    </th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">
                      موجودی
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">
                      سفارش
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {category.products.map((product, index) => (
                    <motion.tr
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                        {product.thickness}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {product.dimensions}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {product.factory}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 font-bold">
                        {formatPrice(product.unitPrice)}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {formatPrice(product.squareMeterPrice)}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        {getStockBadge(product.stock)}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <Button
                          href={`https://wa.me/989123456789?text=${encodeURIComponent(
                            `سلام،\nقیمت و موجودی ${category.name} با ضخامت ${product.thickness}mm و ابعاد ${product.dimensions} را می‌خواستم.`
                          )}`}
                          variant="secondary"
                          size="sm"
                          className="inline-flex items-center gap-1"
                          target="_blank"
                        >
                          <FiShoppingCart size={14} />
                          <span>استعلام</span>
                        </Button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PriceTable;