"use client";
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import Image from 'next/image';
import { FaTimes, FaCamera, FaImage } from 'react-icons/fa';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';
import { Engine } from '@tsparticles/engine';

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

// Photo modal for viewing enlarged photos
const PhotoModal: React.FC<{
  photo: PhotoType | null;
  onClose: () => void;
  isOpen: boolean;
}> = ({ photo, onClose, isOpen }) => {
  if (!photo) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative max-w-5xl max-h-[90vh] overflow-hidden rounded-lg"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button 
              onClick={onClose} 
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/50 border border-gray-700 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
            >
              <FaTimes />
            </button>
            
            {/* Photo */}
            <div className="relative max-w-full max-h-[80vh]">
              <Image 
                src={photo.src} 
                alt={photo.title}
                width={1200}
                height={800}
                objectFit="contain"
                className="rounded-lg"
              />
              
              {/* Photo details overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <h3 className="text-xl font-bold text-white mb-2">{photo.title}</h3>
                <p className="text-gray-300 text-sm">{photo.description}</p>
                <div className="mt-2 flex items-center">
                  <span className="text-xs bg-indigo-900/80 text-indigo-300 px-3 py-1 rounded-md backdrop-blur-sm border border-indigo-700/50 font-mono">
                    {photo.category}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Photo card component
const PhotoCard: React.FC<{
  photo: PhotoType;
  index: number;
  onClick: () => void;
}> = ({ photo, index, onClick }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.2 });
  
  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      whileHover={{ 
        scale: 1.03, 
        y: -5
      }}
      className="relative group cursor-pointer overflow-hidden rounded-lg"
      onClick={onClick}
    >
      <div className="aspect-[4/3] md:aspect-auto md:h-64 lg:h-72 relative overflow-hidden">
        <Image 
          src={photo.src} 
          alt={photo.title}
          layout="fill" 
          objectFit="cover"
          className="transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Photo overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
          <h3 className="text-white font-bold text-lg mb-1">{photo.title}</h3>
          <div className="flex items-center">
            <span className="text-xs bg-indigo-900/80 text-indigo-300 px-2 py-0.5 rounded-md backdrop-blur-sm border border-indigo-700/50 font-mono">
              {photo.category}
            </span>
          </div>
        </div>
        
        {/* Scanline effect */}
        <div className="absolute inset-0 scanline opacity-20 pointer-events-none"></div>
        
        {/* Tech corner accents */}
        <div className="absolute top-0 left-0 w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute top-0 left-0 w-full h-0.5 bg-indigo-500"></div>
          <div className="absolute top-0 left-0 w-0.5 h-full bg-indigo-500"></div>
        </div>
        <div className="absolute top-0 right-0 w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute top-0 right-0 w-full h-0.5 bg-purple-500"></div>
          <div className="absolute top-0 right-0 w-0.5 h-full bg-purple-500"></div>
        </div>
        <div className="absolute bottom-0 left-0 w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500"></div>
          <div className="absolute bottom-0 left-0 w-0.5 h-full bg-blue-500"></div>
        </div>
        <div className="absolute bottom-0 right-0 w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-0 right-0 w-full h-0.5 bg-purple-500"></div>
          <div className="absolute bottom-0 right-0 w-0.5 h-full bg-purple-500"></div>
        </div>
      </div>
    </motion.div>
  );
};

// Category filter button
const CategoryButton: React.FC<{
  category: string;
  isActive: boolean;
  onClick: () => void;
}> = ({ category, isActive, onClick }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`relative px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 overflow-hidden ${
        isActive 
          ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20' 
          : 'bg-gray-800/50 text-gray-400 hover:text-gray-300 backdrop-blur-sm border border-gray-700/50'
      }`}
    >
      <span className="relative z-10">{category}</span>
      
      {/* Active category glow */}
      {isActive && (
        <motion.div 
          layoutId="activeCategoryIndicator"
          className="absolute inset-0 bg-indigo-600"
          transition={{ type: "spring", duration: 0.6 }}
        />
      )}
      
      {/* Hover effect */}
      <div className="absolute inset-0 bg-indigo-500/30 opacity-0 hover:opacity-100 transition-opacity duration-300 -z-10"></div>
      
      {/* Tech corner highlights for active */}
      {isActive && (
        <>
          <div className="absolute top-0 left-0 w-2 h-2">
            <div className="absolute top-0 left-0 w-2 h-0.5 bg-indigo-400"></div>
            <div className="absolute top-0 left-0 w-0.5 h-2 bg-indigo-400"></div>
          </div>
          <div className="absolute top-0 right-0 w-2 h-2">
            <div className="absolute top-0 right-0 w-2 h-0.5 bg-indigo-400"></div>
            <div className="absolute top-0 right-0 w-0.5 h-2 bg-indigo-400"></div>
          </div>
        </>
      )}
    </motion.button>
  );
};

// Define photo type
interface PhotoType {
  id: string;
  title: string;
  description: string;
  category: string;
  src: string;
}

