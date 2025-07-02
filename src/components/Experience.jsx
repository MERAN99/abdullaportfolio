import { motion } from 'framer-motion';
import { FaBriefcase, FaBuilding, FaCalendarAlt } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';

const Experience = () => {
  const { isDarkMode } = useTheme();
  
  const experiences = [
    {
      company: "DaarAI Ltd",
      location: "England-London (Remote)",
      position: "Full Stack Developer",
      period: "2024 - Present",
      gradient: "text-gradient-primary",
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
      gradient: "text-gradient-secondary",
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
      gradient: "text-gradient-vibrant",
      responsibilities: [
        "Developed dynamic user interfaces for web apps",
        "Improved performance and user experience",
        "Implemented clean, modular code using modern frontend frameworks"
      ]
    }
  ];

  return (
    <section id="experience" className={`py-16 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
      <div className="container mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="section-title text-center"
        >
          Work Experience
        </motion.h2>

        <div className="mt-10 space-y-10">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className={`rounded-lg shadow-lg p-6 relative overflow-hidden ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}
            >
              <div className="absolute top-0 left-0 w-2 h-full bg-gradient-primary"></div>
              
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                <div>
                  <h3 className={`text-xl font-bold flex items-center bg-gradient-to-r ${
                    index === 0 ? 'from-blue-600 via-indigo-500 to-purple-500' : 
                    index === 1 ? 'from-purple-600 via-pink-500 to-red-500' : 
                    'from-indigo-600 via-blue-500 to-cyan-500'
                  } bg-clip-text text-transparent`}>
                    <FaBriefcase className={`mr-2 ${isDarkMode ? 'text-primary-400' : 'text-primary-600'}`} /> {exp.position}
                  </h3>
                  <div className={`flex items-center mt-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    <FaBuilding className={`mr-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} /> 
                    <span className={`font-medium bg-gradient-to-r ${
                      index === 0 ? 'from-blue-600 via-indigo-500 to-purple-500' : 
                      index === 1 ? 'from-purple-600 via-pink-500 to-red-500' : 
                      'from-indigo-600 via-blue-500 to-cyan-500'
                    } bg-clip-text text-transparent`}>{exp.company}</span>
                    <span className="mx-2">•</span>
                    <span>{exp.location}</span>
                  </div>
                </div>
                <div className={`flex items-center mt-2 md:mt-0 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  <FaCalendarAlt className="mr-2" /> {exp.period}
                </div>
              </div>
              
              <ul className="mt-4 space-y-2">
                {exp.responsibilities.map((resp, respIndex) => (
                  <motion.li
                    key={respIndex}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.3 + (respIndex * 0.1) }}
                    className="flex items-start"
                  >
                    <span className={`inline-block w-2 h-2 rounded-full mt-2 mr-3 ${isDarkMode ? 'bg-primary-400' : 'bg-primary-600'}`}></span>
                    <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{resp}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience; 