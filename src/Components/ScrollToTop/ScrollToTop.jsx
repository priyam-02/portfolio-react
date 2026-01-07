import { useState, useEffect } from "react";
import "./ScrollToTop.css";
import { motion, AnimatePresence } from "framer-motion";
import { useReducedMotion } from '../../hooks/useReducedMotion';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const reducedMotion = useReducedMotion();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    let rafId = null;

    const toggleVisibility = () => {
      if (rafId) return; // Skip if RAF already scheduled

      rafId = requestAnimationFrame(() => {
        const shouldShow = window.scrollY > 300;
        setIsVisible(shouldShow);
        rafId = null;
      });
    };

    // Passive listener for better performance
    window.addEventListener("scroll", toggleVisibility, { passive: true });
    toggleVisibility(); // Check initial state

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          className="scroll-to-top"
          onClick={scrollToTop}
          aria-label="Scroll to top"
          initial={reducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.8, rotate: 180 }}
          animate={reducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1, rotate: 0 }}
          exit={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.8, rotate: -180 }}
          whileHover={reducedMotion ? {} : { scale: 1.1, rotate: 90 }}
          whileTap={reducedMotion ? {} : { scale: 0.95 }}
          transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="scroll-arrow-icon"
          >
            <polyline points="6 15 12 9 18 15" />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;
