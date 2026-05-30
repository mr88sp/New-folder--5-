'use client';

import { motion } from 'framer-motion';
import { FiClock } from 'react-icons/fi';

/**
 * کامپوننت WorkingHours - ساعت کاری
 */
const WorkingHours = ({ siteContent }: { siteContent: any }) => {
  const workingHoursData = [
    {
      id: 'saturday',
      day: 'شنبه',
      hours: siteContent.contact_page_saturday_hours || '۸:۰۰ - ۱۸:۰۰',
      isHoliday: false
    },
    {
      id: 'sunday',
      day: 'یکشنبه',
      hours: siteContent.contact_page_sunday_hours || '۸:۰۰ - ۱۸:۰۰',
      isHoliday: false
    },
    {
      id: 'monday',
      day: 'دوشنبه',
      hours: siteContent.contact_page_monday_hours || '۸:۰۰ - ۱۸:۰۰',
      isHoliday: false
    },
    {
      id: 'tuesday',
      day: 'سه‌شنبه',
      hours: siteContent.contact_page_tuesday_hours || '۸:۰۰ - ۱۸:۰۰',
      isHoliday: false
    },
    {
      id: 'wednesday',
      day: 'چهارشنبه',
      hours: siteContent.contact_page_wednesday_hours || '۸:۰۰ - ۱۸:۰۰',
      isHoliday: false
    },
    {
      id: 'thursday',
      day: 'پنج‌شنبه',
      hours: siteContent.contact_page_thursday_hours || '۸:۰۰ - ۱۴:۰۰',
      isHoliday: false
    },
    {
      id: 'friday',
      day: 'جمعه',
      hours: siteContent.contact_page_friday_hours || 'تعطیل',
      isHoliday: true
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-white rounded-card shadow-lg p-6 mb-12 h-full"
    >
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-card flex items-center justify-center flex-shrink-0">
          <FiClock className="text-white" size={24} />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900">
            {siteContent.contact_page_working_hours_title || 'ساعت کاری'}
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            پذیرای شما در طول ایام هفته هستیم
          </p>
        </div>
      </div>

      <div className="overflow-hidden rounded-button border border-gray-100">
        <table className="w-full text-right">
          <tbody className="divide-y divide-gray-100">
            {workingHoursData.map((item, index) => (
              <tr
                key={item.id}
                className={`transition-colors ${
                  item.isHoliday ? "bg-red-50/50" : "hover:bg-gray-50"
                }`}
              >
                <td className="px-6 py-4 text-sm font-bold text-gray-800">
                  {item.day}
                </td>
                <td className={`px-6 py-4 text-sm ${
                  item.isHoliday ? 'text-red-600 font-bold' : 'text-gray-600'
                }`}>
                  {item.hours}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-sm text-gray-500 mt-6 flex items-center gap-2 bg-gray-50 p-3 rounded-button border border-gray-100">
        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
        {siteContent.contact_page_working_hours_note ||
          "جمعه‌ها و تعطیلات رسمی تعطیل می‌باشیم"}
      </p>
    </motion.div>
  );
};

export default WorkingHours;
