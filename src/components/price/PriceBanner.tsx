'use client';

import { FiCalendar, FiInfo } from 'react-icons/fi';

/**
 * کامپوننت PriceBanner - بنر بالای صفحه استعلام قیمت
 * منطبق بر ساختار price-banner در price.html
 */
interface PriceBannerProps {
  siteContent: any;
}

const PriceBanner = ({ siteContent }: PriceBannerProps) => {
  const lastUpdate = siteContent.price_last_update || '۱۴۰۳/۱۰/۲۵';
  
  return (
    <div className="bg-gradient-to-r from-brand-primary to-brand-dark rounded-card text-white p-8 mb-8">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        {/* متن اصلی */}
        <div className="text-center md:text-right">
          <h1 className="text-2xl md:text-3xl font-bold mb-3">
            {siteContent.price_banner_title || 'لیست قیمت ورق‌های MDF'}
          </h1>
          <p className="text-white/90 text-base">
            {siteContent.price_banner_subtitle?.replace('{lastUpdate}', lastUpdate) || `آخرین بروزرسانی: ${lastUpdate} - قیمت‌ها به تومان می‌باشند`}
          </p>
        </div>

        {/* تاریخچه قیمت */}
        <div className="flex items-center gap-4">
          <div className="bg-white/20 backdrop-blur-sm rounded-button px-4 py-3 flex items-center gap-2">
            <FiCalendar className="text-white" size={20} />
            <div className="text-right">
              <span className="text-xs text-white/80 block">{siteContent.price_last_change_label || 'آخرین تغییر'}</span>
              <span className="text-sm font-bold">{lastUpdate}</span>
            </div>
          </div>
          
          <div className="bg-white/20 backdrop-blur-sm rounded-button px-4 py-3">
            <div className="flex items-center gap-2">
              <FiInfo size={20} />
              <span className="text-sm">{siteContent.price_tax_notice || 'قیمت‌ها بدون مالیات'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceBanner;