'use client';

import { motion } from 'framer-motion';

interface ValuesGridProps {
  siteContent: any;
}

/**
 * کامپوننت ValuesGrid - ارزش‌های شرکت
 * منطبق بر ساختار values-grid در about.html
 */
const ValuesGrid = ({ siteContent }: ValuesGridProps) => {
  return (
    <div className="mb-16">
      <div className="text-center mb-12">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
          {siteContent.values_title || "ارزش‌های ما"}
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          {siteContent.values_description || "اصولی که همواره در کارمان دنبال می‌کنیم"}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {siteContent.values_items?.map((value: any, index: number) => (
          <motion.div
            key={value.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group bg-white rounded-card shadow-lg p-6 hover:shadow-xl transition-all hover:-translate-y-2"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-brand-primary/10 to-brand-secondary/10 rounded-card flex items-center justify-center group-hover:scale-110 transition-transform">
                <span className="text-3xl">{value.icon}</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900">
                {value.title}
              </h3>
            </div>
            <p className="text-gray-600 leading-relaxed text-sm">
              {value.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ValuesGrid;