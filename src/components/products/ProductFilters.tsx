"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiFilter, FiX, FiChevronDown } from "react-icons/fi";
import Button from "@/components/ui/Button";
import type { ProductFilter, SortOption } from "@/types/product";

/**
 * کامپوننت ProductFilters - فیلتر و مرتب‌سازی محصولات
 * منطبق بر ساختار products-filter در products.html
 */
interface ProductFiltersProps {
  onFilterChange: (filter: ProductFilter) => void;
  onSortChange: (sort: SortOption) => void;
  totalProducts: number;
  categories?: any[];
  currentFilter?: any;
}

const ProductFilters = ({
  onFilterChange,
  onSortChange,
  totalProducts,
  categories: initialCategories = [],
  currentFilter,
}: ProductFiltersProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(
    currentFilter?.category !== "all" ? currentFilter?.category : ""
  );
  const [selectedThickness, setSelectedThickness] = useState(
    currentFilter?.thickness && currentFilter.thickness.length > 0
      ? String(currentFilter.thickness[0])
      : ""
  );
  const [selectedSort, setSelectedSort] = useState<SortOption>(
    currentFilter?.sort || "newest"
  );

  // Sync with props
  useEffect(() => {
    if (currentFilter) {
      if (currentFilter.category && currentFilter.category !== "all") {
        setSelectedCategory(currentFilter.category);
      } else {
        setSelectedCategory("");
      }

      if (currentFilter.thickness && currentFilter.thickness.length > 0) {
        setSelectedThickness(String(currentFilter.thickness[0]));
      } else {
        setSelectedThickness("");
      }

      if (currentFilter.sort) {
        setSelectedSort(currentFilter.sort);
      }
    }
  }, [currentFilter]);

  // دسته‌بندی‌ها با بررسی آرایه بودن
  const safeInitialCategories = Array.isArray(initialCategories)
    ? initialCategories
    : [];
  const categories = [
    { id: "", name: "همه محصولات" },
    ...safeInitialCategories.map((cat: any) => ({
      id: String(cat.slug || cat.id || cat.name || ""),
      name: cat.name || cat.title || cat.slug || "بدون عنوان",
    })),
  ];

  // ضخامت‌ها
  const thicknesses = [6, 8, 12, 16, 18, 25];

  // گزینه‌های مرتب‌سازی
  const sortOptions: { value: SortOption; label: string }[] = [
    { value: "popular", label: "محبوب‌ترین" },
    { value: "newest", label: "جدیدترین" },
    { value: "price-low", label: "قیمت: کم به زیاد" },
    { value: "price-high", label: "قیمت: زیاد به کم" },
  ];

  // اعمال فیلتر
  const applyFilter = () => {
    onFilterChange({
      category: selectedCategory === "" ? "all" : selectedCategory,
      thickness: selectedThickness ? [parseInt(selectedThickness)] : undefined,
      page: 1,
    });
    setIsOpen(false);
  };

  // پاک کردن فیلترها
  const resetFilters = () => {
    setSelectedCategory("");
    setSelectedThickness("");
    onFilterChange({
      category: "all",
      thickness: undefined,
      page: 1,
    });
  };

  return (
    <div className="bg-white rounded-card shadow-md p-4 sm:p-6 mb-8">
      {/* ===== هدر فیلتر ===== */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-brand-primary/10 rounded-button flex items-center justify-center">
            <FiFilter className="text-brand-primary" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">فیلتر محصولات</h3>
            <p className="text-sm text-gray-500">
              {totalProducts.toLocaleString("fa-IR")} محصول یافت شد
            </p>
          </div>
        </div>

        {/* دکمه فیلتر در موبایل */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden w-full sm:w-auto flex items-center justify-center gap-2 text-gray-700 hover:text-brand-primary transition-colors border border-gray-200 rounded-button px-3 py-2"
        >
          <span className="text-sm font-medium">
            {isOpen ? "بستن فیلتر" : "نمایش فیلتر"}
          </span>
          <FiChevronDown
            className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
          />
        </button>
      </div>

      {/* ===== محتوای فیلتر ===== */}
      <div className="hidden lg:block">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 pt-4 border-t border-gray-100 lg:border-t-0 lg:pt-0">
          {/* دسته‌بندی */}
          <div className="lg:col-span-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              دسته‌بندی
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-button focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary outline-none transition-all bg-white"
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
              className="w-full px-4 py-2.5 border border-gray-300 rounded-button focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary outline-none transition-all bg-white"
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
              className="w-full px-4 py-2.5 border border-gray-300 rounded-button focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary outline-none transition-all bg-white"
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
      </div>

      {/* فیلتر موبایل */}
      <div className="lg:hidden">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                {/* دسته‌بندی */}
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    دسته‌بندی
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-button focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary outline-none transition-all bg-white"
                  >
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* ضخامت */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ضخامت (میلی‌متر)
                  </label>
                  <select
                    value={selectedThickness}
                    onChange={(e) => setSelectedThickness(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-button focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary outline-none transition-all bg-white"
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
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    مرتب‌سازی بر اساس
                  </label>
                  <select
                    value={selectedSort}
                    onChange={(e) => {
                      setSelectedSort(e.target.value as SortOption);
                      onSortChange(e.target.value as SortOption);
                    }}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-button focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary outline-none transition-all bg-white"
                  >
                    {sortOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* دکمه‌ها */}
                <div className="flex gap-3 sm:col-span-2">
                  <Button
                    onClick={applyFilter}
                    variant="primary"
                    size="md"
                    className="flex-1"
                  >
                    اعمال فیلتر
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
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ProductFilters;
