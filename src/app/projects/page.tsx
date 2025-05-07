"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ProjectsHeader from '@/components/Projects/ProjectsHeader';
import ProjectFilters from '@/components/Projects/ProjectFilters';
import ProjectGrid from '@/components/Projects/ProjectGrid';
import ParticlesBackground from '@/components/Shared/ParticlesBackground';

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [filteredProjects, setFilteredProjects] = useState(projectData);

  // Filter projects based on category and search query
  useEffect(() => {
    let results = projectData;
    
    // Apply category filter
    if (activeCategory !== 'All') {
      results = results.filter(project => project.category === activeCategory);
    }
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(project => 
        project.title.toLowerCase().includes(query) || 
        project.description.toLowerCase().includes(query) ||
        project.technologies.some(tech => tech.toLowerCase().includes(query))
      );
    }
    
    setFilteredProjects(results);
  }, [activeCategory, searchQuery]);

  // Handle search input change
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  // Handle category change
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
  };

  return (
    <main className="relative min-h-screen bg-gray-900 overflow-hidden">
      {/* Particles Background */}
      <ParticlesBackground id="projects-particles" />
      
      {/* Cyberpunk grid effect */}
      <div className="absolute inset-0 z-0 grid-bg"></div>
      
      {/* Background accents */}
      <div className="absolute -left-64 top-1/3 w-96 h-96 bg-indigo-700/20 rounded-full blur-3xl"></div>
      <div className="absolute -right-64 bottom-1/3 w-96 h-96 bg-purple-700/20 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 py-24 relative z-10">
        {/* Header section with title and description */}
        <ProjectsHeader
          title="My Projects"
          description="Explore my portfolio of recent work across web development, mobile apps, and design projects."
          onSearch={handleSearch}
        />
        
        {/* Filters section */}
        <ProjectFilters 
          activeCategory={activeCategory} 
          onCategoryChange={handleCategoryChange} 
          categories={['All', 'Web Development', 'Mobile App', 'UI/UX Design']}
        />
        
        {/* Projects grid */}
        <ProjectGrid projects={filteredProjects} />
        
        {/* Empty state */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16 backdrop-blur-md bg-gray-900/40 rounded-xl p-8 border border-gray-800"
          >
            <h3 className="text-2xl font-bold text-indigo-400 mb-3">No projects found</h3>
            <p className="text-gray-400 max-w-md mx-auto">
              No projects match your current filters. Try adjusting your search criteria or explore different categories.
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

// Sample project data - replace with your actual projects
const projectData = [
  {
    id: '1',
    title: 'E-Commerce Platform',
    description: 'A full-featured e-commerce platform with product management, user authentication, shopping cart functionality, and payment processing. Implemented with a modern tech stack and responsive design.',
    fullDescription: 'This e-commerce platform provides a complete solution for online businesses. Key features include product catalog management, user accounts and authentication, shopping cart with persistent storage, secure checkout with Stripe integration, order history, and admin dashboard. The application is fully responsive and follows best practices for accessibility and performance.',
    image: '/projects/ecommerce.jpg',
    category: 'Web Development',
    technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'Stripe API'],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/example',
    featured: true
  },
  {
    id: '2',
    title: 'Portfolio Website',
    description: 'A responsive portfolio website with animated sections, dark mode, and contact form functionality. Built with performance and accessibility in mind.',
    fullDescription: 'This portfolio site showcases professional work with a focus on modern design and optimal user experience. Features include smooth page transitions, dynamic content loading, contact form with validation, dark/light theme toggle, and comprehensive project galleries. The site is built with performance optimization techniques like code splitting, lazy loading, and image optimization.',
    image: '/projects/portfolio.jpg',
    category: 'Web Development',
    technologies: ['React', 'Next.js', 'Tailwind CSS', 'Framer Motion'],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/example',
    featured: true
  },
  {
    id: '3',
    title: 'Task Management App',
    description: 'A productivity application that helps users organize tasks, set deadlines, and track progress. Features include drag-and-drop functionality, reminders, and team collaboration.',
    fullDescription: 'This task management application helps users stay organized and productive. Key features include task creation with priority levels, deadline setting with reminders, project organization with custom categories, drag-and-drop task reordering, team member assignment, progress tracking with visual charts, and real-time updates for team collaboration.',
    image: '/projects/task-app.jpg',
    category: 'Mobile App',
    technologies: ['React Native', 'Firebase', 'Redux', 'Push Notifications'],
    liveUrl: 'https://example.com/app',
    githubUrl: 'https://github.com/example/app',
    featured: false
  },
  {
    id: '4',
    title: 'Fitness Tracker UI',
    description: 'A sleek UI design for a fitness tracking application, featuring intuitive workout tracking, nutrition monitoring, and progress visualization.',
    fullDescription: 'This comprehensive UI/UX design project for a fitness tracking application focuses on creating an intuitive and motivating user experience. The design includes screens for workout planning, exercise tracking with animation guides, nutrition logging with caloric breakdowns, progress visualization through interactive charts, achievement badges, and social sharing functionality.',
    image: '/projects/fitness-ui.jpg',
    category: 'UI/UX Design',
    technologies: ['Figma', 'Adobe XD', 'Illustrator', 'Prototyping'],
    liveUrl: 'https://dribbble.com/example',
    githubUrl: '',
    featured: false
  },
  {
    id: '5',
    title: 'Restaurant Website',
    description: 'A modern website for a local restaurant featuring an interactive menu, reservation system, and integration with food delivery services.',
    fullDescription: 'This restaurant website enhances the dining experience with digital convenience. Features include an interactive menu with filtering options and dietary information, real-time table reservation system with confirmation emails, integration with popular food delivery platforms, photo gallery of dishes and ambiance, event booking for special occasions, and customer testimonials section.',
    image: '/projects/restaurant.jpg',
    category: 'Web Development',
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'PHP', 'MySQL'],
    liveUrl: 'https://example-restaurant.com',
    githubUrl: '',
    featured: false
  },
  {
    id: '6',
    title: 'Cryptocurrency Dashboard',
    description: 'A real-time dashboard for monitoring cryptocurrency prices, portfolio performance, and market trends with interactive charts and alerts.',
    fullDescription: 'This cryptocurrency dashboard provides real-time monitoring and analysis tools for crypto investors. Key features include live price tracking for multiple cryptocurrencies, portfolio management with performance metrics, interactive charts with technical indicators, custom price alerts, news aggregation from crypto sources, and historical data analysis for informed decision-making.',
    image: '/projects/crypto.jpg',
    category: 'Web Development',
    technologies: ['React', 'Redux', 'Chart.js', 'Cryptocurrency API', 'WebSockets'],
    liveUrl: 'https://crypto-dashboard.example.com',
    githubUrl: 'https://github.com/example/crypto',
    featured: true
  }
];
