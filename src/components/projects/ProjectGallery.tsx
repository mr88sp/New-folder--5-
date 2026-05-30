'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProjectCard from './ProjectCard';
import ProjectCategories from './ProjectCategories';
import ProjectLightbox from './ProjectLightbox';
interface ProjectGalleryProps {
  siteContent: any;
  products: any[];
}

/**
 * کامپوننت ProjectGallery - گالری پروژه‌ها
 */
const ProjectGallery = ({ siteContent, products }: ProjectGalleryProps) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  // فیلتر پروژه‌ها بر اساس دسته‌بندی
  const filteredProjects = activeCategory === 'all'
    ? products
    : products.filter(p => {
        const catName = typeof p.category === 'object' ? p.category.name : p.category;
        return catName === activeCategory;
    });

  // باز کردن جزئیات پروژه
  const handleViewDetails = (project: any) => {
    setSelectedProject(project);
    setLightboxOpen(true);
  };

  return (
    <>
      {/* دسته‌بندی پروژه‌ها */}
      <ProjectCategories
        siteContent={siteContent}
        products={products}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />

      {/* آمار پروژه‌ها */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-900">
          {siteContent.projects_gallery_title || 'پروژه‌های اجرا شده'}
        </h2>
        <span className="bg-brand-primary/10 text-brand-primary px-4 py-2 rounded-full text-sm font-medium">
          {filteredProjects.length} {siteContent.projects_gallery_count_text || 'پروژه'}
        </span>
      </div>

      {/* گرید پروژه‌ها */}
      {filteredProjects.length > 0 ? (
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              siteContent={siteContent}
              project={project}
              onViewDetails={handleViewDetails}
            />
          ))}
        </motion.div>
      ) : (
        <div className="text-center py-16">
          <div className="text-6xl mb-4 text-gray-300">🏗️</div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            {siteContent.projects_no_projects_title || 'پروژه‌ای یافت نشد!'}
          </h3>
          <p className="text-gray-600">
            {siteContent.projects_no_projects_text || 'هیچ پروژه‌ای در این دسته‌بندی وجود ندارد.'}
          </p>
        </div>
      )}

      {/* لایت‌باکس پروژه */}
      <AnimatePresence>
        {lightboxOpen && selectedProject && (
          <ProjectLightbox
            siteContent={siteContent}
            project={selectedProject}
            onClose={() => setLightboxOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default ProjectGallery;