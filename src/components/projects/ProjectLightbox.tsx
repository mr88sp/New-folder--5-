"use client";

import { useState, useEffect } from "react";
import CustomImage from "@/components/ui/CustomImage";
import { motion } from "framer-motion";
import {
  FiX,
  FiChevronLeft,
  FiChevronRight,
  FiMapPin,
  FiCalendar,
  FiUser,
  FiMaximize2,
} from "react-icons/fi";
import Button from "@/components/ui/Button";

/**
 * کامپوننت ProjectLightbox - نمایش بزرگ پروژه
 */
interface ProjectLightboxProps {
  siteContent: any;
  project: any;
  onClose: () => void;
}

const ProjectLightbox = ({
  siteContent,
  project,
  onClose,
}: ProjectLightboxProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const nextImage = () => {
    if (!project.images || project.images.length === 0) return;
    setCurrentImageIndex((prev) =>
      prev + 1 < project.images.length ? prev + 1 : prev
    );
  };

  const prevImage = () => {
    if (!project.images || project.images.length === 0) return;
    setCurrentImageIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-6xl bg-white rounded-card shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* دکمه بستن */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 z-20 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-700 hover:bg-red-500 hover:text-white transition-colors shadow-lg"
        >
          <FiX size={20} />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* گالری تصاویر */}
          <div className="relative bg-black h-[50vh] lg:h-[70vh]">
            {project.images && project.images.length > 0 ? (
              <CustomImage
                src={project.images[currentImageIndex]}
                alt={project.title}
                className="object-contain w-full h-full"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-white">
                تصویری موجود نیست
              </div>
            )}

            {/* دکمه‌های گالری */}
            {project.images && project.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  disabled={currentImageIndex === 0}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-700 hover:bg-brand-primary hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FiChevronRight size={20} />
                </button>
                <button
                  onClick={nextImage}
                  disabled={currentImageIndex === project.images.length - 1}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-700 hover:bg-brand-primary hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FiChevronLeft size={20} />
                </button>
              </>
            )}

            {/* شمارنده تصاویر */}
            {project.images && project.images.length > 1 && (
              <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-sm">
                {currentImageIndex + 1} / {project.images.length}
              </div>
            )}
          </div>

          {/* اطلاعات پروژه */}
          <div className="p-6 lg:p-8 overflow-y-auto max-h-[50vh] lg:max-h-[70vh]">
            <div className="mb-6">
              <span className="inline-block bg-brand-primary text-white text-xs font-bold px-3 py-1.5 rounded-full mb-3">
                {typeof project.category === "object"
                  ? project.category.name
                  : project.category}
              </span>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                {project.title}
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* مشخصات پروژه */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-50 rounded-button p-3">
                <div className="flex items-center gap-2 text-gray-600 mb-1">
                  <FiMapPin size={16} />
                  <span className="text-xs">
                    {siteContent.project_location_label || "موقعیت"}
                  </span>
                </div>
                <span className="text-sm font-medium text-gray-900">
                  {project.location}
                </span>
              </div>
              <div className="bg-gray-50 rounded-button p-3">
                <div className="flex items-center gap-2 text-gray-600 mb-1">
                  <FiCalendar size={16} />
                  <span className="text-xs">
                    {siteContent.project_year_label || "سال اجرا"}
                  </span>
                </div>
                <span className="text-sm font-medium text-gray-900">
                  {project.year}
                </span>
              </div>
              <div className="bg-gray-50 rounded-button p-3">
                <div className="flex items-center gap-2 text-gray-600 mb-1">
                  <FiUser size={16} />
                  <span className="text-xs">
                    {siteContent.project_client_label || "کارفرما"}
                  </span>
                </div>
                <span className="text-sm font-medium text-gray-900">
                  {project.client}
                </span>
              </div>
              <div className="bg-gray-50 rounded-button p-3">
                <div className="flex items-center gap-2 text-gray-600 mb-1">
                  <FiMaximize2 size={16} />
                  <span className="text-xs">
                    {siteContent.project_area_label || "مساحت"}
                  </span>
                </div>
                <span className="text-sm font-medium text-gray-900">
                  {project.area}
                </span>
              </div>
            </div>

            {/* ویژگی‌ها */}
            {project.features && project.features.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  {siteContent.project_features_title || "ویژگی‌های پروژه"}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.features.map((feature: string, index: number) => (
                    <span
                      key={index}
                      className="bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full text-sm"
                    >
                      ✓ {feature}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* متریال استفاده شده */}
            {project.materials && project.materials.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  {siteContent.project_materials_title || "متریال استفاده شده"}
                </h3>
                <div className="space-y-2">
                  {project.materials.map((material: string, index: number) => (
                    <div key={index} className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-brand-primary rounded-full"></span>
                      <span className="text-gray-700 text-sm">{material}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* دکمه استعلام */}
            <Button
              href={
                siteContent.project_inquiry_link || "https://wa.me/989123456789"
              }
              variant="primary"
              size="lg"
              className="w-full"
              target="_blank"
            >
              {siteContent.project_inquiry_button || "استعلام قیمت"}
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectLightbox;
