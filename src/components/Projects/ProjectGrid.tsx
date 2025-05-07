"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa';
import ProjectModal from './ProjectModal';

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

interface ProjectGridProps {
  projects: Project[];
}

const ProjectGrid: React.FC<ProjectGridProps> = ({ projects }) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="relative">
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        layout
      >
        <AnimatePresence>
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              layout
              onClick={() => handleProjectClick(project)}
              className="project-card h-80 rounded-xl overflow-hidden cursor-pointer group relative transform-gpu hover:z-10"
              style={{ transformStyle: 'preserve-3d' }}
              whileHover={{ 
                scale: 1.03, 
                rotateY: 5, 
                rotateX: -2,
                y: -5
              }}
            >
              {/* Project Image */}
              <div className="absolute inset-0 bg-gray-900">
                <Image 
                  src={project.image} 
                  alt={project.title}
                  layout="fill" 
                  objectFit="cover"
                  className="group-hover:scale-110 transition-transform duration-500 opacity-70 group-hover:opacity-40"
                />
                
                {/* Scanline effect */}
                <div className="absolute inset-0 scanline opacity-20 pointer-events-none"></div>
                
                {/* Tech circuit pattern overlay */}
                <div className="absolute inset-0 circuit-pattern opacity-5 group-hover:opacity-15 transition-opacity duration-500"></div>
              </div>
              
              {/* Featured badge */}
              {project.featured && (
                <div className="absolute top-4 left-4 bg-indigo-600/80 text-white text-xs px-2 py-1 rounded backdrop-blur-sm border border-indigo-500/50 z-10">
                  Featured
                </div>
              )}
              
              {/* Category tag */}
              <div className="absolute top-4 right-4 text-xs bg-indigo-900/70 text-indigo-300 px-3 py-1 rounded-md backdrop-blur-sm border border-indigo-700/50 font-mono z-10">
                {project.category}
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
              
              {/* Glowing border */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="absolute inset-0 border-2 border-indigo-500/50 rounded-xl"></div>
                <div className="absolute inset-0 border-2 border-indigo-500/30 rounded-xl blur-md"></div>
              </div>
              
              {/* Project info */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 z-10">
                <h3 className="text-xl font-bold text-white mb-2 glitch-text" data-text={project.title}>
                  {project.title}
                </h3>
                <p className="text-gray-300 line-clamp-2 mb-4 text-sm opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                  {project.description}
                </p>
                
                {/* Tech stack pills */}
                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.technologies.slice(0, 3).map((tech, i) => (
                    <span 
                      key={i} 
                      className="text-xs px-2 py-1 rounded-md bg-gray-800/70 text-gray-300 border border-gray-700/50"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="text-xs px-2 py-1 rounded-md bg-gray-800/70 text-gray-300 border border-gray-700/50">
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>
              </div>
              
              {/* Project ID */}
              <div className="absolute bottom-2 left-2">
                <div className="text-xs text-indigo-500/50 font-mono">PRJ://0{index + 1}</div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
      
      {/* Project modal */}
      <ProjectModal 
        project={selectedProject} 
        isOpen={modalOpen} 
        onClose={handleCloseModal} 
      />
      
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
          /* ...rest of the keyframes... */
          100% { clip: rect(13px, 9999px, 71px, 0); }
        }
        
        @keyframes glitch-anim2 {
          0% { clip: rect(86px, 9999px, 30px, 0); }
          5% { clip: rect(12px, 9999px, 55px, 0); }
          /* ...rest of the keyframes... */
          100% { clip: rect(38px, 9999px, 12px, 0); }
        }
      `}</style>
    </div>
  );
};

export default ProjectGrid;
