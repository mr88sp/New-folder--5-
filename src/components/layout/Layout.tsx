'use client';

import { ReactNode, useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';

/**
 * کامپوننت Layout - ساختار اصلی تمام صفحات
 * شامل هدر، فوتر و محتوای اصلی
 */
interface LayoutProps {
  children: ReactNode;
  siteContent: any;
}

const Layout = ({ children, siteContent }: LayoutProps) => {
  const [pathname, setPathname] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setPathname(window.location.pathname);
    }
  }, []);

  // لیست صفحاتی که نیاز به هدر و فوتر کامل دارند
  const isFullPage = !pathname?.includes('/products/') || 
                     pathname === '/products' ||
                     !pathname?.includes('/categories/');

  return (
    <div className="flex flex-col min-h-screen bg-white" dir="rtl">
      {/* هدر - در همه صفحات */}
      <Header siteContent={siteContent} />
      
      {/* محتوای اصلی */}
      <main className="flex-grow">
        {children}
      </main>
      
      {/* فوتر - در همه صفحات */}
      <Footer siteContent={siteContent} />
    </div>
  );
};

export default Layout;