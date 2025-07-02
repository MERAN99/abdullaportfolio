import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isDarkMode } = useTheme();
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Space-themed animated background with stars and bubbles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = canvas.width = canvas.offsetWidth;
    let height = canvas.height = canvas.offsetHeight;

    // Create stars
    const stars = [];
    const starCount = 150; // More stars for space effect
    
    for (let i = 0; i < starCount; i++) {
      // Determine if this will be a stable star or a twinkling star
      const isStableStar = Math.random() < 0.7; // 70% of stars will be stable
      
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.5 + 0.5, // Small stars
        opacity: isStableStar ? (Math.random() * 0.3 + 0.7) : (Math.random() * 0.4 + 0.3), // Higher opacity for stable stars
        twinkleSpeed: isStableStar ? 0 : (Math.random() * 0.01 + 0.005), // Much slower twinkling, with stable stars not twinkling at all
        twinklePhase: Math.random() * Math.PI * 2,
        isStable: isStableStar
      });
    }
    
    // Create nebula bubbles
    const bubbles = [];
    const bubbleCount = 15; // More bubbles for space effect
    
    // Space-themed colors
    const bubbleColors = [
      [65, 105, 225], // Royal blue
      [138, 43, 226], // Blue violet
      [75, 0, 130],   // Indigo
      [123, 104, 238], // Medium slate blue
      [147, 112, 219], // Medium purple
      [0, 191, 255]    // Deep sky blue
    ];

    for (let i = 0; i < bubbleCount; i++) {
      const colorIndex = Math.floor(Math.random() * bubbleColors.length);
      bubbles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 50 + 20, // Larger nebula bubbles
        speedX: Math.random() * 0.2 - 0.1, // Slow movement
        speedY: Math.random() * 0.2 - 0.1, // Slow movement
        color: bubbleColors[colorIndex],
        alpha: Math.random() * 0.3 + 0.1, // Lower opacity for nebula effect
        pulseSpeed: Math.random() * 0.005 + 0.002, // Slower pulsing
        pulsePhase: Math.random() * Math.PI * 2
      });
    }

    const animate = () => {
      // Clear canvas
      ctx.clearRect(0, 0, width, height);
      
      // Create space background gradient
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, 'rgba(10, 10, 30, 1)'); // Deep space blue
      gradient.addColorStop(0.5, 'rgba(20, 10, 40, 1)'); // Deep purple
      gradient.addColorStop(1, 'rgba(5, 5, 20, 1)'); // Almost black
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Draw and animate nebula bubbles (drawn first so they're behind stars)
      bubbles.forEach(bubble => {
        // Move bubble
        bubble.x += bubble.speedX;
        bubble.y += bubble.speedY;
        
        // Pulse effect for nebula
        bubble.pulsePhase += bubble.pulseSpeed;
        const pulseScale = 1 + 0.1 * Math.sin(bubble.pulsePhase); // Reduced pulse scale
        const currentRadius = bubble.radius * pulseScale;

        // Wrap around edges
        if (bubble.x < -currentRadius) bubble.x = width + currentRadius;
        if (bubble.x > width + currentRadius) bubble.x = -currentRadius;
        if (bubble.y < -currentRadius) bubble.y = height + currentRadius;
        if (bubble.y > height + currentRadius) bubble.y = -currentRadius;

        // Draw nebula bubble with soft gradient
        const gradient = ctx.createRadialGradient(
          bubble.x, bubble.y, 0,
          bubble.x, bubble.y, currentRadius
        );
        
        gradient.addColorStop(0, `rgba(${bubble.color[0]}, ${bubble.color[1]}, ${bubble.color[2]}, ${bubble.alpha * 0.7})`);
        gradient.addColorStop(0.5, `rgba(${bubble.color[0]}, ${bubble.color[1]}, ${bubble.color[2]}, ${bubble.alpha * 0.3})`);
        gradient.addColorStop(1, `rgba(${bubble.color[0]}, ${bubble.color[1]}, ${bubble.color[2]}, 0)`);
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(bubble.x, bubble.y, currentRadius, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw and animate stars
      stars.forEach(star => {
        // Twinkle effect - only for non-stable stars
        let currentOpacity = star.opacity;
        
        if (!star.isStable) {
          star.twinklePhase += star.twinkleSpeed;
          // Reduced twinkle range for less dramatic effect
          const twinkleFactor = 0.85 + 0.15 * Math.sin(star.twinklePhase);
          currentOpacity = star.opacity * twinkleFactor;
        }
        
        // Draw star
        ctx.fillStyle = `rgba(255, 255, 255, ${currentOpacity})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();
        
        // Add glow effect to some stars
        if (star.radius > 1.2) {
          const glow = ctx.createRadialGradient(
            star.x, star.y, 0,
            star.x, star.y, star.radius * 4
          );
          glow.addColorStop(0, `rgba(255, 255, 255, ${currentOpacity * 0.4})`);
          glow.addColorStop(1, 'rgba(255, 255, 255, 0)');
          
          ctx.fillStyle = glow;
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.radius * 4, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // Add occasional shooting star - but less frequently
      if (Math.random() < 0.004) {
        const shootingStar = {
          x: Math.random() * width,
          y: Math.random() * (height / 1),
          length: Math.random() * 80 + 190,
          angle: Math.PI / 4 + (Math.random() * Math.PI / 4),
          opacity: 1
        };
        
        const endX = shootingStar.x + Math.cos(shootingStar.angle) * shootingStar.length;
        const endY = shootingStar.y + Math.sin(shootingStar.angle) * shootingStar.length;
        
        const gradient = ctx.createLinearGradient(
          shootingStar.x, shootingStar.y,
          endX, endY
        );
        
        gradient.addColorStop(0, `rgba(255, 255, 255, ${shootingStar.opacity})`);
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(shootingStar.x, shootingStar.y);
        ctx.lineTo(endX, endY);
        ctx.stroke();
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isDarkMode]);

  return (
    <header className="shadow-md py-12 mt-16 relative overflow-hidden">
      {/* Space-themed animated background canvas */}
      <canvas 
        ref={canvasRef} 
        className="absolute top-0 left-0 w-full h-full"
        style={{ 
          opacity: 1,
          zIndex: 0
        }}
      />
      
      {/* Subtle overlay for better text readability */}
      <div 
        className="absolute top-0 left-0 w-full h-full" 
        style={{ 
          background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.4) 100%)',
          zIndex: 1
        }}
      />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          {/* Profile Section */}
          <div className="flex items-center mb-6 md:mb-0">
           
            <div>
              <motion.h1 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-300 inline-block text-transparent bg-clip-text"
              >
                Abdulla Mohammed Ahmed
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-xl mt-2 text-gray-200"
              >
                Full Stack Developer
              </motion.p>
            </div>
          </div>

         

          {/* Contact Info */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col space-y-3 md:space-y-4"
          >
            <a 
              href="mailto:abdulla.mhammad99@gmail.com" 
              className="flex items-center transition-colors group text-gray-200 hover:text-blue-300"
            >
              <span className="p-2 rounded-full mr-3 transition-colors bg-blue-900/40 text-blue-300 group-hover:bg-blue-800/50">
                <FaEnvelope />
              </span>
              <span>abdulla.mhammad99@gmail.com</span>
            </a>
            <a 
              href="tel:+9647707401199" 
              className="flex items-center transition-colors group text-gray-200 hover:text-blue-300"
            >
              <span className="p-2 rounded-full mr-3 transition-colors bg-blue-900/40 text-blue-300 group-hover:bg-blue-800/50">
                <FaPhone />
              </span>
              <span>+964 770 749 1199</span>
            </a>
            <div className="flex items-center text-gray-200">
              <span className="p-2 rounded-full mr-3 bg-blue-900/40 text-blue-300">
                <FaMapMarkerAlt />
              </span>
              <span>Kalar, As Sulaymaniyah - Iraq</span>
            </div>
          </motion.div>
        </div>
      </div>
    </header>
  );
};

export default Header; 