import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="min-h-[80vh] flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 py-12 px-4 md:px-8">
      <div className="flex flex-col gap-6 max-w-2xl">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
          <span className="block">Hi, I'm</span>
          <span className="block text-5xl md:text-7xl bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
            Deepak Kumar
          </span>
        </h1>
        
        <h2 className="text-xl md:text-2xl font-[family-name:var(--font-geist-mono)] text-foreground/80">
          Full-Stack Developer
        </h2>
        
        <p className="text-lg text-foreground/70 leading-relaxed">
          I create engaging digital experiences with modern web technologies.
          Specialized in building responsive, accessible, and performant web applications.
        </p>
        
        <div className="flex flex-wrap gap-4 mt-4">
          <Link 
            href="/projects"
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-base h-12 px-6"
          >
            View My Work
          </Link>
          <Link 
            href="/contact"
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-base h-12 px-6"
          >
            Contact Me
          </Link>
        </div>
      </div>
      
      <div className="relative w-64 h-64 md:w-80 md:h-80">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full opacity-20 blur-xl"></div>
        <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-foreground/10">
          {/* Replace with your profile image */}
          <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-6xl">
            YN
          </div>
          {/* Uncomment and use when you have an image
          <Image
            src="/profile.jpg"
            alt="Your Name"
            fill
            sizes="(max-width: 768px) 16rem, 20rem"
            className="object-cover"
            priority
          />
          */}
        </div>
      </div>
    </section>
  );
}
