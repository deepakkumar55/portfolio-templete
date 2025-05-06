import Image from "next/image";
import Link from "next/link";

export type Project = {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  demoLink: string;
  codeLink: string;
  featured?: boolean;
  longDescription?: string;
};

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <div 
      className="border border-black/[.08] dark:border-white/[.145] rounded-xl overflow-hidden hover:shadow-lg transition-all"
    >
      <div className="relative h-60 bg-gradient-to-br from-blue-400/20 to-purple-500/20">
        <div className="absolute inset-0 flex items-center justify-center text-foreground/40 text-xl">
          Project Screenshot
        </div>
        {/* Uncomment when you have images
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        */}
      </div>
      
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-3">{project.title}</h2>
        <p className="text-foreground/70 mb-4">
          {project.longDescription || project.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {project.technologies.map((tech, idx) => (
            <span 
              key={idx} 
              className="text-xs font-[family-name:var(--font-geist-mono)] bg-black/[.05] dark:bg-white/[.06] px-2 py-1 rounded"
            >
              {tech}
            </span>
          ))}
        </div>
        
        <div className="flex gap-4">
          <Link 
            href={project.demoLink}
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm py-2 px-4"
            target="_blank"
            rel="noopener noreferrer"
          >
            Live Demo
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H3a1 1 0 110-2h9.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
          <Link 
            href={project.codeLink}
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] font-medium text-sm py-2 px-4"
            target="_blank"
            rel="noopener noreferrer"
          >
            View Code
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
