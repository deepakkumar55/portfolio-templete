import Image from 'next/image';
import Link from 'next/link';

type BlogPost = {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  category: string;
  slug: string;
};

export default function BlogPreview() {
  const blogPosts: BlogPost[] = [
    {
      id: 1,
      title: 'Building Responsive UIs with Tailwind CSS',
      excerpt: 'Learn how to create beautiful, responsive user interfaces using Tailwind CSS utility classes.',
      image: '/blog-post-1.jpg',
      date: 'June 15, 2023',
      category: 'Frontend',
      slug: 'building-responsive-uis-with-tailwind'
    },
    {
      id: 2,
      title: 'Server-Side Rendering vs. Static Site Generation in Next.js',
      excerpt: 'Exploring the differences between SSR and SSG, and when to use each approach in your Next.js projects.',
      image: '/blog-post-2.jpg',
      date: 'August 22, 2023',
      category: 'Web Development',
      slug: 'ssr-vs-ssg-nextjs'
    },
    {
      id: 3,
      title: 'Creating a REST API with Node.js and Express',
      excerpt: 'Step-by-step guide to building a robust REST API using Node.js and Express for your web applications.',
      image: '/blog-post-3.jpg',
      date: 'October 10, 2023',
      category: 'Backend',
      slug: 'creating-rest-api-nodejs-express'
    }
  ];

  return (
    <section id="blog" className="py-16 px-4 md:px-8 bg-black/[.02] dark:bg-white/[.02]">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
            Latest Articles
          </span>
        </h2>
        <p className="text-center text-foreground/70 max-w-2xl mx-auto mb-12">
          I share my knowledge and insights about web development, design patterns, and technology trends.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article key={post.id} className="bg-white dark:bg-black border border-black/[.05] dark:border-white/[.1] rounded-xl overflow-hidden hover:shadow-lg transition-all">
              <div className="relative h-48 bg-gradient-to-br from-blue-400/20 to-purple-500/20">
                {/* Replace with actual blog post featured images */}
                <div className="absolute inset-0 flex items-center justify-center text-foreground/40 text-xl">
                  Featured Image
                </div>
                {/* Uncomment when you have images
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                */}
              </div>
              
              <div className="p-6">
                <div className="flex items-center mb-3 text-sm">
                  <span className="text-blue-600 dark:text-blue-400 font-medium">{post.category}</span>
                  <span className="mx-2 text-foreground/30">•</span>
                  <span className="text-foreground/60">{post.date}</span>
                </div>
                
                <h3 className="text-xl font-bold mb-2 line-clamp-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  <Link href={`/blog/${post.slug}`}>
                    {post.title}
                  </Link>
                </h3>
                
                <p className="text-foreground/70 mb-4 line-clamp-3">{post.excerpt}</p>
                
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
            </article>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Link 
            href="/blog"
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors inline-flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-base h-12 px-6"
          >
            View All Articles
          </Link>
        </div>
      </div>
    </section>
  );
}
