"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  FiCheck,
  FiX,
  FiPackage,
  FiTag,
  FiAlertCircle,
  FiShoppingCart,
  FiMessageSquare,
  FiChevronDown,
  FiInfo,
  FiFileText,
} from "react-icons/fi";
import { AnimatePresence } from "framer-motion";
import { FaRuler } from "react-icons/fa";
import Button from "@/components/ui/Button";

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
  productCode?: string;
  fullDescription?: string;
  squareMeterPrice?: string;
  specs?: any;
}

/**
 * کامپوننت ProductInfo - نمایش اطلاعات کامل محصول
 */
interface ProductInfoProps {
  product: Product;
}

const ProductInfo = ({ product }: ProductInfoProps) => {
  const [quantity, setQuantity] = useState(1);
  const [isSpecsOpen, setIsSpecsOpen] = useState(false);

  // فرمت قیمت
  const formatPrice = (price?: string | number) => {
    if (!price) return "تماس بگیرید";
    const priceNum = typeof price === "string" ? parseFloat(price) : price;
    return priceNum.toLocaleString("fa-IR") + " تومان";
  };

  // وضعیت موجودی
  const getStockStatus = () => {
    switch (product.stockStatus) {
      case "in-stock":
        return {
          icon: <FiCheck className="text-green-500" size={20} />,
          text: "موجود در انبار",
          className: "text-green-600 bg-green-50 border-green-200",
        };
      case "low-stock":
        return {
          icon: <FiAlertCircle className="text-orange-500" size={20} />,
          text: "موجودی محدود",
          className: "text-orange-600 bg-orange-50 border-orange-200",
        };
      case "call-for-price":
        return {
          icon: <FiInfo className="text-blue-500" size={20} />,
          text: "تماس بگیرید",
          className: "text-blue-600 bg-blue-50 border-blue-200",
        };
      default:
        return {
          icon: <FiX className="text-red-500" size={20} />,
          text: "ناموجود",
          className: "text-red-600 bg-red-50 border-red-200",
        };
    }
  };

  const stock = getStockStatus();

  // افزایش تعداد
  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  // کاهش تعداد
  const decreaseQuantity = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
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
        `💵 جمع کل: ${
          product.price
            ? formatPrice(parseFloat(product.price) * quantity)
            : "تماس بگیرید"
        }\n` +
        `------------------------\n` +
        `لطفاً جهت تکمیل سفارش راهنمایی بفرمایید.`
    );

    return `https://wa.me/989123456789?text=${message}`; // Replace with your WhatsApp number
  };

  return (
    <div className="bg-white rounded-card shadow-lg p-6 lg:p-8">
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
            کد محصول:{" "}
            <span className="font-medium text-gray-700">
              {product.productCode || product.id}
            </span>
          </span>
          <span className="text-sm text-gray-500">
            برند:{" "}
            <span className="font-medium text-gray-700">{product.brand}</span>
          </span>
        </div>
      </div>

      {/* ===== وضعیت موجودی ===== */}
      <div
        className={`flex items-center gap-3 p-4 rounded-button border ${stock.className} mb-6`}
      >
        {stock.icon}
        <div>
          <span className="font-medium">{stock.text}</span>
          {product.stockStatus === "low-stock" && (
            <p className="text-sm opacity-75 mt-1">
              برای سفارش بیشتر با ما تماس بگیرید
            </p>
          )}
        </div>
      </div>

      {/* ===== قیمت ===== */}
      <div className="bg-gray-50 rounded-button p-6 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-sm text-gray-500 block mb-1">قیمت واحد</span>
            <span className="product-price-large text-brand-primary">
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

      {/* ===== توضیحات محصول (Accordion Style) ===== */}
      <div className="mb-4 border border-gray-100 rounded-button overflow-hidden shadow-sm">
        <button
          onClick={() => setIsSpecsOpen(!isSpecsOpen)}
          className="w-full flex items-center justify-between p-4 bg-white hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center gap-3 text-gray-900">
            <div className="w-8 h-8 rounded-button bg-brand-primary/10 flex items-center justify-center text-brand-primary">
              <FiFileText size={18} />
            </div>
            <span className="font-bold">مشخصات فنی و توضیحات</span>
          </div>
          <motion.div
            animate={{ rotate: isSpecsOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <FiChevronDown className="text-gray-400" size={20} />
          </motion.div>
        </button>

        <AnimatePresence>
          {isSpecsOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <div className="p-4 bg-gray-50/50 border-t border-gray-100">
                {/* توضیحات متنی */}
                <div className="mb-6">
                  <h3 className="text-sm font-bold text-brand-dark mb-2 flex items-center gap-2">
                    <FiInfo className="text-brand-primary" />
                    توضیحات تکمیلی
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed text-justify">
                    {product.fullDescription || product.description}
                  </p>
                </div>

                {/* گرید مشخصات */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white rounded-button p-3 border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-2 text-gray-500 mb-1">
                      <FaRuler size={14} className="text-brand-secondary" />
                      <span className="text-[10px] uppercase tracking-wider font-bold">
                        ضخامت
                      </span>
                    </div>
                    <span className="text-sm font-bold text-brand-dark">
                      {product.thickness} میلی‌متر
                    </span>
                  </div>

                  <div className="bg-white rounded-button p-3 border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-2 text-gray-500 mb-1">
                      <FiPackage size={14} className="text-brand-secondary" />
                      <span className="text-[10px] uppercase tracking-wider font-bold">
                        ابعاد
                      </span>
                    </div>
                    <span className="text-sm font-bold text-brand-dark">
                      {product.dimensions}
                    </span>
                  </div>

                  {product.specs &&
                    Object.entries(product.specs).map(([key, value]) => (
                      <div
                        key={key}
                        className="bg-white rounded-button p-3 border border-gray-100 shadow-sm"
                      >
                        <div className="text-gray-500 text-[10px] uppercase tracking-wider font-bold mb-1">
                          {key === "density" && "چگالی"}
                          {key === "moisture" && "رطوبت"}
                          {key === "formaldehyde" && "فرمالدئید"}
                          {key === "surface" && "نوع سطح"}
                          {key === "bendingStrength" && "مقاومت خمشی"}
                          {key === "swelling" && "واکشیدگی"}
                        </div>
                        <span className="text-sm font-bold text-brand-dark">
                          {value}
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ===== انتخاب تعداد و دکمه سفارش ===== */}
      <div className="border-t border-gray-200 pt-6">
        <div className="flex flex-col sm:flex-row gap-4 items-end">
          {/* انتخاب تعداد */}
          <div className="w-full sm:w-32">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              تعداد (ورق)
            </label>
            <div className="flex items-center border border-gray-300 rounded-button overflow-hidden">
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
                onChange={(e) =>
                  setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                }
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
              href={`https://wa.me/989123456789`} // Replace with your WhatsApp number
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
              {formatPrice(parseFloat(product.price) * quantity)}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductInfo;
