'use client';

import { motion } from 'framer-motion';
import colorsData from '@/data/colors/colors.json';

/**
 * کامپوننت PopularColors - رنگ‌های پرفروش و محبوب
 * منطبق بر ساختار popular-colors در categories.html
 */
interface PopularColorsProps {
  siteContent: any;
  products: any[];
}

const PopularColors = ({ siteContent, products }: PopularColorsProps) => {
  const popularColors = siteContent.popular_colors || [
    { hex: '#ffffff', name: 'سفید' },
    { hex: '#f5f5f5', name: 'کرم' },
    { hex: '#8d6e63', name: 'قهوه‌ای روشن' },
    { hex: '#5d4037', name: 'قهوه‌ای متوسط' },
    { hex: '#3e2723', name: 'قهوه‌ای تیره' },
    { hex: '#212121', name: 'مشکی' },
  ];

  return (
    <div className="bg-white rounded-card shadow-lg p-6 mb-8">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          {siteContent.popular_colors_title || 'رنگ‌های پرفروش'}
        </h3>
        <p className="text-gray-600">
          {siteContent.popular_colors_subtitle || 'پرطرفدارترین انتخاب‌های مشتریان'}
        </p>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
        {popularColors.map((color, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="group relative"
          >
            <div
              className="aspect-square rounded-button shadow-md hover:shadow-xl transition-all cursor-pointer group-hover:-translate-y-1"
              style={{ backgroundColor: color.hex }}
            >
              <div className="absolute inset-0 rounded-button bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity text-xs font-medium px-2 py-1 bg-black/50 rounded-full">
                  {color.name}
                </span>
              </div>
            </div>
            <p className="text-xs text-center mt-2 text-gray-600">
              {color.name}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PopularColors;