'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Container from '@/components/ui/Container';
import Breadcrumb from '@/components/layout/Breadcrumb';
import ColorSearch from '@/components/categories/ColorSearch';
import ColorFilters from '@/components/categories/ColorFilters';
import ColorsGrid from '@/components/categories/ColorsGrid';
import PopularColors from '@/components/categories/PopularColors';
import ColorPalettes from '@/components/categories/ColorPalettes';
import type { ColorFilter, ColorFamily, SurfaceType } from '@/types/color';

/**
 * صفحه رنگ‌بندی MDF
 * منطبق بر categories.html
 */
export default function CategoriesPage() {
  const searchParams = useSearchParams();
  const [filter, setFilter] = useState<ColorFilter>({
    family: 'all',
    surface: 'all',
    search: '',
  });

  // تبدیل string به تایپ ColorFamily
  const parseFamilyParam = (param: string | null): ColorFamily => {
    if (!param || param === '') return 'all';
    
    const validFamilies: ColorFamily[] = ['all', 'white', 'cream', 'brown', 'gray', 'black', 'wood', 'colorful'];
    return validFamilies.includes(param as ColorFamily) ? param as ColorFamily : 'all';
  };

  // تبدیل string به تایپ SurfaceType
  const parseSurfaceParam = (param: string | null): SurfaceType => {
    if (!param || param === '') return 'all';
    
    const validSurfaces: SurfaceType[] = ['all', 'glossy', 'matte', 'satin', 'wood', 'stone'];
    return validSurfaces.includes(param as SurfaceType) ? param as SurfaceType : 'all';
  };

  // هماهنگ‌سازی فیلتر با URL
  useEffect(() => {
    const familyParam = searchParams.get('family');
    const surfaceParam = searchParams.get('surface');
    const searchParam = searchParams.get('q');

    setFilter({
      family: parseFamilyParam(familyParam),
      surface: parseSurfaceParam(surfaceParam),
      search: searchParam || '',
    });
  }, [searchParams]);

  const handleFamilyChange = (family: string) => {
    const typedFamily = parseFamilyParam(family);
    const params = new URLSearchParams(searchParams.toString());
    
    if (typedFamily === 'all') {
      params.delete('family');
    } else {
      params.set('family', typedFamily);
    }
    
    window.history.pushState({}, '', `/categories?${params.toString()}`);
    setFilter(prev => ({ ...prev, family: typedFamily }));
  };

  const handleSurfaceChange = (surface: string) => {
    const typedSurface = parseSurfaceParam(surface);
    const params = new URLSearchParams(searchParams.toString());
    
    if (typedSurface === 'all') {
      params.delete('surface');
    } else {
      params.set('surface', typedSurface);
    }
    
    window.history.pushState({}, '', `/categories?${params.toString()}`);
    setFilter(prev => ({ ...prev, surface: typedSurface }));
  };

  return (
    <div className="pb-16">
      <Breadcrumb />
      
      <Container className="pt-8">
        {/* هدر صفحه */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            رنگ‌بندی MDF
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            انتخاب از بین ۵۰+ رنگ متنوع برای پروژه‌های شما
          </p>
        </div>

        {/* جستجوی رنگ */}
        <ColorSearch />

        {/* فیلتر رنگ‌ها */}
        <ColorFilters
          activeFamily={filter.family || 'all'}
          activeSurface={filter.surface || 'all'}
          onFamilyChange={handleFamilyChange}
          onSurfaceChange={handleSurfaceChange}
        />

        {/* رنگ‌های محبوب */}
        <PopularColors />

        {/* گرید رنگ‌ها */}
        <ColorsGrid filter={filter} />

        {/* پالت‌های رنگی */}
        <ColorPalettes />
      </Container>
    </div>
  );
}