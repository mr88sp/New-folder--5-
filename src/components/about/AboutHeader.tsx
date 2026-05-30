'use client';

import { motion } from 'framer-motion';
import { FiAward, FiUsers, FiTruck, FiPackage } from 'react-icons/fi';

interface AboutHeaderProps {
  siteContent: any;
}

/**
 * کامپوننت AboutHeader - هدر صفحه درباره ما
 * منطبق بر ساختار about-header در about.html
 */
const AboutHeader = ({ siteContent }: AboutHeaderProps) => {
  return (
    <div className="relative bg-gradient-to-r from-brand-primary to-brand-dark rounded-card text-white p-8 md:p-12 mb-12 overflow-hidden">
      {/* الگوی پس‌زمینه */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }} />
      </div>

      <div className="relative z-10 text-center max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            {siteContent.about_header_title || "درباره فروشگاه سهیلی"}
          </h1>
          <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
            {siteContent.about_header_description || "با بیش از ۱۵ سال تجربه در صنعت چوب و MDF، کیفیت و رضایت مشتری اولویت ماست"}
          </p>
        </motion.div>

        {/* آمار سریع */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12"
        >
          <div className="bg-white/10 backdrop-blur-sm rounded-card p-4">
            <FiAward className="w-6 h-6 mx-auto mb-2" />
            <div className="text-2xl font-bold">{siteContent.about_page_stats_experience || '۱۵+'}</div>
            <div className="text-sm text-white/80">سال تجربه</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-card p-4">
            <FiUsers className="w-6 h-6 mx-auto mb-2" />
            <div className="text-2xl font-bold">{siteContent.about_page_stats_customers || '۵۰۰۰+'}</div>
            <div className="text-sm text-white/80">مشتری راضی</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-card p-4">
            <FiPackage className="w-6 h-6 mx-auto mb-2" />
            <div className="text-2xl font-bold">{siteContent.about_page_stats_products || '۱۰۰+'}</div>
            <div className="text-sm text-white/80">محصول متنوع</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-card p-4">
            <FiTruck className="w-6 h-6 mx-auto mb-2" />
            <div className="text-2xl font-bold">{siteContent.about_page_stats_support || '۲۴/۷'}</div>
            <div className="text-sm text-white/80">پشتیبانی</div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutHeader;