'use client';

import { motion } from 'framer-motion';
import { FiPhone, FiAlertCircle } from 'react-icons/fi';
import Button from '@/components/ui/Button';

interface EmergencyBannerProps {
  siteContent: any;
}

/**
 * کامپوننت EmergencyBanner - بنر پشتیبانی اضطراری
 * منطبق بر ساختار emergency-banner در contact.html
 */
const EmergencyBanner = ({ siteContent }: EmergencyBannerProps) => {

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.7 }}
      className="bg-gradient-to-r from-red-600 to-red-700 rounded-card p-8 text-white"
    >
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        {/* آیکون و متن */}
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-white/20 rounded-card flex items-center justify-center">
            <FiAlertCircle className="text-white" size={32} />
          </div>
          <div>
            <h3 className="text-xl md:text-2xl font-bold mb-2">
              {siteContent.emergency_title || "پشتیبانی اضطراری"}
            </h3>
            <p className="text-white/90">
              {siteContent.emergency_description || "برای پاسخگویی فوری و مشاوره اضطراری"}
            </p>
          </div>
        </div>

        {/* شماره تماس */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-button px-6 py-3">
            <FiPhone size={24} />
            <div>
              <p className="text-xs text-white/80">{siteContent.emergency_call_text || "تماس فوری"}</p>
              <a
                href={siteContent.emergency_link || "tel:+989123456789"}
                className="text-xl font-bold hover:underline"
              >
                {siteContent.emergency_phone || "۰۹۱۲۳۴۵۶۷۸۹"}
              </a>
            </div>
          </div>
          <Button
            href={siteContent.emergency_link || "tel:+989123456789"}
            variant="primary"
            size="lg"
            className="bg-white text-red-600 hover:bg-gray-100"
          >
            {siteContent.emergency_button_text || "تماس اضطراری"}
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default EmergencyBanner;
