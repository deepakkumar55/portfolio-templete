"use client";
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Particles } from "@tsparticles/react";
import { particlesInit, baseParticlesConfig } from '@/utils/particlesConfig';
import { 
  SiReact, SiNextdotjs, SiTypescript, SiJavascript, SiHtml5, SiCss3,
  SiTailwindcss, SiNodedotjs, SiExpress, SiMongodb, SiPostgresql, SiPrisma,
  SiFirebase, SiDocker, SiGit, SiFigma, SiAdobephotoshop,
  SiSwift, SiFlutter, SiAndroidstudio, SiPython, SiDjango, SiRedux
} from 'react-icons/si';
import { FaAws } from "react-icons/fa";

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

// Tech category component
const TechCategory: React.FC<{
  title: string;
  technologies: Array<{
    name: string;
    icon: React.ReactNode;
    color: string;
  }>;
  index: number;
}> = ({ title, technologies, index }) => {
  const categoryRef = useRef(null);
  const isInView = useInView(categoryRef, { once: true, amount: 0.2 });
  
  return (
    <motion.div
      ref={categoryRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="backdrop-blur-md bg-gray-900/40 rounded-xl p-6 border border-gray-800 relative overflow-hidden"
    >
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-indigo-500 to-transparent"></div>
      
      {/* Tech corner accents */}
      <div className="absolute top-0 left-0 w-4 h-4">
        <div className="absolute top-0 left-0 w-2 h-0.5 bg-indigo-500"></div>
        <div className="absolute top-0 left-0 w-0.5 h-2 bg-indigo-500"></div>
      </div>
      <div className="absolute top-0 right-0 w-4 h-4">
        <div className="absolute top-0 right-0 w-2 h-0.5 bg-purple-500"></div>
        <div className="absolute top-0 right-0 w-0.5 h-2 bg-purple-500"></div>
      </div>
      
      {/* Tech circuit pattern */}
      <div className="absolute inset-0 circuit-pattern opacity-5"></div>
      
      {/* Category title */}
      <h3 className="text-xl md:text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 relative z-10">
        {title}
      </h3>
      
      {/* Tech grid */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-4 gap-5 relative z-10">
        {technologies.map((tech, techIndex) => (
          <motion.div
            key={tech.name}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3, delay: index * 0.1 + techIndex * 0.05 }}
            whileHover={{ 
              scale: 1.15, 
              rotate: [0, -5, 5, 0],
              transition: { duration: 0.5 }
            }}
            className="tech-item flex flex-col items-center"
          >
            <div className={`tech-icon-container relative w-14 h-14 md:w-16 md:h-16 flex items-center justify-center rounded-xl group`}>
              <div className="absolute inset-0 bg-gray-800/70 rounded-xl backdrop-blur-sm border border-gray-700/50 transform transition-transform duration-300 group-hover:border-indigo-500/50"></div>
              <div className={`text-3xl md:text-4xl ${tech.color} group-hover:scale-110 transition-transform duration-300 relative z-10`}>
                {tech.icon}
              </div>
              <div className="absolute -inset-1 bg-indigo-500/10 rounded-xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Digital circuit effect on hover */}
              <div className="absolute inset-0 rounded-xl overflow-hidden opacity-0 group-hover:opacity-20 transition-opacity duration-300">
                <div className="circuit-dots"></div>
              </div>
            </div>
            <span className="text-xs text-gray-400 mt-2 text-center group-hover:text-gray-300 transition-colors duration-300">{tech.name}</span>
          </motion.div>
        ))}
      </div>
      
      {/* Category ID tag */}
      <div className="absolute bottom-2 right-2">
        <div className="text-xs text-indigo-500/50 font-mono">{title.toUpperCase().replace(' ', '_')}://STACK</div>
      </div>
    </motion.div>
  );
};

