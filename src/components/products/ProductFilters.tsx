'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiFilter, FiX, FiChevronDown } from 'react-icons/fi';
import Button from '@/components/ui/Button';
import type { ProductFilter, SortOption } from '@/types/product';

/**
 * کامپوننت ProductFilters - فیلتر و مرتب‌سازی محصولات
 * منطبق بر ساختار products-filter در products.html
 */
interface ProductFiltersProps {
  onFilterChange: (filter: ProductFilter) => void;
  onSortChange: (sort: SortOption) => void;
  totalProducts: number;
}

const ProductFilters = ({
  onFilterChange,
  onSortChange,
  totalProducts
}: ProductFiltersProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedThickness, setSelectedThickness] = useState('');
  const [selectedSort, setSelectedSort] = useState<SortOption>('popular');

  // دسته‌بندی‌ها
  const categories = [
    { id: '', name: 'همه محصولات' },
    { id: 'mdf-white', name: 'MDF سفید' },
    { id: 'mdf-raw', name: 'MDF خام' },
    { id: 'mdf-scratch', name: 'MDF ضدخش' },
    { id: 'mdf-moisture', name: 'MDF ضد رطوبت' },
  ];

  // ضخامت‌ها
  const thicknesses = [6, 8, 12, 16, 18, 25];

  // گزینه‌های مرتب‌سازی
  const sortOptions: { value: SortOption; label: string }[] = [
    { value: 'popular', label: 'محبوب‌ترین' },
    { value: 'newest', label: 'جدیدترین' },
    { value: 'price-low', label: 'قیمت: کم به زیاد' },
    { value: 'price-high', label: 'قیمت: زیاد به کم' },
  ];

  // اعمال فیلتر
  const applyFilter = () => {
    onFilterChange({
      category: selectedCategory || undefined,
      thickness: selectedThickness ? [parseInt(selectedThickness)] : undefined,
    });
    setIsOpen(false);
  };

  // پاک کردن فیلترها
  const resetFilters = () => {
    setSelectedCategory('');
    setSelectedThickness('');
    onFilterChange({});
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
      {/* ===== هدر فیلتر ===== */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-brand-primary/10 rounded-lg flex items-center justify-center">
            <FiFilter className="text-brand-primary" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">فیلتر محصولات</h3>
            <p className="text-sm text-gray-500">
              {totalProducts.toLocaleString('fa-IR')} محصول یافت شد
            </p>
          </div>
        </div>
        
        {/* دکمه فیلتر در موبایل */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden flex items-center gap-2 text-gray-700 hover:text-brand-primary transition-colors"
        >
          <span className="text-sm font-medium">فیلتر</span>
          <FiChevronDown className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {/* ===== محتوای فیلتر ===== */}
      <AnimatePresence>
        <motion.div
          initial={false}
          animate={{ height: isOpen ? 'auto' : 'auto' }}
          className="lg:block"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* دسته‌بندی */}
            <div className="lg:col-span-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                دسته‌بندی
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary outline-none transition-all bg-white"
              >
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* ضخامت */}
            <div className="lg:col-span-3">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ضخامت (میلی‌متر)
              </label>
              <select
                value={selectedThickness}
                onChange={(e) => setSelectedThickness(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary outline-none transition-all bg-white"
              >
                <option value="">همه ضخامت‌ها</option>
                {thicknesses.map((t) => (
                  <option key={t} value={t}>
                    {t} mm
                  </option>
                ))}
              </select>
            </div>

            {/* مرتب‌سازی */}
            <div className="lg:col-span-3">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                مرتب‌سازی بر اساس
              </label>
              <select
                value={selectedSort}
                onChange={(e) => {
                  setSelectedSort(e.target.value as SortOption);
                  onSortChange(e.target.value as SortOption);
                }}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary outline-none transition-all bg-white"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* دکمه‌ها */}
            <div className="lg:col-span-2 flex items-end gap-3">
              <Button
                onClick={applyFilter}
                variant="primary"
                size="md"
                className="flex-1"
              >
                اعمال
              </Button>
              {(selectedCategory || selectedThickness) && (
                <Button
                  onClick={resetFilters}
                  variant="ghost"
                  size="md"
                  className="px-3"
                >
                  <FiX size={18} />
                </Button>
              )}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default ProductFilters;