'use client';

import { useState } from 'react';
import { motion } from 'framer-motion'; 
import { 
  FiCheck, 
  FiX, 
  FiPackage, 
  FiTag, 
  FiAlertCircle,
  FiShoppingCart,
  FiMessageSquare 
} from 'react-icons/fi';
import { FaRuler } from 'react-icons/fa'; // ✅ اضافه کردن این خط
import Button from '@/components/ui/Button';
import type { Product } from '@/types/product';
import siteData from '@/data/site.json';

/**
 * کامپوننت ProductInfo - نمایش اطلاعات کامل محصول
 */
interface ProductInfoProps {
  product: Product;
}

const ProductInfo = ({ product }: ProductInfoProps) => {
  const [quantity, setQuantity] = useState(1);

  // فرمت قیمت
  const formatPrice = (price?: number) => {
    if (!price) return 'تماس بگیرید';
    return price.toLocaleString('fa-IR') + ' تومان';
  };

  // وضعیت موجودی
  const getStockStatus = () => {
    switch (product.stockStatus) {
      case 'in-stock':
        return {
          icon: <FiCheck className="text-green-500" size={20} />,
          text: 'موجود در انبار',
          className: 'text-green-600 bg-green-50 border-green-200'
        };
      case 'low-stock':
        return {
          icon: <FiAlertCircle className="text-orange-500" size={20} />,
          text: 'موجودی محدود',
          className: 'text-orange-600 bg-orange-50 border-orange-200'
        };
      default:
        return {
          icon: <FiX className="text-red-500" size={20} />,
          text: 'ناموجود',
          className: 'text-red-600 bg-red-50 border-red-200'
        };
    }
  };

  const stock = getStockStatus();

  // افزایش تعداد
  const increaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  // کاهش تعداد
  const decreaseQuantity = () => {
    setQuantity(prev => Math.max(1, prev - 1));
  };

  // ساخت لینک واتساپ با متن سفارش
  const getWhatsAppOrderLink = () => {
    const message = encodeURIComponent(
      `سلام،\n\n` +
      `از سایت Soheili Wood سفارش دارم:\n` +
      `------------------------\n` +
      `🪵 محصول: ${product.name}\n` +
      `📏 ضخامت: ${product.thickness}mm\n` +
      `📐 ابعاد: ${product.dimensions}\n` +
      `🏭 برند: ${product.brand}\n` +
      `🔢 تعداد: ${quantity} ورق\n` +
      `💰 قیمت واحد: ${formatPrice(product.price)}\n` +
      `💵 جمع کل: ${product.price ? formatPrice(product.price * quantity) : 'تماس بگیرید'}\n` +
      `------------------------\n` +
      `لطفاً جهت تکمیل سفارش راهنمایی بفرمایید.`
    );
    
    return `https://wa.me/${siteData.contact.whatsapp}?text=${message}`;
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 lg:p-8">
      {/* ===== عنوان و برچسب‌ها ===== */}
      <div className="mb-6">
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
            {product.name}
          </h1>
          {product.badge && (
            <span className="bg-brand-secondary text-white text-sm font-bold px-3 py-1.5 rounded-full">
              {product.badge}
            </span>
          )}
        </div>
        
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500">
            کد محصول: <span className="font-medium text-gray-700">{product.productCode || product.id}</span>
          </span>
          <span className="text-sm text-gray-500">
            برند: <span className="font-medium text-gray-700">{product.brand}</span>
          </span>
        </div>
      </div>

      {/* ===== وضعیت موجودی ===== */}
      <div className={`flex items-center gap-3 p-4 rounded-xl border ${stock.className} mb-6`}>
        {stock.icon}
        <div>
          <span className="font-medium">{stock.text}</span>
          {product.stockStatus === 'low-stock' && (
            <p className="text-sm opacity-75 mt-1">برای سفارش بیشتر با ما تماس بگیرید</p>
          )}
        </div>
      </div>

      {/* ===== قیمت ===== */}
      <div className="bg-gray-50 rounded-xl p-6 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-sm text-gray-500 block mb-1">قیمت واحد</span>
            <span className="text-2xl lg:text-3xl font-bold text-brand-primary">
              {formatPrice(product.price)}
            </span>
            {product.price && product.squareMeterPrice && (
              <p className="text-sm text-gray-500 mt-2">
                قیمت هر متر مربع: {formatPrice(product.squareMeterPrice)}
              </p>
            )}
          </div>
          <FiTag className="text-gray-400" size={32} />
        </div>
      </div>

      {/* ===== توضیحات ===== */}
      <div className="mb-6">
        <h2 className="text-lg font-bold text-gray-900 mb-3">توضیحات محصول</h2>
        <p className="text-gray-600 leading-relaxed">
          {product.fullDescription || product.description}
        </p>
      </div>

      {/* ===== مشخصات فنی ===== */}
      <div className="mb-6">
        <h2 className="text-lg font-bold text-gray-900 mb-3">مشخصات فنی</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="flex items-center gap-2 text-gray-600 mb-1">
              <FaRuler size={16} /> {/* ✅ جایگزین FiRuler */}
              <span className="text-xs">ضخامت</span>
            </div>
            <span className="text-sm font-medium text-gray-900">{product.thickness} میلی‌متر</span>
          </div>
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="flex items-center gap-2 text-gray-600 mb-1">
              <FiPackage size={16} />
              <span className="text-xs">ابعاد</span>
            </div>
            <span className="text-sm font-medium text-gray-900">{product.dimensions} میلی‌متر</span>
          </div>
          
          {Object.entries(product.specs).map(([key, value]) => (
            <div key={key} className="bg-gray-50 rounded-lg p-3">
              <div className="text-gray-600 text-xs mb-1">
                {key === 'density' && 'چگالی'}
                {key === 'moisture' && 'رطوبت'}
                {key === 'formaldehyde' && 'فرمالدئید'}
                {key === 'surface' && 'نوع سطح'}
                {key === 'bendingStrength' && 'مقاومت خمشی'}
                {key === 'swelling' && 'واکشیدگی'}
              </div>
              <span className="text-sm font-medium text-gray-900">{value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ===== انتخاب تعداد و دکمه سفارش ===== */}
      <div className="border-t border-gray-200 pt-6">
        <div className="flex flex-col sm:flex-row gap-4 items-end">
          {/* انتخاب تعداد */}
          <div className="w-full sm:w-32">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              تعداد (ورق)
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
              <button
                onClick={decreaseQuantity}
                className="w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200 transition-colors text-gray-700"
                disabled={quantity <= 1}
              >
                -
              </button>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-full h-10 text-center border-x border-gray-300 outline-none focus:ring-2 focus:ring-brand-primary/20"
                min="1"
              />
              <button
                onClick={increaseQuantity}
                className="w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200 transition-colors text-gray-700"
              >
                +
              </button>
            </div>
          </div>

          {/* دکمه‌های سفارش */}
          <div className="flex-1 flex flex-col sm:flex-row gap-3">
            <Button
              href={getWhatsAppOrderLink()}
              variant="primary"
              size="lg"
              className="flex-1 flex items-center justify-center gap-2"
              target="_blank"
            >
              <FiShoppingCart size={20} />
              <span>ثبت سفارش</span>
            </Button>
            <Button
              href={siteData.social.whatsapp}
              variant="secondary"
              size="lg"
              className="flex-1 flex items-center justify-center gap-2"
              target="_blank"
            >
              <FiMessageSquare size={20} />
              <span>مشاوره واتساپ</span>
            </Button>
          </div>
        </div>

        {/* جمع کل */}
        {product.price && (
          <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
            <span className="text-gray-600">جمع کل سفارش:</span>
            <span className="text-xl font-bold text-brand-primary">
              {formatPrice(product.price * quantity)}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductInfo;