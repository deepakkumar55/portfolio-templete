"use client";
import Image from 'next/image';
import { useState } from 'react';

type Testimonial = {
  id: number;
  name: string;
  role: string;
  company: string;
  image: string;
  quote: string;
};

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: 'Alex Johnson',
      role: 'CEO',
      company: 'TechSolutions Inc',
      image: '/testimonial-1.jpg', // Replace with actual image paths
      quote: 'Deepak delivered exceptional results for our web application. His technical expertise and attention to detail resulted in a product that exceeded our expectations.',
    },
    {
      id: 2,
      name: 'Sarah Williams',
      role: 'Product Manager',
      company: 'InnovateX',
      image: '/testimonial-2.jpg',
      quote: 'Working with Deepak was a pleasure. He understood our requirements perfectly and delivered a beautiful, functional website that has significantly improved our online presence.',
    },
    {
      id: 3,
      name: 'Michael Chen',
      role: 'CTO',
      company: 'StartupFlow',
      image: '/testimonial-3.jpg',
      quote: 'Deepak\'s deep knowledge of both frontend and backend technologies made him the perfect developer for our complex project. His solutions were elegant and efficient.',
    },
  ];

  return (
    <section id="testimonials" className="py-16 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
            Client Testimonials
          </span>
        </h2>
        <p className="text-center text-foreground/70 max-w-2xl mx-auto mb-12">
          Don't just take my word for it. Here's what clients and colleagues have to say about working with me.
        </p>

        <div className="relative">
          {/* Desktop version with multiple cards visible */}
          <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div 
                key={testimonial.id}
                className="bg-white dark:bg-black border border-black/[.05] dark:border-white/[.1] rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start mb-4">
                  <div className="mr-4 relative w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-blue-500/20 to-purple-500/20">
                    {/* Replace with actual images */}
                    <div className="absolute inset-0 flex items-center justify-center text-blue-600 dark:text-blue-400 font-medium">
                      {testimonial.name.charAt(0)}
                    </div>
                    {/* Uncomment when you have images
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                    */}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{testimonial.name}</h3>
                    <p className="text-sm text-foreground/70">
                      {testimonial.role}, {testimonial.company}
                    </p>
                  </div>
                </div>
                <div className="relative">
                  <svg className="absolute top-0 left-0 w-8 h-8 text-blue-200 dark:text-blue-900/40 -translate-x-4 -translate-y-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 14">
                    <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z"/>
                  </svg>
                  <blockquote className="pl-5 pt-2">
                    <p className="text-foreground/80 italic">{testimonial.quote}</p>
                  </blockquote>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile version with carousel */}
          <div className="md:hidden">
            <div className="bg-white dark:bg-black border border-black/[.05] dark:border-white/[.1] rounded-xl p-6 shadow-sm">
              <div className="flex items-start mb-4">
                <div className="mr-4 relative w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-blue-500/20 to-purple-500/20">
                  <div className="absolute inset-0 flex items-center justify-center text-blue-600 dark:text-blue-400 font-medium">
                    {testimonials[activeIndex].name.charAt(0)}
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-lg">{testimonials[activeIndex].name}</h3>
                  <p className="text-sm text-foreground/70">
                    {testimonials[activeIndex].role}, {testimonials[activeIndex].company}
                  </p>
                </div>
              </div>
              <div className="relative">
                <svg className="absolute top-0 left-0 w-8 h-8 text-blue-200 dark:text-blue-900/40 -translate-x-4 -translate-y-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 14">
                  <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z"/>
                </svg>
                <blockquote className="pl-5 pt-2">
                  <p className="text-foreground/80 italic">{testimonials[activeIndex].quote}</p>
                </blockquote>
              </div>

              {/* Mobile Navigation Dots */}
              <div className="flex justify-center mt-6 space-x-3">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`w-2.5 h-2.5 rounded-full ${index === activeIndex ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-700'}`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
