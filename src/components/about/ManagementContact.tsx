'use client';

import { FiPhone, FiMail, FiClock } from 'react-icons/fi';
import Button from '@/components/ui/Button';
import contactData from '@/data/contact/contact.json';

/**
 * کامپوننت ManagementContact - تماس مستقیم با مدیریت
 * منطبق بر ساختار management-contact در about.html
 */
const ManagementContact = () => {
  const { management } = contactData;

  return (
    <div className="bg-gradient-to-r from-amber-500 to-orange-600 rounded-3xl p-8 md:p-12 text-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* متن */}
        <div>
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            تماس مستقیم با مدیریت
          </h2>
          <p className="text-white/90 text-lg mb-6 leading-relaxed">
            برای مشاوره تخصصی و حل مسائل پیچیده، مستقیماً با مدیریت در ارتباط باشید
          </p>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <FiPhone size={24} />
              </div>
              <div>
                <p className="text-sm text-white/80">شماره مستقیم:</p>
                <a
                  href={`tel:${management.phone}`}
                  className="text-xl font-bold hover:underline"
                >
                  {management.phone}
                </a>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <FiMail size={24} />
              </div>
              <div>
                <p className="text-sm text-white/80">ایمیل مدیریت:</p>
                <a
                  href={`mailto:${management.email}`}
                  className="text-xl font-bold hover:underline"
                >
                  {management.email}
                </a>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <FiClock size={24} />
              </div>
              <div>
                <p className="text-sm text-white/80">ساعت تماس:</p>
                <p className="text-xl font-bold">{management.hours}</p>
              </div>
            </div>
          </div>
        </div>

        {/* دکمه اقدام */}
        <div className="text-center lg:text-left">
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8">
            <div className="text-6xl mb-4">👔</div>
            <h3 className="text-2xl font-bold mb-3">
              آماده پاسخگویی هستیم
            </h3>
            <p className="text-white/90 mb-6">
              مدیریت مجموعه شخصاً به درخواست‌های شما رسیدگی می‌کند
            </p>
            <Button
              href={`tel:${management.phone}`}
              variant="primary"
              size="lg"
              className="w-full bg-white text-amber-600 hover:bg-gray-100"
            >
              تماس فوری با مدیریت
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagementContact;