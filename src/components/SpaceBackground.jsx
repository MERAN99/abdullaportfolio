import React from 'react';
import SpaceParticles from './SpaceParticles';
import ShootingStars from './ShootingStars';
import { useTheme } from '../context/ThemeContext';

const SpaceBackground = ({ children }) => {
  const { isDarkMode } = useTheme();
  
  return (
    <div className="relative overflow-hidden min-h-screen">
      {/* Video background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute w-full h-full object-cover earth-video"
          style={{ 
            filter: isDarkMode ? 'brightness(0.7) contrast(1.1)' : 'brightness(0.9) contrast(1.1)',
            objectPosition: 'center center'
          }}
        >
          <source src="/videos/Earth.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Overlay for better visibility */}
        <div 
          className="absolute inset-0 z-0" 
          style={{ 
            background: isDarkMode 
              ? 'linear-gradient(135deg, rgba(15, 23, 42, 0.7) 0%, rgba(30, 41, 59, 0.7) 100%)' 
              : 'linear-gradient(135deg, rgba(30, 41, 59, 0.5) 0%, rgba(51, 65, 85, 0.5) 100%)',
          }}
        />
      </div>
      
      {/* Interactive particles */}
      <SpaceParticles />
      
      {/* Shooting stars */}
      <ShootingStars />
      
      {/* Overlay gradient for better text visibility */}
      <div 
        className="absolute inset-0 z-0 bg-gradient-to-b from-transparent via-transparent to-black/40"
        style={{ backdropFilter: 'blur(1px)' }}
      />
      
      {/* Content */}
      <div className="relative z-10 min-h-screen pt-16">
        {children}
      </div>
    </div>
  );
};

export default SpaceBackground; 