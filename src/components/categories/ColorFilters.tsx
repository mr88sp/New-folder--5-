'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import type { ColorFamily, SurfaceType } from '@/types/color';

/**
 * کامپوننت ColorFilters - فیلتر رنگ‌ها بر اساس خانواده رنگ و نوع سطح
 * منطبق بر ساختار color-filters در categories.html
 */
interface ColorFiltersProps {
  onFamilyChange: (family: ColorFamily | string) => void;
  onSurfaceChange: (surface: SurfaceType | string) => void;
  activeFamily: ColorFamily | string;
  activeSurface: SurfaceType | string;
}

const ColorFilters = ({
  onFamilyChange,
  onSurfaceChange,
  activeFamily,
  activeSurface
}: ColorFiltersProps) => {
  const [isOpen, setIsOpen] = useState(true);

  // خانواده رنگ‌ها
  const colorFamilies = [
    { id: 'all', name: 'همه', emoji: '🌈', color: '' },
    { id: 'white', name: 'سفید', emoji: '⚪', color: 'bg-white border-gray-300' },
    { id: 'cream', name: 'کرم', emoji: '🍦', color: 'bg-amber-50 border-amber-200' },
    { id: 'brown', name: 'قهوه‌ای', emoji: '🟤', color: 'bg-amber-800 border-amber-900' },
    { id: 'gray', name: 'خاکستری', emoji: '⚪', color: 'bg-gray-400 border-gray-600' },
    { id: 'black', name: 'مشکی', emoji: '⚫', color: 'bg-gray-900 border-black' },
    { id: 'wood', name: 'چوبی', emoji: '🪵', color: 'bg-amber-600 border-amber-800' },
    { id: 'colorful', name: 'رنگی', emoji: '🎨', color: 'bg-gradient-to-r from-red-500 via-blue-500 to-green-500' },
  ];

  // نوع سطح
  const surfaceTypes = [
    { id: 'all', name: 'همه', emoji: '✨' },
    { id: 'glossy', name: 'براق', emoji: '✨' },
    { id: 'matte', name: 'مات', emoji: '🎭' },
    { id: 'satin', name: 'ساتین', emoji: '💫' },
    { id: 'wood', name: 'طرح چوب', emoji: '🪵' },
    { id: 'stone', name: 'طرح سنگ', emoji: '🪨' },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
      {/* هدر فیلتر */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between cursor-pointer"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
            <span className="text-white text-xl">🎯</span>
          </div>
          <h3 className="text-lg font-bold text-gray-900">فیلتر رنگ‌ها</h3>
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
            <h4 className="text-sm font-medium text-gray-700 mb-3">خانواده رنگ</h4>
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
                  <span>{family.emoji}</span>
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
            <h4 className="text-sm font-medium text-gray-700 mb-3">نوع سطح</h4>
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
                  <span>{surface.emoji}</span>
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