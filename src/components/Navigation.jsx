import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSun, FaMoon, FaBars, FaTimes } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('about');
  const [scrolled, setScrolled] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();
  const mobileMenuRef = useRef(null);
  const scrolling = useRef(false);

  const navItems = [
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' },
    { id: 'education', label: 'Education' },
    { id: 'languages', label: 'Languages' }
  ];

  // Helper function to get element position with better accuracy
  const getElementPosition = (elementId) => {
    const element = document.getElementById(elementId);
    if (!element) return null;
    
    const rect = element.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    return {
      top: rect.top + scrollTop,
      left: rect.left,
      width: rect.width,
      height: rect.height
    };
  };

  useEffect(() => {
    const handleScroll = () => {
      // Don't update during programmatic scrolling
      if (scrolling.current) return;
      
      const sections = navItems.map(item => item.id);
      
      // Check if page is scrolled
      if (window.scrollY > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
      
      // Determine active section
      const current = sections.filter(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 150 && rect.bottom >= 150;
        }
        return false;
      });
      
      if (current.length) {
        setActiveSection(current[0]);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [navItems]);

  // Effect to scroll active item into view in mobile menu
  useEffect(() => {
    if (isOpen && mobileMenuRef.current) {
      const activeItem = mobileMenuRef.current.querySelector(`[data-section="${activeSection}"]`);
      if (activeItem) {
        setTimeout(() => {
          activeItem.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 300);
      }
    }
  }, [isOpen, activeSection]);

  const scrollToSection = (sectionId) => {
    const position = getElementPosition(sectionId);
    if (position) {
      // Close mobile menu first
      setIsOpen(false);
      
      // Add a small delay before scrolling to ensure menu closing animation completes
      setTimeout(() => {
        // Calculate offset based on window width (mobile vs desktop)
        const offset = window.innerWidth < 768 ? 70 : 100;
        
        // Set scrolling flag to prevent scroll event handler from changing active section
        scrolling.current = true;
        
        // Scroll to the element
        window.scrollTo({
          top: position.top - offset,
          behavior: 'smooth'
        });
        
        // Update active section
        setActiveSection(sectionId);
        
        // Reset scrolling flag after animation completes
        setTimeout(() => {
          scrolling.current = false;
        }, 800);
      }, 100);
    }
  };

  const handleThemeToggle = () => {
    console.log("Theme toggle clicked, current theme:", isDarkMode ? "dark" : "light");
    toggleTheme();
  };

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 backdrop-blur-md ${
        scrolled 
          ? isDarkMode ? 'bg-gray-950/90 shadow-lg py-2 border-b border-gray-800' : 'bg-white/90 shadow-lg py-2'
          : 'bg-gray-900/80 py-4 border-b border-gray-800/50'
      }`}
      style={{
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        boxShadow: scrolled 
          ? (isDarkMode ? '0 4px 30px rgba(0, 0, 0, 0.3)' : '0 4px 30px rgba(0, 0, 0, 0.1)')
          : '0 4px 30px rgba(0, 0, 0, 0.4)',
        background: scrolled 
          ? (isDarkMode ? 'rgba(10, 10, 20, 0.9)' : 'rgba(255, 255, 255, 0.9)') 
          : 'linear-gradient(to bottom right, rgba(17, 24, 39, 0.85), rgba(10, 10, 20, 0.9))'
      }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo/Brand */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-2xl font-bold"
          >
            <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 inline-block text-transparent bg-clip-text">Abdulla.dev</span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <ul className="flex space-x-1">
              {navItems.map(item => (
                <li key={item.id}>
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className={`px-4 py-2 rounded-full text-base font-medium transition-all relative overflow-hidden ${
                      isDarkMode ? 'hover:bg-gray-800/50' : scrolled ? 'hover:bg-primary-100' : 'hover:bg-gray-800/50'
                    } ${
                      activeSection === item.id 
                        ? isDarkMode || !scrolled ? 'text-blue-300' : 'text-primary-600'
                        : isDarkMode || !scrolled ? 'text-gray-300 hover:text-blue-300' : 'text-gray-700 hover:text-primary-600'
                    }`}
                  >
                    {item.label}
                    {activeSection === item.id && (
                      <motion.div
                        layoutId="activeSection"
                        className={`absolute bottom-0 left-0 right-0 h-0.5 rounded-full ${
                          isDarkMode || !scrolled
                            ? 'bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400' 
                            : 'bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500'
                        }`}
                        initial={{ width: '0%', x: '-50%', opacity: 0 }}
                        animate={{ width: '100%', x: '0%', opacity: 1 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 40 }}
                      />
                    )}
                    <motion.div
                      className={`absolute bottom-0 left-0 right-0 h-0.5 rounded-full ${
                        isDarkMode || !scrolled
                          ? 'bg-gradient-to-r from-blue-400/40 via-purple-400/40 to-pink-400/40' 
                          : 'bg-gradient-to-r from-blue-500/40 via-indigo-500/40 to-purple-500/40'
                      }`}
                      initial={{ width: '0%', opacity: 0 }}
                      whileHover={{ width: '100%', opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      style={{ display: activeSection === item.id ? 'none' : 'block' }}
                    />
                  </button>
                </li>
              ))}
            </ul>

            {/* Theme Toggle Button */}
            <button
              onClick={handleThemeToggle}
              className={`ml-4 p-2 rounded-full transition-colors ${
                isDarkMode || !scrolled
                  ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDarkMode ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-primary-600" />}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={handleThemeToggle}
              className={`p-2 mr-2 rounded-full transition-colors ${
                isDarkMode || !scrolled
                  ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDarkMode ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-primary-600" />}
            </button>

            <button 
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-md focus:outline-none ${
                isDarkMode || !scrolled ? 'text-primary-300' : 'text-primary-600'
              }`}
              aria-label="Open menu"
            >
              {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              ref={mobileMenuRef}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className={`md:hidden mt-4 rounded-xl shadow-lg overflow-hidden max-h-[60vh] overflow-y-auto no-scrollbar ${
                isDarkMode || !scrolled ? 'bg-gray-900 border border-gray-800' : 'bg-white'
              }`}
              style={{
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                boxShadow: isDarkMode || !scrolled 
                  ? '0 8px 32px rgba(0, 0, 0, 0.4)' 
                  : '0 8px 32px rgba(0, 0, 0, 0.1)',
                background: isDarkMode || !scrolled
                  ? 'linear-gradient(135deg, rgba(17, 24, 39, 0.95), rgba(10, 10, 20, 0.97))'
                  : 'rgba(255, 255, 255, 0.97)'
              }}
            >
              <ul className="py-2">
                {navItems.map(item => (
                  <motion.li 
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <button
                      data-section={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`block w-full text-left px-4 py-3 text-base relative ${
                        activeSection === item.id 
                          ? isDarkMode || !scrolled
                            ? 'bg-gray-800/50 text-blue-300 font-medium' 
                            : 'bg-primary-50 text-primary-600 font-medium'
                          : isDarkMode || !scrolled ? 'text-gray-300 hover:text-gray-200' : 'text-gray-700'
                      }`}
                    >
                      {item.label}
                      {activeSection === item.id && (
                        <motion.div 
                          className={`h-0.5 mt-1 rounded-full ${
                            isDarkMode || !scrolled
                              ? 'bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400' 
                              : 'bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500'
                          }`}
                          initial={{ width: 0 }}
                          animate={{ width: '100%' }}
                          transition={{ duration: 0.3 }}
                        />
                      )}
                    </button>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navigation; 