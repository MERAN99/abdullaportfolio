import { motion } from 'framer-motion';
import { FaGraduationCap, FaUniversity, FaCalendarAlt, FaPalette } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
import Lanyard from './3D/Lanyard'

const Education = () => {
  const { isDarkMode } = useTheme();
  
  return (
    <section 
      id="education" 
      className=" relative h-120 flex items-center"
      style={{
        backgroundImage: 'url("/images/astronout_Book.jpeg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        position: 'relative',
      }}
    >
      {/* Dark overlay */}
      <div 
        className="absolute inset-0" 
        style={{ 
          backgroundColor: isDarkMode ? 'rgba(0, 0, 0, 0.7)' : 'rgba(0, 0, 0, 0.5)',
          zIndex: 1 
        }}
      ></div>
      
      <div className="container mx-auto px-4 relative z-10 w-full">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="section-title text-center text-white"
        >
          Education
        </motion.h2>

       
      </div>
      
      {/* Lanyard component on top layer */}
      <div 
        className="absolute w-full z-50 pointer-events-auto"
        style={{
          pointerEvents: 'auto'
        }}
      >
        <Lanyard position={[0, 0, 38]} gravity={[0, -40, 0]} />
      </div>


    </section>
  );
};

export default Education; 