import { motion, AnimatePresence } from 'framer-motion';
import { FaBriefcase, FaBuilding, FaCalendarAlt } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
import ScrollStack, { ScrollStackItem } from './Animations/StackViewer/ScrollStack';
import { useRef, useEffect, useState } from 'react';

const Experience = () => {
  const { isDarkMode } = useTheme();
  const sectionRef = useRef(null);
  const scrollStackRef = useRef(null);
  const [hasViewedAllCards, setHasViewedAllCards] = useState(false);
  const [showInitialScrollPrompt, setShowInitialScrollPrompt] = useState(true);
  const [showEndText, setShowEndText] = useState(false);
  const lenisInstanceRef = useRef(null);
  const scrollPositionRef = useRef(0);
  const isScrollingUpRef = useRef(false);
  const lastScrollTopRef = useRef(0);
  
  // Function to scroll to the next section
  const scrollToNextSection = () => {
    const currentSection = sectionRef.current;
    if (!currentSection) return;
    
    const nextSection = currentSection.nextElementSibling;
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  // Handle wheel events to detect when to scroll to the next section
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    
    const handleWheel = (e) => {
      if (!hasViewedAllCards) return; // Only proceed if all cards have been viewed
      
      const scrollContainer = section.querySelector('[style*="overflow-y: auto"]');
      if (!scrollContainer) return;
      
      // If stack is complete
      if (hasViewedAllCards) {
        // Track scroll direction
        isScrollingUpRef.current = e.deltaY < 0;
        
        // Allow scrolling back up to hide end text
        if (e.deltaY < 0) {
          // Don't prevent default for upward scrolling
          // This allows the user to scroll back up
          const currentScrollTop = scrollContainer.scrollTop;
          
          // If scrolling back up, hide the end text immediately
          if (currentScrollTop < scrollPositionRef.current - 20) {
            setShowEndText(false);
          }
          
          // If we're close to the top, allow normal scrolling
          if (currentScrollTop < 200) {
            return;
          }
        }
        
        // For downward scrolling, prevent default and go to next section
        if (e.deltaY > 0) {
          e.preventDefault();
          scrollToNextSection();
        }
      }
    };
    
    // Listen for wheel events on the scroll container
    const scrollContainer = section.querySelector('[style*="overflow-y: auto"]');
    if (scrollContainer) {
      // Use non-passive event listener to be able to prevent default
      scrollContainer.addEventListener('wheel', handleWheel, { passive: false });
      
      // Track scroll position for showing/hiding end text
      const handleScroll = () => {
        // Hide initial scroll prompt when user starts scrolling
        if (showInitialScrollPrompt && scrollContainer.scrollTop > 10) {
          setShowInitialScrollPrompt(false);
        }
        
        // Track current scroll position
        const currentScrollTop = scrollContainer.scrollTop;
        
        // Determine scroll direction
        isScrollingUpRef.current = currentScrollTop < lastScrollTopRef.current;
        lastScrollTopRef.current = currentScrollTop;
        
        // If we're scrolling back up significantly, hide end text
        if (hasViewedAllCards && isScrollingUpRef.current && 
            currentScrollTop < scrollPositionRef.current - 20) {
          setShowEndText(false);
        }
        
        // If we're scrolling back down near the completion point, show end text again
        if (hasViewedAllCards && 
            !isScrollingUpRef.current && 
            !showEndText && 
            currentScrollTop > scrollPositionRef.current - 20) {
          setShowEndText(true);
        }
      };
      
      scrollContainer.addEventListener('scroll', handleScroll, { passive: true });
      
      return () => {
        scrollContainer.removeEventListener('wheel', handleWheel);
        scrollContainer.removeEventListener('scroll', handleScroll);
      };
    }
    
    return () => {};
  }, [hasViewedAllCards, showInitialScrollPrompt, showEndText]);

  // Fix for cards disappearing - lock scroll position when stack is complete
  useEffect(() => {
    if (hasViewedAllCards) {
      const scrollContainer = sectionRef.current?.querySelector('[style*="overflow-y: auto"]');
      if (scrollContainer) {
        // Store current scroll position
        const scrollPosition = scrollContainer.scrollTop;
        scrollPositionRef.current = scrollPosition;
        lastScrollTopRef.current = scrollPosition;
        
        // Create a function to maintain this position
        const maintainScrollPosition = () => {
          // Only maintain position for downward scrolling attempts
          // Allow scrolling back up
          if (scrollContainer.scrollTop < scrollPosition) {
            // We're scrolling up
            isScrollingUpRef.current = true;
            
            // If we've scrolled up significantly, hide the end text
            if (scrollContainer.scrollTop < scrollPosition - 20) {
              setShowEndText(false);
            }
            return;
          }
          
          // We're trying to scroll down
          isScrollingUpRef.current = false;
          scrollContainer.scrollTop = scrollPosition;
        };
        
        // Apply immediately and on any scroll attempt
        maintainScrollPosition();
        scrollContainer.addEventListener('scroll', maintainScrollPosition);
        
        // Disable smooth scrolling to prevent animation issues
        const originalScrollBehavior = scrollContainer.style.scrollBehavior;
        scrollContainer.style.scrollBehavior = 'auto';
        
        return () => {
          scrollContainer.removeEventListener('scroll', maintainScrollPosition);
          scrollContainer.style.scrollBehavior = originalScrollBehavior;
        };
      }
    }
  }, [hasViewedAllCards]);
  
  // Show end text after a delay when all cards are viewed
  useEffect(() => {
    if (hasViewedAllCards && !isScrollingUpRef.current) {
      // Delay showing the end text to ensure all animations are complete
      const timer = setTimeout(() => {
        setShowEndText(true);
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [hasViewedAllCards]);
  
  // Add a keyboard handler for accessibility
  useEffect(() => {
    const handleKeyDown = (e) => {
      const scrollContainer = sectionRef.current?.querySelector('[style*="overflow-y: auto"]');
      
      if (hasViewedAllCards && (e.key === 'ArrowDown' || e.key === 'PageDown')) {
        e.preventDefault();
        scrollToNextSection();
      }
      
      // Allow scrolling back up with arrow keys
      if (hasViewedAllCards && (e.key === 'ArrowUp' || e.key === 'PageUp') && scrollContainer) {
        isScrollingUpRef.current = true;
        
        // Simulate scrolling up behavior
        const newScrollTop = Math.max(0, scrollContainer.scrollTop - 100);
        scrollContainer.scrollTo({
          top: newScrollTop,
          behavior: 'smooth'
        });
        
        // If we've scrolled up significantly, hide the end text
        if (newScrollTop < scrollPositionRef.current - 20) {
          setShowEndText(false);
        }
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [hasViewedAllCards]);
  
  const experiences = [
    {
      company: "DaarAI Ltd",
      location: "England-London (Remote)",
      position: "Full Stack Developer",
      period: "2024 - Present",
      gradient: "from-blue-600 via-indigo-500 to-purple-500",
      responsibilities: [
        "Building smart web applications integrated with AI APIs",
        "Developing frontend dashboards and backend services",
        "Collaborating with cross-functional teams to ship scalable systems"
      ]
    },
    {
      company: "Redang Company",
      location: "Kurdistan",
      position: "Full Stack Developer",
      period: "2022 - 2024 (~2 years)",
      gradient: "from-purple-600 via-pink-500 to-red-500",
      responsibilities: [
        "Built and maintained internal tools and business web applications",
        "Collaborated with design and backend teams to launch new product features",
        "Used React, Tailwind, and Node.js to deliver scalable solutions"
      ]
    },
    {
      company: "MeatversPlus",
      location: "United Arab Emirates-Dubai",
      position: "Frontend Developer",
      period: "2021 - 2022 (1 year)",
      gradient: "from-indigo-600 via-blue-500 to-cyan-500",
      responsibilities: [
        "Developed dynamic user interfaces for web apps",
        "Improved performance and user experience",
        "Implemented clean, modular code using modern frontend frameworks"
      ]
    }
  ];

  return (
    <section 
      id="experience" 
      className="py-10"
      ref={sectionRef}
      style={{ position: 'relative' }}
    >
      <div className="container mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className={`section-title text-center mb-8 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}
        >
          Work Experience
        </motion.h2>

        <div 
          className="w-full flex justify-center items-center" 
          style={{ 
            height: '50vh', 
            position: 'relative',
            zIndex: 1
          }}
          ref={scrollStackRef}
        >
          {/* Initial scroll prompt - positioned at the top of the cards */}
          <AnimatePresence>
            {showInitialScrollPrompt && (
              <motion.div
                key="scroll-down"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="absolute top-0 left-0 right-0 flex items-center justify-center z-10 pointer-events-none"
              >
                <div className="text-center py-4">
                  <h3 className={`text-3xl font-bold mb-1 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                    Scroll Down
                  </h3>
                  <motion.div 
                    animate={{ y: [0, 10, 0] }} 
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="mt-1"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* End text that appears when scroll is complete */}
          <AnimatePresence>
            {showEndText && !isScrollingUpRef.current && (
              <motion.div 
                key="end-text"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="absolute bottom-10 left-0 right-0 z-50 pointer-events-none"
              >
                <div className="text-center">
                  
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <ScrollStack 
            className="w-full h-full mt-20"
            itemDistance={40} 
            itemScale={0.1}
            itemStackDistance={15} 
            baseScale={0.92}
            blurAmount={2}
            rotationAmount={0.8}
            onStackComplete={() => {
              // Delay setting hasViewedAllCards to ensure all animations are complete
              setTimeout(() => {
                setHasViewedAllCards(true);
                setShowInitialScrollPrompt(false);
                isScrollingUpRef.current = false;
                
                // Get the scroll container and store its current position
                const scrollContainer = sectionRef.current?.querySelector('[style*="overflow-y: auto"]');
                if (scrollContainer) {
                  // Force a specific scroll position to ensure cards are visible
                  const lastCardPosition = scrollContainer.scrollHeight * 0.65;
                  scrollContainer.scrollTo({
                    top: lastCardPosition,
                    behavior: 'auto'
                  });
                  
                  // Store this position for reference
                  scrollPositionRef.current = lastCardPosition;
                  lastScrollTopRef.current = lastCardPosition;
                }
              }, 100);
            }}
          >
            {experiences.map((exp, index) => (
              <ScrollStackItem 
                key={index} 
                itemClassName={`${isDarkMode ? 'bg-gray-900/90' : 'bg-white/90'} border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} mx-auto max-w-3xl`}
              >
                <div className="relative overflow-hidden p-4 sm:p-6">
                  <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b bg-gradient-primary"></div>
                  
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 pl-4">
                    <div>
                      <h3 className={`text-lg sm:text-xl md:text-2xl font-bold flex items-center bg-gradient-to-r ${exp.gradient} bg-clip-text text-transparent`}>
                        <FaBriefcase className={`mr-2 ${isDarkMode ? 'text-primary-400' : 'text-primary-600'}`} /> {exp.position}
                      </h3>
                      <div className={`flex items-center mt-1 sm:mt-2 text-sm sm:text-base ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        <FaBuilding className={`mr-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} /> 
                        <span className={`font-medium bg-gradient-to-r ${exp.gradient} bg-clip-text text-transparent`}>{exp.company}</span>
                        <span className="mx-2">•</span>
                        <span>{exp.location}</span>
                      </div>
                    </div>
                    <div className={`flex items-center mt-2 md:mt-0 text-sm sm:text-base ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      <FaCalendarAlt className="mr-2" /> {exp.period}
                    </div>
                  </div>
                  
                  <ul className="mt-3 sm:mt-4 space-y-2 pl-4">
                    {exp.responsibilities.map((resp, respIndex) => (
                      <li
                        key={respIndex}
                        className="flex items-start text-sm sm:text-base"
                      >
                        <span className={`inline-block w-2 h-2 rounded-full mt-1.5 mr-3 ${isDarkMode ? 'bg-primary-400' : 'bg-primary-600'}`}></span>
                        <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollStackItem>
            ))}
          </ScrollStack>
        </div>
      </div>
    </section>
  );
};

export default Experience; 