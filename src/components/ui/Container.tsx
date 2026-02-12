import { ReactNode } from 'react';

/**
 * کامپوننت Container - برای محدود کردن عرض محتوا و مرکزچین کردن
 * منطبق بر کلاس container در CSS قبلی
 */
interface ContainerProps {
  children: ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

const Container = ({ 
  children, 
  className = '', 
  as: Tag = 'div' 
}: ContainerProps) => {
  return (
    <Tag className={`container mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </Tag>
  );
};

export default Container;