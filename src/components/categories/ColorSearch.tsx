'use client';

import { useState, useEffect } from 'react';
import { FiSearch, FiX, FiLayers } from 'react-icons/fi';
import { useDebounce } from '@/hooks/useDebounce';

/**
 * کامپوننت ColorSearch - جستجوی رنگ‌ها
 * منطبق بر ساختار color-search در categories.html
 */
interface ColorSearchProps {
  siteContent: any;
  searchTerm: string;
  onSearch: (term: string) => void;
}

const ColorSearch = ({ siteContent, searchTerm, onSearch }: ColorSearchProps) => {
  const [localTerm, setLocalTerm] = useState(searchTerm);
  const debouncedTerm = useDebounce(localTerm, 500);

  useEffect(() => {
    setLocalTerm(searchTerm);
  }, [searchTerm]);

  useEffect(() => {
    if (debouncedTerm !== searchTerm) {
      onSearch(debouncedTerm);
    }
  }, [debouncedTerm, onSearch, searchTerm]);

  const clearSearch = () => {
    setLocalTerm('');
    onSearch('');
  };

  return (
    <div className="bg-white rounded-card shadow-lg p-6 mb-8">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-brand-primary/10 rounded-button flex items-center justify-center">
            <FiLayers className="text-brand-primary text-xl" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">{siteContent.color_search_title || 'کاتالوگ رنگ‌ها'}</h3>
            <p className="text-sm text-gray-500">{siteContent.color_search_subtitle || '۵۲ رنگ متنوع برای پروژه شما'}</p>
          </div>
        </div>
        <span className="bg-brand-primary/10 text-brand-primary px-4 py-2 rounded-full text-sm font-medium">
          {siteContent.color_search_count_label || '۵۲ رنگ'}
        </span>
      </div>

      <div className="relative">
        <input
          type="text"
          value={localTerm}
          onChange={(e) => setLocalTerm(e.target.value)}
          placeholder={siteContent.color_search_placeholder || 'جستجوی رنگ (مثال: سفید، بلوط، قهوه‌ای...)'}
          className="w-full px-5 py-4 pr-12 pl-12 border-2 border-gray-200 rounded-button focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all text-base"
          dir="rtl"
        />
        
        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
          <FiSearch size={20} />
        </div>

        {localTerm && (
          <button
            onClick={clearSearch}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="پاک کردن جستجو"
          >
            <FiX size={20} />
          </button>
        )}
      </div>
    </div>
  );
};

export default ColorSearch;
