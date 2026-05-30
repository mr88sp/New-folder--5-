"use client";

import { useState } from "react";
import CustomImage from "@/components/ui/CustomImage";
import { FiChevronLeft, FiEye, FiShoppingCart, FiCheckCircle, FiAlertCircle, FiPhone, FiXCircle, FiPackage } from "react-icons/fi";
import ProductModal from "./ProductModal";

interface Product {
  id: number;
  name: string;
  description: string;
  price: string | number;
  image_url: string;
  image_path?: string;
  isFeatured?: boolean;
  images?: string[];
  stockStatus?: string;
  badge?: string;
  thickness?: string;
  dimensions?: string;
  brand?: string;
  category?: string | { name: string };
  orderButton?: {
    link: string;
  };
}

/**
 * کامپوننت ProductCard - نمایش محصول در کارت
 * منطبق بر ساختار product-card در products.html
 */
interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

const ProductCard = ({ product, priority = false }: ProductCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // فرمت قیمت
  const formatPrice = (price?: string | number) => {
    if (!price) return "تماس بگیرید";
    const priceNum = typeof price === "string" ? parseFloat(price) : price;
    return priceNum.toLocaleString("fa-IR") + " تومان";
  };

  // وضعیت موجودی
  const getStockStatus = (status: string) => {
    switch (status) {
      case "in-stock":
        return {
          text: "موجود در انبار",
          icon: <FiCheckCircle className="shrink-0" />,
          className: "text-green-600 bg-green-50 border-green-200",
        };
      case "low-stock":
        return {
          text: "موجودی محدود",
          icon: <FiAlertCircle className="shrink-0" />,
          className: "text-orange-600 bg-orange-50 border-orange-200",
        };
      case "call-for-price":
        return {
          text: "تماس بگیرید",
          icon: <FiPhone className="shrink-0" />,
          className: "text-blue-600 bg-blue-50 border-blue-200",
        };
      default:
        return {
          text: "ناموجود",
          icon: <FiXCircle className="shrink-0" />,
          className: "text-red-600 bg-red-50 border-red-200",
        };
    }
  };

  const stock = getStockStatus(product.stockStatus || "in-stock");

  // آماده‌سازی داده‌های محصول برای مودال
  const modalProduct: any = {
    ...product,
    id: String(product.id),
    images:
      product.images && product.images.length > 0
        ? product.images
        : product.image_url
        ? [product.image_url]
        : [],
    category:
      typeof product.category === "object" && product.category
        ? product.category.name
        : product.category || "",
    price:
      typeof product.price === "string"
        ? parseFloat(product.price)
        : product.price,
    orderButton: product.orderButton || { link: "#" },
  };

  return (
    <>
      <div
        className="group bg-white rounded-card shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden border border-gray-100 flex flex-col h-full cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
        {/* ===== تصویر محصول ===== */}
        <div className="relative aspect-[4/3] sm:h-64 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden shrink-0">
          {product.image_url ? (
            <img
              src={product.image_url}
              alt={product.name}
              className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-300">
              <FiPackage size={64} />
            </div>
          )}

          {/* برچسب محصول */}
          {product.badge && (
            <span className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-brand-secondary text-white text-[10px] sm:text-xs font-bold px-2 py-1 sm:px-3 sm:py-1.5 rounded-full shadow-lg z-10">
              {product.badge}
            </span>
          )}

          {/* دکمه‌های سریع - مخفی در موبایل (چون هاور نداریم)، نمایش در دسکتاپ */}
          <div className="hidden sm:flex absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 items-center justify-center gap-3">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsModalOpen(true);
              }}
              className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-gray-700 hover:bg-brand-primary hover:text-white transition-colors shadow-lg"
              aria-label="مشاهده سریع"
            >
              <FiEye size={20} />
            </button>
            <a
              href={product.orderButton?.link || "#"}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-gray-700 hover:bg-green-600 hover:text-white transition-colors shadow-lg"
              aria-label="سفارش سریع"
            >
              <FiShoppingCart size={20} />
            </a>
          </div>
        </div>

        {/* ===== محتوای محصول ===== */}
        <div className="p-4 sm:p-6 flex flex-col flex-grow">
          {/* عنوان و برند */}
          <div className="flex justify-between items-start mb-2 sm:mb-3">
            <div className="min-w-0 flex-1">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-0.5 sm:mb-1 truncate group-hover:text-brand-primary transition-colors">
                {product.name}
              </h3>
              <div className="flex items-center gap-2">
                <span className="text-xs sm:text-sm text-gray-500">
                  {product.brand || "MDF"}
                </span>
                <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                <div className={`flex items-center gap-1 text-[10px] sm:text-xs font-medium px-2 py-0.5 rounded-full border ${stock.className}`}>
                  {stock.icon}
                  <span>{stock.text}</span>
                </div>
              </div>
            </div>
          </div>

          {/* ویژگی‌ها */}
          <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-6 mt-auto">
            <span className="text-[10px] sm:text-xs bg-gray-50 text-gray-600 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-button border border-gray-100">
              {product.thickness || "16"}mm
            </span>
            <span className="text-[10px] sm:text-xs bg-gray-50 text-gray-600 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-button border border-gray-100">
              {product.dimensions || "122x244"}
            </span>
          </div>

          {/* قیمت و دکمه */}
          <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-gray-50">
            <div className="min-w-0">
              <span className="text-[10px] sm:text-xs text-gray-400 block mb-0.5 sm:mb-1">
                قیمت پایه
              </span>
              <span className="text-sm sm:text-base font-bold text-brand-primary truncate block">
                {formatPrice(product.price)}
              </span>
            </div>
            <div className="flex gap-1.5 sm:gap-2 flex-shrink-0">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsModalOpen(true);
                }}
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-button bg-brand-primary/10 text-brand-primary flex items-center justify-center hover:bg-brand-primary hover:text-white transition-all duration-300"
                aria-label="مشاهده جزئیات"
              >
                <FiEye size={16} className="sm:size-5" />
              </button>
              <a
                href={`/products/${product.id}`}
                onClick={(e) => e.stopPropagation()}
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-button bg-brand-primary/10 text-brand-primary flex items-center justify-center hover:bg-brand-primary hover:text-white transition-all duration-300"
              >
                <FiChevronLeft size={16} className="sm:size-5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <ProductModal
        product={modalProduct}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default ProductCard;