const TechStack: React.FC = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  
  // Technology categories
  const techCategories = [
    {
      title: "Frontend",
      technologies: [
        { name: "React", icon: <SiReact />, color: "text-blue-400" },
        { name: "Next.js", icon: <SiNextdotjs />, color: "text-white" },
        { name: "TypeScript", icon: <SiTypescript />, color: "text-blue-500" },
        { name: "JavaScript", icon: <SiJavascript />, color: "text-yellow-400" },
        { name: "HTML5", icon: <SiHtml5 />, color: "text-orange-500" },
        { name: "CSS3", icon: <SiCss3 />, color: "text-blue-400" },
        { name: "Tailwind", icon: <SiTailwindcss />, color: "text-cyan-400" },
        { name: "Redux", icon: <SiRedux />, color: "text-purple-500" },
      ]
    },
    {
      title: "Backend",
      technologies: [
        { name: "Node.js", icon: <SiNodedotjs />, color: "text-green-500" },
        { name: "Express", icon: <SiExpress />, color: "text-gray-300" },
        { name: "MongoDB", icon: <SiMongodb />, color: "text-green-500" },
        { name: "PostgreSQL", icon: <SiPostgresql />, color: "text-blue-400" },
        { name: "Prisma", icon: <SiPrisma />, color: "text-indigo-300" },
        { name: "Firebase", icon: <SiFirebase />, color: "text-yellow-500" },
        { name: "Python", icon: <SiPython />, color: "text-blue-400" },
        { name: "Django", icon: <SiDjango />, color: "text-green-600" },
      ]
    },
    {
      title: "Mobile & Native",
      technologies: [
        { name: "React Native", icon: <SiReact />, color: "text-blue-400" },
        { name: "Swift", icon: <SiSwift />, color: "text-orange-500" },
        { name: "Flutter", icon: <SiFlutter />, color: "text-blue-400" },
        { name: "Android", icon: <SiAndroidstudio />, color: "text-green-500" },
      ]
    },
    {
      title: "DevOps & Tools",
      technologies: [
        { name: "AWS", icon: <FaAws />, color: "text-yellow-500" },
        { name: "Docker", icon: <SiDocker />, color: "text-blue-400" },
        { name: "Git", icon: <SiGit />, color: "text-orange-500" },
        { name: "Figma", icon: <SiFigma />, color: "text-purple-400" },
        { name: "Photoshop", icon: <SiAdobephotoshop />, color: "text-blue-600" },
      ]
    }
  ];
  
  return (
    <section id="tech-stack" className="py-24 relative overflow-hidden perspective-1000">
      {/* Particles background */}
      <Particles
        id="tsparticles-techstack"
        init={particlesInit}
        options={{
          ...baseParticlesConfig,
          particles: {
            ...baseParticlesConfig.particles,
            color: { value: "#a855f7" },
            number: { density: { enable: true, area: 1200 }, value: 50 },
            move: {
              ...baseParticlesConfig.particles.move,
              speed: 0.7,
            }
          }
        }}
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
                data-text="Tech Stack">
              Tech Stack
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
            <TerminalDescription text="Technologies and tools I've mastered for building high-quality digital products." />
          </motion.div>
        </div>
        
        {/* Tech categories grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {techCategories.map((category, index) => (
            <TechCategory
              key={category.title}
              title={category.title}
              technologies={category.technologies}
              index={index}
            />
          ))}
        </div>
        
        {/* Fun fact with futuristic styling */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12 backdrop-blur-md bg-gray-900/40 rounded-xl p-6 border border-gray-800 max-w-3xl mx-auto relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
          <div className="relative z-10">
            <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 mb-3">Always Learning</h3>
            <p className="text-gray-400">
              I'm constantly exploring new technologies and methodologies. Currently diving deeper into AI integration with web applications and blockchain development.
            </p>
          </div>
          <div className="absolute bottom-2 right-2">
            <div className="text-xs text-purple-500/50 font-mono">LEARNING://CONTINUOUS</div>
          </div>
        </motion.div>
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
        
        .circuit-dots {
          background-image: radial-gradient(rgba(99, 102, 241, 0.3) 1px, transparent 1px);
          background-size: 8px 8px;
          width: 100%;
          height: 100%;
        }
        
        .tech-icon-container {
          transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        
        .tech-icon-container:hover {
          transform: translateY(-5px);
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

export default TechStack;
