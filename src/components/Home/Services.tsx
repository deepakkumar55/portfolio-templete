"use client";
import React, { useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { FaCode, FaPaintBrush, FaLaptopCode, FaYoutube, FaCamera, FaRocket } from 'react-icons/fa';
import Particles from 'react-tsparticles';
import { loadAll } from "@tsparticles/all";
import { Engine } from '@tsparticles/engine';

// Floating tech icon component - matching hero style
const FloatingIconServices: React.FC<{ icon: React.ReactNode, position: string, size: number, delay: number }> = 
  ({ icon, position, size, delay }) => {
  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ 
        y: [0, -15, 0],
        rotate: [0, 5, -5, 0]
      }}
      transition={{ 
        duration: 5, 
        repeat: Infinity, 
        delay,
        ease: "easeInOut" 
      }}
      className={`text-indigo-400 absolute opacity-20 ${position}`}
      style={{ fontSize: size }}
    >
      {icon}
    </motion.div>
  );
};

// Enhanced terminal-style section description
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

// Enhanced service card with cyberpunk styling
const ServiceCard: React.FC<{
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}> = ({ title, description, icon, index }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.3 });
  
  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ 
        scale: 1.05, 
        rotateY: 5, 
        rotateX: -5,
        y: -10
      }}
      className="service-card backdrop-blur-md bg-gradient-to-br from-gray-900/60 via-gray-800/60 to-gray-900/60 
                p-6 rounded-xl overflow-hidden relative border border-gray-700/50 group transform-gpu"
      style={{ transformStyle: 'preserve-3d' }}
    >
      {/* Glowing border effect on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute inset-0 border-2 border-indigo-500/50 rounded-xl"></div>
        <div className="absolute inset-0 border-2 border-indigo-500/50 rounded-xl blur-md"></div>
      </div>

      {/* Tech circuit pattern */}
      <div className="absolute inset-0 circuit-pattern opacity-5 group-hover:opacity-15 transition-opacity duration-500"></div>
      
      {/* Animated corners */}
      <div className="absolute top-0 left-0 w-4 h-4">
        <div className="absolute top-0 left-0 w-2 h-0.5 bg-indigo-500"></div>
        <div className="absolute top-0 left-0 w-0.5 h-2 bg-indigo-500"></div>
      </div>
      <div className="absolute top-0 right-0 w-4 h-4">
        <div className="absolute top-0 right-0 w-2 h-0.5 bg-purple-500"></div>
        <div className="absolute top-0 right-0 w-0.5 h-2 bg-purple-500"></div>
      </div>
      <div className="absolute bottom-0 left-0 w-4 h-4">
        <div className="absolute bottom-0 left-0 w-2 h-0.5 bg-blue-500"></div>
        <div className="absolute bottom-0 left-0 w-0.5 h-2 bg-blue-500"></div>
      </div>
      <div className="absolute bottom-0 right-0 w-4 h-4">
        <div className="absolute bottom-0 right-0 w-2 h-0.5 bg-purple-500"></div>
        <div className="absolute bottom-0 right-0 w-0.5 h-2 bg-purple-500"></div>
      </div>
      
      {/* Digital scanline effect */}
      <div className="absolute inset-0 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="absolute w-full h-full scanline"></div>
      </div>
      
      {/* Icon with holographic effect */}
      <div className="service-icon-container mb-6 relative">
        <motion.div 
          className="text-4xl text-indigo-400 group-hover:text-indigo-300 transition-colors duration-300"
          animate={{ 
            y: [0, -5, 0],
            rotateZ: [0, 5, 0, -5, 0]
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity, 
            ease: "easeInOut"
          }}
        >
          {icon}
        </motion.div>
        <div className="service-icon-glow absolute -inset-2 bg-indigo-500/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      
      {/* Service title with glitch effect */}
      <h3 className="glitch-text text-xl md:text-2xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-indigo-300"
          data-text={title}>
        {title}
      </h3>
      
      {/* Service description */}
      <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300 relative z-10">
        {description}
      </p>
      
      {/* Tech data attribute */}
      <div className="absolute bottom-2 right-2">
        <div className="text-xs text-indigo-500/70 font-mono">SVC://0{index+1}</div>
      </div>
    </motion.div>
  );
};

