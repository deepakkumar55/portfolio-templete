import Image from "next/image";

export default function About() {
  return (
    <section className="py-16 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
            About Me
          </span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden">
            {/* Placeholder for your image */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 opacity-80"></div>
            <div className="absolute inset-0 flex items-center justify-center text-white text-4xl font-bold">
              Your Photo Here
            </div>
            {/* Replace with actual image 
            <Image 
              src="/about-image.jpg" 
              alt="Deepak Kumar" 
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            /> 
            */}
          </div>

          <div className="space-y-6">
            <h3 className="text-2xl font-bold">Deepak Kumar</h3>
            <p className="text-foreground/80 leading-relaxed">
              I'm a passionate full-stack developer with over 5 years of experience creating 
              modern web applications and digital experiences. My journey in tech started when 
              I built my first website at the age of 15, and I've been hooked ever since.
            </p>
            
            <p className="text-foreground/80 leading-relaxed">
              I specialize in React, Next.js, Node.js, and modern JavaScript. I'm dedicated to 
              writing clean, maintainable code and building applications that are not only 
              functional but also intuitive and accessible for all users.
            </p>

            <div className="pt-4">
              <h4 className="text-xl font-semibold mb-3">Experience</h4>
              <ul className="space-y-3">
                <li className="flex gap-4">
                  <div className="h-10 w-10 flex-shrink-0 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 dark:text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                      <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                    </svg>
                  </div>
                  <div>
                    <h5 className="font-medium">Senior Developer</h5>
                    <p className="text-sm text-foreground/70">Company Name • 2020 - Present</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="h-10 w-10 flex-shrink-0 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 dark:text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                      <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                    </svg>
                  </div>
                  <div>
                    <h5 className="font-medium">Web Developer</h5>
                    <p className="text-sm text-foreground/70">Previous Company • 2018 - 2020</p>
                  </div>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-xl font-semibold mb-3">Education</h4>
              <div className="flex gap-4">
                <div className="h-10 w-10 flex-shrink-0 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600 dark:text-purple-400" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                  </svg>
                </div>
                <div>
                  <h5 className="font-medium">B.Tech in Computer Science</h5>
                  <p className="text-sm text-foreground/70">University Name • 2014 - 2018</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
