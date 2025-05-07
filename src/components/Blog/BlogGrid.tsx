"use client";
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BlogPostCard from './BlogPostCard';
import { BlogPost } from '@/types/blog';

interface BlogGridProps {
  posts: BlogPost[];
}

const BlogGrid: React.FC<BlogGridProps> = ({ posts }) => {
  return (
    <motion.div 
      layout
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      <AnimatePresence>
        {posts.map((post, index) => (
          <BlogPostCard key={post.id} post={post} index={index} />
        ))}
      </AnimatePresence>
    </motion.div>
  );
};

export default BlogGrid;
