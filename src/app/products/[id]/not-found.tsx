import Link from 'next/link';
import { FiPackage, FiArrowRight } from 'react-icons/fi';

/**
 * کامپوننت NotFound - صفحه 404 جزئیات محصول
 */
export default function ProductNotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center py-16 px-4">
      <div className="text-center max-w-md">
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 bg-amber-100 rounded-full flex items-center justify-center">
            <FiPackage className="text-amber-600" size={48} />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          محصول مورد نظر یافت نشد!
        </h2>

        <p className="text-gray-600 mb-8">
          این محصول ممکن است حذف شده باشد یا به درستی وارد نشده است.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/products"
            className="inline-flex items-center justify-center gap-2 bg-brand-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-brand-dark transition-colors"
          >
            <span>مشاهده همه محصولات</span>
            <FiArrowRight size={18} />
          </Link>
          
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 bg-white text-gray-700 border border-gray-300 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
          >
            <span>صفحه اصلی</span>
          </Link>
        </div>
      </div>
    </div>
  );
}