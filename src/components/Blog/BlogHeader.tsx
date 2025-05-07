"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { FaSearch } from 'react-icons/fa';

interface BlogHeaderProps {
  title: string;
  description: string;
  onSearch: (query: string) => void;
}

const BlogHeader: React.FC<BlogHeaderProps> = ({ title, description, onSearch }) => {
  return (
    <div className="mb-12 relative">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 
          className="glitch-text-header text-4xl md:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-400 to-blue-400 mb-4"
          data-text={title}
        >
          {title}
        </h1>
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent"
        ></motion.div>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-6 text-gray-300 text-lg max-w-2xl mx-auto"
        >
          {description}
        </motion.p>
        
        {/* Search box */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-8 max-w-md mx-auto"
        >
          <div className="relative group">
            <input
              type="text"
              placeholder="Search blog posts..."
              onChange={(e) => onSearch(e.target.value)}
              className="w-full px-5 py-3 bg-gray-900/80 border border-gray-700 rounded-lg text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent backdrop-blur-sm pl-12 peer"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-500 group-hover:text-indigo-400 transition-colors duration-300" />
            </div>
            
            {/* Glowing effect */}
            <div className="absolute -inset-0.5 bg-indigo-500/20 blur-md rounded-lg opacity-0 transition-opacity duration-300 -z-10 group-hover:opacity-70"></div>
          </div>
        </motion.div>
      </motion.div>
      
      {/* CSS for header styles */}
      <style jsx>{`
        .glitch-text-header {
          position: relative;
        }
        
        .glitch-text-header::before,
        .glitch-text-header::after {
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: transparent;
        }
        
        .glitch-text-header::before {
          left: 2px;
          text-shadow: -1px 0 #a855f7;
          clip: rect(44px, 450px, 56px, 0);
          animation: glitch-anim 5s infinite linear alternate-reverse;
        }
        
        .glitch-text-header::after {
          left: -2px;
          text-shadow: -1px 0 #6366f1;
          clip: rect(44px, 450px, 56px, 0);
          animation: glitch-anim2 5s infinite linear alternate-reverse;
          animation-delay: 0.1s;
        }
        
        @keyframes glitch-anim {
          0% { clip: rect(30px, 9999px, 10px, 0); }
          5% { clip: rect(54px, 9999px, 98px, 0); }
          10% { clip: rect(49px, 9999px, 35px, 0); }
          /* ...other keyframes... */
          100% { clip: rect(13px, 9999px, 71px, 0); }
        }
        
        @keyframes glitch-anim2 {
          0% { clip: rect(86px, 9999px, 30px, 0); }
          5% { clip: rect(12px, 9999px, 55px, 0); }
          /* ...other keyframes... */
          100% { clip: rect(38px, 9999px, 12px, 0); }
        }
      `}</style>
    </div>
  );
};

export default BlogHeader;
