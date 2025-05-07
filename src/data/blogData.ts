import { BlogPost } from '@/types/blog';

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Building Responsive Web Apps with Next.js and Tailwind CSS',
    slug: 'building-responsive-web-apps-nextjs-tailwind',
    date: 'March 15, 2023',
    category: 'Web Development',
    coverImage: '/blog/nextjs-tailwind.jpg',
    excerpt: 'A comprehensive guide to creating responsive and performant web applications using Next.js and Tailwind CSS.',
    content: `
      # Building Responsive Web Apps with Next.js and Tailwind CSS
      
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eu ultricies ultricies, nisl nisl aliquam nisl, euismod euismod nisl nisl eu nisl.
      
      ## Setting Up Your Project
      
      First, let's create a new Next.js project with Tailwind CSS...
      
      ## Creating Responsive Layouts
      
      When designing for multiple screen sizes...
      
      ## Optimizing Performance
      
      To ensure your application loads quickly...
      
      ## Conclusion
      
      By combining the power of Next.js and the utility-first approach of Tailwind CSS...
    `,
    readTime: 8,
    tags: ['Next.js', 'Tailwind CSS', 'Responsive Design', 'Frontend'],
    featured: true,
    externalUrl: 'http://thecampuscoders.com/blogs/building-responsive-web-apps-nextjs-tailwind',
    author: {
      name: 'Deepak Kumar',
      avatar: '/profile.png'
    }
  },
  {
    id: '2',
    title: 'Creating Animated UI Components with Framer Motion',
    slug: 'creating-animated-ui-framer-motion',
    date: 'February 28, 2023',
    category: 'UI/UX Design',
    coverImage: '/blog/framer-motion.jpg',
    excerpt: 'Learn how to build engaging user interfaces with smooth animations using the Framer Motion library for React.',
    content: '# Creating Animated UI Components with Framer Motion...',
    readTime: 6,
    tags: ['React', 'Framer Motion', 'Animation', 'UI Design'],
    externalUrl: 'http://thecampuscoders.com/blogs/creating-animated-ui-framer-motion',
    author: {
      name: 'Deepak Kumar',
      avatar: '/profile.png'
    }
  },
  {
    id: '3',
    title: 'Building a RESTful API with Node.js and Express',
    slug: 'building-restful-api-nodejs-express',
    date: 'January 20, 2023',
    category: 'Backend Development',
    coverImage: '/blog/nodejs-api.jpg',
    excerpt: 'A step-by-step guide to creating a robust and scalable RESTful API using Node.js and Express framework.',
    content: '# Building a RESTful API with Node.js and Express...',
    readTime: 10,
    tags: ['Node.js', 'Express', 'API', 'Backend'],
    externalUrl: 'http://thecampuscoders.com/blogs/building-restful-api-nodejs-express',
    author: {
      name: 'Deepak Kumar',
      avatar: '/profile.png'
    }
  },
  {
    id: '4',
    title: 'Getting Started with React Native for Cross-Platform Apps',
    slug: 'getting-started-react-native',
    date: 'December 12, 2022',
    category: 'Mobile Development',
    coverImage: '/blog/react-native.jpg',
    excerpt: 'Everything you need to know to start building mobile applications for iOS and Android with React Native.',
    content: '# Getting Started with React Native for Cross-Platform Apps...',
    readTime: 12,
    tags: ['React Native', 'Mobile Development', 'iOS', 'Android'],
    externalUrl: 'http://thecampuscoders.com/blogs/getting-started-react-native',
    author: {
      name: 'Deepak Kumar',
      avatar: '/profile.png'
    }
  },
  {
    id: '5',
    title: 'The Future of Web Development: Web Assembly and Beyond',
    slug: 'future-web-development-wasm',
    date: 'November 5, 2022',
    category: 'Web Development',
    coverImage: '/blog/web-assembly.jpg',
    excerpt: 'Exploring how Web Assembly is changing the landscape of web development and what it means for the future.',
    content: '# The Future of Web Development: Web Assembly and Beyond...',
    readTime: 9,
    tags: ['WebAssembly', 'Future Tech', 'Web Development', 'Performance'],
    externalUrl: 'http://thecampuscoders.com/blogs/future-web-development-wasm',
    author: {
      name: 'Deepak Kumar',
      avatar: '/profile.png'
    }
  },
  {
    id: '6',
    title: 'Understanding TypeScript: Types, Interfaces and Beyond',
    slug: 'understanding-typescript-types-interfaces',
    date: 'October 18, 2022',
    category: 'Programming',
    coverImage: '/blog/typescript.jpg',
    excerpt: 'A deep dive into TypeScript features that will help you write more maintainable and error-free code.',
    content: '# Understanding TypeScript: Types, Interfaces and Beyond...',
    readTime: 7,
    tags: ['TypeScript', 'JavaScript', 'Types', 'Development'],
    externalUrl: 'http://thecampuscoders.com/blogs/understanding-typescript-types-interfaces',
    author: {
      name: 'Deepak Kumar',
      avatar: '/profile.png'
    }
  }
];
