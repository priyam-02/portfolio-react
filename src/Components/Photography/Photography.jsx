import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";
import photography_data from "../../assets/photography_data";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import "./Photography.css";

const Photography = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [[page, direction], setPage] = useState([0, 0]); // Direction tracking for smooth swipe animations
  const reducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Keep image references in state to prevent browser from unloading decoded WebP
  // eslint-disable-next-line no-unused-vars
  const [preloadedImages] = useState(() => {
    return photography_data.map((photo) => {
      const img = new Image();
      img.src = photo.image;
      return img;
    });
  });

  // Open lightbox with specific image
  const openLightbox = (index) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = "hidden"; // Prevent background scroll
  };

  // Close lightbox
  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
    document.body.style.overflow = "unset";
  }, []);

  // Navigate to next image with direction tracking
  const nextImage = useCallback(() => {
    setPage([page + 1, 1]);
    setCurrentImageIndex((prev) => (prev + 1) % photography_data.length);
  }, [page]);

  // Navigate to previous image with direction tracking
  const prevImage = useCallback(() => {
    setPage([page - 1, -1]);
    setCurrentImageIndex(
      (prev) => (prev - 1 + photography_data.length) % photography_data.length
    );
  }, [page]);

  // Handle window resize for mobile detection
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    if (!lightboxOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen, closeLightbox, nextImage, prevImage]);

  // Enhanced touch swipe handling with momentum for mobile
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    const swipeDistance = touchStart - touchEnd;
    const swipeThreshold = 75;

    if (swipeDistance > swipeThreshold) {
      nextImage();
    }
    if (swipeDistance < -swipeThreshold) {
      prevImage();
    }
  };

  // Simplified animation variants - fast, cohesive entrance
  const cardVariants = {
    hidden: {
      opacity: 0,
      y: reducedMotion ? 0 : 20,
      scale: reducedMotion ? 1 : 0.98,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: reducedMotion ? 0 : 0.35,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };

  const lightboxVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1],
      },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.2 },
    },
  };

  const imageVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1],
      },
    },
    exit: (direction) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      transition: {
        duration: 0.2,
        ease: [0.4, 0, 0.2, 1],
      },
    }),
  };

  return (
    <section id="photography" className="photography section">
      {/* Background Elements */}
      <div className="background-elements">
        <div className="floating-shape shape-1"></div>
        <div className="floating-shape shape-2"></div>
        <div className="floating-shape shape-3"></div>
      </div>

      {/* Background Particles */}
      <div className="particles">
        <div className="particle particle-1"></div>
        <div className="particle particle-2"></div>
        <div className="particle particle-3"></div>
        <div className="particle particle-4"></div>
        <div className="particle particle-5"></div>
        <div className="particle particle-6"></div>
      </div>

      <div className="container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-200px" }}
          transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
        >
          <h2 className="section-title">
            My <span className="title-accent">Clicks</span>
          </h2>
          <p className="section-subtitle">
            A curated collection of moments captured through my lens
          </p>
        </motion.div>

        {/* Asymmetric Bento Grid */}
        <div className="bento-grid">
          {photography_data.map((photo, index) => (
            <motion.div
              key={photo.id}
              className="photo-card"
              style={
                isMobile
                  ? {}
                  : {
                      gridColumn: photo.gridColumn,
                      gridRow: photo.gridRow,
                    }
              }
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px", amount: 0.2 }}
              whileHover={
                reducedMotion
                  ? {}
                  : {
                      y: -12,
                      scale: 1.02,
                      transition: { duration: 0.15, ease: "easeOut" },
                    }
              }
              onClick={() => openLightbox(index)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  openLightbox(index);
                }
              }}
              aria-label={`View photo ${index + 1} in lightbox`}
            >
              <div
                className="photo-frame"
                style={isMobile ? {} : { aspectRatio: photo.aspectRatio }}
              >
                <img
                  src={photo.image}
                  alt={photo.alt}
                  className="photo-image"
                  decoding="sync"
                  fetchPriority={index < 6 ? "high" : "auto"}
                />
                <div className="photo-overlay">
                  <div className="view-icon">
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal - Rendered via Portal */}
      {createPortal(
        <AnimatePresence>
          {lightboxOpen && (
            <motion.div
              className="lightbox-overlay"
              variants={lightboxVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={closeLightbox}
              role="dialog"
              aria-modal="true"
              aria-label="Image lightbox"
            >
              <button
                className="lightbox-close"
                onClick={closeLightbox}
                aria-label="Close lightbox"
              >
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>

              <div className="lightbox-counter">
                {currentImageIndex + 1} / {photography_data.length}
              </div>

              <button
                className="lightbox-nav lightbox-prev"
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
                aria-label="Previous image"
              >
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
              </button>

              <button
                className="lightbox-nav lightbox-next"
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
                aria-label="Next image"
              >
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>

              <motion.div
                className="lightbox-content"
                onClick={(e) => e.stopPropagation()}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.img
                    key={currentImageIndex}
                    src={photography_data[currentImageIndex].image}
                    alt={photography_data[currentImageIndex].alt}
                    className="lightbox-image"
                    custom={direction}
                    variants={imageVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                  />
                </AnimatePresence>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </section>
  );
};

export default Photography;
