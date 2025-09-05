import { useEffect, useState } from 'react';
import ErrorBoundary from './components/ErrorBoundary';
import FluidBackground from './components/FluidBackground';
import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import SkillsSection from './components/SkillsSection';
import ProjectsSection from './components/ProjectsSection';
import ExperienceSection from './components/ExperienceSection';
import ContactSection from './components/ContactSection';

function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    console.log('App component mounted');
    
    // Set loaded state after a short delay
    const timer = setTimeout(() => {
      setIsLoaded(true);
      console.log('App loaded successfully');
    }, 100);

    // Smooth scrolling behavior
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href')!);
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });

    // Simplified cursor effect for better performance
    const cursor = document.createElement('div');
    cursor.className = 'fixed w-4 h-4 bg-blue-400 rounded-full pointer-events-none z-50 opacity-60 transition-transform duration-100 ease-out';
    document.body.appendChild(cursor);

    let animationFrame: number;
    const moveCursor = (e: MouseEvent) => {
      if (animationFrame) cancelAnimationFrame(animationFrame);
      animationFrame = requestAnimationFrame(() => {
        cursor.style.left = e.clientX - 8 + 'px';
        cursor.style.top = e.clientY - 8 + 'px';
      });
    };

    document.addEventListener('mousemove', moveCursor);

    // Simplified interactive elements hover effect
    const interactiveElements = document.querySelectorAll('a, button, [role="button"]');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(1.2)';
      });
      el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
      });
    });

    return () => {
      clearTimeout(timer);
      document.removeEventListener('mousemove', moveCursor);
      if (animationFrame) cancelAnimationFrame(animationFrame);
      if (document.body.contains(cursor)) {
        document.body.removeChild(cursor);
      }
    };
  }, []);

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl">Loading Portfolio...</p>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-x-hidden">
        <FluidBackground />
        <Navigation />
        
        <main className="relative z-10">
          <HeroSection />
          <SkillsSection />
          <ProjectsSection />
          <ExperienceSection />
          <ContactSection />
        </main>

        {/* Footer */}
        <footer className="relative z-10 py-8 border-t border-white/10">
          <div className="container mx-auto px-6 text-center">
            <p className="text-white/60">
              © 2025 Surya Nesanuru. Crafted with passion using React, Three.js, and modern web technologies.
            </p>
          </div>
        </footer>
      </div>
    </ErrorBoundary>
  );
}

export default App;