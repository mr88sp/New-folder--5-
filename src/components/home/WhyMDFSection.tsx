'use client';

import { motion } from 'framer-motion';
import Container from '@/components/ui/Container';
import valuesData from '@/data/about/values.json';

/**
 * کامپوننت WhyMDFSection - بخش چرا MDF سهیلی
 * منطبق بر ساختار card ها در index.html
 */
const WhyMDFSection = () => {
  // استفاده از سه ارزش اول
  const whyItems = valuesData.slice(0, 3);

  return (
    <section className="py-16 bg-gray-50">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            چرا MDF سهیلی؟
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            با ما از مزایای منحصر به فرد MDF با کیفیت بهره‌مند شوید
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {whyItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all hover:-translate-y-2"
            >
              <div className="w-16 h-16 bg-brand-secondary/10 rounded-2xl flex items-center justify-center mb-6">
                <span className="text-3xl">{item.icon}</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {item.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default WhyMDFSection;