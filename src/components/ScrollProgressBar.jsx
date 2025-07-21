import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const ScrollProgressBar = () => {
  const { isDarkMode } = useTheme();
  const { scrollYProgress } = useScroll();
  const containerRef = useRef(null);
  const svgRef = useRef(null);
  const [documentHeight, setDocumentHeight] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(0);
  
  // Add spring physics for smoother animation
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  
  // Create transforms for different animation effects
  const dotScale = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0.5, 1.2, 1.2, 0.5]);
  const dotOpacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0.5, 1, 1, 0.5]);
  
  // Update height measurements and SVG
  useEffect(() => {
    const updateHeights = () => {
      // Get the total document height
      const docHeight = Math.max(
        document.body.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.clientHeight,
        document.documentElement.scrollHeight,
        document.documentElement.offsetHeight
      );
      
      setDocumentHeight(docHeight);
      setViewportHeight(window.innerHeight);
      
      // Update the SVG height to match document height
      if (svgRef.current) {
        svgRef.current.style.height = `${docHeight}px`;
      }
      
      // Update the container height to match document height
      if (containerRef.current) {
        containerRef.current.style.height = `${docHeight}px`;
      }
    };
    
    // Initial update
    updateHeights();
    
    // Update on resize and after content loads
    window.addEventListener('resize', updateHeights);
    window.addEventListener('load', updateHeights);
    
    // Update periodically to catch dynamic content changes
    const interval = setInterval(updateHeights, 2000);
    
    return () => {
      window.removeEventListener('resize', updateHeights);
      window.removeEventListener('load', updateHeights);
      clearInterval(interval);
    };
  }, []);
  
  // Constants for straight line pattern
  const patternHeight = 1000; // Height of a single pattern in SVG units
  
  // Generate straight line path
  const generateStraightLinePath = () => {
    // Create a simple straight vertical line
    return `M 1,0 L 1,${patternHeight}`;
  };
  
  // Generate background and progress SVG paths
  const straightLinePath = generateStraightLinePath();

  // Calculate clip path for the progress indicator
  const clipPathHeight = useTransform(smoothProgress, value => `${value * 100}%`);

  // Define colors based on theme
  const backgroundLineColor = isDarkMode ? 'rgba(120, 120, 120, 0.3)' : 'rgba(150, 150, 150, 0.4)';
  const progressLineColor = isDarkMode ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 1)';
  const nodeColor = isDarkMode ? 'rgba(180, 180, 180, 0.6)' : 'rgba(200, 200, 200, 0.7)';
  const activeNodeColor = 'white';

  // Calculate dot position - always on the straight line
  const dotPosition = useTransform(scrollYProgress, value => {
    return {
      x: 0, // Always centered on the line (x=1 in SVG)
      y: value * 100 // As percentage for CSS positioning
    };
  });

  return (
    <>
      {/* Absolute container that spans the full document height */}
      <div 
        ref={containerRef}
        className="absolute top-0 left-0 pointer-events-none"
        style={{ 
          left: '0', // Position at the very left edge
          width: '4px', // Reduced width to fit at the edge
          height: documentHeight || '100%',
          zIndex: 100, // Higher z-index to ensure visibility above text content
        }}
      >
        {/* SVG container for straight line */}
        <svg 
          ref={svgRef}
          width="4" 
          height="100%" 
          preserveAspectRatio="none" 
          style={{ 
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
          }}
        >
          {/* Pattern definition for straight line */}
          <defs>
            <pattern id="straightLinePattern" patternUnits="userSpaceOnUse" width="4" height={patternHeight} patternTransform="scale(1 1)">
              <path
                d={straightLinePath}
                stroke={backgroundLineColor}
                strokeWidth="4"
                fill="none"
                strokeLinecap="square"
                strokeLinejoin="miter"
              />
            </pattern>
            
            <pattern id="straightLinePatternFill" patternUnits="userSpaceOnUse" width="4" height={patternHeight} patternTransform="scale(1 1)">
              <path
                d={straightLinePath}
                stroke={progressLineColor}
                strokeWidth="4"
                fill="none"
                strokeLinecap="square"
                strokeLinejoin="miter"
              />
            </pattern>
          </defs>
          
          {/* Background line using the pattern (grey) */}
          <rect 
            x="0" 
            y="0" 
            width="4" 
            height="100%" 
            fill="url(#straightLinePattern)"
            style={{
              filter: `drop-shadow(0 0 1px ${isDarkMode ? 'rgba(100, 100, 100, 0.3)' : 'rgba(150, 150, 150, 0.2)'})`
            }}
          />
          
          {/* Progress line with clipping mask for top-to-bottom fill (white) */}
          <motion.rect 
            x="0" 
            y="0" 
            width="4" 
            height="100%" 
            fill="url(#straightLinePatternFill)"
            style={{
              clipPath: `inset(0 0 ${useTransform(smoothProgress, p => `${100 - p * 100}%`)} 0)`,
              filter: `drop-shadow(0 0 3px ${isDarkMode ? 'rgba(255, 255, 255, 0.4)' : 'rgba(255, 255, 255, 0.6)'})`
            }}
          />
          
          {/* Marker nodes along the line */}
          <circle cx="2" cy="25%" r="1.5" fill={nodeColor} style={{ filter: 'drop-shadow(0 0 1px rgba(150, 150, 150, 0.5))' }} />
          <circle cx="2" cy="50%" r="1.5" fill={nodeColor} style={{ filter: 'drop-shadow(0 0 1px rgba(150, 150, 150, 0.5))' }} />
          <circle cx="2" cy="75%" r="1.5" fill={nodeColor} style={{ filter: 'drop-shadow(0 0 1px rgba(150, 150, 150, 0.5))' }} />
          
          {/* Active nodes that appear based on scroll position */}
          <motion.circle 
            cx="2" 
            cy="25%" 
            r="1.5" 
            fill={activeNodeColor}
            style={{ 
              opacity: useTransform(smoothProgress, value => value > 0.25 ? 1 : 0),
              filter: 'drop-shadow(0 0 2px white)' 
            }}
          />
          <motion.circle 
            cx="2" 
            cy="50%" 
            r="1.5" 
            fill={activeNodeColor}
            style={{ 
              opacity: useTransform(smoothProgress, value => value > 0.5 ? 1 : 0),
              filter: 'drop-shadow(0 0 2px white)' 
            }}
          />
          <motion.circle 
            cx="2" 
            cy="75%" 
            r="1.5" 
            fill={activeNodeColor}
            style={{ 
              opacity: useTransform(smoothProgress, value => value > 0.75 ? 1 : 0),
              filter: 'drop-shadow(0 0 2px white)' 
            }}
          />
        </svg>
      
        {/* Glowing dot that follows progress - positioned directly on the SVG */}
        <motion.div
          className="absolute z-10"
          style={{
            left: useTransform(dotPosition, pos => `${pos.x + 2}px`), // Adjusted to center on the line
            top: useTransform(dotPosition, pos => `${pos.y}%`),
            scale: dotScale,
            opacity: dotOpacity,
          }}
        >
          {/* Inner dot */}
          <div 
            className="w-3 h-3 rounded-full relative"
            style={{
              background: 'radial-gradient(circle, rgba(255, 255, 255, 1) 0%, rgba(200, 200, 255, 0.8) 100%)',
              boxShadow: '0 0 10px 2px rgba(255, 255, 255, 0.7)',
              transform: 'translate(-50%, -50%)', // Center the dot on the line
            }}
          >
            {/* Animated pulse effect */}
            <motion.div 
              className="absolute inset-0 rounded-full"
              animate={{ 
                scale: [1, 1.5, 1],
                opacity: [0.7, 0, 0.7]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut" 
              }}
              style={{
                background: 'radial-gradient(circle, rgba(255, 255, 255, 0.4) 0%, rgba(200, 200, 255, 0) 70%)',
              }}
            />
            
            {/* Data stream effect */}
            <motion.div
              className="absolute -right-6 top-1/2 transform -translate-y-1/2 h-0.5 origin-left"
              style={{
                width: '6px',
                background: 'rgba(255, 255, 255, 0.8)',
                opacity: useTransform(scrollYProgress, value => Math.sin(value * 20) * 0.5 + 0.5)
              }}
            />
          </div>
        </motion.div>
      </div>
        
      {/* Fixed container for readout */}
      <div className="fixed bottom-4 left-4 z-50 pointer-events-none">
        {/* Digital readout */}
        <motion.div
          className="bg-black/30 backdrop-blur-sm px-2 py-0.5 rounded-full text-xs font-mono"
          style={{
            color: 'rgba(255, 255, 255, 0.9)',
            opacity: useTransform(scrollYProgress, [0, 0.05, 0.95, 1], [0, 0.7, 0.7, 0]),
            scale: useTransform(scrollYProgress, [0, 0.05, 0.95, 1], [0.8, 1, 1, 0.8])
          }}
        >
          <motion.span>
            {useTransform(scrollYProgress, value => `${Math.round(value * 100)}`)}
          </motion.span>
        </motion.div>
      </div>
    </>
  );
};

export default ScrollProgressBar; 