'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiCopy, FiCheck, FiInfo } from 'react-icons/fi';
import type { Color } from '@/types/color';

/**
 * کامپوننت ColorCard - کارت نمایش رنگ
 * منطبق بر ساختار color-card در categories.html
 */
interface ColorCardProps {
  color: Color;
  onSelect: (color: Color) => void;
}

const ColorCard = ({ color, onSelect }: ColorCardProps) => {
  const [copied, setCopied] = useState(false);

  // کپی کردن کد رنگ
  const copyColorCode = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(color.hex);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // نام فارسی نوع سطح
  const getSurfaceName = (surface: string) => {
    const surfaces: Record<string, string> = {
      glossy: 'براق',
      matte: 'مات',
      satin: 'ساتین',
      wood: 'طرح چوب',
      stone: 'طرح سنگ',
    };
    return surfaces[surface] || surface;
  };

  // رنگ متن بر اساس پس‌زمینه
  const getTextColor = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 128 ? 'text-gray-900' : 'text-white';
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all cursor-pointer"
      onClick={() => onSelect(color)}
    >
      {/* پیش‌نمایش رنگ */}
      <div
        className="relative h-32 flex items-end justify-end p-4 transition-all group-hover:h-36"
        style={{ backgroundColor: color.hex }}
      >
        {/* دکمه کپی */}
        <button
          onClick={copyColorCode}
          className={`
            absolute top-3 left-3 w-8 h-8 rounded-full flex items-center justify-center
            ${getTextColor(color.hex)} bg-white/20 backdrop-blur-sm
            hover:bg-white/30 transition-all opacity-0 group-hover:opacity-100
          `}
          aria-label="کپی کد رنگ"
        >
          {copied ? <FiCheck size={16} /> : <FiCopy size={16} />}
        </button>

        {/* نشان محبوب */}
        {color.isPopular && (
          <span className="absolute bottom-3 right-3 text-xs bg-black/30 backdrop-blur-sm text-white px-2 py-1 rounded-full">
            ⭐ محبوب
          </span>
        )}
      </div>

      {/* اطلاعات رنگ */}
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h4 className="text-base font-bold text-gray-900">
            {color.name}
          </h4>
          <span className="text-xs font-mono bg-gray-100 px-2 py-1 rounded">
            {color.code}
          </span>
        </div>

        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs text-gray-500">
            {color.hex}
          </span>
          <span className="text-xs px-2 py-0.5 bg-gray-100 rounded-full text-gray-600">
            {getSurfaceName(color.surface)}
          </span>
        </div>

        {/* دکمه جزئیات */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onSelect(color);
          }}
          className="w-full flex items-center justify-center gap-2 text-sm text-brand-primary hover:text-brand-dark font-medium py-2 border-t border-gray-100 mt-2 transition-colors"
        >
          <FiInfo size={16} />
          <span>مشاهده جزئیات</span>
        </button>
      </div>
    </motion.div>
  );
};

export default ColorCard;