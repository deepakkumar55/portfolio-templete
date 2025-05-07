"use client";
import React from 'react';
import { motion } from 'framer-motion';

interface CategoryFilterProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  activeCategory,
  onCategoryChange
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="flex flex-wrap justify-center gap-3 mb-10"
    >
      {categories.map((category, index) => (
        <motion.button
          key={category}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onCategoryChange(category)}
          className={`relative px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 overflow-hidden ${
            activeCategory === category 
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20' 
              : 'bg-gray-800/50 text-gray-400 hover:text-gray-300 backdrop-blur-sm border border-gray-700/50'
          }`}
        >
          <span className="relative z-10">{category}</span>
          
          {/* Active category indicator */}
          {activeCategory === category && (
            <motion.div 
              layoutId="activeCategoryBubble"
              className="absolute inset-0 bg-indigo-600"
              transition={{ type: "spring", duration: 0.6 }}
            />
          )}
          
          {/* Hover effect */}
          <div className="absolute inset-0 bg-indigo-500/30 opacity-0 hover:opacity-100 transition-opacity duration-300 -z-10"></div>
          
          {/* Tech corner accents for active */}
          {activeCategory === category && (
            <>
              <div className="absolute top-0 left-0 w-2 h-2">
                <div className="absolute top-0 left-0 w-2 h-0.5 bg-indigo-400"></div>
                <div className="absolute top-0 left-0 w-0.5 h-2 bg-indigo-400"></div>
              </div>
              <div className="absolute top-0 right-0 w-2 h-2">
                <div className="absolute top-0 right-0 w-2 h-0.5 bg-indigo-400"></div>
                <div className="absolute top-0 right-0 w-0.5 h-2 bg-indigo-400"></div>
              </div>
            </>
          )}
        </motion.button>
      ))}
    </motion.div>
  );
};

export default CategoryFilter;
