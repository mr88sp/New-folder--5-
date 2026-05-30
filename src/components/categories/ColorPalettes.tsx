'use client';

import { motion } from 'framer-motion';
import { FiCopy } from 'react-icons/fi';
import { useState } from 'react';

/**
 * کامپوننت ColorPalettes - پالت‌های رنگی پیشنهادی
 * منطبق بر ساختار color-palettes در categories.html
 */
interface ColorPalettesProps {
  siteContent: any;
}

const ColorPalettes = ({ siteContent }: ColorPalettesProps) => {
  const [copiedPalette, setCopiedPalette] = useState<string | null>(null);
  const palettes = siteContent.color_palettes || [
    {
      id: 'modern',
      name: 'پالت مدرن',
      description: 'مناسب برای دکوراسیون معاصر و مینیمال',
      colors: ['#ffffff', '#f5f5f5', '#90a4ae', '#455a64', '#212121'],
    },
    {
      id: 'classic',
      name: 'پالت کلاسیک',
      description: 'مناسب برای دکوراسیون سنتی و کلاسیک',
      colors: ['#d4b996', '#8b4513', '#5d4037', '#3e2723', '#1b0000'],
    },
  ];

  const copyPalette = (paletteId: string, colors: string[]) => {
    const colorCodes = colors.join('\n');
    navigator.clipboard.writeText(colorCodes);
    setCopiedPalette(paletteId);
    setTimeout(() => setCopiedPalette(null), 2000);
  };

  return (
    <div className="mt-12">
      <div className="text-center mb-8">
        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
          {siteContent.palettes_title || 'پالت‌های پیشنهادی'}
        </h3>
        <p className="text-gray-600">
          {siteContent.palettes_subtitle || 'ترکیب‌های رنگی آماده برای دکوراسیون'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {palettes.map((palette, index) => (
          <motion.div
            key={palette.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white rounded-card shadow-lg overflow-hidden hover:shadow-xl transition-all group"
          >
            {/* هدر پالت */}
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-xl font-bold mb-2">{palette.name}</h4>
                  <p className="text-gray-300 text-sm">
                    {palette.description}
                  </p>
                </div>
                <button
                  onClick={() => copyPalette(palette.id, palette.colors)}
                  className="bg-white/10 hover:bg-white/20 rounded-button px-4 py-2 text-sm flex items-center gap-2 transition-colors"
                >
                  {copiedPalette === palette.id ? (
                    '✅ کپی شد!'
                  ) : (
                    <>
                      <FiCopy size={16} />
                      <span>کپی پالت</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* رنگ‌های پالت */}
            <div className="p-6">
              <div className="flex h-24 rounded-button overflow-hidden shadow-lg">
                {palette.colors.map((color, i) => (
                  <div
                    key={i}
                    className="flex-1 relative group/color"
                    style={{ backgroundColor: color }}
                  >
                    <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors flex items-center justify-center">
                      <span className="text-white opacity-0 group-hover/color:opacity-100 transition-opacity text-xs font-bold drop-shadow-lg">
                        {color}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* کد رنگ‌ها */}
              <div className="mt-4 grid grid-cols-5 gap-2">
                {palette.colors.map((color, i) => (
                  <div key={i} className="text-center">
                    <div
                      className="w-full h-2 rounded-full mb-1"
                      style={{ backgroundColor: color }}
                    />
                    <span className="text-xs font-mono text-gray-600">
                      {color}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ColorPalettes;