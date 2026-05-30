import { useEffect, useState } from 'react';

/**
 * هوک useDebounce - برای تأخیر در به‌روزرسانی مقدار
 * @param value مقدار ورودی
 * @param delay زمان تأخیر به میلی‌ثانیه
 * @returns مقدار debounce شده
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}
