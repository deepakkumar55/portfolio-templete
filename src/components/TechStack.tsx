import { ReactNode } from 'react';

type TechCategory = {
  name: string;
  technologies: Technology[];
};

type Technology = {
  name: string;
  icon: ReactNode;
};

export default function TechStack() {
  const techCategories: TechCategory[] = [
    {
      name: "Frontend",
      technologies: [
        { name: "React", icon: <IconReact /> },
        { name: "Next.js", icon: <IconNextjs /> },
        { name: "TypeScript", icon: <IconTypeScript /> },
        { name: "Tailwind CSS", icon: <IconTailwind /> },
      ]
    },
    {
      name: "Backend",
      technologies: [
        { name: "Node.js", icon: <IconNode /> },
        { name: "Express", icon: <IconExpress /> },
        { name: "MongoDB", icon: <IconMongoDB /> },
        { name: "PostgreSQL", icon: <IconPostgreSQL /> },
      ]
    },
    {
      name: "Tools & Other",
      technologies: [
        { name: "Git", icon: <IconGit /> },
        { name: "Docker", icon: <IconDocker /> },
        { name: "AWS", icon: <IconAWS /> },
        { name: "Jest", icon: <IconJest /> },
      ]
    }
  ];

  return (
    <section className="py-16 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
            Tech Stack
          </span>
        </h2>
        <p className="text-center text-foreground/70 max-w-3xl mx-auto mb-12 text-lg">
          I'm proficient with a variety of technologies and constantly expanding my toolkit to build better digital experiences.
        </p>
        
        <div className="grid gap-12">
          {techCategories.map((category) => (
            <div key={category.name} className="space-y-6">
              <h3 className="text-xl md:text-2xl font-semibold font-[family-name:var(--font-geist-mono)] text-foreground/90">
                {category.name}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 md:gap-8">
                {category.technologies.map((tech) => (
                  <div 
                    key={tech.name}
                    className="flex flex-col items-center gap-3 p-4 border border-black/[.08] dark:border-white/[.145] rounded-lg hover:border-transparent hover:shadow-lg transition-all hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a]"
                  >
                    <div className="text-3xl text-foreground/80">
                      {tech.icon}
                    </div>
                    <span className="font-medium text-sm">
                      {tech.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Placeholder icon components
// Replace these with actual SVG icons or import from a library like react-icons
function IconReact() {
  return <div className="w-8 h-8 bg-[#61DAFB] rounded-full flex items-center justify-center text-white">R</div>;
}

function IconNextjs() {
  return <div className="w-8 h-8 bg-black dark:bg-white rounded-full flex items-center justify-center text-white dark:text-black">N</div>;
}

function IconTypeScript() {
  return <div className="w-8 h-8 bg-[#3178C6] rounded-full flex items-center justify-center text-white">TS</div>;
}

function IconTailwind() {
  return <div className="w-8 h-8 bg-[#06B6D4] rounded-full flex items-center justify-center text-white">TW</div>;
}

function IconNode() {
  return <div className="w-8 h-8 bg-[#339933] rounded-full flex items-center justify-center text-white">N</div>;
}

function IconExpress() {
  return <div className="w-8 h-8 bg-[#000000] rounded-full flex items-center justify-center text-white">Ex</div>;
}

function IconMongoDB() {
  return <div className="w-8 h-8 bg-[#47A248] rounded-full flex items-center justify-center text-white">M</div>;
}

function IconPostgreSQL() {
  return <div className="w-8 h-8 bg-[#336791] rounded-full flex items-center justify-center text-white">PG</div>;
}

function IconGit() {
  return <div className="w-8 h-8 bg-[#F05032] rounded-full flex items-center justify-center text-white">G</div>;
}

function IconDocker() {
  return <div className="w-8 h-8 bg-[#2496ED] rounded-full flex items-center justify-center text-white">D</div>;
}

function IconAWS() {
  return <div className="w-8 h-8 bg-[#FF9900] rounded-full flex items-center justify-center text-black">AWS</div>;
}

function IconJest() {
  return <div className="w-8 h-8 bg-[#C21325] rounded-full flex items-center justify-center text-white">J</div>;
}
