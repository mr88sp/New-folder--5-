'use client';

import { motion } from 'framer-motion';
import { FiDollarSign, FiCheckCircle, FiTruck } from 'react-icons/fi';

/**
 * کامپوننت TableFeatures - ویژگی‌های جداول قیمت
 * منطبق بر ساختار table-features در price.html
 */
interface TableFeaturesProps {
  siteContent: any;
}

const TableFeatures = ({ siteContent }: TableFeaturesProps) => {
  const features = [
    {
      icon: <FiDollarSign className="text-white" size={24} />,
      title: siteContent.price_feature_1_title || 'قیمت رقابتی',
      description: siteContent.price_feature_1_desc || 'بهترین قیمت‌ها در بازار با حذف واسطه‌ها و خرید مستقیم از کارخانه',
      bgColor: 'bg-gradient-to-br from-green-500 to-emerald-600',
    },
    {
      icon: <FiCheckCircle className="text-white" size={24} />,
      title: siteContent.price_feature_2_title || 'کیفیت تضمینی',
      description: siteContent.price_feature_2_desc || 'کلیه محصولات دارای گواهی کیفیت از تولیدکنندگان معتبر داخلی و خارجی',
      bgColor: 'bg-gradient-to-br from-blue-500 to-indigo-600',
    },
    {
      icon: <FiTruck className="text-white" size={24} />,
      title: siteContent.price_feature_3_title || 'تحویل سریع',
      description: siteContent.price_feature_3_desc || 'تحویل در کمترین زمان ممکن به سراسر کشور با ناوگان حمل اختصاصی',
      bgColor: 'bg-gradient-to-br from-slate-600 to-gray-800',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-12">
      {features.map((feature, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="bg-white rounded-card shadow-lg p-6 hover:shadow-xl transition-all hover:-translate-y-2"
        >
          <div className={`w-14 h-14 ${feature.bgColor} rounded-card flex items-center justify-center mb-4 shadow-lg`}>
            {feature.icon}
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">
            {feature.title}
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            {feature.description}
          </p>
        </motion.div>
      ))}
    </div>
  );
};

export default TableFeatures;
