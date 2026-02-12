'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProjectCard from './ProjectCard';
import ProjectCategories from './ProjectCategories';
import ProjectLightbox from './ProjectLightbox';
import projectsData from '@/data/projects/projects.json';

/**
 * کامپوننت ProjectGallery - گالری پروژه‌ها
 */
const ProjectGallery = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  // فیلتر پروژه‌ها بر اساس دسته‌بندی
  const filteredProjects = activeCategory === 'all'
    ? projectsData
    : projectsData.filter(p => p.category === activeCategory);

  // باز کردن جزئیات پروژه
  const handleViewDetails = (project: any) => {
    setSelectedProject(project);
    setLightboxOpen(true);
  };

  return (
    <>
      {/* دسته‌بندی پروژه‌ها */}
      <ProjectCategories
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />

      {/* آمار پروژه‌ها */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-900">
          پروژه‌های اجرا شده
        </h2>
        <span className="bg-brand-primary/10 text-brand-primary px-4 py-2 rounded-full text-sm font-medium">
          {filteredProjects.length} پروژه
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
              project={project}
              onViewDetails={handleViewDetails}
            />
          ))}
        </motion.div>
      ) : (
        <div className="text-center py-16">
          <div className="text-6xl mb-4 text-gray-300">🏗️</div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            پروژه‌ای یافت نشد!
          </h3>
          <p className="text-gray-600">
            هیچ پروژه‌ای در این دسته‌بندی وجود ندارد.
          </p>
        </div>
      )}

      {/* لایت‌باکس پروژه */}
      <AnimatePresence>
        {lightboxOpen && selectedProject && (
          <ProjectLightbox
            project={selectedProject}
            onClose={() => setLightboxOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default ProjectGallery;