// Main Services component
const Services: React.FC = () => {
  const services = [
    {
      title: "Web Development",
      description: "Building responsive, scalable web applications with modern frameworks and clean code practices.",
      icon: <FaCode />
    },
    {
      title: "UI/UX Design",
      description: "Creating intuitive, engaging user interfaces with a focus on user experience and accessibility.",
      icon: <FaPaintBrush />
    },
    {
      title: "App Development",
      description: "Developing cross-platform mobile applications that deliver seamless experiences across devices.",
      icon: <FaLaptopCode />
    },
    {
      title: "Content Creation",
      description: "Producing engaging tech content that educates and inspires through my YouTube channel.",
      icon: <FaYoutube />
    },
    {
      title: "Photography",
      description: "Capturing moments with professional photography, specializing in portraits and tech setups.",
      icon: <FaCamera />
    },
    {
      title: "Tech Consultancy",
      description: "Providing expert advice on technology solutions and digital transformation strategies.",
      icon: <FaRocket />
    }
  ];
  
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  
  const particlesInit = async (engine: Engine) => {
    await loadAll(engine);
  };

  return (
    <section id="services" className="py-20 relative overflow-hidden perspective-1000">
      {/* Particles background - similar to hero but with different parameters */}
      <Particles
        id="tsparticles-services"
        init={particlesInit}
        options={{
          fullScreen: { enable: false },
          background: { color: { value: "#0a0a0a" } },
          fpsLimit: 120,
          particles: {
            color: { value: "#a855f7" },
            links: {
              color: "#6366f1",
              distance: 200,
              enable: true,
              opacity: 0.2,
              width: 1
            },
            move: {
              direction: "none",
              enable: true,
              outModes: { default: "bounce" },
              random: true,
              speed: 0.8,
              straight: false,
            },
            number: { density: { enable: true, area: 1000 }, value: 60 },
            opacity: { value: 0.2 },
            shape: { type: "circle" },
            size: { value: { min: 1, max: 2 } },
          },
          detectRetina: true
        }}
        className="absolute inset-0 z-0"
      />
      
      {/* Cyberpunk grid effect - same as hero */}
      <div className="absolute inset-0 z-0 grid-bg"></div>
      
      {/* Floating tech icons */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <FloatingIconServices icon={<FaCode />} position="top-[20%] left-[10%]" size={20} delay={0} />
        <FloatingIconServices icon={<FaPaintBrush />} position="top-[40%] right-[15%]" size={28} delay={1.5} />
        <FloatingIconServices icon={<FaLaptopCode />} position="bottom-[30%] left-[20%]" size={24} delay={2.1} />
        <FloatingIconServices icon={<FaRocket />} position="bottom-[15%] right-[10%]" size={22} delay={3.2} />
      </div>
      
      {/* Background accents */}
      <div className="absolute -left-64 top-1/4 w-96 h-96 bg-purple-700/20 rounded-full blur-3xl"></div>
      <div className="absolute -right-64 bottom-1/4 w-96 h-96 bg-indigo-700/20 rounded-full blur-3xl"></div>
      
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
                data-text="My Services">
              My Services
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
            className="mt-6"
          >
            <TerminalDescription text="Specialized solutions tailored to your needs. Here's what I excel at." />
          </motion.div>
        </div>
        
        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                title={service.title}
                description={service.description}
                icon={service.icon}
                index={index}
              />
            ))}
          </AnimatePresence>
        </div>
        
        {/* CTA button - matching hero style */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <motion.a 
            href="#contact" 
            className="cyber-button-primary group relative px-8 py-4 overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10 flex items-center justify-center gap-2 text-white">
              Get in Touch
              <FaRocket className="transform transition-all duration-300 group-hover:translate-x-1" />
            </span>
            <span className="cyber-button-glitch"></span>
          </motion.a>
        </motion.div>
      </div>
      
      {/* CSS for specific elements */}
      <style jsx>{`
        .circuit-pattern {
          background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M5 10 h90 v10 h-10 v70 h10 v10 h-90 v-10 h10 v-70 h-10 z' fill='none' stroke='%236366F1' stroke-width='0.5'/%3E%3C/svg%3E");
          background-size: 100px 100px;
        }
        
        .service-card {
          transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          box-shadow: 0 10px 30px -15px rgba(2, 12, 27, 0.7);
        }
        
        .service-card:hover {
          box-shadow: 0 20px 30px -15px rgba(99, 102, 241, 0.3);
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
        
        .grid-bg {
          background-image: 
            linear-gradient(rgba(99, 102, 241, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99, 102, 241, 0.1) 1px, transparent 1px);
          background-size: 40px 40px;
          background-position: center center;
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
        
        .scanline {
          background: linear-gradient(
            to bottom,
            transparent 0%,
            rgba(99, 102, 241, 0.2) 10%,
            transparent 20%
          );
          position: absolute;
          left: 0;
          width: 100%;
          height: 300%;
          animation: scanlines 2s linear infinite;
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

export default Services;
