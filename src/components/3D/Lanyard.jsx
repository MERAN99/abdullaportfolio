/* eslint-disable react/no-unknown-property */
'use client';
import { useEffect, useRef, useState } from 'react';
import { Canvas, extend, useFrame } from '@react-three/fiber';
import { useGLTF, useTexture, Environment, Lightformer } from '@react-three/drei';
import { BallCollider, CuboidCollider, Physics, RigidBody, useRopeJoint, useSphericalJoint } from '@react-three/rapier';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';

// Use relative paths for public assets
import * as THREE from 'three';

extend({ MeshLineGeometry, MeshLineMaterial });

export default function Lanyard({ position = [0, 0, 30], gravity = [0, -40, 0], fov = 20, transparent = true }) {
  // Adjust FOV based on screen size
  const [mobileFov, setMobileFov] = useState(fov);
  
  useEffect(() => {
    const handleResize = () => {
      // Increase FOV on smaller screens to make the lanyard more visible
      const isMobile = window.innerWidth < 768;
      setMobileFov(isMobile ? fov * 1.3 : fov);
    };
    
    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [fov]);
  
  return (
    <div className="relative w-full h-full flex justify-center items-center transform scale-100 origin-center" 
      style={{ 
        zIndex: 100, 
        pointerEvents: 'auto',
        touchAction: 'none' // Prevent default touch actions like scrolling while interacting
      }}
    >
      <Canvas
        camera={{ position: position, fov: mobileFov }}
        gl={{ alpha: transparent, antialias: true, powerPreference: 'high-performance' }}
        onCreated={({ gl }) => {
          gl.setClearColor(new THREE.Color(0x000000), transparent ? 0 : 1);
          gl.physicallyCorrectLights = true;
        }}
        style={{ pointerEvents: 'auto' }}
        dpr={[1, 2]} // Responsive pixel ratio for better performance
      >
        <ambientLight intensity={Math.PI} />
        <Physics gravity={gravity} timeStep={1 / 60}>
          <Band />
        </Physics>
        <Environment blur={0.75}>
          <Lightformer intensity={2} color="white" position={[0, -1, 5]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
          <Lightformer intensity={3} color="white" position={[-1, -1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
          <Lightformer intensity={3} color="white" position={[1, 1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
          <Lightformer intensity={10} color="white" position={[-10, 0, 14]} rotation={[0, Math.PI / 2, Math.PI / 3]} scale={[100, 10, 1]} />
        </Environment>
      </Canvas>
    </div>
  );
}

// Custom ID card component
function IDCard() {
  const educationTexture = useTexture("/models/education-lanyard.png?v=" + Date.now());
  const meshRef = useRef();
  
  useEffect(() => {
    if (educationTexture) {
      // Configure texture
      // Set rotation center to middle of texture
      educationTexture.needsUpdate = true;
    }
  }, [educationTexture]);
  
  return (
    <mesh ref={meshRef} renderOrder={1000} rotation={[0, 0, 0]}>
      <planeGeometry args={[1.6, 2.25]} />
      <meshPhysicalMaterial 
        map={educationTexture} 
        map-anisotropy={12} 
        clearcoat={1} 
        clearcoatRoughness={0.15} 
        roughness={0.9} 
        metalness={0.8}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

function Band({ maxSpeed = 50, minSpeed = 0 }) {
  const band = useRef(), fixed = useRef(), j1 = useRef(), j2 = useRef(), j3 = useRef(), card = useRef();
  const vec = new THREE.Vector3(), ang = new THREE.Vector3(), rot = new THREE.Vector3(), dir = new THREE.Vector3();
  const segmentProps = { type: 'dynamic', canSleep: true, colliders: false, angularDamping: 4, linearDamping: 4 };
  const { nodes, materials } = useGLTF('/models/card.glb');
  
  // Load the lanyard texture for the band
  const lanyardTexture = useTexture("/models/lanyard.png?v=" + Date.now());
  
  const [curve] = useState(() => new THREE.CatmullRomCurve3([new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()]));
  const [dragged, drag] = useState(false);
  const [hovered, hover] = useState(false);
  const [isSmall, setIsSmall] = useState(() =>
    typeof window !== 'undefined' && window.innerWidth < 1024
  );

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);
  useSphericalJoint(j3, card, [[0, 0, 0], [0, 1.50, 0]]);

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? 'grabbing' : 'grab';
      return () => void (document.body.style.cursor = 'auto');
    }
  }, [hovered, dragged]);

  useEffect(() => {
    const handleResize = () => {
      setIsSmall(window.innerWidth < 1024);
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useFrame((state, delta) => {
    if (dragged) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      [card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp());
      card.current?.setNextKinematicTranslation({ x: vec.x - dragged.x, y: vec.y - dragged.y, z: vec.z - dragged.z });
    }
    if (fixed.current) {
      [j1, j2].forEach((ref) => {
        if (!ref.current.lerped) ref.current.lerped = new THREE.Vector3().copy(ref.current.translation());
        const clampedDistance = Math.max(0.1, Math.min(1, ref.current.lerped.distanceTo(ref.current.translation())));
        ref.current.lerped.lerp(ref.current.translation(), delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed)));
      });
      curve.points[0].copy(j3.current.translation());
      curve.points[1].copy(j2.current.lerped);
      curve.points[2].copy(j1.current.lerped);
      curve.points[3].copy(fixed.current.translation());
      band.current.geometry.setPoints(curve.getPoints(32));
      ang.copy(card.current.angvel());
      rot.copy(card.current.rotation());
      card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z });
    }
  });

  curve.curveType = 'chordal';
  lanyardTexture.wrapS = lanyardTexture.wrapT = THREE.RepeatWrapping;

  // Handle both mouse and touch events
  const handlePointerDown = (e) => {
    e.stopPropagation();
    e.target.setPointerCapture(e.pointerId);
    drag(new THREE.Vector3().copy(e.point).sub(vec.copy(card.current.translation())));
  };

  const handlePointerUp = (e) => {
    e.stopPropagation();
    e.target.releasePointerCapture(e.pointerId);
    drag(false);
  };

  return (
    <>
      <group position={[0, 4, 0]}>
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />
        <RigidBody position={[0.5, 0, 0]} ref={j1} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1, 0, 0]} ref={j2} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1.5, 0, 0]} ref={j3} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[2, 0, 0]} ref={card} {...segmentProps} type={dragged ? 'kinematicPosition' : 'dynamic'}>
          <CuboidCollider args={[0.8, 1.125, 0.01]} />
          <group
            scale={2.25}
            position={[0, -1.2, -0.05]}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onTouchStart={handlePointerDown}
            onTouchEnd={handlePointerUp}
          >
            <IDCard />
            <mesh geometry={nodes.clip.geometry} material={materials.metal} material-roughness={0.3} renderOrder={1001} />
            <mesh geometry={nodes.clamp.geometry} material={materials.metal} renderOrder={1002} />
          </group>
        </RigidBody>
      </group>
      <mesh ref={band} renderOrder={999}>
        <meshLineGeometry />
        <meshLineMaterial
          color="white"
          depthTest={false}
          resolution={isSmall ? [1000, 2000] : [1000, 1000]}
          useMap
          map={lanyardTexture}
          repeat={[-4, 1]}
          lineWidth={isSmall ? 1.5 : 1} // Slightly thicker line on mobile
        />
      </mesh>
    </>
  );
}