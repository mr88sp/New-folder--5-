import { ButtonHTMLAttributes, ReactNode } from 'react';
import Link from 'next/link';

/**
 * کامپوننت Button - دکمه‌های قابل استفاده در سراسر سایت
 * منطبق بر کلاس‌های btn در CSS قبلی
 */
export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  fullWidth?: boolean;
  className?: string;
  target?: string; // برای لینک‌های خارجی (مثال: _blank)
}

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  href,
  fullWidth = false,
  className = '',
  ...props
}: ButtonProps) => {
  // استایل‌های پایه
  const baseClasses = 'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  // استایل‌های اندازه
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };
  
  // استایل‌های نوع دکمه
  const variantClasses = {
    primary: 'bg-brand-primary text-white hover:bg-brand-dark focus:ring-brand-primary/50',
    secondary: 'bg-brand-secondary text-white hover:bg-[#d35400] focus:ring-brand-secondary/50',
    outline: 'border-2 border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white focus:ring-brand-primary/50',
    ghost: 'text-gray-700 hover:bg-gray-100 hover:text-brand-primary focus:ring-gray-500/50',
  };
  
  const widthClass = fullWidth ? 'w-full' : '';
  const combinedClasses = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${widthClass} ${className}`;

  // اگر href وجود داشته باشد، به عنوان لینک رندر می‌شود
  if (href) {
    return (
      <Link href={href} className={combinedClasses}>
        {children}
      </Link>
    );
  }

  // در غیر این صورت به عنوان دکمه معمولی
  return (
    <button className={combinedClasses} {...props}>
      {children}
    </button>
  );
};

export default Button;