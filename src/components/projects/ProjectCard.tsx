'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { FiMapPin, FiCalendar, FiZoomIn } from 'react-icons/fi';
import { useState } from 'react';

/**
 * کامپوننت ProjectCard - کارت نمایش پروژه
 * منطبق بر ساختار project-card در projects.html
 */
interface ProjectCardProps {
  project: any;
  onViewDetails: (project: any) => void;
}

const ProjectCard = ({ project, onViewDetails }: ProjectCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -8 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer"
      onClick={() => onViewDetails(project)}
    >
      {/* تصویر پروژه */}
      <div className="relative h-64 overflow-hidden">
        {project.thumbnail ? (
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
            <span className="text-6xl text-gray-400">🏗️</span>
          </div>
        )}

        {/* اوورلی هور */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"
        >
          <div className="absolute bottom-4 right-4 left-4 text-white">
            <div className="flex items-center gap-2 mb-2">
              <FiMapPin size={16} />
              <span className="text-sm">{project.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <FiCalendar size={16} />
              <span className="text-sm">{project.year}</span>
            </div>
          </div>
        </motion.div>

        {/* دسته‌بندی */}
        <div className="absolute top-4 left-4">
          <span className="bg-brand-primary text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
            {project.category}
          </span>
        </div>

        {/* دکمه بزرگنمایی */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.5 }}
          className="absolute top-4 right-4"
        >
          <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-700 hover:bg-brand-primary hover:text-white transition-colors shadow-lg">
            <FiZoomIn size={18} />
          </button>
        </motion.div>
      </div>

      {/* اطلاعات پروژه */}
      <div className="p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1">
          {project.title}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {project.features.slice(0, 3).map((feature: string, index: number) => (
            <span
              key={index}
              className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
            >
              {feature}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;