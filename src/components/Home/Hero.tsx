"use client";
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowRight, FaGithub, FaLinkedin, FaYoutube, FaCamera, FaCode, FaLaptopCode } from 'react-icons/fa';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';
import type { Engine } from 'tsparticles-engine';
import Image from 'next/image';

const TerminalText: React.FC<{ text: string }> = ({ text }) => {
  const [displayText, setDisplayText] = useState('');
  const [cursorVisible, setCursorVisible] = useState(true);
  
  useEffect(() => {
    let i = 0;
    const typing = setInterval(() => {
      if (i < text.length) {
        setDisplayText(prev => prev + text.charAt(i));
        i++;
      } else {
        clearInterval(typing);
      }
    }, 40);
    
    const cursor = setInterval(() => {
      setCursorVisible(prev => !prev);
    }, 500);
    
    return () => {
      clearInterval(typing);
      clearInterval(cursor);
    };
  }, [text]);
  
  return (
    <div className="font-mono text-gray-300 text-lg md:text-xl max-w-2xl leading-relaxed">
      <span className="text-green-400">{'>'} </span>
      {displayText}
      <span className={`${cursorVisible ? 'opacity-100' : 'opacity-0'} transition-opacity text-green-400`}>|</span>
    </div>
  );
};

const FloatingIcon: React.FC<{ icon: React.ReactNode, delay: number }> = ({ icon, delay }) => {
  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ 
        y: [0, -10, 0],
        rotate: [0, 5, -5, 0]
      }}
      transition={{ 
        duration: 4, 
        repeat: Infinity, 
        delay: delay,
        ease: "easeInOut" 
      }}
      className="text-indigo-400 absolute opacity-30"
    >
      {icon}
    </motion.div>
  );
};

