"use client";
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { FaCamera, FaTimes, FaChevronLeft, FaChevronRight, FaImage, FaFilter, FaSearch } from 'react-icons/fa';
import ParticlesBackground from '@/components/Shared/ParticlesBackground';

interface PhotoType {
  id: string;
  title: string;
  description: string;
  category: string;
  collection?: string;
  tags: string[];
  src: string;
  width: number;
  height: number;
  date: string;
}

export default function PhotosPage() {
  const [photos, setPhotos] = useState<PhotoType[]>(samplePhotos);
  const [filteredPhotos, setFilteredPhotos] = useState<PhotoType[]>(samplePhotos);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [activeCollection, setActiveCollection] = useState<string>('All');
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoType | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  
  // Extract unique categories, collections, and tags
  const categories = ['All', ...Array.from(new Set(photos.map(photo => photo.category)))];
  const collections = ['All', ...Array.from(new Set(photos.map(photo => photo.collection).filter(Boolean) as string[]))];
  const allTags = Array.from(new Set(photos.flatMap(photo => photo.tags)));
  
  // Filter photos based on selected filters
  useEffect(() => {
    let results = [...photos];
    
    // Apply category filter
    if (activeCategory !== 'All') {
      results = results.filter(photo => photo.category === activeCategory);
    }
    
    // Apply collection filter
    if (activeCollection !== 'All') {
      results = results.filter(photo => photo.collection === activeCollection);
    }
    
    // Apply tag filters
    if (activeTags.length > 0) {
      results = results.filter(photo => 
        activeTags.every(tag => photo.tags.includes(tag))
      );
    }
    
    // Apply search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(photo => 
        photo.title.toLowerCase().includes(query) || 
        photo.description.toLowerCase().includes(query) ||
        photo.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    setFilteredPhotos(results);
  }, [activeCategory, activeCollection, activeTags, searchQuery, photos]);

  // Handle photo click to open modal
  const handlePhotoClick = (photo: PhotoType) => {
    setSelectedPhoto(photo);
    setModalOpen(true);
  };
  
  // Handle tag toggle
  const toggleTag = (tag: string) => {
    setActiveTags(prev => 
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };
  
  // Handle modal navigation
  const navigatePhoto = (direction: 'prev' | 'next') => {
    if (!selectedPhoto) return;
    
    const currentIndex = filteredPhotos.findIndex(p => p.id === selectedPhoto.id);
    if (currentIndex === -1) return;
    
    let newIndex;
    if (direction === 'prev') {
      newIndex = currentIndex === 0 ? filteredPhotos.length - 1 : currentIndex - 1;
    } else {
      newIndex = currentIndex === filteredPhotos.length - 1 ? 0 : currentIndex + 1;
    }
    
    setSelectedPhoto(filteredPhotos[newIndex]);
  };

  return (
    <main className="relative min-h-screen bg-gray-900 overflow-hidden">
      {/* Particles Background */}
      <ParticlesBackground 
        id="photos-page-particles" 
        particleColor="#6366f1" 
        linkColor="#a855f7" 
        quantity={60}
      />
      
      {/* Cyberpunk grid effect */}
      <div className="absolute inset-0 z-0 grid-bg"></div>
      
      {/* Background accents */}
      <div className="absolute -left-64 top-1/3 w-96 h-96 bg-purple-700/20 rounded-full blur-3xl"></div>
      <div className="absolute -right-64 bottom-1/3 w-96 h-96 bg-indigo-700/20 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 py-32 relative z-10">
        {/* Page Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block"
          >
            <div className="flex justify-center items-center mb-4">
              <FaCamera className="text-3xl md:text-4xl text-indigo-400 mr-3" />
              <h1 className="glitch-text-header text-3xl md:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-400 to-blue-400"
                  data-text="Photography">
                Photography
              </h1>
            </div>
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent"
            ></motion.div>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-6 text-gray-300 max-w-2xl mx-auto"
          >
            Explore my photography portfolio capturing moments and scenes through my lens.
            Browse different categories and collections to see the world from my perspective.
          </motion.p>
        </div>
        
        {/* Filters and Search Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mb-10"
        >
          <div className="backdrop-blur-md bg-gray-900/40 border border-gray-800 rounded-xl p-6 relative overflow-hidden">
            {/* Circuit pattern */}
            <div className="absolute inset-0 circuit-pattern opacity-5"></div>
            
            {/* Top accent line */}
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-indigo-500 to-transparent"></div>
            
            <div className="relative z-10">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                {/* Left side - Filters */}
                <div className="w-full md:w-3/4 space-y-4">
                  {/* Category filter */}
                  <div>
                    <h3 className="text-lg text-indigo-300 flex items-center mb-3">
                      <FaFilter className="mr-2" /> Categories
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {categories.map(category => (
                        <button
                          key={category}
                          onClick={() => setActiveCategory(category)}
                          className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
                            activeCategory === category
                              ? 'bg-indigo-600 text-white'
                              : 'bg-gray-800/50 text-gray-400 hover:bg-gray-700/50 hover:text-gray-300'
                          }`}
                        >
                          {category}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Collections filter */}
                  {collections.length > 1 && (
                    <div>
                      <h3 className="text-lg text-indigo-300 flex items-center mb-3">
                        <FaImage className="mr-2" /> Collections
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {collections.map(collection => (
                          <button
                            key={collection}
                            onClick={() => setActiveCollection(collection)}
                            className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
                              activeCollection === collection
                                ? 'bg-purple-600 text-white'
                                : 'bg-gray-800/50 text-gray-400 hover:bg-gray-700/50 hover:text-gray-300'
                            }`}
                          >
                            {collection}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Tags filter */}
                  <div>
                    <h3 className="text-lg text-indigo-300 flex items-center mb-3">
                      Tags
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {allTags.map(tag => (
                        <button
                          key={tag}
                          onClick={() => toggleTag(tag)}
                          className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
                            activeTags.includes(tag)
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-800/50 text-gray-400 hover:bg-gray-700/50 hover:text-gray-300'
                          }`}
                        >
                          #{tag}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Right side - Search */}
                <div className="w-full md:w-1/4">
                  <h3 className="text-lg text-indigo-300 flex items-center mb-3">
                    <FaSearch className="mr-2" /> Search
                  </h3>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search photos..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-gray-800/70 border border-gray-700 text-gray-300 rounded-md py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaSearch className="text-gray-500" />
                    </div>
                  </div>
                  
                  {/* Clear filters button */}
                  {(activeCategory !== 'All' || activeCollection !== 'All' || activeTags.length > 0 || searchQuery) && (
                    <button
                      onClick={() => {
                        setActiveCategory('All');
                        setActiveCollection('All');
                        setActiveTags([]);
                        setSearchQuery('');
                      }}
                      className="mt-4 text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
                    >
                      Clear all filters
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Photos Grid - Masonry layout */}
        <div className="relative">
          {filteredPhotos.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-auto">
              <AnimatePresence>
                {filteredPhotos.map((photo, index) => (
                  <motion.div
                    key={photo.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    layoutId={`photo-${photo.id}`}
                    whileHover={{ 
                      scale: 1.03, 
                      y: -5
                    }}
                    className="relative group cursor-pointer overflow-hidden rounded-lg"
                    onClick={() => handlePhotoClick(photo)}
                    style={{
                      gridRowEnd: `span ${Math.ceil(photo.height / photo.width * 10)}`
                    }}
                  >
                    <div className="relative aspect-auto overflow-hidden">
                      <Image 
                        src={photo.src} 
                        alt={photo.title}
                        width={photo.width}
                        height={photo.height}
                        className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                      />
                      
                      {/* Photo overlay on hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                        <h3 className="text-white font-bold text-lg mb-1">{photo.title}</h3>
                        <div className="flex flex-wrap gap-1">
                          {photo.tags.slice(0, 3).map((tag, i) => (
                            <span 
                              key={i} 
                              className="text-xs bg-indigo-900/80 text-indigo-300 px-1.5 py-0.5 rounded-sm backdrop-blur-sm"
                            >
                              #{tag}
                            </span>
                          ))}
                          {photo.tags.length > 3 && (
                            <span className="text-xs bg-indigo-900/80 text-indigo-300 px-1.5 py-0.5 rounded-sm backdrop-blur-sm">
                              +{photo.tags.length - 3}
                            </span>
                          )}
                        </div>
                      </div>
                      
                      {/* Scanline effect */}
                      <div className="absolute inset-0 scanline opacity-0 group-hover:opacity-20 pointer-events-none"></div>
                      
                      {/* Tech corner accents */}
                      <div className="absolute top-0 left-0 w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute top-0 left-0 w-full h-0.5 bg-indigo-500"></div>
                        <div className="absolute top-0 left-0 w-0.5 h-full bg-indigo-500"></div>
                      </div>
                      <div className="absolute top-0 right-0 w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute top-0 right-0 w-full h-0.5 bg-purple-500"></div>
                        <div className="absolute top-0 right-0 w-0.5 h-full bg-purple-500"></div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          ) : (
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
                No photos match your current filters. Try adjusting your search criteria or explore different categories.
              </p>
            </motion.div>
          )}
        </div>
      </div>
      
      {/* Photo Modal */}
      <AnimatePresence>
        {modalOpen && selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
            onClick={() => setModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative max-w-7xl max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Navigation buttons */}
              <button 
                onClick={(e) => { e.stopPropagation(); navigatePhoto('prev'); }}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-black/50 border border-gray-700 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
              >
                <FaChevronLeft />
              </button>
              
              <button 
                onClick={(e) => { e.stopPropagation(); navigatePhoto('next'); }}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-black/50 border border-gray-700 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
              >
                <FaChevronRight />
              </button>
              
              {/* Close button */}
              <button 
                onClick={() => setModalOpen(false)} 
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/50 border border-gray-700 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
              >
                <FaTimes />
              </button>
              
              {/* Photo Container */}
              <div className="relative flex flex-col bg-gray-900/80 rounded-lg border border-gray-800 overflow-hidden">
                <div className="relative">
                  <Image 
                    src={selectedPhoto.src} 
                    alt={selectedPhoto.title}
                    width={selectedPhoto.width}
                    height={selectedPhoto.height}
                    className="max-h-[70vh] w-auto object-contain"
                  />
                </div>
                
                {/* Photo details */}
                <div className="p-6 bg-gray-900/90">
                  <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-indigo-300 mb-2">
                    {selectedPhoto.title}
                  </h3>
                  <p className="text-gray-300 mb-4">{selectedPhoto.description}</p>
                  
                  <div className="flex flex-wrap justify-between items-start gap-4">
                    <div>
                      <div className="text-sm text-gray-400 mb-1">
                        <span className="text-indigo-400">Category:</span> {selectedPhoto.category}
                      </div>
                      {selectedPhoto.collection && (
                        <div className="text-sm text-gray-400 mb-1">
                          <span className="text-indigo-400">Collection:</span> {selectedPhoto.collection}
                        </div>
                      )}
                      <div className="text-sm text-gray-400">
                        <span className="text-indigo-400">Date:</span> {selectedPhoto.date}
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-1">
                      {selectedPhoto.tags.map((tag, i) => (
                        <span 
                          key={i} 
                          className="text-xs bg-indigo-900/80 text-indigo-300 px-2 py-1 rounded-md backdrop-blur-sm border border-indigo-700/50"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
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
    </main>
  );
}

// Sample photo data - replace with your actual photos
const samplePhotos: PhotoType[] = [
  {
    id: '1',
    title: 'Mountain Sunset',
    description: 'A serene sunset over mountains with vibrant orange and purple hues.',
    category: 'Nature',
    collection: 'Landscapes',
    tags: ['sunset', 'mountains', 'colorful'],
    src: '/photos/photo1.jpg',
    width: 1200,
    height: 800,
    date: 'January 15, 2023'
  },
  {
    id: '2',
    title: 'Modern Workspace',
    description: 'Minimalist tech workspace with customized RGB lighting and dual monitors.',
    category: 'Tech',
    collection: 'Workspaces',
    tags: ['setup', 'computers', 'minimal'],
    src: '/photos/photo2.jpg',
    width: 1200,
    height: 900,
    date: 'February 10, 2023'
  },
  {
    id: '3',
    title: 'Urban Nightscape',
    description: 'City skyline at night with neon lights reflecting on wet streets.',
    category: 'Urban',
    collection: 'Cityscapes',
    tags: ['city', 'night', 'neon', 'reflection'],
    src: '/photos/photo3.jpg',
    width: 1200,
    height: 800,
    date: 'March 5, 2023'
  },
  {
    id: '4',
    title: 'Macro Nature',
    description: 'Close-up photography of dewdrops on a vibrant green leaf after rainfall.',
    category: 'Nature',
    collection: 'Macro',
    tags: ['closeup', 'dew', 'green', 'detail'],
    src: '/photos/photo4.jpg',
    width: 1000,
    height: 1500,
    date: 'April 22, 2023'
  },
  {
    id: '5',
    title: 'Gaming Setup',
    description: 'High-end gaming setup with custom water cooling and ambient lighting.',
    category: 'Tech',
    collection: 'Workspaces',
    tags: ['gaming', 'rgb', 'setup', 'pc'],
    src: '/photos/photo5.jpg',
    width: 1200,
    height: 800,
    date: 'May 14, 2023'
  },
  {
    id: '6',
    title: 'Street Art',
    description: 'Colorful street art mural depicting futuristic cyberpunk themes.',
    category: 'Urban',
    collection: 'Street Art',
    tags: ['mural', 'colorful', 'cyberpunk', 'creativity'],
    src: '/photos/photo6.jpg',
    width: 1000,
    height: 1300,
    date: 'June 30, 2023'
  },
  {
    id: '7',
    title: 'Mechanical Keyboard',
    description: 'Custom mechanical keyboard with artisan keycaps and braided cable.',
    category: 'Tech',
    tags: ['keyboard', 'custom', 'mechanical', 'peripheral'],
    src: '/photos/photo7.jpg',
    width: 1200,
    height: 800,
    date: 'July 12, 2023'
  },
  {
    id: '8',
    title: 'Misty Forest',
    description: 'Early morning fog drifting through ancient trees in a dense forest.',
    category: 'Nature',
    collection: 'Landscapes',
    tags: ['fog', 'trees', 'morning', 'mystical'],
    src: '/photos/photo8.jpg',
    width: 1200,
    height: 1600,
    date: 'August 3, 2023'
  },
  {
    id: '9',
    title: 'City Architecture',
    description: 'Modern architectural structures with geometric patterns and glass facades.',
    category: 'Urban',
    collection: 'Cityscapes',
    tags: ['architecture', 'modern', 'geometric', 'building'],
    src: '/photos/photo9.jpg',
    width: 1200,
    height: 900,
    date: 'September 25, 2023'
  },
  {
    id: '10',
    title: 'Ocean Waves',
    description: 'Powerful ocean waves crashing against rocky shore during sunset.',
    category: 'Nature',
    collection: 'Landscapes',
    tags: ['ocean', 'waves', 'sunset', 'power'],
    src: '/photos/photo10.jpg',
    width: 1600,
    height: 900,
    date: 'October 8, 2023'
  },
  {
    id: '11',
    title: 'Smart Home Hub',
    description: 'Modern smart home control center with integrated voice assistant.',
    category: 'Tech',
    tags: ['smarthome', 'iot', 'modern', 'gadget'],
    src: '/photos/photo11.jpg',
    width: 1000,
    height: 1200,
    date: 'November 12, 2023'
  },
  {
    id: '12',
    title: 'Subway Station',
    description: 'Futuristic subway station with LED lighting and minimal design.',
    category: 'Urban',
    collection: 'Cityscapes',
    tags: ['subway', 'futuristic', 'transportation', 'minimal'],
    src: '/photos/photo12.jpg',
    width: 1600,
    height: 1000,
    date: 'December 5, 2023'
  }
];
