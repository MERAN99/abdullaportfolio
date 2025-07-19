import React from 'react';
import { motion } from 'framer-motion';
import { useState, useRef, useEffect, useCallback } from 'react';
import { FaHtml5, FaCss3Alt, FaReact, FaNodeJs, FaGitAlt, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { SiJavascript, SiTailwindcss, SiExpress, SiUnrealengine, SiBlender } from 'react-icons/si';
import { useTheme } from '../context/ThemeContext';
import useEmblaCarousel from 'embla-carousel-react';
import './embla-carousel.css';
import ScrollStack,{  ScrollStackItem } from './Animations/StackViewer/ScrollStack';

// Simple skill item component with parallax effect
const SkillItem = ({ icon, name, isDarkMode }) => {
  const cardRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Calculate rotation based on mouse position
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Calculate distance from center (normalized to -1 to 1)
    const x = (e.clientX - centerX) / (rect.width / 2);
    const y = (e.clientY - centerY) / (rect.height / 2);
    
    setMousePosition({ x, y });
  };

  return (
    <motion.div
      ref={cardRef}
      className={`flex flex-col items-center justify-center p-5 rounded-md transition-all 
        ${isDarkMode ? 'hover:bg-gray-700/60' : 'hover:bg-white/60'} 
        backdrop-filter backdrop-blur-sm 
        ${isHovered ? 'shadow-lg' : 'shadow-md'} 
        border border-opacity-20 ${isDarkMode ? 'border-gray-500/30' : 'border-white/30'}
        bg-gradient-to-br ${isDarkMode ? 'from-gray-800/70 to-gray-900/70' : 'from-white/70 to-gray-100/70'}
      `}
      style={{
        transform: isHovered ? `perspective(1000px) rotateX(${mousePosition.y * 10}deg) rotateY(${-mousePosition.x * 10}deg)` : 'none',
        transition: 'transform 0.2s ease-out',
        boxShadow: isHovered ? 
          `0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23), 
           inset 0 -3px 8px ${isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.4)'},
           inset 0 3px 8px ${isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.2)'}` : 
          `0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)`,
      }}
      whileHover={{ scale: 1.05 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setMousePosition({ x: 0, y: 0 });
      }}
    >
      <div className="text-center relative z-10">
        {icon}
      </div>
      <span className={`mt-2 text-xs font-medium relative z-10 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
        {name}
      </span>
      
      {/* Glossy highlight effect */}
      <div 
        className="absolute inset-0 rounded-md opacity-30 bg-gradient-to-t from-transparent via-transparent to-white"
        style={{
          transform: isHovered ? `translateX(${mousePosition.x * 5}px) translateY(${mousePosition.y * 5}px)` : 'none',
          transition: 'transform 0.2s ease-out',
        }}
      ></div>
    </motion.div>
  );
};

// Embla Carousel component for skill categories
const SkillCarousel = ({ categories, isDarkMode }) => {
  // Set up Embla Carousel with options
  const [emblaRef, emblaApi] = useEmblaCarousel({   
    containScroll: 'trimSnaps',  
    slidesToScroll: 'auto',
  });

  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index) => emblaApi && emblaApi.scrollTo(index * 2), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(Math.floor(emblaApi.selectedScrollSnap() / 2));
    setPrevBtnEnabled(emblaApi.canScrollPrev());
    setNextBtnEnabled(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  // Update CSS variables to make components smaller
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--slide-height', '15rem'); // Smaller height
    root.style.setProperty('--slide-spacing', '0.75rem'); // Smaller spacing
  }, []);

  // Create an array with just 2 items for the dots
  const dotIndexes = [0, 1];

  return (
    <div className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {categories.map((category, index) => (
            <div key={index} className="embla__slide">
              <motion.div 
                className="embla__slide__inner relative overflow-hidden"
                style={{ 
                  backgroundColor: isDarkMode ? 'rgba(31, 41, 55, 0.7)' : 'rgba(255, 255, 255, 0.15)',
                  backdropFilter: 'blur(8px)',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                  borderRadius: '0.75rem',
                  padding: '1.3rem',
                  height: '100%',
                  border: `1px solid ${isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.3)'}`,
                }}
                whileHover={{ 
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
                }}
              >
                {/* Glossy effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent pointer-events-none rounded-t-lg" 
                     style={{ height: '30%', top: 0 }}></div>
                
                <h3 className={`text-sm sm:text-lg font-semibold mb-4 bg-gradient-to-r ${
                  index === 0 ? 'from-blue-600 via-indigo-500 to-purple-500' : 
                  index === 1 ? 'from-purple-600 via-pink-500 to-red-500' : 
                  index === 2 ? 'from-indigo-600 via-blue-500 to-cyan-500' : 
                  'from-indigo-600 via-blue-500 to-cyan-500'
                } inline-block text-transparent bg-clip-text relative z-10`}>{category.title}</h3>
                
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="grid grid-cols-2 gap-3 relative z-10"
                >
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skillIndex}
                      variants={itemVariants}
                    >
                      <SkillItem 
                        icon={skill.icon}
                        name={skill.name}
                        isDarkMode={isDarkMode}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation buttons */}
      <button 
        className={`embla__button embla__button--prev ${
          isDarkMode ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-800'
        }`} 
        onClick={scrollPrev}
        style={{ width: '2.5rem', height: '2.5rem' }} // Smaller buttons
      >
        <FaArrowLeft size={16} />
      </button>
      
      <button 
        className={`embla__button embla__button--next ${
          isDarkMode ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-800'
        }`} 
        onClick={scrollNext}
        style={{ width: '2.5rem', height: '2.5rem' }} // Smaller buttons
      >
        <FaArrowRight size={16} />
      </button>


    </div>
  );
};

