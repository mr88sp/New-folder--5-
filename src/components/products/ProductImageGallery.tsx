'use client';

import { useState } from 'react';
import CustomImage from '@/components/ui/CustomImage';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronLeft, FiChevronRight, FiMaximize2, FiX } from 'react-icons/fi';

/**
 * کامپوننت ProductImageGallery - گالری تصاویر محصول
 * امکان نمایش تصاویر، بزرگنمایی و ورق زدن
 */
interface ProductImageGalleryProps {
  images: string[];
  productName: string;
}

const ProductImageGallery = ({ images, productName }: ProductImageGalleryProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // اگر تصویری وجود نداشت، تصویر پیش‌فرض نمایش بده
  const displayImages = images.length > 0 ? images : ['/images/placeholder.jpg'];

  // رفتن به تصویر بعدی
  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % displayImages.length);
  };

  // رفتن به تصویر قبلی
  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + displayImages.length) % displayImages.length);
  };

  // انتخاب تصویر خاص
  const selectImage = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <>
      {/* ===== گالری اصلی ===== */}
      <div className="bg-white rounded-card shadow-lg overflow-hidden">
        {/* تصویر اصلی */}
        <div className="relative aspect-square bg-gradient-to-br from-gray-50 to-gray-100 group">
          <img
            src={displayImages[currentIndex]}
            alt={`${productName} - تصویر ${currentIndex + 1}`}
            className="object-contain p-4 w-full h-full"
          />

          {/* دکمه بزرگنمایی */}
          <button
            onClick={() => setIsLightboxOpen(true)}
            className="absolute top-4 left-4 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-700 hover:bg-brand-primary hover:text-white transition-colors shadow-lg opacity-0 group-hover:opacity-100"
            aria-label="بزرگنمایی"
          >
            <FiMaximize2 size={20} />
          </button>

          {/* دکمه‌های قبلی/بعدی */}
          {displayImages.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-700 hover:bg-brand-primary hover:text-white transition-colors shadow-lg opacity-0 group-hover:opacity-100"
                aria-label="تصویر قبلی"
              >
                <FiChevronRight size={20} />
              </button>
              <button
                onClick={nextImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-700 hover:bg-brand-primary hover:text-white transition-colors shadow-lg opacity-0 group-hover:opacity-100"
                aria-label="تصویر بعدی"
              >
                <FiChevronLeft size={20} />
              </button>
            </>
          )}
        </div>

        {/* تصاویر thumbnail */}
        {displayImages.length > 1 && (
          <div className="p-4 border-t border-gray-100">
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-300">
              {displayImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => selectImage(index)}
                  className={`relative flex-shrink-0 w-20 h-20 rounded-button overflow-hidden border-2 transition-all ${
                    currentIndex === index
                      ? 'border-brand-primary shadow-md scale-105'
                      : 'border-transparent hover:border-gray-300'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${productName} - thumbnail ${index + 1}`}
                    className="object-cover w-full h-full"
                  />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ===== لایت‌باکس ===== */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
            onClick={() => setIsLightboxOpen(false)}
          >
            {/* دکمه بستن */}
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="absolute top-6 left-6 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              aria-label="بستن"
            >
              <FiX size={24} />
            </button>

            {/* شمارنده تصاویر */}
            <div className="absolute top-6 right-6 text-white/80 text-sm bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full">
              {currentIndex + 1} / {displayImages.length}
            </div>

            {/* تصویر اصلی لایت‌باکس */}
            <div
              className="relative w-[90vw] h-[80vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={displayImages[currentIndex]}
                alt={`${productName} - بزرگنمایی ${currentIndex + 1}`}
                className="object-contain w-full h-full"
              />
            </div>

            {/* دکمه‌های قبلی/بعدی در لایت‌باکس */}
            {displayImages.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    prevImage();
                  }}
                  className="absolute right-8 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                  aria-label="تصویر قبلی"
                >
                  <FiChevronRight size={28} />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    nextImage();
                  }}
                  className="absolute left-8 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                  aria-label="تصویر بعدی"
                >
                  <FiChevronLeft size={28} />
                </button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProductImageGallery;