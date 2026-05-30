'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiChevronDown, FiChevronUp, FiGrid, FiSun, FiMoon, FiLayers, FiBox, FiFilter } from 'react-icons/fi';
import type { ColorFamily, SurfaceType } from '@/types/color';

/**
 * کامپوننت ColorFilters - فیلتر رنگ‌ها بر اساس خانواده رنگ و نوع سطح
 * منطبق بر ساختار color-filters در categories.html
 */
interface ColorFiltersProps {
  siteContent: any;
  onFamilyChange: (family: ColorFamily | string) => void;
  onSurfaceChange: (surface: SurfaceType | string) => void;
  activeFamily: ColorFamily | string;
  activeSurface: SurfaceType | string;
}

const ColorFilters = ({
  siteContent,
  onFamilyChange,
  onSurfaceChange,
  activeFamily,
  activeSurface
}: ColorFiltersProps) => {
  const [isOpen, setIsOpen] = useState(true);

  // خانواده رنگ‌ها
  const colorFamilies = [
    { id: 'all', name: 'همه', icon: <FiGrid size={16} />, color: '' },
    { id: 'white', name: 'سفید', color: 'bg-white border-gray-300' },
    { id: 'cream', name: 'کرم', color: 'bg-amber-50 border-amber-200' },
    { id: 'gray', name: 'خاکستری', color: 'bg-gray-400 border-gray-600' },
    { id: 'black', name: 'مشکی', color: 'bg-gray-900 border-black' },
    { id: 'blue', name: 'آبی', color: 'bg-blue-500 border-blue-700' },
    { id: 'navy', name: 'سرمه‌ای', color: 'bg-blue-900 border-blue-950' },
    { id: 'colorful', name: 'رنگی', icon: <FiLayers size={16} />, color: 'bg-gradient-to-r from-red-500 via-blue-500 to-green-500' },
  ];

  // نوع سطح
  const surfaceTypes = [
    { id: 'all', name: 'همه', icon: <FiGrid size={16} /> },
    { id: 'glossy', name: 'براق', icon: <FiSun size={16} /> },
    { id: 'matte', name: 'مات', icon: <FiMoon size={16} /> },
    { id: 'satin', name: 'ساتین', icon: <FiLayers size={16} /> },
    { id: 'stone', name: 'طرح سنگ', icon: <FiBox size={16} /> },
  ];

  return (
    <div className="bg-white rounded-card shadow-lg p-6 mb-8">
      {/* هدر فیلتر */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between cursor-pointer"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-brand-primary/10 rounded-button flex items-center justify-center">
            <FiFilter className="text-brand-primary text-xl" />
          </div>
          <h3 className="text-lg font-bold text-gray-900">{siteContent.color_filters_title || 'فیلتر رنگ‌ها'}</h3>
        </div>
        <button className="text-gray-400 hover:text-gray-600 transition-colors">
          {isOpen ? <FiChevronUp size={24} /> : <FiChevronDown size={24} />}
        </button>
      </div>

      {/* محتوای فیلتر */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-6 space-y-6"
        >
          {/* خانواده رنگ */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-3">{siteContent.color_family_label || 'خانواده رنگ'}</h4>
            <div className="flex flex-wrap gap-2">
              {colorFamilies.map((family) => (
                <button
                  key={family.id}
                  onClick={() => onFamilyChange(family.id)}
                  className={`
                    flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all
                    ${activeFamily === family.id
                      ? 'bg-brand-primary text-white shadow-md scale-105'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }
                  `}
                >
                  {family.icon && <span>{family.icon}</span>}
                  <span>{family.name}</span>
                  {family.id !== 'all' && family.color && (
                    <span
                      className={`w-3 h-3 rounded-full border ${family.color}`}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* نوع سطح */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-3">{siteContent.surface_type_label || 'نوع سطح'}</h4>
            <div className="flex flex-wrap gap-2">
              {surfaceTypes.map((surface) => (
                <button
                  key={surface.id}
                  onClick={() => onSurfaceChange(surface.id)}
                  className={`
                    flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all
                    ${activeSurface === surface.id
                      ? 'bg-brand-primary text-white shadow-md scale-105'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }
                  `}
                >
                  {surface.icon && <span>{surface.icon}</span>}
                  <span>{surface.name}</span>
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ColorFilters;
