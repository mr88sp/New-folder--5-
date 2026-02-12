/**
 * تایپ‌های مربوط به صفحه تماس
 * منطبق بر ساختار دیتای contact.json و contact.html
 */

// ============ نوع دفتر/شعبه ============
export type OfficeType = 'دفتر مرکزی' | 'شعبه' | 'الکترونیکی';

// ============ آیتم اطلاعات تماس ============
export interface ContactItem {
  label: string;          // برچسب (مثال: "آدرس:", "تلفن:")
  value: string;          // مقدار
  type: 'text' | 'phone' | 'email' | 'url'; // نوع
  link?: string;          // لینک (برای تلفن/ایمیل/وبسایت)
}

// ============ دفتر/شعبه ============
export interface Office {
  id: string;             // شناسه
  type: OfficeType;       // نوع
  title: string;          // عنوان
  icon: string;           // آیکون
  items: ContactItem[];   // لیست اطلاعات تماس
  order: number;          // ترتیب نمایش
}

// ============ ساعت کاری ============
export interface WorkingHour {
  id: string;             // شناسه
  day: string;            // روز (مثال: "شنبه تا چهارشنبه")
  hours: string;          // ساعت کاری
  order: number;          // ترتیب نمایش
  isHoliday?: boolean;    // آیا تعطیل است؟
}

// ============ دپارتمان ============
export interface Department {
  id: string;             // شناسه
  icon: string;           // آیکون
  title: string;          // عنوان دپارتمان
  description: string;    // توضیحات
  contactPerson: {
    initials: string;     // حروف اول نام (مثال: "ع.م")
    name: string;         // نام کامل
    position: string;     // سمت
  };
  contacts: {
    type: 'phone' | 'email';
    value: string;
    link: string;
  }[];
  order: number;          // ترتیب نمایش
}

// ============ شبکه اجتماعی ============
export interface SocialLink {
  id: string;             // شناسه
  platform: string;       // نام پلتفرم (مثال: whatsapp, telegram)
  url: string;            // لینک
  icon: string;           // آیکون
  title: string;          // عنوان (مثال: "واتس‌اپ")
  order: number;          // ترتیب نمایش
}

// ============ سوال متداول ============
export interface FAQ {
  id: string;             // شناسه
  question: string;       // پرسش
  answer: string;         // پاسخ
  category?: string;      // دسته‌بندی (اختیاری)
  order: number;          // ترتیب نمایش
  isActive?: boolean;     // وضعیت باز/بسته (برای UI)
}

// ============ تماس اضطراری ============
export interface EmergencyContact {
  title: string;          // عنوان
  description: string;    // توضیحات
  phone: string;          // شماره تماس
  link: string;           // لینک تماس
  icon?: string;          // آیکون (اختیاری)
}