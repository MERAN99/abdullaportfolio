import { useEffect, useRef, useState } from 'react';
import Header from './components/Header';
import Navigation from './components/Navigation';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Education from './components/Education';
import Languages from './components/Languages';
import Footer from './components/Footer';
import MusicPlayer from './components/MusicPlayer';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { ParallaxBackground, ParallaxWrapper } from './components/ParallaxBackground';
import SpaceBackground from './components/SpaceBackground';
import {BlinkBlur} from 'react-loading-indicators';


import './index.css';
import './gradient.css';

// Wrapper component that uses the theme context
const AppContent = () => {
  const { isDarkMode } = useTheme();
  const appRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    document.title = "Abdulla Mohammed Ahmed | Portfolio";
    
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  // Add smooth scroll listener for better performance
  useEffect(() => {
    const appContainer = appRef.current;
    if (!appContainer) return;

    const handleScroll = () => {
      // Optimize animations by using requestAnimationFrame
      window.requestAnimationFrame(() => {
        // This is intentionally left empty as our parallax components 
        // handle their own animations, but having this helps with performance
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black">
        <div className="flex flex-col items-center">
        <BlinkBlur color="#a5dbfb" size="large" text="Loading" textColor="#ffffff" />
        
        </div>
      </div>
    );
  }
  
  return (
    <div 
      ref={appRef}
      className={`min-h-screen ${isDarkMode ? 'bg-gray-950 text-gray-100' : 'bg-white text-gray-900'} transition-colors duration-300 no-scrollbar`}
    >
      <Navigation />
      <MusicPlayer />
      
      <ParallaxWrapper>
        {/* Header section with space background */}
        <div className="relative" style={{ minHeight: '80vh' }}>
          <SpaceBackground>
            <Header />
          </SpaceBackground>
        </div>
        
        <ParallaxBackground section="about">
          <About />
        </ParallaxBackground>
        
        <ParallaxBackground section="skills">
          <Skills />
        </ParallaxBackground>
        
        <ParallaxBackground section="experience">
          <Experience />
        </ParallaxBackground>
        
        <ParallaxBackground section="education">
          <Education />
        </ParallaxBackground>
        
        <ParallaxBackground section="languages">
          <Languages />
        </ParallaxBackground>
      </ParallaxWrapper>
      
      <Footer />
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
