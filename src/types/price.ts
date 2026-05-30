/**
 * تایپ‌های مربوط به قیمت‌ها و تخفیف‌ها
 * منطبق بر ساختار دیتای price-tables.json و price.html
 */

// ============ وضعیت موجودی در جدول قیمت ============
export type StockIndicator = "موجود" | "محدود" | "ناموجود";

// ============ ردیف جدول قیمت ============
export interface PriceRow {
  thickness: number; // ضخامت (میلیمتر)
  dimensions: string; // ابعاد (مثال: 2440x1220)
  factory: string; // کارخانه سازنده
  unitPrice: number; // قیمت واحد (تومان)
  squareMeterPrice: number; // قیمت هر متر مربع (تومان)
  stock: StockIndicator; // وضعیت موجودی
  productId?: string; // شناسه محصول مرتبط (اختیاری)
}

// ============ دسته‌بندی جدول قیمت ============
export interface PriceCategory {
  id: string; // شناسه دسته‌بندی
  name: string; // نام دسته‌بندی (مثال: MDF سفید)
  order: number; // ترتیب نمایش
  products: PriceRow[]; // لیست محصولات
}

// ============ جدول قیمت کامل ============
export interface PriceTable {
  categories: PriceCategory[]; // دسته‌بندی‌های قیمت
  lastUpdate?: string; // تاریخ آخرین بروزرسانی
}

// ============ تخفیف ============
export interface Discount {
  id: string; // شناسه تخفیف
  badge: string; // نشان تخفیف (مثال: "تخفیف ۱۵٪")
  title: string; // عنوان
  description: string; // توضیحات
  price: string; // قیمت نهایی (مثال: "۲,۹۷۵,۰۰۰ تومان")
  originalPrice?: number; // قیمت اصلی (برای محاسبه درصد تخفیف)
  condition?: string; // شرط استفاده (اختیاری)
  image?: string; // تصویر (اختیاری)
}

// ============ فیلتر قیمت ============
export interface PriceFilter {
  category?: string; // دسته‌بندی
  thickness?: number; // ضخامت
  dimensions?: string; // ابعاد
  minPrice?: number; // حداقل قیمت
  maxPrice?: number; // حداکثر قیمت
}

// ============ جداول قیمت داینامیک ============
export interface DynamicTableColumn {
  id: string;
  name: string;
  type: 'text' | 'price' | 'status' | 'number' | 'select';
  options?: string; // Comma separated options for select type
  order_index: string;
}

export interface DynamicTableRow {
  id: string;
  order_index: string;
  cells: Record<string, string>;
}

export interface DynamicTable {
  id: string;
  title: string;
  columns: DynamicTableColumn[];
  rows: DynamicTableRow[];
}

// ============ ویژگی‌های جدول قیمت ============
export interface TableFeature {
  id: string;
  icon: string; // آیکون
  title: string; // عنوان
  description: string; // توضیحات
}

// ============ توضیحات قیمت ============
export interface PriceNote {
  id: string;
  text: string; // متن توضیح
  priority: number; // اولویت نمایش
}
