import { useRef, useMemo, useCallback } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, Float, Line } from "@react-three/drei";
import * as THREE from "three";
import PropTypes from "prop-types";

/* ================================================
   Helpers
   ================================================ */

const makeGlowTexture = (r, g, b, falloff) => {
  const c = document.createElement("canvas");
  c.width = 256;
  c.height = 256;
  const ctx = c.getContext("2d");
  const grad = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
  grad.addColorStop(0, `rgba(${r},${g},${b}, 1)`);
  grad.addColorStop(falloff, `rgba(${r},${g},${b}, 0.3)`);
  grad.addColorStop(0.7, `rgba(${r},${g},${b}, 0.05)`);
  grad.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 256, 256);
  return new THREE.CanvasTexture(c);
};

// Create a perfect circle texture for the background stars
const makeDotTexture = () => {
  const c = document.createElement("canvas");
  c.width = 32;
  c.height = 32;
  const ctx = c.getContext("2d");
  ctx.beginPath();
  ctx.arc(16, 16, 16, 0, 2 * Math.PI);
  ctx.fillStyle = "white";
  ctx.fill();
  return new THREE.CanvasTexture(c);
};

/* ================================================
   Scene elements
   ================================================ */

const AutoRotate = ({ children }) => {
  const ref = useRef();
  useFrame((_, dt) => {
    if (ref.current) {
      // Gentle, swaying rotation instead of fast spinning
      ref.current.rotation.y = Math.sin(_.clock.elapsedTime * 0.1) * 0.2;
      ref.current.rotation.x = Math.cos(_.clock.elapsedTime * 0.15) * 0.1;
    }
  });
  return <group ref={ref}>{children}</group>;
};
AutoRotate.propTypes = { children: PropTypes.node };

// Multi-layered glow halo
const Halo = ({ size, intensity, color = [144, 180, 209] }) => {
  const tex = useMemo(
    () => makeGlowTexture(color[0], color[1], color[2], 0.25),
    [color]
  );
  return (
    <sprite scale={[size * intensity, size * intensity, 1]}>
      <spriteMaterial
        map={tex}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={intensity * 0.6}
      />
    </sprite>
  );
};
Halo.propTypes = {
  size: PropTypes.number.isRequired,
  intensity: PropTypes.number.isRequired,
  color: PropTypes.array,
};

// Flowing Neural Connection Edge
const FlowEdge = ({ from, to, isConnected, isDimmed }) => {
  const lineRef = useRef();

  const curvePoints = useMemo(() => {
    const vFrom = new THREE.Vector3(...from);
    const vTo = new THREE.Vector3(...to);
    const vMid = vFrom.clone().lerp(vTo, 0.5);
    
    // Add organic bending to the line flow
    vMid.y += Math.sin(vFrom.x * 2) * 0.8;
    vMid.z += Math.cos(vFrom.y * 2) * 0.8;
    
    const curve = new THREE.CatmullRomCurve3([vFrom, vMid, vTo]);
    return curve.getPoints(40);
  }, [from, to]);

  useFrame((_, dt) => {
    if (lineRef.current) {
      // Animate the line dash backward to simulate data flowing forward
      lineRef.current.material.dashOffset -= (isConnected ? 1.5 : 0.2) * dt;
    }
  });

  const baseOpacity = isDimmed ? 0.08 : isConnected ? 0.85 : 0.45;

  return (
    <group>
      {/* Background steady line */}
      <Line
        points={curvePoints}
        color={isConnected ? "#a8d0e8" : "#4a6c82"}
        lineWidth={isConnected ? 3 : 1}
        transparent
        opacity={baseOpacity * 0.3}
      />
      {/* Animated data stream dashed line */}
      <Line
        ref={lineRef}
        points={curvePoints}
        color={isConnected ? "#ffffff" : "#a8d0e8"}
        lineWidth={isConnected ? 4 : 1.5}
        transparent
        opacity={baseOpacity}
        dashed
        dashSize={0.4}
        gapSize={0.8}
        blending={THREE.AdditiveBlending}
      />
    </group>
  );
};
FlowEdge.propTypes = {
  from: PropTypes.array.isRequired,
  to: PropTypes.array.isRequired,
  isConnected: PropTypes.bool.isRequired,
  isDimmed: PropTypes.bool.isRequired,
};

// Hub Node: Pulsing Geometric Core
const PrimaryNode = ({ node, isHovered, onHover, onLeave }) => {
  const coreRef = useRef();
  
  useFrame((_, dt) => {
    if (coreRef.current) {
      coreRef.current.rotation.y += dt * 0.3;
      coreRef.current.rotation.x += dt * 0.2;
      const tScale = isHovered ? 1.4 : 1.0;
      coreRef.current.scale.lerp(new THREE.Vector3(tScale, tScale, tScale), dt * 6);
    }
  });

  return (
    <group position={node.pos}>
      <Halo size={3.0} intensity={isHovered ? 1.0 : 0.4} />

      <mesh
        ref={coreRef}
        onPointerOver={(e) => { e.stopPropagation(); onHover(node.id); }}
        onPointerOut={onLeave}
        onClick={(e) => { e.stopPropagation(); onHover(node.id); }}
      >
        <icosahedronGeometry args={[0.5, 1]} />
        <meshBasicMaterial color="#a8d0e8" wireframe transparent opacity={isHovered ? 0.9 : 0.4} />
      </mesh>

      <mesh>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={isHovered ? 1 : 0.8} />
      </mesh>

      <Html
        center
        distanceFactor={13}
        style={{ pointerEvents: "none", userSelect: "none", whiteSpace: "nowrap" }}
        zIndexRange={[100, 0]}
      >
        <div className={`ctd-3d-label ${isHovered ? "ctd-3d-label-hovered" : ""}`}>
          <span className="ctd-3d-name">{node.label}</span>
          <span className="ctd-3d-year">{node.year}</span>
        </div>
      </Html>
    </group>
  );
};
PrimaryNode.propTypes = {
  node: PropTypes.object.isRequired,
  isHovered: PropTypes.bool.isRequired,
  onHover: PropTypes.func.isRequired,
  onLeave: PropTypes.func.isRequired,
};

