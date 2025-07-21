import { motion, useTransform, useScroll } from 'framer-motion';
import { FaBriefcase, FaBuilding, FaCalendarAlt } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
import { useRef } from 'react';

const Experience = () => {
  const { isDarkMode } = useTheme();
  const sectionRef = useRef(null);
  
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
      className="py-6"
      ref={sectionRef}
    >
      <div className="bg-neutral-800">
        <div className="flex h-20 items-center justify-center">
          <span className="font-semibold uppercase text-neutral-500">
            Scroll down
          </span>
        </div>
        <HorizontalScrollCarousel experiences={experiences} isDarkMode={isDarkMode} />
        <div className="flex h-20 items-center justify-center">
          <span className="font-semibold uppercase text-neutral-500">
            Scroll up
          </span>
        </div>
      </div>
    </section>
  );
};

const HorizontalScrollCarousel = ({ experiences, isDarkMode }) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [1, 0], ["1%", "-95%"]);

  return (
    <section ref={targetRef} className="relative  bg-neutral-900">
      <div className="sticky top-0 flex  items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-8 px-4">
          {experiences.map((experience, index) => (
            <ExperienceCard key={index} experience={experience} isDarkMode={isDarkMode} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const ExperienceCard = ({ experience, isDarkMode }) => {
  return (
    <div
      className={`group relative h-[450px] w-[450px] overflow-hidden rounded-xl ${
        isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
      } shadow-lg flex flex-col`}
    >
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r bg-gradient-primary"></div>
      
      <div className="p-5 flex-1 flex flex-col">
        <div className="mb-4">
          <h3 className={`text-xl font-bold flex items-center bg-gradient-to-r ${experience.gradient} bg-clip-text text-transparent`}>
            <FaBriefcase className={`mr-2 ${isDarkMode ? 'text-primary-400' : 'text-primary-600'}`} /> 
            {experience.position}
          </h3>
          
          <div className={`flex items-center mt-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            <FaBuilding className={`mr-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} /> 
            <span className={`font-medium bg-gradient-to-r ${experience.gradient} bg-clip-text text-transparent`}>
              {experience.company}
            </span>
          </div>
          
          <div className={`flex items-center mt-1 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            <span className="mr-2">{experience.location}</span>
          </div>
          
          <div className={`flex items-center mt-2 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            <FaCalendarAlt className="mr-2" /> {experience.period}
          </div>
        </div>
        
        <div className={`mt-2 flex-1 ${isDarkMode ? 'bg-gray-800/50' : 'bg-gray-50'} rounded-lg p-4`}>
          <h4 className={`font-semibold mb-2 text-sm ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
            Responsibilities:
          </h4>
          <ul className="space-y-2">
            {experience.responsibilities.map((resp, respIndex) => (
              <li
                key={respIndex}
                className="flex items-start text-sm"
              >
                <span className={`inline-block w-1.5 h-1.5 rounded-full mt-1.5 mr-2 ${isDarkMode ? 'bg-primary-400' : 'bg-primary-600'}`}></span>
                <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{resp}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${experience.gradient} opacity-70`}></div>
      </div>
    </div>
  );
};

export default Experience; 