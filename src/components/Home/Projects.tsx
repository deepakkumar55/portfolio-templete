"use client";
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaTimes, FaCode, FaBookmark } from 'react-icons/fa';
import { Particles } from "@tsparticles/react";
import { particlesInit, baseParticlesConfig } from '@/utils/particlesConfig';
import Image from 'next/image';

// Project card component
const ProjectCard: React.FC<{
  project: ProjectType;
  index: number;
  onClick: () => void;
}> = ({ project, index, onClick }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.2 });
  
  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ 
        scale: 1.03, 
        rotateY: 5, 
        rotateX: -2,
        y: -5
      }}
      className="project-card relative h-72 rounded-xl overflow-hidden cursor-pointer group transform-gpu"
      style={{ transformStyle: 'preserve-3d' }}
      onClick={onClick}
    >
      {/* Project image */}
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
      
      {/* Glowing border */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="absolute inset-0 border-2 border-indigo-500/50 rounded-xl"></div>
        <div className="absolute inset-0 border-2 border-indigo-500/30 rounded-xl blur-md"></div>
      </div>
      
      {/* Category tag */}
      <div className="absolute top-4 right-4 text-xs bg-indigo-900/70 text-indigo-300 px-3 py-1 rounded-md backdrop-blur-sm border border-indigo-700/50 font-mono">
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
      
      {/* Project info */}
      <div className="absolute inset-0 flex flex-col justify-end p-6">
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
      
      {/* Project ID - tech decor */}
      <div className="absolute bottom-2 left-2">
        <div className="text-xs text-indigo-500/50 font-mono">PRJ://0{index + 1}</div>
      </div>
    </motion.div>
  );
};

