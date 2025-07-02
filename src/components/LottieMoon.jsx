import React, { useEffect, useRef, useState } from 'react';
import Lottie from 'lottie-react';
import { useTheme } from '../context/ThemeContext';

// Moon animation JSON data
const moonAnimationData = {
  "v": "5.7.8",
  "fr": 30,
  "ip": 0,
  "op": 60,
  "w": 500,
  "h": 500,
  "nm": "Moon Animation",
  "ddd": 0,
  "assets": [],
  "layers": [
    {
      "ddd": 0,
      "ind": 1,
      "ty": 4,
      "nm": "Moon",
      "sr": 1,
      "ks": {
        "o": { "a": 0, "k": 100, "ix": 11 },
        "r": { "a": 0, "k": 0, "ix": 10 },
        "p": { "a": 0, "k": [250, 250, 0], "ix": 2, "l": 2 },
        "a": { "a": 0, "k": [0, 0, 0], "ix": 1, "l": 2 },
        "s": { "a": 0, "k": [100, 100, 100], "ix": 6, "l": 2 }
      },
      "ao": 0,
      "shapes": [
        {
          "ty": "gr",
          "it": [
            {
              "d": 1,
              "ty": "el",
              "s": { "a": 0, "k": [240, 240], "ix": 2 },
              "p": { "a": 0, "k": [0, 0], "ix": 3 },
              "nm": "Ellipse Path 1",
              "mn": "ADBE Vector Shape - Ellipse",
              "hd": false
            },
            {
              "ty": "fl",
              "c": { "a": 0, "k": [0.949, 0.949, 0.949, 1], "ix": 4 },
              "o": { "a": 0, "k": 100, "ix": 5 },
              "r": 1,
              "bm": 0,
              "nm": "Fill 1",
              "mn": "ADBE Vector Graphic - Fill",
              "hd": false
            },
            {
              "ty": "tr",
              "p": { "a": 0, "k": [0, 0], "ix": 2 },
              "a": { "a": 0, "k": [0, 0], "ix": 1 },
              "s": { "a": 0, "k": [100, 100], "ix": 3 },
              "r": { "a": 0, "k": 0, "ix": 6 },
              "o": { "a": 0, "k": 100, "ix": 7 },
              "sk": { "a": 0, "k": 0, "ix": 4 },
              "sa": { "a": 0, "k": 0, "ix": 5 },
              "nm": "Transform"
            }
          ],
          "nm": "Moon Base",
          "np": 2,
          "cix": 2,
          "bm": 0,
          "ix": 1,
          "mn": "ADBE Vector Group",
          "hd": false
        },
        {
          "ty": "gr",
          "it": [
            {
              "d": 1,
              "ty": "el",
              "s": { "a": 0, "k": [40, 40], "ix": 2 },
              "p": { "a": 0, "k": [-60, -40], "ix": 3 },
              "nm": "Ellipse Path 1",
              "mn": "ADBE Vector Shape - Ellipse",
              "hd": false
            },
            {
              "ty": "fl",
              "c": { "a": 0, "k": [0.8, 0.8, 0.8, 1], "ix": 4 },
              "o": { "a": 0, "k": 100, "ix": 5 },
              "r": 1,
              "bm": 0,
              "nm": "Fill 1",
              "mn": "ADBE Vector Graphic - Fill",
              "hd": false
            },
            {
              "ty": "tr",
              "p": { "a": 0, "k": [0, 0], "ix": 2 },
              "a": { "a": 0, "k": [0, 0], "ix": 1 },
              "s": { "a": 0, "k": [100, 100], "ix": 3 },
              "r": { "a": 0, "k": 0, "ix": 6 },
              "o": { "a": 0, "k": 100, "ix": 7 },
              "sk": { "a": 0, "k": 0, "ix": 4 },
              "sa": { "a": 0, "k": 0, "ix": 5 },
              "nm": "Transform"
            }
          ],
          "nm": "Crater 1",
          "np": 2,
          "cix": 2,
          "bm": 0,
          "ix": 2,
          "mn": "ADBE Vector Group",
          "hd": false
        },
        {
          "ty": "gr",
          "it": [
            {
              "d": 1,
              "ty": "el",
              "s": { "a": 0, "k": [60, 60], "ix": 2 },
              "p": { "a": 0, "k": [40, 50], "ix": 3 },
              "nm": "Ellipse Path 1",
              "mn": "ADBE Vector Shape - Ellipse",
              "hd": false
            },
            {
              "ty": "fl",
              "c": { "a": 0, "k": [0.8, 0.8, 0.8, 1], "ix": 4 },
              "o": { "a": 0, "k": 100, "ix": 5 },
              "r": 1,
              "bm": 0,
              "nm": "Fill 1",
              "mn": "ADBE Vector Graphic - Fill",
              "hd": false
            },
            {
              "ty": "tr",
              "p": { "a": 0, "k": [0, 0], "ix": 2 },
              "a": { "a": 0, "k": [0, 0], "ix": 1 },
              "s": { "a": 0, "k": [100, 100], "ix": 3 },
              "r": { "a": 0, "k": 0, "ix": 6 },
              "o": { "a": 0, "k": 100, "ix": 7 },
              "sk": { "a": 0, "k": 0, "ix": 4 },
              "sa": { "a": 0, "k": 0, "ix": 5 },
              "nm": "Transform"
            }
          ],
          "nm": "Crater 2",
          "np": 2,
          "cix": 2,
          "bm": 0,
          "ix": 3,
          "mn": "ADBE Vector Group",
          "hd": false
        },
        {
          "ty": "gr",
          "it": [
            {
              "d": 1,
              "ty": "el",
              "s": { "a": 0, "k": [30, 30], "ix": 2 },
              "p": { "a": 0, "k": [70, -60], "ix": 3 },
              "nm": "Ellipse Path 1",
              "mn": "ADBE Vector Shape - Ellipse",
              "hd": false
            },
            {
              "ty": "fl",
              "c": { "a": 0, "k": [0.8, 0.8, 0.8, 1], "ix": 4 },
              "o": { "a": 0, "k": 100, "ix": 5 },
              "r": 1,
              "bm": 0,
              "nm": "Fill 1",
              "mn": "ADBE Vector Graphic - Fill",
              "hd": false
            },
            {
              "ty": "tr",
              "p": { "a": 0, "k": [0, 0], "ix": 2 },
              "a": { "a": 0, "k": [0, 0], "ix": 1 },
              "s": { "a": 0, "k": [100, 100], "ix": 3 },
              "r": { "a": 0, "k": 0, "ix": 6 },
              "o": { "a": 0, "k": 100, "ix": 7 },
              "sk": { "a": 0, "k": 0, "ix": 4 },
              "sa": { "a": 0, "k": 0, "ix": 5 },
              "nm": "Transform"
            }
          ],
          "nm": "Crater 3",
          "np": 2,
          "cix": 2,
          "bm": 0,
          "ix": 4,
          "mn": "ADBE Vector Group",
          "hd": false
        }
      ],
      "ip": 0,
      "op": 60,
      "st": 0,
      "bm": 0
    }
  ],
  "markers": []
};

