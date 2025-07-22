import { FaHeart, FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const footerRef = useRef(null);
  
  // Track mouse position for parallax effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (footerRef.current) {
        const { left, top, width, height } = footerRef.current.getBoundingClientRect();
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
  
  return (
    <footer 
      ref={footerRef}
      className="relative overflow-hidden py-12 bg-gray-950"
    >
      {/* Space background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Deep space background */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, #030310 0%, #05051a 100%)',
          }}
        ></div>
        
        {/* Stars layer - CSS generated */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(1px 1px at ${Math.random() * 100}% ${Math.random() * 100}%, rgba(255, 255, 255, 0.7), transparent),
                              radial-gradient(2px 2px at ${Math.random() * 100}% ${Math.random() * 100}%, rgba(255, 255, 255, 0.7), transparent),
                              radial-gradient(1px 1px at ${Math.random() * 100}% ${Math.random() * 100}%, rgba(255, 255, 255, 0.7), transparent),
                              radial-gradient(1px 1px at ${Math.random() * 100}% ${Math.random() * 100}%, rgba(255, 255, 255, 0.7), transparent)`,
            backgroundSize: '500px 500px',
            opacity: 0.7,
            transform: `translateX(${mousePosition.x * -10}px) translateY(${mousePosition.y * -10}px)`,
            transition: 'transform 0.1s ease-out',
          }}
        ></div>
        
        {/* Nebula effect */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'radial-gradient(circle at 30% 70%, rgba(79, 70, 229, 0.2) 0%, transparent 60%), radial-gradient(circle at 70% 30%, rgba(30, 64, 175, 0.2) 0%, transparent 60%)',
            transform: `translateX(${mousePosition.x * -20}px) translateY(${mousePosition.y * -20}px)`,
            transition: 'transform 0.2s ease-out',
          }}
        ></div>
        
        {/* Horizontal glowing line */}
        <div 
          className="absolute top-0 left-0 right-0 h-[1px]"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(30, 58, 138, 0.5), transparent)',
            boxShadow: '0 0 8px rgba(30, 58, 138, 0.8), 0 0 16px rgba(30, 58, 138, 0.4)'
          }}
        ></div>
        
        {/* Floating particles */}
        <div className="absolute inset-0">
          {[...Array(10)].map((_, i) => (
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
                x: [Math.random() * 30 - 15, Math.random() * 30 - 15],
                y: [Math.random() * 30 - 15, Math.random() * 30 - 15],
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
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        {/* Main footer content */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 md:mb-0"
          >
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start mb-3">
                <div className="h-10 w-10 rounded-lg overflow-hidden border border-blue-900/30 mr-3 relative">
                  {/* Logo or profile image */}
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-800 via-blue-900 to-purple-900"></div>
                  <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-lg">A</div>
                  
                  {/* Corner accents */}
                  <div className="absolute top-0 left-0 w-2 h-2 border-t-[1px] border-l-[1px] border-blue-400/60"></div>
                  <div className="absolute top-0 right-0 w-2 h-2 border-t-[1px] border-r-[1px] border-blue-400/60"></div>
                  <div className="absolute bottom-0 left-0 w-2 h-2 border-b-[1px] border-l-[1px] border-blue-400/60"></div>
                  <div className="absolute bottom-0 right-0 w-2 h-2 border-b-[1px] border-r-[1px] border-blue-400/60"></div>
                </div>
                
                <div>
                  <p className="text-gray-300 font-semibold">
                    &copy; {currentYear} Abdulla Mohammed Ahmed
                  </p>
                  <p className="text-gray-500 text-sm">
                    All rights reserved
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col items-center md:items-end"
          >
            {/* Social links */}
            <div className="flex space-x-4 mb-4">
              <motion.a
                href="#"
                className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-800 border border-blue-900/30 text-blue-400 hover:bg-gray-700 transition-colors relative overflow-hidden group"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-900/0 via-blue-900/20 to-blue-900/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <FaGithub size={16} />
              </motion.a>
              
              <motion.a
                href="#"
                className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-800 border border-blue-900/30 text-blue-400 hover:bg-gray-700 transition-colors relative overflow-hidden group"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-900/0 via-blue-900/20 to-blue-900/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <FaLinkedin size={16} />
              </motion.a>
              
              <motion.a
                href="#"
                className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-800 border border-blue-900/30 text-blue-400 hover:bg-gray-700 transition-colors relative overflow-hidden group"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-900/0 via-blue-900/20 to-blue-900/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <FaTwitter size={16} />
              </motion.a>
            </div>
            
            <p className="text-center md:text-right flex items-center text-gray-300">
              Made with 
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="mx-1"
              >
                <FaHeart className="text-blue-700" />
              </motion.div>
              using 
              <span className="bg-gradient-to-r from-blue-800 via-indigo-700 to-purple-800 inline-block text-transparent bg-clip-text ml-1 font-semibold">
                React & Tailwind CSS
              </span>
            </p>
          </motion.div>
        </div>
        
        {/* Bottom border with glow */}
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-blue-900/30"></div>
        <motion.div 
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-[1px] bg-blue-700/60"
          style={{ width: '50%' }}
          animate={{
            width: ['0%', '50%', '0%'],
            left: ['0%', '50%', '100%'],
            x: ['-0%', '-50%', '-100%'],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
    </footer>
  );
};

export default Footer; 