import { motion } from 'framer-motion';
import { FaGraduationCap, FaUniversity, FaCalendarAlt, FaPalette } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
import Lanyard from './3D/Lanyard';
import { useState, useEffect, useRef } from 'react';

const Education = () => {
  const { isDarkMode } = useTheme();
  const [isMobile, setIsMobile] = useState(false);
  const [sectionHeight, setSectionHeight] = useState('38rem');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isInteracting, setIsInteracting] = useState(false);
  const sectionRef = useRef(null);
  const interactionTimerRef = useRef(null);
  
  useEffect(() => {
    const checkMobile = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      
      // Adjust section height based on screen size
      if (width < 640) {
        setSectionHeight('42rem'); // Small mobile
      } else if (width < 768) {
        setSectionHeight('40rem'); // Mobile
      } else if (width < 1024) {
        setSectionHeight('38rem'); // Tablet
      } else {
        setSectionHeight('38rem'); // Desktop
      }
    };
    
    checkMobile(); // Initial check
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Parallax effect on mouse move
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        setMousePosition({ x, y });
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Handle interaction state for scrolling vs card dragging
  const handleInteractionStart = () => {
    setIsInteracting(true);
    // Clear any existing timer
    if (interactionTimerRef.current) {
      clearTimeout(interactionTimerRef.current);
    }
  };

  const handleInteractionEnd = () => {
    // Set a small delay before allowing scrolling again
    interactionTimerRef.current = setTimeout(() => {
      setIsInteracting(false);
    }, 300);
  };
  
  return (
    <section 
      id="education" 
      ref={sectionRef}
      className="relative flex flex-col"
      style={{
        backgroundImage: 'url("/images/astronout_Book.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        position: 'relative',
        height: sectionHeight,
        overflow: 'hidden',
        touchAction: isInteracting ? 'none' : 'auto', // Only block touch actions when interacting with card
      }}
    >
      {/* Dark overlay */}
      <div 
        className="absolute inset-0" 
        style={{ 
          backgroundColor: isDarkMode ? 'rgba(0, 0, 0, 0.7)' : 'rgba(0, 0, 0, 0.5)',
          zIndex: 1 
        }}
      ></div>
      
      {/* Floating Astronaut */}
      <motion.div
        className="absolute z-10"
        style={{
          right: isMobile ? '5%' : '10%',
          bottom: '5%',
          width: isMobile ? '150px' : '250px',
          height: isMobile ? '150px' : '250px',
          backgroundImage: 'url("/models/Astronout-GreyScale.png")',
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          filter: 'brightness(0.9) contrast(1.1)',
          opacity: 0.85,
          transform: !isMobile ? `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)` : 'none',
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ 
          y: [0, -20, 0],
          rotate: [-2, 2, -2],
          scale: [1, 1.05, 1],
          opacity: 0.85
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          times: [0, 0.5, 1]
        }}
        whileInView={{ opacity: 0.85 }}
        viewport={{ once: false }}
      />
      
      <div className="container mx-auto px-4 relative z-10 w-full pt-16 md:pt-24">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="section-title text-start text-white mb-8"
        >
          Education
        </motion.h2>
      </div>
      
      {/* Scroll instruction for mobile users */}
      {isMobile && (
        <div className="absolute bottom-4 left-0 right-0 z-20 flex justify-center items-center">
          <motion.div 
            className="bg-black/40 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            Tap card to interact • Swipe page to scroll
          </motion.div>
        </div>
      )}
      
      {/* Lanyard component on top layer with interaction events */}
      <div 
        className="absolute w-full h-full z-50"
        style={{
          pointerEvents: 'auto',
        }}
        onPointerDown={handleInteractionStart}
        onPointerUp={handleInteractionEnd}
        onTouchStart={handleInteractionStart}
        onTouchEnd={handleInteractionEnd}
      >
        <Lanyard 
          position={[0, 0, isMobile ? 32 : 22]} 
          gravity={[0, -40, 0]} 
          fov={isMobile ? 12 : 22}
        />
      </div>
    </section>
  );
};

export default Education; 