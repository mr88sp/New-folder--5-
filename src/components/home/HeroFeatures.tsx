'use client';

import { motion } from 'framer-motion';
import { FiCheck, FiPackage, FiTruck, FiScissors } from 'react-icons/fi';

/**
 * کامپوننت HeroFeatures - سه ویژگی کنار هیرو
 * منطبق بر ساختار hero-features در index.html
 */
const HeroFeatures = () => {
  const features = [
    {
      icon: <FiCheck className="text-2xl" />,
      title: 'کیفیت تضمینی',
      description: 'محصولات با کیفیت از بهترین کارخانه‌ها'
    },
    {
      icon: <FiPackage className="text-2xl" />,
      title: 'تنوع بالا',
      description: 'انواع رنگ و ضخامت برای هر نیاز'
    },
    {
      icon: <FiTruck className="text-2xl" />,
      title: 'تحویل سریع',
      description: 'ارسال به سراسر کشور در کوتاه‌ترین زمان'
    }
  ];

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
            className="bg-white rounded-2xl shadow-lg p-6 flex items-start gap-4 hover:shadow-xl transition-shadow"
          >
            <div className="w-14 h-14 bg-brand-primary/10 rounded-2xl flex items-center justify-center flex-shrink-0">
              <div className="text-brand-primary">
                {feature.icon}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm">
                {feature.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default HeroFeatures;