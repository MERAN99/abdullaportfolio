import { motion } from 'framer-motion';
import { FaGraduationCap, FaUniversity, FaCalendarAlt } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';

const Education = () => {
  const { isDarkMode } = useTheme();
  
  return (
    <section id="education" className="py-16">
      <div className="container mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className={`section-title text-center ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}
        >
          Education
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={`mt-10 max-w-2xl mx-auto rounded-lg shadow-lg p-6 relative ${isDarkMode ? 'bg-gray-800/80' : 'bg-white/80'} backdrop-blur-sm`}
        >
          <div className="absolute top-0 left-0 w-2 h-full bg-gradient-primary rounded-l-lg"></div>
          
          <div className="flex items-center mb-4">
            <div className="bg-gradient-primary p-3 rounded-full text-white mr-4">
              <FaGraduationCap size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold bg-gradient-to-r from-indigo-600 via-blue-500 to-cyan-500 inline-block text-transparent bg-clip-text">Bachelor of Computer Science</h3>
              <div className={`flex items-center mt-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                <FaUniversity className={`mr-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} /> 
                <span>University of Sulaymaniyah</span>
              </div>
            </div>
          </div>
          
          <div className={`flex items-center ml-16 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            <FaCalendarAlt className="mr-2" /> 
            <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 inline-block text-transparent bg-clip-text font-medium">Graduated: 2024</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Education; 