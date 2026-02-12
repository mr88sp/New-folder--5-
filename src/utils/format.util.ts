/**
 * توابع فرمت‌دهی برای نمایش مقادیر
 */

/**
 * فرمت قیمت به تومان
 * @param price قیمت به عدد
 * @returns رشته فرمت شده (مثال: ۳۵۰,۰۰۰ تومان)
 */
export const formatPrice = (price?: number): string => {
  if (!price) return 'تماس بگیرید';
  return price.toLocaleString('fa-IR') + ' تومان';
};

/**
 * فرمت تاریخ شمسی
 * @param date تاریخ میلادی یا رشته تاریخ
 * @returns تاریخ شمسی فرمت شده
 */
export const formatJalaliDate = (date?: string): string => {
  if (!date) return '-';
  
  try {
    // در صورت نیاز میتوانید کتابخانه moment-jalaali یا date-fns-jalali را نصب کنید
    // فعلاً به صورت ساده تاریخ را برمی‌گردانیم
    return date;
  } catch {
    return date;
  }
};

/**
 * فرمت اعداد به فارسی
 * @param num عدد
 * @returns رشته با اعداد فارسی
 */
export const toPersianNumber = (num: number | string): string => {
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return num.toString().replace(/\d/g, (digit) => persianDigits[parseInt(digit)]);
};

/**
 * فرمت شماره تماس
 * @param phone شماره تماس
 * @returns شماره تماس فرمت شده
 */
export const formatPhoneNumber = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '');
  
  if (cleaned.length === 11 && cleaned.startsWith('09')) {
    return cleaned.replace(/(\d{4})(\d{3})(\d{4})/, '$1 $2 $3');
  }
  
  if (cleaned.length === 10) {
    return cleaned.replace(/(\d{3})(\d{3})(\d{4})/, '$1 $2 $3');
  }
  
  return phone;
};

/**
 * کوتاه کردن متن
 * @param text متن
 * @param length حداکثر طول
 * @returns متن کوتاه شده
 */
export const truncateText = (text: string, length: number = 100): string => {
  if (text.length <= length) return text;
  return text.slice(0, length) + '...';
};