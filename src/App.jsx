import { useEffect } from 'react';
import Header from './components/Header';
import Navigation from './components/Navigation';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Education from './components/Education';
import Languages from './components/Languages';
import Footer from './components/Footer';
import { ThemeProvider, useTheme } from './context/ThemeContext';

// Wrapper component that uses the theme context
const AppContent = () => {
  const { isDarkMode } = useTheme();
  
  useEffect(() => {
    document.title = "Abdulla Mohammed Ahmed | Portfolio";
  }, []);

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-950 text-gray-100' : 'bg-white text-gray-900'} transition-colors duration-300 no-scrollbar`}>
      <Navigation />
      <Header />
      <About />
      <Skills />
      <Experience />
      <Education />
      <Languages />
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
