"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { FaLaptopCode, FaBars, FaTimes } from 'react-icons/fa';

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Projects", href: "/projects" },
  { name: "Photos", href: "/photos" },
  { name: "Blog", href: "/blog" },
  { name: "Github", href: "/github" },
];

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      // Change header style on scroll
      setScrolled(window.scrollY > 50);
      
      // Track active section
      const sections = navLinks
        .map(link => link.href.startsWith('#') ? link.href.substring(1) : null)
        .filter(Boolean)
        .map(id => document.getElementById(id || ""));
      
      if (sections.length) {
        const currentSection = sections.reduce((closest, section) => {
          if (!section) return closest;
          const sectionTop = section.offsetTop;
          const scrollPosition = window.scrollY + 100;
          
          if (scrollPosition >= sectionTop && 
              (!closest || sectionTop > closest.offsetTop)) {
            return section;
          }
          return closest;
        }, null as HTMLElement | null);
        
        if (currentSection && currentSection.id) {
          setActiveSection(currentSection.id);
        } else if (window.scrollY < 100) {
          setActiveSection("");
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-gray-900/90 backdrop-blur-lg py-3 shadow-lg shadow-indigo-900/10' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center space-x-2 group"
          >
            <div className="relative">
              <FaLaptopCode className="text-2xl md:text-3xl text-indigo-400 group-hover:text-indigo-300 transition-colors duration-300" />
              <div className="absolute -inset-1 bg-indigo-500/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-lg md:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400 group-hover:from-purple-300 group-hover:to-indigo-300 transition-all duration-300"
            >
              Deepak Kumar
            </motion.span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-1">
            {navLinks.map((link, index) => {
              const isActive = 
                (link.href === "#" && activeSection === "") || 
                (link.href.startsWith('#') && link.href.substring(1) === activeSection);
              
              return (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative"
                >
                  <Link
                    href={link.href}
                    className={`cyber-nav-item px-4 py-2 rounded-md relative overflow-hidden flex items-center justify-center ${
                      isActive ? 'text-white' : 'text-gray-400 hover:text-gray-300'
                    }`}
                    onClick={() => {
                      if (link.href.startsWith('#')) {
                        const element = document.querySelector(link.href);
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth' });
                        }
                      }
                    }}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="nav-indicator"
                        className="absolute inset-0 bg-gradient-to-r from-indigo-600/30 to-purple-600/30 rounded-md -z-10"
                        transition={{ type: "spring", duration: 0.6 }}
                      />
                    )}
                    
                    <span className="relative">
                      {link.name}
                      {isActive && (
                        <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500"></span>
                      )}
                    </span>
                  </Link>
                </motion.div>
              );
            })}
          </nav>
          
          {/* Contact button - only show on desktop and when scrolled */}
          <AnimatePresence>
            {scrolled && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="hidden md:block"
              >
                <a 
                  href="#contact" 
                  className="cyber-button-primary group relative px-5 py-2 overflow-hidden text-sm"
                >
                  <span className="relative z-10 text-white">Contact Me</span>
                  <span className="cyber-button-glitch"></span>
                </a>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-400 hover:text-indigo-400 transition-colors duration-300 relative"
            >
              <div className="absolute -inset-2 bg-indigo-500/10 rounded-full blur-md opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <FaTimes className="h-6 w-6" aria-hidden="true" />
              ) : (
                <FaBars className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden"
          >
            <div className="px-4 pt-2 pb-4 bg-gray-900/95 backdrop-blur-lg border-t border-gray-800 space-y-1">
              {navLinks.map((link, index) => {
                const isActive = 
                  (link.href === "#" && activeSection === "") || 
                  (link.href.startsWith('#') && link.href.substring(1) === activeSection);
                
                return (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      className={`block px-4 py-2 rounded-md relative ${
                        isActive 
                          ? 'bg-indigo-900/30 text-indigo-300' 
                          : 'text-gray-400 hover:bg-gray-800/50 hover:text-gray-300'
                      }`}
                      onClick={() => {
                        setMobileMenuOpen(false);
                        if (link.href.startsWith('#')) {
                          const element = document.querySelector(link.href);
                          if (element) {
                            element.scrollIntoView({ behavior: 'smooth' });
                          }
                        }
                      }}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                );
              })}
              
              {/* Contact button in mobile menu */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.05 }}
                className="pt-2 mt-2 border-t border-gray-800"
              >
                <a 
                  href="#contact" 
                  className="block w-full text-center px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-md"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contact Me
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* CSS for custom elements */}
      <style jsx>{`
        .cyber-nav-item:hover::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 2px;
          height: 0;
          background: linear-gradient(to bottom, transparent, #6366f1, transparent);
          animation: cyberpunk-line-in 0.3s forwards;
        }
        
        .cyber-nav-item:hover::after {
          content: '';
          position: absolute;
          bottom: 0;
          right: 0;
          width: 2px;
          height: 0;
          background: linear-gradient(to top, transparent, #a855f7, transparent);
          animation: cyberpunk-line-in 0.3s forwards;
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
        
        @keyframes cyberpunk-line-in {
          from { height: 0; }
          to { height: 100%; }
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
    </header>
  );
};

export default Header;
