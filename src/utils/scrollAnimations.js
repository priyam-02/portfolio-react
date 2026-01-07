import { useScroll, useTransform, useSpring, useInView } from 'motion/react';
import { useRef } from 'react';

// Advanced spring configurations with character
export const springs = {
  magnetic: { stiffness: 200, damping: 15, mass: 0.8 },  // Bouncy, playful
  liquid: { stiffness: 100, damping: 25, mass: 1.2 },    // Smooth, fluid
  kinetic: { stiffness: 300, damping: 20, mass: 0.5 },   // Sharp, snappy
  breath: { stiffness: 80, damping: 30, mass: 1.5 },     // Gentle, organic
  gentle: { stiffness: 120, damping: 28, mass: 1.0 },    // Balanced, refined
  responsive: { stiffness: 180, damping: 18, mass: 0.6 }, // Quick, natural
  smooth: { stiffness: 90, damping: 26, mass: 1.3 }      // Silky, elegant
};

// Layered parallax hook - creates dimensional depth
export const useLayeredParallax = (depth = 1) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [depth * 100, depth * -100]);
  return { ref, y: useSpring(y, springs.liquid) };
};

// Magnetic card effect - 3D rotation based on scroll
export const useMagneticCard = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"]
  });

  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [15, 0, -15]);
  const rotateY = useTransform(scrollYProgress, [0, 0.5, 1], [-8, 0, 8]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1, 0.85]);

  return {
    ref,
    rotateX: useSpring(rotateX, springs.magnetic),
    rotateY: useSpring(rotateY, springs.magnetic),
    scale: useSpring(scale, springs.breath)
  };
};

// Ink draw effect for timeline paths
export const useInkDraw = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"]
  });

  const pathLength = useSpring(scrollYProgress, springs.liquid);
  const opacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return { ref, pathLength, opacity };
};

// Wave reveal - staggered with sine wave offset
export const createWaveReveal = (index, total) => {
  const delay = (index / total) * 0.5;
  const offsetY = Math.sin((index / total) * Math.PI) * 30;

  return {
    hidden: {
      opacity: 0,
      y: 60 + offsetY,
      scale: 0.9,
      rotateZ: index % 2 === 0 ? -5 : 5
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateZ: 0,
      transition: {
        duration: 0.8,
        delay,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };
};

// Stagger delay calculator
export const getStaggerDelay = (index, baseDelay = 0.1, maxDelay = 0.5) => {
  return Math.min(index * baseDelay, maxDelay);
};

// Viewport reveal utility
export const useReveal = (margin = "-100px", threshold = 0.3) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin, amount: threshold });
  return { ref, inView };
};
