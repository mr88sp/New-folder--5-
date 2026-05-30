import { ButtonHTMLAttributes, ReactNode } from "react";

/**
 * کامپوننت Button - دکمه‌های قابل استفاده در سراسر سایت
 * منطبق بر کلاس‌های btn در CSS قبلی
 */
export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

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
  variant = "primary",
  size = "md",
  href,
  fullWidth = false,
  className = "",
  ...props
}: ButtonProps) => {
  // استایل‌های پایه
  const baseClasses =
    "inline-flex items-center justify-center rounded-button font-bold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-95";

  // استایل‌های اندازه
  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg shadow-lg hover:shadow-xl",
  };

  // استایل‌های نوع دکمه
  const variantClasses = {
    primary:
      "bg-brand-primary text-brand-light hover:bg-brand-dark focus:ring-brand-primary/50 shadow-brand-primary/20",
    secondary:
      "bg-brand-accent text-brand-dark hover:bg-brand-accent/90 focus:ring-brand-accent/50 shadow-brand-accent/20",
    outline:
      "border-2 border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-brand-light focus:ring-brand-primary/50",
    ghost:
      "text-brand-dark hover:bg-brand-primary/10 hover:text-brand-primary focus:ring-brand-primary/30",
  };

  const widthClass = fullWidth ? "w-full" : "";
  const combinedClasses = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${widthClass} ${className}`;

  // اگر href وجود داشته باشد، به عنوان لینک رندر می‌شود
  if (href) {
    return (
      <a href={href} className={combinedClasses} {...props}>
        {children}
      </a>
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
