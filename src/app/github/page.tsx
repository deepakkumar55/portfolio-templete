"use client";
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaStar, FaCodeBranch, FaEye, FaCode, FaSort, FaSearch, FaExternalLinkAlt } from 'react-icons/fa';
import ParticlesBackground from '@/components/Shared/ParticlesBackground';
import GitHubRepositoryCard from '@/components/GitHub/GitHubRepositoryCard';
import GitHubStats from '@/components/GitHub/GitHubStats';
import GitHubLoader from '@/components/GitHub/GitHubLoader';

// GitHub API types
interface Repository {
  id: number;
  name: string;
  description: string;
  html_url: string;
  homepage: string;
  stargazers_count: number;
  forks_count: number;
  watchers_count: number;
  language: string;
  topics: string[];
  created_at: string;
  updated_at: string;
}

interface GitHubStats {
  public_repos: number;
  followers: number;
  following: number;
  public_gists: number;
}

export default function GitHubPage() {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [filteredRepos, setFilteredRepos] = useState<Repository[]>([]);
  const [stats, setStats] = useState<GitHubStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('updated');
  const [filterLanguage, setFilterLanguage] = useState('All');
  const sectionRef = useRef(null);
  const username = 'deepakkumar55';

  // Languages from repositories
  const languages = ['All', ...Array.from(new Set(repositories.map(repo => repo.language).filter(Boolean)))];

  // Fetch GitHub profile and repositories
  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        setLoading(true);
        
        // Fetch GitHub user data
        const userResponse = await fetch(`https://api.github.com/users/${username}`);
        if (!userResponse.ok) throw new Error('Failed to fetch GitHub profile');
        const userData = await userResponse.json();
        setStats({
          public_repos: userData.public_repos,
          followers: userData.followers,
          following: userData.following,
          public_gists: userData.public_gists
        });
        
        // Fetch repositories
        const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`);
        if (!reposResponse.ok) throw new Error('Failed to fetch repositories');
        const reposData = await reposResponse.json();
        setRepositories(reposData);
        setFilteredRepos(reposData);
        
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch GitHub data. Please try again later.');
        setLoading(false);
      }
    };
    
    fetchGitHubData();
  }, [username]);

  // Apply filters and sorting
  useEffect(() => {
    let results = [...repositories];
    
    // Apply language filter
    if (filterLanguage !== 'All') {
      results = results.filter(repo => repo.language === filterLanguage);
    }
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(repo => 
        repo.name.toLowerCase().includes(query) || 
        (repo.description && repo.description.toLowerCase().includes(query)) ||
        (repo.topics && repo.topics.some(topic => topic.toLowerCase().includes(query)))
      );
    }
    
    // Apply sorting
    if (sortBy === 'stars') {
      results.sort((a, b) => b.stargazers_count - a.stargazers_count);
    } else if (sortBy === 'forks') {
      results.sort((a, b) => b.forks_count - a.forks_count);
    } else if (sortBy === 'updated') {
      results.sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());
    }
    
    setFilteredRepos(results);
  }, [repositories, searchQuery, sortBy, filterLanguage]);

  return (
    <main className="relative min-h-screen bg-gray-900 overflow-hidden">
      {/* Particles Background */}
      <ParticlesBackground 
        id="github-particles" 
        particleColor="#6366f1" 
        linkColor="#6e56cf" 
        quantity={70}
      />
      
      {/* Cyberpunk grid effect */}
      <div className="absolute inset-0 z-0 grid-bg"></div>
      
      {/* Background accents */}
      <div className="absolute -left-64 top-1/3 w-96 h-96 bg-indigo-700/20 rounded-full blur-3xl"></div>
      <div className="absolute -right-64 bottom-1/3 w-96 h-96 bg-purple-700/20 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 pt-32 pb-20 relative z-10">
        {/* GitHub header */}
        <div className="text-center mb-16">
          <div className="flex justify-center items-center mb-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-block text-6xl text-indigo-400 mr-4"
            >
              <FaGithub />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="glitch-text-header text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-400 to-blue-400"
              data-text="GitHub Profile"
            >
              GitHub Profile
            </motion.h1>
          </div>
          
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent max-w-2xl mx-auto"
          ></motion.div>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-6 text-gray-300 max-w-3xl mx-auto"
          >
            Explore my open-source projects and contributions. These repositories showcase my coding skills, 
            problem-solving approach, and passion for software development.
          </motion.p>
        </div>
        
        {/* GitHub Stats */}
        {!loading && stats && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mb-12"
          >
            <GitHubStats stats={stats} username={username} />
          </motion.div>
        )}
        
        {/* Filters and Search */}
        {!loading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mb-8 flex flex-col md:flex-row justify-between items-center gap-4"
          >
            {/* Language filter */}
            <div className="flex items-center space-x-2 w-full md:w-auto">
              <span className="text-gray-400 text-sm whitespace-nowrap">Filter by:</span>
              <select
                value={filterLanguage}
                onChange={(e) => setFilterLanguage(e.target.value)}
                className="bg-gray-800 border border-gray-700 text-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                {languages.map(language => (
                  <option key={language || 'null'} value={language}>
                    {language || 'Other'}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Sort options */}
            <div className="flex items-center space-x-2 w-full md:w-auto">
              <span className="text-gray-400 text-sm whitespace-nowrap">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-gray-800 border border-gray-700 text-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="updated">Recently Updated</option>
                <option value="stars">Stars</option>
                <option value="forks">Forks</option>
              </select>
            </div>
            
            {/* Search box */}
            <div className="relative w-full md:w-auto flex-1 max-w-md">
              <input
                type="text"
                placeholder="Search repositories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-800/80 border border-gray-700 text-gray-300 rounded-md py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-500" />
              </div>
            </div>
          </motion.div>
        )}
        
        {/* Loading state */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-16">
            <GitHubLoader />
            <p className="mt-4 text-gray-400">Loading GitHub repositories...</p>
          </div>
        )}
        
        {/* Error state */}
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16 bg-gray-900/80 backdrop-blur-md rounded-xl border border-red-500/30"
          >
            <h3 className="text-2xl font-bold text-red-400 mb-3">Error</h3>
            <p className="text-gray-400 max-w-md mx-auto">{error}</p>
          </motion.div>
        )}
        
        {/* Repository grid */}
        {!loading && !error && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
            >
              <AnimatePresence>
                {filteredRepos.map((repo, index) => (
                  <GitHubRepositoryCard
                    key={repo.id}
                    repository={repo}
                    index={index}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
            
            {/* Empty state */}
            {filteredRepos.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16 backdrop-blur-md bg-gray-900/40 rounded-xl p-8 border border-gray-800"
              >
                <h3 className="text-2xl font-bold text-indigo-400 mb-3">No repositories found</h3>
                <p className="text-gray-400 max-w-md mx-auto">
                  No repositories match your current filters. Try adjusting your search criteria or explore different categories.
                </p>
              </motion.div>
            )}
          </>
        )}
      </div>
      
      {/* CSS for styles */}
      <style jsx>{`
        .grid-bg {
          background-image: 
            linear-gradient(rgba(99, 102, 241, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99, 102, 241, 0.1) 1px, transparent 1px);
          background-size: 40px 40px;
          background-position: center center;
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
