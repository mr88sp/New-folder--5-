'use client';

import { motion } from 'framer-motion';
import { FiSearch } from 'react-icons/fi';
import ProductCard from './ProductCard';
import type { Product } from '@/types/product';

/**
 * کامپوننت ProductGrid - نمایش محصولات به صورت گرید
 * منطبق بر ساختار products-grid در products.html
 */
interface ProductGridProps {
  products: Product[];
  loading?: boolean;
}

const ProductGrid = ({ products, loading = false }: ProductGridProps) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-card shadow-md p-4 animate-pulse"
          >
            <div className="h-64 bg-gray-200 rounded-button mb-4"></div>
            <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-20 bg-gray-50 rounded-card border-2 border-dashed border-gray-200">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center text-gray-400">
            <FiSearch size={40} />
          </div>
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-3">
          محصولی یافت نشد
        </h3>
        <p className="text-gray-600 max-w-md mx-auto">
          متاسفانه هیچ محصولی با فیلترهای انتخاب شده مطابقت ندارد. لطفا فیلترها را تغییر دهید یا عبارت دیگری را جستجو کنید.
        </p>
        <button 
          onClick={() => window.location.href = '/products'}
          className="mt-8 px-8 py-3 bg-brand-primary text-white rounded-button font-bold hover:bg-brand-dark transition-all shadow-lg shadow-brand-primary/20"
        >
          پاک کردن همه فیلترها
        </button>
      </div>
    );
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6"
    >
      {products.map((product, index) => (
        <motion.div key={product.id} variants={item}>
          <ProductCard product={product} priority={index < 4} />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ProductGrid;