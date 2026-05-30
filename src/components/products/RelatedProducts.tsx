'use client';

import { motion } from 'framer-motion';
import { FiChevronLeft } from 'react-icons/fi';

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  image_url: string;
  image_path?: string;
  isFeatured?: boolean;
  images?: string[];
  stockStatus?: string;
  badge?: string;
  thickness?: string;
  dimensions?: string;
  brand?: string;
}

/**
 * کامپوننت RelatedProducts - نمایش محصولات مرتبط
 */
interface RelatedProductsProps {
  products: Product[];
  currentProductId: string;
}

const RelatedProducts = ({ products, currentProductId }: RelatedProductsProps) => {
  // فیلتر محصولات مرتبط (غیر از محصول فعلی)
  const relatedProducts = products
    .filter(p => p.id != currentProductId)
    .slice(0, 4);

  if (relatedProducts.length === 0) return null;

  // فرمت قیمت
  const formatPrice = (price?: string | number) => {
    if (!price) return 'تماس بگیرید';
    const priceNum = typeof price === 'string' ? parseFloat(price) : price;
    return priceNum.toLocaleString('fa-IR') + ' تومان';
  };

  return (
    <div className="mt-16 pt-8 border-t border-gray-200">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            محصولات مرتبط
          </h2>
          <p className="text-gray-600">
            سایر محصولات مشابه که ممکن است نیاز داشته باشید
          </p>
        </div>
        <a
          href="/products"
          className="inline-flex items-center gap-2 text-brand-primary hover:text-brand-dark font-medium transition-colors"
        >
          <span>مشاهده همه</span>
          <FiChevronLeft />
        </a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {relatedProducts.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <a
              href={`/products/${product.id}`}
              className="group block bg-white rounded-button shadow-md hover:shadow-xl transition-all hover:-translate-y-2 overflow-hidden"
            >
              <div className="relative h-48 bg-gray-100">
                {product.image_url ? (
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-4xl text-gray-400">📦</span>
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-bold text-gray-900 mb-1 line-clamp-1">
                  {product.name}
                </h3>
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                  <span>{product.thickness || '16'}mm</span>
                  <span>•</span>
                  <span>{product.brand || 'MDF'}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="product-price text-brand-primary">
                    {formatPrice(product.price)}
                  </span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    product.stockStatus === 'in-stock'
                      ? 'bg-green-50 text-green-600'
                      : 'bg-orange-50 text-orange-600'
                  }`}>
                    {product.stockStatus === 'in-stock' ? 'موجود' : 'محدود'}
                  </span>
                </div>
              </div>
            </a>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
