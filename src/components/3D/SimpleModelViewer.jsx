import React, { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, ContactShadows, useProgress, Html } from '@react-three/drei';
import * as THREE from 'three';
import LoadingIndicator from '../LoadingIndicator';

// Preload the model
useGLTF.preload('/models/Moon.glb');

function Model({ url, scale = 1, onLoaded }) {
  const { scene } = useGLTF(url);
  const ref = useRef();
  const { gl } = useThree();
  
  // Optimize rendering
  useEffect(() => {
    if (scene) {
      // Apply optimizations to the scene
      scene.traverse((child) => {
        if (child.isMesh) {
          // Optimize meshes
          child.frustumCulled = true;
          
          // Optimize materials
          if (child.material) {
            child.material.precision = 'lowp'; // Lower precision for better performance
          }
        }
      });
      
      // Signal that the model is loaded
      if (onLoaded) onLoaded();
    }
    
    // Optimize renderer
    gl.powerPreference = 'high-performance';
    gl.antialias = false; // Disable antialiasing for better performance on mobile
    
    return () => {
      // Clean up resources
      scene.traverse((child) => {
        if (child.isMesh) {
          if (child.geometry) child.geometry.dispose();
          if (child.material) child.material.dispose();
        }
      });
    };
  }, [scene, gl, onLoaded]);
  
  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.2;
    }
  });
  
  return (
    <primitive 
      ref={ref}
      object={scene} 
      scale={[scale, scale, scale]} 
      position={[0, 0, 0]} 
    />
  );
}

// Custom loading component that uses Html from drei
function ThreeLoader() {
  const { progress } = useProgress();
  
  return (
    <Html center>
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center',
        color: 'white',
        background: 'rgba(0,0,0,0.7)',
        padding: '20px',
        borderRadius: '8px'
      }}>
        <div style={{ 
          width: '40px', 
          height: '40px', 
          border: '4px solid #555', 
          borderTop: '4px solid #fff',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }} />
        <p style={{ marginTop: '10px' }}>Loading... {Math.round(progress)}%</p>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    </Html>
  );
}

export default function SimpleModelViewer({ 
  url, 
  width = 500, 
  height = 500, 
  modelScale = 1,
  environmentPreset = "sunset"
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  
  const handleModelLoaded = () => {
    setIsLoaded(true);
  };

  return (
    <div style={{ 
      width: typeof width === 'number' ? `${width}px` : width, 
      height: typeof height === 'number' ? `${height}px` : height,
      margin: '0 auto',
      position: 'relative'
    }}>
      {!isLoaded && (
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 10 }}>
          <LoadingIndicator message="Loading 3D model..." />
        </div>
      )}
      
      <Canvas
        camera={{ position: [0, 0, 50], fov: 30 }}
        shadows={false} // Disable shadows for better performance
        dpr={[1, 1.5]} // Limit pixel ratio for better performance
        performance={{ min: 0.5 }} // Allow performance scaling
        gl={{ 
          powerPreference: 'high-performance',
          antialias: false,
          alpha: true,
          precision: 'lowp'
        }}
      >
        <ambientLight intensity={0.5} />
        <spotLight intensity={1} position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <Suspense fallback={<ThreeLoader />}>
          <Model url={url} scale={modelScale} onLoaded={handleModelLoaded} />
          <Environment preset={environmentPreset} />
          {isLoaded && (
            <ContactShadows 
              position={[0, -1, 0]} 
              opacity={0.3} 
              scale={10} 
              blur={1.5} 
              far={1} 
              resolution={256} // Lower resolution for better performance
            />
          )}
        </Suspense>
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  );
} 