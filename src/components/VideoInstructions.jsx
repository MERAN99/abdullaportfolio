import React, { useState, useEffect } from 'react';

const VideoInstructions = () => {
  const [videoExists, setVideoExists] = useState(null);
  
  // Check if video file exists
  useEffect(() => {
    const checkVideo = async () => {
      try {
        const response = await fetch('/videos/space-background.mp4', { method: 'HEAD' });
        setVideoExists(response.ok);
      } catch (error) {
        setVideoExists(false);
      }
    };
    
    checkVideo();
  }, []);
  
  if (videoExists === true) {
    return null; // Video exists, don't show instructions
  }
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
      <div className="bg-gray-800 p-6 rounded-lg max-w-2xl text-white shadow-2xl">
        <h2 className="text-2xl font-bold mb-4 text-blue-400">Video Background Setup</h2>
        
        <div className="mb-6">
          <p className="mb-4">To use your video as a background, please follow these steps:</p>
          
          <ol className="list-decimal pl-6 space-y-2">
            <li>Make sure the <code className="bg-gray-700 px-1 rounded">public/videos</code> folder exists in your project</li>
            <li>Place your space background video in this folder</li>
            <li>Rename your video to <code className="bg-gray-700 px-1 rounded">space-background.mp4</code></li>
            <li>Refresh this page</li>
          </ol>
        </div>
        
        <div className="bg-gray-700 p-4 rounded text-sm mb-6">
          <p className="font-bold mb-2">Directory Structure:</p>
          <pre className="whitespace-pre-wrap">
            portfolio/
            ├── public/
            │   └── videos/
            │       └── space-background.mp4  &lt;-- Place your video here
            ├── src/
            └── ...
          </pre>
        </div>
        
        <p className="text-yellow-300 font-semibold">
          Note: If you're seeing this message, it means the video file wasn't found at the expected location.
        </p>
        
        <button 
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white transition-colors"
        >
          I've added the video - Refresh
        </button>
      </div>
    </div>
  );
};

export default VideoInstructions; 