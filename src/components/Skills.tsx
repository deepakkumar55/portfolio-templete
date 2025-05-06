'use client';

import { useEffect, useRef, useState } from 'react';

type SkillCategory = {
  name: string;
  skills: Skill[];
};

type Skill = {
  name: string;
  level: number; // 0-100
};

export default function Skills() {
  const skillCategories: SkillCategory[] = [
    {
      name: "Frontend Development",
      skills: [
        { name: "React/Next.js", level: 90 },
        { name: "JavaScript/TypeScript", level: 85 },
        { name: "HTML/CSS", level: 95 },
        { name: "UI/UX Design", level: 80 },
      ]
    },
    {
      name: "Backend Development",
      skills: [
        { name: "Node.js", level: 85 },
        { name: "Express", level: 80 },
        { name: "API Development", level: 88 },
        { name: "Database Design", level: 75 },
      ]
    },
    {
      name: "Other Skills",
      skills: [
        { name: "Project Management", level: 70 },
        { name: "DevOps/CI/CD", level: 65 },
        { name: "Testing & QA", level: 80 },
        { name: "Technical Writing", level: 75 },
      ]
    }
  ];

  return (
    <section id="skills" className="py-16 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
            My Skills
          </span>
        </h2>
        <p className="text-center text-foreground/70 max-w-2xl mx-auto mb-12">
          A detailed overview of my technical and professional capabilities.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {skillCategories.map((category, idx) => (
            <div 
              key={idx} 
              className="bg-white dark:bg-black border border-black/[.05] dark:border-white/[.1] rounded-xl p-6 shadow-sm"
            >
              <h3 className="font-bold text-xl mb-6">{category.name}</h3>
              <div className="space-y-6">
                {category.skills.map((skill, index) => (
                  <SkillBar key={index} skill={skill} delay={index * 100} />
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-foreground/70">
            My skills are continuously evolving as I embrace new technologies and methodologies.
          </p>
        </div>
      </div>
    </section>
  );
}

function SkillBar({ skill, delay }: { skill: Skill; delay: number }) {
  const [width, setWidth] = useState(0);
  const skillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setTimeout(() => {
            setWidth(skill.level);
          }, delay);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (skillRef.current) {
      observer.observe(skillRef.current);
    }

    return () => {
      if (skillRef.current) {
        observer.disconnect();
      }
    };
  }, [skill.level, delay]);

  // Define skill level labels
  const getSkillLabel = (level: number) => {
    if (level >= 90) return "Expert";
    if (level >= 80) return "Advanced";
    if (level >= 70) return "Proficient";
    if (level >= 50) return "Intermediate";
    return "Beginner";
  };

  return (
    <div ref={skillRef}>
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium">{skill.name}</span>
        <span className="text-xs font-medium text-foreground/60">{getSkillLabel(skill.level)}</span>
      </div>
      <div className="h-2.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${width}%` }}
        ></div>
      </div>
    </div>
  );
}
