import React, { useEffect, useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import LottieMoon from './LottieMoon';
import StarsBackground from './StarsBackground';
import SimpleModelViewer from './3D/SimpleModelViewer';
import './about.css'; // Import the CSS file for animations

const About = () => {
  const { isDarkMode } = useTheme();
  const [dimensions, setDimensions] = useState({ width: 500, height: 500 });
  
  // Update dimensions based on screen size
  useEffect(() => {
    const updateDimensions = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      if (width < 640) { // sm
        setDimensions({ width: width * 0.95, height: height * 0.6 });
      } else if (width < 768) { // md
        setDimensions({ width: width * 0.6, height: height * 0.7 });
      } else if (width < 1024) { // lg
        setDimensions({ width: width * 0.55, height: height * 0.8 });
      } else if (width < 1280) { // xl
        setDimensions({ width: width * 0.45, height: height * 0.8 });
      } else { // 2xl and above
        // For very large screens, use fixed dimensions to prevent issues
        setDimensions({ width: 700, height: 700 });
      }
    };
    
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);
  
  return (
    <section 
      id="about"   
      className="relative min-h-screen py-20 flex items-center overflow-hidden"
      style={{ 
        backgroundColor:  '#050505', 
        color:'#f8f9fa',
        zIndex: 1 
      }} 
    >
      {/* Stars Background */}
      <StarsBackground />
      
      {/* Moon Animation */}
     
      
      <div className="container mx-auto px-4 relative z-10 flex flex-col md:flex-row justify-between items-center">
        <div className="max-w-2xl mb-10 md:mb-0 md:w-1/2 lg:w-2/5 md:pr-8 relative">
          {/* Astronaut background image */}
          <div 
            className="absolute inset-0 z-0 astronaut-float" 
            style={{
              backgroundImage: 'url(/images/astronout.png)',
              backgroundSize: 'contain',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              opacity: 0.5,
            }}
          ></div>
          
          {/* Content with relative positioning to appear above the background */}
          <div className="relative z-10">
            <h2 
              className="text-4xl md:text-5xl font-bold mb-8" 
              style={{ 
                fontFamily: 'Raleway, sans-serif',
                background: 'linear-gradient(to right,rgb(31, 69, 194), #fbd786, #f7797d)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                textFillColor: 'transparent'
              }}
            >
              Professional Summary
            </h2>
            
            <div className="space-y-6 text-lg">
              <p>
                I'm a passionate Full Stack Developer with expertise in building modern web applications 
                using cutting-edge technologies. My journey in software development has equipped me with 
                a diverse skill set spanning front-end and back-end development.
              </p>
              
              <p>
                With a strong foundation in JavaScript and its frameworks, I specialize in creating 
                responsive, user-friendly interfaces that deliver exceptional user experiences. I'm 
                particularly interested in animation, interactive design, and performance optimization.
              </p>
              
              <p>
                I thrive in collaborative environments and enjoy tackling complex problems with elegant 
                solutions. My goal is to continue growing as a developer while contributing to projects 
                that make a positive impact.
              </p>
            </div>
          </div>
        </div>
        
         <div className="mt-8 md:mt-0 flex justify-center items-center w-full md:w-1/2 lg:w-3/5 md:pl-8">
           <div className="w-full h-full flex justify-center items-center" style={{ minHeight: '600px' }}>
             <SimpleModelViewer
            url="/models/Moon.glb"
            width={dimensions.width}
            height={dimensions.height}
            environmentPreset="sunset"
            modelScale={8.0}
          />
          </div>
        </div>


      </div>

    
    </section>
  );
};

export default About; 