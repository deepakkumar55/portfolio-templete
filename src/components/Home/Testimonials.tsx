"use client";
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { FaQuoteLeft, FaStar, FaStarHalf, FaChevronLeft, FaChevronRight, FaUser } from 'react-icons/fa';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';
import type { Engine } from 'tsparticles-engine';
import Image from 'next/image';

// Star rating component
const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  // Create full stars
  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <motion.span 
        key={`star-${i}`}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: 0.1 * i }}
        className="text-yellow-400"
      >
        <FaStar />
      </motion.span>
    );
  }

  // Add half star if needed
  if (hasHalfStar) {
    stars.push(
      <motion.span 
        key="half-star"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: 0.1 * fullStars }}
        className="text-yellow-400"
      >
        <FaStarHalf />
      </motion.span>
    );
  }

  // Fill remaining with empty stars
  const emptyStars = 5 - Math.ceil(rating);
  for (let i = 0; i < emptyStars; i++) {
    stars.push(
      <motion.span 
        key={`empty-star-${i}`}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: 0.1 * (fullStars + (hasHalfStar ? 1 : 0) + i) }}
        className="text-gray-600"
      >
        <FaStar />
      </motion.span>
    );
  }

  return <div className="flex space-x-1">{stars}</div>;
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

// Navigation button component
const NavButton: React.FC<{ 
  direction: 'prev' | 'next'; 
  onClick: () => void; 
  disabled?: boolean;
}> = ({ direction, onClick, disabled = false }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      disabled={disabled}
      className={`cyber-nav-button ${direction} ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} w-12 h-12 rounded-lg border border-indigo-500/50 flex items-center justify-center bg-gray-900/50 backdrop-blur-sm relative overflow-hidden`}
    >
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-indigo-500 to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
      <div className="absolute inset-0 opacity-0 hover:opacity-100 bg-indigo-500/10 transition-opacity duration-300"></div>
      <span className="relative z-10 text-indigo-400">
        {direction === 'prev' ? <FaChevronLeft /> : <FaChevronRight />}
      </span>
    </motion.button>
  );
};

// Testimonial card component
const TestimonialCard: React.FC<{
  name: string;
  role: string;
  company: string;
  testimonial: string;
  rating: number;
  image?: string;
  isActive: boolean;
}> = ({ name, role, company, testimonial, rating, image, isActive }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className={`testimonial-card w-full max-w-3xl mx-auto backdrop-blur-md bg-gradient-to-br from-gray-900/60 via-gray-800/60 to-gray-900/60 
                p-8 rounded-xl border border-gray-700/50 relative overflow-hidden ${isActive ? 'block' : 'hidden'}`}
    >
      {/* Tech circuit pattern */}
      <div className="absolute inset-0 circuit-pattern opacity-5"></div>
      
      {/* Corner decorations */}
      <div className="absolute top-0 left-0 w-4 h-4">
        <div className="absolute top-0 left-0 w-3 h-0.5 bg-indigo-500"></div>
        <div className="absolute top-0 left-0 w-0.5 h-3 bg-indigo-500"></div>
      </div>
      <div className="absolute top-0 right-0 w-4 h-4">
        <div className="absolute top-0 right-0 w-3 h-0.5 bg-purple-500"></div>
        <div className="absolute top-0 right-0 w-0.5 h-3 bg-purple-500"></div>
      </div>
      <div className="absolute bottom-0 left-0 w-4 h-4">
        <div className="absolute bottom-0 left-0 w-3 h-0.5 bg-blue-500"></div>
        <div className="absolute bottom-0 left-0 w-0.5 h-3 bg-blue-500"></div>
      </div>
      <div className="absolute bottom-0 right-0 w-4 h-4">
        <div className="absolute bottom-0 right-0 w-3 h-0.5 bg-purple-500"></div>
        <div className="absolute bottom-0 right-0 w-0.5 h-3 bg-purple-500"></div>
      </div>
      
      {/* Quote icon with glow */}
      <div className="mb-6 relative">
        <FaQuoteLeft className="text-4xl text-indigo-400 opacity-70" />
        <div className="absolute -inset-2 bg-indigo-500/20 rounded-full blur-xl opacity-30"></div>
      </div>
      
      {/* Testimonial text */}
      <p className="text-gray-300 text-lg italic mb-8 relative z-10">"{testimonial}"</p>
      
      <div className="flex items-center justify-between flex-wrap gap-4">
        {/* Client info */}
        <div className="flex items-center">
          <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-indigo-500/30 mr-4 relative bg-gray-800 flex items-center justify-center">
            {image ? (
              <Image 
                src={image} 
                alt={name} 
                width={56} 
                height={56} 
                className="object-cover"
              />
            ) : (
              <FaUser className="text-indigo-400 text-xl" />
            )}
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 to-transparent"></div>
          </div>
          <div>
            <h4 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-300">
              {name}
            </h4>
            <p className="text-sm text-gray-400">
              {role}, <span className="text-indigo-400">{company}</span>
            </p>
          </div>
        </div>
        
        {/* Rating */}
        <StarRating rating={rating} />
      </div>
      
      {/* Tech ID tag */}
      <div className="absolute bottom-2 right-2">
        <div className="text-xs text-indigo-500/70 font-mono">CLIENT://DATA</div>
      </div>
    </motion.div>
  );
};

