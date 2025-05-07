"use client";
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { FaCalendarAlt, FaClock, FaExternalLinkAlt } from 'react-icons/fa';
import { BlogPost } from '@/types/blog';

interface BlogPostCardProps {
  post: BlogPost;
  index: number;
}

const BlogPostCard: React.FC<BlogPostCardProps> = ({ post, index }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.2 });
  
  // External URL to redirect to
  const blogUrl = post.externalUrl || `http://thecampuscoders.com/blogs/${post.slug}`;
  
  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      whileHover={{ 
        scale: 1.03, 
        rotateY: 5, 
        rotateX: -2,
        y: -5
      }}
      className="blog-card relative h-[420px] rounded-xl overflow-hidden group transform-gpu"
      style={{ transformStyle: 'preserve-3d' }}
    >
      <a href={blogUrl} target="_blank" rel="noopener noreferrer" className="block h-full">
        {/* Card image */}
        <div className="h-48 relative overflow-hidden">
          <Image 
            src={post.coverImage} 
            alt={post.title}
            layout="fill" 
            objectFit="cover"
            className="group-hover:scale-110 transition-transform duration-500"
          />
          
          {/* Scanline effect */}
          <div className="absolute inset-0 scanline opacity-20 pointer-events-none"></div>
          
          {/* Category tag */}
          <div className="absolute top-4 right-4 text-xs bg-indigo-900/70 text-indigo-300 px-3 py-1 rounded-md backdrop-blur-sm border border-indigo-700/50 font-mono z-10">
            {post.category}
          </div>
          
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-70"></div>
        </div>
        
        {/* Post content */}
        <div className="p-6 bg-gradient-to-br from-gray-900/90 via-gray-800/90 to-gray-900/90 h-full relative">
          {/* Tech circuit pattern overlay */}
          <div className="absolute inset-0 circuit-pattern opacity-5 group-hover:opacity-10 transition-opacity duration-500"></div>
          
          {/* Post metadata */}
          <div className="flex items-center text-xs text-gray-400 mb-3 space-x-4">
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
          <h3 className="text-xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-indigo-300 line-clamp-2 glitch-text" data-text={post.title}>
            {post.title}
          </h3>
          
          {/* Post excerpt */}
          <p className="text-gray-400 line-clamp-3 text-sm mb-4">
            {post.excerpt}
          </p>
          
          {/* Post tags */}
          <div className="flex flex-wrap gap-2 mt-auto">
            {post.tags.slice(0, 3).map((tag, i) => (
              <span 
                key={i} 
                className="text-xs px-2 py-1 rounded-md bg-gray-800/70 text-gray-300 border border-gray-700/50"
              >
                #{tag}
              </span>
            ))}
            {post.tags.length > 3 && (
              <span className="text-xs px-2 py-1 rounded-md bg-gray-800/70 text-gray-300 border border-gray-700/50">
                +{post.tags.length - 3}
              </span>
            )}
          </div>
          
          {/* Read more indicator - Added external link icon */}
          <div className="absolute bottom-5 right-6 text-indigo-400 text-sm font-medium group-hover:text-indigo-300 transition-colors duration-300 flex items-center">
            <span>Read More</span>
            <FaExternalLinkAlt className="ml-1 w-3 h-3 transform transition-transform duration-300 group-hover:translate-x-1" />
          </div>
          
          {/* Tech corner accents */}
          <div className="absolute top-0 left-0 w-4 h-4">
            <div className="absolute top-0 left-0 w-2 h-0.5 bg-indigo-500"></div>
            <div className="absolute top-0 left-0 w-0.5 h-2 bg-indigo-500"></div>
          </div>
          <div className="absolute top-0 right-0 w-4 h-4">
            <div className="absolute top-0 right-0 w-2 h-0.5 bg-purple-500"></div>
            <div className="absolute top-0 right-0 w-0.5 h-2 bg-purple-500"></div>
          </div>
          
          {/* Blog post ID */}
          <div className="absolute bottom-2 left-2">
            <div className="text-xs text-indigo-500/50 font-mono">POST://0{index + 1}</div>
          </div>
        </div>
      </a>
      
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
        
        .glitch-text {
          position: relative;
        }
        
        .glitch-text:hover::before,
        .glitch-text:hover::after {
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: transparent;
        }
        
        .glitch-text:hover::before {
          left: 2px;
          text-shadow: -1px 0 #a855f7;
          clip: rect(44px, 450px, 56px, 0);
          animation: glitch-anim 3s infinite linear alternate-reverse;
        }
        
        .glitch-text:hover::after {
          left: -2px;
          text-shadow: -1px 0 #6366f1;
          clip: rect(44px, 450px, 56px, 0);
          animation: glitch-anim2 3s infinite linear alternate-reverse;
          animation-delay: 0.1s;
        }
        
        @keyframes scanlines {
          0% { transform: translateY(-200%); }
          100% { transform: translateY(0%); }
        }
        
        @keyframes glitch-anim {
          0% { clip: rect(30px, 9999px, 10px, 0); }
          5% { clip: rect(54px, 9999px, 98px, 0); }
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
    </motion.div>
  );
};

export default BlogPostCard;
