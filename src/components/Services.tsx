import React from 'react';

type Service = {
  title: string;
  description: string;
  icon: React.ReactNode;
};

export default function Services() {
  const services: Service[] = [
    {
      title: "Web Development",
      description: "Creating responsive, high-performance websites and web applications using modern technologies and frameworks.",
      icon: <WebDevIcon />
    },
    {
      title: "Mobile App Development",
      description: "Crafting native and cross-platform mobile applications that deliver exceptional user experiences on all devices.",
      icon: <MobileDevIcon />
    },
    {
      title: "UI/UX Design",
      description: "Designing intuitive interfaces and seamless user experiences that engage users and solve real problems.",
      icon: <DesignIcon />
    },
    {
      title: "API Development",
      description: "Building robust, scalable APIs and backend services that power your digital products and integrate with third-party services.",
      icon: <ApiIcon />
    }
  ];

  return (
    <section className="py-16 px-4 md:px-8 bg-black/[.02] dark:bg-white/[.02]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
              My Services
            </span>
          </h2>
          <p className="text-foreground/70 max-w-2xl mx-auto text-lg">
            I offer comprehensive solutions for your digital needs, from design to deployment and beyond.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className="p-6 border border-black/[.08] dark:border-white/[.145] rounded-2xl hover:shadow-lg transition-all hover:border-transparent bg-white dark:bg-black"
            >
              <div className="h-14 w-14 mb-4 flex items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 text-blue-600 dark:text-blue-400">
                {service.icon}
              </div>
              <h3 className="font-bold text-xl mb-3">{service.title}</h3>
              <p className="text-foreground/70">{service.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a 
            href="/contact"
            className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-medium hover:underline"
          >
            Discuss your project with me
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}

// Placeholder icon components
function WebDevIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>
  );
}

function MobileDevIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
    </svg>
  );
}

function DesignIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
    </svg>
  );
}

function ApiIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  );
}
