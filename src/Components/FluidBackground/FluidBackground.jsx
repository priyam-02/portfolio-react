import { useEffect, useRef } from "react";
import webglFluid from "webgl-fluid";
import { useReducedMotion } from "../../hooks/useReducedMotion";

const FluidBackground = () => {
  const canvasRef = useRef(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    // Disable fluid if reduced motion preferred
    if (reducedMotion || !canvasRef.current) return;

    // Initialize fluid on canvas
    const fluidInstance = webglFluid(canvasRef.current, {
      IMMEDIATE: false, // Don't trigger splats initially
      TRIGGER: "hover", // 'hover' or 'click'
      SIM_RESOLUTION: 128,
      DYE_RESOLUTION: 1024,
      CAPTURE_RESOLUTION: 512,
      DENSITY_DISSIPATION: 4, // Faster fade so it doesn't clutter
      VELOCITY_DISSIPATION: 3, // More friction for a smoother, tighter curl
      PRESSURE: 0.8,
      PRESSURE_ITERATIONS: 20,
      CURL: 2, // Low curl means smooth flows instead of chaotic swirls
      SPLAT_RADIUS: 0.12, // Much thinner, elegant line
      SPLAT_FORCE: 3000, // Reduced force
      SHADING: true,
      COLORFUL: true,
      COLOR_UPDATE_SPEED: 2, // Slow down hue shifting
      PAUSED: false,
      BACK_COLOR: { r: 10, g: 10, b: 10 },
      TRANSPARENT: true,
      BLOOM: true,
      BLOOM_ITERATIONS: 8,
      BLOOM_RESOLUTION: 256,
      BLOOM_INTENSITY: 0.1, // Drastically cut bloom
      BLOOM_THRESHOLD: 0.8,
      BLOOM_SOFT_KNEE: 0.7,
      SUNRAYS: false, // Remove volumetric godrays for cleaner look

    });

    return () => {
      // Cleanup if the library supports it, or generic cleanup
      if (typeof fluidInstance === "function" && typeof fluidInstance.destroy === "function") {
        fluidInstance.destroy();
      }
    };
  }, [reducedMotion]);

  // Force canvas to receive pointer events
  useEffect(() => {
    if (reducedMotion || !canvasRef.current) return;
    const canvas = canvasRef.current;
    
    // Create accurate clone of pointer events
    const cloneMouseEvent = (e, type) => {
      return new MouseEvent(type, {
        bubbles: true,
        cancelable: true,
        clientX: e.clientX,
        clientY: e.clientY,
        screenX: e.screenX,
        screenY: e.screenY,
        movementX: e.movementX,
        movementY: e.movementY,
        button: e.button,
        buttons: e.buttons,
      });
    };

    const handlePointerMap = (e) => {
      if (e.target === canvas) return;
      
      let type = '';
      if (e.type === 'pointerdown') type = 'mousedown';
      if (e.type === 'pointermove') type = 'mousemove';
      if (e.type === 'pointerup') type = 'mouseup';
      
      if (type) canvas.dispatchEvent(cloneMouseEvent(e, type));
    };

    window.addEventListener('pointerdown', handlePointerMap, { passive: false });
    window.addEventListener('pointermove', handlePointerMap, { passive: false });
    window.addEventListener('pointerup', handlePointerMap);

    return () => {
      window.removeEventListener('pointerdown', handlePointerMap);
      window.removeEventListener('pointermove', handlePointerMap);
      window.removeEventListener('pointerup', handlePointerMap);
    };
  }, [reducedMotion]);

  if (reducedMotion) return null;

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: "100vw",
        height: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: -999,
        pointerEvents: "none", // Prevent blocking clicks
      }}
    />
  );
};

export default FluidBackground;
