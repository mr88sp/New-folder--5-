import Container from '@/components/ui/Container';
import Breadcrumb from '@/components/layout/Breadcrumb';
import ProjectGallery from '@/components/projects/ProjectGallery';
import { FiAward, FiCheckCircle, FiTruck } from 'react-icons/fi';

/**
 * صفحه پروژه‌ها
 */
export default function ProjectsPage() {
  return (
    <div className="pb-16">
      <Breadcrumb />
      
      <Container className="pt-8">
        {/* هدر صفحه */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            پروژه‌های اجرا شده
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            نمونه کارهای واقعی اجرا شده با محصولات Soheili Wood
          </p>
        </div>

        {/* آمار پروژه‌ها */}
        <div className="bg-gradient-to-r from-brand-primary to-brand-dark rounded-3xl p-8 text-white mb-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold mb-2">۱۵+</div>
              <div className="text-sm opacity-90">سال تجربه</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold mb-2">۵۰۰+</div>
              <div className="text-sm opacity-90">پروژه موفق</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold mb-2">۱۰۰%</div>
              <div className="text-sm opacity-90">رضایت مشتری</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold mb-2">۵۰+</div>
              <div className="text-sm opacity-90">شریک تجاری</div>
            </div>
          </div>
        </div>

        {/* گالری پروژه‌ها */}
        <ProjectGallery />

        {/* بخش تماس */}
        <div className="mt-16 bg-gray-50 rounded-3xl p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            پروژه خود را به ما بسپارید
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            تیم متخصص ما آماده اجرای پروژه شما با بالاترین کیفیت و در کوتاه‌ترین زمان است
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/989123456789"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-green-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors"
            >
              <span>مشاوره رایگان در واتساپ</span>
            </a>
            <a
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-white text-gray-700 border border-gray-300 px-8 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              <span>تماس با ما</span>
            </a>
          </div>
        </div>
      </Container>
    </div>
  );
}