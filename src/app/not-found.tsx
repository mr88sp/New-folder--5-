import Link from 'next/link';
import { FiAlertTriangle, FiHome, FiSearch } from 'react-icons/fi';

/**
 * کامپوننت NotFound - صفحه 404
 * زمانی نمایش داده می‌شود که آدرس درخواستی وجود نداشته باشد
 */
export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center py-16 px-4">
      <div className="text-center max-w-md">
        {/* آیکون */}
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center">
            <FiAlertTriangle className="text-orange-600" size={48} />
          </div>
        </div>

        {/* عنوان */}
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          ۴۰۴
        </h1>
        
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          صفحه مورد نظر یافت نشد!
        </h2>

        {/* توضیحات */}
        <p className="text-gray-600 mb-8 leading-relaxed">
          صفحه‌ای که به دنبال آن هستید وجود ندارد یا حذف شده است.
          لطفاً از صحت آدرس اطمینان حاصل کنید.
        </p>

        {/* دکمه‌های راهنما */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 bg-brand-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-brand-dark transition-colors"
          >
            <FiHome size={18} />
            <span>صفحه اصلی</span>
          </Link>
          
          <Link
            href="/products"
            className="inline-flex items-center justify-center gap-2 bg-white text-gray-700 border border-gray-300 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
          >
            <FiSearch size={18} />
            <span>مشاهده محصولات</span>
          </Link>
        </div>

        {/* لینک‌های کمکی */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500 mb-4">
            شاید این صفحات به کار شما بیایند:
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/about" className="text-sm text-brand-primary hover:text-brand-dark transition-colors">
              درباره ما
            </Link>
            <span className="text-gray-300">|</span>
            <Link href="/contact" className="text-sm text-brand-primary hover:text-brand-dark transition-colors">
              تماس با ما
            </Link>
            <span className="text-gray-300">|</span>
            <Link href="/categories" className="text-sm text-brand-primary hover:text-brand-dark transition-colors">
              رنگ‌بندی MDF
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}