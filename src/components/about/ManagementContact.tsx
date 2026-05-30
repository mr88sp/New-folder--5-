'use client';

import { FiPhone, FiMail, FiClock } from 'react-icons/fi';
import Button from '@/components/ui/Button';

interface ManagementContactProps {
  siteContent: any;
}

/**
 * کامپوننت ManagementContact - تماس مستقیم با مدیریت
 * منطبق بر ساختار management-contact در about.html
 */
const ManagementContact = ({ siteContent }: ManagementContactProps) => {

  return (
    <div className="bg-gradient-to-r from-amber-500 to-orange-600 rounded-card p-8 md:p-12 text-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* متن */}
        <div>
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            {siteContent.management_title || "تماس مستقیم با مدیریت"}
          </h2>
          <p className="text-white/90 text-lg mb-6 leading-relaxed">
            {siteContent.management_description || "برای مشاوره تخصصی و حل مسائل پیچیده، مستقیماً با مدیریت در ارتباط باشید"}
          </p>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-button flex items-center justify-center">
                <FiPhone size={24} />
              </div>
              <div>
                <p className="text-sm text-white/80">{siteContent.management_phone_label || "شماره مستقیم:"}</p>
                <a
                  href={`tel:${siteContent.management_phone || "+989123456789"}`}
                  className="text-xl font-bold hover:underline"
                >
                  {siteContent.management_phone || "۰۹۱۲۳۴۵۶۷۸۹"}
                </a>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-button flex items-center justify-center">
                <FiMail size={24} />
              </div>
              <div>
                <p className="text-sm text-white/80">{siteContent.management_email_label || "ایمیل مدیریت:"}</p>
                <a
                  href={`mailto:${siteContent.management_email || "info@soheiliwood.ir"}`}
                  className="text-xl font-bold hover:underline"
                >
                  {siteContent.management_email || "info@soheiliwood.ir"}
                </a>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-button flex items-center justify-center">
                <FiClock size={24} />
              </div>
              <div>
                <p className="text-sm text-white/80">{siteContent.management_hours_label || "ساعت تماس:"}</p>
                <p className="text-xl font-bold">{siteContent.management_hours || "۹ صبح تا ۶ بعدازظهر"}</p>
              </div>
            </div>
          </div>
        </div>

        {/* دکمه اقدام */}
        <div className="text-center lg:text-left">
          <div className="bg-white/10 backdrop-blur-sm rounded-card p-8">
            <div className="text-6xl mb-4">👔</div>
            <h3 className="text-2xl font-bold mb-3">
              {siteContent.management_cta_title || "آماده پاسخگویی هستیم"}
            </h3>
            <p className="text-white/90 mb-6">
              {siteContent.management_cta_description || "مدیریت مجموعه شخصاً به درخواست‌های شما رسیدگی می‌کند"}
            </p>
            <Button
              href={`tel:${siteContent.management_phone || "+989123456789"}`}
              variant="primary"
              size="lg"
              className="w-full bg-white text-brand-primary hover:bg-gray-100"
            >
              {siteContent.management_cta_button || "تماس فوری با مدیریت"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagementContact;
