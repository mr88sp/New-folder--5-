'use client'; 


import Container from '@/components/ui/Container';
import Breadcrumb from '@/components/layout/Breadcrumb';
import ContactCards from '@/components/contact/ContactCards';
import WorkingHours from '@/components/contact/WorkingHours';
import MapSection from '@/components/contact/MapSection';
import DepartmentsGrid from '@/components/contact/DepartmentsGrid';
import SocialLinks from '@/components/contact/SocialLinks';
import FAQAccordion from '@/components/contact/FAQAccordion';
import EmergencyBanner from '@/components/contact/EmergencyBanner';

/**
 * صفحه تماس با ما
 * منطبق بر contact.html
 */
export default function ContactPage() {
  return (
    <div className="pb-16">
      <Breadcrumb />
      
      <Container className="pt-8">
        {/* هدر صفحه */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            تماس با ما
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            برای دریافت مشاوره، استعلام قیمت و هرگونه سوال، با راه‌های ارتباطی زیر در تماس باشید
          </p>
        </div>

        {/* کارت‌های اطلاعات تماس */}
        <ContactCards />

        {/* ساعت کاری و نقشه */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <WorkingHours />
          <MapSection />
        </div>

        {/* دپارتمان‌ها */}
        <DepartmentsGrid />

        {/* شبکه‌های اجتماعی */}
        <SocialLinks />

        {/* سوالات متداول */}
        <FAQAccordion />

        {/* پشتیبانی اضطراری */}
        <EmergencyBanner />
      </Container>
    </div>
  );
}