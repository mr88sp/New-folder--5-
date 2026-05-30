'use client';

import { motion } from 'framer-motion';
import { FiCalendar } from 'react-icons/fi';

interface HistoryTimelineProps {
  siteContent: any;
}

/**
 * کامپوننت HistoryTimeline - تایملاین تاریخچه شرکت
 * منطبق بر ساختار history-timeline در about.html
 */
const HistoryTimeline = ({ siteContent }: HistoryTimelineProps) => {
  return (
    <div className="mb-16">
      <div className="text-center mb-12">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
          {siteContent.history_title || "تاریخچه ما"}
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          {siteContent.history_description || "از یک فروشگاه کوچک تا یکی از معتبرترین تأمین‌کنندگان MDF"}
        </p>
      </div>

      <div className="relative">
        {/* خط عمودی تایملاین */}
        <div className="absolute right-1/2 transform translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-brand-primary to-brand-secondary hidden md:block"></div>

        <div className="space-y-8 md:space-y-12">
          {siteContent.history_items?.map((item: any, index: number) => (
            <motion.div
              key={item.year}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative flex flex-col md:flex-row ${
                index % 2 === 0 ? 'md:flex-row-reverse' : ''
              } items-center gap-6 md:gap-12`}
            >
              {/* سال */}
              <div className="flex items-center justify-center w-full md:w-1/2">
                <div className="bg-gradient-to-r from-brand-primary to-brand-secondary text-white px-6 py-3 rounded-card shadow-lg flex items-center gap-2">
                  <FiCalendar size={20} />
                  <span className="text-xl font-bold">{item.year}</span>
                </div>
              </div>

              {/* محتوا */}
              <div className="w-full md:w-1/2">
                <div className="bg-white rounded-card shadow-lg p-6 hover:shadow-xl transition-all">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                  
                  {/* نقطه روی تایملاین */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-brand-primary rounded-full border-4 border-white shadow-lg hidden md:block"></div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HistoryTimeline;