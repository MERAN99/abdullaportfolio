import { motion, useTransform, useScroll } from 'framer-motion';
import { FaBriefcase, FaBuilding, FaCalendarAlt } from 'react-icons/fa';
import { useRef, useEffect, useState } from 'react';

const Experience = () => {
  const sectionRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Track mouse position for parallax effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  const experiences = [
    {
      company: "DaarAI Ltd",
      location: "England-London (Remote)",
      position: "Full Stack Developer",
      period: "2024 - Present",
      gradient: "from-indigo-800 via-blue-900 to-purple-900",
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
      gradient: "from-purple-900 via-indigo-900 to-blue-900",
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
      gradient: "from-blue-900 via-indigo-900 to-cyan-900",
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
      className="py-6 relative overflow-hidden"
      ref={sectionRef}
    >
      {/* Sci-fi background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Deep space background */}
        <div 
          className="absolute inset-0 bg-black"
          style={{
            backgroundImage: 'radial-gradient(circle at center, rgba(8, 12, 32, 0.8) 0%, rgba(4, 4, 16, 0.9) 50%, rgba(0, 0, 0, 1) 100%)',
          }}
        ></div>
        
        {/* Stars layer - CSS generated */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(1px 1px at ${Math.random() * 100}% ${Math.random() * 100}%, rgba(255, 255, 255, 0.7), transparent),
                              radial-gradient(2px 2px at ${Math.random() * 100}% ${Math.random() * 100}%, rgba(255, 255, 255, 0.7), transparent),
                              radial-gradient(1px 1px at ${Math.random() * 100}% ${Math.random() * 100}%, rgba(255, 255, 255, 0.7), transparent),
                              radial-gradient(2px 2px at ${Math.random() * 100}% ${Math.random() * 100}%, rgba(255, 255, 255, 0.7), transparent),
                              radial-gradient(1px 1px at ${Math.random() * 100}% ${Math.random() * 100}%, rgba(255, 255, 255, 0.7), transparent),
                              radial-gradient(1px 1px at ${Math.random() * 100}% ${Math.random() * 100}%, rgba(255, 255, 255, 0.7), transparent),
                              radial-gradient(2px 2px at ${Math.random() * 100}% ${Math.random() * 100}%, rgba(255, 255, 255, 0.7), transparent),
                              radial-gradient(1px 1px at ${Math.random() * 100}% ${Math.random() * 100}%, rgba(255, 255, 255, 0.7), transparent)`,
            backgroundSize: '400px 400px',
            opacity: 0.6,
            transform: `translateX(${mousePosition.x * -10}px) translateY(${mousePosition.y * -10}px)`,
            transition: 'transform 0.1s ease-out',
          }}
        ></div>
        
        {/* Nebula effect - using existing image */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: 'url("/images/astronout_Book.jpg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'hue-rotate(240deg) brightness(0.3) contrast(1.1)',
            transform: `translateX(${mousePosition.x * -20}px) translateY(${mousePosition.y * -20}px)`,
            transition: 'transform 0.2s ease-out',
          }}
        ></div>
        
        {/* Grid lines */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(30, 58, 138, 0.3) 25%, rgba(30, 58, 138, 0.3) 26%, transparent 27%, transparent 74%, rgba(30, 58, 138, 0.3) 75%, rgba(30, 58, 138, 0.3) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(30, 58, 138, 0.3) 25%, rgba(30, 58, 138, 0.3) 26%, transparent 27%, transparent 74%, rgba(30, 58, 138, 0.3) 75%, rgba(30, 58, 138, 0.3) 76%, transparent 77%, transparent)',
            backgroundSize: '50px 50px',
            transform: `translateX(${mousePosition.x * -5}px) translateY(${mousePosition.y * -5}px)`,
          }}
        ></div>
        
        {/* Glowing horizontal lines */}
        <div className="absolute inset-0 flex flex-col justify-between">
          {[...Array(8)].map((_, i) => (
            <div 
              key={i} 
              className="h-px w-full"
              style={{
                background: `linear-gradient(90deg, transparent 0%, rgba(30, 58, 138, ${Math.random() * 0.3 + 0.1}) ${Math.random() * 20 + 40}%, rgba(30, 58, 138, ${Math.random() * 0.3 + 0.1}) ${Math.random() * 20 + 60}%, transparent 100%)`,
                opacity: Math.random() * 0.5 + 0.5,
                transform: `translateY(${mousePosition.y * (i % 2 === 0 ? -3 : 3)}px)`,
              }}
            ></div>
          ))}
        </div>
        
        {/* Floating particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: Math.random() * 3 + 1 + 'px',
                height: Math.random() * 3 + 1 + 'px',
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                backgroundColor: `rgba(${Math.random() * 50 + 100}, ${Math.random() * 50 + 100}, ${Math.random() * 50 + 150}, ${Math.random() * 0.5 + 0.5})`,
                boxShadow: `0 0 ${Math.random() * 5 + 5}px rgba(${Math.random() * 50 + 100}, ${Math.random() * 50 + 100}, ${Math.random() * 50 + 150}, 0.8)`,
              }}
              animate={{
                x: [Math.random() * 50 - 25, Math.random() * 50 - 25],
                y: [Math.random() * 50 - 25, Math.random() * 50 - 25],
                opacity: [Math.random() * 0.5 + 0.5, Math.random() * 0.5 + 0.5],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
        
        {/* Holographic overlay */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: 'linear-gradient(135deg, rgba(30, 58, 138, 0.1) 0%, transparent 100%)',
            opacity: 0.3,
          }}
        ></div>
        
        {/* Horizontal scan line */}
        <motion.div
          className="absolute left-0 right-0 h-[2px]"
          style={{
            background: 'rgba(30, 58, 138, 0.3)',
            boxShadow: '0 0 10px rgba(30, 58, 138, 0.6), 0 0 20px rgba(30, 58, 138, 0.3)'
          }}
          animate={{
            top: ['0%', '100%'],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      <div className="relative z-10 backdrop-blur-[2px]">
        <div className="flex h-20 items-center justify-center">
          <span className="font-semibold uppercase text-blue-700 tracking-wider text-sm">
            <motion.span
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Scroll down
            </motion.span>
          </span>
        </div>
        <HorizontalScrollCarousel experiences={experiences} />
        <div className="flex h-20 items-center justify-center">
          <span className="font-semibold uppercase text-blue-700 tracking-wider text-sm">
            <motion.span
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Scroll up
            </motion.span>
          </span>
        </div>
      </div>
    </section>
  );
};

const HorizontalScrollCarousel = ({ experiences }) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [1, 0], ["1%", "-95%"]);

  return (
    <section ref={targetRef} className="relative bg-transparent">
      <div className="sticky top-0 flex items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-8 px-4 py-8">
          {experiences.map((experience, index) => (
            <ExperienceCard key={index} experience={experience} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const ExperienceCard = ({ experience }) => {
  return (
    <div
      className="group relative h-[450px] w-[450px] overflow-hidden rounded-xl border border-blue-900/30 shadow-lg flex flex-col"
      style={{
        background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.8) 0%, rgba(15, 23, 42, 0.95) 100%)',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.5), 0 0 15px rgba(30, 58, 138, 0.2)',
      }}
    >
      {/* Sci-fi card effects */}
      <div className="absolute inset-0 overflow-hidden rounded-xl">
        {/* Animated border glow */}
        <motion.div
          className="absolute -inset-[1px] rounded-xl opacity-20"
          style={{
            background: `linear-gradient(90deg, transparent, rgba(30, 58, 138, 0.8), transparent)`,
            backgroundSize: '200% 100%',
          }}
          animate={{
            backgroundPosition: ['200% 0', '-200% 0'],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        
        {/* Corner accents */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-blue-900/60 rounded-tl-xl" />
        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-blue-900/60 rounded-tr-xl" />
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-blue-900/60 rounded-bl-xl" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-blue-900/60 rounded-br-xl" />
        
        {/* Tech circuit pattern - CSS generated */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(90deg, transparent 95%, rgba(30, 58, 138, 0.8) 95%, rgba(30, 58, 138, 0.8) 96%, transparent 96%),
              linear-gradient(0deg, transparent 95%, rgba(30, 58, 138, 0.8) 95%, rgba(30, 58, 138, 0.8) 96%, transparent 96%),
              radial-gradient(circle at 25% 25%, rgba(30, 58, 138, 0.5) 1px, transparent 1px),
              radial-gradient(circle at 75% 75%, rgba(30, 58, 138, 0.5) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px, 50px 50px, 100px 100px, 100px 100px',
          }}
        />
        
        {/* Glossy highlight */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            background: "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 50%)",
            borderRadius: "inherit"
          }}
        />
      </div>
      
      {/* Top accent bar */}
      <div className="absolute top-0 left-0 w-full h-1">
        <div className={`h-full bg-gradient-to-r ${experience.gradient}`}></div>
        <div className="absolute top-0 left-0 h-1 w-20 bg-white/30 animate-pulse"></div>
      </div>
      
      <div className="p-5 flex-1 flex flex-col relative z-10">
        <div className="mb-4">
          <h3 className={`text-xl font-bold flex items-center bg-gradient-to-r ${experience.gradient} bg-clip-text text-transparent`}>
            <FaBriefcase className="mr-2 text-blue-700" /> 
            {experience.position}
          </h3>
          
          <div className="flex items-center mt-2 text-gray-300">
            <FaBuilding className="mr-2 text-blue-700" /> 
            <span className={`font-medium bg-gradient-to-r ${experience.gradient} bg-clip-text text-transparent`}>
              {experience.company}
            </span>
          </div>
          
          <div className="flex items-center mt-1 text-sm text-gray-300">
            <span className="mr-2">{experience.location}</span>
          </div>
          
          <div className="flex items-center mt-2 text-sm text-gray-400">
            <FaCalendarAlt className="mr-2" /> {experience.period}
          </div>
        </div>
        
        <div className="mt-2 flex-1 bg-gray-900/50 rounded-lg p-4 backdrop-blur-sm border border-blue-900/20">
          <div className="flex items-center mb-2">
            <div className="h-1 w-1 rounded-full bg-blue-700 mr-1 animate-pulse"></div>
            <div className="h-1 w-1 rounded-full bg-blue-700 mr-1"></div>
            <h4 className="font-semibold text-sm text-blue-700 ml-1">
              Responsibilities:
            </h4>
          </div>
          <ul className="space-y-2">
            {experience.responsibilities.map((resp, respIndex) => (
              <li
                key={respIndex}
                className="flex items-start text-sm"
              >
                <span className="inline-block w-1.5 h-1.5 rounded-full mt-1.5 mr-2 bg-blue-700"></span>
                <span className="text-gray-300">{resp}</span>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Bottom data line */}
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-blue-900/30"></div>
        <div className="absolute bottom-0 left-0 h-[1px] w-1/3 bg-blue-700/60">
          <motion.div 
            className="absolute top-0 right-0 h-full w-4 bg-blue-700"
            animate={{ x: ['-100%', '400%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Experience; 