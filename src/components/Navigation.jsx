import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSun, FaMoon, FaBars, FaTimes } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';

const NAV_ITEMS = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'languages', label: 'Languages' },
  { id: 'contact', label: 'Contact' },
];

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);

      // Find active section
      const sections = NAV_ITEMS.map((item) => item.id);
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const top = el.getBoundingClientRect().top;
          if (top <= 120) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    setIsOpen(false);
    setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (!el) return;
      const offset = window.innerWidth < 768 ? 70 : 80;
      const top = el.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: 'smooth' });
      setActiveSection(sectionId);
    }, 100);
  };

  return (
    <nav
      className="fixed top-0 left-0 w-full z-50 transition-all duration-300 glossy-nav"
      style={{
        background: scrolled
          ? 'rgba(3, 7, 18, 0.85)'
          : 'rgba(3, 7, 18, 0.4)',
        borderBottom: scrolled ? '1px solid rgba(99,136,255,0.12)' : '1px solid transparent',
        boxShadow: scrolled ? '0 4px 30px rgba(0,0,0,0.4)' : 'none',
        padding: scrolled ? '0.6rem 0' : '1rem 0',
      }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-xl font-bold gradient-text"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            Abdulla.dev
          </motion.button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="relative px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                style={{
                  color: activeSection === item.id ? '#a5b4fc' : '#64748b',
                  background: activeSection === item.id ? 'rgba(99,102,241,0.1)' : 'transparent',
                }}
              >
                {item.label}
                {activeSection === item.id && (
                  <motion.div
                    layoutId="navIndicator"
                    className="absolute bottom-0.5 left-3 right-3 h-0.5 rounded-full"
                    style={{ background: 'linear-gradient(90deg, #6366f1, #8b5cf6)' }}
                    transition={{ type: 'spring', stiffness: 500, damping: 40 }}
                  />
                )}
              </button>
            ))}

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="ml-2 p-2 rounded-lg transition-all duration-200"
              style={{
                background: 'rgba(99,102,241,0.1)',
                border: '1px solid rgba(99,102,241,0.2)',
                color: '#a5b4fc',
              }}
            >
              {isDarkMode ? <FaSun size={14} /> : <FaMoon size={14} />}
            </button>
          </div>

          {/* Mobile */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg"
              style={{
                background: 'rgba(99,102,241,0.1)',
                border: '1px solid rgba(99,102,241,0.2)',
                color: '#a5b4fc',
              }}
            >
              {isDarkMode ? <FaSun size={14} /> : <FaMoon size={14} />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg"
              style={{
                background: 'rgba(99,102,241,0.1)',
                border: '1px solid rgba(99,102,241,0.2)',
                color: '#a5b4fc',
              }}
            >
              {isOpen ? <FaTimes size={16} /> : <FaBars size={16} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="md:hidden mt-3 overflow-hidden"
            >
              <div
                className="rounded-xl p-3"
                style={{
                  background: 'rgba(15,23,42,0.95)',
                  border: '1px solid rgba(99,136,255,0.15)',
                }}
              >
                {NAV_ITEMS.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="flex items-center w-full px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 mb-1"
                    style={{
                      color: activeSection === item.id ? '#a5b4fc' : '#64748b',
                      background: activeSection === item.id ? 'rgba(99,102,241,0.1)' : 'transparent',
                    }}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navigation;