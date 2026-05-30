'use client';

import { motion } from 'framer-motion';
import { useMemo } from 'react';

/**
 * کامپوننت ProjectCategories - فیلتر دسته‌بندی پروژه‌ها
 */
interface ProjectCategoriesProps {
  siteContent: any;
  products?: any[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const ProjectCategories = ({ siteContent, products = [], activeCategory, onCategoryChange }: ProjectCategoriesProps) => {
  const categories = useMemo(() => {
    if (siteContent.project_categories) return siteContent.project_categories;

    const allCount = products.length;
    const cats = new Map();

    products.forEach(p => {
      if (p.category) {
        const catName = typeof p.category === 'object' ? p.category.name : p.category;
        cats.set(catName, (cats.get(catName) || 0) + 1);
      }
    });

    const dynamicCategories = [
      { id: 'all', name: siteContent.projects_all_label || 'همه پروژه‌ها', icon: '🏗️', count: allCount }
    ];

    cats.forEach((count, name) => {
      dynamicCategories.push({
        id: name,
        name: name,
        icon: '📁', // Default icon
        count: count
      });
    });

    // If no products, use fallback for preview
    if (dynamicCategories.length === 1 && allCount === 0) {
        return [
            { id: 'all', name: 'همه پروژه‌ها', icon: '🏗️', count: 0 },
        ];
    }

    return dynamicCategories;
  }, [siteContent, products]);

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