'use client';

import { useEffect, useRef, useState } from 'react';

type Stat = {
  label: string;
  value: number;
  suffix?: string;
  duration?: number;
};

export default function Achievements() {
  const stats: Stat[] = [
    { label: "Years Experience", value: 5, suffix: "+", duration: 2000 },
    { label: "Projects Completed", value: 75, suffix: "+", duration: 2500 },
    { label: "Satisfied Clients", value: 40, suffix: "+", duration: 2300 },
    { label: "Code Contributions", value: 1200, suffix: "+", duration: 2800 }
  ];

  return (
    <section className="py-16 px-4 md:px-8 bg-black/[.02] dark:bg-white/[.02]">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
            Achievements
          </span>
        </h2>
        <p className="text-center text-foreground/70 max-w-2xl mx-auto mb-12">
          Numbers that reflect my professional journey and commitment to excellence.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
          {stats.map((stat, index) => (
            <StatCounter key={index} stat={stat} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StatCounter({ stat }: { stat: Stat }) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const counterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => {
      if (counterRef.current) {
        observer.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let start = 0;
    const end = stat.value;
    const duration = stat.duration || 2000;
    const increment = Math.ceil(end / (duration / 16)); // Update roughly every 16ms
    
    // Don't want to increment by less than 1
    const step = Math.max(1, increment);

    const timer = setInterval(() => {
      setCount(current => {
        const next = Math.min(current + step, end);
        if (next >= end) {
          clearInterval(timer);
        }
        return next;
      });
    }, 16);

    return () => clearInterval(timer);
  }, [isVisible, stat.value, stat.duration]);

  return (
    <div ref={counterRef} className="text-center p-6 bg-white dark:bg-black rounded-xl border border-black/[.05] dark:border-white/[.1] shadow-sm hover:shadow-md transition-shadow">
      <div className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
        {count}{stat.suffix || ''}
      </div>
      <div className="text-foreground/70 font-medium">{stat.label}</div>
    </div>
  );
}
