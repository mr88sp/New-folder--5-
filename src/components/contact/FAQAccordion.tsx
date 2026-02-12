'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import faqData from '@/data/contact/faq.json';

/**
 * کامپوننت FAQAccordion - سوالات متداول
 * منطبق بر ساختار faq-list در contact.html
 */
const FAQAccordion = () => {
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (id: string) => {
    setOpenItems(prev =>
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="bg-white rounded-2xl shadow-lg p-6 mb-12"
    >
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          سوالات متداول
        </h3>
        <p className="text-gray-600">
          پاسخ به رایج‌ترین سوالات مشتریان
        </p>
      </div>

      <div className="space-y-4">
        {faqData.map((faq) => {
          const isOpen = openItems.includes(faq.id);
          
          return (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="border border-gray-200 rounded-xl overflow-hidden"
            >
              {/* سوال */}
              <button
                onClick={() => toggleItem(faq.id)}
                className="w-full flex items-center justify-between p-4 text-right bg-white hover:bg-gray-50 transition-colors"
              >
                <span className="font-medium text-gray-900">
                  {faq.question}
                </span>
                <span className="text-gray-400">
                  {isOpen ? <FiChevronUp size={20} /> : <FiChevronDown size={20} />}
                </span>
              </button>

              {/* پاسخ */}
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-t border-gray-200 bg-gray-50"
                  >
                    <div className="p-4 text-gray-600 text-sm leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default FAQAccordion;