/**
 * تایپ‌های مربوط به رنگ‌بندی MDF
 * منطبق بر ساختار دیتای colors.json و categories.html
 */

// ============ خانواده رنگ ============
export type ColorFamily = 
  | 'all'        // همه
  | 'white'      // سفید
  | 'cream'      // کرم
  | 'gray'       // خاکستری
  | 'black'      // مشکی
  | 'blue'       // آبی
  | 'navy'       // سرمه‌ای
  | 'colorful';  // رنگی

// ============ نوع سطح ============
export type SurfaceType = 
  | 'all'        // همه
  | 'glossy'     // براق
  | 'matte'      // مات
  | 'satin'      // ساتین
  | 'stone';     // طرح سنگ

// ============ مدل رنگ ============
export interface Color {
  id: number;              // شناسه رنگ
  hex: string;            // کد هگز (مثال: #ffffff)
  name: string;           // نام رنگ (مثال: سفید یخچالی)
  code: string;           // کد محصول (مثال: WH-001)
  surface: SurfaceType;   // نوع سطح
  family: ColorFamily;    // خانواده رنگ
  isPopular: boolean;     // رنگ محبوب
  image?: string;         // تصویر نمونه (اختیاری)
  description?: string;   // توضیحات (اختیاری)
}

// ============ فیلتر رنگ ============
export interface ColorFilter {
  family?: ColorFamily;    // خانواده رنگ
  surface?: SurfaceType;   // نوع سطح
  search?: string;        // جستجو
  isPopular?: boolean;    // فقط رنگ‌های محبوب
}

// ============ پالت رنگی ============
export interface ColorPalette {
  id: string;             // شناسه پالت
  name: string;           // نام پالت
  description: string;    // توضیحات
  colors: string[];       // آرایه کد هگز رنگ‌ها
  tags: string[];         // برچسب‌ها
  image?: string;         // تصویر نمونه (اختیاری)
}

// ============ خانواده رنگ (برای فیلتر) ============
export interface ColorFamilyOption {
  id: ColorFamily;
  name: string;
  active: boolean;
  count?: number;         // تعداد رنگ‌ها در این خانواده
}

// ============ نوع سطح (برای فیلتر) ============
export interface SurfaceTypeOption {
  id: SurfaceType;
  name: string;
  active: boolean;
  count?: number;         // تعداد رنگ‌ها با این سطح
}