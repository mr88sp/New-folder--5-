'use client'; 

import Container from '@/components/ui/Container';
import Breadcrumb from '@/components/layout/Breadcrumb';
import PriceBanner from '@/components/price/PriceBanner';
import PriceFilter from '@/components/price/PriceFilter';
import PriceTable from '@/components/price/PriceTable';
import DiscountCards from '@/components/price/DiscountCards';
import TableFeatures from '@/components/price/TableFeatures';
import PriceNotes from '@/components/price/PriceNotes';
import priceTablesData from '@/data/prices/price-tables.json';
import type { PriceCategory } from '@/types/price';

/**
 * صفحه استعلام قیمت
 * منطبق بر price.html
 */
export default function PricePage() {
  const priceTables = priceTablesData.categories as PriceCategory[];

  return (
    <div className="pb-16">
      <Breadcrumb />
      
      <Container className="pt-8">
        {/* بنر بالای صفحه */}
        <PriceBanner lastUpdate={priceTablesData.lastUpdate} />

        {/* فیلتر قیمت */}
        <PriceFilter onFilterChange={() => {}} />

        {/* جداول قیمت */}
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 text-center">
            جدول قیمت‌ها
          </h2>
          <p className="text-gray-600 text-center mb-8">
            قیمت‌ها برای هر متر مربع محاسبه شده‌اند
          </p>

          {priceTables.map((category, index) => (
            <PriceTable 
              key={category.id} 
              category={category} 
              defaultOpen={index === 0}
            />
          ))}
        </div>

        {/* کارت‌های تخفیف */}
        <DiscountCards />

        {/* ویژگی‌ها */}
        <TableFeatures />

        {/* توضیحات قیمت */}
        <PriceNotes />
      </Container>
    </div>
  );
}