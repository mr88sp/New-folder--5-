import { ReactNode } from 'react';

/**
 * کامپوننت SectionTitle - عنوان بخش‌های سایت
 * منطبق بر کلاس‌های section-title و section-subtitle
 */
interface SectionTitleProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

const SectionTitle = ({ 
  title, 
  subtitle, 
  centered = true,
  className = '' 
}: SectionTitleProps) => {
  return (
    <div className={`mb-12 ${centered ? 'text-center' : ''} ${className}`}>
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 relative inline-block">
        {title}
        <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-brand-secondary rounded-full"></span>
      </h2>
      {subtitle && (
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mt-6">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionTitle;