"use client";

import { motion } from "framer-motion";
import { 
  FiAward, FiUsers, FiPackage, FiClock, FiTrendingUp, 
  FiCheck, FiShield, FiInfo, FiTruck, FiHeart, FiStar 
} from "react-icons/fi";
import Container from "@/components/ui/Container";

interface AboutPageContentProps {
  siteContent: any;
}

export default function AboutPageContent({ siteContent }: AboutPageContentProps) {
  // ============ دیتای پیش‌فرض ============
  const historyData = siteContent.history_items || [
    {
      year: 1389,
      title: 'تأسیس فروشگاه',
      description: 'فروشگاه سهیلی با هدف تأمین مواد اولیه صنعت چوب در تهران آغاز به کار کرد.'
    },
    {
      year: 1392,
      title: 'توسعه محصولات',
      description: 'با اضافه شدن محصولات MDF به سبد کالا، خدمات ما به صنعت کابینت‌سازی گسترش یافت.'
    },
    {
      year: 1395,
      title: 'همکاری با تولیدکنندگان بین‌المللی',
      description: 'انعقاد قرارداد با تولیدکنندگان مطرح اروپایی برای واردات MDF با کیفیت.'
    },
    {
      year: 1400,
      title: 'راه‌اندازی فروشگاه اینترنتی',
      description: 'با راه‌اندازی وبسایت، خدمات ما به سراسر کشور گسترش پیدا کرد.'
    }
  ];

  const valuesData = [
    {
      id: 'quality',
      icon: <FiCheck className="text-brand-primary" />,
      title: 'کیفیت تضمینی',
      description: 'تمامی محصولات ما دارای گواهی کیفیت از تولیدکنندگان معتبر بوده و قبل از ارسال کنترل کیفی می‌شوند.'
    },
    {
      id: 'honesty',
      icon: <FiShield className="text-brand-primary" />,
      title: 'صداقت و شفافیت',
      description: 'قیمت‌ها و مشخصات فنی محصولات را به صورت شفاف و بدون هیچ گونه ابهامی ارائه می‌دهیم.'
    },
    {
      id: 'consulting',
      icon: <FiInfo className="text-brand-primary" />,
      title: 'مشاوره تخصصی',
      description: 'تیم کارشناسان ما آماده ارائه مشاوره فنی برای انتخاب بهترین محصول متناسب با نیاز شما هستند.'
    },
    {
      id: 'delivery',
      icon: <FiTruck className="text-brand-primary" />,
      title: 'تحویل به موقع',
      description: 'با ناوگان حمل اختصاصی، سفارشات شما در کمترین زمان ممکن به مقصد می‌رسند.'
    }
  ];

  return (
    <Container className="pt-8">
      {/* ============ هدر صفحه ============ */}
      <div className="relative bg-gradient-to-r from-brand-primary to-brand-dark rounded-card text-white p-8 md:p-12 mb-12 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }} />
        </div>

        <div className="relative z-10 text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              {siteContent.about_page_title || 'درباره فروشگاه سهیلی'}
            </h1>
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
              {siteContent.about_page_subtitle || 'با بیش از ۱۵ سال تجربه در صنعت چوب و MDF، کیفیت و رضایت مشتری اولویت ماست'}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12"
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-card p-4">
              <FiAward className="w-6 h-6 mx-auto mb-2" />
              <div className="text-2xl font-bold">{siteContent.about_page_stats_experience || '۱۵+'}</div>
              <div className="text-sm text-white/80">سال تجربه</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-card p-4">
              <FiUsers className="w-6 h-6 mx-auto mb-2" />
              <div className="text-2xl font-bold">{siteContent.about_page_stats_customers || '۵۰۰۰+'}</div>
              <div className="text-sm text-white/80">مشتری راضی</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-card p-4">
              <FiPackage className="w-6 h-6 mx-auto mb-2" />
              <div className="text-2xl font-bold">{siteContent.about_page_stats_products || '۱۰۰+'}</div>
              <div className="text-sm text-white/80">محصول متنوع</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-card p-4">
              <FiClock className="w-6 h-6 mx-auto mb-2" />
              <div className="text-2xl font-bold">{siteContent.about_page_stats_support || '۲۴/۷'}</div>
              <div className="text-sm text-white/80">پشتیبانی</div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ============ بخش ارزش‌ها ============ */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {valuesData.map((value, index) => (
          <motion.div
            key={value.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white rounded-card shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all"
          >
            <div className="w-12 h-12 bg-brand-primary/10 rounded-button flex items-center justify-center mb-4">
              {value.icon}
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">{value.title}</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
          </motion.div>
        ))}
      </div>

      {/* ============ تاریخچه ============ */}
      <div className="bg-gray-50 rounded-card p-8 md:p-12 mb-16">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-12 text-center">تاریخچه و مسیر رشد ما</h2>
        <div className="relative border-r-2 border-brand-primary/20 pr-8 space-y-12 max-w-3xl mx-auto">
          {historyData.map((item: any, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="absolute -right-[41px] top-0 w-5 h-5 bg-brand-primary rounded-full border-4 border-white shadow-sm"></div>
              <div className="text-brand-primary font-bold text-xl mb-1">{item.year}</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-gray-600 leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </Container>
  );
}
