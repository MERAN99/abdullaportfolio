import { useEffect, useState } from 'react';
import Header from './components/Header';
import Navigation from './components/Navigation';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Education from './components/Education';
import Languages from './components/Languages';
import Footer from './components/Footer';
import ScrollProgressBar from './components/ScrollProgressBar';
import { ThemeProvider } from './context/ThemeContext';
import { BlinkBlur } from 'react-loading-indicators';

import './index.css';

const AppContent = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.title = 'Abdulla Mohammed Ahmed | Portfolio';
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div
        className="fixed inset-0 flex items-center justify-center"
        style={{ background: '#030712' }}
      >
        <div className="flex flex-col items-center gap-4">
          <div
            className="text-2xl font-bold gradient-text"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            Abdulla.dev
          </div>
          <BlinkBlur color="#6366f1" size="medium" text="" textColor="#ffffff" />
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen"
      style={{ background: '#030712', color: '#f1f5f9' }}
    >
      <Navigation />
      <ScrollProgressBar />

      <main>
        <Header />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Education />
        <Languages />
      </main>

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
