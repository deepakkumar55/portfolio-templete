import React from 'react';

type ExperienceItem = {
  id: number;
  title: string;
  company: string;
  location: string;
  period: string;
  description: string[];
  logo?: string;
};

export default function Experience() {
  const experiences: ExperienceItem[] = [
    {
      id: 1,
      title: "Senior Full-Stack Developer",
      company: "Tech Solutions Inc.",
      location: "Remote",
      period: "Jan 2022 - Present",
      description: [
        "Led development of the company's flagship web application, improving performance by 40%",
        "Mentored junior developers and conducted code reviews to ensure code quality",
        "Implemented CI/CD pipelines using GitHub Actions, reducing deployment time by 60%",
        "Collaborated with UX team to overhaul the product interface, resulting in 25% increase in user engagement"
      ]
    },
    {
      id: 2,
      title: "Frontend Developer",
      company: "Digital Innovations",
      location: "New York",
      period: "Mar 2020 - Dec 2021",
      description: [
        "Developed responsive web interfaces using React and Next.js for enterprise clients",
        "Rebuilt legacy applications using modern frameworks, improving load times by 30%",
        "Collaborated with cross-functional teams to launch 5 major product features",
        "Optimized application performance and implemented best practices for accessibility"
      ]
    },
    {
      id: 3,
      title: "Web Developer Intern",
      company: "WebTech Startup",
      location: "San Francisco",
      period: "Jun 2019 - Feb 2020",
      description: [
        "Built and maintained client websites using HTML, CSS, and JavaScript",
        "Assisted senior developers with feature implementation and bug fixing",
        "Participated in daily stand-ups and sprint planning meetings",
        "Created documentation for internal processes and development workflows"
      ]
    }
  ];

  return (
    <section id="experience" className="py-16 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
            Work Experience
          </span>
        </h2>
        <p className="text-center text-foreground/70 max-w-2xl mx-auto mb-12">
          My professional journey and the companies I've had the pleasure to work with.
        </p>

        <div className="relative">
          {/* Timeline line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gray-200 dark:bg-gray-800"></div>
          
          {/* Experience items */}
          <div className="space-y-12">
            {experiences.map((experience, index) => (
              <div key={experience.id} className={`relative flex items-center justify-between md:justify-normal ${index % 2 === 0 ? 'flex-col md:flex-row' : 'flex-col md:flex-row-reverse'}`}>
                {/* Time period - Mobile (centered) */}
                <div className="md:hidden text-sm font-semibold text-blue-600 dark:text-blue-400 mb-4">
                  {experience.period}
                </div>
                
                {/* Content */}
                <div className={`md:w-5/12 bg-white dark:bg-black border border-black/[.05] dark:border-white/[.1] rounded-xl p-6 shadow-sm ${index % 2 === 0 ? 'md:text-right' : ''}`}>
                  <div className="flex items-center mb-2 justify-normal gap-2">
                    {/* Logo placeholder */}
                    <div className={`w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center ${index % 2 !== 0 ? 'order-1 ml-2' : 'order-none'}`}>
                      {experience.company.charAt(0)}
                    </div>
                    
                    <h3 className="font-bold text-xl">{experience.title}</h3>
                  </div>
                  <div className="mb-3">
                    <p className="text-foreground/80 font-medium">{experience.company}</p>
                    <p className="text-sm text-foreground/60">{experience.location}</p>
                  </div>
                  
                  <ul className={`text-sm space-y-2 list-disc ${index % 2 === 0 ? 'ml-5 md:mr-5 md:ml-0 text-left md:text-right md:list-inside' : 'ml-5 list-inside'}`}>
                    {experience.description.map((item, idx) => (
                      <li key={idx} className="text-foreground/70">{item}</li>
                    ))}
                  </ul>
                </div>
                
                {/* Circle in the middle */}
                <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-5 h-5 rounded-full bg-blue-600 dark:bg-blue-500 border-4 border-white dark:border-black"></div>
                
                {/* Time period - Desktop */}
                <div className="hidden md:block md:w-5/12 py-4">
                  <span className={`text-sm font-semibold text-blue-600 dark:text-blue-400 ${index % 2 === 0 ? '' : 'text-right block'}`}>
                    {experience.period}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
