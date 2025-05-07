"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaUserFriends, FaCodeBranch, FaBook } from 'react-icons/fa';

interface GitHubStatsProps {
  stats: {
    public_repos: number;
    followers: number;
    following: number;
    public_gists: number;
  };
  username: string;
}

const GitHubStats: React.FC<GitHubStatsProps> = ({ stats, username }) => {
  const statItems = [
    {
      name: 'Repositories',
      value: stats.public_repos,
      icon: <FaBook />,
      color: 'from-blue-500 to-indigo-500'
    },
    {
      name: 'Followers',
      value: stats.followers,
      icon: <FaUserFriends />,
      color: 'from-purple-500 to-pink-500'
    },
    {
      name: 'Following',
      value: stats.following,
      icon: <FaUserFriends />,
      color: 'from-green-500 to-teal-500'
    },
    {
      name: 'Gists',
      value: stats.public_gists,
      icon: <FaCodeBranch />,
      color: 'from-yellow-500 to-orange-500'
    }
  ];

  return (
    <div className="backdrop-blur-md bg-gray-900/40 rounded-xl border border-gray-800 p-6 relative overflow-hidden">
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-indigo-500 to-transparent"></div>
      
      {/* Tech circuit pattern */}
      <div className="absolute inset-0 circuit-pattern opacity-5"></div>
      
      {/* Tech corner accents */}
      <div className="absolute top-0 left-0 w-4 h-4">
        <div className="absolute top-0 left-0 w-2 h-0.5 bg-indigo-500"></div>
        <div className="absolute top-0 left-0 w-0.5 h-2 bg-indigo-500"></div>
      </div>
      <div className="absolute top-0 right-0 w-4 h-4">
        <div className="absolute top-0 right-0 w-2 h-0.5 bg-purple-500"></div>
        <div className="absolute top-0 right-0 w-0.5 h-2 bg-purple-500"></div>
      </div>
      
      {/* Header */}
      <div className="flex items-center mb-6 relative z-10">
        <div className="text-indigo-400 text-2xl mr-3">
          <FaGithub />
        </div>
        <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
          GitHub Profile Stats
        </h2>
        <a 
          href={`https://github.com/${username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-auto text-sm text-indigo-400 hover:text-indigo-300 transition-colors duration-300 flex items-center"
        >
          @{username}
          <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>
      
      {/* Stats grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative z-10">
        {statItems.map((stat, index) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/50 relative overflow-hidden group hover:border-indigo-500/30 transition-colors duration-300"
          >
            <div className="flex items-center mb-2">
              <div className={`text-xl bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                {stat.icon}
              </div>
              <h3 className="ml-2 text-sm font-medium text-gray-400">{stat.name}</h3>
            </div>
            <p className="text-2xl font-bold text-white">{stat.value.toLocaleString()}</p>
            
            {/* Stat glow effect */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500/0 via-indigo-500/0 to-purple-500/0 group-hover:from-indigo-500/10 group-hover:via-indigo-500/10 group-hover:to-purple-500/10 rounded-lg blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
          </motion.div>
        ))}
      </div>
      
      {/* CSS for patterns */}
      <style jsx>{`
        .circuit-pattern {
          background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M5 10 h90 v10 h-10 v70 h10 v10 h-90 v-10 h10 v-70 h-10 z' fill='none' stroke='%236366F1' stroke-width='0.5'/%3E%3C/svg%3E");
          background-size: 100px 100px;
        }
      `}</style>
    </div>
  );
};

export default GitHubStats;
