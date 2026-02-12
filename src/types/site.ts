/**
 * تایپ‌های مربوط به تنظیمات سایت
 * منطبق بر ساختار دیتای site.json
 */

// ============ لوگو ============
export interface Logo {
  type: 'text' | 'image';  // نوع لوگو
  value: string;           // متن یا مسیر تصویر
  width?: number;          // عرض (برای تصویر)
  height?: number;         // ارتفاع (برای تصویر)
}

// ============ اطلاعات تماس ============
export interface ContactInfo {
  phone: string;           // تلفن ثابت
  mobile: string;          // موبایل
  email: string;           // ایمیل
  address: string;         // آدرس
  whatsapp: string;        // شماره واتساپ (بدون صفر)
  workingHours: string;    // ساعت کاری
}

// ============ شبکه‌های اجتماعی ============
export interface SocialMedia {
  instagram: string;       // لینک اینستاگرام
  telegram: string;        // لینک تلگرام
  whatsapp: string;        // لینک واتساپ
  linkedin?: string;       // لینک لینکدین (اختیاری)
}

// ============ سئو ============
export interface SEO {
  title: string;           // عنوان سایت
  description: string;     // توضیحات
  keywords: string;        // کلمات کلیدی
  ogImage?: string;        // تصویر برای اشتراک‌گذاری
}

// ============ تنظیمات سایت ============
export interface SiteSettings {
  brand: {
    name: string;          // نام برند
    logo: Logo;            // لوگو
    favicon: string;       // آیکون مرورگر
  };
  domain: string;          // دامنه
  contact: ContactInfo;    // اطلاعات تماس
  social: SocialMedia;     // شبکه‌های اجتماعی
  seo: SEO;               // تنظیمات سئو
  analytics?: {
    google?: string;       // کد گوگل آنالیتیکس
  };
}