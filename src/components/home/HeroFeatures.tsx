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
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-30">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 -mb-16">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ 
              duration: 0.6, 
              delay: index * 0.15,
              type: "spring",
              stiffness: 100,
              damping: 15
            }}
            whileHover={{ y: -10, transition: { duration: 0.3 } }}
            className="bg-white rounded-2xl shadow-xl p-6 lg:p-8 flex items-center justify-between gap-4 border border-gray-100 group transition-all duration-500"
          >
            <div className="flex-1 text-right">
              <h3 className="text-lg lg:text-xl font-bold text-gray-900 mb-2 group-hover:text-brand-primary transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-500 text-xs lg:text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
            <div className="w-14 h-14 lg:w-16 lg:h-16 bg-brand-primary/10 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:bg-brand-primary group-hover:rotate-12 transition-all duration-500 shadow-inner">
              <div className="text-brand-primary group-hover:text-white transition-colors">
                {feature.icon}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default HeroFeatures;