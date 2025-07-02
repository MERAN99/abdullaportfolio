import { FaHeart } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { isDarkMode } = useTheme();
  
  return (
    <footer className={`relative overflow-hidden py-8 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'} transition-colors duration-300`}>
      {/* Background gradient overlay */}
      <div 
        className="absolute inset-0 z-0" 
        style={{ 
          background: isDarkMode 
            ? 'linear-gradient(135deg, rgba(30, 41, 59, 0.7) 0%, rgba(15, 23, 42, 0.8) 100%)' 
            : 'linear-gradient(135deg, rgba(240, 245, 255, 0.7) 0%, rgba(220, 230, 255, 0.8) 100%)',
        }}
      />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-4 md:mb-0"
          >
            <p className={`text-center md:text-left ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              &copy; {currentYear} Abdulla Mohammed Ahmed. All rights reserved.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center"
          >
            <p className={`text-center md:text-right flex items-center ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Made with <FaHeart className="mx-1 text-red-400 animate-pulse" /> using 
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-300 inline-block text-transparent bg-clip-text ml-1 font-semibold">
                React & Tailwind CSS
              </span>
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 