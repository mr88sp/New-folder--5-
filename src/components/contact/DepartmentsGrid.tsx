'use client';

import { motion } from 'framer-motion';
import { FiPhone, FiMail, FiUser, FiBriefcase, FiSettings, FiTruck } from 'react-icons/fi';

/**
 * کامپوننت DepartmentsGrid - دپارتمان‌های سازمانی
 */
const DepartmentsGrid = ({ siteContent }: { siteContent: any }) => {
  const departmentsData = [
    {
      id: 'sales',
      title: siteContent.contact_page_sales_dept_title || 'فروش و مشاوره',
      description: siteContent.contact_page_sales_dept_desc || 'مشاوره تخصصی، استعلام قیمت و ثبت سفارش',
      icon: <FiBriefcase size={24} />,
      contactPerson: {
        name: siteContent.contact_page_sales_manager_name || 'آقای احمدی',
        position: siteContent.contact_page_sales_manager_position || 'مدیر فروش'
      },
      contacts: [
        {
          type: 'phone',
          label: 'تلفن ثابت',
          value: siteContent.contact_page_sales_phone || '021-12345678',
          link: `tel:${siteContent.contact_page_sales_phone}`
        },
        {
          type: 'email',
          label: 'ایمیل',
          value: siteContent.contact_page_sales_email || 'sales@soheili.com',
          link: `mailto:${siteContent.contact_page_sales_email}`
        }
      ]
    },
    {
      id: 'support',
      title: siteContent.contact_page_support_dept_title || 'پشتیبانی فنی',
      description: siteContent.contact_page_support_dept_desc || 'راهنمایی فنی، نصب و خدمات پس از فروش',
      icon: <FiSettings size={24} />,
      contactPerson: {
        name: siteContent.contact_page_support_manager_name || 'آقای محمدی',
        position: siteContent.contact_page_support_manager_position || 'کارشناس فنی'
      },
      contacts: [
        {
          type: 'phone',
          label: 'تلفن ثابت',
          value: siteContent.contact_page_support_phone || '021-87654321',
          link: `tel:${siteContent.contact_page_support_phone}`
        },
        {
          type: 'email',
          label: 'ایمیل',
          value: siteContent.contact_page_support_email || 'support@soheili.com',
          link: `mailto:${siteContent.contact_page_support_email}`
        }
      ]
    },
    {
      id: 'logistics',
      title: siteContent.contact_page_logistics_dept_title || 'حمل و نقل',
      description: siteContent.contact_page_logistics_dept_desc || 'هماهنگی ارسال، پیگیری سفارشات و تحویل',
      icon: <FiTruck size={24} />,
      contactPerson: {
        name: siteContent.contact_page_logistics_manager_name || 'آقای کریمی',
        position: siteContent.contact_page_logistics_manager_position || 'مدیر لجستیک'
      },
      contacts: [
        {
          type: 'phone',
          label: 'تلفن ثابت',
          value: siteContent.contact_page_logistics_phone || '021-98765432',
          link: `tel:${siteContent.contact_page_logistics_phone}`
        },
        {
          type: 'email',
          label: 'ایمیل',
          value: siteContent.contact_page_logistics_email || 'logistics@soheili.com',
          link: `mailto:${siteContent.contact_page_logistics_email}`
        }
      ]
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="mb-12"
    >
      <div className="text-center mb-12">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
          {siteContent.contact_page_departments_title || 'دپارتمان‌های ما'}
        </h2>
        <div className="h-1 w-20 bg-brand-primary mx-auto rounded-full mb-4"></div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          {siteContent.contact_page_departments_subtitle || 'برای ارتباط سریع‌تر، با بخش مورد نظر خود تماس بگیرید'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {departmentsData.map((dept, index) => (
          <motion.div
            key={dept.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white rounded-card shadow-sm border border-gray-100 p-8 hover:shadow-lg transition-all hover:-translate-y-1"
          >
            <div className="w-16 h-16 bg-brand-primary/10 rounded-2xl flex items-center justify-center text-brand-primary mb-6">
              {dept.icon}
            </div>
            
            <h3 className="text-xl font-bold text-gray-900 mb-3">{dept.title}</h3>
            <p className="text-gray-600 text-sm mb-6 leading-relaxed">{dept.description}</p>
            
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-button mb-6 border border-gray-100">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-400 border border-gray-200">
                <FiUser size={18} />
              </div>
              <div>
                <p className="text-xs text-gray-500">{dept.contactPerson.position}</p>
                <p className="text-sm font-bold text-gray-900">{dept.contactPerson.name}</p>
              </div>
            </div>
            
            <div className="space-y-3">
              {dept.contacts.map((contact, idx) => (
                <a
                  key={idx}
                  href={contact.link}
                  className="flex items-center gap-3 p-3 rounded-button hover:bg-brand-primary/5 transition-all text-gray-700 hover:text-brand-primary group"
                >
                  <div className="text-gray-400 group-hover:text-brand-primary">
                    {contact.type === 'phone' ? <FiPhone size={16} /> : <FiMail size={16} />}
                  </div>
                  <div className="flex-1">
                    <p className="text-[10px] text-gray-400">{contact.label}</p>
                    <p className="text-sm font-medium">{contact.value}</p>
                  </div>
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
