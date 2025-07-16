import React, { useEffect, useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import LottieMoon from './LottieMoon';
import StarsBackground from './StarsBackground';
import ModelViewer from './3D/ModelViewer';

const About = () => {
  const { isDarkMode } = useTheme();
  const [dimensions, setDimensions] = useState({ width: 400, height: 400 });
  const defaultZoom = 0.4;
  const modelScale = 2.0;
  
  // Update dimensions based on screen size
  useEffect(() => {
    const updateDimensions = () => {
      const width = window.innerWidth;
      if (width < 640) { // sm
        setDimensions({ width: 280, height: 280 });
      } else if (width < 768) { // md
        setDimensions({ width: 320, height: 320 });
      } else if (width < 1024) { // lg
        setDimensions({ width: 350, height: 350 });
      } else { // xl and above
        setDimensions({ width: 400, height: 400 });
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
        <div className="max-w-2xl mb-10 md:mb-0">
          <h2 className="text-4xl md:text-5xl font-bold mb-8" style={{ fontFamily: 'Raleway, sans-serif' }}>
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
        
         <div className="mt-8 md:mt-0">
           <ModelViewer
          key={`moon-model-${dimensions.width}-${defaultZoom}-${modelScale}`}
          url="/models/Moon.glb"
          width={dimensions.width}
          height={dimensions.height}
          environmentPreset="sunset"
          autoFrame={false}
          //enableHoverRotation={true}
          enableManualZoom={false}
          autoRotate={true}
          autoRotateSpeed={0.2}
          defaultZoom={defaultZoom}
          modelScale={modelScale}
        />
        </div>


      </div>

    
    </section>
  );
};

export default About; 