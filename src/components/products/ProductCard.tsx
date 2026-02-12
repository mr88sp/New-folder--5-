'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FiChevronLeft, FiEye, FiShoppingCart } from 'react-icons/fi';
import type { Product } from '@/types/product';

/**
 * کامپوننت ProductCard - نمایش محصول در کارت
 * منطبق بر ساختار product-card در products.html
 */
interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

const ProductCard = ({ product, priority = false }: ProductCardProps) => {
  // فرمت قیمت
  const formatPrice = (price?: number) => {
    if (!price) return 'تماس بگیرید';
    return price.toLocaleString('fa-IR') + ' تومان';
  };

  // وضعیت موجودی
  const getStockStatus = (status: string) => {
    switch (status) {
      case 'in-stock':
        return {
          text: '✅ موجود در انبار',
          className: 'text-green-600 bg-green-50 border-green-200'
        };
      case 'low-stock':
        return {
          text: '⚠️ موجودی محدود',
          className: 'text-orange-600 bg-orange-50 border-orange-200'
        };
      default:
        return {
          text: '❌ ناموجود',
          className: 'text-red-600 bg-red-50 border-red-200'
        };
    }
  };

  const stock = getStockStatus(product.stockStatus);

  return (
    <div className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden border border-gray-100">
      {/* ===== تصویر محصول ===== */}
      <div className="relative h-64 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
        {product.images && product.images[0] ? (
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            priority={priority}
            className="object-cover group-hover:scale-110 transition-transform duration-700"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-6xl text-gray-300">📦</span>
          </div>
        )}

        {/* برچسب محصول */}
        {product.badge && (
          <span className="absolute top-4 right-4 bg-brand-secondary text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
            {product.badge}
          </span>
        )}

        {/* دکمه‌های سریع */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
          <Link
            href={`/products/${product.id}`}
            className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-gray-700 hover:bg-brand-primary hover:text-white transition-colors shadow-lg"
            aria-label="مشاهده محصول"
          >
            <FiEye size={20} />
          </Link>
          <a
            href={product.orderButton.link}
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-gray-700 hover:bg-green-600 hover:text-white transition-colors shadow-lg"
            aria-label="سفارش سریع"
          >
            <FiShoppingCart size={20} />
          </a>
        </div>
      </div>

      {/* ===== محتوای محصول ===== */}
      <div className="p-6">
        {/* عنوان و برند */}
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-1 line-clamp-1">
              {product.name}
            </h3>
            <p className="text-sm text-gray-500">
              برند: <span className="font-medium text-gray-700">{product.brand}</span>
            </p>
          </div>
          <span className={`text-xs px-3 py-1.5 rounded-full font-medium border ${stock.className}`}>
            {stock.text}
          </span>
        </div>

        {/* توضیحات */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
          {product.description}
        </p>

        {/* مشخصات فنی */}
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="bg-gray-100 text-gray-700 text-xs px-3 py-1.5 rounded-full">
            📏 {product.thickness}mm
          </span>
          <span className="bg-gray-100 text-gray-700 text-xs px-3 py-1.5 rounded-full">
            📐 {product.dimensions}
          </span>
          <span className="bg-gray-100 text-gray-700 text-xs px-3 py-1.5 rounded-full">
            🏭 {product.brand}
          </span>
        </div>

        {/* قیمت و دکمه جزئیات */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div>
            <span className="text-xs text-gray-500 block mb-1">قیمت واحد</span>
            <span className="text-xl font-bold text-brand-primary">
              {formatPrice(product.price)}
            </span>
          </div>
          <Link
            href={`/products/${product.id}`}
            className="inline-flex items-center gap-2 text-brand-primary hover:text-brand-dark font-medium transition-colors group"
          >
            <span>مشاهده جزئیات</span>
            <FiChevronLeft className="group-hover:-translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;