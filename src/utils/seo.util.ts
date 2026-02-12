/**
 * توابع کمکی برای سئو
 */

/**
 * تولید عنوان صفحه
 * @param title عنوان صفحه
 * @param siteName نام سایت
 * @returns عنوان کامل
 */
export const generatePageTitle = (title: string, siteName: string): string => {
  if (title === 'خانه') return siteName;
  return `${title} | ${siteName}`;
};

/**
 * تولید توضیحات متا
 * @param description توضیحات
 * @param maxLength حداکثر طول
 * @returns توضیحات کوتاه شده
 */
export const generateMetaDescription = (
  description: string,
  maxLength: number = 160
): string => {
  if (description.length <= maxLength) return description;
  return description.slice(0, maxLength - 3) + '...';
};

/**
 * تولید URL متعارف (Canonical URL)
 * @param path مسیر صفحه
 * @param baseUrl آدرس پایه سایت
 * @returns URL کامل
 */
export const generateCanonicalUrl = (path: string, baseUrl: string): string => {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${baseUrl}${cleanPath}`;
};