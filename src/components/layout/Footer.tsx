"use client";

import {
  FiPhone,
  FiMail,
  FiMapPin,
  FiClock,
  FiMessageSquare,
  FiInstagram,
  FiSend,
} from "react-icons/fi";

interface FooterProps {
  siteContent: any;
}

/**
 * کامپوننت فوتر - پایین‌ترین بخش سایت
 * منطبق بر ساختار HTML قبلی با اطلاعات تماس و لینک‌های سریع
 */
const Footer = ({ siteContent }: FooterProps) => {
  const currentYear = new Date().getFullYear();
  const jalaliYear = currentYear + 621; // تبدیل به سال شمسی

  const quickLinks = [
    { name: siteContent.footer_home || "خانه", href: "/" },
    { name: siteContent.footer_products || "محصولات", href: "/products" },
    { name: siteContent.footer_price || "استعلام قیمت", href: "/price" },
    {
      name: siteContent.footer_categories || "رنگ‌بندی MDF",
      href: "/categories",
    },
    { name: siteContent.footer_about || "درباره ما", href: "/about" },
    { name: siteContent.footer_contact || "تماس", href: "/contact" },
  ];

  const brandName = siteContent.brand_name || "Soheili Wood";
  const phone = siteContent.contact_page_phone || "021-12345678";
  const email = siteContent.contact_page_email || "info@soheiliwood.com";
  const address =
    siteContent.contact_page_address ||
    "تهران، شهرک صنعتی خاوران، سایت چوب فروشان، خیابان صنوبر یکم";
  const workingHours =
    siteContent.contact_page_hours || "شنبه تا پنجشنبه: ۹ صبح تا ۶ عصر";
  const whatsappLink =
    siteContent.whatsapp_link || "https://wa.me/989123456789";

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8" dir="rtl">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* ===== ستون اول: درباره شرکت ===== */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-brand-secondary rounded-button flex items-center justify-center">
                <span className="text-white text-xl font-bold">SW</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">{brandName}</h3>
                <p className="text-sm text-gray-400">
                  {siteContent.footer_tagline || "فروش تخصصی MDF و ورق کابینت"}
                </p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              {siteContent.footer_description ||
                "با بیش از ۱۵ سال تجربه در تأمین و فروش انواع ورق‌های MDF و مواد اولیه صنعت چوب. کیفیت و رضایت مشتری اولویت ماست."}
            </p>
            <div className="flex items-center gap-3 pt-2">
              {siteContent.social_links?.map((social: any) => (
                <a
                  key={social.id}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 hover:bg-brand-secondary rounded-full flex items-center justify-center transition-colors"
                  aria-label={social.title}
                >
                  <span className="text-xl">{social.icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* ===== ستون دوم: لینک‌های سریع ===== */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold border-b border-gray-800 pb-3 mb-4">
              دسترسی سریع
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-brand-secondary transition-colors flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 bg-brand-secondary rounded-full"></span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ===== ستون سوم: اطلاعات تماس ===== */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold border-b border-gray-800 pb-3 mb-4">
              اطلاعات تماس
            </h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <FiPhone className="text-brand-secondary mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-300 text-sm">تلفن ثابت</p>
                  <a
                    href={`tel:${phone}`}
                    className="text-white hover:text-brand-secondary transition-colors font-medium"
                  >
                    {phone}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FiMail className="text-brand-secondary mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-300 text-sm">ایمیل</p>
                  <a
                    href={`mailto:${email}`}
                    className="text-white hover:text-brand-secondary transition-colors font-medium"
                  >
                    {email}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FiMapPin className="text-brand-secondary mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-300 text-sm">آدرس</p>
                  <p className="text-white text-sm leading-relaxed">
                    {address}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FiClock className="text-brand-secondary mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-300 text-sm">ساعت کاری</p>
                  <p className="text-white text-sm">{workingHours}</p>
                </div>
              </div>
            </div>
          </div>

          {/* ===== ستون چهارم: واتساپ و نقشه ===== */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold border-b border-gray-800 pb-3 mb-4">
              ارتباط مستقیم
            </h4>
            <div className="bg-gray-800 rounded-card p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                  <FiMessageSquare className="text-white text-xl" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">پشتیبانی واتساپ</p>
                  <p className="text-white font-bold">۲۴ ساعته</p>
                </div>
              </div>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-green-600 hover:bg-green-700 text-white text-center py-3 px-4 rounded-button font-medium transition-colors"
              >
                شروع گفتگو
              </a>
              <p className="text-xs text-gray-400 text-center">
                {siteContent.footer_whatsapp_text ||
                  "برای استعلام قیمت و مشاوره رایگان"}
              </p>
            </div>
            <div className="bg-gray-800 rounded-card p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-700 rounded-button flex items-center justify-center">
                  <FiMapPin className="text-brand-secondary" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">
                    {siteContent.footer_map_title || "موقعیت روی نقشه"}
                  </p>
                  <a
                    href={
                      siteContent.footer_map_link ||
                      "https://maps.google.com/?q=تهران، خیابان ولیعصر"
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-brand-secondary text-sm font-medium transition-colors"
                  >
                    {siteContent.footer_map_text || "مشاهده در گوگل مپ"}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ===== کپی‌رایت ===== */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm text-center md:text-right">
              {siteContent.footer_copyright ||
                "تمامی حقوق مادی و معنوی این سایت متعلق به"}{" "}
              {brandName} {siteContent.footer_copyright_suffix || "می‌باشد."}
            </p>
            <p className="text-gray-500 text-sm">
              © {jalaliYear} - {brandName}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
