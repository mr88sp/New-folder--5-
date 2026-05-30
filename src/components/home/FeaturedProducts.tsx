"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import CustomImage from "@/components/ui/CustomImage";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import {
  FiChevronLeft,
  FiPackage,
  FiEye,
  FiShoppingCart,
} from "react-icons/fi";
import ProductModal from "../products/ProductModal";

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
  orderButton?: {
    link: string;
  };
}

interface FeaturedProductsProps {
  products: Product[];
}

/**
 * کامپوننت FeaturedProducts - نمایش محصولات ویژه در صفحه اصلی
 */
const FeaturedProducts = ({ products }: FeaturedProductsProps) => {
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // فیلتر محصولات ویژه
  const featuredProducts = products
    .filter((product) => product.isFeatured)
    .slice(0, 4);

  // تابع فرمت قیمت
  const formatPrice = (price: string | number) => {
    const priceNum = typeof price === "string" ? parseFloat(price) : price;
    return priceNum.toLocaleString("fa-IR") + " تومان";
  };

  // وضعیت موجودی
  const getStockStatus = (status: string) => {
    switch (status) {
      case "in-stock":
        return {
          text: "موجود در انبار",
          className: "text-green-600 bg-green-50",
        };
      case "low-stock":
        return {
          text: "موجودی محدود",
          className: "text-orange-600 bg-orange-50",
        };
      default:
        return { text: "ناموجود", className: "text-red-600 bg-red-50" };
    }
  };

  const handleOpenModal = (product: any) => {
    // Transform product for modal
    const modalProduct = {
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
    setSelectedProduct(modalProduct);
    setIsModalOpen(true);
  };

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <Container client:load>
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
              محصولات ویژه و پرفروش
            </h2>
            <div className="h-1.5 w-20 bg-brand-primary rounded-full mb-4"></div>
            <p className="text-lg text-gray-500 max-w-xl leading-relaxed">
              منتخبی از بهترین و باکیفیت‌ترین ورق‌های MDF با قیمت استثنایی
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Button
              href="/products"
              variant="secondary"
              className="group flex items-center gap-2 px-8 py-3 rounded-full border-2 border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white transition-all duration-300 font-bold shadow-lg shadow-brand-primary/5"
            >
              <span>مشاهده همه محصولات</span>
              <FiChevronLeft className="group-hover:-translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-white rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 flex flex-col h-full overflow-hidden hover:-translate-y-2"
              onClick={() => handleOpenModal(product)}
            >
              {/* تصویر محصول */}
              <div className="relative aspect-[4/3] bg-gray-50 overflow-hidden shrink-0">
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

                {/* دکمه‌های سریع */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenModal(product);
                    }}
                    className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-gray-700 hover:bg-brand-primary hover:text-white transition-colors shadow-lg"
                  >
                    <FiEye size={20} />
                  </button>
                  <a
                    href={product.orderButton?.link || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-gray-700 hover:bg-green-600 hover:text-white transition-colors shadow-lg"
                  >
                    <FiShoppingCart size={20} />
                  </a>
                </div>

                {product.badge && (
                  <span className="absolute top-4 right-4 bg-brand-secondary text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg z-10">
                    {product.badge}
                  </span>
                )}
              </div>

              {/* محتوای کارت */}
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-gray-900 mb-2 truncate group-hover:text-brand-primary transition-colors">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-500 mb-4 line-clamp-2 h-10 leading-relaxed">
                  {product.description}
                </p>
                
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-gray-400 mb-0.5">قیمت پایه</span>
                    <span className="text-lg font-bold text-brand-primary">
                      {formatPrice(product.price)}
                    </span>
                  </div>
                  <div className="w-10 h-10 rounded-2xl bg-brand-primary/10 text-brand-primary flex items-center justify-center group-hover:bg-brand-primary group-hover:text-white transition-all duration-300">
                    <FiChevronLeft size={20} />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>

      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
};

export default FeaturedProducts;
