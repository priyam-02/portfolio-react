import { motion } from "framer-motion";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { useRef, useEffect, useState } from "react";
import "./TechStackMarquee.css";

const TechStackMarquee = () => {
  const reducedMotion = useReducedMotion();
  const row1Ref = useRef(null);
  const row2Ref = useRef(null);
  const [row1Width, setRow1Width] = useState(0);
  const [row2Width, setRow2Width] = useState(0);

  const techStack = [
    { name: "Python", icon: "fab fa-python", color: "#3776AB" },
    { name: "FastAPI", icon: "fa-solid fa-bolt-lightning", color: "#009688" },
    { name: "Langchain", icon: "fa-solid fa-link", color: "#00C853" },
    { name: "Ollama", icon: "fa-solid fa-brain", color: "#E91E63" },
    { name: "Docker", icon: "fa-brands fa-docker", color: "#2496ED" },
    { name: "Prompting", icon: "fa-solid fa-terminal", color: "#9C27B0" },
    { name: "React.js", icon: "fab fa-react", color: "#61DAFB" },
    { name: "Node.js", icon: "fab fa-node", color: "#339933" },
    { name: "Express", icon: "fab fa-node-js", color: "#FFFFFF" },
    { name: "React Native", icon: "fab fa-react", color: "#61DAFB" },
    { name: "MongoDB", icon: "fas fa-database", color: "#47A248" },
    { name: "PostgreSQL", icon: "fa-solid fa-database", color: "#4169E1" },
    { name: "JavaScript", icon: "fab fa-js", color: "#F7DF1E" },
    { name: "Git", icon: "fab fa-git-alt", color: "#F05032" },
  ];

  // Split into two rows for alternating scroll directions
  const row1 = techStack.slice(0, 7);
  const row2 = techStack.slice(7);

  // Only 2x duplication - more efficient (industry standard)
  const row1Items = [...row1, ...row1];
  const row2Items = [...row2, ...row2];

  // Measure content width dynamically for pixel-perfect scrolling
  useEffect(() => {
    const measureWidth = (ref, setWidth) => {
      if (ref.current) {
        const cards = ref.current.querySelectorAll(".tech-card");
        if (cards.length > 0) {
          const halfLength = cards.length / 2;

          // Use getBoundingClientRect for sub-pixel precision
          // Measure from first card to last card of first set
          const firstCard = cards[0].getBoundingClientRect();
          const lastCardOfFirstSet =
            cards[halfLength - 1].getBoundingClientRect();

          // Calculate exact width including the gap after the last card
          const computedGap =
            parseFloat(getComputedStyle(ref.current).gap) || 24;
          const exactWidth =
            lastCardOfFirstSet.right - firstCard.left + computedGap;

          // Round to prevent sub-pixel rendering issues
          setWidth(Math.round(exactWidth * 100) / 100);
        }
      }
    };

    // Delay initial measurement to ensure DOM is fully rendered
    const measureWithDelay = () => {
      setTimeout(() => {
        measureWidth(row1Ref, setRow1Width);
        measureWidth(row2Ref, setRow2Width);
      }, 100);
    };

    measureWithDelay();

    // ResizeObserver for responsive updates
    const resizeObserver = new ResizeObserver(() => {
      // Debounce resize measurements
      setTimeout(() => {
        measureWidth(row1Ref, setRow1Width);
        measureWidth(row2Ref, setRow2Width);
      }, 100);
    });

    if (row1Ref.current) resizeObserver.observe(row1Ref.current);
    if (row2Ref.current) resizeObserver.observe(row2Ref.current);

    return () => resizeObserver.disconnect();
  }, []);

  return (
    <div className="tech-stack-marquee">
      <motion.div
        className="marquee-header"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <h3 className="marquee-title">Technical Skills</h3>
        <p className="marquee-subtitle">
          Technologies I work with to build exceptional products
        </p>
      </motion.div>

      {/* Row 1 - Scroll Left (Dynamic Width Animation) */}
      <div className="marquee-row">
        <div
          ref={row1Ref}
          className={`marquee-content ${reducedMotion ? "no-animation" : "scroll-left"}`}
          style={{
            "--scroll-width": `${row1Width}px`,
            "--scroll-duration": `${Math.max(30, row1Width / 50)}s`, // 50px per second
          }}
        >
          {row1Items.map((tech, index) => (
            <div
              key={`row1-${index}`}
              className="tech-card"
              style={{
                "--tech-color": tech.color,
              }}
            >
              <div className="tech-icon-wrapper">
                <i className={tech.icon}></i>
                <div
                  className="tech-glow"
                  style={{
                    background: `radial-gradient(circle, ${tech.color}40 0%, transparent 70%)`,
                  }}
                ></div>
              </div>
              <span className="tech-name">{tech.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Row 2 - Scroll Right (Dynamic Width Animation) */}
      <div className="marquee-row">
        <div
          ref={row2Ref}
          className={`marquee-content marquee-reverse ${reducedMotion ? "no-animation" : "scroll-right"}`}
          style={{
            "--scroll-width": `${row2Width}px`,
            "--scroll-duration": `${Math.max(35, row2Width / 45)}s`, // Slightly slower
          }}
        >
          {row2Items.map((tech, index) => (
            <div
              key={`row2-${index}`}
              className="tech-card"
              style={{
                "--tech-color": tech.color,
              }}
            >
              <div className="tech-icon-wrapper">
                <i className={tech.icon}></i>
                <div
                  className="tech-glow"
                  style={{
                    background: `radial-gradient(circle, ${tech.color}40 0%, transparent 70%)`,
                  }}
                ></div>
              </div>
              <span className="tech-name">{tech.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Gradient Fade Edges */}
      <div className="marquee-fade marquee-fade-left"></div>
      <div className="marquee-fade marquee-fade-right"></div>
    </div>
  );
};

export default TechStackMarquee;
