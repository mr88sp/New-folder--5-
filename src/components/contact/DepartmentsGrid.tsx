'use client';

import { motion } from 'framer-motion';
import { FiPhone, FiMail, FiUser } from 'react-icons/fi';
import departmentsData from '@/data/contact/departments.json';

/**
 * کامپوننت DepartmentsGrid - دپارتمان‌های سازمانی
 * منطبق بر ساختار departments-grid در contact.html
 */
const DepartmentsGrid = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="mb-12"
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
          دپارتمان‌های ما
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          برای ارتباط با بخش مورد نظر خود
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {departmentsData.map((dept, index) => (
          <motion.div
            key={dept.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all hover:-translate-y-2"
          >
            {/* هدر دپارتمان */}
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-brand-primary/10 to-brand-secondary/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <span className="text-2xl">{dept.icon}</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  {dept.title}
                </h3>
                <p className="text-sm text-gray-500">
                  {dept.description}
                </p>
              </div>
            </div>

            {/* شخص تماس */}
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl mb-4">
              <div className="w-12 h-12 bg-brand-primary/20 rounded-full flex items-center justify-center">
                <FiUser className="text-brand-primary" size={20} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {dept.contactPerson.name}
                </p>
                <p className="text-xs text-gray-500">
                  {dept.contactPerson.position}
                </p>
              </div>
            </div>

            {/* اطلاعات تماس */}
            <div className="space-y-2">
              {dept.contacts.map((contact, idx) => (
                <a
                  key={idx}
                  href={contact.link}
                  className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors"
                  target={contact.type === 'email' ? '_blank' : undefined}
                >
                  {contact.type === 'phone' ? (
                    <FiPhone className="text-gray-400" size={16} />
                  ) : (
                    <FiMail className="text-gray-400" size={16} />
                  )}
                  <span className="text-sm text-gray-700 hover:text-brand-primary transition-colors">
                    {contact.value}
                  </span>
                </a>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default DepartmentsGrid;