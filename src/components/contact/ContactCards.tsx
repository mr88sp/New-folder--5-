'use client';

import { motion } from 'framer-motion';
import { FiPhone, FiMail, FiMapPin, FiGlobe } from 'react-icons/fi';
import officesData from '@/data/contact/offices.json';

/**
 * کامپوننت ContactCards - کارت‌های اطلاعات تماس
 * منطبق بر ساختار contact-card در contact.html
 */
const ContactCards = () => {
  // آیکون بر اساس نوع دفتر
  const getOfficeIcon = (type: string) => {
    switch (type) {
      case 'دفتر مرکزی':
        return <FiMapPin size={24} />;
      case 'شعبه':
        return <FiGlobe size={24} />;
      case 'الکترونیکی':
        return <FiMail size={24} />;
      default:
        return <FiPhone size={24} />;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
      {officesData.map((office, index) => (
        <motion.div
          key={office.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="group bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all hover:-translate-y-2"
        >
          {/* هدر کارت */}
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 bg-gradient-to-br from-brand-primary/10 to-brand-secondary/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <div className="text-brand-primary">
                {getOfficeIcon(office.type)}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">
                {office.title}
              </h3>
              <span className="text-sm text-gray-500">
                {office.type}
              </span>
            </div>
          </div>

          {/* اطلاعات تماس */}
          <div className="space-y-3">
            {office.items.map((item, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <span className="text-gray-400 text-sm min-w-[60px]">
                  {item.label}
                </span>
                {item.link ? (
                  <a
                    href={item.link}
                    className="text-gray-700 hover:text-brand-primary transition-colors text-sm flex-1"
                    target={item.type === 'url' ? '_blank' : undefined}
                    rel={item.type === 'url' ? 'noopener noreferrer' : undefined}
                  >
                    {item.value}
                  </a>
                ) : (
                  <span className="text-gray-700 text-sm flex-1">
                    {item.value}
                  </span>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ContactCards;