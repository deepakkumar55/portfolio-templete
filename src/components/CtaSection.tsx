import Link from 'next/link';

export default function CtaSection() {
  return (
    <section className="py-20 px-4 md:px-8">
      <div className="max-w-5xl mx-auto text-center">
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-3xl p-8 md:p-16 border border-black/[.05] dark:border-white/[.1] shadow-sm">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Ready to bring your ideas to life?
          </h2>
          
          <p className="text-xl text-foreground/70 mb-10 max-w-2xl mx-auto">
            I'm currently available for freelance work and exciting opportunities. 
            Let's collaborate to create something amazing together.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="#contact"
              className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-base h-12 px-8"
            >
              Hire Me
            </Link>
            <Link 
              href="/resume.pdf"
              target="_blank"
              className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-base h-12 px-8"
            >
              Download Resume
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
          
          <p className="text-sm text-foreground/50 mt-8">
            Usually respond within 24 hours • Open to remote work • Available for projects starting immediately
          </p>
        </div>
      </div>
    </section>
  );
}
