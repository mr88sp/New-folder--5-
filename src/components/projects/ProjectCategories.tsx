'use client';

import { motion } from 'framer-motion';

/**
 * کامپوننت ProjectCategories - فیلتر دسته‌بندی پروژه‌ها
 */
interface ProjectCategoriesProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const ProjectCategories = ({ activeCategory, onCategoryChange }: ProjectCategoriesProps) => {
  const categories = [
    { id: 'all', name: 'همه پروژه‌ها', icon: '🏗️', count: 6 },
    { id: 'آشپزخانه', name: 'آشپزخانه', icon: '🍳', count: 1 },
    { id: 'اتاق خواب', name: 'اتاق خواب', icon: '🛏️', count: 1 },
    { id: 'درب', name: 'درب', icon: '🚪', count: 1 },
    { id: 'اداری', name: 'اداری', icon: '💼', count: 1 },
    { id: 'سرویس بهداشتی', name: 'سرویس بهداشتی', icon: '🚿', count: 1 },
    { id: 'تجاری', name: 'تجاری', icon: '🏪', count: 1 },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-3 mb-8">
      {categories.map((category) => (
        <motion.button
          key={category.id}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onCategoryChange(category.id)}
          className={`
            flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all
            ${activeCategory === category.id
              ? 'bg-brand-primary text-white shadow-lg'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }
          `}
        >
          <span>{category.icon}</span>
          <span>{category.name}</span>
          <span className={`
            px-2 py-0.5 rounded-full text-xs
            ${activeCategory === category.id
              ? 'bg-white/20 text-white'
              : 'bg-gray-200 text-gray-700'
            }
          `}>
            {category.count}
          </span>
        </motion.button>
      ))}
    </div>
  );
};

export default ProjectCategories;