import React, { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

const SpaceParticles = () => {
  const { isDarkMode } = useTheme();
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const requestIdRef = useRef(null);
  const mouseRef = useRef({ x: null, y: null, radius: 100 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const particles = particlesRef.current;
    
    // Set canvas to full screen
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Track mouse position
    const handleMouseMove = (e) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    // Initialize particles
    function initParticles() {
      particles.length = 0;
      const particleCount = Math.min(Math.floor(canvas.width * canvas.height / 9000), 150);
      
      for (let i = 0; i < particleCount; i++) {
        const size = Math.random() * 3 + 1;
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const directionX = Math.random() * 1 - 0.5;
        const directionY = Math.random() * 1 - 0.5;
        const color = isDarkMode ? '#ffffff' : '#8ec5fc';
        
        particles.push({
          x,
          y,
          size,
          directionX,
          directionY,
          color,
          opacity: Math.random() * 0.5 + 0.1,
          speedFactor: Math.random() * 0.5 + 0.2
        });
      }
    }
    
    initParticles();
    
    // Animation function
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color + Math.floor(p.opacity * 255).toString(16).padStart(2, '0');
        ctx.fill();
        
        // Update position
        p.x += p.directionX * p.speedFactor;
        p.y += p.directionY * p.speedFactor;
        
        // Check for mouse interaction
        if (mouseRef.current.x != null) {
          const dx = p.x - mouseRef.current.x;
          const dy = p.y - mouseRef.current.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < mouseRef.current.radius) {
            const angle = Math.atan2(dy, dx);
            const pushFactor = (mouseRef.current.radius - distance) / mouseRef.current.radius;
            
            p.x += Math.cos(angle) * pushFactor * 2;
            p.y += Math.sin(angle) * pushFactor * 2;
          }
        }
        
        // Boundary check
        if (p.x < 0 || p.x > canvas.width) p.directionX *= -1;
        if (p.y < 0 || p.y > canvas.height) p.directionY *= -1;
        
        // Connect nearby particles with lines
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 120) {
            ctx.beginPath();
            ctx.strokeStyle = isDarkMode 
              ? `rgba(255, 255, 255, ${0.1 * (1 - distance / 120)})` 
              : `rgba(142, 197, 252, ${0.15 * (1 - distance / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }
      
      requestIdRef.current = requestAnimationFrame(animate);
    }
    
    animate();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(requestIdRef.current);
    };
  }, [isDarkMode]);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 z-0 pointer-events-none"
    />
  );
};

export default SpaceParticles; 