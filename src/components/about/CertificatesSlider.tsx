'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronLeft, FiChevronRight, FiAward } from 'react-icons/fi';

interface CertificatesSliderProps {
  siteContent: any;
}

/**
 * کامپوننت CertificatesSlider - اسلایدر گواهینامه‌ها
 * منطبق بر ساختار certificates-slider در about.html
 */
const CertificatesSlider = ({ siteContent }: CertificatesSliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const certificatesData = siteContent.certificates_items || siteContent.certificates || [];

  if (certificatesData.length === 0) return null;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % certificatesData.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + certificatesData.length) % certificatesData.length);
  };

  return (
    <div className="mb-16">
      <div className="text-center mb-12">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
          {siteContent.certificates_title || "گواهینامه‌ها و افتخارات"}
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          {siteContent.certificates_description || "تأییدیه‌های کیفیت و افتخارات کسب‌شده"}
        </p>
      </div>

      <div className="relative">
        {/* اسلایدر */}
        <div className="overflow-hidden rounded-card">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-card p-8 md:p-12"
            >
              <div className="flex flex-col md:flex-row items-center gap-8">
                {/* آیکون گواهینامه */}
                <div className="w-24 h-24 bg-white/10 rounded-card flex items-center justify-center">
                  <span className="text-5xl">
                    {certificatesData[currentIndex].icon}
                  </span>
                </div>

                {/* محتوا */}
                <div className="flex-1 text-center md:text-right">
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                    {certificatesData[currentIndex].title}
                  </h3>
                  <p className="text-white/80 text-lg leading-relaxed">
                    {certificatesData[currentIndex].description}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* دکمه‌های ناوبری */}
        <button
          onClick={prevSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full flex items-center justify-center text-gray-700 hover:bg-brand-primary hover:text-white transition-colors shadow-lg"
          aria-label="قبلی"
        >
          <FiChevronRight size={24} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full flex items-center justify-center text-gray-700 hover:bg-brand-primary hover:text-white transition-colors shadow-lg"
          aria-label="بعدی"
        >
          <FiChevronLeft size={24} />
        </button>

        {/* نقاط اسلایدر */}
        <div className="flex justify-center gap-2 mt-6">
          {certificatesData?.map((_: any, index: number) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                index === currentIndex
                  ? 'w-8 bg-brand-primary'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`برو به اسلاید ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CertificatesSlider;