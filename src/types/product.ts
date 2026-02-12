/**
 * تایپ‌های مربوط به محصولات MDF و ورق کابینت
 * منطبق بر ساختار دیتای products.json و HTML اصلی
 */

// ============ وضعیت موجودی محصول ============
export type StockStatus = 'in-stock' | 'low-stock' | 'out-of-stock';

// ============ نوع محصول ============
export type ProductType = 
  | 'mdf-white'        // MDF سفید
  | 'mdf-raw'          // MDF خام
  | 'mdf-scratch'      // MDF ضدخش
  | 'mdf-moisture'     // MDF ضد رطوبت
  | 'pvc'              // ورق PVC
  | 'hpl'              // ورق HPL
  | 'particle-board'   // نئوپان
  | 'wood';            // چوب طبیعی

// ============ نشان ویژه محصول ============
export type ProductBadge = 'پرفروش' | 'جدید' | 'تخفیف ویژه' | null;

// ============ مشخصات فنی محصول ============
export interface ProductSpecs {
  density?: string;        // چگالی (kg/m³)
  moisture?: string;       // رطوبت (%)
  formaldehyde?: string;   // فرمالدئید (E1, E0)
  surface?: string;        // نوع سطح (مات، براق، ساتین)
  bendingStrength?: string; // مقاومت خمشی (MPa)
  swelling?: string;       // واکشیدگی ضخامت (%)
  [key: string]: string | undefined; // سایر مشخصات
}

// ============ دکمه سفارش محصول ============
export interface OrderButton {
  text: string;           // متن دکمه (پیشفرض: "ثبت سفارش")
  link: string;           // لینک (واتساپ یا تلفن)
  target?: '_blank' | '_self'; // نحوه باز شدن
}

// ============ مدل اصلی محصول ============
export interface Product {
  // شناسه‌ها
  id: string;             // شناسه یکتا (مثال: mdf-white-16)
  slug: string;           // نامک برای URL (مثال: mdf-safid-16mm)
  
  // اطلاعات پایه
  name: string;           // نام محصول
  category: string;       // دسته‌بندی
  brand: string;          // برند
  
  // مشخصات فیزیکی
  thickness: number;      // ضخامت (میلیمتر)
  dimensions: string;     // ابعاد (مثال: 2440x1220)
  
  // توضیحات
  description: string;    // توضیح کوتاه
  fullDescription?: string; // توضیح کامل (اختیاری)
  
  // تصاویر
  images: string[];       // آرایه مسیر تصاویر
  thumbnail?: string;     // تصویر بندانگشتی (اختیاری)
  
  // مشخصات فنی
  specs: ProductSpecs;    // مشخصات فنی کامل
  
  // وضعیت
  stockStatus: StockStatus; // وضعیت موجودی
  isFeatured: boolean;    // محصول ویژه
  badge?: ProductBadge;   // نشان ویژه
  
  // قیمت
  price?: number;         // قیمت واحد (تومان)
  squareMeterPrice?: number; // قیمت هر متر مربع
  
  // دکمه سفارش
  orderButton: OrderButton; // تنظیمات دکمه سفارش
  
  // کد محصول
  productCode?: string;   // کد محصول (مثال: MDF-W16)
  
  // تاریخ
  createdAt?: string;     // تاریخ ایجاد
  updatedAt?: string;     // تاریخ بروزرسانی
  
  // آمار (برای پنل مدیریت)
  viewCount?: number;     // تعداد بازدید
  orderCount?: number;    // تعداد سفارش
}

// ============ فیلتر محصولات ============
export interface ProductFilter {
  category?: string;      // دسته‌بندی
  thickness?: number[];   // ضخامت (آرایه)
  brand?: string[];       // برند (آرایه)
  stockStatus?: StockStatus; // وضعیت موجودی
  minPrice?: number;      // حداقل قیمت
  maxPrice?: number;      // حداکثر قیمت
  search?: string;        // جستجو
}

// ============ مرتب‌سازی محصولات ============
export type SortOption = 
  | 'popular'      // محبوب‌ترین
  | 'newest'       // جدیدترین
  | 'price-low'    // قیمت: کم به زیاد
  | 'price-high';  // قیمت: زیاد به کم

// ============ دسته‌بندی محصولات ============
export interface ProductCategory {
  id: string;           // شناسه دسته‌بندی
  name: string;         // نام دسته‌بندی
  slug: string;         // نامک
  count?: number;       // تعداد محصولات
  image?: string;       // تصویر شاخص
}

// ============ برند محصولات ============
export interface ProductBrand {
  id: string;           // شناسه برند
  name: string;         // نام برند
  country?: string;     // کشور سازنده
  logo?: string;        // لوگوی برند
}

// ============ پاسخ API محصولات ============
export interface ProductsResponse {
  products: Product[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}