const Skills = () => {
  const { isDarkMode } = useTheme();
  const skillCategories = [
    {
      title: "Frontend",
      gradient: "text-gradient-primary",
      skills: [
        { name: "HTML5", icon: <FaHtml5 className="text-orange-500" size={24} /> },
        { name: "CSS3", icon: <FaCss3Alt className="text-blue-500" size={24} /> },
        { name: "JavaScript", icon: <SiJavascript className="text-yellow-500" size={24} /> },
        { name: "React", icon: <FaReact className="text-blue-400" size={24} /> },
        { name: "React Native", icon: <FaReact className="text-sky-500" size={24} /> },
        { name: "Tailwind CSS", icon: <SiTailwindcss className="text-teal-500" size={24} /> },
      ]
    },
    {
      title: "Backend",
      gradient: "text-gradient-secondary",
      skills: [
        { name: "Node.js", icon: <FaNodeJs className="text-green-600" size={24} /> },
        { name: "Express.js", icon: <SiExpress className={isDarkMode ? "text-gray-400" : "text-gray-600"} size={24} /> },
      ]
    },
    {
      title: "Game Development",
      gradient: "text-gradient-vibrant",
      skills: [
        { name: "Unreal Engine", icon: <SiUnrealengine className="text-blue-500" size={24} /> },
        { name: "Blender", icon: <SiBlender className="text-orange-500" size={24} /> },
      ]
    },
    {
      title: "Other Tools",
      gradient: "text-gradient-vibrant",
      skills: [
        { name: "Git", icon: <FaGitAlt className="text-red-500" size={24} /> },
        { name: "REST APIs", icon: <div className="text-gradient-primary text-lg">API</div> },
        { name: "Responsive Design", icon: <div className="text-gradient-secondary text-lg">RWD</div> },
      ]
    }
  ];
  //  

  return (
    <section id="skills" className="py-12 relative">
      {/* Wallpaper background with dark overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center" 
        style={{ 
          backgroundImage: 'url("/images/wallpaper.jpg")',
          height: '100%'
        }}
      >
        {/* Dark overlay */}
        <div className={`absolute inset-0 ${isDarkMode ? 'bg-black/70' : 'bg-black/50'}`}></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="section-title text-center mb-8 text-white"
        >
          Skills
        </motion.h2>
        <SkillCarousel categories={skillCategories} isDarkMode={isDarkMode} />
      </div>
    </section>
  );
};

export default Skills; 