// Processing node
const SecondaryNode = ({ node, isHovered, onHover, onLeave }) => {
  const meshRef = useRef();

  useFrame((_, dt) => {
    if (meshRef.current) {
      meshRef.current.rotation.z -= dt * 0.5;
      const tScale = isHovered ? 1.5 : 1.0;
      meshRef.current.scale.lerp(new THREE.Vector3(tScale, tScale, tScale), dt * 6);
    }
  });

  return (
    <group position={node.pos}>
      <Halo size={1.8} intensity={isHovered ? 0.8 : 0.3} color={[100, 200, 255]}/>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5} floatingRange={[-0.1, 0.1]}>
        <mesh
          ref={meshRef}
          onPointerOver={(e) => { e.stopPropagation(); onHover(node.id); }}
          onPointerOut={onLeave}
          onClick={(e) => { e.stopPropagation(); onHover(node.id); }}
        >
          <octahedronGeometry args={[0.25, 0]} />
          <meshBasicMaterial color="#a8bcc8" wireframe transparent opacity={isHovered ? 1 : 0.5} />
        </mesh>
        <mesh>
          <sphereGeometry args={[0.08, 12, 12]}/>
          <meshBasicMaterial color="#ffffff" />
        </mesh>
      </Float>
      <Html
        center
        distanceFactor={13}
        style={{ pointerEvents: "none", userSelect: "none", whiteSpace: "nowrap" }}
      >
        <span className={`ctd-3d-dot-label ${isHovered ? "ctd-3d-dot-label-hovered" : ""}`}>
          {node.label}
        </span>
      </Html>
    </group>
  );
};
SecondaryNode.propTypes = {
  node: PropTypes.object.isRequired,
  isHovered: PropTypes.bool.isRequired,
  onHover: PropTypes.func.isRequired,
  onLeave: PropTypes.func.isRequired,
};

const Starfield = () => {
  const ref = useRef();
  const count = 400;

  const dotTex = useMemo(() => makeDotTexture(), []);

  const [geo] = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3);
    const sz = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 35;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 15 - 5; // Push stars back on Z
      sz[i] = Math.random() * 0.05 + 0.01;
    }
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    g.setAttribute("size", new THREE.BufferAttribute(sz, 1));
    return [g];
  }, []);

  useFrame((_, dt) => {
    if (ref.current) {
        ref.current.rotation.y += dt * 0.003;
        ref.current.position.z = Math.sin(_.clock.elapsedTime * 0.05);
    }
  });

  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial
        size={0.06}
        color="#a8d0e8"
        map={dotTex}
        alphaTest={0.5}
        transparent
        opacity={0.3}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

/* ================================================
   Exported component
   ================================================ */

const Constellation3D = ({
  primaryNodes,
  secondaryNodes,
  edges,
  nodeMap,
  hoveredNodeId,
  onHover,
  onLeave,
}) => {
  const handleLeave = useCallback(() => onLeave(), [onLeave]);

  return (
    <Canvas
      camera={{ position: [0, 0, 12], fov: 40 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.5} />
      <Starfield />

      <AutoRotate>
        {primaryNodes.map((n) => (
          <PrimaryNode
            key={n.id}
            node={n}
            isHovered={hoveredNodeId === n.id}
            onHover={onHover}
            onLeave={handleLeave}
          />
        ))}
        {secondaryNodes.map((n) => (
          <SecondaryNode
            key={n.id}
            node={n}
            isHovered={hoveredNodeId === n.id}
            onHover={onHover}
            onLeave={handleLeave}
          />
        ))}
        {edges.map((e) => {
          const f = nodeMap[e.from];
          const t = nodeMap[e.to];
          const conn = hoveredNodeId && (e.from === hoveredNodeId || e.to === hoveredNodeId);
          const dim = hoveredNodeId && !conn;
          return (
            <FlowEdge
              key={`${e.from}-${e.to}`}
              from={f.pos}
              to={t.pos}
              isConnected={!!conn}
              isDimmed={!!dim}
            />
          );
        })}
      </AutoRotate>
    </Canvas>
  );
};

Constellation3D.propTypes = {
  primaryNodes: PropTypes.array.isRequired,
  secondaryNodes: PropTypes.array.isRequired,
  edges: PropTypes.array.isRequired,
  nodeMap: PropTypes.object.isRequired,
  hoveredNodeId: PropTypes.string,
  onHover: PropTypes.func.isRequired,
  onLeave: PropTypes.func.isRequired,
};

export default Constellation3D;
