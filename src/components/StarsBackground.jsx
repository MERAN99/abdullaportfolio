import React, { useEffect, useRef } from 'react';

const StarsBackground = () => {
  const canvasRef = useRef(null);
  const starsRef = useRef([]);
  const requestIdRef = useRef(null);
  const lastTimeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    const stars = starsRef.current;
    
    // Set canvas to full screen
    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      
      // Set display size (css pixels)
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      
      // Set actual size in memory (scaled to account for extra pixel density)
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      
      // Normalize coordinate system to use css pixels
      ctx.scale(dpr, dpr);
      
      createStars();
    };
    
    // Create stars with more variety
    const createStars = () => {
      // Create a mix of bright and dim stars
      const count = Math.min(Math.floor((canvas.width * canvas.height) / 8000), 300);
      stars.length = 0;
      
      for (let i = 0; i < count; i++) {
        // Create different types of stars
        const isBrightStar = Math.random() < 0.2; // 20% chance of a bright star
        
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          // Vary star sizes more realistically
          radius: isBrightStar ? Math.random() * 2 + 1 : Math.random() * 1 + 0.2,
          // Base opacity - brighter stars are more consistent
          baseOpacity: isBrightStar ? Math.random() * 0.3 + 0.7 : Math.random() * 0.5 + 0.3,
          // Much slower twinkle for realistic effect
          twinkleSpeed: Math.random() * 0.0008 + 0.0001, // Significantly reduced speed
          twinkleAmount: isBrightStar ? 0.15 : 0.25, // Bright stars twinkle less
          twinkleOffset: Math.random() * Math.PI * 2, // Random starting point in the sine wave
          // Some stars don't twinkle much at all
          noTwinkle: Math.random() < 0.3 // 30% chance of minimal twinkling
        });
      }
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Animation function with time-based animation
    const animate = (timestamp) => {
      if (!lastTimeRef.current) lastTimeRef.current = timestamp;
      const deltaTime = timestamp - lastTimeRef.current;
      lastTimeRef.current = timestamp;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw stars
      stars.forEach(star => {
        // Calculate opacity with much more subtle twinkling
        let opacityVariation = star.noTwinkle ? 
          star.twinkleAmount * 0.2 : // Very minimal variation for "fixed" stars
          Math.sin(timestamp * star.twinkleSpeed + star.twinkleOffset) * star.twinkleAmount;
        
        star.opacity = Math.max(0.1, Math.min(1, star.baseOpacity + opacityVariation));
        
        // Draw the star with a subtle glow for brighter stars
        if (star.radius > 1) {
          // Draw glow
          const gradient = ctx.createRadialGradient(
            star.x, star.y, 0,
            star.x, star.y, star.radius * 4
          );
          gradient.addColorStop(0, `rgba(255, 255, 255, ${star.opacity * 0.8})`);
          gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
          
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.radius * 4, 0, 2 * Math.PI);
          ctx.fillStyle = gradient;
          ctx.fill();
        }
        
        // Draw star core
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, 2 * Math.PI);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.fill();
      });
      
      requestIdRef.current = requestAnimationFrame(animate);
    };
    
    // Start animation
    requestIdRef.current = requestAnimationFrame(animate);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(requestIdRef.current);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 z-0 pointer-events-none"
      style={{ 
        opacity: 0.8,
        width: '100%',
        height: '100%',
        willChange: 'transform'
      }}
    />
  );
};

export default StarsBackground; 