const LottieMoon = () => {
  const { isDarkMode } = useTheme();
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const lastScrollPos = useRef(0);
  const ticking = useRef(false);
  const lottieRef = useRef(null);
  
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    // Create intersection observer to detect when moon is in viewport
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1, rootMargin: '100px' }
    );
    
    observer.observe(container);
    
    // Handle scroll to control animation and position
    const handleScroll = () => {
      lastScrollPos.current = window.scrollY;
      
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          updateMoonPosition(lastScrollPos.current);
          ticking.current = false;
        });
        
        ticking.current = true;
      }
    };
    
    const updateMoonPosition = (scrollPos) => {
      if (!isVisible) return;
      
      // Get section element
      const sectionElement = document.getElementById('about');
      if (!sectionElement) return;
      
      // Get section position
      const sectionRect = sectionElement.getBoundingClientRect();
      const sectionTop = sectionRect.top + window.scrollY;
      const sectionHeight = sectionRect.height;
      const viewportHeight = window.innerHeight;
      
      // Calculate how far we've scrolled through the section
      // 0 = top of section at bottom of viewport
      // 1 = bottom of section at top of viewport
      const scrollProgress = (scrollPos + viewportHeight - sectionTop) / (sectionHeight + viewportHeight);
      
      // Clamp value between 0 and 1
      const clampedProgress = Math.max(0, Math.min(1, scrollProgress));
      
      // Calculate position based on scroll progress
      // Start position: right side
      // End position: left side
      const startX = 70; // percentage from left
      const endX = 30;
      const currentX = startX - (clampedProgress * (startX - endX));
      
      // Start position: top
      // End position: middle
      const startY = 20; // percentage from top
      const endY = 50;
      const currentY = startY + (clampedProgress * (endY - startY));
      
      // Scale: start smaller, end larger
      const startScale = 0.8;
      const endScale = 1.5;
      const currentScale = startScale + (clampedProgress * (endScale - startScale));
      
      // Apply transformations with GPU acceleration
      container.style.transform = `translate3d(calc(${currentX}% - 50%), calc(${currentY}% - 50%), 0) scale(${currentScale})`;
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial positioning
    
    return () => {
      observer.unobserve(container);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isVisible]);
  
  return (
    <div 
      ref={containerRef}
      className="absolute pointer-events-none z-0 transition-transform duration-300 ease-out"
      style={{ 
        left: '70%', 
        top: '20%', 
        transform: 'translate3d(-50%, -50%, 0) scale(0.8)',
        willChange: 'transform'
      }}
    >
      <div className="relative w-56 h-56 md:w-72 md:h-72 lg:w-96 lg:h-96 rounded-full overflow-hidden moon-animation">
        <Lottie 
          lottieRef={lottieRef}
          animationData={moonAnimationData}
          loop={true}
          autoplay={true}
          className="absolute w-full h-full object-cover"
          style={{ 
            filter: isDarkMode ? 'brightness(1.2) contrast(1.1)' : 'brightness(1.1) contrast(1.1)',
          }}
        />
        
        {/* Glow effect */}
        <div 
          className="absolute inset-0 rounded-full"
          style={{ 
            boxShadow: '0 0 60px 10px rgba(210, 214, 255, 0.6), inset 0 0 30px rgba(255, 255, 255, 0.4)',
            filter: 'blur(3px)'
          }}
        />
      </div>
    </div>
  );
};

export default LottieMoon; 