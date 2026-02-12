'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { FiMenu, FiX, FiPhone, FiMessageSquare } from 'react-icons/fi';
import siteData from '@/data/site.json';

/**
 * کامپوننت هدر - نوار ناوبری اصلی سایت
 * منطبق بر ساختار HTML قبلی با قابلیت ریسپانسیو
 */
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  // آیتم‌های منوی اصلی
  const navItems = [
    { name: 'خانه', href: '/' },
    { name: 'محصولات', href: '/products' },
    { name: 'استعلام قیمت', href: '/price' },
    { name: 'رنگ‌بندی MDF', href: '/categories' },
    { name: 'درباره ما', href: '/about' },
    { name: 'تماس', href: '/contact' },
  ];

  // تشخیص اسکرول برای تغییر استایل هدر
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // بستن منوی موبایل هنگام تغییر مسیر
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-md py-2' 
          : 'bg-white shadow-sm py-4'
      }`}
      dir="rtl"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* ===== لوگو ===== */}
          <Link href="/" className="flex items-center gap-3 group">
            {siteData.brand.logo.type === 'image' ? (
              <div className="relative w-10 h-10">
                <Image
                  src={siteData.brand.logo.value}
                  alt={siteData.brand.name}
                  fill
                  className="object-contain"
                />
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-brand-primary rounded-lg flex items-center justify-center">
                  <span className="text-white text-xl font-bold">SW</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-bold text-gray-900 group-hover:text-brand-primary transition-colors">
                    {siteData.brand.name}
                  </span>
                  <span className="text-xs text-gray-500 hidden sm:block">
                    فروش تخصصی MDF
                  </span>
                </div>
              </div>
            )}
          </Link>

          {/* ===== منوی دسکتاپ ===== */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-brand-secondary relative group ${
                  pathname === item.href
                    ? 'text-brand-secondary'
                    : 'text-gray-700'
                }`}
              >
                {item.name}
                <span 
                  className={`absolute -bottom-1 left-0 w-full h-0.5 bg-brand-secondary transform scale-x-0 transition-transform group-hover:scale-x-100 ${
                    pathname === item.href ? 'scale-x-100' : ''
                  }`}
                />
              </Link>
            ))}
          </nav>

          {/* ===== تماس سریع و دکمه سفارش ===== */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href={`tel:${siteData.contact.phone}`}
              className="flex items-center gap-2 text-gray-700 hover:text-brand-primary transition-colors"
            >
              <FiPhone className="text-brand-secondary" />
              <span className="text-sm font-medium">{siteData.contact.phone}</span>
            </a>
            <a
              href={siteData.social.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              <FiMessageSquare />
              <span>سفارش واتساپ</span>
            </a>
          </div>

          {/* ===== دکمه همبرگری موبایل ===== */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-700 hover:text-brand-primary transition-colors p-2"
            aria-label="منو"
          >
            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* ===== منوی موبایل ===== */}
        {isMenuOpen && (
          <div className="md:hidden fixed inset-0 top-[72px] bg-white z-40 animate-fade-in">
            <nav className="flex flex-col p-6 gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`py-3 px-4 rounded-lg text-base font-medium transition-colors ${
                    pathname === item.href
                      ? 'bg-brand-primary/10 text-brand-primary'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="border-t border-gray-200 my-4 pt-4">
                <div className="flex flex-col gap-3">
                  <a
                    href={`tel:${siteData.contact.phone}`}
                    className="flex items-center gap-3 py-3 px-4 text-gray-700 hover:bg-gray-50 rounded-lg"
                  >
                    <FiPhone className="text-brand-secondary" />
                    <span>{siteData.contact.phone}</span>
                  </a>
                  <a
                    href={siteData.social.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-medium transition-colors"
                  >
                    <FiMessageSquare />
                    <span>سفارش از طریق واتساپ</span>
                  </a>
                </div>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;