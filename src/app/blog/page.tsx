import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Blog | Deepak Kumar - Full-Stack Developer",
  description: "Articles and insights about web development, programming, and technology by Deepak Kumar.",
};

type BlogPost = {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  category: string;
  slug: string;
  readTime?: string;
};

export default function BlogPage() {
  const blogPosts: BlogPost[] = [
    {
      id: 1,
      title: "Building Responsive UIs with Tailwind CSS",
      excerpt: "Learn how to create beautiful, responsive user interfaces using Tailwind CSS utility classes. This guide covers best practices, common patterns, and optimization techniques.",
      image: "/blog-post-1.jpg",
      date: "June 15, 2023",
      category: "Frontend",
      slug: "building-responsive-uis-with-tailwind",
      readTime: "8 min read"
    },
    {
      id: 2,
      title: "Server-Side Rendering vs. Static Site Generation in Next.js",
      excerpt: "Exploring the differences between SSR and SSG, and when to use each approach in your Next.js projects. Understand the performance implications and best use cases for each rendering strategy.",
      image: "/blog-post-2.jpg",
      date: "August 22, 2023",
      category: "Web Development",
      slug: "ssr-vs-ssg-nextjs",
      readTime: "12 min read"
    },
    {
      id: 3,
      title: "Creating a REST API with Node.js and Express",
      excerpt: "Step-by-step guide to building a robust REST API using Node.js and Express for your web applications. Learn about routing, middleware, authentication, and database integration.",
      image: "/blog-post-3.jpg",
      date: "October 10, 2023",
      category: "Backend",
      slug: "creating-rest-api-nodejs-express",
      readTime: "15 min read"
    },
    {
      id: 4,
      title: "Mastering TypeScript: Advanced Types and Patterns",
      excerpt: "Dive deep into TypeScript's advanced type system. Learn about conditional types, mapped types, type guards, and design patterns that leverage TypeScript's powerful type system.",
      image: "/blog-post-4.jpg",
      date: "November 28, 2023",
      category: "TypeScript",
      slug: "mastering-typescript-advanced-types",
      readTime: "10 min read"
    },
    {
      id: 5,
      title: "State Management in React: Context API vs Redux",
      excerpt: "Compare different approaches to state management in React applications. Understand when to use Context API for simpler state needs and when Redux brings more benefits.",
      image: "/blog-post-5.jpg",
      date: "January 14, 2024",
      category: "React",
      slug: "state-management-react-context-redux",
      readTime: "11 min read"
    },
    {
      id: 6,
      title: "Optimizing Website Performance: Practical Tips",
      excerpt: "Learn practical strategies to improve website loading times and overall performance. Covers image optimization, code splitting, lazy loading, and modern browser APIs.",
      image: "/blog-post-6.jpg",
      date: "March 5, 2024",
      category: "Performance",
      slug: "optimizing-website-performance",
      readTime: "9 min read"
    },
    {
      id: 7,
      title: "Introduction to GraphQL: Beyond REST APIs",
      excerpt: "Discover how GraphQL can solve common problems with REST APIs. Learn about queries, mutations, schema design, and integrating GraphQL with your existing backend.",
      image: "/blog-post-7.jpg",
      date: "April 18, 2024",
      category: "API Development",
      slug: "introduction-to-graphql",
      readTime: "14 min read"
    }
  ];
  
  // Group posts by year and month for better organization
  const groupedPosts: Record<string, BlogPost[]> = {};
  
  blogPosts.forEach(post => {
    const date = new Date(post.date);
    const year = date.getFullYear().toString();
    
    if (!groupedPosts[year]) {
      groupedPosts[year] = [];
    }
    
    groupedPosts[year].push(post);
  });
  
  // Sort years in descending order (most recent first)
  const sortedYears = Object.keys(groupedPosts).sort((a, b) => parseInt(b) - parseInt(a));
  
  return (
    <div className="py-12 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            My <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">Blog</span>
          </h1>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            Articles and insights about web development, programming best practices, and technology trends.
          </p>
        </div>

        {/* Featured post - most recent post */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Featured Post</h2>
          <div className="bg-white dark:bg-black border border-black/[.05] dark:border-white/[.1] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className="md:flex">
              <div className="md:w-2/5 h-60 md:h-auto relative bg-gradient-to-br from-blue-400/20 to-purple-500/20">
                <div className="absolute inset-0 flex items-center justify-center text-foreground/40 text-xl">
                  Featured Image
                </div>
                {/* Uncomment when you have images
                <Image
                  src={blogPosts[0].image}
                  alt={blogPosts[0].title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
                */}
              </div>
              <div className="p-6 md:w-3/5">
                <div className="flex items-center mb-3 text-sm">
                  <span className="text-blue-600 dark:text-blue-400 font-medium">{blogPosts[0].category}</span>
                  <span className="mx-2 text-foreground/30">•</span>
                  <span className="text-foreground/60">{blogPosts[0].readTime}</span>
                </div>
                
                <h2 className="text-2xl font-bold mb-3 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  <Link href={`/blog/${blogPosts[0].slug}`}>
                    {blogPosts[0].title}
                  </Link>
                </h2>
                
                <p className="text-foreground/70 mb-5">{blogPosts[0].excerpt}</p>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-foreground/60">{blogPosts[0].date}</span>
                  <Link 
                    href={`/blog/${blogPosts[0].slug}`}
                    className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                  >
                    Read article
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H3a1 1 0 110-2h9.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Blog post list by year */}
        {sortedYears.map(year => (
          <div key={year} className="mb-12">
            <h2 className="text-2xl font-bold mb-6">{year}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {groupedPosts[year].map((post) => (
                <article key={post.id} className="bg-white dark:bg-black border border-black/[.05] dark:border-white/[.1] rounded-xl overflow-hidden hover:shadow-lg transition-all">
                  <div className="relative h-48 bg-gradient-to-br from-blue-400/20 to-purple-500/20">
                    <div className="absolute inset-0 flex items-center justify-center text-foreground/40 text-xl">
                      Featured Image
                    </div>
                    {/* Uncomment when you have images
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    */}
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3 text-sm">
                      <span className="text-blue-600 dark:text-blue-400 font-medium">{post.category}</span>
                      <span className="text-foreground/60">{post.readTime}</span>
                    </div>
                    
                    <h2 className="text-xl font-bold mb-2 line-clamp-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                      <Link href={`/blog/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h2>
                    
                    <p className="text-foreground/70 mb-4 line-clamp-3">{post.excerpt}</p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-foreground/60">{post.date}</span>
                      <Link 
                        href={`/blog/${post.slug}`}
                        className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                      >
                        Read more
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H3a1 1 0 110-2h9.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
