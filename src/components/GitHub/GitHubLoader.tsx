"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub } from 'react-icons/fa';

const GitHubLoader: React.FC = () => {
  return (
    <div className="flex flex-col items-center">
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "loop"
        }}
        className="text-5xl text-indigo-400"
      >
        <FaGithub />
      </motion.div>
      
      <div className="mt-4 relative w-48 h-2 bg-gray-800 rounded-full overflow-hidden">
        <motion.div
          animate={{
            x: [-192, 192]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear"
          }}
          className="absolute top-0 left-0 right-0 bottom-0 w-1/4 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
        />
      </div>
    </div>
  );
};

export default GitHubLoader;
