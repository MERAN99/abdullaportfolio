import React, { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

// Decorative elements for parallax effect
const ParallaxDecorations = ({ section }) => {
  const { isDarkMode } = useTheme();
  const decorationRefs = useRef([]);
  
  // Set up parallax effect for decorations
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const viewportHeight = window.innerHeight;
      
      decorationRefs.current.forEach((decoration, index) => {
        if (!decoration) return;
        
        const element = decoration.parentElement;
        const elementTop = element.getBoundingClientRect().top + scrollPosition;
        const elementHeight = element.offsetHeight;
        const distanceFromTop = scrollPosition - elementTop;
        
        // Only apply parallax when the element is in or near the viewport
        if (distanceFromTop > -viewportHeight && distanceFromTop < elementHeight + viewportHeight) {
          // Each decoration moves at a different speed
          const speed = 0.05 + (index * 0.03);
          const offset = distanceFromTop * speed;
          
          // Apply transform with some rotation for added effect
          decoration.style.transform = `translateY(${offset}px) rotate(${offset * 0.02}deg)`;
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    // Run once on mount
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [section]);
  
  // Generate decorations based on section
  const getDecorations = () => {
    // Different decorations for different sections
    switch(section) {
      case 'header':
        return [
          { type: 'circle', size: 'lg', position: 'top-10 right-10', color: 'blue' },
          { type: 'square', size: 'md', position: 'bottom-20 left-20', color: 'purple' },
          { type: 'circle', size: 'sm', position: 'top-1/4 left-1/3', color: 'cyan' }
        ];
      case 'about':
        return [
          { type: 'square', size: 'lg', position: 'bottom-10 right-1/4', color: 'purple' },
          { type: 'circle', size: 'sm', position: 'top-20 left-10', color: 'blue' }
        ];
      case 'skills':
        return [
          { type: 'circle', size: 'md', position: 'bottom-1/4 right-10', color: 'cyan' },
          { type: 'square', size: 'sm', position: 'top-1/3 left-20', color: 'blue' }
        ];
      case 'experience':
        return [
          { type: 'square', size: 'lg', position: 'top-10 right-1/3', color: 'purple' },
          { type: 'circle', size: 'md', position: 'bottom-10 left-10', color: 'blue' }
        ];
      case 'education':
        return [
          { type: 'circle', size: 'lg', position: 'bottom-20 right-20', color: 'cyan' },
          { type: 'square', size: 'sm', position: 'top-20 left-1/4', color: 'purple' }
        ];
      case 'languages':
        return [
          { type: 'square', size: 'md', position: 'top-10 right-10', color: 'blue' },
          { type: 'circle', size: 'sm', position: 'bottom-1/3 left-20', color: 'purple' }
        ];
      default:
        return [];
    }
  };
  
  // Get size class
  const getSizeClass = (size) => {
    switch(size) {
      case 'sm': return 'w-8 h-8';
      case 'md': return 'w-16 h-16';
      case 'lg': return 'w-24 h-24';
      default: return 'w-12 h-12';
    }
  };
  
  // Get color class
  const getColorClass = (color) => {
    const opacity = isDarkMode ? '20' : '10';
    switch(color) {
      case 'blue': return `bg-blue-500/${opacity}`;
      case 'purple': return `bg-purple-500/${opacity}`;
      case 'cyan': return `bg-cyan-500/${opacity}`;
      default: return `bg-indigo-500/${opacity}`;
    }
  };
  
  // Get shape class
  const getShapeClass = (type) => {
    switch(type) {
      case 'circle': return 'rounded-full';
      case 'square': return 'rounded-md';
      default: return 'rounded';
    }
  };
  
  const decorations = getDecorations();
  
  return (
    <>
      {decorations.map((decoration, index) => (
        <div
          key={`${section}-decoration-${index}`}
          ref={el => decorationRefs.current[index] = el}
          className={`absolute ${decoration.position} ${getSizeClass(decoration.size)} ${getColorClass(decoration.color)} ${getShapeClass(decoration.type)} backdrop-blur-md transition-transform duration-500 ease-out pointer-events-none z-0`}
          style={{ willChange: 'transform' }}
        />
      ))}
    </>
  );
};

export default ParallaxDecorations; 