// Main Testimonials component
const Testimonials: React.FC = () => {
  const testimonials = [
    {
      name: "Alex Johnson",
      role: "CTO",
      company: "TechDrive Inc",
      testimonial: "Deepak's work on our company website exceeded all expectations. His attention to detail and technical expertise transformed our online presence. The website is not only visually stunning but also performs exceptionally well.",
      rating: 5,
      image: "/testimonials/alex.jpg" // You'll need to add these images to your public folder
    },
    {
      name: "Sarah Williams",
      role: "Marketing Director",
      company: "InnoVision",
      testimonial: "Working with Deepak was a seamless experience from start to finish. He understood our vision immediately and delivered a product that perfectly represents our brand while adding his own creative touch.",
      rating: 4.5,
      image: "/testimonials/sarah.jpg"
    },
    {
      name: "Michael Chen",
      role: "Founder",
      company: "ArtsyTech",
      testimonial: "Deepak's unique combination of technical skills and design sense makes him invaluable. He completely revamped our app's UI/UX, resulting in a 40% increase in user engagement. I can't recommend him enough.",
      rating: 5,
      image: "/testimonials/michael.jpg"
    },
    {
      name: "Jessica Rodriguez",
      role: "Product Manager",
      company: "CloudSolutions",
      testimonial: "His ability to translate complex requirements into elegant, functional solutions is remarkable. Deepak consistently delivered high-quality work ahead of schedule and was always open to feedback and revisions.",
      rating: 4.5,
      image: "/testimonials/jessica.jpg"
    }
  ];
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  
  const goToPrevious = () => {
    setCurrentIndex(prev => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };
  
  const goToNext = () => {
    setCurrentIndex(prev => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };
  
  const particlesInit = async (engine: Engine) => {
    await loadFull(engine);
  };

  return (
    <section id="testimonials" className="py-24 relative overflow-hidden perspective-1000">
      {/* Particles background */}
      <Particles
        id="tsparticles-testimonials"
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
        {/* Section header */}
        <div ref={sectionRef} className="text-center mb-16 relative">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="inline-block"
          >
            <h2 className="glitch-text-header text-3xl md:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-400 to-blue-400 mb-4"
                data-text="Testimonials">
              Testimonials
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
            <TerminalDescription text="What clients are saying about working with me. Real feedback from real projects." />
          </motion.div>
        </div>
        
        {/* Testimonials carousel */}
        <div className="relative">
          <div className="testimonials-container relative">
            <AnimatePresence mode="wait">
              {testimonials.map((testimonial, index) => (
                <TestimonialCard
                  key={index}
                  name={testimonial.name}
                  role={testimonial.role}
                  company={testimonial.company}
                  testimonial={testimonial.testimonial}
                  rating={testimonial.rating}
                  image={testimonial.image}
                  isActive={index === currentIndex}
                />
              ))}
            </AnimatePresence>
          </div>
          
          {/* Navigation buttons */}
          <div className="flex justify-center mt-8 space-x-4">
            <NavButton direction="prev" onClick={goToPrevious} />
            
            {/* Dots indicator */}
            <div className="flex items-center space-x-2 mx-4">
              {testimonials.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 rounded-full ${
                    index === currentIndex 
                      ? 'w-6 bg-indigo-500' 
                      : 'w-2 bg-gray-600 hover:bg-gray-500'
                  } transition-all duration-300`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                ></motion.button>
              ))}
            </div>
            
            <NavButton direction="next" onClick={goToNext} />
          </div>
        </div>
      </div>
      
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
        
        .testimonial-card {
          transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          box-shadow: 0 10px 30px -15px rgba(2, 12, 27, 0.7);
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
        
        .cyber-nav-button {
          transition: all 0.3s ease;
        }
        
        .cyber-nav-button:hover:not(:disabled) {
          box-shadow: 0 0 12px rgba(99, 102, 241, 0.5);
        }
        
        .cyber-nav-button.prev {
          clip-path: polygon(
            0% 0%, 
            100% 0%, 
            100% 100%, 
            25% 100%, 
            0% 70%
          );
        }
        
        .cyber-nav-button.next {
          clip-path: polygon(
            0% 0%, 
            100% 0%, 
            100% 70%, 
            75% 100%, 
            0% 100%
          );
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
      `}</style>
    </section>
  );
};

export default Testimonials;
