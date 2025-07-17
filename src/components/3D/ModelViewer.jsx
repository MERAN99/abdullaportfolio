/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/no-unknown-property */
import {
    Suspense,
    useRef,
    useLayoutEffect,
    useEffect,
    useMemo,
    useState,
  } from "react";
  import {
    Canvas,
    useFrame,
    useLoader,
    useThree,
    invalidate,
  } from "@react-three/fiber";
  import {
    OrbitControls,
    useGLTF,
    useFBX,
    useProgress,
    Html,
    Environment,
    ContactShadows,
  } from "@react-three/drei";
  import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
  import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
  import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
  import * as THREE from "three";
  import React from "react";
  
  const isTouch =
    typeof window !== "undefined" &&
    ("ontouchstart" in window || navigator.maxTouchPoints > 0);
  const deg2rad = (d) => (d * Math.PI) / 180;
  const DECIDE = 8;
  const ROTATE_SPEED = 0.005;
  const INERTIA = 0.925;
  const PARALLAX_MAG = 0.05;
  const PARALLAX_EASE = 0.12;
  const HOVER_MAG = deg2rad(6);
  const HOVER_EASE = 0.15;
  
  const Loader = ({ placeholderSrc }) => {
    const { progress, active } = useProgress();
    const [showLoader, setShowLoader] = useState(false);
    
    // Use useEffect to set the showLoader state
    useEffect(() => {
      setShowLoader(active || !!placeholderSrc);
    }, [active, placeholderSrc]);
    
    if (!showLoader) return null;
    
    return (
      <Html center>
        <div style={{
          background: "rgba(0,0,0,0.7)",
          padding: "20px",
          borderRadius: "10px",
          color: "white",
          textAlign: "center"
        }}>
          {placeholderSrc ? (
            <div>
              <img
                src={placeholderSrc}
                width={128}
                height={128}
                style={{ borderRadius: "8px", margin: "0 auto 10px" }}
                alt="Loading placeholder"
              />
              <div>Loading: {Math.round(progress)}%</div>
            </div>
          ) : (
            <div>
              <div style={{ fontSize: "24px", marginBottom: "10px" }}>Loading 3D Model</div>
              <div style={{ fontSize: "18px" }}>{Math.round(progress)}%</div>
            </div>
          )}
        </div>
      </Html>
    );
  };
  
  const DesktopControls = ({ pivot, min, max, zoomEnabled }) => {
    const ref = useRef(null);
    useFrame(() => ref.current?.target.copy(pivot));
    return (
      <OrbitControls
        ref={ref}
        makeDefault
        enablePan={false}
        enableRotate={false}
        enableZoom={zoomEnabled}
        minDistance={min}
        maxDistance={max}
      />
    );
  };
  
  const ModelInner = ({
    url,
    xOff,
    yOff,
    pivot,
    initYaw,
    initPitch,
    minZoom,
    maxZoom,
    enableMouseParallax,
    enableManualRotation,
    enableHoverRotation,
    enableManualZoom,
    autoFrame,
    fadeIn,
    autoRotate,
    autoRotateSpeed,
    modelScale = 1,
    onLoaded,
  }) => {
    const outer = useRef(null);
    const inner = useRef(null);
    const { camera, gl } = useThree();
  
    const vel = useRef({ x: 0, y: 0 });
    const tPar = useRef({ x: 0, y: 0 });
    const cPar = useRef({ x: 0, y: 0 });
    const tHov = useRef({ x: 0, y: 0 });
    const cHov = useRef({ x: 0, y: 0 });
  
    const ext = useMemo(() => url.split(".").pop().toLowerCase(), [url]);
    const [modelContent, setModelContent] = useState(null);
    const [loadError, setLoadError] = useState(null);

    // Use useGLTF only for GLB/GLTF files and wrap in a try/catch
    const gltfResult = useMemo(() => {
      if (ext === "glb" || ext === "gltf") {
        try {
          return useGLTF(url);
        } catch (error) {
          console.error("Error loading GLTF:", error);
          return null;
        }
      }
      return null;
    }, [url, ext]);

    // Set the model content when the GLTF is loaded
    useEffect(() => {
      if (ext === "glb" || ext === "gltf" && gltfResult?.scene) {
        setModelContent(gltfResult.scene.clone());
        setLoadError(null);
      }
    }, [gltfResult, ext]);

    // Load other model types
    useEffect(() => {
      let isMounted = true;
      
      const loadModel = async () => {
        try {
          if (ext !== "glb" && ext !== "gltf") {
            console.log("Loading non-GLTF model:", url, "with extension:", ext);
            
            if (ext === "fbx") {
              const fbx = await new Promise((resolve, reject) => {
                try {
                  const result = useFBX(url);
                  resolve(result);
                } catch (error) {
                  reject(error);
                }
              });
              if (isMounted) {
                setModelContent(fbx.clone());
                setLoadError(null);
              }
            } else if (ext === "obj") {
              const obj = await useLoader(OBJLoader, url);
              if (isMounted) {
                setModelContent(obj.clone());
                setLoadError(null);
              }
            } else {
              console.error("Unsupported format:", ext);
              if (isMounted) {
                setLoadError(`Unsupported format: ${ext}`);
              }
            }
          }
        } catch (error) {
          console.error("Error loading model:", error);
          if (isMounted) {
            setLoadError(error.message || "Failed to load model");
          }
        }
      };
      
      loadModel();
      
      return () => {
        isMounted = false;
      };
    }, [url, ext]);

    const content = modelContent || (ext === "glb" || ext === "gltf" ? gltfResult?.scene : null);
    
    const pivotW = useRef(new THREE.Vector3());
    
    // Initialize the refs with default values to prevent null references
    useEffect(() => {
      if (!tPar.current) tPar.current = { x: 0, y: 0 };
      if (!cPar.current) cPar.current = { x: 0, y: 0 };
      if (!tHov.current) tHov.current = { x: 0, y: 0 };
      if (!cHov.current) cHov.current = { x: 0, y: 0 };
      if (!vel.current) vel.current = { x: 0, y: 0 };
    }, []);
  
    useLayoutEffect(() => {
      if (!content || !inner.current) return;
      const g = inner.current;
      g.updateWorldMatrix(true, true);
  
      const sphere = new THREE.Box3()
        .setFromObject(g)
        .getBoundingSphere(new THREE.Sphere());
      const s = 1 / (sphere.radius * 2);
      g.position.set(-sphere.center.x, -sphere.center.y, -sphere.center.z);
      g.scale.setScalar(s);
  
      g.traverse((o) => {
        if (o.isMesh) {
          o.castShadow = true;
          o.receiveShadow = true;
          if (fadeIn) {
            o.material.transparent = true;
            o.material.opacity = 0;
          }
        }
      });
  
      if (!outer.current) return;
      g.getWorldPosition(pivotW.current);
      pivot.copy(pivotW.current);
      outer.current.rotation.set(initPitch, initYaw, 0);
  
      if (autoFrame && camera.isPerspectiveCamera) {
        const persp = camera;
        const fitR = sphere.radius * s;
        const d = (fitR * 1.2) / Math.sin((persp.fov * Math.PI) / 180 / 2);
        persp.position.set(
          pivotW.current.x,
          pivotW.current.y,
          pivotW.current.z + d
        );
        persp.near = d / 10;
        persp.far = d * 10;
        persp.updateProjectionMatrix();
      }
  
      if (fadeIn) {
        let t = 0;
        const id = setInterval(() => {
          t += 0.05;
          const v = Math.min(t, 1);
          g.traverse((o) => {
            if (o.isMesh) o.material.opacity = v;
          });
          invalidate();
          if (v === 1) {
            clearInterval(id);
            onLoaded?.();
          }
        }, 16);
        return () => clearInterval(id);
      } else onLoaded?.();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [content]);
  
    useEffect(() => {
      if (!enableManualRotation || isTouch) return;
      const el = gl.domElement;
      let drag = false;
      let lx = 0,
        ly = 0;
      const down = (e) => {
        if (e.pointerType !== "mouse" && e.pointerType !== "pen") return;
        drag = true;
        lx = e.clientX;
        ly = e.clientY;
        window.addEventListener("pointerup", up);
      };
      const move = (e) => {
        if (!drag) return;
        const dx = e.clientX - lx;
        const dy = e.clientY - ly;
        lx = e.clientX;
        ly = e.clientY;
        outer.current.rotation.y += dx * ROTATE_SPEED;
        outer.current.rotation.x += dy * ROTATE_SPEED;
        vel.current = { x: dx * ROTATE_SPEED, y: dy * ROTATE_SPEED };
        invalidate();
      };
      const up = () => (drag = false);
      el.addEventListener("pointerdown", down);
      el.addEventListener("pointermove", move);
      return () => {
        el.removeEventListener("pointerdown", down);
        el.removeEventListener("pointermove", move);
        window.removeEventListener("pointerup", up);
      };
    }, [gl, enableManualRotation]);
  
    useEffect(() => {
      if (!isTouch) return;
      const el = gl.domElement;
      const pts = new Map();
  
      let mode = "idle";
      let sx = 0,
        sy = 0,
        lx = 0,
        ly = 0,
        startDist = 0,
        startZ = 0;
  
      const down = (e) => {
        if (e.pointerType !== "touch") return;
        pts.set(e.pointerId, { x: e.clientX, y: e.clientY });
        if (pts.size === 1) {
          mode = "decide";
          sx = lx = e.clientX;
          sy = ly = e.clientY;
        } else if (pts.size === 2 && enableManualZoom) {
          mode = "pinch";
          const [p1, p2] = [...pts.values()];
          startDist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
          startZ = camera.position.z;
          e.preventDefault();
        }
        invalidate();
      };
  
      const move = (e) => {
        if (e.pointerType !== "touch") return;
        const p = pts.get(e.pointerId);
        if (!p) return;
        p.x = e.clientX;
        p.y = e.clientY;
  
        if (mode === "decide") {
          const dx = e.clientX - sx;
          const dy = e.clientY - sy;
          if (Math.abs(dx) > DECIDE || Math.abs(dy) > DECIDE) {
            if (enableManualRotation && Math.abs(dx) > Math.abs(dy)) {
              mode = "rotate";
              el.setPointerCapture(e.pointerId);
            } else {
              mode = "idle";
              pts.clear();
            }
          }
        }
  
        if (mode === "rotate" && outer.current) {
          e.preventDefault();
          const dx = e.clientX - lx;
          const dy = e.clientY - ly;
          lx = e.clientX;
          ly = e.clientY;
          outer.current.rotation.y += dx * ROTATE_SPEED;
          outer.current.rotation.x += dy * ROTATE_SPEED;
          vel.current = { x: dx * ROTATE_SPEED, y: dy * ROTATE_SPEED };
          invalidate();
        } else if (mode === "pinch" && pts.size === 2 && camera) {
          e.preventDefault();
          const [p1, p2] = [...pts.values()];
          const d = Math.hypot(p1.x - p2.x, p1.y - p2.y);
          const ratio = startDist / d;
          camera.position.z = THREE.MathUtils.clamp(
            startZ * ratio,
            minZoom,
            maxZoom
          );
          invalidate();
        }
      };
  
      const up = (e) => {
        pts.delete(e.pointerId);
        if (mode === "rotate" && pts.size === 0) mode = "idle";
        if (mode === "pinch" && pts.size < 2) mode = "idle";
      };
  
      el.addEventListener("pointerdown", down, { passive: true });
      window.addEventListener("pointermove", move, { passive: false });
      window.addEventListener("pointerup", up, { passive: true });
      window.addEventListener("pointercancel", up, { passive: true });
      return () => {
        el.removeEventListener("pointerdown", down);
        window.removeEventListener("pointermove", move);
        window.removeEventListener("pointerup", up);
        window.removeEventListener("pointercancel", up);
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [gl, enableManualRotation, enableManualZoom, minZoom, maxZoom]);
  
    useEffect(() => {
      if (isTouch) return;
      const mm = (e) => {
        if (e.pointerType !== "mouse") return;
        const nx = (e.clientX / window.innerWidth) * 2 - 1;
        const ny = (e.clientY / window.innerHeight) * 2 - 1;
        if (enableMouseParallax)
          tPar.current = { x: -nx * PARALLAX_MAG, y: -ny * PARALLAX_MAG };
        if (enableHoverRotation)
          tHov.current = { x: ny * HOVER_MAG, y: nx * HOVER_MAG };
        invalidate();
      };
      window.addEventListener("pointermove", mm);
      return () => window.removeEventListener("pointermove", mm);
    }, [enableMouseParallax, enableHoverRotation]);
  
    useFrame((_, dt) => {
      if (!outer.current || !camera || !pivotW.current) return;
      
      let need = false;
      
      try {
        if (!cPar.current || !tPar.current || !cHov.current || !tHov.current || !vel.current) return;
        
        cPar.current.x += (tPar.current.x - cPar.current.x) * PARALLAX_EASE;
        cPar.current.y += (tPar.current.y - cPar.current.y) * PARALLAX_EASE;
        const phx = cHov.current.x,
          phy = cHov.current.y;
        cHov.current.x += (tHov.current.x - cHov.current.x) * HOVER_EASE;
        cHov.current.y += (tHov.current.y - cHov.current.y) * HOVER_EASE;
    
        // Clone pivotW and project it safely
        const ndc = pivotW.current.clone();
        if (!ndc) return;
        
        ndc.project(camera);
        ndc.x += xOff + cPar.current.x;
        ndc.y += yOff + cPar.current.y;
        
        if (outer.current && outer.current.position) {
          outer.current.position.copy(ndc.unproject(camera));
        
          outer.current.rotation.x += cHov.current.x - phx;
          outer.current.rotation.y += cHov.current.y - phy;
      
          if (autoRotate) {
            outer.current.rotation.y += autoRotateSpeed * dt;
            need = true;
          }
      
          outer.current.rotation.y += vel.current.x;
          outer.current.rotation.x += vel.current.y;
        }
        
        vel.current.x *= INERTIA;
        vel.current.y *= INERTIA;
        if (Math.abs(vel.current.x) > 1e-4 || Math.abs(vel.current.y) > 1e-4)
          need = true;
    
        if (
          Math.abs(cPar.current.x - tPar.current.x) > 1e-4 ||
          Math.abs(cPar.current.y - tPar.current.y) > 1e-4 ||
          Math.abs(cHov.current.x - tHov.current.x) > 1e-4 ||
          Math.abs(cHov.current.y - tHov.current.y) > 1e-4
        )
          need = true;
    
        if (need) invalidate();
      } catch (error) {
        console.error("Error in useFrame:", error);
      }
    });
  
    if (!content) return null;
    return (
      <group ref={outer}>
        <group ref={inner}>
          <ErrorBoundary fallback={<mesh><boxGeometry args={[1, 1, 1]} /><meshStandardMaterial color="red" /></mesh>}>
            <primitive 
              object={content} 
              scale={[modelScale, modelScale, modelScale]} 
            />
          </ErrorBoundary>
        </group>
      </group>
    );
  };
  
  // Simple error boundary component
  class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }
  
    static getDerivedStateFromError(error) {
      return { hasError: true };
    }
  
    componentDidCatch(error, errorInfo) {
      console.error("Error in 3D component:", error, errorInfo);
    }
  
    render() {
      if (this.state.hasError) {
        return this.props.fallback;
      }
      return this.props.children;
    }
  }
  
  const ModelViewer = ({
    url,
    width = 500,
    height = 500,
    modelXOffset = 0,
    modelYOffset = 0,
    defaultRotationX = -50,
    defaultRotationY = 20,
    defaultZoom = 0.5,
    minZoomDistance = 0.9,
    maxZoomDistance = 50,
    enableMouseParallax = true,
    enableManualRotation = true,
    enableHoverRotation = true,
    enableManualZoom = true,
    ambientIntensity = 0.3,
    keyLightIntensity = 1,
    fillLightIntensity = 0.5,
    rimLightIntensity = 0.8,
    environmentPreset = "forest",
    autoFrame = false,
    placeholderSrc,
    fadeIn = false,
    autoRotate = false,
    autoRotateSpeed = 0.35,
    modelScale = 1,
    onModelLoaded,
  }) => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const pivot = useRef(new THREE.Vector3()).current;
    const canvasRef = useRef(null);
    const contactRef = useRef(null);
    const rendererRef = useRef(null);
    const sceneRef = useRef(null);
    const cameraRef = useRef(null);
    
    // Preload the model to catch any loading errors
    useEffect(() => {
      setLoading(true);
      
      // The model will be loaded by the useGLTF hook
      const timer = setTimeout(() => {
        setLoading(false);
      }, 1000);
      
      return () => {
        clearTimeout(timer);
        // Clean up when component unmounts
        if (url) {
          useGLTF.clear(url);
        }
      };
    }, [url]);
    
    const initYaw = deg2rad(defaultRotationX);
    const initPitch = deg2rad(defaultRotationY);
    
  
    return (
      <div
        style={{
          position: "relative",
          width: typeof width === 'number' ? `${width}px` : width,
          height: typeof height === 'number' ? `${height}px` : height,
          maxWidth: '100%',
          margin: '0 auto'
        }}
        onWheel={(e) => enableManualZoom ? null : e.stopPropagation()}
      >
        {error && (
          <div style={{ 
            color: "red", 
            position: "absolute", 
            top: 0, 
            left: 0, 
            zIndex: 100, 
            background: "rgba(0,0,0,0.7)",
            padding: "10px",
            borderRadius: "5px",
            maxWidth: "90%"
          }}>
            Error loading model: {error}
          </div>
        )}
        
        {loading && (
          <div style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 100,
            background: "rgba(0,0,0,0.7)",
            padding: "10px",
            borderRadius: "5px",
            color: "white"
          }}>
            Loading model...
          </div>
        )}
        <Canvas
          ref={canvasRef}
          camera={{ position: [0, 0, 50], fov: 30 }}
          style={{ background: "transparent", touchAction: enableManualZoom ? "auto" : "none" }}
          gl={{ 
            preserveDrawingBuffer: true,
            powerPreference: "high-performance",
            antialias: true,
            alpha: true,
            stencil: false,
            depth: true
          }}
          shadows
          dpr={[1, 1.5]} // Limit pixel ratio for better performance
          frameloop="demand" // Only render when needed
          onCreated={({ gl, camera, scene }) => {
            gl.setClearColor(0x000000, 0);
            
            // Handle context loss and restoration
            const canvas = gl.domElement;
            canvas.addEventListener('webglcontextlost', (event) => {
              event.preventDefault();
              console.log('WebGL context lost. Trying to restore...');
            }, false);
            
            canvas.addEventListener('webglcontextrestored', () => {
              console.log('WebGL context restored.');
            }, false);
            
            // Store references
            if (rendererRef) rendererRef.current = gl;
            if (cameraRef) cameraRef.current = camera;
            if (sceneRef) sceneRef.current = scene;
          }}
        >
          {/* Use a simple fallback instead of the Loader component */}
          <Suspense fallback={
            <mesh>
              <sphereGeometry args={[1, 16, 16]} />
              <meshStandardMaterial color="gray" />
            </mesh>
          }>
            <ModelInner
              url={url}
              xOff={modelXOffset}
              yOff={modelYOffset}
              pivot={pivot}
              initYaw={initYaw}
              initPitch={initPitch}
              minZoom={minZoomDistance}
              maxZoom={maxZoomDistance}
              enableMouseParallax={enableMouseParallax}
              enableManualRotation={enableManualRotation}
              enableHoverRotation={enableHoverRotation}
              enableManualZoom={enableManualZoom}
              autoFrame={autoFrame}
              fadeIn={fadeIn}
              autoRotate={autoRotate}
              autoRotateSpeed={autoRotateSpeed}
              onLoaded={onModelLoaded}
              modelScale={modelScale}
            />
            <DesktopControls
              pivot={pivot}
              min={minZoomDistance}
              max={maxZoomDistance}
              zoomEnabled={enableManualZoom}
            />
            <ambientLight intensity={ambientIntensity} />
            <directionalLight
              intensity={keyLightIntensity}
              position={[5, 5, 5]}
              castShadow
            />
            <directionalLight
              intensity={fillLightIntensity}
              position={[-5, 5, -5]}
            />
            <directionalLight
              intensity={rimLightIntensity}
              position={[0, -10, 0]}
            />
            {/* Simplify the Environment component */}
            {environmentPreset !== "none" && <Environment preset={environmentPreset} background={false} />}
            <ContactShadows
              ref={contactRef}
              rotation={[-Math.PI / 2, 0, 0]}
              position={[0, -1, 0]}
              opacity={0.5}
              width={10}
              height={10}
              blur={1}
              far={1}
            />
          </Suspense>
        </Canvas>
 
      </div>
    );
  };
  
  export default ModelViewer;
  