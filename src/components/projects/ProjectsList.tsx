import ProjectCard, { Project } from "@/components/projects/ProjectCard";

export const projectsData: Project[] = [
  {
    id: 1,
    title: "E-commerce Platform",
    description: "A fully responsive e-commerce platform with product catalog, shopping cart, and secure checkout functionality.",
    longDescription: "A comprehensive e-commerce solution built with Next.js and integrated with Stripe for payment processing. Features include product filtering, search functionality, user authentication, order tracking, and an admin dashboard for inventory management. The platform was designed with performance and SEO in mind, achieving excellent Lighthouse scores.",
    image: "/placeholder-project.jpg",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Stripe", "PostgreSQL", "Prisma"],
    demoLink: "https://example.com",
    codeLink: "https://github.com/yourusername/project",
    featured: true
  },
  {
    id: 2,
    title: "Task Management App",
    description: "A collaborative task management application with real-time updates and team collaboration features.",
    longDescription: "A productivity tool designed for remote teams to manage projects effectively. Built with React and Firebase, it enables real-time collaboration, task assignment, progress tracking, and automated notifications. The app includes customizable dashboards, Kanban boards, and detailed analytics to help teams improve workflow efficiency.",
    image: "/placeholder-project.jpg",
    technologies: ["React", "Firebase", "Material UI", "Redux", "Jest", "GitHub Actions"],
    demoLink: "https://example.com",
    codeLink: "https://github.com/yourusername/project"
  },
  // ...existing code for remaining projects...
  {
    id: 6,
    title: "Budget Management System",
    description: "Personal finance application for expense tracking, budget planning, and financial insights.",
    longDescription: "A comprehensive financial management tool that helps users track expenses, plan budgets, and gain insights into their spending habits. Features include transaction categorization, recurring expense management, budget alerts, and visualization of spending patterns. The application uses bank-level encryption to ensure user financial data remains secure.",
    image: "/placeholder-project.jpg",
    technologies: ["React", "Node.js", "PostgreSQL", "Chart.js", "Plaid API", "AWS"],
    demoLink: "https://example.com",
    codeLink: "https://github.com/yourusername/project"
  }
];

export default function ProjectsList({ projects = projectsData }: { projects?: Project[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}
