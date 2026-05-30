import { useState, useEffect } from 'react';
import Container from '@/components/ui/Container';
import ColorSearch from '@/components/categories/ColorSearch';
import ColorFilters from '@/components/categories/ColorFilters';
import ColorsGrid from '@/components/categories/ColorsGrid';
import PopularColors from '@/components/categories/PopularColors';
import ColorPalettes from '@/components/categories/ColorPalettes';
import type { ColorFilter, ColorFamily, SurfaceType } from '@/types/color';

interface CategoriesPageContentProps {
  siteContent: any;
  products: any[];
  initialFamily?: string;
  initialSurface?: string;
  initialSearch?: string;
}

export default function CategoriesPageContent({
  siteContent,
  products,
  initialFamily,
  initialSurface,
  initialSearch,
}: CategoriesPageContentProps) {
  const [filter, setFilter] = useState<ColorFilter>({
    family: 'all',
    surface: 'all',
    search: '',
  });

  // تبدیل string به تایپ ColorFamily
  const parseFamilyParam = (param: string | null): ColorFamily => {
    if (!param || param === '') return 'all';
    
    const validFamilies: ColorFamily[] = ['all', 'white', 'cream', 'gray', 'black', 'blue', 'navy', 'colorful'];
    return validFamilies.includes(param as ColorFamily) ? param as ColorFamily : 'all';
  };

  // تبدیل string به تایپ SurfaceType
  const parseSurfaceParam = (param: string | null): SurfaceType => {
    if (!param || param === '') return 'all';
    
    const validSurfaces: SurfaceType[] = ['all', 'glossy', 'matte', 'satin', 'stone'];
    return validSurfaces.includes(param as SurfaceType) ? param as SurfaceType : 'all';
  };

  // هماهنگ‌سازی فیلتر با URL
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const familyParam = urlParams.get('family');
    const surfaceParam = urlParams.get('surface');
    const searchParam = urlParams.get('q');

    setFilter({
      family: parseFamilyParam(familyParam),
      surface: parseSurfaceParam(surfaceParam),
      search: searchParam || '',
    });
  }, []); // Empty dependency array to run once on mount

  useEffect(() => {
    // Initialize filter from props if available
    setFilter({
      family: parseFamilyParam(initialFamily || null),
      surface: parseSurfaceParam(initialSurface || null),
      search: initialSearch || '',
    });
  }, [initialFamily, initialSurface, initialSearch]);

  const updateUrl = (newParams: URLSearchParams) => {
    const newUrl = `${window.location.pathname}?${newParams.toString()}`;
    window.history.pushState({ path: newUrl }, '', newUrl);
  };

  const handleFamilyChange = (family: string) => {
    const typedFamily = parseFamilyParam(family);
    const params = new URLSearchParams(window.location.search);
    
    if (typedFamily === 'all') {
      params.delete('family');
    } else {
      params.set('family', typedFamily);
    }
    
    updateUrl(params);
    setFilter(prev => ({ ...prev, family: typedFamily }));
  };

  const handleSurfaceChange = (surface: string) => {
    const typedSurface = parseSurfaceParam(surface);
    const params = new URLSearchParams(window.location.search);
    
    if (typedSurface === 'all') {
      params.delete('surface');
    } else {
      params.set('surface', typedSurface);
    }
    
    updateUrl(params);
    setFilter(prev => ({ ...prev, surface: typedSurface }));
  };

  const handleSearch = (term: string) => {
    const params = new URLSearchParams(window.location.search);
    if (term) {
      params.set('q', term);
    } else {
      params.delete('q');
    }
    updateUrl(params);
    setFilter(prev => ({ ...prev, search: term }));
  };

  return (
    <Container className="pt-8">
      {/* هدر صفحه */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          {siteContent.categories_title || 'رنگ‌بندی MDF'}
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          {siteContent.categories_subtitle || 'انتخاب از بین ۵۰+ رنگ متنوع برای پروژه‌های شما'}
        </p>
      </div>

      {/* جستجوی رنگ */}
      <ColorSearch 
        siteContent={siteContent} 
        searchTerm={filter.search || ''}
        onSearch={handleSearch}
        client:load 
      />

      {/* فیلتر رنگ‌ها */}
      <ColorFilters
        siteContent={siteContent}
        activeFamily={filter.family || 'all'}
        activeSurface={filter.surface || 'all'}
        onFamilyChange={handleFamilyChange}
        onSurfaceChange={handleSurfaceChange}
        client:load
      />

      {/* رنگ‌های محبوب */}
      <PopularColors siteContent={siteContent} products={products} client:load />

      {/* گرید رنگ‌ها */}
      <ColorsGrid siteContent={siteContent} products={products} filter={filter} client:load />

      {/* پالت‌های رنگی */}
      <ColorPalettes siteContent={siteContent} client:load />
    </Container>
  );
}