// Main Photos component
const Photos: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoType | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  
  const particlesInit = async (engine: Engine) => {
    await loadFull(engine);
  };
  
  // Sample photos data
  const photos: PhotoType[] = [
    {
      id: '1',
      title: 'Mountain Sunset',
      description: 'A serene sunset over mountains with vibrant orange and purple hues.',
      category: 'Nature',
      src: '/photos/photo1.jpg'
    },
    {
      id: '2',
      title: 'Modern Workspace',
      description: 'Minimalist tech workspace with customized RGB lighting and dual monitors.',
      category: 'Tech',
      src: '/photos/photo2.jpg'
    },
    {
      id: '3',
      title: 'Urban Nightscape',
      description: 'City skyline at night with neon lights reflecting on wet streets.',
      category: 'Urban',
      src: '/photos/photo3.jpg'
    },
    {
      id: '4',
      title: 'Macro Nature',
      description: 'Close-up photography of dewdrops on a vibrant green leaf after rainfall.',
      category: 'Nature',
      src: '/photos/photo4.jpg'
    },
    {
      id: '5',
      title: 'Gaming Setup',
      description: 'High-end gaming setup with custom water cooling and ambient lighting.',
      category: 'Tech',
      src: '/photos/photo5.jpg'
    },
    {
      id: '6',
      title: 'Street Art',
      description: 'Colorful street art mural depicting futuristic cyberpunk themes.',
      category: 'Urban',
      src: '/photos/photo6.jpg'
    },
    {
      id: '7',
      title: 'Mechanical Keyboard',
      description: 'Custom mechanical keyboard with artisan keycaps and braided cable.',
      category: 'Tech',
      src: '/photos/photo7.jpg'
    },
    {
      id: '8',
      title: 'Misty Forest',
      description: 'Early morning fog drifting through ancient trees in a dense forest.',
      category: 'Nature',
      src: '/photos/photo8.jpg'
    },
    {
      id: '9',
      title: 'City Architecture',
      description: 'Modern architectural structures with geometric patterns and glass facades.',
      category: 'Urban',
      src: '/photos/photo9.jpg'
    }
  ];
  
  // Get unique categories from photos
  const categories = ['All', ...Array.from(new Set(photos.map(photo => photo.category)))];
  
  // Filter photos by category
  const filteredPhotos = activeCategory === 'All' 
    ? photos 
    : photos.filter(photo => photo.category === activeCategory);
  
  // Handle photo card click
  const handlePhotoClick = (photo: PhotoType) => {
    setSelectedPhoto(photo);
    setModalOpen(true);
  };
  
  // Handle modal close
  const handleCloseModal = () => {
    setModalOpen(false);
    setTimeout(() => setSelectedPhoto(null), 300); // Wait for animation to complete
  };

  return (
    <section id="photos" className="py-24 relative overflow-hidden perspective-1000">
      {/* Particles background */}
      <Particles
        id="tsparticles-photos"
        init={particlesInit}
        options={{
          fullScreen: { enable: false },
          background: { color: { value: "#0a0a0a" } },
          fpsLimit: 120,
          particles: {
            color: { value: "#6366f1" },
            links: {
              color: "#a855f7",
              distance: 150,
              enable: true,
              opacity: 0.2,
              width: 1
            },
            move: {
              direction: "none",
              enable: true,
              outModes: { default: "bounce" },
              random: true,
              speed: 0.5,
              straight: false,
            },
            number: { density: { enable: true, area: 1200 }, value: 40 },
            opacity: { value: 0.2 },
            shape: { type: "circle" },
            size: { value: { min: 1, max: 2 } },
          },
          detectRetina: true
        }}
        className="absolute inset-0 z-0"
      />
      
      {/* Cyberpunk grid effect */}
      <div className="absolute inset-0 z-0 grid-bg"></div>
      
      {/* Background accents */}
      <div className="absolute -right-64 top-1/3 w-96 h-96 bg-purple-700/20 rounded-full blur-3xl"></div>
      <div className="absolute -left-64 bottom-1/3 w-96 h-96 bg-indigo-700/20 rounded-full blur-3xl"></div>
      
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
                data-text="Photography">
              Photography
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
            <TerminalDescription text="Capturing moments through my lens. Explore my photography portfolio highlighting various styles and subjects." />
          </motion.div>
        </div>
        
        {/* Category filters */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-3 mb-10"
        >
          {categories.map((category) => (
            <CategoryButton
              key={category}
              category={category}
              isActive={activeCategory === category}
              onClick={() => setActiveCategory(category)}
            />
          ))}
        </motion.div>
        
        {/* Photos grid - masonry layout */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {filteredPhotos.map((photo, index) => (
              <PhotoCard
                key={photo.id}
                photo={photo}
                index={index}
                onClick={() => handlePhotoClick(photo)}
              />
            ))}
          </AnimatePresence>
        </motion.div>
        
        {/* Empty state */}
        {filteredPhotos.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16 backdrop-blur-md bg-gray-900/40 rounded-xl p-8 border border-gray-800"
          >
            <div className="text-indigo-400 text-4xl mb-4">
              <FaImage />
            </div>
            <h3 className="text-2xl font-bold text-indigo-400 mb-3">No photos found</h3>
            <p className="text-gray-400 max-w-md mx-auto">
              No photos match the selected category. Try selecting a different category.
            </p>
          </motion.div>
        )}
        
        {/* View all photos button - only show if filtered */}
        {activeCategory !== 'All' && filteredPhotos.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-10 text-center"
          >
            <motion.button
              onClick={() => setActiveCategory('All')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 bg-gray-800/70 text-gray-300 hover:text-white rounded-md border border-gray-700/50 backdrop-blur-sm transition-colors duration-300 flex items-center mx-auto"
            >
              <FaCamera className="mr-2" />
              View All Photos
            </motion.button>
          </motion.div>
        )}
      </div>
      
      {/* Photo modal */}
      <PhotoModal 
        photo={selectedPhoto} 
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
        
        @keyframes scanlines {
          0% { transform: translateY(-200%); }
          100% { transform: translateY(0%); }
        }
        
        @keyframes glitch-anim {
          0% { clip: rect(30px, 9999px, 10px, 0); }
          5% { clip: rect(54px, 9999px, 98px, 0); }
          10% { clip: rect(49px, 9999px, 35px, 0); }
          15% { clip: rect(20px, 9999px, 67px, 0); }
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
    </section>
  );
};

export default Photos;
