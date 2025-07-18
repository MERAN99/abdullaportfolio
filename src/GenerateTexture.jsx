import React, { useState } from 'react';
import CreateEducationTexture from './components/3D/CreateEducationTexture';
import { ThemeProvider, useTheme } from './context/ThemeContext';

const GenerateTextureContent = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [showInstructions, setShowInstructions] = useState(true);
  
  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'} transition-colors duration-300`}>
      <header className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">Education Lanyard Texture Generator</h1>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-white/20 transition-colors"
          >
            {isDarkMode ? '☀️' : '🌙'}
          </button>
        </div>
      </header>
      
      <main className="container mx-auto p-4 max-w-4xl">
        <div className={`mb-6 p-4 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Customize Your Education Lanyard</h2>
            <button 
              onClick={() => setShowInstructions(!showInstructions)}
              className={`px-3 py-1 rounded text-sm ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}`}
            >
              {showInstructions ? 'Hide Instructions' : 'Show Instructions'}
            </button>
          </div>
          
          {showInstructions && (
            <div className={`mb-6 p-4 rounded-lg ${isDarkMode ? 'bg-gray-700/50' : 'bg-gray-100'}`}>
              <h3 className="font-bold mb-2">Instructions:</h3>
              <ol className="list-decimal list-inside space-y-2">
                <li>Customize the education information and colors below</li>
                <li>Click "Generate & Download Texture" to create your texture</li>
                <li>Save the downloaded image as "education-lanyard.png"</li>
                <li>Move the image to the "public/models/" directory in your project</li>
                <li>The lanyard component will automatically use your new texture</li>
              </ol>
            </div>
          )}
          
          <CreateEducationTexture />
        </div>
        
        <div className="text-center mt-8">
          <a 
            href="/" 
            className={`inline-block px-6 py-3 rounded-lg font-medium ${
              isDarkMode 
                ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                : 'bg-blue-500 hover:bg-blue-600 text-white'
            } transition-colors`}
          >
            Return to Portfolio
          </a>
        </div>
      </main>
      
      <footer className={`mt-12 py-4 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'}`}>
        <div className="container mx-auto text-center text-sm">
          <p>Education Lanyard Texture Generator | Portfolio Project</p>
        </div>
      </footer>
    </div>
  );
};

const GenerateTexture = () => {
  return (
    <ThemeProvider>
      <GenerateTextureContent />
    </ThemeProvider>
  );
};

export default GenerateTexture; 