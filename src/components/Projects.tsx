import Link from "next/link";
import ProjectCard from "@/components/projects/ProjectCard";
import { projectsData } from "@/components/projects/ProjectsList";

export default function Projects() {
  // Get only featured projects or first 4
  const featuredProjects = projectsData
    .filter(project => project.featured)
    .concat(projectsData.filter(project => !project.featured))
    .slice(0, 4);

  return (
    <section id="projects" className="py-16 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
            Featured Projects
          </span>
        </h2>
        <p className="text-center text-foreground/70 max-w-3xl mx-auto mb-12">
          A selection of my recent work across web and mobile development. Each project demonstrates different skills and technologies.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {featuredProjects.map((project) => (
            <div key={project.id} className={project.featured ? 'md:col-span-2' : ''}>
              <ProjectCard project={{
                ...project,
                // Use short description on homepage
                longDescription: undefined 
              }} />
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Link 
            href="/projects"
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors inline-flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-base h-12 px-6"
          >
            View All Projects
          </Link>
        </div>
      </div>
    </section>
  );
}
