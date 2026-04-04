import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useReducedMotion } from "../../hooks/useReducedMotion";

// Custom shader for dynamic typography with mouse interaction
const vertexShader = `
  uniform float time;
  uniform vec2 mousePos;
  varying vec2 vUv;
  varying float vElevation;

  // Simplex 2D noise
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }
  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy) );
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 )) + i.x + vec3(0.0, i1.x, 1.0 ));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m ;
    m = m*m ;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  void main() {
    vUv = uv;
    vec3 pos = position;

    // Slow ambient wave based on time
    float noise = snoise(vec2(pos.x * 0.05, pos.y * 0.05 + time * 0.15)) * 3.5;
    
    // Interactive mouse bulge
    float dist = distance(uv, mousePos);
    float bulge = exp(-dist * 15.0) * 4.0; // Higher peak where mouse is
    
    pos.z += noise + bulge;
    vElevation = pos.z;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = `
  uniform vec3 color;
  varying vec2 vUv;
  varying float vElevation;

  void main() {
    // Fade out deep valleys and highlight peaks
    float alpha = smoothstep(-4.0, 5.0, vElevation) * 0.8 + 0.1;

    // Fade edges so the grid seamlessly fades into black
    float edgeX = smoothstep(0.0, 0.2, vUv.x) * smoothstep(1.0, 0.8, vUv.x);
    float edgeY = smoothstep(0.0, 0.2, vUv.y) * smoothstep(1.0, 0.8, vUv.y);
    float edge = edgeX * edgeY;

    gl_FragColor = vec4(color, alpha * edge * 0.35); // Middle ground opacity
  }
`;

const TopographicMesh = () => {
  const meshRef = useRef();
  const materialRef = useRef();

  const uniforms = useMemo(
    () => ({
      time: { value: 0 },
      mousePos: { value: new THREE.Vector2(-10, -10) }, // Default off-screen
      color: { value: new THREE.Color("#90b4d1") }, // Matches var(--accent-primary)
    }),
    []
  );

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.time.value = state.clock.elapsedTime;
    }
    // Slowly rotate the entire mesh for ambient feel
    if (meshRef.current) {
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.02;
    }
  });

  const handlePointerMove = (e) => {
    if (materialRef.current && e.uv) {
      // e.uv comes from R3F raycaster mapping to the plane geometry
      materialRef.current.uniforms.mousePos.value = e.uv;
    }
  };

  const handlePointerLeave = () => {
    if (materialRef.current) {
        // Move interaction far away to stop bulging
        materialRef.current.uniforms.mousePos.value.set(-10, -10);
    }
  };

  return (
    <mesh
      ref={meshRef}
      rotation={[-Math.PI * 0.45, 0, 0]}
      position={[0, -2, -10]}
      onPointerMove={handlePointerMove}
      onPointerOut={handlePointerLeave}
    >
      <planeGeometry args={[100, 100, 100, 100]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        wireframe={true}
        transparent={true}
        depthWrite={false}
      />
    </mesh>
  );
};

const MeshBackground = () => {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: -1, // Keep behind all content
        pointerEvents: "auto", // Allow hover raycasting
      }}
    >
      <Canvas
        camera={{ position: [0, 5, 20], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
      >
        <TopographicMesh />
      </Canvas>
    </div>
  );
};

export default MeshBackground;
