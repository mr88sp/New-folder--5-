'use client';

import { motion } from 'framer-motion';
import { FiMapPin, FiNavigation } from 'react-icons/fi';
import Button from '@/components/ui/Button';

/**
 * کامپوننت MapSection - نقشه و موقعیت
 * منطبق بر ساختار map-section در contact.html
 */
const MapSection = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="bg-white rounded-2xl shadow-lg p-6 mb-12"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-600 rounded-2xl flex items-center justify-center">
          <FiMapPin className="text-white" size={24} />
        </div>
        <h3 className="text-xl font-bold text-gray-900">موقعیت ما روی نقشه</h3>
      </div>

      <div className="relative h-[400px] rounded-xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 mb-6">
        {/* نمایش نقشه استاتیک (می‌توانید با Google Maps یا Leaflet جایگزین کنید) */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-4 shadow-lg">
            <FiMapPin className="text-red-500" size={32} />
          </div>
          <h4 className="text-xl font-bold text-gray-900 mb-2">
            دفتر مرکزی تهران
          </h4>
          <p className="text-gray-600 mb-6 max-w-md">
            تهران، خیابان ولیعصر، نرسیده به میدان ولیعصر، پلاک ۱۲۳۴
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              href="https://maps.google.com/?q=تهران، خیابان ولیعصر"
              variant="primary"
              size="md"
              className="flex items-center gap-2"
              target="_blank"
            >
              <FiNavigation size={18} />
              <span>مسیریابی در گوگل مپ</span>
            </Button>
            <Button
              href="https://balad.ir/p/123456"
              variant="outline"
              size="md"
              className="flex items-center gap-2"
              target="_blank"
            >
              <span>نقشه بلد</span>
            </Button>
          </div>
        </div>

        {/* المان تزئینی نقشه */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <span className="text-blue-600">🚇</span>
          </div>
          <div>
            <p className="text-xs text-gray-500">مترو</p>
            <p className="text-sm font-medium">ایستگاه ولیعصر</p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
            <span className="text-green-600">🚌</span>
          </div>
          <div>
            <p className="text-xs text-gray-500">اتوبوس</p>
            <p className="text-sm font-medium">ایستگاه ولیعصر</p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
          <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
            <span className="text-amber-600">🅿️</span>
          </div>
          <div>
            <p className="text-xs text-gray-500">پارکینگ</p>
            <p className="text-sm font-medium">پارکینگ طبقاتی</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MapSection;