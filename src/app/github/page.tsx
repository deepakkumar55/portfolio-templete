import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "GitHub Projects | Deepak Kumar - Full-Stack Developer",
  description: "Explore Deepak Kumar's open source contributions and GitHub repositories.",
};

type Repository = {
  id: number;
  name: string;
  description: string;
  language: string;
  stars: number;
  forks: number;
  url: string;
  isPopular?: boolean;
};

export default function GitHubPage() {
  // Example repositories - replace with your actual GitHub repositories or fetch from GitHub API
  const repositories: Repository[] = [
    {
      id: 1,
      name: "react-dashboard",
      description: "A responsive admin dashboard template built with React, Tailwind CSS and TypeScript.",
      language: "TypeScript",
      stars: 52,
      forks: 12,
      url: "https://github.com/yourusername/react-dashboard",
      isPopular: true
    },
    {
      id: 2,
      name: "next-auth-template",
      description: "Starter template for Next.js applications with authentication using NextAuth.js.",
      language: "TypeScript",
      stars: 38,
      forks: 8,
      url: "https://github.com/yourusername/next-auth-template",
      isPopular: true
    },
    {
      id: 3,
      name: "tailwind-components",
      description: "Collection of reusable UI components built with Tailwind CSS.",
      language: "JavaScript",
      stars: 29,
      forks: 5,
      url: "https://github.com/yourusername/tailwind-components"
    },
    {
      id: 4,
      name: "portfolio-website",
      description: "Personal portfolio website built with Next.js and Tailwind CSS.",
      language: "TypeScript",
      stars: 17,
      forks: 4,
      url: "https://github.com/yourusername/portfolio-website"
    },
    {
      id: 5,
      name: "node-express-api",
      description: "RESTful API template using Node.js, Express, and MongoDB.",
      language: "JavaScript",
      stars: 24,
      forks: 7,
      url: "https://github.com/yourusername/node-express-api"
    },
    {
      id: 6,
      name: "react-native-todo",
      description: "Simple todo application built with React Native and Expo.",
      language: "JavaScript",
      stars: 15,
      forks: 2,
      url: "https://github.com/yourusername/react-native-todo"
    },
    {
      id: 7,
      name: "graphql-server",
      description: "GraphQL server implementation with Apollo and MongoDB.",
      language: "TypeScript",
      stars: 19,
      forks: 3,
      url: "https://github.com/yourusername/graphql-server"
    },
    {
      id: 8,
      name: "webpack-boilerplate",
      description: "Modern webpack configuration boilerplate for JavaScript projects.",
      language: "JavaScript",
      stars: 11,
      forks: 3,
      url: "https://github.com/yourusername/webpack-boilerplate"
    }
  ];

  // GitHub stats
  const stats = {
    repos: 32,
    stars: 218,
    followers: 76,
    contributions: 843
  };

  return (
    <div className="py-12 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            My <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">GitHub</span> Projects
          </h1>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            Explore my open source contributions and repositories on GitHub.
          </p>
        </div>
        
        {/* GitHub Stats */}
        <div className="flex flex-wrap justify-center gap-6 mb-16">
          <div className="bg-white dark:bg-black border border-black/[.05] dark:border-white/[.1] rounded-xl p-6 shadow-sm text-center w-[180px]">
            <h2 className="text-3xl font-bold text-blue-600 dark:text-blue-400">{stats.repos}</h2>
            <p className="text-foreground/70">Repositories</p>
          </div>
          <div className="bg-white dark:bg-black border border-black/[.05] dark:border-white/[.1] rounded-xl p-6 shadow-sm text-center w-[180px]">
            <h2 className="text-3xl font-bold text-purple-600 dark:text-purple-400">{stats.stars}</h2>
            <p className="text-foreground/70">Stars</p>
          </div>
          <div className="bg-white dark:bg-black border border-black/[.05] dark:border-white/[.1] rounded-xl p-6 shadow-sm text-center w-[180px]">
            <h2 className="text-3xl font-bold text-green-600 dark:text-green-400">{stats.followers}</h2>
            <p className="text-foreground/70">Followers</p>
          </div>
          <div className="bg-white dark:bg-black border border-black/[.05] dark:border-white/[.1] rounded-xl p-6 shadow-sm text-center w-[180px]">
            <h2 className="text-3xl font-bold text-orange-600 dark:text-orange-400">{stats.contributions}</h2>
            <p className="text-foreground/70">Contributions</p>
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-6">Popular Repositories</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-12">
          {repositories.filter(repo => repo.isPopular).map((repo) => (
            <div 
              key={repo.id} 
              className="bg-white dark:bg-black border border-black/[.05] dark:border-white/[.1] rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-bold text-xl text-blue-600 dark:text-blue-400">{repo.name}</h3>
                <div className="flex space-x-3">
                  <span className="flex items-center text-foreground/60 text-sm">
                    <svg className="w-4 h-4 mr-1" viewBox="0 0 16 16" fill="currentColor">
                      <path fillRule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z"></path>
                    </svg>
                    {repo.stars}
                  </span>
                  <span className="flex items-center text-foreground/60 text-sm">
                    <svg className="w-4 h-4 mr-1" viewBox="0 0 16 16" fill="currentColor">
                      <path fillRule="evenodd" d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z"></path>
                    </svg>
                    {repo.forks}
                  </span>
                </div>
              </div>
              <p className="text-foreground/70 mb-4">{repo.description}</p>
              <div className="flex justify-between items-center">
                <span className="px-2 py-1 text-xs font-medium bg-black/[.05] dark:bg-white/[.06] rounded">
                  {repo.language}
                </span>
                <Link
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline flex items-center"
                >
                  View Repository
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H3a1 1 0 110-2h9.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        <h2 className="text-2xl font-bold mb-6">All Repositories</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {repositories.map((repo) => (
            <div 
              key={repo.id} 
              className="bg-white dark:bg-black border border-black/[.05] dark:border-white/[.1] rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-bold text-lg mb-2">{repo.name}</h3>
              <p className="text-sm text-foreground/70 mb-3 line-clamp-2">{repo.description}</p>
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <span className="flex items-center text-foreground/60 text-xs">
                    <svg className="w-3 h-3 mr-1" viewBox="0 0 16 16" fill="currentColor">
                      <path fillRule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z"></path>
                    </svg>
                    {repo.stars}
                  </span>
                  <span className="flex items-center text-foreground/60 text-xs">
                    <svg className="w-3 h-3 mr-1" viewBox="0 0 16 16" fill="currentColor">
                      <path fillRule="evenodd" d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z"></path>
                    </svg>
                    {repo.forks}
                  </span>
                  <span className="px-1.5 py-0.5 text-xs bg-black/[.05] dark:bg-white/[.06] rounded">
                    {repo.language}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-8 text-center">
          <Link 
            href="https://github.com/yourusername"
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors inline-flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-base h-12 px-6"
            target="_blank"
            rel="noopener noreferrer"
          >
            View GitHub Profile
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H3a1 1 0 110-2h9.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
