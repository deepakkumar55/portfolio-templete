"use client";
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaStar, FaCodeBranch, FaEye, FaExternalLinkAlt, FaGithub, FaCode } from 'react-icons/fa';

interface Repository {
  id: number;
  name: string;
  description: string;
  html_url: string;
  homepage: string;
  stargazers_count: number;
  forks_count: number;
  watchers_count: number;
  language: string;
  topics: string[];
  created_at: string;
  updated_at: string;
}

interface GitHubRepositoryCardProps {
  repository: Repository;
  index: number;
}

// Language color mapping
const languageColors: Record<string, string> = {
  JavaScript: '#f7df1e',
  TypeScript: '#3178c6',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Python: '#3572A5',
  Java: '#b07219',
  PHP: '#4F5D95',
  "C#": '#178600',
  "C++": '#f34b7d',
  Ruby: '#701516',
  Go: '#00ADD8',
  Swift: '#ffac45',
  Kotlin: '#F18E33',
  Rust: '#dea584',
  Dart: '#00B4AB',
};

// Get appropriate color class for language
const getLanguageColor = (language: string) => {
  if (!language) return 'bg-gray-600';
  
  const hexColor = languageColors[language];
  if (!hexColor) return 'bg-gray-600';
  
  return `bg-[${hexColor}]`;
};

// Format date to relative time
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays < 1) return 'today';
  if (diffDays === 1) return 'yesterday';
  if (diffDays < 30) return `${diffDays} days ago`;
  if (diffDays < 365) {
    const months = Math.floor(diffDays / 30);
    return `${months} ${months === 1 ? 'month' : 'months'} ago`;
  }
  
  const years = Math.floor(diffDays / 365);
  return `${years} ${years === 1 ? 'year' : 'years'} ago`;
};

const GitHubRepositoryCard: React.FC<GitHubRepositoryCardProps> = ({ repository, index }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.2 });
  
  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      whileHover={{ scale: 1.03, y: -5 }}
      className="backdrop-blur-md bg-gray-900/40 rounded-xl border border-gray-800 overflow-hidden transform-gpu"
    >
      {/* Repository header */}
      <div className="p-5 border-b border-gray-800 flex items-start justify-between">
        <div>
          <h3 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 mb-1">
            {repository.name}
          </h3>
          <div className="flex items-center text-xs text-gray-400">
            <span>Updated {formatDate(repository.updated_at)}</span>
          </div>
        </div>
        <div className="flex space-x-1">
          {repository.language && (
            <div className="flex items-center text-xs bg-gray-800 px-2 py-1 rounded-md">
              <span className={`w-2 h-2 rounded-full mr-1`} style={{ backgroundColor: languageColors[repository.language] || '#6e7681' }}></span>
              <span className="text-gray-300">{repository.language}</span>
            </div>
          )}
        </div>
      </div>
      
      {/* Repository body */}
      <div className="p-5 relative">
        {/* Circuit pattern */}
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
        
        {/* Description */}
        <p className="text-gray-400 text-sm mb-4 line-clamp-3 min-h-[3rem] relative z-10">
          {repository.description || 'No description provided'}
        </p>
        
        {/* Topics */}
        {repository.topics && repository.topics.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {repository.topics.slice(0, 3).map(topic => (
              <span key={topic} className="text-xs px-2 py-1 rounded-md bg-indigo-900/40 text-indigo-300 border border-indigo-700/50">
                {topic}
              </span>
            ))}
            {repository.topics.length > 3 && (
              <span className="text-xs px-2 py-1 rounded-md bg-gray-800/70 text-gray-300">
                +{repository.topics.length - 3}
              </span>
            )}
          </div>
        )}
        
        {/* Stats */}
        <div className="flex items-center justify-between mt-4 relative z-10">
          <div className="flex items-center space-x-4 text-gray-400 text-sm">
            <div className="flex items-center">
              <FaStar className="mr-1 text-yellow-500" />
              <span>{repository.stargazers_count}</span>
            </div>
            <div className="flex items-center">
              <FaCodeBranch className="mr-1 text-green-500" />
              <span>{repository.forks_count}</span>
            </div>
            <div className="flex items-center">
              <FaEye className="mr-1 text-blue-400" />
              <span>{repository.watchers_count}</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Repository footer */}
      <div className="border-t border-gray-800 p-4 flex justify-between items-center">
        <a 
          href={repository.html_url} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="flex items-center text-sm text-indigo-400 hover:text-indigo-300 transition-colors duration-300"
        >
          <FaGithub className="mr-2" />
          View Repository
        </a>
        
        {repository.homepage && (
          <a 
            href={repository.homepage} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center text-sm text-purple-400 hover:text-purple-300 transition-colors duration-300"
          >
            <FaExternalLinkAlt className="mr-2" />
            Live Demo
          </a>
        )}
      </div>
      
      {/* CSS for card elements */}
      <style jsx>{`
        .circuit-pattern {
          background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M5 10 h90 v10 h-10 v70 h10 v10 h-90 v-10 h10 v-70 h-10 z' fill='none' stroke='%236366F1' stroke-width='0.5'/%3E%3C/svg%3E");
          background-size: 100px 100px;
        }
      `}</style>
    </motion.div>
  );
};

export default GitHubRepositoryCard;
