'use client';

import { motion } from 'framer-motion';
import { FiClock } from 'react-icons/fi';
import workingHoursData from '@/data/contact/working-hours.json';

/**
 * کامپوننت WorkingHours - ساعت کاری
 * منطبق بر ساختار working-hours در contact.html
 */
const WorkingHours = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-white rounded-2xl shadow-lg p-6 mb-12"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center">
          <FiClock className="text-white" size={24} />
        </div>
        <h3 className="text-xl font-bold text-gray-900">ساعت کاری</h3>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200">
        <table className="w-full">
          <tbody className="divide-y divide-gray-200">
            {workingHoursData.map((item, index) => (
              <motion.tr
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className={`hover:bg-gray-50 transition-colors ${
                  item.isHoliday ? 'bg-red-50/50' : ''
                }`}
              >
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  {item.day}
                </td>
                <td className={`px-6 py-4 text-sm ${
                  item.isHoliday ? 'text-red-600' : 'text-gray-700'
                }`}>
                  {item.hours}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-sm text-gray-500 mt-4 flex items-center gap-2">
        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
        جمعه‌ها و تعطیلات رسمی تعطیل می‌باشیم
      </p>
    </motion.div>
  );
};

export default WorkingHours;