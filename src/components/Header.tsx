'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Check if the current path matches the given href
  const isActive = (href: string) => {
    return pathname === href;
  };

  // Navigation items
  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/projects', label: 'Projects' },
    { href: '/photos', label: 'Photos' },
    { href: '/github', label: 'GitHub' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Contact' }
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 md:px-8 ${
        isScrolled ? 'py-3 bg-background/90 backdrop-blur-md shadow-sm' : 'py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="font-bold text-xl">
          Deepak<span className="text-blue-600">Kumar</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          {navItems.map((item) => (
            <NavLink 
              key={item.href} 
              href={item.href} 
              active={isActive(item.href)}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-foreground p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-background border-t border-black/[.08] dark:border-white/[.145] mt-3">
          <div className="flex flex-col py-4">
            {navItems.map((item) => (
              <MobileNavLink 
                key={item.href}
                href={item.href} 
                onClick={() => setMobileMenuOpen(false)}
                active={isActive(item.href)}
              >
                {item.label}
              </MobileNavLink>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

function NavLink({ href, active, children }: { 
  href: string; 
  active?: boolean;
  children: React.ReactNode 
}) {
  return (
    <Link 
      href={href} 
      className={`text-foreground/80 hover:text-foreground transition-colors font-medium 
      ${active ? 'text-blue-600 dark:text-blue-400 font-semibold' : ''}`}
    >
      {children}
    </Link>
  );
}

function MobileNavLink({ href, onClick, active, children }: { 
  href: string;
  onClick: () => void;
  active?: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link 
      href={href} 
      className={`block py-3 px-4 hover:bg-black/[.05] dark:hover:bg-white/[.05]
      ${active ? 'text-blue-600 dark:text-blue-400 font-semibold' : ''}`}
      onClick={onClick}
    >
      {children}
    </Link>
  );
}
