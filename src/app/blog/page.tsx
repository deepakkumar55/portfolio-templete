"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import BlogHeader from '@/components/Blog/BlogHeader';
import BlogGrid from '@/components/Blog/BlogGrid';
import FeaturedPost from '@/components/Blog/FeaturedPost';
import ParticlesBackground from '@/components/Shared/ParticlesBackground';
import CategoryFilter from '@/components/Blog/CategoryFilter';
import { blogPosts } from '@/data/blogData';

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [filteredPosts, setFilteredPosts] = useState(blogPosts);
  
  // Extract unique categories from blog posts
  const categories = ['All', ...Array.from(new Set(blogPosts.map(post => post.category)))];
  
  // Handle category change
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
  };
  
  // Handle search input
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };
  
  // Filter blog posts based on category and search query
  useEffect(() => {
    let results = blogPosts;
    
    // Apply category filter
    if (activeCategory !== 'All') {
      results = results.filter(post => post.category === activeCategory);
    }
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(post => 
        post.title.toLowerCase().includes(query) || 
        post.excerpt.toLowerCase().includes(query) ||
        post.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    setFilteredPosts(results);
  }, [activeCategory, searchQuery]);
  
  // Get the featured post (most recent or marked as featured)
  const featuredPost = blogPosts.find(post => post.featured) || blogPosts[0];

  return (
    <main className="relative min-h-screen bg-gray-900 overflow-hidden">
      {/* Particles Background */}
      <ParticlesBackground id="blog-particles" particleColor="#6366f1" linkColor="#a855f7" />
      
      {/* Cyberpunk grid effect */}
      <div className="absolute inset-0 z-0 grid-bg"></div>
      
      {/* Background accents */}
      <div className="absolute -left-64 top-1/3 w-96 h-96 bg-purple-700/20 rounded-full blur-3xl"></div>
      <div className="absolute -right-64 bottom-1/3 w-96 h-96 bg-indigo-700/20 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 py-24 relative z-10">
        {/* Blog header with title, description, and search */}
        <BlogHeader 
          title="My Blog"
          description="Thoughts, stories, and ideas on tech, design, and development."
          onSearch={handleSearch}
        />
        
        {/* Featured post section */}
        {featuredPost && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="my-12"
          >
            <FeaturedPost post={featuredPost} />
          </motion.div>
        )}
        
        {/* Category filter */}
        <CategoryFilter 
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
        />
        
        {/* Blog post grid */}
        <BlogGrid posts={filteredPosts} />
        
        {/* Empty state */}
        {filteredPosts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16 backdrop-blur-md bg-gray-900/40 rounded-xl p-8 border border-gray-800"
          >
            <h3 className="text-2xl font-bold text-indigo-400 mb-3">No posts found</h3>
            <p className="text-gray-400 max-w-md mx-auto">
              No blog posts match your current filters. Try adjusting your search criteria or explore different categories.
            </p>
          </motion.div>
        )}
      </div>
      
      {/* CSS for styles */}
      <style jsx>{`
        .grid-bg {
          background-image: 
            linear-gradient(rgba(99, 102, 241, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99, 102, 241, 0.1) 1px, transparent 1px);
          background-size: 40px 40px;
          background-position: center center;
        }
      `}</style>
    </main>
  );
}
