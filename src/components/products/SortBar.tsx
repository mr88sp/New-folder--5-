'use client';

import { useState } from 'react';
import { FiChevronDown, FiGrid, FiList } from 'react-icons/fi';
import type { SortOption } from '@/types/product';

/**
 * کامپوننت SortBar - نوار مرتب‌سازی و نمایش
 * منطبق بر ساختار sort-bar در products.html
 */
interface SortBarProps {
  totalProducts: number;
  currentSort: SortOption;
  onSortChange: (sort: SortOption) => void;
  viewMode?: 'grid' | 'list';
  onViewModeChange?: (mode: 'grid' | 'list') => void;
}

const SortBar = ({
  totalProducts,
  currentSort,
  onSortChange,
  viewMode: controlledViewMode,
  onViewModeChange
}: SortBarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [uncontrolledViewMode, setUncontrolledViewMode] = useState<'grid' | 'list'>('grid');
  const viewMode = controlledViewMode ?? uncontrolledViewMode;

  const sortOptions: { value: SortOption; label: string }[] = [
    { value: 'popular', label: 'محبوب‌ترین' },
    { value: 'newest', label: 'جدیدترین' },
    { value: 'price-low', label: 'قیمت: کم به زیاد' },
    { value: 'price-high', label: 'قیمت: زیاد به کم' },
  ];

  const currentSortLabel = sortOptions.find(opt => opt.value === currentSort)?.label;

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
      {/* تعداد محصولات */}
      <div className="text-sm text-gray-600">
        <span className="font-bold text-brand-primary">
          {totalProducts.toLocaleString('fa-IR')}
        </span> محصول یافت شد
      </div>

      {/* کنترل‌ها */}
      <div className="flex items-center gap-3">
        {/* دکمه‌های نمایش */}
        <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-button">
          <button
            onClick={() => (onViewModeChange ? onViewModeChange('grid') : setUncontrolledViewMode('grid'))}
            className={`p-2 rounded-button transition-colors ${
              viewMode === 'grid'
                ? 'bg-white text-brand-primary shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            aria-label="نمایش گرید"
          >
            <FiGrid size={18} />
          </button>
          <button
            onClick={() => (onViewModeChange ? onViewModeChange('list') : setUncontrolledViewMode('list'))}
            className={`p-2 rounded-button transition-colors ${
              viewMode === 'list'
                ? 'bg-white text-brand-primary shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            aria-label="نمایش لیست"
          >
            <FiList size={18} />
          </button>
        </div>

        {/* مرتب‌سازی - دسکتاپ */}
        <div className="hidden sm:flex items-center gap-2">
          <span className="text-sm text-gray-600">مرتب‌سازی:</span>
          <select
            value={currentSort}
            onChange={(e) => onSortChange(e.target.value as SortOption)}
            className="px-4 py-2 border border-gray-300 rounded-button text-sm focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary outline-none bg-white"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* مرتب‌سازی - موبایل */}
        <div className="relative sm:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-button text-sm"
          >
            <span>مرتب‌سازی: {currentSortLabel}</span>
            <FiChevronDown className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </button>

          {isOpen && (
            <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded-button shadow-lg z-50">
              {sortOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    onSortChange(option.value);
                    setIsOpen(false);
                  }}
                  className={`block w-full text-right px-4 py-3 text-sm hover:bg-gray-50 transition-colors ${
                    currentSort === option.value
                      ? 'text-brand-primary font-medium bg-brand-primary/5'
                      : 'text-gray-700'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SortBar;
