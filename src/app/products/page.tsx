'use client';

import { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import Container from '@/components/ui/Container';
import Breadcrumb from '@/components/layout/Breadcrumb';
import ProductGrid from '@/components/products/ProductGrid';
import ProductFilters from '@/components/products/ProductFilters';
import ProductSearch from '@/components/products/ProductSearch';
import SortBar from '@/components/products/SortBar';
import productsData from '@/data/products/products.json';
import type { Product, ProductFilter, SortOption } from '@/types/product';

/**
 * صفحه محصولات
 * منطبق بر products.html
 */
export default function ProductsPage() {
  const searchParams = useSearchParams();
  const [filter, setFilter] = useState<ProductFilter>({});
  const [sort, setSort] = useState<SortOption>('popular');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // فیلتر و جستجو
  const filteredProducts = useMemo(() => {
    let result = [...productsData] as Product[];

    // فیلتر بر اساس دسته‌بندی
    if (filter.category) {
      result = result.filter(p => p.category === filter.category);
    }

    // فیلتر بر اساس ضخامت
    if (filter.thickness && filter.thickness.length > 0) {
      result = result.filter(p => filter.thickness?.includes(p.thickness));
    }

    // فیلتر بر اساس جستجو
    const searchTerm = searchParams.get('q')?.toLowerCase();
    if (searchTerm) {
      result = result.filter(p => 
        p.name.toLowerCase().includes(searchTerm) ||
        p.description.toLowerCase().includes(searchTerm) ||
        p.brand.toLowerCase().includes(searchTerm) ||
        p.productCode?.toLowerCase().includes(searchTerm) ||
        p.thickness.toString().includes(searchTerm)
      );
    }

    // مرتب‌سازی
    result.sort((a, b) => {
      switch (sort) {
        case 'newest':
          return (b.createdAt || '').localeCompare(a.createdAt || '');
        case 'price-low':
          return (a.price || 0) - (b.price || 0);
        case 'price-high':
          return (b.price || 0) - (a.price || 0);
        case 'popular':
        default:
          return (b.viewCount || 0) - (a.viewCount || 0);
      }
    });

    return result;
  }, [filter, sort, searchParams]);

  return (
    <div className="pb-16">
      <Breadcrumb />
      
      <Container className="pt-8">
        {/* عنوان صفحه */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            محصولات Soheili Wood
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            انواع ورق‌های MDF با کیفیت بالا، مناسب برای کابینت‌سازی و دکوراسیون داخلی
          </p>
        </div>

        {/* جستجو */}
        <ProductSearch />

        {/* فیلترها */}
        <ProductFilters
          onFilterChange={setFilter}
          onSortChange={setSort}
          totalProducts={filteredProducts.length}
        />

        {/* نوار مرتب‌سازی */}
        <SortBar
          totalProducts={filteredProducts.length}
          currentSort={sort}
          onSortChange={setSort}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
        />

        {/* گرید محصولات */}
        <ProductGrid products={filteredProducts} />
      </Container>
    </div>
  );
}