const Hero: React.FC = () => {
  const roles = ["Founder", "Developer", "UI/UX Designer", "Freelancer", "YouTuber", "Photographer"];
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const particlesInit = async (engine: Engine) => {
    await loadFull(engine);
  };
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRoleIndex((prevIndex) => (prevIndex + 1) % roles.length);
    }, 2000);
    
    return () => clearInterval(interval);
  }, [roles.length]);

  return (
    <div className="min-h-screen relative overflow-hidden perspective-1000">
      {/* Interactive particles background */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          fullScreen: { enable: false },
          background: {
            color: { value: "#0a0a0a" },
          },
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
              speed: 1,
              straight: false,
            },
            number: { density: { enable: true, area: 800 }, value: 80 },
            opacity: { value: 0.3 },
            shape: { type: "circle" },
            size: { value: { min: 1, max: 3 } },
          },
          detectRetina: true,
          interactivity: {
            events: {
              onHover: {
                enable: true,
                mode: "grab"
              }
            },
            modes: {
              grab: {
                distance: 200,
                links: {
                  opacity: 0.5
                }
              }
            }
          }
        }}
        className="absolute inset-0 z-0"
      />
      
      {/* Cyberpunk grid effect */}
      <div className="absolute inset-0 z-0 grid-bg"></div>
      
      {/* Floating tech icons */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <FloatingIcon icon={<FaCode size={30} />} delay={0} />
        <FloatingIcon icon={<FaLaptopCode size={40} />} delay={1.5} />
        <FloatingIcon icon={<FaGithub size={25} />} delay={2.5} />
        <FloatingIcon icon={<FaCamera size={35} />} delay={3.5} />
        {/* Add more floating icons positioned absolutely with custom styles */}
      </div>
      
      {/* Main content */}
      <div className="relative z-10 h-screen flex items-center">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left column - Text content */}
            <div className="lg:col-span-7 lg:pr-8 transform -rotate-1">
              <div className="neon-box p-8 rounded-lg backdrop-blur-md relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-black/50 to-indigo-900/30 backdrop-blur-sm"></div>
                <div className="relative z-10">
                  {/* Glitch effect name */}
                  <motion.h1 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="glitch-text text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight"
                    data-text="Deepak Kumar"
                  >
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-400 to-blue-400">
                      Deepak Kumar
                    </span>
                  </motion.h1>
                  
                  {/* Animated roles with enhanced effect */}
                  <div className="mt-4 h-10 overflow-hidden">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentRoleIndex}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -20, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex items-center"
                      >
                        <span className="text-gray-300 text-xl md:text-2xl">I'm a</span>
                        <div className="relative inline-block ml-2">
                          <span className="text-xl md:text-2xl font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 neon-text">
                            {roles[currentRoleIndex]}
                          </span>
                          <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/20 to-blue-600/20 blur-sm rounded-md -z-10"></div>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                  
                  {/* Terminal-style introduction */}
                  <div className="mt-8 terminal-container p-4 bg-black/50 border border-green-500/30 rounded-md">
                    <TerminalText text="Crafting digital experiences that blend creativity with functionality. I'm passionate about building technology that makes a difference, turning ideas into impactful solutions." />
                  </div>
                  
                  {/* Interactive CTA buttons */}
                  <div className="mt-10 flex flex-col sm:flex-row gap-4">
                    <motion.a 
                      href="#projects"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                      className="cyber-button-primary group relative px-8 py-4 overflow-hidden"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2 text-white">
                        View Projects
                        <FaArrowRight className="transform transition-all duration-300 group-hover:translate-x-1" />
                      </span>
                      <span className="cyber-button-glitch"></span>
                    </motion.a>
                    
                    <motion.a 
                      href="#contact"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                      className="cyber-button-secondary group relative px-8 py-4 overflow-hidden"
                    >
                      <span className="relative z-10 text-white">Let's Connect</span>
                      <span className="cyber-button-glitch"></span>
                    </motion.a>
                  </div>
                  
                  {/* Animated social links */}
                  <div className="mt-10">
                    <div className="flex space-x-6">
                      {[
                        { icon: <FaGithub size={24} />, href: "#" },
                        { icon: <FaLinkedin size={24} />, href: "#" },
                        { icon: <FaYoutube size={24} />, href: "#" },
                        { icon: <FaCamera size={24} />, href: "#" }
                      ].map((social, index) => (
                        <motion.a
                          key={index}
                          href={social.href}
                          className="social-icon-container"
                          whileHover={{ y: -5, scale: 1.1 }}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 * index + 0.5 }}
                        >
                          <div className="social-icon text-gray-400 hover:text-indigo-400 transition-colors duration-300">
                            {social.icon}
                          </div>
                          <div className="social-icon-glow"></div>
                        </motion.a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right column - 3D Profile Card */}
            <div className="lg:col-span-5 transform rotate-2">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="profile-card"
                whileHover={{ rotateY: 5, rotateX: -5 }}
              >
                <div className="card-content relative w-full aspect-square max-w-md mx-auto bg-gradient-to-br from-indigo-900/80 via-purple-900/80 to-indigo-800/80 rounded-2xl p-1 backdrop-blur-md shadow-2xl hover:shadow-indigo-500/30 transition-all duration-500">
                  <div className="absolute inset-0.5 rounded-2xl bg-gradient-to-br from-black via-gray-900 to-black p-6 overflow-hidden">
                    {/* Tech circuit lines */}
                    <div className="circuit-pattern absolute inset-0 opacity-20"></div>
                    
                    {/* Profile image with holographic effect */}
                    <div className="relative flex items-center justify-center h-full">
                      <div className="profile-hologram relative w-5/6 aspect-square rounded-full overflow-hidden border-2 border-indigo-500/30">
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 via-purple-600/20 to-blue-600/20 flex items-center justify-center">
                          <Image
                            src="/profile.png"
                            alt="Profile"
                            layout="fill"
                            objectFit="cover"
                            className="rounded-full transform transition-transform duration-500 hover:scale-105"
                          />
                        </div>
                        
                        {/* Holographic scan line effect */}
                        <div className="hologram-scanline"></div>
                        
                        {/* Decorative tech elements */}
                        <div className="absolute top-0 left-0 w-full h-full">
                          <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 border border-indigo-500/20 rounded-full animate-pulse"></div>
                          <div className="absolute top-1/3 left-1/3 w-1/3 h-1/3 border border-purple-500/20 rounded-full animate-pulse animation-delay-1000"></div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Card decorative elements */}
                    <div className="absolute bottom-4 left-4 right-4 h-6 flex items-center justify-between">
                      <div className="h-1 w-12 bg-indigo-500/50 rounded-full"></div>
                      <div className="text-xs text-indigo-300/70 font-mono tracking-wider">DKTECH//001</div>
                      <div className="h-1 w-12 bg-purple-500/50 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Add CSS for custom animations */}
      <style jsx>{`
        .grid-bg {
          background-image: 
            linear-gradient(rgba(99, 102, 241, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99, 102, 241, 0.1) 1px, transparent 1px);
          background-size: 40px 40px;
          background-position: center center;
        }
        
        .neon-text {
          text-shadow: 0 0 10px rgba(168, 85, 247, 0.5), 0 0 20px rgba(168, 85, 247, 0.3);
        }
        
        .circuit-pattern {
          background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M5 10 h90 v10 h-10 v70 h10 v10 h-90 v-10 h10 v-70 h-10 z' fill='none' stroke='%236366F1' stroke-width='0.5'/%3E%3C/svg%3E");
          background-size: 100px 100px;
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
        
        .cyber-button-secondary {
          background: transparent;
          border: 1px solid #6366f1;
          border-radius: 4px;
          clip-path: polygon(
            5% 0%, 
            100% 0%, 
            100% 100%, 
            0% 100%, 
            0% 30%
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
        
        .cyber-button-primary:hover .cyber-button-glitch,
        .cyber-button-secondary:hover .cyber-button-glitch {
          opacity: 0.5;
          animation: glitch 0.3s cubic-bezier(.25, .46, .45, .94) both infinite;
        }
        
        .profile-hologram {
          position: relative;
          transform-style: preserve-3d;
          animation: float 6s ease-in-out infinite;
        }
        
        .profile-card {
          transform-style: preserve-3d;
          transform: perspective(1000px);
        }
        
        .social-icon-container {
          position: relative;
        }
        
        .social-icon-glow {
          position: absolute;
          inset: -5px;
          background: radial-gradient(circle, rgba(99, 102, 241, 0.4) 0%, transparent 70%);
          opacity: 0;
          transition: opacity 0.3s;
          border-radius: 50%;
        }
        
        .social-icon-container:hover .social-icon-glow {
          opacity: 1;
        }
        
        .glitch-text {
          position: relative;
        }
        
        .glitch-text::before,
        .glitch-text::after {
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: transparent;
        }
        
        .glitch-text::before {
          left: 2px;
          text-shadow: -1px 0 #a855f7;
          clip: rect(44px, 450px, 56px, 0);
          animation: glitch-anim 5s infinite linear alternate-reverse;
        }
        
        .glitch-text::after {
          left: -2px;
          text-shadow: -1px 0 #6366f1;
          clip: rect(44px, 450px, 56px, 0);
          animation: glitch-anim2 5s infinite linear alternate-reverse;
          animation-delay: 0.1s;
        }
        
        .hologram-scanline {
          position: absolute;
          width: 100%;
          height: 5px;
          background: linear-gradient(to right, transparent, rgba(99, 102, 241, 0.5), transparent);
          animation: scan 3s ease-in-out infinite;
        }
        
        .terminal-container {
          position: relative;
          overflow: hidden;
        }
        
        .terminal-container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(to right, #10b981, #6366f1);
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
        
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes scan {
          0% { top: -5px; }
          100% { top: 100%; }
        }
      `}</style>
    </div>
  );
};

export default Hero;
