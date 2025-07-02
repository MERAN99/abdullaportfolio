import { motion } from 'framer-motion';
import { FaLanguage, FaFacebook } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';

const Languages = () => {
  const { isDarkMode } = useTheme();
  
  const languages = [
    { 
      name: "Kurdish", 
      level: "Native", 
      proficiency: 100,
      gradient: "text-gradient-primary"
    },
    { 
      name: "Arabic", 
      level: "Fluent", 
      proficiency: 90,
      gradient: "text-gradient-secondary"
    },
    { 
      name: "English", 
      level: "Fluent", 
      proficiency: 85,
      gradient: "text-gradient-vibrant"
    }
  ];

  return (
    <section id="languages" className="py-16">
      <div className="container mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className={`section-title text-center ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}
        >
          Languages
        </motion.h2>

        <div className="mt-10 max-w-3xl mx-auto">
          {languages.map((language, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className={`mb-6 p-4 rounded-lg ${isDarkMode ? 'bg-gray-800/70' : 'bg-white/70'} backdrop-blur-sm`}
            >
              <div className="flex items-center mb-2">
                <FaLanguage className={`mr-2 ${isDarkMode ? 'text-primary-400' : 'text-primary-600'}`} size={20} />
                <h3 className={`text-lg font-medium bg-gradient-to-r ${
                  index === 0 ? 'from-blue-600 via-indigo-500 to-purple-500' : 
                  index === 1 ? 'from-purple-600 via-pink-500 to-red-500' : 
                  'from-indigo-600 via-blue-500 to-cyan-500'
                } inline-block text-transparent bg-clip-text`}>{language.name}</h3>
                <span className={`ml-auto ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{language.level}</span>
              </div>
              
              <div className={`w-full rounded-full h-2.5 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                <motion.div 
                  className="bg-gradient-primary h-2.5 rounded-full" 
                  initial={{ width: 0 }}
                  whileInView={{ width: `${language.proficiency}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.3 + (index * 0.2) }}
                ></motion.div>
              </div>
            </motion.div>
          ))}
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-12 flex justify-center"
            id="contact"
          >
            <motion.a
              href="https://www.facebook.com/share/1BfeW4WCLL/?mibextid=wwXIfr"
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center justify-center gap-2 px-6 py-3 rounded-full font-medium text-white 
                bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 
                transition-all duration-300 shadow-lg hover:shadow-xl`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaFacebook size={20} />
              Contact Me
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Languages; 