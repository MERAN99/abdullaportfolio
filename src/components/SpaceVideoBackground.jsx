import React, { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

// Space video background component
const SpaceVideoBackground = () => {
  const { isDarkMode } = useTheme();
  const canvasRef = useRef(null);
  const starsRef = useRef([]);
  const requestIdRef = useRef(null);

  // Create stars animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const stars = starsRef.current;
    
    // Set canvas to full screen
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Create stars
    const createStars = () => {
      const count = Math.floor(canvas.width * canvas.height / 1000);
      stars.length = 0;
      
      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 1.5 + 0.5,
          vx: Math.floor(Math.random() * 50) - 25,
          vy: Math.floor(Math.random() * 50) - 25,
          opacity: Math.random()
        });
      }
    };
    
    createStars();
    
    // Animation function
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw stars
      stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, 2 * Math.PI);
        ctx.fillStyle = isDarkMode 
          ? `rgba(255, 255, 255, ${star.opacity})` 
          : `rgba(255, 255, 255, ${star.opacity * 0.7})`;
        ctx.fill();
        
        // Move stars
        star.x += star.vx / 100;
        star.y += star.vy / 100;
        
        // Wrap around edges
        if (star.x < 0) star.x = canvas.width;
        if (star.x > canvas.width) star.x = 0;
        if (star.y < 0) star.y = canvas.height;
        if (star.y > canvas.height) star.y = 0;
        
        // Twinkle effect
        star.opacity = Math.sin(Date.now() / 1000 * star.vx / 10) * 0.5 + 0.5;
      });
      
      requestIdRef.current = requestAnimationFrame(animate);
    };
    
    // Start animation
    animate();
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(requestIdRef.current);
    };
  }, [isDarkMode]);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 z-0"
      style={{
        background: isDarkMode 
          ? 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)' 
          : 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
      }}
    />
  );
};

export default SpaceVideoBackground; 