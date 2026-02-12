import HeroSection from '@/components/home/HeroSection';
import HeroFeatures from '@/components/home/HeroFeatures';
import WhyMDFSection from '@/components/home/WhyMDFSection';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import siteData from '@/data/site.json';

/**
 * صفحه اصلی سایت Soheili Wood
 * شامل بخش‌های:
 * - Hero
 * - Hero Features
 * - Why MDF
 * - Featured Products
 * - CTA Section
 */
export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* ===== بخش هیرو ===== */}
      <HeroSection />
      
      {/* ===== ویژگی‌های هیرو ===== */}
      <HeroFeatures />

      {/* ===== چرا MDF سهیلی ===== */}
      <WhyMDFSection />

      {/* ===== محصولات ویژه ===== */}
      <FeaturedProducts />

      {/* ===== بخش تماس سریع ===== */}
      <section className="py-16 bg-gradient-to-r from-brand-primary to-brand-dark text-white">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              آماده دریافت سفارش شما هستیم
            </h2>
            <p className="text-xl mb-8 opacity-90 leading-relaxed">
              برای استعلام قیمت، مشاوره تخصصی و ثبت سفارش، همین حالا با ما تماس بگیرید
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                href={`tel:${siteData.contact.phone}`}
                variant="primary"
                size="lg"
                className="bg-white text-brand-primary hover:bg-gray-100"
              >
                📞 تماس تلفنی: {siteData.contact.phone}
              </Button>
              <Button
                href={siteData.social.whatsapp}
                variant="secondary"
                size="lg"
                className="bg-green-600 hover:bg-green-700 text-white"
                target="_blank"
              >
                💬 مشاوره رایگان در واتساپ
              </Button>
            </div>
            <p className="text-sm opacity-75 mt-6">
              * پاسخگویی ۲۴ ساعته، حتی روزهای تعطیل
            </p>
          </div>
        </Container>
      </section>
    </div>
  );
}