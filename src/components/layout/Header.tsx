"use client";

import { useState, useEffect } from "react";
import CustomImage from "@/components/ui/CustomImage";
import {
  FiMenu,
  FiX,
  FiPhone,
  FiMessageSquare,
  FiSearch,
  FiMapPin,
} from "react-icons/fi";
import Button from "@/components/ui/Button";

interface HeaderProps {
  siteContent: any;
}

const Header = ({ siteContent }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [pathname, setPathname] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const updatePath = () => {
      setPathname(window.location.pathname);
    };
    updatePath();
    window.addEventListener("popstate", updatePath);
    return () => window.removeEventListener("popstate", updatePath);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/products?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  const navItems = [
    { name: siteContent.nav_home || "خانه", href: "/" },
    { name: siteContent.nav_products || "محصولات", href: "/products" },
    { name: siteContent.nav_price || "لیست قیمت", href: "/price" },
    { name: siteContent.nav_categories || "رنگ‌بندی", href: "/categories" },
    { name: siteContent.nav_projects || "پروژه‌ها", href: "/projects" },
    { name: siteContent.nav_about || "درباره ما", href: "/about" },
    { name: siteContent.nav_contact || "تماس با ما", href: "/contact" },
  ];

  const getLogoUrl = (path: string) => {
    if (!path) return "";
    if (path.startsWith("http")) return path;
    const baseUrl =
      import.meta.env.PUBLIC_API_BASE_URL ||
      "http://localhost/SOHEILIMDF/admin";
    return `${baseUrl}/${path.replace(/^\//, "")}`;
  };

  const topbarText =
    siteContent.topbar_text ||
    "به فروشگاه سهیلی وود خوش آمدید - کیفیت تضمینی و قیمت رقابتی";
  const topbarMode = siteContent.topbar_mode || "marquee";
  const topbarSpeed = siteContent.topbar_speed || "20";

  return (
    <>
      {/* Top Bar - Hidden on scroll */}
      <div
        className={`hidden md:block bg-brand-dark text-white text-xs border-b border-white/10 transition-all duration-300 relative ${
          isScrolled ? "h-0 overflow-hidden py-0" : "h-8 py-1"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full flex justify-between items-center relative z-10">
          {/* Left Side: Contact Info */}
          <div className="flex items-center gap-6 bg-brand-dark relative z-20 pl-4">
            <a
              href={`tel:${siteContent.phone}`}
              className="flex items-center gap-2 hover:text-brand-primary transition-colors"
            >
              <FiPhone className="text-brand-primary" />
              {siteContent.phone || "09123456789"}
            </a>
            <span className="flex items-center gap-2 text-white/80">
              <FiMapPin className="text-brand-primary" />
              {siteContent.address_short || "تهران، بازار چوب ایران"}
            </span>
          </div>

          {/* Center: Marquee - Constrained and Hidden Behind Sides */}
          <div className="flex-1 mx-4 h-full relative overflow-hidden flex items-center justify-center">
            {topbarMode === "marquee" ? (
              <div
                className="animate-marquee whitespace-nowrap text-white/90 font-medium px-4"
                style={{ animationDuration: `${topbarSpeed}s` }}
              >
                {topbarText}
              </div>
            ) : (
              <span className="font-medium text-white/90 truncate">{topbarText}</span>
            )}
          </div>

          {/* Right Side: Quick Links */}
          <div className="flex items-center gap-4 bg-brand-dark relative z-20 pr-4">
            <a
              href="/about"
              className="hover:text-brand-primary transition-colors"
            >
              درباره ما
            </a>
            <span className="w-px h-3 bg-white/20"></span>
            <a
              href="/contact"
              className="hover:text-brand-primary transition-colors"
            >
              تماس با ما
            </a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header
        className={`sticky top-0 left-0 right-0 z-50 bg-white transition-all duration-300 ${
          isScrolled ? "shadow-lg py-0" : "shadow-sm py-1"
        }`}
        dir="rtl"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4 lg:gap-8">
            {/* Logo */}
            <a href="/" className="flex-shrink-0 flex items-center gap-3 group">
              <div className="relative h-8 md:h-10 w-auto">
                <img
                  src="/header_logo.png"
                  alt={siteContent.brand_name || "Soheili Wood"}
                  className="object-contain h-full w-auto"
                />
              </div>
            </a>

            {/* Search Bar (Desktop) */}
            <div className="hidden md:flex flex-1 max-w-2xl mx-auto relative group px-8">
              <form onSubmit={handleSearch} className="w-full relative">
                <input
                  type="text"
                  placeholder={
                    siteContent.search_placeholder || "جستجو در محصولات..."
                  }
                  className="w-full bg-gray-100 border-2 border-transparent rounded-button py-2 pr-12 pl-4 focus:bg-white focus:border-brand-primary/30 focus:ring-4 focus:ring-brand-primary/10 transition-all text-gray-800 placeholder-gray-400 outline-none"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-brand-primary p-2 transition-colors"
                  aria-label="جستجو"
                >
                  <FiSearch size={20} />
                </button>
              </form>
            </div>

            {/* Price Inquiry Button (Desktop) */}
            <a
              href="/price"
              className="hidden md:flex items-center gap-2 bg-brand-primary text-white font-bold hover:bg-brand-dark px-3 py-2 text-sm rounded-button transition-colors shadow-lg shadow-brand-primary/20"
            >
              <FiMessageSquare size={18} />
              استعلام قیمت روز
            </a>

            {/* Actions */}
            <div className="flex items-center gap-3 md:hidden">
              {/* Mobile Search Toggle */}
              <button
                className="p-2 text-gray-600 hover:text-brand-primary transition-colors"
                onClick={() =>
                  document.getElementById("mobile-search")?.focus()
                }
              >
                <FiSearch size={24} />
              </button>

              {/* Mobile Menu Button */}
              <button
                className="lg:hidden w-10 h-10 flex items-center justify-center rounded-button bg-gray-100 text-gray-700 hover:bg-brand-primary hover:text-white transition-all z-50"
                onClick={() => setIsMenuOpen((prev) => !prev)}
                aria-label="منوی اصلی"
              >
                {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
              </button>
            </div>
          </div>

          {/* Navigation (Desktop) - Bottom Row */}
          <nav
            className={`hidden md:flex items-center gap-6 transition-all duration-300 ${
              isScrolled
                ? "h-0 opacity-0 overflow-hidden mt-0"
                : "h-auto opacity-100 mt-3 pt-3 border-t border-gray-100"
            }`}
          >
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`text-sm font-bold transition-all duration-300 hover:text-brand-primary relative group py-2 ${
                  pathname === item.href
                    ? "text-brand-primary"
                    : "text-gray-600"
                }`}
              >
                {item.name}
                <span
                  className={`absolute -bottom-1 right-0 w-full h-0.5 bg-brand-primary transform origin-right transition-transform duration-300 ${
                    pathname === item.href
                      ? "scale-x-100"
                      : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </a>
            ))}
          </nav>
        </div>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-[100]">
            <div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setIsMenuOpen(false)}
            />
            <div className="absolute inset-y-0 right-0 w-[280px] bg-white shadow-2xl animate-slide-in overflow-y-auto z-[110]">
              <div className="p-6 space-y-6">
                {/* Mobile Menu Header */}
                <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                  <span className="text-lg font-bold text-gray-900">منوی اصلی</span>
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="p-2 text-gray-500 hover:text-brand-primary transition-colors"
                  >
                    <FiX size={24} />
                  </button>
                </div>

                {/* Mobile Search */}
                <form onSubmit={handleSearch} className="relative">
                  <input
                    id="mobile-search"
                    type="text"
                    placeholder="جستجو در محصولات..."
                    className="w-full bg-gray-100 border-none rounded-button py-3 pr-10 pl-4 focus:ring-2 focus:ring-brand-primary text-gray-800"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <FiSearch
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                    size={20}
                  />
                </form>

                {/* Mobile Nav Links */}
                <nav className="flex flex-col gap-2">
                  {navItems.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      className={`flex items-center justify-between py-3 px-4 rounded-button text-base font-bold transition-all ${
                        pathname === item.href
                          ? "bg-brand-primary/10 text-brand-primary"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </a>
                  ))}
                </nav>

                {/* Mobile Actions */}
                <div className="grid grid-cols-1 gap-3 pt-6 border-t border-gray-100">
                  <a
                    href={`tel:${siteContent.phone}`}
                    className="flex items-center justify-center gap-2 py-3 bg-gray-100 rounded-button text-gray-700 font-bold"
                  >
                    <FiPhone />
                    تماس با ما
                  </a>
                  <a
                    href="/price"
                    className="flex items-center justify-center gap-2 py-3 bg-brand-primary hover:bg-brand-dark transition-colors text-white rounded-button font-bold"
                  >
                    <FiMessageSquare />
                    استعلام قیمت
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
