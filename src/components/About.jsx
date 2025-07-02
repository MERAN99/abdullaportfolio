import React from 'react';
import { useTheme } from '../context/ThemeContext';
import LottieMoon from './LottieMoon';

const About = () => {
  const { isDarkMode } = useTheme();
  
  return (
    <section 
      id="about" 
      className="relative min-h-screen py-20 flex items-center overflow-hidden"
      style={{
        backgroundColor: isDarkMode ? '#050505' : '#f8f9fa',
        color: isDarkMode ? '#f8f9fa' : '#212529',
        zIndex: 1
      }}
    >
      {/* Moon Animation */}
      <LottieMoon />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl">
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
      </div>
    </section>
  );
};

export default About; 