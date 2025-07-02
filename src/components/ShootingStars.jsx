import React, { useEffect, useRef } from 'react';

const ShootingStars = () => {
  const canvasRef = useRef(null);
  const starsRef = useRef([]);
  const requestIdRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const shootingStars = starsRef.current;
    
    // Set canvas to full screen
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Create a shooting star
    function createShootingStar() {
      const star = {
        x: Math.random() * canvas.width,
        y: 0,
        length: Math.random() * 80 + 50,
        speed: Math.random() * 10 + 5,
        size: Math.random() * 2 + 1,
        color: `rgba(255, 255, 255, ${Math.random() * 0.7 + 0.3})`,
        active: true,
        angle: Math.random() * Math.PI / 4 + Math.PI / 4, // Between 45 and 90 degrees
      };
      
      return star;
    }
    
    // Initialize shooting stars
    function initShootingStars() {
      shootingStars.length = 0;
      // Start with a few shooting stars
      for (let i = 0; i < 2; i++) {
        shootingStars.push(createShootingStar());
      }
    }
    
    initShootingStars();
    
    // Periodically add new shooting stars
    const starInterval = setInterval(() => {
      // Only add a new star if there's a 10% chance
      if (Math.random() < 0.1) {
        shootingStars.push(createShootingStar());
      }
    }, 1000);
    
    // Animation function
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw shooting stars
      for (let i = 0; i < shootingStars.length; i++) {
        const star = shootingStars[i];
        
        if (star.active) {
          // Calculate movement based on angle
          star.x += Math.cos(star.angle) * star.speed;
          star.y += Math.sin(star.angle) * star.speed;
          
          // Draw shooting star
          ctx.beginPath();
          ctx.moveTo(star.x, star.y);
          
          // Calculate tail end position
          const tailX = star.x - Math.cos(star.angle) * star.length;
          const tailY = star.y - Math.sin(star.angle) * star.length;
          
          // Create gradient for tail
          const gradient = ctx.createLinearGradient(star.x, star.y, tailX, tailY);
          gradient.addColorStop(0, star.color);
          gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
          
          ctx.lineTo(tailX, tailY);
          ctx.strokeStyle = gradient;
          ctx.lineWidth = star.size;
          ctx.stroke();
          
          // Add a glow at the head of the shooting star
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size * 2, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
          ctx.fill();
          
          // Deactivate if out of bounds
          if (star.x > canvas.width || star.y > canvas.height) {
            star.active = false;
          }
        }
      }
      
      // Remove inactive stars
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        if (!shootingStars[i].active) {
          shootingStars.splice(i, 1);
        }
      }
      
      requestIdRef.current = requestAnimationFrame(animate);
    }
    
    animate();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(requestIdRef.current);
      clearInterval(starInterval);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 z-10 pointer-events-none"
    />
  );
};

export default ShootingStars; 