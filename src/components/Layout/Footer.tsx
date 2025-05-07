"use client";
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import { FaGithub, FaLinkedin, FaYoutube, FaInstagram, FaTwitter, FaHeart, FaArrowUp } from 'react-icons/fa';

const Footer: React.FC = () => {
  const footerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(footerRef, { once: true, amount: 0.1 });
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const footerLinks = [
    { name: "Home", href: "/" },
    { name: "Projects", href: "/projects" },
    { name: "Blog", href: "/blog" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" }
  ];

  const socialLinks = [
    { name: "GitHub", icon: <FaGithub size={20} />, href: "https://github.com/thecampuscoder" },
    { name: "LinkedIn", icon: <FaLinkedin size={20} />, href: "https://linkedin.com/in/thecampuscoder" },
    { name: "YouTube", icon: <FaYoutube size={20} />, href: "https://youtube.com/thecampuscoder" },
    { name: "Instagram", icon: <FaInstagram size={20} />, href: "https://instagram.com/thecampuscoder" },
    { name: "Twitter", icon: <FaTwitter size={20} />, href: "https://twitter.com/thecampuscoder" }
  ];

  return (
    <footer ref={footerRef} className="relative pt-20 pb-10 overflow-hidden">
      {/* Cyberpunk grid background */}
      <div className="absolute inset-0 z-0 grid-bg"></div>
      
      {/* Tech decorative elements */}
      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-indigo-500 to-transparent"></div>
      
      {/* Background accents */}
      <div className="absolute -right-64 top-1/3 w-96 h-96 bg-indigo-700/10 rounded-full blur-3xl"></div>
      <div className="absolute -left-64 top-1/2 w-96 h-96 bg-purple-700/10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-16"
        >
          {/* Logo and description */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="text-2xl text-indigo-400">
                <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">
                  DK
                </span>
              </div>
              <div className="w-10 h-0.5 bg-gradient-to-r from-purple-500 to-indigo-500"></div>
              <span className="text-gray-400 font-mono text-xs">TECH</span>
            </div>
            
            <p className="text-gray-400 mb-6">
              Creating digital experiences that blend creativity with cutting-edge technology. Building tomorrow's web, today.
            </p>
            
            {/* Social links */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ y: -5, scale: 1.1 }}
                  className="social-icon-container"
                >
                  <div className="w-9 h-9 rounded-md bg-gray-800/80 border border-gray-700/50 flex items-center justify-center text-gray-400 hover:text-indigo-400 transition-colors duration-300 relative overflow-hidden group">
                    {social.icon}
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
          
          {/* Quick links */}
          <div>
            <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 mb-4">
              Quick Links
            </h3>
            <div className="h-0.5 w-16 bg-gradient-to-r from-indigo-500 to-purple-500 mb-6"></div>
            
            <ul className="space-y-3">
              {footerLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-indigo-400 transition-colors duration-300 flex items-center group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500/50 mr-2 transform scale-0 group-hover:scale-100 transition-transform duration-300"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact info */}
          <div>
            <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 mb-4">
              Contact
            </h3>
            <div className="h-0.5 w-16 bg-gradient-to-r from-indigo-500 to-purple-500 mb-6"></div>
            
            <div className="space-y-3">
              <p className="text-gray-400">
                <span className="text-indigo-400">Email:</span> support@thecampuscoder.com
              </p>
              <p className="text-gray-400">
                <span className="text-indigo-400">Location:</span> Delhi, India
              </p>
              <div className="pt-4">
                <Link
                  href="#contact"
                  className="inline-flex items-center space-x-2 text-gray-300 bg-gradient-to-r from-indigo-600/30 to-purple-600/30 hover:from-indigo-600/40 hover:to-purple-600/40 px-4 py-2 rounded-md border border-indigo-500/30 transition-colors duration-300"
                >
                  <span>Get in Touch</span>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Bottom bar */}
        <div className="border-t border-gray-800/70 pt-8 flex flex-col md:flex-row justify-between items-center">
          <motion.p 
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-500 text-sm mb-4 md:mb-0"
          >
            © {new Date().getFullYear()} Deepak Kumar. All rights reserved. 
            <span className="inline-flex items-center ml-2">
              Made with <FaHeart className="text-red-500 mx-1" size={12} /> by TheCampusCoders
            </span>
          </motion.p>
          
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            onClick={scrollToTop}
            className="back-to-top group flex items-center space-x-2 text-gray-400 hover:text-indigo-400 transition-colors duration-300"
          >
            <span>Back to top</span>
            <span className="bg-gray-800 border border-gray-700 rounded-full w-8 h-8 flex items-center justify-center group-hover:bg-gray-700 transition-colors duration-300">
              <FaArrowUp size={12} className="group-hover:animate-bounce" />
            </span>
          </motion.button>
        </div>
      </div>
      
      {/* CSS for footer elements */}
      <style jsx>{`
        .grid-bg {
          background-image: 
            linear-gradient(rgba(99, 102, 241, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99, 102, 241, 0.05) 1px, transparent 1px);
          background-size: 40px 40px;
          background-position: center center;
        }
      `}</style>
    </footer>
  );
};

export default Footer;
