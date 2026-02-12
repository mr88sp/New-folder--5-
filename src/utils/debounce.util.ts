/**
 * تابع debounce - برای تأخیر در اجرای توابع
 * @param func تابع مورد نظر
 * @param wait زمان تأخیر به میلی‌ثانیه
 * @returns تابع debounce شده
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;

  return function(...args: Parameters<T>) {
    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(() => {
      func(...args);
    }, wait);
  };
}

/**
 * تابع debounce با اجرای بلافاصله اولیه
 */
export function debounceImmediate<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  let immediate = true;

  return function(...args: Parameters<T>) {
    if (timeout) {
      clearTimeout(timeout);
    }

    if (immediate) {
      func(...args);
      immediate = false;
    }

    timeout = setTimeout(() => {
      immediate = true;
    }, wait);
  };
}