"use client";
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaCode, FaServer, FaMobileAlt, FaDesktop, FaDatabase, FaCog, FaCalendarAlt, FaGraduationCap, FaBriefcase } from 'react-icons/fa';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';
import { Engine } from '@tsparticles/engine';

// Skill component with cyberpunk-style progress bar
const Skill: React.FC<{ 
  name: string; 
  level: number; 
  icon: React.ReactNode;
  index: number;
}> = ({ name, level, icon, index }) => {
  const skillRef = useRef(null);
  const isInView = useInView(skillRef, { once: true, amount: 0.3 });

  return (
    <motion.div 
      ref={skillRef}
      initial={{ opacity: 0, x: -50 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="mb-6"
    >
      <div className="flex items-center mb-2">
        <div className="text-indigo-400 mr-2">{icon}</div>
        <h3 className="text-gray-300 font-medium">{name}</h3>
        <span className="ml-auto text-xs text-indigo-400 font-mono">{level}%</span>
      </div>
      <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden relative">
        <div className="absolute top-0 left-0 right-0 bottom-0 grid-pattern opacity-30"></div>
        <motion.div 
          initial={{ width: 0 }}
          animate={isInView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1, delay: index * 0.1 + 0.2, ease: "easeOut" }}
          className="h-full rounded-full skill-progress-bar relative overflow-hidden"
        >
          {/* Animated scanner effect */}
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-full h-full scanner-glow"></div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

// Timeline item component for education and experience
const TimelineItem: React.FC<{
  title: string;
  organization: string;
  period: string;
  description: string;
  icon: React.ReactNode;
  index: number;
  type: 'education' | 'experience';
}> = ({ title, organization, period, description, icon, index, type }) => {
  const itemRef = useRef(null);
  const isInView = useInView(itemRef, { once: true, amount: 0.1 });
  
  return (
    <motion.div 
      ref={itemRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="mb-8 relative pl-8"
    >
      {/* Timeline connector */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-indigo-500 via-purple-500 to-indigo-500 opacity-50"></div>
      
      {/* Icon bubble */}
      <div className={`absolute left-0 top-0 w-6 h-6 -ml-3 rounded-full flex items-center justify-center 
                      ${type === 'education' ? 'bg-indigo-900/80' : 'bg-purple-900/80'} 
                      border border-indigo-500/50`}>
        <span className="text-xs text-indigo-300">{icon}</span>
      </div>
      
      {/* Main content */}
      <div className="timeline-item p-4 rounded-lg border border-gray-800 backdrop-blur-sm bg-gray-900/50 hover:bg-gray-900/70 transition-colors duration-300">
        <div className="absolute top-0 right-0 left-0 h-0.5 bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent"></div>
        
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">{title}</h3>
          <div className="flex items-center text-xs text-gray-400">
            <FaCalendarAlt className="mr-1 text-indigo-400" />
            <span>{period}</span>
          </div>
        </div>
        
        <h4 className="text-gray-300 font-medium mb-2">{organization}</h4>
        <p className="text-gray-400 text-sm">{description}</p>
        
        {/* Tech decoration */}
        <div className="absolute bottom-2 right-2">
          <div className="text-xs text-indigo-500/50 font-mono">{type === 'education' ? 'EDU' : 'EXP'}://0{index+1}</div>
        </div>
      </div>
    </motion.div>
  );
};

// Terminal text display
const TerminalAbout: React.FC<{ text: string }> = ({ text }) => {
  return (
    <div className="font-mono text-gray-300 text-base md:text-lg max-w-3xl mx-auto leading-relaxed p-4 bg-black/40 border border-green-500/30 rounded-md relative">
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-green-500 to-transparent"></div>
      <div className="mb-2 text-green-400 font-bold">$ ./about-deepak.sh</div>
      <div>
        <span className="text-green-400">{'>'} </span>
        {text}
        <span className="text-green-400 animate-pulse">_</span>
      </div>
    </div>
  );
};

const About: React.FC = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  
  const particlesInit = async (engine: Engine) => {
    await loadFull(engine);
  };
  
  // Skills data
  const skills = [
    { name: "Frontend Development", level: 90, icon: <FaCode /> },
    { name: "Backend Development", level: 85, icon: <FaServer /> },
    { name: "Mobile App Development", level: 80, icon: <FaMobileAlt /> },
    { name: "UI/UX Design", level: 85, icon: <FaDesktop /> },
    { name: "Database Management", level: 75, icon: <FaDatabase /> },
    { name: "DevOps", level: 70, icon: <FaCog /> },
  ];
  
  // Education data
  const education = [
    {
      title: "Master of Computer Science",
      organization: "University of Technology",
      period: "2018 - 2020",
      description: "Specialized in Artificial Intelligence and Full-Stack Development. Graduated with distinction and completed thesis on Progressive Web Applications.",
      icon: <FaGraduationCap />
    },
    {
      title: "Bachelor of Computer Science",
      organization: "National Institute of Technology",
      period: "2014 - 2018",
      description: "Focused on software engineering fundamentals, data structures, and algorithms. Participated in multiple hackathons and coding competitions.",
      icon: <FaGraduationCap />
    }
  ];
  
  // Experience data
  const experience = [
    {
      title: "Lead Developer",
      organization: "TechInnovate Solutions",
      period: "2020 - Present",
      description: "Leading a team of developers to build scalable web applications. Implementing CI/CD pipelines and ensuring best coding practices.",
      icon: <FaBriefcase />
    },
    {
      title: "Full Stack Developer",
      organization: "Digital Creators Inc.",
      period: "2018 - 2020",
      description: "Developed and maintained multiple client projects using React, Node.js, and MongoDB. Improved application performance by 40%.",
      icon: <FaBriefcase />
    },
    {
      title: "Frontend Developer Intern",
      organization: "WebTech Studios",
      period: "2017 - 2018",
      description: "Assisted in building responsive interfaces using modern JavaScript frameworks. Collaborated with design team to implement pixel-perfect components.",
      icon: <FaBriefcase />
    }
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden perspective-1000">
      {/* Particles background - similar to other sections but with different parameters */}
      <Particles
        id="tsparticles-about"
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
              speed: 0.6,
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
      <div className="absolute -left-64 top-1/3 w-96 h-96 bg-indigo-700/20 rounded-full blur-3xl"></div>
      <div className="absolute -right-64 bottom-1/3 w-96 h-96 bg-purple-700/20 rounded-full blur-3xl"></div>
      
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
                data-text="About Me">
              About Me
            </h2>
            <motion.div 
              initial={{ width: 0 }}
              animate={isInView ? { width: "100%" } : { width: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent"
            ></motion.div>
          </motion.div>
          
          {/* Terminal intro */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-8 mb-16"
          >
            <TerminalAbout text="I'm a passionate developer with experience across the full tech stack. Focused on creating elegant solutions to complex problems, I blend technical expertise with creative thinking to deliver memorable digital experiences." />
          </motion.div>
        </div>
        
        {/* Main content in two columns on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left column: Skills */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="backdrop-blur-md bg-gray-900/40 rounded-xl p-6 border border-gray-800 relative overflow-hidden"
          >
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
            
            <h3 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 flex items-center">
              <FaCode className="mr-2 text-indigo-400" /> Technical Skills
            </h3>
            
            {/* Skills list */}
            <div className="space-y-1">
              {skills.map((skill, index) => (
                <Skill 
                  key={index}
                  name={skill.name}
                  level={skill.level}
                  icon={skill.icon}
                  index={index}
                />
              ))}
            </div>
            
            {/* Tech ID tag */}
            <div className="absolute bottom-2 right-2">
              <div className="text-xs text-indigo-500/50 font-mono">SKILLS://CORE</div>
            </div>
          </motion.div>
          
          {/* Right column: Tabs for Education and Experience */}
          <div>
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="backdrop-blur-md bg-gray-900/40 rounded-xl p-6 border border-gray-800 mb-8 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
              
              {/* Tech corner accents */}
              <div className="absolute top-0 left-0 w-4 h-4">
                <div className="absolute top-0 left-0 w-2 h-0.5 bg-purple-500"></div>
                <div className="absolute top-0 left-0 w-0.5 h-2 bg-purple-500"></div>
              </div>
              <div className="absolute top-0 right-0 w-4 h-4">
                <div className="absolute top-0 right-0 w-2 h-0.5 bg-indigo-500"></div>
                <div className="absolute top-0 right-0 w-0.5 h-2 bg-indigo-500"></div>
              </div>
              
              <h3 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400 flex items-center">
                <FaGraduationCap className="mr-2 text-purple-400" /> Education
              </h3>
              
              {/* Education timeline */}
              <div className="space-y-6">
                {education.map((item, index) => (
                  <TimelineItem
                    key={index}
                    title={item.title}
                    organization={item.organization}
                    period={item.period}
                    description={item.description}
                    icon={item.icon}
                    index={index}
                    type="education"
                  />
                ))}
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="backdrop-blur-md bg-gray-900/40 rounded-xl p-6 border border-gray-800 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
              
              {/* Tech corner accents */}
              <div className="absolute top-0 left-0 w-4 h-4">
                <div className="absolute top-0 left-0 w-2 h-0.5 bg-blue-500"></div>
                <div className="absolute top-0 left-0 w-0.5 h-2 bg-blue-500"></div>
              </div>
              <div className="absolute top-0 right-0 w-4 h-4">
                <div className="absolute top-0 right-0 w-2 h-0.5 bg-purple-500"></div>
                <div className="absolute top-0 right-0 w-0.5 h-2 bg-purple-500"></div>
              </div>
              
              <h3 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 flex items-center">
                <FaBriefcase className="mr-2 text-blue-400" /> Experience
              </h3>
              
              {/* Experience timeline */}
              <div className="space-y-6">
                {experience.map((item, index) => (
                  <TimelineItem
                    key={index}
                    title={item.title}
                    organization={item.organization}
                    period={item.period}
                    description={item.description}
                    icon={item.icon}
                    index={index}
                    type="experience"
                  />
                ))}
              </div>
            </motion.div>
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
        
        .skill-progress-bar {
          background: linear-gradient(90deg, #4f46e5, #7e22ce);
        }
        
        .scanner-glow {
          background: linear-gradient(to right, transparent, rgba(99, 102, 241, 0.6), transparent);
          animation: scan-progress 1.5s ease-in-out infinite;
        }
        
        .grid-pattern {
          background-image: 
            linear-gradient(90deg, rgba(99, 102, 241, 0.3) 1px, transparent 1px),
            linear-gradient(rgba(99, 102, 241, 0.3) 1px, transparent 1px);
          background-size: 8px 8px;
        }
        
        .timeline-item {
          transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        
        .timeline-item:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 30px -10px rgba(99, 102, 241, 0.2);
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
        
        @keyframes scan-progress {
          0%, 100% { transform: translateX(-100%); }
          50% { transform: translateX(100%); }
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

export default About;
