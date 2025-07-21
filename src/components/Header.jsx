import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaChevronDown } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
import SplitText from './Animations/animationText/SplitText';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isDarkMode } = useTheme();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const headerRef = useRef(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  // Track mouse position for subtle parallax effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!headerRef.current) return;
      
      const rect = headerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Only update if position changed significantly to reduce re-renders
      if (Math.abs(mousePosition.x - x) > 5 || Math.abs(mousePosition.y - y) > 5) {
        setMousePosition({ x, y });
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mousePosition]);
  
  // Scroll down function
  const scrollDown = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header ref={headerRef} className="min-h-screen flex flex-col justify-center relative overflow-hidden py-0">
      <div className="container mx-auto px-4 relative z-10 flex flex-col h-full justify-center">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          {/* Profile Section */}
          <div className="flex items-center mb-6 md:mb-0">
            
            <div>
              
                   <SplitText
                    text="Abdulla.Dev"
                    className="text-5xl font-semibold text-center z-60 text-blue-300 "
                    delay={100}
                    duration={0.6}
                    ease="power3.out"
                    splitType="chars"
                    from={{ opacity: 0, y: 40 }}
                    to={{ opacity: 1, y: 0 }}
                    threshold={0.1}
                    rootMargin="-100px"
                    textAlign="center"
                  />
           
           
              <motion.p 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-xl md:text-2xl z-50000000000 mt-4 text-white"
                style={{
                  transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
                  textShadow: '0 0 20px rgba(100, 100, 255, 0.4)'
                }}
              >
                Full Stack Developer
              </motion.p>
            </div>
          </div>

          {/* Contact Info */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col space-y-3 md:space-y-4 backdrop-blur-sm bg-black/20 p-5 rounded-lg"
            style={{
              transform: `translate(${mousePosition.x * -0.01}px, ${mousePosition.y * -0.01}px)`,
              boxShadow: '0 0 30px rgba(0, 0, 255, 0.2)'
            }}
          >
            <a 
              href="mailto:abdulla.mhammad99@gmail.com" 
              className="flex items-center transition-colors group text-white hover:text-blue-300"
            >
              <span className="p-2 rounded-full mr-3 transition-colors bg-blue-900/40 text-blue-300 group-hover:bg-blue-800/50">
                <FaEnvelope />
              </span>
              <span>abdulla.mhammad99@gmail.com</span>
            </a>
            <a 
              href="tel:+9647707401199" 
              className="flex items-center transition-colors group text-white hover:text-blue-300"
            >
              <span className="p-2 rounded-full mr-3 transition-colors bg-blue-900/40 text-blue-300 group-hover:bg-blue-800/50">
                <FaPhone />
              </span>
              <span>+964 770 749 1199</span>
            </a>
            <div className="flex items-center text-white">
              <span className="p-2 rounded-full mr-3 bg-blue-900/40 text-blue-300">
                <FaMapMarkerAlt />
              </span>
              <span>Kalar, As Sulaymaniyah - Iraq</span>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Scroll down indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.5, 
          delay: 0.8,
          y: {
            duration: 1,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }
        }}
        onClick={scrollDown}
      >
        <div className="flex flex-col items-center mb-8">
          <span className="text-white text-sm mb-2">Scroll Down</span>
          <FaChevronDown className="text-blue-300 text-2xl" />
        </div>
      </motion.div>
    </header>
  );
};

export default Header; 