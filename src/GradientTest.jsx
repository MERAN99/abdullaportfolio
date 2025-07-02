import React from 'react';

const GradientTest = () => {
  return (
    <div className="p-8 bg-white dark:bg-gray-900 min-h-screen">
      <h1 className="text-4xl mb-8 text-center">Gradient Text Test Page</h1>
      
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
          <h2 className="text-2xl mb-2">Custom Utilities:</h2>
          <p className="text-3xl text-gradient-primary">Primary Gradient Text</p>
          <p className="text-3xl text-gradient-secondary mt-4">Secondary Gradient Text</p>
          <p className="text-3xl text-gradient-vibrant mt-4">Vibrant Gradient Text</p>
        </div>
        
        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
          <h2 className="text-2xl mb-2">Direct Tailwind Approach:</h2>
          <p className="text-3xl bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text">
            Tailwind Default Gradient
          </p>
        </div>
        
        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
          <h2 className="text-2xl mb-2">Inline Style Approach:</h2>
          <p className="text-3xl" style={{ 
            backgroundImage: 'linear-gradient(to right, #2a2a99, #4a4ad9, #6366f1)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
            display: 'inline-block'
          }}>
            Inline Style Gradient
          </p>
        </div>
      </div>
    </div>
  );
};

export default GradientTest; 