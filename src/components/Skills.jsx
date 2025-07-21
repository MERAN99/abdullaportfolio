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
      {/* Enhanced icon container with glossy effect */}
      <div 
        className="text-center relative z-10 p-3 rounded-full"
        style={{
          background: isDarkMode 
            ? 'linear-gradient(135deg, rgba(60, 60, 70, 0.8) 0%, rgba(30, 30, 40, 0.8) 100%)' 
            : 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(240, 240, 240, 0.8) 100%)',
          boxShadow: isHovered 
            ? `0 4px 8px rgba(0,0,0,0.15), 
               inset 0 -2px 5px ${isDarkMode ? 'rgba(0,0,0,0.1)' : 'rgba(0,0,0,0.1)'}, 
               inset 0 2px 5px ${isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.5)'}` 
            : `0 2px 4px rgba(0,0,0,0.1), 
               inset 0 -1px 3px ${isDarkMode ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,0.05)'}, 
               inset 0 1px 3px ${isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.3)'}`,
          transform: isHovered ? `translateZ(10px) translateX(${mousePosition.x * -3}px) translateY(${mousePosition.y * -3}px)` : 'translateZ(0)',
          transition: 'all 0.2s ease-out',
        }}
      >
        {/* Icon with glow effect */}
        <div 
          style={{
            filter: isHovered ? 'drop-shadow(0 0 3px rgba(255,255,255,0.3))' : 'none',
            transform: isHovered ? 'scale(1.1)' : 'scale(1)',
            transition: 'all 0.2s ease-out',
          }}
        >
          {icon}
        </div>
        
        {/* Icon glossy highlight */}
        <div 
          className="absolute inset-0 rounded-full opacity-60 pointer-events-none"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 50%, rgba(255,255,255,0) 100%)',
            transform: isHovered ? `rotate(${mousePosition.x * 20}deg)` : 'rotate(0deg)',
            transition: 'transform 0.2s ease-out',
          }}
        ></div>
      </div>
      
      <span className={`mt-3 text-xs font-medium relative z-10 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
        {name}
      </span>
      
      {/* Enhanced glossy highlight effect */}
      <div 
        className="absolute inset-0 rounded-md pointer-events-none"
        style={{
          background: `linear-gradient(
            ${135 + (mousePosition.x * 30)}deg, 
            rgba(255,255,255,${isDarkMode ? '0.15' : '0.4'}) 0%, 
            rgba(255,255,255,0) 50%, 
            rgba(255,255,255,0) 100%
          )`,
          opacity: isHovered ? 0.8 : 0.3,
          transform: isHovered ? `translateX(${mousePosition.x * 5}px) translateY(${mousePosition.y * 5}px)` : 'none',
          transition: 'all 0.2s ease-out',
        }}
      ></div>
      
      {/* Bottom edge highlight */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-1/4 rounded-b-md pointer-events-none"
        style={{
          background: `linear-gradient(to top, 
            rgba(${isDarkMode ? '40,40,50' : '255,255,255'},0.2) 0%, 
            rgba(${isDarkMode ? '40,40,50' : '255,255,255'},0) 100%
          )`,
          opacity: isHovered ? 0.8 : 0.4,
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
                  backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.01)' : 'rgba(255, 255, 255, 0.08)',
                  backdropFilter: 'blur(16px)',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                  borderRadius: '0.75rem',
                  padding: '1.3rem',
                  height: '100%',
                  border: `1px solid ${isDarkMode ? 'rgba(255, 255, 255, 0.15)' : 'rgba(255, 255, 255, 0.4)'}`,
                }}
                whileHover={{ 
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.15), 0 4px 6px -2px rgba(0, 0, 0, 0.1)'
                }}
              >
                {/* Enhanced glossy effect overlay with reduced opacity */}
                <div 
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: `
                      linear-gradient(to bottom, 
                        rgba(255, 255, 255, ${isDarkMode ? '0.15' : '0.25'}) 0%, 
                        rgba(255, 255, 255, 0.03) 30%, 
                        rgba(${isDarkMode ? '0, 0, 0' : '255, 255, 255'}, 0.03) 70%, 
                        rgba(${isDarkMode ? '0, 0, 0' : '255, 255, 255'}, ${isDarkMode ? '0.1' : '0.15'}) 100%
                      )
                    `,
                    borderRadius: '0.75rem',
                  }}
                ></div>
                
                {/* Side edge glossy effect with reduced opacity */}
                <div 
                  className="absolute top-0 bottom-0 right-0 w-1/4 pointer-events-none"
                  style={{
                    background: `
                      linear-gradient(to left, 
                        rgba(255, 255, 255, ${isDarkMode ? '0.07' : '0.15'}) 0%, 
                        rgba(255, 255, 255, 0) 100%
                      )
                    `,
                    borderTopRightRadius: '0.75rem',
                    borderBottomRightRadius: '0.75rem',
                  }}
                ></div>
                
                <h3 className={`text-sm sm:text-lg font-semibold mb-4 bg-gradient-to-r ${
                  index === 0 ? 'from-blue-600 via-indigo-500 to-purple-500' : 
                  index === 1 ? 'from-purple-600 via-pink-500 to-red-500' : 
                  index === 2 ? 'from-indigo-600 via-blue-500 to-cyan-500' : 
                  'from-indigo-600 via-blue-500 to-cyan-500'
                } inline-block text-transparent bg-clip-text relative z-10 drop-shadow-sm`}>{category.title}</h3>
                
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

      {/* Navigation buttons with reduced opacity */}
      <button 
        className={`embla__button embla__button--prev ${
          isDarkMode ? 'bg-gray-800/60 text-gray-200' : 'bg-white/60 text-gray-800'
        } backdrop-filter backdrop-blur-sm`} 
        onClick={scrollPrev}
        style={{ 
          width: '2.5rem', 
          height: '2.5rem',
          border: `1px solid ${isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.3)'}`,
        }}
      >
        <FaArrowLeft size={16} />
      </button>
      
      <button 
        className={`embla__button embla__button--next ${
          isDarkMode ? 'bg-gray-800/60 text-gray-200' : 'bg-white/60 text-gray-800'
        } backdrop-filter backdrop-blur-sm`} 
        onClick={scrollNext}
        style={{ 
          width: '2.5rem', 
          height: '2.5rem',
          border: `1px solid ${isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.3)'}`,
        }}
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
          backgroundImage: 'url("/images/wallpaper1.jpg")',
          height: '100%'
        }}
      >
        {/* Dark overlay */}
        <div className={`absolute inset-0 ${isDarkMode ? 'bg-black/70' : 'bg-black/50'}`}></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10000">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="section-title text-center mb-8 text-red z-9999999"
        >
          Skills
        </motion.h2>
        <SkillCarousel categories={skillCategories} isDarkMode={isDarkMode} />
      </div>
    </section>
  );
};

export default Skills; 