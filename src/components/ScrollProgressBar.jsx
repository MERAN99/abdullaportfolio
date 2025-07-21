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
  
  // Generate wave patterns for the full document height
  const generateWavePath = () => {
    // We'll create a pattern that can be repeated vertically
    const patternHeight = 500; // Height of a single pattern in SVG units
    const waveHeight = 8; // Max wave amplitude
    
    // Create a pattern that can be tiled vertically
    let path = `M 1,0`; // Start at top
    
    // Create 5 segments in our pattern
    for (let i = 0; i < 5; i++) {
      const segmentStart = (i / 5) * patternHeight;
      const segmentEnd = ((i + 1) / 5) * patternHeight;
      const segmentMid = (segmentStart + segmentEnd) / 2;
      
      // Every other segment has a wave
      if (i % 2 === 1) {
        // Control points for smooth curve
        path += ` C 1,${segmentStart + 50} ${waveHeight + 1},${segmentMid - 50} ${waveHeight + 1},${segmentMid}`;
        path += ` C ${waveHeight + 1},${segmentMid + 50} 1,${segmentEnd - 50} 1,${segmentEnd}`;
      } else {
        path += ` L 1,${segmentEnd}`;
      }
    }
    
    return path;
  };
  
  // Generate background and progress SVG paths
  const wavePath = generateWavePath();

  // Calculate dot position based on scroll progress
  const dotPosition = useTransform(scrollYProgress, value => value * viewportHeight);

  // Calculate clip path for the progress indicator
  const clipPathHeight = useTransform(smoothProgress, value => `${value * 100}%`);

  // Define colors based on theme
  const backgroundLineColor = isDarkMode ? 'rgba(120, 120, 120, 0.3)' : 'rgba(150, 150, 150, 0.4)';
  const progressLineColor = isDarkMode ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 1)';
  const nodeColor = isDarkMode ? 'rgba(180, 180, 180, 0.6)' : 'rgba(200, 200, 200, 0.7)';
  const activeNodeColor = 'white';

  // Calculate wave offset at current scroll position (for dot positioning)
  const waveOffset = useTransform(scrollYProgress, value => {
    // Determine which segment of the pattern we're in
    const patternPosition = (value * 5) % 5; // 5 segments in total
    
    // If in a wave segment (odd numbered segments)
    if (Math.floor(patternPosition) % 2 === 1) {
      // Calculate position within the segment (0-1)
      const segmentProgress = patternPosition % 1;
      
      // Apply sine wave function to get horizontal offset
      // This approximates the bezier curve with a sine wave
      const offset = Math.sin(segmentProgress * Math.PI) * 8;
      return offset;
    }
    
    return 0; // No offset for straight segments
  });

  return (
    <>
      {/* Absolute container that spans the full document height */}
      <div 
        ref={containerRef}
        className="absolute top-0 left-0 z-50 pointer-events-none"
        style={{ 
          left: '20px', 
          width: '20px',
          height: documentHeight || '100%',
        }}
      >
        {/* SVG container for continuous wave line */}
        <svg 
          ref={svgRef}
          width="20" 
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
          {/* Pattern definition for repeating waves */}
          <defs>
            <pattern id="wavePattern" patternUnits="userSpaceOnUse" width="20" height="500" patternTransform="scale(1 1)">
              <path
                d={wavePath}
                stroke={backgroundLineColor}
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
              />
            </pattern>
            
            <pattern id="wavePatternFill" patternUnits="userSpaceOnUse" width="20" height="500" patternTransform="scale(1 1)">
              <path
                d={wavePath}
                stroke={progressLineColor}
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
              />
            </pattern>
          </defs>
          
          {/* Background line using the pattern (grey) */}
          <rect 
            x="0" 
            y="0" 
            width="20" 
            height="100%" 
            fill="url(#wavePattern)"
            style={{
              filter: `drop-shadow(0 0 1px ${isDarkMode ? 'rgba(100, 100, 100, 0.3)' : 'rgba(150, 150, 150, 0.2)'})`
            }}
          />
          
          {/* Progress line with clipping mask for top-to-bottom fill (white) */}
          <motion.rect 
            x="0" 
            y="0" 
            width="20" 
            height="100%" 
            fill="url(#wavePatternFill)"
            style={{
              clipPath: `inset(0 0 ${useTransform(smoothProgress, p => `${100 - p * 100}%`)} 0)`,
              filter: `drop-shadow(0 0 3px ${isDarkMode ? 'rgba(255, 255, 255, 0.4)' : 'rgba(255, 255, 255, 0.6)'})`
            }}
          />
          
          {/* Grey circuit nodes at wave transitions */}
          <circle cx="1" cy="20%" r="1.5" fill={nodeColor} style={{ filter: 'drop-shadow(0 0 1px rgba(150, 150, 150, 0.5))' }} />
          <circle cx="1" cy="60%" r="1.5" fill={nodeColor} style={{ filter: 'drop-shadow(0 0 1px rgba(150, 150, 150, 0.5))' }} />
          
          {/* White circuit nodes that appear based on scroll position */}
          <motion.circle 
            cx="1" 
            cy="20%" 
            r="1.5" 
            fill={activeNodeColor}
            style={{ 
              opacity: useTransform(smoothProgress, value => value > 0.2 ? 1 : 0),
              filter: 'drop-shadow(0 0 2px white)' 
            }}
          />
          <motion.circle 
            cx="1" 
            cy="60%" 
            r="1.5" 
            fill={activeNodeColor}
            style={{ 
              opacity: useTransform(smoothProgress, value => value > 0.6 ? 1 : 0),
              filter: 'drop-shadow(0 0 2px white)' 
            }}
          />
        </svg>
      </div>
      
      {/* Fixed container for dot and readout */}
      <div className="fixed top-0 left-0 z-50 pointer-events-none" style={{ left: '20px', width: '20px', height: '100vh' }}>
        {/* Glowing dot that follows progress - positioned on the line */}
        <motion.div
          className="absolute z-10"
          style={{
            left: useTransform(waveOffset, offset => `${offset}px`), // Dynamic horizontal position based on wave
            top: 0,
            y: dotPosition,
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
        
        {/* Digital readout */}
        <motion.div
          className="fixed bottom-4 left-4 bg-black/30 backdrop-blur-sm px-2 py-0.5 rounded-full text-xs font-mono"
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