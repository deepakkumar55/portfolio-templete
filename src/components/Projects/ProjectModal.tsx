"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { FaGithub, FaExternalLinkAlt, FaTimes, FaCode, FaBookmark } from 'react-icons/fa';

interface Project {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  image: string;
  category: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
}

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, isOpen, onClose }) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="bg-gradient-to-br from-gray-900/95 via-gray-800/95 to-gray-900/95 rounded-xl overflow-hidden w-full max-w-4xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal header with image */}
            <div className="relative h-64 md:h-80 bg-gray-900">
              <Image 
                src={project.image} 
                alt={project.title}
                layout="fill" 
                objectFit="cover"
                className="opacity-70"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
              
              {/* Tech circuit pattern overlay */}
              <div className="absolute inset-0 circuit-pattern opacity-10"></div>
              
              {/* Close button */}
              <button 
                onClick={onClose} 
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 border border-gray-700 flex items-center justify-center text-gray-400 hover:text-white transition-colors z-20"
              >
                <FaTimes />
              </button>
              
              {/* Category tag */}
              <div className="absolute top-4 left-4 text-xs bg-indigo-900/80 text-indigo-300 px-3 py-1 rounded-md backdrop-blur-sm border border-indigo-700/50 font-mono z-10">
                {project.category}
              </div>
              
              {/* Project title */}
              <div className="absolute bottom-0 left-0 right-0 px-6 py-4 z-10">
                <h2 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-indigo-300">
                  {project.title}
                </h2>
              </div>
            </div>
            
            {/* Modal content */}
            <div className="p-6 space-y-6">
              {/* Project description */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-indigo-300 flex items-center">
                  <FaBookmark className="mr-2 text-indigo-400" /> Overview
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {project.fullDescription}
                </p>
              </div>
              
              {/* Project technologies */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-indigo-300 flex items-center">
                  <FaCode className="mr-2 text-indigo-400" /> Technologies
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, i) => (
                    <span 
                      key={i} 
                      className="text-sm px-3 py-1 rounded-md bg-gray-800 text-gray-300 border border-gray-700"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Links */}
              <div className="pt-4 flex flex-wrap gap-4">
                {project.liveUrl && (
                  <a 
                    href={project.liveUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition-colors"
                  >
                    <FaExternalLinkAlt /> Live Demo
                  </a>
                )}
                {project.githubUrl && (
                  <a 
                    href={project.githubUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-md transition-colors"
                  >
                    <FaGithub /> Source Code
                  </a>
                )}
              </div>
            </div>
            
            {/* Tech ID tag */}
            <div className="absolute bottom-2 right-2">
              <div className="text-xs text-indigo-500/50 font-mono">PROJECT://{project.id}</div>
            </div>
          </motion.div>
        </motion.div>
      )}
      
      {/* CSS for modal styles */}
      <style jsx>{`
        .circuit-pattern {
          background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M5 10 h90 v10 h-10 v70 h10 v10 h-90 v-10 h10 v-70 h-10 z' fill='none' stroke='%236366F1' stroke-width='0.5'/%3E%3C/svg%3E");
          background-size: 100px 100px;
        }
      `}</style>
    </AnimatePresence>
  );
};

export default ProjectModal;
