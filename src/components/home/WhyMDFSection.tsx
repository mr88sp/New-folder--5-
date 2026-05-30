"use client";

import { motion } from "framer-motion";
import { FiCheckCircle, FiShield, FiInfo, FiTruck, FiSettings, FiHeart } from "react-icons/fi";
import Container from "@/components/ui/Container";

/**
 * کامپوننت WhyMDFSection - بخش چرا MDF سهیلی
 * منطبق بر ساختار card ها در index.html
 */
const WhyMDFSection = ({ siteContent }: { siteContent?: any }) => {
  // نقشه‌برداری آیکون‌ها به جای ایموجی‌ها
  const getIcon = (id: string) => {
    switch (id) {
      case "quality": return <FiCheckCircle size={32} />;
      case "honesty": return <FiShield size={32} />;
      case "consulting": return <FiInfo size={32} />;
      case "delivery": return <FiTruck size={32} />;
      case "support": return <FiSettings size={32} />;
      case "environment": return <FiHeart size={32} />;
      default: return <FiHeart size={32} />;
    }
  };

  const whyItems = [
    {
      id: "consulting",
      title: "مشاوره تخصصی",
      description: "تیم کارشناسان ما آماده ارائه مشاوره فنی برای انتخاب بهترین محصول متناسب با نیاز شما هستند."
    },
    {
      id: "honesty",
      title: "صداقت و شفافیت",
      description: "قیمت‌ها و مشخصات فنی محصولات را به صورت شفاف و بدون هیچ گونه ابهامی ارائه می‌دهیم."
    },
    {
      id: "quality",
      title: "کیفیت تضمینی",
      description: "تمامی محصولات ما دارای گواهی کیفیت از تولیدکنندگان معتبر بوده و قبل از ارسال کنترل کیفی می‌شوند."
    }
  ];

  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      {/* تصویر پس‌زمینه با اوورلی تیره */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=2070&auto=format&fit=crop" 
          alt="MDF Background" 
          className="w-full h-full object-cover scale-105"
        />
        <div className="absolute inset-0 bg-brand-dark/85 backdrop-blur-sm"></div>
      </div>

      <Container className="relative z-10 pt-12 md:pt-16">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, type: "spring" }}
            className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white mb-8 tracking-tight"
          >
            چرا MDF سهیلی؟
          </motion.h2>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: "96px" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="h-2 bg-brand-primary mx-auto mb-8 rounded-full shadow-lg shadow-brand-primary/50"
          ></motion.div>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed font-medium"
          >
            با ما از مزایای منحصر به فرد MDF با کیفیت بهره‌مند شوید
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16">
          {whyItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 50, rotateX: 45 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 lg:p-10 border border-white/10 hover:border-brand-primary/50 transition-all hover:-translate-y-4 group perspective-1000"
            >
              <div className="w-24 h-24 bg-brand-primary/20 rounded-3xl flex items-center justify-center mb-10 text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-all duration-500 shadow-2xl shadow-brand-primary/10 group-hover:rotate-[360deg]">
                {getIcon(item.id)}
              </div>
              <h3 className="text-2xl lg:text-3xl font-bold text-white mb-6 group-hover:text-brand-primary transition-colors">
                {item.title}
              </h3>
              <p className="text-gray-300 leading-relaxed text-lg lg:text-xl opacity-80 group-hover:opacity-100 transition-opacity">
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
