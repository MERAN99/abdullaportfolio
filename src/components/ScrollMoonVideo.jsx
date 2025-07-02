import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '../context/ThemeContext';

const ScrollMoonVideo = () => {
  const { isDarkMode } = useTheme();
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [videoDuration, setVideoDuration] = useState(0);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const lastScrollPos = useRef(0);
  const ticking = useRef(false);
  const targetTimeRef = useRef(0);
  const animationRef = useRef(null);
  
  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;
    
    // Set initial video state
    video.pause();
    video.currentTime = 0;
    
    // Handle video metadata loaded to get duration
    const handleMetadataLoaded = () => {
      setVideoDuration(video.duration);
      setIsVideoLoaded(true);
    };
    
    video.addEventListener('loadedmetadata', handleMetadataLoaded);
    
    // If video is already loaded, set duration
    if (video.readyState >= 2) {
      handleMetadataLoaded();
    }
    
    // Create intersection observer to detect when video is in viewport
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1, rootMargin: '100px' }
    );
    
    observer.observe(container);
    
    // Handle scroll to control video playback and position
    const handleScroll = () => {
      lastScrollPos.current = window.scrollY;
      
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          updateVideoPosition(lastScrollPos.current);
          ticking.current = false;
        });
        
        ticking.current = true;
      }
    };
    
    // Separate function to update video time with animation frame
    const updateVideoTime = () => {
      if (!isVisible || !isVideoLoaded || !video.duration) {
        animationRef.current = requestAnimationFrame(updateVideoTime);
        return;
      }
      
      // Smoothly interpolate to target time
      const currentTime = video.currentTime;
      const targetTime = targetTimeRef.current;
      const diff = targetTime - currentTime;
      
      // Only update if the difference is significant
      if (Math.abs(diff) > 0.01) {
        // Faster interpolation for larger differences to avoid lag
        const interpolationFactor = Math.abs(diff) > 1 ? 0.25 : 0.1;
        video.currentTime = currentTime + (diff * interpolationFactor);
      }
      
      animationRef.current = requestAnimationFrame(updateVideoTime);
    };
    
    // Start the animation loop
    animationRef.current = requestAnimationFrame(updateVideoTime);
    
    const updateVideoPosition = (scrollPos) => {
      if (!isVisible || !isVideoLoaded) return;
      
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
      
      // Update target time for smooth interpolation
      if (videoDuration) {
        targetTimeRef.current = clampedProgress * videoDuration;
      }
      
      // Calculate position and scale based on scroll progress
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
      video.removeEventListener('loadedmetadata', handleMetadataLoaded);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isVisible, isVideoLoaded, videoDuration]);
  
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
      <div className="relative w-56 h-56 md:w-72 md:h-72 lg:w-96 lg:h-96 rounded-full overflow-hidden moon-video">
        <video 
          ref={videoRef}
          muted
          playsInline
          preload="auto"
          className="absolute w-full h-full object-cover"
          style={{ 
            filter: isDarkMode ? 'brightness(1.2) contrast(1.1)' : 'brightness(1.1) contrast(1.1)',
            willChange: 'currentTime'
          }}
        >
          <source src="/videos/Moon.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
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

export default ScrollMoonVideo; 