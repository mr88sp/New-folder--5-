/**
 * توابع کمکی برای انیمیشن‌ها
 */

export * from './debounce.util';

/**
 * تأخیر در اجرا
 * @param ms میلی‌ثانیه
 * @returns Promise
 */
export const delay = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

/**
 * تشخیص اسکرول به انتهای صفحه
 * @param offset آفست از انتها
 * @returns boolean
 */
export const isScrolledToBottom = (offset: number = 100): boolean => {
  if (typeof window === 'undefined') return false;
  
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;
  
  return scrollTop + windowHeight >= documentHeight - offset;
};

/**
 * اسکرول نرم به عنصر
 * @param elementId آیدی عنصر
 */
export const smoothScrollTo = (elementId: string): void => {
  if (typeof window === 'undefined') return;
  
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }
};

/**
 * مقادیر انیمیشن Fade In
 */
export const fadeInVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
};

/**
 * مقادیر انیمیشن Slide In از راست
 */
export const slideInRightVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
};

/**
 * مقادیر انیمیشن Slide In از چپ
 */
export const slideInLeftVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
};

/**
 * مقادیر انیمیشن Stagger Children
 * @param staggerChildren تأخیر بین فرزندان
 * @param delayChildren تأخیر اولیه
 */
export const staggerContainerVariants = (
  staggerChildren: number = 0.1,
  delayChildren: number = 0
) => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
});