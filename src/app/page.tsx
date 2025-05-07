import Hero from '@/components/Home/Hero';
import Services from '@/components/Home/Services';
import About from '@/components/Home/About';
import TechStack from '@/components/Home/TechStack';
import Projects from '@/components/Home/Projects';
import Photos from '@/components/Home/Photos';
import Testimonials from '@/components/Home/Testimonials';

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <About />
      <TechStack />
      <Projects />
      <Photos />
      <Testimonials />
    </>
  );
}
