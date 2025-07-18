import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlay, FaPause, FaMusic, FaVolumeUp, FaVolumeMute, FaVolumeDown } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';

// Custom CSS for the volume slider
const volumeSliderStyles = `
  .volume-slider {
    -webkit-appearance: none;
    appearance: none;
    width: 100%;
    height: 12px;
    border-radius: 8px;
    outline: none;
    cursor: pointer;
  }
  
  .volume-slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: white;
    border: 2px solid #3b82f6;
    cursor: pointer;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
  
  .volume-slider::-moz-range-thumb {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: white;
    border: 2px solid #3b82f6;
    cursor: pointer;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
  
  .volume-slider:focus {
    outline: none;
  }
  
  .volume-slider:hover::-webkit-slider-thumb {
    background: #f0f9ff;
    transform: scale(1.1);
  }
  
  .volume-slider:hover::-moz-range-thumb {
    background: #f0f9ff;
    transform: scale(1.1);
  }
`;

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [volume, setVolume] = useState(50);
  const audioRef = useRef(null);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    // Create audio element
    audioRef.current = new Audio('/mp3/Interstellar Main Theme - Hans Zimmer.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = volume / 100;
    
    // Clean up
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(error => {
        console.error("Audio playback failed:", error);
      });
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    audioRef.current.muted = !audioRef.current.muted;
    setIsMuted(!isMuted);
  };
  
  const handleVolumeChange = (e) => {
    const newVolume = parseInt(e.target.value);
    setVolume(newVolume);
    
    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100;
      
      // Auto-unmute when volume is adjusted
      if (isMuted && newVolume > 0) {
        audioRef.current.muted = false;
        setIsMuted(false);
      }
    }
  };
  
  const getVolumeIcon = () => {
    if (isMuted || volume === 0) return <FaVolumeMute />;
    if (volume < 50) return <FaVolumeDown />;
    return <FaVolumeUp />;
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Inject custom CSS */}
      <style>{volumeSliderStyles}</style>
      
      <motion.div
        className="relative"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        {/* Main button */}
        <motion.button
          className={`rounded-full w-14 h-14 flex items-center justify-center shadow-lg ${
            isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
          } hover:scale-105 transition-transform border-2 ${
            isPlaying ? 'border-green-500' : 'border-transparent'
          }`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowControls(!showControls)}
        >
          <FaMusic className={`text-xl ${isPlaying ? 'text-green-500' : ''}`} />
        </motion.button>

        {/* Controls panel */}
        <AnimatePresence>
          {showControls && (
            <motion.div 
              className={`absolute bottom-16 right-0 p-4 rounded-lg shadow-lg ${
                isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
              } border border-gray-700`}
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <div className="flex flex-col items-center gap-3">
                <button 
                  className={`rounded-full w-12 h-12 flex items-center justify-center ${
                    isPlaying ? 'bg-purple-600' : 'bg-green-500'
                  } text-white hover:opacity-90 shadow-md`}
                  onClick={togglePlay}
                >
                  {isPlaying ? <FaPause className="text-lg" /> : <FaPlay className="text-lg ml-1" />}
                </button>
                
                <div className="w-full px-1 py-3">
                  <div className="flex items-center gap-2 mb-1">
                    <button 
                      className={`rounded-full w-8 h-8 flex items-center justify-center ${
                        isMuted ? 'bg-red-500' : 'bg-blue-500'
                      } text-white hover:opacity-90`}
                      onClick={toggleMute}
                    >
                      {getVolumeIcon()}
                    </button>
                    
                    <div className="w-full">
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={volume}
                        onChange={handleVolumeChange}
                        className="volume-slider"
                        style={{
                          background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${volume}%, #d1d5db ${volume}%, #d1d5db 100%)`,
                        }}
                      />
                      <div className="flex justify-between text-xs mt-1 px-1 opacity-80">
                        <span>0%</span>
                        <span>{volume}%</span>
                        <span>100%</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="text-xs mt-1 text-center font-medium">
                  Interstellar<br />Hans Zimmer
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Animated equalizer when playing */}
        {isPlaying && !isMuted && (
          <motion.div 
            className="absolute -top-1 -right-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="flex gap-0.5">
              {[1, 2, 3, 4].map((bar) => (
                <motion.div
                  key={bar}
                  className="w-1 bg-green-500 rounded-full"
                  animate={{
                    height: [4, 8, 12, 8, 4],
                  }}
                  transition={{
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 1.2,
                    delay: bar * 0.2,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default MusicPlayer; 