// Project modal component for detailed view
const ProjectModal: React.FC<{
  project: ProjectType | null;
  onClose: () => void;
  isOpen: boolean;
}> = ({ project, onClose, isOpen }) => {
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
            {/* Modal header with close button */}
            <div className="relative h-64 md:h-80 bg-gray-900">
              <Image 
                src={project.image} 
                alt={project.title}
                layout="fill" 
                objectFit="cover"
                className="opacity-70"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
              
              {/* Close button */}
              <button 
                onClick={onClose} 
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 border border-gray-700 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
              >
                <FaTimes />
              </button>
              
              {/* Category tag */}
              <div className="absolute top-4 left-4 text-xs bg-indigo-900/80 text-indigo-300 px-3 py-1 rounded-md backdrop-blur-sm border border-indigo-700/50 font-mono">
                {project.category}
              </div>
              
              {/* Project title */}
              <div className="absolute bottom-0 left-0 right-0 px-6 py-4">
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
                  {project.description}
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
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Terminal-style section description
const TerminalDescription: React.FC<{ text: string }> = ({ text }) => {
  return (
    <div className="font-mono text-center max-w-2xl mx-auto bg-black/40 border border-green-500/30 rounded-md p-4 overflow-hidden relative">
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-green-500 to-transparent"></div>
      <div className="text-gray-400">
        <span className="text-green-400">{'>'} </span>
        <span className="text-gray-300">{text}</span>
        <span className="text-green-400 animate-pulse">_</span>
      </div>
    </div>
  );
};

// Filter button for categories
const FilterButton: React.FC<{
  category: string;
  isActive: boolean;
  onClick: () => void;
}> = ({ category, isActive, onClick }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
        isActive 
          ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20' 
          : 'bg-gray-800/50 text-gray-400 hover:text-gray-300 backdrop-blur-sm border border-gray-700/50'
      }`}
    >
      {category}
    </motion.button>
  );
};

// Define project type for TypeScript
interface ProjectType {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
}

// Main Projects component
const Projects: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState<ProjectType | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  
  // Sample projects data (replace with your actual projects)
  const projects: ProjectType[] = [
    {
      id: '1',
      title: 'E-Commerce Platform',
      description: 'A full-featured e-commerce platform with product management, user authentication, shopping cart functionality, and payment processing. Implemented with a modern tech stack and responsive design.',
      image: '/projects/ecommerce.jpg', // Replace with your image path
      category: 'Web Development',
      technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'Stripe API'],
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com/example'
    },
    {
      id: '2',
      title: 'Portfolio Website',
      description: 'A responsive portfolio website with animated sections, dark mode, and contact form functionality. Built with performance and accessibility in mind.',
      image: '/projects/portfolio.jpg',
      category: 'Web Development',
      technologies: ['React', 'Next.js', 'Tailwind CSS', 'Framer Motion']
    },
    {
      id: '3',
      title: 'Task Management App',
      description: 'A productivity application that helps users organize tasks, set deadlines, and track progress. Features include drag-and-drop functionality, reminders, and team collaboration.',
      image: '/projects/task-app.jpg',
      category: 'App Development',
      technologies: ['React Native', 'Firebase', 'Redux', 'Push Notifications'],
      liveUrl: 'https://example.com/app',
      githubUrl: 'https://github.com/example/app'
    },
    {
      id: '4',
      title: 'Fitness Tracker UI',
      description: 'A sleek UI design for a fitness tracking application, featuring intuitive workout tracking, nutrition monitoring, and progress visualization.',
      image: '/projects/fitness-ui.jpg',
      category: 'UI/UX Design',
      technologies: ['Figma', 'Adobe XD', 'Illustrator', 'Prototyping'],
      liveUrl: 'https://dribbble.com/example'
    },
    {
      id: '5',
      title: 'Restaurant Website',
      description: 'A modern website for a local restaurant featuring an interactive menu, reservation system, and integration with food delivery services.',
      image: '/projects/restaurant.jpg',
      category: 'Web Development',
      technologies: ['HTML5', 'CSS3', 'JavaScript', 'PHP', 'MySQL'],
      liveUrl: 'https://example-restaurant.com'
    },
    {
      id: '6',
      title: 'Cryptocurrency Dashboard',
      description: 'A real-time dashboard for monitoring cryptocurrency prices, portfolio performance, and market trends with interactive charts and alerts.',
      image: '/projects/crypto.jpg',
      category: 'Web Development',
      technologies: ['React', 'Redux', 'Chart.js', 'Cryptocurrency API', 'WebSockets'],
      liveUrl: 'https://crypto-dashboard.example.com',
      githubUrl: 'https://github.com/example/crypto'
    }
  ];
  
  // Get unique categories from projects
  const categories = ['All', ...Array.from(new Set(projects.map(p => p.category)))];
  
  // Filter projects by category
  const filteredProjects = activeCategory === 'All' 
    ? projects 
    : projects.filter(project => project.category === activeCategory);
  
  // Handle project card click
  const handleProjectClick = (project: ProjectType) => {
    setSelectedProject(project);
    setModalOpen(true);
  };
  
  // Handle modal close
  const handleCloseModal = () => {
    setModalOpen(false);
    setTimeout(() => setSelectedProject(null), 300); // Wait for animation to complete
  };

  return (
    <section id="projects" className="py-24 relative overflow-hidden perspective-1000">
      {/* Particles background */}
      <Particles
        id="tsparticles-projects"
        init={particlesInit}
        options={baseParticlesConfig}
        className="absolute inset-0 z-0"
      />
      
      {/* Cyberpunk grid effect */}
      <div className="absolute inset-0 z-0 grid-bg"></div>
      
      {/* Background accents */}
      <div className="absolute -right-64 top-1/3 w-96 h-96 bg-indigo-700/20 rounded-full blur-3xl"></div>
      <div className="absolute -left-64 bottom-1/3 w-96 h-96 bg-purple-700/20 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section header with glitch effect */}
        <div ref={sectionRef} className="text-center mb-16 relative">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="inline-block"
          >
            <h2 className="glitch-text-header text-3xl md:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-400 to-blue-400 mb-4"
                data-text="My Projects">
              My Projects
            </h2>
            <motion.div 
              initial={{ width: 0 }}
              animate={isInView ? { width: "100%" } : { width: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent"
            ></motion.div>
          </motion.div>
          
          {/* Terminal-style description */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-6 mb-12"
          >
            <TerminalDescription text="A showcase of my recent work and passion projects. Click on any project to view more details." />
          </motion.div>
        </div>
        
        {/* Category filters */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category, index) => (
            <FilterButton
              key={category}
              category={category}
              isActive={activeCategory === category}
              onClick={() => setActiveCategory(category)}
            />
          ))}
        </motion.div>
        
        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                onClick={() => handleProjectClick(project)}
              />
            ))}
          </AnimatePresence>
        </div>
        
        {/* Empty state */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <p className="text-gray-400 text-lg">No projects found in this category.</p>
          </motion.div>
        )}
        
        {/* Show more button - conditionally rendered if you have many projects */}
        {/* {projects.length > 6 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-16 text-center"
          >
            <button className="cyber-button-primary group relative px-8 py-4 overflow-hidden">
              <span className="relative z-10 text-white">View More Projects</span>
              <span className="cyber-button-glitch"></span>
            </button>
          </motion.div>
        )} */}
      </div>
      
      {/* Project details modal */}
      <ProjectModal 
        project={selectedProject} 
        isOpen={modalOpen} 
        onClose={handleCloseModal} 
      />
      
      {/* CSS for custom styles */}
      <style jsx>{`
        .grid-bg {
          background-image: 
            linear-gradient(rgba(99, 102, 241, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99, 102, 241, 0.1) 1px, transparent 1px);
          background-size: 40px 40px;
          background-position: center center;
        }
        
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
        
        @keyframes glitch-anim {
          0% { clip: rect(30px, 9999px, 10px, 0); }
          5% { clip: rect(54px, 9999px, 98px, 0); }
          10% { clip: rect(49px, 9999px, 35px, 0); }
          15% { clip: rect(20px, 9999px, 67px, 0); }
          20% { clip: rect(61px, 9999px, 26px, 0); }
          25% { clip: rect(5px, 9999px, 13px, 0); }
          30% { clip: rect(63px, 9999px, 1px, 0); }
          35% { clip: rect(14px, 9999px, 86px, 0); }
          40% { clip: rect(99px, 9999px, 100px, 0); }
          45% { clip: rect(23px, 9999px, 22px, 0); }
          50% { clip: rect(39px, 9999px, 84px, 0); }
          55% { clip: rect(5px, 9999px, 64px, 0); }
          60% { clip: rect(2px, 9999px, 98px, 0); }
          65% { clip: rect(52px, 9999px, 46px, 0); }
          70% { clip: rect(16px, 9999px, 52px, 0); }
          75% { clip: rect(95px, 9999px, 33px, 0); }
          80% { clip: rect(54px, 9999px, 91px, 0); }
          85% { clip: rect(38px, 9999px, 9px, 0); }
          90% { clip: rect(67px, 9999px, 47px, 0); }
          95% { clip: rect(99px, 9999px, 34px, 0); }
          100% { clip: rect(13px, 9999px, 71px, 0); }
        }
        
        @keyframes glitch-anim2 {
          0% { clip: rect(86px, 9999px, 30px, 0); }
          5% { clip: rect(12px, 9999px, 55px, 0); }
          10% { clip: rect(12px, 9999px, 15px, 0); }
          15% { clip: rect(55px, 9999px, 2px, 0); }
          20% { clip: rect(33px, 9999px, 98px, 0); }
          25% { clip: rect(21px, 9999px, 73px, 0); }
          30% { clip: rect(13px, 9999px, 51px, 0); }
          35% { clip: rect(74px, 9999px, 6px, 0); }
          40% { clip: rect(98px, 9999px, 21px, 0); }
          45% { clip: rect(63px, 9999px, 62px, 0); }
          50% { clip: rect(27px, 9999px, 48px, 0); }
          55% { clip: rect(47px, 9999px, 4px, 0); }
          60% { clip: rect(72px, 9999px, 28px, 0); }
          65% { clip: rect(32px, 9999px, 9px, 0); }
          70% { clip: rect(95px, 9999px, 12px, 0); }
          75% { clip: rect(26px, 9999px, 77px, 0); }
          80% { clip: rect(26px, 9999px, 28px, 0); }
          85% { clip: rect(66px, 9999px, 22px, 0); }
          90% { clip: rect(7px, 9999px, 32px, 0); }
          95% { clip: rect(48px, 9999px, 95px, 0); }
          100% { clip: rect(38px, 9999px, 12px, 0); }
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
    </section>
  );
};

export default Projects;
