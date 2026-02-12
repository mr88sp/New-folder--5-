import { ReactNode } from 'react';

/**
 * کامپوننت Card - کارت قابل استفاده در سراسر سایت
 * منطبق بر کلاس card در CSS قبلی
 */
interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const Card = ({ 
  children, 
  className = '', 
  hover = true,
  padding = 'md' 
}: CardProps) => {
  const paddingClasses = {
    none: 'p-0',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  const hoverClasses = hover 
    ? 'transition-all duration-300 hover:shadow-xl hover:-translate-y-2' 
    : '';

  return (
    <div className={`
      bg-white rounded-2xl shadow-lg overflow-hidden
      ${paddingClasses[padding]}
      ${hoverClasses}
      ${className}
    `}>
      {children}
    </div>
  );
};

export default Card;