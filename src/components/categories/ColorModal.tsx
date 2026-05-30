'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiCopy, FiShoppingCart } from 'react-icons/fi';
import { useState } from 'react';
import Button from '@/components/ui/Button';
import type { Color } from '@/types/color';

/**
 * کامپوننت ColorModal - مدال نمایش جزئیات رنگ
 * منطبق بر ساختار color-modal در categories.html
 */
interface ColorModalProps {
  siteContent: any;
  color: Color;
  onClose: () => void;
}

const ColorModal = ({ siteContent, color, onClose }: ColorModalProps) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const copyColorCode = () => {
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

  // ساخت لینک واتساپ برای سفارش رنگ
  const getWhatsAppOrderLink = () => {
    const siteTitle = siteContent.site_title || 'Soheili Wood';
    const message = encodeURIComponent(
      `سلام،\n\n` +
      `از سایت ${siteTitle} سفارش رنگ دارم:\n` +
      `------------------------\n` +
      `نام رنگ: ${color.name}\n` +
      `کد رنگ: ${color.hex}\n` +
      `کد محصول: ${color.code}\n` +
      `نوع سطح: ${getSurfaceName(color.surface)}\n` +
      `------------------------\n` +
      `لطفاً جهت تکمیل سفارش راهنمایی بفرمایید.`
    );
    
    // شماره واتساپ از siteContent یا مقدار پیشفرض
    const whatsapp = siteContent.contact_whatsapp || '989123456789';
    return `https://wa.me/${whatsapp}?text=${message}`;
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: 'spring', damping: 20 }}
          className="bg-white rounded-card shadow-2xl max-w-2xl w-full overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* هدر مدال */}
          <div className="flex justify-between items-center p-6 border-b border-gray-200">
            <h3 className="text-xl font-bold text-gray-900">
              {siteContent.color_modal_title || 'اطلاعات رنگ'}
            </h3>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <FiX size={20} />
            </button>
          </div>

          {/* محتوای مدال */}
          <div className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              {/* نمونه رنگ */}
              <div className="md:w-1/2">
                <div
                  className="relative h-48 md:h-full rounded-card overflow-hidden shadow-lg"
                  style={{ backgroundColor: color.hex }}
                >
                  <div className={`absolute inset-0 flex items-center justify-center ${getTextColor(color.hex)} text-2xl font-bold`}>
                    {color.name}
                  </div>
                </div>
              </div>

              {/* اطلاعات رنگ */}
              <div className="md:w-1/2 space-y-4">
                <div>
                  <h4 className="text-sm text-gray-500 mb-1">نام رنگ</h4>
                  <p className="text-lg font-bold text-gray-900">{color.name}</p>
                </div>

                <div>
                  <h4 className="text-sm text-gray-500 mb-1">کد رنگ</h4>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-lg bg-gray-100 px-3 py-2 rounded-button">
                      {color.hex}
                    </span>
                    <button
                      onClick={copyColorCode}
                      className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-button flex items-center gap-2 transition-colors"
                    >
                      {copied ? (
                        'کپی شد!'
                      ) : (
                        <>
                          <FiCopy size={16} />
                          <span>کپی</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm text-gray-500 mb-1">کد محصول</h4>
                  <p className="font-medium text-gray-900">{color.code}</p>
                </div>

                <div>
                  <h4 className="text-sm text-gray-500 mb-1">نوع سطح</h4>
                  <span className="inline-block px-3 py-1.5 bg-gray-100 rounded-full text-sm">
                    {getSurfaceName(color.surface)}
                  </span>
                </div>

                {color.description && (
                  <div>
                    <h4 className="text-sm text-gray-500 mb-1">توضیحات</h4>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      {color.description}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* دکمه سفارش */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <Button
                href={getWhatsAppOrderLink()}
                variant="primary"
                size="lg"
                className="w-full flex items-center justify-center gap-2"
                target="_blank"
              >
                <FiShoppingCart size={20} />
                <span>سفارش این رنگ</span>
              </Button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ColorModal;