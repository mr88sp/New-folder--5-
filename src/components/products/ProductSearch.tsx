'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FiSearch, FiX } from 'react-icons/fi';
import { debounce } from '@/utils/animation.util';

/**
 * کامپوننت ProductSearch - جستجوی محصولات
 * منطبق بر ساختار products-search در products.html
 */
const ProductSearch = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');

  // جستجوی با دیبانس
  const debouncedSearch = useCallback(
    debounce((term: string) => {
      const params = new URLSearchParams(searchParams.toString());
      
      if (term) {
        params.set('q', term);
      } else {
        params.delete('q');
      }
      
      router.push(`/products?${params.toString()}`);
    }, 500),
    [searchParams, router]
  );

  useEffect(() => {
    debouncedSearch(searchTerm);
  }, [searchTerm, debouncedSearch]);

  // پاک کردن جستجو
  const clearSearch = () => {
    setSearchTerm('');
    const params = new URLSearchParams(searchParams.toString());
    params.delete('q');
    router.push(`/products?${params.toString()}`);
  };

  return (
    <div className="relative mb-8">
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="جستجوی محصولات (مثال: MDF سفید، 16mm، ایران‌چوب...)"
          className="w-full px-5 py-4 pr-12 pl-12 border-2 border-gray-200 rounded-xl focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all text-base"
          dir="rtl"
        />
        
        {/* آیکون جستجو */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
          <FiSearch size={20} />
        </div>

        {/* دکمه پاک کردن */}
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

      {/* راهنمای جستجو */}
      <p className="text-xs text-gray-500 mt-2 mr-4">
        🔍 می‌توانید با نام محصول، ضخامت، برند یا کد محصول جستجو کنید
      </p>
    </div>
  );
};

export default ProductSearch;