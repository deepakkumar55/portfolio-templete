export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  date: string;
  category: string;
  coverImage: string;
  excerpt: string;
  content: string;
  readTime: number;
  tags: string[];
  featured?: boolean;
  externalUrl?: string; // Add this field for external blog links
  author: {
    name: string;
    avatar: string;
  };
}
