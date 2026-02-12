'use client';

import { useState } from 'react';
import { FiFilter, FiChevronDown } from 'react-icons/fi';
import Button from '@/components/ui/Button';

/**
 * کامپوننت PriceFilter - فیلتر جداول قیمت
 * منطبق بر ساختار price-filter در price.html
 */
interface PriceFilterProps {
  onFilterChange: (filter: any) => void;
}

const PriceFilter = ({ onFilterChange }: PriceFilterProps) => {
  const [selectedType, setSelectedType] = useState('');
  const [selectedThickness, setSelectedThickness] = useState('');
  const [selectedSize, setSelectedSize] = useState('');

  // نوع ورق
  const productTypes = [
    { id: '', name: 'همه انواع' },
    { id: 'white', name: 'MDF سفید' },
    { id: 'raw', name: 'MDF خام' },
    { id: 'scratch', name: 'MDF ضدخش' },
    { id: 'moisture', name: 'MDF ضد رطوبت' },
  ];

  // ضخامت‌ها
  const thicknesses = [
    { id: '', name: 'همه ضخامت‌ها' },
    { id: '6', name: '6 میلی‌متر' },
    { id: '8', name: '8 میلی‌متر' },
    { id: '12', name: '12 میلی‌متر' },
    { id: '16', name: '16 میلی‌متر' },
    { id: '18', name: '18 میلی‌متر' },
    { id: '25', name: '25 میلی‌متر' },
  ];

  // ابعاد
  const sizes = [
    { id: '', name: 'همه سایزها' },
    { id: '2440x1220', name: '2440×1220 میلی‌متر' },
    { id: '2800x2070', name: '2800×2070 میلی‌متر' },
    { id: '3660x1830', name: '3660×1830 میلی‌متر' },
  ];

  const applyFilter = () => {
    onFilterChange({
      type: selectedType,
      thickness: selectedThickness,
      size: selectedSize,
    });
  };

  const resetFilter = () => {
    setSelectedType('');
    setSelectedThickness('');
    setSelectedSize('');
    onFilterChange({});
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-brand-primary/10 rounded-lg flex items-center justify-center">
          <FiFilter className="text-brand-primary" size={20} />
        </div>
        <h3 className="text-lg font-bold text-gray-900">فیلتر قیمت</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* نوع ورق */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            نوع ورق
          </label>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary outline-none transition-all bg-white"
          >
            {productTypes.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
          </select>
        </div>

        {/* ضخامت */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            ضخامت
          </label>
          <select
            value={selectedThickness}
            onChange={(e) => setSelectedThickness(e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary outline-none transition-all bg-white"
          >
            {thicknesses.map((thickness) => (
              <option key={thickness.id} value={thickness.id}>
                {thickness.name}
              </option>
            ))}
          </select>
        </div>

        {/* ابعاد */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            سایز
          </label>
          <select
            value={selectedSize}
            onChange={(e) => setSelectedSize(e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary outline-none transition-all bg-white"
          >
            {sizes.map((size) => (
              <option key={size.id} value={size.id}>
                {size.name}
              </option>
            ))}
          </select>
        </div>

        {/* دکمه‌ها */}
        <div className="flex items-end gap-3">
          <Button onClick={applyFilter} variant="primary" className="flex-1">
            اعمال فیلتر
          </Button>
          {(selectedType || selectedThickness || selectedSize) && (
            <Button onClick={resetFilter} variant="ghost" className="px-4">
              حذف
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PriceFilter;