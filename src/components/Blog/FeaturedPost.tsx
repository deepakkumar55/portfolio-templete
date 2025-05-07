"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaCalendarAlt, FaClock, FaBookmark, FaExternalLinkAlt } from 'react-icons/fa';
import { BlogPost } from '@/types/blog';

interface FeaturedPostProps {
  post: BlogPost;
}

const FeaturedPost: React.FC<FeaturedPostProps> = ({ post }) => {
  return (
    <div className="featured-post-container">
      <div className="text-center mb-6">
        <div className="inline-block bg-indigo-900/50 px-4 py-1 rounded-full text-sm text-indigo-300 font-medium border border-indigo-700/50 backdrop-blur-sm">
          <FaBookmark className="inline-block mr-2" />
          Featured Post
        </div>
      </div>
      
      <motion.div
        whileHover={{ scale: 1.01 }}
        className="relative rounded-xl overflow-hidden backdrop-blur-md bg-gray-900/40 border border-gray-800 transform-gpu"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Image section */}
          <div className="relative h-64 lg:h-auto">
            <Image 
              src={post.coverImage} 
              alt={post.title}
              layout="fill" 
              objectFit="cover"
              className="group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-transparent lg:bg-gradient-to-t opacity-60"></div>
            
            {/* Scanline effect */}
            <div className="absolute inset-0 scanline opacity-20 pointer-events-none"></div>
            
            {/* Category tag */}
            <div className="absolute bottom-4 left-4 text-xs bg-indigo-900/70 text-indigo-300 px-3 py-1 rounded-md backdrop-blur-sm border border-indigo-700/50 font-mono z-10">
              {post.category}
            </div>
          </div>
          
          {/* Content section */}
          <div className="p-6 lg:pr-8 flex flex-col justify-center relative">
            {/* Tech circuit pattern overlay */}
            <div className="absolute inset-0 circuit-pattern opacity-5"></div>
            
            {/* Tech corner accents */}
            <div className="absolute top-0 left-0 w-4 h-4">
              <div className="absolute top-0 left-0 w-2 h-0.5 bg-indigo-500"></div>
              <div className="absolute top-0 left-0 w-0.5 h-2 bg-indigo-500"></div>
            </div>
            <div className="absolute top-0 right-0 w-4 h-4">
              <div className="absolute top-0 right-0 w-2 h-0.5 bg-purple-500"></div>
              <div className="absolute top-0 right-0 w-0.5 h-2 bg-purple-500"></div>
            </div>
            
            {/* Post metadata */}
            <div className="flex items-center text-sm text-gray-400 mb-3 space-x-4 relative z-10">
              <div className="flex items-center">
                <FaCalendarAlt className="mr-1 text-indigo-400" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center">
                <FaClock className="mr-1 text-indigo-400" />
                <span>{post.readTime} min read</span>
              </div>
            </div>
            
            {/* Post title */}
            <h2 className="text-2xl lg:text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-indigo-300 relative z-10">
              {post.title}
            </h2>
            
            {/* Post excerpt */}
            <p className="text-gray-300 mb-6 relative z-10">
              {post.excerpt}
            </p>
            
            {/* Post tags */}
            <div className="flex flex-wrap gap-2 mb-6 relative z-10">
              {post.tags.map((tag, i) => (
                <span 
                  key={i} 
                  className="text-xs px-2 py-1 rounded-md bg-gray-800/70 text-gray-300 border border-gray-700/50"
                >
                  #{tag}
                </span>
              ))}
            </div>
            
            {/* Read more button - Changed to external link */}
            <a 
              href={post.externalUrl || `http://thecampuscoders.com/blogs/${post.slug}`} 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center cyber-button-primary max-w-max relative px-5 py-2 overflow-hidden"
            >
              <span className="relative z-10 text-white flex items-center">
                Read Full Article
                <FaExternalLinkAlt className="ml-2 w-4 h-4" />
              </span>
              <span className="cyber-button-glitch"></span>
            </a>
          </div>
        </div>
      </motion.div>
      
      {/* CSS for custom styles */}
      <style jsx>{`
        .circuit-pattern {
          background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M5 10 h90 v10 h-10 v70 h10 v10 h-90 v-10 h10 v-70 h-10 z' fill='none' stroke='%236366F1' stroke-width='0.5'/%3E%3C/svg%3E");
          background-size: 100px 100px;
        }
        
        .scanline {
          background: linear-gradient(
            to bottom,
            transparent 0%,
            rgba(99, 102, 241, 0.15) 10%,
            transparent 20%
          );
          position: absolute;
          left: 0;
          width: 100%;
          height: 300%;
          animation: scanlines 3s linear infinite;
        }
        
        .cyber-button-primary {
          background: linear-gradient(45deg, #6366f1, #a855f7);
          border-radius: 4px;
          clip-path: polygon(
            0% 0%, 
            100% 0%, 
            100% 70%, 
            95% 100%, 
            0% 100%
          );
        }
        
        .cyber-button-glitch {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(45deg, #6366f1, #a855f7);
          opacity: 0;
          z-index: 0;
          transition: opacity 0.3s;
        }
        
        .cyber-button-primary:hover .cyber-button-glitch {
          opacity: 0.5;
          animation: glitch 0.3s cubic-bezier(.25, .46, .45, .94) both infinite;
        }
        
        @keyframes scanlines {
          0% { transform: translateY(-200%); }
          100% { transform: translateY(0%); }
        }
        
        @keyframes glitch {
          0% { transform: translate(0); }
          20% { transform: translate(-2px, 2px); }
          40% { transform: translate(-2px, -2px); }
          60% { transform: translate(2px, 2px); }
          80% { transform: translate(2px, -2px); }
          100% { transform: translate(0); }
        }
      `}</style>
    </div>
  );
};

export default FeaturedPost;
