'use client';

import { motion } from 'framer-motion';
import socialData from '@/data/contact/social.json';

/**
 * کامپوننت SocialLinks - شبکه‌های اجتماعی
 * منطبق بر ساختار social-grid در contact.html
 */
const SocialLinks = () => {
  // رنگ‌های هر پلتفرم
  const platformColors = {
    whatsapp: 'bg-green-500 hover:bg-green-600',
    telegram: 'bg-blue-500 hover:bg-blue-600',
    instagram: 'bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500',
    linkedin: 'bg-blue-700 hover:bg-blue-800',
    email: 'bg-gray-600 hover:bg-gray-700',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="bg-white rounded-2xl shadow-lg p-6 mb-12"
    >
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          ما را در شبکه‌های اجتماعی دنبال کنید
        </h3>
        <p className="text-gray-600">
          برای دریافت جدیدترین اخبار و تخفیف‌ها
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-4">
        {socialData.map((social, index) => (
          <motion.a
            key={social.id}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className={`
              w-16 h-16 rounded-2xl flex flex-col items-center justify-center gap-1
              text-white shadow-lg hover:shadow-xl transition-all hover:-translate-y-2
              ${platformColors[social.platform as keyof typeof platformColors]}
            `}
          >
            <span className="text-2xl">{social.icon}</span>
            <span className="text-xs font-medium">{social.title}</span>
          </motion.a>
        ))}
      </div>
    </motion.div>
  );
};

export default SocialLinks;