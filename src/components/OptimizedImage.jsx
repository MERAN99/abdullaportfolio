import React, { useState, useEffect } from 'react';
import LoadingIndicator from './LoadingIndicator';

const OptimizedImage = ({ 
  src, 
  alt, 
  className = '', 
  width, 
  height, 
  style = {},
  lowQualitySrc, // Optional low quality placeholder
  priority = false // Set to true for above-the-fold images
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);
  
  // Generate a low-quality placeholder if not provided
  const placeholder = lowQualitySrc || `${src}?quality=10&w=50`;
  
  useEffect(() => {
    // Preload high-resolution image
    if (priority) {
      const img = new Image();
      img.src = src;
      img.onload = () => setIsLoaded(true);
      img.onerror = () => setError(true);
    }
  }, [src, priority]);
  
  const handleImageLoad = () => {
    setIsLoaded(true);
  };
  
  const handleImageError = () => {
    setError(true);
  };
  
  return (
    <div 
      className={`relative ${className}`}
      style={{ 
        width: width || '100%', 
        height: height || 'auto',
        overflow: 'hidden',
        ...style
      }}
    >
      {!isLoaded && !error && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <LoadingIndicator message="Loading image..." />
        </div>
      )}
      
      {/* Low quality placeholder */}
      {!isLoaded && !error && (
        <img
          src={placeholder}
          alt={alt}
          className="w-full h-full object-cover filter blur-md transition-opacity duration-300"
          style={{ opacity: 0.7 }}
        />
      )}
      
      {/* Main image with lazy loading */}
      <img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        loading={priority ? "eager" : "lazy"}
        onLoad={handleImageLoad}
        onError={handleImageError}
      />
      
      {/* Error state */}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <p className="text-red-500">Failed to load image</p>
        </div>
      )}
    </div>
  );
};

export default OptimizedImage; 