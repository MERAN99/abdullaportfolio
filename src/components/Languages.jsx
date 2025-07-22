import { motion } from 'framer-motion';
import { FaLanguage, FaFacebook } from 'react-icons/fa';
import { useState, useEffect, useRef } from 'react';

const Languages = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sectionRef = useRef(null);
  
  // Track mouse position for parallax effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (sectionRef.current) {
        const { left, top, width, height } = sectionRef.current.getBoundingClientRect();
        const x = (e.clientX - left) / width;
        const y = (e.clientY - top) / height;
        setMousePosition({ x, y });
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  const languages = [
    { 
      name: "Kurdish", 
      level: "Native", 
      proficiency: 100,
      gradient: "from-indigo-800 via-blue-900 to-purple-900",
      color: "blue"
    },
    { 
      name: "Arabic", 
      level: "Fluent", 
      proficiency: 90,
      gradient: "from-purple-900 via-indigo-900 to-blue-900",
      color: "purple"
    },
    { 
      name: "English", 
      level: "Fluent", 
      proficiency: 85,
      gradient: "from-blue-900 via-indigo-900 to-cyan-900",
      color: "cyan"
    }
  ];

  return (
    <section 
      id="languages" 
      className="py-16 relative overflow-hidden min-h-screen flex items-center"
      ref={sectionRef}
    >
      {/* Sci-fi background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Deep space background */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, #030310 0%, #05051a 50%, #030310 100%)',
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
                              radial-gradient(1px 1px at ${Math.random() * 100}% ${Math.random() * 100}%, rgba(255, 255, 255, 0.7), transparent)`,
            backgroundSize: '500px 500px',
            opacity: 0.7,
            transform: `translateX(${mousePosition.x * -10}px) translateY(${mousePosition.y * -10}px)`,
            transition: 'transform 0.1s ease-out',
          }}
        ></div>
        
        {/* Nebula effects */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'radial-gradient(circle at 30% 30%, rgba(79, 70, 229, 0.2) 0%, transparent 70%), radial-gradient(circle at 70% 70%, rgba(30, 64, 175, 0.2) 0%, transparent 70%)',
            transform: `translateX(${mousePosition.x * -30}px) translateY(${mousePosition.y * -30}px)`,
            transition: 'transform 0.3s ease-out',
          }}
        ></div>
        
        {/* Floating particles */}
        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => (
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
        
        {/* Holographic rings */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full border"
            style={{
              width: `${(i + 1) * 30}%`,
              height: `${(i + 1) * 30}%`,
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              opacity: 0.1,
              borderColor: 'rgba(30, 58, 138, 0.3)',
            }}
            animate={{
              rotate: [0, 360],
              scale: [1, 1.05, 1],
            }}
            transition={{
              rotate: {
                duration: 20 + i * 10,
                repeat: Infinity,
                ease: "linear",
              },
              scale: {
                duration: 8,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }
            }}
          />
        ))}
        
        {/* Horizontal scan line */}
        <motion.div
          className="absolute left-0 right-0 h-[1px]"
          style={{
            background: 'rgba(30, 58, 138, 0.3)',
            boxShadow: '0 0 8px rgba(30, 58, 138, 0.8), 0 0 16px rgba(30, 58, 138, 0.4)'
          }}
          animate={{
            top: ['0%', '100%'],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="section-title text-center text-gray-100 mb-12"
          style={{
            textShadow: '0 0 10px rgba(30, 58, 138, 0.5)',
            fontFamily: 'Raleway, sans-serif',
            // background: 'linear-gradient(to right, #1e3a8a, #4338ca, #6d28d9)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Languages
        </motion.h2>

        <div className="mt-10 max-w-3xl mx-auto backdrop-blur-sm">
          {languages.map((language, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="mb-8 p-6 rounded-xl bg-gray-900/60 backdrop-blur-md border border-blue-900/30 relative overflow-hidden"
              style={{
                boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.5), 0 0 15px rgba(30, 58, 138, 0.2)',
              }}
            >
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
              <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-blue-900/60 rounded-tl-xl" />
              <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-blue-900/60 rounded-tr-xl" />
              <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-blue-900/60 rounded-bl-xl" />
              <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-blue-900/60 rounded-br-xl" />
              
              {/* Content */}
              <div className="relative z-10">
                <div className="flex items-center mb-4">
                  <div className="p-2 rounded-full bg-blue-950/50 mr-3">
                    <FaLanguage className="text-blue-700" size={24} />
                  </div>
                  <h3 className={`text-xl font-medium bg-gradient-to-r ${language.gradient} bg-clip-text text-transparent`}>
                    {language.name}
                  </h3>
                  <span className="ml-auto text-gray-300 bg-gray-900/80 px-3 py-1 rounded-full text-sm">
                    {language.level}
                  </span>
                </div>
                
                <div className="w-full rounded-full h-3 bg-gray-800/70 relative overflow-hidden">
                  {/* Animated pulse effect */}
                  <motion.div
                    className="absolute inset-0 opacity-20"
                    style={{
                      background: `linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)`,
                      backgroundSize: '50% 100%',
                    }}
                    animate={{
                      backgroundPosition: ['-100% 0', '200% 0'],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                  
                  {/* Progress bar */}
                  <motion.div 
                    className={`h-full rounded-full bg-gradient-to-r ${language.gradient}`}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${language.proficiency}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: 0.3 + (index * 0.2) }}
                  >
                    {/* Animated glow effect */}
                    <motion.div
                      className="absolute top-0 bottom-0 right-0 w-8"
                      style={{
                        background: `linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.5))`,
                      }}
                      animate={{
                        opacity: [0, 1, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut",
                      }}
                    />
                  </motion.div>
                  
                  {/* Percentage indicator */}
                  <div 
                    className="absolute right-0 top-0 transform translate-x-full mt-5 text-sm text-blue-700"
                    style={{
                      textShadow: '0 0 5px rgba(30, 58, 138, 0.5)',
                    }}
                  >
                    {language.proficiency}%
                  </div>
                </div>
                
                {/* Data points */}
                <div className="flex mt-4 space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <div 
                      key={i} 
                      className="h-1 w-1 rounded-full"
                      style={{
                        backgroundColor: i < Math.floor(language.proficiency / 20) ? 
                          `rgba(${language.color === 'blue' ? '30, 58, 138' : 
                                  language.color === 'purple' ? '67, 56, 202' : 
                                  '8, 47, 73'}, 0.8)` : 
                          'rgba(31, 41, 55, 0.5)',
                      }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-16 flex justify-center"
            id="contact"
          >
            {/* Enhanced beautiful contact button */}
            <motion.a
              href="https://www.facebook.com/share/1BfeW4WCLL/?mibextid=wwXIfr"
              target="_blank"
              rel="noopener noreferrer"
              className="relative flex items-center justify-center gap-3 px-8 py-4 overflow-hidden rounded-xl font-medium text-white shadow-2xl"
              style={{
                background: 'linear-gradient(135deg, rgba(30, 58, 138, 0.8) 0%, rgba(37, 99, 235, 0.9) 100%)',
              }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: '0 0 25px rgba(30, 64, 175, 0.6)'
              }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Animated background effect */}
              <motion.div 
                className="absolute inset-0 -z-10" 
                style={{
                  background: 'linear-gradient(135deg, rgba(30, 64, 175, 0.5) 0%, rgba(37, 99, 235, 0.8) 50%, rgba(30, 58, 138, 0.5) 100%)',
                  backgroundSize: '200% 200%',
                }}
                animate={{
                  backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              
              {/* Star field background */}
              <div 
                className="absolute inset-0 -z-20 opacity-20"
                style={{
                  backgroundImage: `radial-gradient(1px 1px at ${Math.random() * 100}% ${Math.random() * 100}%, rgba(255, 255, 255, 0.8), transparent),
                                    radial-gradient(1px 1px at ${Math.random() * 100}% ${Math.random() * 100}%, rgba(255, 255, 255, 0.8), transparent),
                                    radial-gradient(1px 1px at ${Math.random() * 100}% ${Math.random() * 100}%, rgba(255, 255, 255, 0.8), transparent)`,
                }}
              />
              
              {/* Border glow */}
              <motion.div 
                className="absolute inset-0 -z-10 opacity-0 rounded-xl"
                style={{
                  boxShadow: 'inset 0 0 20px rgba(147, 197, 253, 0.5)',
                }}
                animate={{
                  opacity: [0, 0.5, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              
              {/* Icon with glow */}
              <div className="relative">
                <FaFacebook size={24} className="text-white" />
                <motion.div
                  className="absolute inset-0 rounded-full"
                  animate={{
                    boxShadow: [
                      '0 0 0 0 rgba(255, 255, 255, 0)',
                      '0 0 0 4px rgba(255, 255, 255, 0.3)',
                      '0 0 0 0 rgba(255, 255, 255, 0)',
                    ]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeOut"
                  }}
                />
              </div>
              
              {/* Text with animated underline */}
              <div className="relative">
                <span className="text-lg font-semibold tracking-wider">Contact Me</span>
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-[1px] bg-white/60"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              
              {/* Animated corner accents */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-white/40 rounded-tl" />
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-white/40 rounded-tr" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-white/40 rounded-bl" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-white/40 rounded-br" />
              
              {/* Outer pulse effect */}
              <motion.div
                className="absolute inset-0 rounded-xl -z-30"
                animate={{
                  boxShadow: [
                    '0 0 0 0 rgba(30, 64, 175, 0)',
                    '0 0 0 10px rgba(30, 64, 175, 0.2)',
                    '0 0 0 20px rgba(30, 64, 175, 0)',
                  ]
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeOut"
                }}
              />
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Languages; 