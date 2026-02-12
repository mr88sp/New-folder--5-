'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import ColorCard from './ColorCard';
import ColorModal from './ColorModal';
import type { Color, ColorFilter } from '@/types/color';
import colorsData from '@/data/colors/colors.json';

/**
 * کامپوننت ColorsGrid - گرید نمایش رنگ‌ها
 * منطبق بر ساختار colors-grid در categories.html
 */
interface ColorsGridProps {
  filter: ColorFilter;
}

const ColorsGrid = ({ filter }: ColorsGridProps) => {
  const [selectedColor, setSelectedColor] = useState<Color | null>(null);

  // فیلتر رنگ‌ها
  const filteredColors = useMemo(() => {
    let result = [...colorsData.colors] as Color[];

    // فیلتر بر اساس خانواده رنگ
    if (filter.family && filter.family !== 'all') {
      result = result.filter(c => c.family === filter.family);
    }

    // فیلتر بر اساس نوع سطح
    if (filter.surface && filter.surface !== 'all') {
      result = result.filter(c => c.surface === filter.surface);
    }

    // فیلتر بر اساس جستجو
    if (filter.search) {
      const search = filter.search.toLowerCase();
      result = result.filter(c => 
        c.name.toLowerCase().includes(search) ||
        c.code.toLowerCase().includes(search) ||
        c.hex.toLowerCase().includes(search)
      );
    }

    // فیلتر رنگ‌های محبوب
    if (filter.isPopular) {
      result = result.filter(c => c.isPopular);
    }

    return result;
  }, [filter]);

  return (
    <>
      {/* تعداد رنگ‌ها */}
      <div className="flex justify-between items-center mb-6">
        <h4 className="text-lg font-bold text-gray-900">
          رنگ‌های موجود
        </h4>
        <span className="bg-brand-primary/10 text-brand-primary px-4 py-2 rounded-full text-sm font-medium">
          {filteredColors.length} رنگ
        </span>
      </div>

      {/* گرید رنگ‌ها */}
      {filteredColors.length > 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4"
        >
          {filteredColors.map((color, index) => (
            <motion.div
              key={color.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <ColorCard
                color={color}
                onSelect={setSelectedColor}
              />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div className="text-center py-16">
          <div className="text-6xl mb-4 text-gray-300">🎨</div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            رنگی یافت نشد!
          </h3>
          <p className="text-gray-600">
            هیچ رنگی با فیلترهای انتخاب شده مطابقت ندارد.
          </p>
        </div>
      )}

      {/* مدال نمایش رنگ */}
      {selectedColor && (
        <ColorModal
          color={selectedColor}
          onClose={() => setSelectedColor(null)}
        />
      )}
    </>
  );
};

export default ColorsGrid;