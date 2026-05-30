'use client';

import { motion } from 'framer-motion';
import { FiGift, FiPercent, FiTruck } from 'react-icons/fi';
import Button from '@/components/ui/Button';

/**
 * کامپوننت DiscountCards - کارت‌های تخفیف و پیشنهادات ویژه
 * منطبق بر ساختار discount-cards در price.html
 */
interface DiscountCardsProps {
  siteContent: any;
}

const DiscountCards = ({ siteContent }: DiscountCardsProps) => {
  const discountsData = siteContent.discount_cards || [];
  
  // آیکون‌های تخفیف
  const getIcon = (badge: string) => {
    if (badge.includes('۱۵٪')) return <FiPercent size={24} />;
    if (badge.includes('۱۰٪')) return <FiGift size={24} />;
    if (badge.includes('ارسال')) return <FiTruck size={24} />;
    return <FiGift size={24} />;
  };

  // رنگ‌بندی کارت‌ها
  const getGradient = (index: number) => {
    const gradients = [
      'from-slate-500 to-gray-600',
      'from-blue-500 to-indigo-600',
      'from-sky-500 to-cyan-600',
    ];
    return gradients[index % gradients.length];
  };

  return (
    <div className="mb-12">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          {siteContent.discount_title || 'پیشنهادات ویژه'}
        </h2>
        <p className="text-gray-600">
          {siteContent.discount_subtitle || 'خرید عمده با تخفیف ویژه'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {discountsData.map((discount, index) => (
          <motion.div
            key={discount.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${getGradient(index)} rounded-card blur-xl opacity-30 group-hover:opacity-50 transition-opacity`}></div>
            
            <div className="relative bg-white rounded-card shadow-lg p-6 hover:shadow-xl transition-all hover:-translate-y-2">
              {/* برچسب تخفیف */}
              <div className="absolute -top-3 -left-3">
                <div className={`bg-gradient-to-r ${getGradient(index)} text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg`}>
                  {discount.badge}
                </div>
              </div>

              {/* آیکون */}
              <div className="w-16 h-16 bg-gray-100 rounded-card flex items-center justify-center mb-4">
                <div className={`text-2xl ${
                  index === 0 ? 'text-slate-600' :
                  index === 1 ? 'text-blue-600' :
                  'text-sky-600'
                }`}>
                  {getIcon(discount.badge)}
                </div>
              </div>

              {/* محتوا */}
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {discount.title}
              </h3>
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                {discount.description}
              </p>

              {/* قیمت */}
              <div className="mb-4">
                <span className="text-sm text-gray-500 block mb-1">{siteContent.discount_special_price_label || 'قیمت ویژه'}</span>
                <span className="text-2xl font-bold text-brand-primary">
                  {discount.price}
                </span>
                {discount.originalPrice && (
                  <span className="text-sm text-gray-400 line-through mr-2">
                    {discount.originalPrice.toLocaleString('fa-IR')} {siteContent.discount_currency_label || 'تومان'}
                  </span>
                )}
              </div>

              {/* دکمه */}
              <Button
                href={siteContent.whatsapp_link || 'https://wa.me/989123456789'}
                variant="primary"
                size="md"
                className="w-full"
                target="_blank"
              >
                {siteContent.discount_inquiry_button || 'استعلام قیمت'}
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default DiscountCards;
