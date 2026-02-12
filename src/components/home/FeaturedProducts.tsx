'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import { FiChevronLeft } from 'react-icons/fi';
import productsData from '@/data/products/products.json';

/**
 * کامپوننت FeaturedProducts - نمایش محصولات ویژه در صفحه اصلی
 */
const FeaturedProducts = () => {
  // فیلتر محصولات ویژه
  const featuredProducts = productsData
    .filter(product => product.isFeatured)
    .slice(0, 4);

  // تابع فرمت قیمت
  const formatPrice = (price: number) => {
    return price.toLocaleString('fa-IR') + ' تومان';
  };

  // وضعیت موجودی
  const getStockStatus = (status: string) => {
    switch (status) {
      case 'in-stock':
        return { text: 'موجود در انبار', className: 'text-green-600 bg-green-50' };
      case 'low-stock':
        return { text: 'موجودی محدود', className: 'text-orange-600 bg-orange-50' };
      default:
        return { text: 'ناموجود', className: 'text-red-600 bg-red-50' };
    }
  };

  return (
    <section className="py-16">
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div className="text-center md:text-right mb-6 md:mb-0">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              محصولات ویژه
            </h2>
            <p className="text-gray-600">
              پرفروش‌ترین محصولات با بالاترین کیفیت
            </p>
          </div>
          <Button href="/products" variant="outline" className="flex items-center gap-2">
            <span>مشاهده همه محصولات</span>
            <FiChevronLeft />
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product, index) => {
            const stock = getStockStatus(product.stockStatus);
            
            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all hover:-translate-y-2"
              >
                {/* تصویر محصول */}
                <div className="relative h-56 bg-gray-100 overflow-hidden">
                  {product.images && product.images[0] ? (
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                      <span className="text-4xl text-gray-400">📦</span>
                    </div>
                  )}
                  
                  {/* برچسب ویژه */}
                  {product.badge && (
                    <span className="absolute top-4 right-4 bg-brand-secondary text-white text-xs font-bold px-3 py-1.5 rounded-full">
                      {product.badge}
                    </span>
                  )}
                </div>

                {/* محتوای محصول */}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-bold text-gray-900">
                      {product.name}
                    </h3>
                    <span className={`text-xs px-2 py-1 rounded-full ${stock.className}`}>
                      {stock.text}
                    </span>
                  </div>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {product.description}
                  </p>

                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                    <span className="bg-gray-100 px-2 py-1 rounded">
                      {product.thickness}mm
                    </span>
                    <span className="bg-gray-100 px-2 py-1 rounded">
                      {product.dimensions}
                    </span>
                    <span className="bg-gray-100 px-2 py-1 rounded">
                      {product.brand}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-sm text-gray-500 block">قیمت</span>
                      <span className="text-lg font-bold text-brand-primary">
                        {product.price ? formatPrice(product.price) : 'تماس بگیرید'}
                      </span>
                    </div>
                    <Link
                      href={`/products/${product.id}`}
                      className="inline-flex items-center gap-1 text-brand-primary hover:text-brand-dark font-medium transition-colors"
                    >
                      <span>جزئیات</span>
                      <FiChevronLeft />
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};

export default FeaturedProducts;