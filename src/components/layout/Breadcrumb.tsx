'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiChevronLeft } from 'react-icons/fi';

/**
 * کامپوننت Breadcrumb - نمایش مسیر صفحه فعلی
 * منطبق بر ساختار breadcrumbs در HTML قبلی
 */
const Breadcrumb = () => {
  const pathname = usePathname();
  
  // حذف اسلش اول و تبدیل به آرایه
  const paths = pathname.split('/').filter(Boolean);
  
  // نام‌های فارسی برای مسیرها
  const pathNames: Record<string, string> = {
    'products': 'محصولات',
    'price': 'استعلام قیمت',
    'categories': 'رنگ‌بندی MDF',
    'about': 'درباره ما',
    'contact': 'تماس با ما',
  };

  // اگر صفحه اصلی است، خرده‌نان نمایش نده
  if (pathname === '/') {
    return null;
  }

  return (
    <nav className="bg-gray-100 py-3" dir="rtl">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <ol className="flex items-center flex-wrap gap-2 text-sm">
          {/* خانه */}
          <li>
            <Link href="/" className="text-gray-600 hover:text-brand-primary transition-colors">
              خانه
            </Link>
          </li>
          
          {/* جداکننده */}
          <FiChevronLeft className="text-gray-400" />
          
          {/* مسیرها */}
          {paths.map((path, index) => {
            const url = `/${paths.slice(0, index + 1).join('/')}`;
            const isLast = index === paths.length - 1;
            
            // اگر آی‌دی محصول است
            if (path.match(/^\d+$/)) {
              return (
                <li key={url} className="flex items-center gap-2">
                  <span className="text-gray-900 font-medium">
                    جزئیات محصول
                  </span>
                </li>
              );
            }
            
            return (
              <li key={url} className="flex items-center gap-2">
                {!isLast ? (
                  <>
                    <Link
                      href={url}
                      className="text-gray-600 hover:text-brand-primary transition-colors"
                    >
                      {pathNames[path] || path}
                    </Link>
                    <FiChevronLeft className="text-gray-400" />
                  </>
                ) : (
                  <span className="text-gray-900 font-medium">
                    {pathNames[path] || path}
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
};

export default Breadcrumb;