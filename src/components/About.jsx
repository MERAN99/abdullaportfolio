import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const About = () => {
  const { isDarkMode } = useTheme();
  
  return (
    <section id="about" className={`py-16 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
      <div className="container mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="section-title text-center"
        >
          Professional Summary
        </motion.h2>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="max-w-3xl mx-auto text-center"
        >
          <p className={`text-lg leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            <span className="font-semibold bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-500 inline-block text-transparent bg-clip-text">Passionate Full Stack Developer</span> with over 4 years of hands-on experience building modern, 
            responsive web and mobile applications. Proficient in both frontend and backend technologies 
            with a strong foundation in computer science and real-world development experience in 
            international and local companies.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default About; 