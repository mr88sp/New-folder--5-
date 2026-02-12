'use client';

import { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import { usePathname } from 'next/navigation';

/**
 * کامپوننت Layout - ساختار اصلی تمام صفحات
 * شامل هدر، فوتر و محتوای اصلی
 */
interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const pathname = usePathname();
  
  // لیست صفحاتی که نیاز به هدر و فوتر کامل دارند
  const isFullPage = !pathname?.includes('/products/') || 
                     pathname === '/products' ||
                     !pathname?.includes('/categories/');

  return (
    <div className="flex flex-col min-h-screen bg-white" dir="rtl">
      {/* هدر - در همه صفحات */}
      <Header />
      
      {/* محتوای اصلی با padding-top برای جلوگیری از همپوشانی با هدر ثابت */}
      <main className="flex-grow pt-20">
        {children}
      </main>
      
      {/* فوتر - در همه صفحات */}
      <Footer />
    </div>
  );
};

export default Layout;