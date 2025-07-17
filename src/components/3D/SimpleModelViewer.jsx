import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

function Model({ url, scale = 1 }) {
  const { scene } = useGLTF(url);
  const ref = useRef();
  
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

export default function SimpleModelViewer({ 
  url, 
  width = 500, 
  height = 500, 
  modelScale = 1,
  environmentPreset = "sunset"
}) {
  return (
    <div style={{ 
      width: typeof width === 'number' ? `${width}px` : width, 
      height: typeof height === 'number' ? `${height}px` : height,
      margin: '0 auto'
    }}>
      <Canvas
        camera={{ position: [0, 0, 50], fov: 30 }}
        shadows
      >
        <ambientLight intensity={0.5} />
        <spotLight intensity={1} position={[10, 10, 10]} angle={0.15} penumbra={1} castShadow />
        <Suspense fallback={null}>
          <Model url={url} scale={modelScale} />
          <Environment preset={environmentPreset} />
          <ContactShadows 
            position={[0, -1, 0]} 
            opacity={0.5} 
            scale={10} 
            blur={1.5} 
            far={1} 
          />
        </Suspense>
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  );
} 