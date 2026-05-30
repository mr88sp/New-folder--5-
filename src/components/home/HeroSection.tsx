'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { FiArrowLeft, FiCheck } from 'react-icons/fi';
import Button from '@/components/ui/Button';
import CustomImage from '@/components/ui/CustomImage';
import siteData from '@/data/site.json';

interface Slide {
  id: number;
  title: string;
  description: string;
  image_url: string;
  link?: string;
}

interface HeroSectionProps {
  slides?: Slide[];
  siteContent?: any;
}

const MDFSlider = ({ slides }: { slides?: Slide[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Default images if no slides provided
  const defaultImages = [
    {
      url: '/images/products/mdf-white-16-1.jpg',
      title: 'MDF سفید ۱۶ میل',
      desc: 'بافت صاف و صیقلی برای کابینت مدرن'
    },
    {
      url: '/images/products/mdf-walnut.jpg',
      title: 'MDF طرح گردو',
      desc: 'گرما و اصالت چوب طبیعی در دکوراسیون'
    },
    {
      url: '/images/products/mdf-gray.jpg',
      title: 'MDF خاکستری تیره',
      desc: 'انتخابی هوشمندانه برای طراحی‌های مینیمال'
    }
  ];

  // Map slides to format expected by component or use defaults
  const images = slides && slides.length > 0 
    ? slides.map(s => ({
        url: s.image_url,
        title: s.title,
        desc: s.description
      }))
    : defaultImages;

  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className="relative w-full h-[400px] md:h-[500px] rounded-card overflow-hidden shadow-2xl group">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <CustomImage
            src={images[currentIndex].url}
            alt={images[currentIndex].title}
            className="object-cover w-full h-full"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-transparent to-transparent" />
          
          {/* Content */}
          <div className="absolute bottom-8 right-8 left-8 text-right">
            <motion.h3 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-2xl font-bold text-brand-light mb-2"
            >
              {images[currentIndex].title}
            </motion.h3>
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-brand-light/70 text-sm"
            >
              {images[currentIndex].desc}
            </motion.p>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Progress Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-2 h-2 rounded-full transition-all ${
              idx === currentIndex ? 'bg-brand-accent w-6' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

/**
 * کامپوننت HeroSection - بخش اصلی صفحه اول
 */
const HeroSection = ({ slides, siteContent }: HeroSectionProps) => {
  return (
    <section className="relative bg-gradient-to-b from-gray-50 to-white overflow-hidden py-16 md:py-24">
      {/* الگوی پس‌زمینه */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%232c3e50' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }} />
      </div>

      {/* المان‌های تزئینی شناور */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 5, 0] 
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 right-[10%] w-64 h-64 bg-brand-primary/5 rounded-full blur-3xl"
        />
        <motion.div 
          animate={{ 
            y: [0, 20, 0],
            rotate: [0, -5, 0] 
          }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-20 left-[10%] w-80 h-80 bg-brand-secondary/5 rounded-full blur-3xl"
        />
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
              <span className="text-sm font-medium">{siteContent?.brand_name ? `برند برتر: ${siteContent.brand_name}` : 'بیش از ۱۵ سال تجربه'}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight whitespace-pre-line">
               {siteContent?.hero_section_title ? siteContent.hero_section_title : (
                 <>
                  <span className="text-brand-primary">Soheili Wood</span>
                  <br />
                  فروش تخصصی MDF
                  <br />
                  <span className="text-lg sm:text-xl md:text-2xl text-gray-600 mt-4 block font-normal">
                    عمده و خرده | برش دقیق | ارسال سریع
                  </span>
                 </>
               )}
            </h1>

            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              {siteContent?.hero_section_description || 'تأمین کننده برتر MDF، ورق کابینت و مواد اولیه صنعت چوب با کیفیت عالی و قیمت رقابتی'}
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
                href={siteContent?.whatsapp_link || siteData.social.whatsapp}
                variant="secondary"
                size="lg"
                className="flex items-center justify-center gap-2"
                target="_blank"
              >
                <span>مشاوره واتساپ</span>
              </Button>
            </div>
          </motion.div>

          {/* ===== اسلایدر تصاویر MDF (جایگزین آمار) ===== */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <MDFSlider slides={slides} />

            {/* المان تزئینی */}
            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-brand-accent/20 rounded-full blur-2xl"></div>
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-brand-primary/20 rounded-full blur-2xl"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
