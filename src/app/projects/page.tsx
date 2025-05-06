import type { Metadata } from "next";
import ProjectsList from "@/components/projects/ProjectsList";

export const metadata: Metadata = {
  title: "Projects | Deepak Kumar - Full-Stack Developer",
  description: "Explore Deepak Kumar's web development projects showcasing expertise in React, Next.js, and other modern technologies.",
};

export default function ProjectsPage() {
  return (
    <div className="py-12 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            My <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">Projects</span>
          </h1>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            Explore my portfolio of web development projects showcasing skills in frontend, backend, and full-stack development.
          </p>
        </div>

        <ProjectsList />
      </div>
    </div>
  );
}
