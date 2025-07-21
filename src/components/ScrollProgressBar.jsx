import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const ScrollProgressBar = () => {
  const { isDarkMode } = useTheme();
  const { scrollYProgress } = useScroll();
  const ref = useRef(null);
  
  // Add spring physics for smoother animation
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="fixed left-0 top-0 bottom-0 z-50 w-1 flex items-center pointer-events-none">
      {/* Background line */}
      <div 
        className={`h-full w-full ${isDarkMode ? 'bg-gray-800/30' : 'bg-gray-300/30'}`}
        ref={ref}
      ></div>
      
      {/* Animated progress indicator */}
      <motion.div
        className="absolute top-0 left-0 w-full origin-top"
        style={{ 
          scaleY,
          height: '100%',
          background: isDarkMode 
            ? 'linear-gradient(to bottom, rgb(99, 102, 241), rgb(168, 85, 247), rgb(236, 72, 153))' 
            : 'linear-gradient(to bottom, rgb(79, 70, 229), rgb(147, 51, 234), rgb(219, 39, 119))'
        }}
      />
      
      {/* Glowing dot that follows progress */}
      <motion.div
        className="absolute left-0 w-3 h-3 -ml-1 rounded-full shadow-lg"
        style={{
          top: 0,
          y: scrollYProgress,
          scale: useSpring(scrollYProgress.get() > 0.01 ? 1 : 0, {
            stiffness: 200,
            damping: 30
          }),
          background: isDarkMode 
            ? 'rgb(168, 85, 247)' 
            : 'rgb(147, 51, 234)',
          boxShadow: isDarkMode 
            ? '0 0 10px 2px rgba(168, 85, 247, 0.7)' 
            : '0 0 10px 2px rgba(147, 51, 234, 0.7)',
        }}
      />
    </div>
  );
};

export default ScrollProgressBar; 