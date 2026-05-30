"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CustomImage from "@/components/ui/CustomImage";
import {
  FiX,
  FiChevronRight,
  FiShoppingCart,
  FiEye,
  FiInfo,
  FiCheckCircle,
  FiAlertCircle,
  FiXCircle,
  FiPackage,
} from "react-icons/fi";
import type { Product } from "@/types/product";

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProductModal = ({ product, isOpen, onClose }: ProductModalProps) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showSpecs, setShowSpecs] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  if (!product) return null;

  const formatPrice = (price?: number) => {
    if (!price) return "تماس بگیرید";
    return price.toLocaleString("fa-IR") + " تومان";
  };

  const formatSquareMeterPrice = (price?: number) => {
    if (!price) return null;
    return price.toLocaleString("fa-IR") + " تومان";
  };

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
      default:
        return {
          text: "ناموجود",
          icon: <FiXCircle className="shrink-0" />,
          className: "text-red-600 bg-red-50 border-red-200",
        };
    }
  };

  const stock = getStockStatus(product.stockStatus);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm product-modal"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="bg-white rounded-card shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden product-modal-content mx-4 sm:mx-0"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-gray-100">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-brand-primary/10 rounded-button flex items-center justify-center">
                  <FiInfo className="text-brand-primary text-lg sm:text-xl" />
                </div>
                <div className="min-w-0">
                  <h2 className="text-lg sm:text-2xl font-bold text-gray-900 truncate">
                    {product.name}
                  </h2>
                  <p className="text-sm sm:text-base text-gray-600">
                    {product.brand}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-button bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors flex-shrink-0"
              >
                <FiX size={16} className="sm:size-5" />
              </button>
            </div>

            {/* Content */}
            <div className="flex flex-col lg:flex-row max-h-[calc(90vh-200px)] overflow-y-auto">
              {/* Images Section */}
              <div className="lg:w-1/2 p-4 sm:p-6">
                <div className="relative aspect-square bg-gradient-to-br from-gray-50 to-gray-100 rounded-card overflow-hidden mb-4 group">
                  {product.images && product.images[selectedImageIndex] ? (
                    <CustomImage
                      src={product.images[selectedImageIndex]}
                      alt={`${product.name} - تصویر ${selectedImageIndex + 1}`}
                      className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-300">
                      <FiPackage size={80} />
                    </div>
                  )}

                  {product.badge && (
                    <span className="absolute top-4 right-4 bg-brand-secondary text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg">
                      {product.badge}
                    </span>
                  )}

                  {/* Navigation arrows */}
                  {product.images && product.images.length > 1 && (
                    <>
                      <button
                        onClick={() =>
                          setSelectedImageIndex((prev) =>
                            prev > 0 ? prev - 1 : product.images!.length - 1
                          )
                        }
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all opacity-0 group-hover:opacity-100"
                      >
                        <FiChevronRight size={20} />
                      </button>
                      <button
                        onClick={() =>
                          setSelectedImageIndex((prev) =>
                            prev < product.images!.length - 1 ? prev + 1 : 0
                          )
                        }
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all opacity-0 group-hover:opacity-100"
                      >
                        <FiChevronRight size={20} className="rotate-180" />
                      </button>
                    </>
                  )}

                  {/* Image counter */}
                  {product.images && product.images.length > 1 && (
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                      {selectedImageIndex + 1} / {product.images.length}
                    </div>
                  )}
                </div>

                {/* Thumbnail Images */}
                {product.images && product.images.length > 1 && (
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {product.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImageIndex(index)}
                        className={`relative w-20 h-20 rounded-button overflow-hidden border-2 transition-all flex-shrink-0 ${
                          selectedImageIndex === index
                            ? "border-brand-primary shadow-lg scale-105"
                            : "border-gray-200 hover:border-gray-300 hover:scale-105"
                        }`}
                      >
                        <CustomImage
                          src={image}
                          alt={`${product.name} - تصویر ${index + 1}`}
                          className="object-cover w-full h-full"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Details Section */}
              <div className="lg:w-1/2 p-4 sm:p-6">
                {/* Price Section */}
                <div className="bg-gradient-to-r from-wood-50 to-wood-100 rounded-card p-4 sm:p-6 mb-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-3">
                    <div className="flex-1">
                      <span className="text-sm text-gray-600 block mb-2">
                        قیمت پایه
                      </span>
                      <span className="product-price-large text-brand-primary">
                        {formatPrice(product.price)}
                      </span>
                      {product.squareMeterPrice && (
                        <div className="mt-2">
                          <span className="text-xs text-gray-500 block">
                            قیمت هر متر مربع
                          </span>
                          <span className="text-lg font-bold text-gray-700">
                            {formatSquareMeterPrice(product.squareMeterPrice)}
                          </span>
                        </div>
                      )}
                    </div>
                    <div
                      className={`px-3 py-2 sm:px-4 sm:py-2 rounded-button border ${stock.className} text-center flex-shrink-0 flex items-center justify-center gap-2`}
                    >
                      {stock.icon}
                      <span className="text-sm font-bold">{stock.text}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <a
                      href={product.orderButton.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-brand-primary hover:bg-brand-dark text-white px-4 sm:px-6 py-3 sm:py-4 rounded-button font-bold text-base sm:text-lg transition-all shadow-lg shadow-brand-primary/20 hover:-translate-y-0.5 flex items-center justify-center gap-2"
                    >
                      <FiShoppingCart size={18} className="sm:size-5" />
                      سفارش سریع
                    </a>
                    <a
                      href={`/products/${product.id}`}
                      className="px-4 sm:px-6 py-3 sm:py-4 rounded-button border-2 border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white transition-all font-bold flex items-center justify-center gap-2"
                    >
                      <FiEye size={18} className="sm:size-5" />
                      مشاهده کامل
                    </a>
                  </div>
                </div>

                {/* Basic Info */}
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">
                    مشخصات اصلی
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-gray-50 rounded-button p-4">
                      <span className="text-sm text-gray-600 block mb-1">
                        ضخامت
                      </span>
                      <span className="font-bold text-gray-900">
                        {product.thickness} میلی‌متر
                      </span>
                    </div>
                    <div className="bg-gray-50 rounded-button p-4">
                      <span className="text-sm text-gray-600 block mb-1">
                        ابعاد
                      </span>
                      <span className="font-bold text-gray-900">
                        {product.dimensions}
                      </span>
                    </div>
                    <div className="bg-gray-50 rounded-button p-4">
                      <span className="text-sm text-gray-600 block mb-1">
                        نوع
                      </span>
                      <span className="font-bold text-gray-900">
                        {typeof product.category === 'object' && product.category ? product.category.name : product.category}
                      </span>
                    </div>
                    <div className="bg-gray-50 rounded-button p-4">
                      <span className="text-sm text-gray-600 block mb-1">
                        کد محصول
                      </span>
                      <span className="font-bold text-gray-900">
                        {product.code || product.productCode || "---"}
                      </span>
                    </div>
                    <div className="bg-gray-50 rounded-button p-4">
                      <span className="text-sm text-gray-600 block mb-1">
                        برند
                      </span>
                      <span className="font-bold text-gray-900">
                        {product.brand}
                      </span>
                    </div>
                    {product.createdAt && (
                      <div className="bg-gray-50 rounded-button p-4">
                        <span className="text-sm text-gray-600 block mb-1">
                          تاریخ ایجاد
                        </span>
                        <span className="font-bold text-gray-900">
                          {new Date(product.createdAt).toLocaleDateString(
                            "fa-IR"
                          )}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Description */}
                {(product.fullDescription || product.description) && (
                  <div className="mb-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">
                      توضیحات
                    </h3>
                    <p className="text-gray-700 leading-relaxed bg-gray-50 rounded-button p-4">
                      {product.fullDescription || product.description}
                    </p>
                  </div>
                )}

                {/* Product Stats */}
                {(product.viewCount || product.orderCount) && (
                  <div className="mb-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">
                      آمار محصول
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {product.viewCount && (
                        <div className="bg-blue-50 rounded-button p-4">
                          <span className="text-sm text-blue-600 block mb-1">
                            تعداد بازدید
                          </span>
                          <span className="font-bold text-blue-900">
                            {product.viewCount.toLocaleString("fa-IR")}
                          </span>
                        </div>
                      )}
                      {product.orderCount && (
                        <div className="bg-green-50 rounded-button p-4">
                          <span className="text-sm text-green-600 block mb-1">
                            تعداد سفارش
                          </span>
                          <span className="font-bold text-green-900">
                            {product.orderCount.toLocaleString("fa-IR")}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Technical Specs Accordion */}
                {product.specifications &&
                  Object.keys(product.specifications).length > 0 && (
                    <div>
                      <button
                        onClick={() => setShowSpecs(!showSpecs)}
                        className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-button hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-brand-primary/10 rounded-button flex items-center justify-center">
                            <FiInfo className="text-brand-primary" />
                          </div>
                          <span className="font-bold text-gray-900">
                            مشخصات فنی تکمیلی
                          </span>
                        </div>
                        <motion.div
                          animate={{ rotate: showSpecs ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <FiChevronRight />
                        </motion.div>
                      </button>

                      <AnimatePresence>
                        {showSpecs && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="mt-4 bg-gray-50 rounded-button p-4">
                              {Object.entries(product.specifications).map(
                                ([key, value]) => (
                                  <div
                                    key={key}
                                    className="flex justify-between items-center py-3 border-b border-gray-200 last:border-b-0"
                                  >
                                    <span className="text-gray-600">{key}</span>
                                    <span className="font-bold text-gray-900">
                                      {value}
                                    </span>
                                  </div>
                                )
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProductModal;
