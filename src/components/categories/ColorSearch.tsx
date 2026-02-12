'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FiSearch, FiX } from 'react-icons/fi';
import { debounce } from '@/utils/debounce.util';

/**
 * کامپوننت ColorSearch - جستجوی رنگ‌ها
 * منطبق بر ساختار color-search در categories.html
 */
const ColorSearch = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');

  const debouncedSearch = useCallback(
    debounce((term: string) => {
      const params = new URLSearchParams(searchParams.toString());
      
      if (term) {
        params.set('q', term);
      } else {
        params.delete('q');
      }
      
      router.push(`/categories?${params.toString()}`);
    }, 500),
    [searchParams, router]
  );

  useEffect(() => {
    debouncedSearch(searchTerm);
  }, [searchTerm, debouncedSearch]);

  const clearSearch = () => {
    setSearchTerm('');
    const params = new URLSearchParams(searchParams.toString());
    params.delete('q');
    router.push(`/categories?${params.toString()}`);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
            <span className="text-white text-xl">🎨</span>
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">کاتالوگ رنگ‌ها</h3>
            <p className="text-sm text-gray-500">۵۲ رنگ متنوع برای پروژه شما</p>
          </div>
        </div>
        <span className="bg-brand-primary/10 text-brand-primary px-4 py-2 rounded-full text-sm font-medium">
          ۵۲ رنگ
        </span>
      </div>

      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="جستجوی رنگ (مثال: سفید، بلوط، قهوه‌ای...)"
          className="w-full px-5 py-4 pr-12 pl-12 border-2 border-gray-200 rounded-xl focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all text-base"
          dir="rtl"
        />
        
        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
          <FiSearch size={20} />
        </div>

        {searchTerm && (
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