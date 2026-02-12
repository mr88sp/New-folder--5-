import Link from 'next/link';
import { FiPackage, FiHome } from 'react-icons/fi';

/**
 * کامپوننت NotFound - صفحه 404 محصولات
 */
export default function ProductsNotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center py-16 px-4">
      <div className="text-center max-w-md">
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center">
            <FiPackage className="text-blue-600" size={48} />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          محصولی یافت نشد!
        </h2>

        <p className="text-gray-600 mb-8">
          هیچ محصولی با مشخصات درخواستی شما وجود ندارد.
        </p>

        <Link
          href="/products"
          className="inline-flex items-center justify-center gap-2 bg-brand-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-brand-dark transition-colors"
        >
          <FiHome size={18} />
          <span>بازگشت به محصولات</span>
        </Link>
      </div>
    </div>
  );
}