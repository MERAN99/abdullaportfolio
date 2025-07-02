import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import ParallaxDecorations from './ParallaxDecorations';

// Gradient backgrounds
const gradientBackgrounds = {
  light: [
    'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
    'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)',
    'linear-gradient(135deg, #f5f7fa 0%, #e0c3fc 100%)',
    'linear-gradient(135deg, #c3cfe2 0%, #8ec5fc 100%)',
  ],
  dark: [
    'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
    'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
    'linear-gradient(135deg, #0f172a 0%, #334155 100%)',
    'linear-gradient(135deg, #1e293b 0%, #475569 100%)',
  ]
};

export const ParallaxBackground = ({ section, children }) => {
  const { isDarkMode } = useTheme();
  const backgroundRef = useRef(null);
  const contentRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  
  // Select appropriate gradient based on section and theme
  const getBackground = () => {
    const gradients = isDarkMode ? gradientBackgrounds.dark : gradientBackgrounds.light;
    
    switch(section) {
      case 'header':
        return gradients[0];
      case 'about':
        return gradients[1];
      case 'skills':
        return gradients[2];
      case 'experience':
      case 'education':
      case 'languages':
        return gradients[3];
      default:
        return gradients[0];
    }
  };

  // Enhanced parallax effect on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!backgroundRef.current || !contentRef.current) return;
      
      const scrollPosition = window.scrollY;
      const viewportHeight = window.innerHeight;
      const element = backgroundRef.current.parentElement;
      const elementTop = element.getBoundingClientRect().top + scrollPosition;
      const elementHeight = element.offsetHeight;
      
      // Calculate how far the element is from the viewport top
      const distanceFromTop = scrollPosition - elementTop;
      
      // Check if element is visible in viewport
      const isInViewport = element.getBoundingClientRect().top < viewportHeight * 0.8;
      setIsVisible(isInViewport);
      
      // Only apply parallax when the element is in or near the viewport
      if (distanceFromTop > -viewportHeight && distanceFromTop < elementHeight) {
        // Calculate parallax offset - slower for background (creates depth)
        const backgroundOffset = distanceFromTop * 0.15;
        const contentOffset = distanceFromTop * 0.05;
        
        // Apply transforms
        backgroundRef.current.style.transform = `translateY(${backgroundOffset}px)`;
        contentRef.current.style.transform = `translateY(${contentOffset}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Run once on mount to set initial positions
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [section]);

  return (
    <div className="relative w-full overflow-hidden" style={{ minHeight: section === 'header' ? '80vh' : '60vh' }}>
      {/* Background with parallax effect */}
      <div 
        ref={backgroundRef}
        className="absolute inset-0 z-0 transition-transform duration-300 ease-out"
        style={{ 
          background: getBackground(),
          opacity: isDarkMode ? 0.7 : 0.5,
          willChange: 'transform'
        }}
      />
      
      {/* Decorative elements */}
      <ParallaxDecorations section={section} />
      
      {/* Content with subtle parallax effect */}
      <div 
        ref={contentRef} 
        className={`relative z-10 transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        style={{ willChange: 'transform, opacity' }}
      >
        {children}
      </div>
    </div>
  );
};

export const ParallaxWrapper = ({ children }) => {
  return (
    <div className="relative">
      {children}
    </div>
  );
};

export default ParallaxBackground; 