/**
 * تایپ‌های مربوط به صفحه درباره ما
 * منطبق بر ساختار دیتای about.json و about.html
 */

// ============ تاریخچه ============
export interface HistoryItem {
  year: number;           // سال (مثال: 1389)
  title: string;          // عنوان رویداد
  description: string;    // توضیحات
  order: number;          // ترتیب نمایش
  image?: string;         // تصویر (اختیاری)
}

// ============ ارزش‌ها ============
export interface ValueItem {
  id: string;             // شناسه
  icon: string;           // آیکون (مثال: "✅", "🤝")
  title: string;          // عنوان
  description: string;    // توضیحات
  order: number;          // ترتیب نمایش
}

// ============ اعضای تیم ============
export interface TeamMember {
  id: number;             // شناسه
  name: string;           // نام و نام خانوادگی
  position: string;       // سمت
  bio: string;            // بیوگرافی کوتاه
  image: string;          // مسیر تصویر
  order: number;          // ترتیب نمایش
  social?: {              // شبکه‌های اجتماعی (اختیاری)
    linkedin?: string;
    instagram?: string;
  };
}

// ============ آمار ============
export interface StatItem {
  id: string;             // شناسه
  number: string;         // عدد آمار (مثال: "۱۵+")
  label: string;          // برچسب (مثال: "سال تجربه")
  icon?: string;          // آیکون (اختیاری)
  order: number;          // ترتیب نمایش
}

// ============ گواهینامه ============
export interface Certificate {
  id: string;             // شناسه
  icon: string;           // آیکون (مثال: "🏆", "⭐")
  title: string;          // عنوان
  description: string;    // توضیحات
  image?: string;         // تصویر گواهینامه (اختیاری)
  order: number;          // ترتیب نمایش
}

// ============ تماس با مدیریت ============
export interface ManagementContact {
  phone: string;          // شماره تماس مستقیم
  email: string;          // ایمیل مدیریت
  hours: string;          // ساعت تماس
}