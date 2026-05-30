'use client';

import { FaWhatsapp } from 'react-icons/fa';
import siteData from '@/data/site.json';
import { motion } from 'framer-motion';

const WhatsAppButton = () => {
  return (
    <motion.a
      href={siteData.social.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-6 left-6 z-[999] bg-[#25D366] text-white p-4 rounded-full shadow-2xl flex items-center justify-center group overflow-hidden transition-all duration-300 hover:pr-6"
      aria-label="تماس در واتساپ"
    >
      <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
      
      <span className="max-w-0 overflow-hidden whitespace-nowrap font-bold text-sm transition-all duration-300 group-hover:max-w-xs group-hover:ml-3">
        مشاوره و سفارش
      </span>
      <FaWhatsapp size={28} className="relative z-10" />
      
      {/* پالس انیمیشن دور دکمه */}
      <div className="absolute inset-0 rounded-full animate-ping bg-[#25D366] opacity-20 pointer-events-none" />
    </motion.a>
  );
};

export default WhatsAppButton;
