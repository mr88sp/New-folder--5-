'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { FiArrowLeft, FiCheck } from 'react-icons/fi';
import Button from '@/components/ui/Button';
import siteData from '@/data/site.json';

/**
 * کامپوننت HeroSection - بخش اصلی صفحه اول
 * منطبق بر ساختار hero در index.html
 */
const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-b from-gray-50 to-white overflow-hidden py-16 md:py-24">
      {/* الگوی پس‌زمینه */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%232c3e50' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* ===== محتوای متنی ===== */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-right"
          >
            <div className="inline-flex items-center gap-2 bg-brand-primary/10 text-brand-primary px-4 py-2 rounded-full mb-6">
              <FiCheck className="text-sm" />
              <span className="text-sm font-medium">بیش از ۱۵ سال تجربه</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              <span className="text-brand-primary">Soheili Wood</span>
              <br />
              فروش تخصصی MDF
              <br />
              <span className="text-lg sm:text-xl md:text-2xl text-gray-600 mt-4 block font-normal">
                عمده و خرده | برش دقیق | ارسال سریع
              </span>
            </h1>

            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              تأمین کننده برتر MDF، ورق کابینت و مواد اولیه صنعت چوب با کیفیت عالی و قیمت رقابتی
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                href="/products"
                variant="primary"
                size="lg"
                className="flex items-center justify-center gap-2"
              >
                <span>مشاهده محصولات</span>
                <FiArrowLeft />
              </Button>
              <Button
                href={siteData.social.whatsapp}
                variant="secondary"
                size="lg"
                className="flex items-center justify-center gap-2"
                target="_blank"
              >
                <span>مشاوره واتساپ</span>
              </Button>
            </div>
          </motion.div>

          {/* ===== آمار و ارقام ===== */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="bg-gradient-to-br from-brand-primary to-brand-dark rounded-3xl p-8 text-white shadow-2xl">
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 text-center">
                  <div className="text-3xl md:text-4xl font-bold mb-2">۱۵+</div>
                  <div className="text-sm opacity-90">سال تجربه</div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 text-center">
                  <div className="text-3xl md:text-4xl font-bold mb-2">۵۰۰۰+</div>
                  <div className="text-sm opacity-90">مشتری راضی</div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 text-center">
                  <div className="text-3xl md:text-4xl font-bold mb-2">۱۰۰%</div>
                  <div className="text-sm opacity-90">رضایت مشتری</div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 text-center">
                  <div className="text-3xl md:text-4xl font-bold mb-2">۲۴h</div>
                  <div className="text-sm opacity-90">پاسخگویی</div>
                </div>
              </div>
            </div>

            {/* المان تزئینی */}
            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-brand-secondary/20 rounded-full blur-2xl"></div>
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-brand-primary/20 rounded-full blur-2xl"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;