import Image from "next/image";
import Hero from "@/components/Hero";
import TechStack from "@/components/TechStack";
import Services from "@/components/Services";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Testimonials from "@/components/Testimonials";
import BlogPreview from "@/components/BlogPreview";
import CtaSection from "@/components/CtaSection";
import Experience from "@/components/Experience";
import Achievements from "@/components/Achievements";
import Skills from "@/components/Skills";

export default function Home() {
  return (
      <main className="flex flex-col">
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Achievements />
        <Services />
        <Projects />
        <TechStack />
        <Testimonials />
        <BlogPreview />
        <CtaSection />
        <Contact />
      </main>
  );
}
