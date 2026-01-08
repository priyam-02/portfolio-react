import "./Hero.css";
import profile_img from "../../assets/profile_img4.svg";
import AnchorLink from "react-anchor-link-smooth-scroll";
import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { springs } from "../../utils/scrollAnimations";

const codeSnippets = [
  {
    language: "React",
    code: `function <span class='hl-keyword'>PriyamGreeting</span>() {\n  <span class='hl-keyword'>return</span> (<br/>    <span class='hl-tag'>&lt;h1&gt;</span>Hello from Priyam!<span class='hl-tag'>&lt;/h1&gt;</span><br/>  )}`,
  },
  {
    language: "Next.js",
    code: `// pages/api/priyam.js<br/><span class='hl-keyword'>export default function</span> handler(req, res) {<br/>  res.json({ dev: <span class='hl-string'>'Priyam Shah'</span> });<br/>}`,
  },
  {
    language: "Python",
    code: `<span class='hl-keyword'>class</span> PriyamBot:<br/>    <span class='hl-keyword'>def</span> greet(self):<br/>        <span class='hl-keyword'>return</span> <span class='hl-string'>'Hello, I am PriyamBot!'</span>`,
  },
  {
    language: "JavaScript",
    code: `<span class='hl-keyword'>const</span> priyamSignature = () =&gt; <span class='hl-string'>'Crafted by Priyam'</span>;`,
  },
  {
    language: "Ollama",
    code: `response = client.chat(<span class='hl-string'>'Who is Priyam Shah?'</span>)`,
  },
  {
    language: "Langchain",
    code: `result = lm(<span class='hl-string'>'Tell me about Priyam Shah.'</span>)`,
  },
  {
    language: "Docker",
    code: `<span class='hl-keyword'>LABEL</span> maintainer=<span class='hl-string'>"Priyam Shah"</span>`,
  },
  {
    language: "FastAPI",
    code: `@app.get(<span class='hl-string'>"/priyam"</span>)<br/><span class='hl-keyword'>def</span> about():<br/>    <span class='hl-keyword'>return</span> {<span class='hl-string'>'name'</span>: <span class='hl-string'>'Priyam'</span>}`,
  },
  {
    language: "Git",
    code: `<span class='hl-keyword'>git</span> commit -m <span class='hl-string'>'Initial commit by Priyam'</span>`,
  },
  {
    language: "MongoDB",
    code: `<span class='hl-keyword'>db</span>.users.insertOne({ <span class='hl-string'>'name'</span>: <span class='hl-string'>'Priyam'</span> })`,
  },
  {
    language: "Express",
    code: `app.get(<span class='hl-string'>'/priyam'</span>, (req, res) =&gt; res.send(<span class='hl-string'>'Hello from Priyam!'</span>));`,
  },
  {
    language: "Node.js",
    code: `<span class='hl-keyword'>console</span>.log(<span class='hl-string'>'Server by Priyam running...'</span>);`,
  },
  {
    language: "PostgreSQL/SQLite",
    code: `<span class='hl-keyword'>SELECT</span> * <span class='hl-keyword'>FROM</span> users <span class='hl-keyword'>WHERE</span> name = <span class='hl-string'>'Priyam'</span>;`,
  },
];

const TYPING_SPEED = 18; // ms per character
const PAUSE_AFTER_TYPING = 1200; // ms to pause after typing before switching

const Hero = () => {
  const [snippetIndex, setSnippetIndex] = useState(0);
  const [typedHtml, setTypedHtml] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const typingTimeout = useRef();
  const switchTimeout = useRef();
  const dropdownRef = useRef();
  const heroRef = useRef(null);

  const reducedMotion = useReducedMotion();

  // Detect mobile devices to disable rotation animation on stats
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(
        window.innerWidth <= 767 || window.matchMedia("(hover: none)").matches
      );
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Parallax for profile image (reduced intensity)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 30]);

  // Scroll-linked fade and scale for entire hero
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.7]);
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.98]);
  const smoothOpacity = useSpring(heroOpacity, springs.breath);
  const smoothScale = useSpring(heroScale, springs.breath);

  // Animation variants for orchestrated entrance
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.3 },
    },
  };

  const magneticVariants = {
    hidden: { scale: 0.8, opacity: 0, filter: "blur(20px)" },
    visible: {
      scale: 1,
      opacity: 1,
      filter: "blur(0px)",
      transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const slideVariants = {
    hidden: { x: -100, opacity: 0 },
    visible: (i) => ({
      x: 0,
      opacity: 1,
      transition: { duration: 0.8, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
    }),
  };

  const floatVariants = {
    hidden: { y: 40, opacity: 0, rotateZ: -3 },
    visible: (i) => ({
      y: 0,
      opacity: 1,
      rotateZ: 0,
      transition: {
        duration: 0.9,
        delay: 0.6 + i * 0.05,
        ease: [0.34, 1.56, 0.64, 1],
      },
    }),
  };

  // Gradient mesh following cursor (throttled for performance)
  useEffect(() => {
    let timeoutId;
    let lastExec = 0;

    const throttle = (func, delay) => {
      return function (...args) {
        const elapsed = Date.now() - lastExec;

        const exec = () => {
          lastExec = Date.now();
          func(...args);
        };

        clearTimeout(timeoutId);

        if (elapsed > delay) {
          exec();
        } else {
          timeoutId = setTimeout(exec, delay - elapsed);
        }
      };
    };

    const handleMouseMove = throttle((e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    }, 16); // ~60fps

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(timeoutId);
    };
  }, []);

  // Typing animation effect
  useEffect(() => {
    setTypedHtml("");
    setIsTyping(true);
    const html = codeSnippets[snippetIndex].code;
    let i = 0;
    function typeChar() {
      setTypedHtml(html.slice(0, i));
      if (i < html.length) {
        i++;
        typingTimeout.current = setTimeout(typeChar, TYPING_SPEED);
      } else {
        setIsTyping(false);
        switchTimeout.current = setTimeout(() => {
          setSnippetIndex((prev) => (prev + 1) % codeSnippets.length);
        }, PAUSE_AFTER_TYPING);
      }
    }
    typeChar();
    return () => {
      clearTimeout(typingTimeout.current);
      clearTimeout(switchTimeout.current);
    };
    // eslint-disable-next-line
  }, [snippetIndex]);

  // Custom dropdown handlers
  const handleDropdownToggle = () => setDropdownOpen((open) => !open);
  const handleDropdownSelect = (idx) => {
    setSnippetIndex(idx);
    setDropdownOpen(false);
  };
  // Keyboard navigation for dropdown
  const handleDropdownKeyDown = (e) => {
    if (
      !dropdownOpen &&
      (e.key === "Enter" || e.key === " " || e.key === "ArrowDown")
    ) {
      setDropdownOpen(true);
      e.preventDefault();
    } else if (dropdownOpen) {
      if (e.key === "Escape") {
        setDropdownOpen(false);
      } else if (e.key === "ArrowDown") {
        setSnippetIndex((prev) => (prev + 1) % codeSnippets.length);
      } else if (e.key === "ArrowUp") {
        setSnippetIndex(
          (prev) => (prev - 1 + codeSnippets.length) % codeSnippets.length
        );
      } else if (e.key === "Enter" || e.key === " ") {
        setDropdownOpen(false);
      }
    }
  };
  // Close dropdown on outside click
  useEffect(() => {
    if (!dropdownOpen) return;
    function handleClick(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [dropdownOpen]);

  return (
    <motion.section
      id="home"
      className="hero hero-minimalist section"
      ref={heroRef}
      style={{
        opacity: reducedMotion ? 1 : smoothOpacity,
        scale: reducedMotion ? 1 : smoothScale,
      }}
    >
      {/* Gradient Mesh Background */}
      <div
        className="gradient-mesh"
        style={{
          background: `radial-gradient(600px at ${mousePos.x}px ${mousePos.y}px, rgba(124, 156, 181, 0.15), transparent 80%)`,
        }}
      />

      {/* Minimal Background Particles */}
      <div className="particles">
        <div className="particle particle-1"></div>
        <div className="particle particle-2"></div>
      </div>

      <motion.div
        className="container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="hero-content hero-content-minimalist">
          {/* Right Sidebar - Profile, Stats, Actions */}
          <motion.div
            className="hero-sidebar-left"
            variants={magneticVariants}
            whileHover={{
              scale: 1.02,
              rotateZ: 1,
              transition: { duration: 0.3 },
            }}
          >
            {/* Profile Image */}
            <div className="hero-image-minimalist">
              <motion.img
                src={profile_img}
                alt="Priyam Shah"
                className="hero-profile-minimalist"
                style={{ y }}
                fetchpriority="high"
              />
            </div>

            {/* Stats */}
            <div className="hero-stats hero-stats-minimalist">
              {[
                { number: "2+", label: "Years Exp" },
                { number: "10+", label: "Projects" },
                { number: "15+", label: "Technologies" },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  className="stat stat-minimalist"
                  variants={floatVariants}
                  custom={i}
                  whileHover={
                    isMobile
                      ? { scale: 1.15, transition: { duration: 0.2 } }
                      : {
                          scale: 1.15,
                          rotateZ: i % 2 === 0 ? 5 : -5,
                          transition: { duration: 0.2 },
                        }
                  }
                >
                  <span className="stat-number stat-number-minimalist">
                    {stat.number}
                  </span>
                  <span className="stat-label stat-label-minimalist">
                    {stat.label}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="hero-actions hero-actions-minimalist">
              <motion.div variants={floatVariants} custom={3}>
                <AnchorLink className="anchor-link" offset={80} href="#contact">
                  <motion.button
                    className="btn btn-primary btn-primary-minimalist"
                    whileTap={reducedMotion ? {} : { scale: 0.97 }}
                    transition={{ duration: 0.1 }}
                  >
                    <i className="fas fa-paper-plane"></i>
                    Get In Touch
                  </motion.button>
                </AnchorLink>
              </motion.div>

              <motion.a
                href="https://drive.google.com/file/d/12toNjpj5AsTU-KIMstEIumZoUAOaR4wf/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary btn-secondary-minimalist"
                variants={floatVariants}
                custom={4}
                whileTap={reducedMotion ? {} : { scale: 0.97 }}
                transition={{ duration: 0.1 }}
              >
                <i className="fas fa-download"></i>
                Download Resume
              </motion.a>
            </div>
          </motion.div>

          {/* Main Left Content */}
          <div className="hero-text hero-text-minimalist">
            {/* Bold Typography Hero */}
            <motion.h1
              className="hero-title-minimalist"
              variants={slideVariants}
              custom={0}
            >
              <span className="hero-name-large">PRIYAM SHAH</span>
              <motion.span
                className="hero-role"
                variants={slideVariants}
                custom={1}
              >
                Full-Stack Engineer & AI Researcher
              </motion.span>
            </motion.h1>

            {/* Geometric Accent Line */}
            <motion.div
              className="geometric-accent-line"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{
                duration: 1.2,
                delay: 0.8,
                ease: [0.22, 1, 0.36, 1],
              }}
            />

            {/* Greeting Message */}
            <motion.p
              className="hero-greeting"
              variants={slideVariants}
              custom={2}
            >
              Let&apos;s build something extraordinary!
            </motion.p>

            {/* Technology Pills - iPad Pro Only */}
            <div className="tech-stack-pills-minimalist tech-stack-ipad-pro">
              {[
                "React",
                "Node.js",
                "TypeScript",
                "Python",
                "LangChain",
                "FastAPI",
                "MongoDB",
                "PostgreSQL",
                "Terraform",
                "Docker",
                "AWS",
                "Git",
              ].map((tech, i) => (
                <motion.span
                  key={tech}
                  className="tech-pill-minimalist"
                  initial={{ opacity: 0, y: 20, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.9 + i * 0.03,
                    ease: [0.34, 1.56, 0.64, 1],
                  }}
                  whileHover={{
                    scale: 1.1,
                    y: -5,
                    transition: { duration: 0.2 },
                  }}
                >
                  {tech}
                </motion.span>
              ))}
            </div>

            {/* Custom Dropdown for Language Selection */}
            <div className="hero-dropdown-row" ref={dropdownRef}>
              <motion.button
                className={`hero-snippet-select custom ${dropdownOpen ? "open" : ""}`}
                aria-haspopup="listbox"
                aria-expanded={dropdownOpen}
                aria-label="Select code language"
                tabIndex={0}
                onClick={handleDropdownToggle}
                onKeyDown={handleDropdownKeyDown}
                type="button"
                whileTap={reducedMotion ? {} : { scale: 0.97 }}
                transition={{ duration: 0.1 }}
              >
                {codeSnippets[snippetIndex].language}
                <span className="dropdown-arrow" aria-hidden="true" />
              </motion.button>
              {dropdownOpen && (
                <ul className="hero-dropdown-list" role="listbox" tabIndex={-1}>
                  {codeSnippets.map((snippet, idx) => (
                    <li
                      key={snippet.language}
                      className={`hero-dropdown-option${snippetIndex === idx ? " selected" : ""}`}
                      role="option"
                      aria-selected={snippetIndex === idx}
                      tabIndex={0}
                      onClick={() => handleDropdownSelect(idx)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ")
                          handleDropdownSelect(idx);
                      }}
                    >
                      {snippet.language}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Animated Code Snippet Box */}
            <div
              className={`hero-codebox${isTyping ? " typing" : ""}`}
              aria-label={codeSnippets[snippetIndex].language + " code example"}
            >
              <div className="codebox-header">
                <span className="codebox-dot red"></span>
                <span className="codebox-dot yellow"></span>
                <span className="codebox-dot green"></span>
                <span className="codebox-lang">
                  {codeSnippets[snippetIndex].language}
                </span>
              </div>
              <pre className="codebox-content">
                <code dangerouslySetInnerHTML={{ __html: typedHtml }} />
                <span
                  className="code-cursor"
                  style={{ opacity: isTyping ? 1 : 0 }}
                >
                  |
                </span>
              </pre>
            </div>

            <div className="hero-social">
              <span className="social-label">Follow me on:</span>
              <div className="social-links">
                <a
                  href="https://github.com/priyam-02"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  aria-label="GitHub"
                >
                  <i className="fab fa-github"></i>
                </a>
                <a
                  href="https://www.linkedin.com/in/priyamshahh/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  aria-label="LinkedIn"
                >
                  <i className="fab fa-linkedin"></i>
                </a>
                <a
                  href="mailto:priyamshah22@gmail.com"
                  className="social-link"
                  aria-label="Email"
                >
                  <i className="fas fa-envelope"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Scroll Indicator with subtle bounce */}
      <motion.div
        className="scroll-indicator"
        initial={{ opacity: 0, y: -20 }}
        animate={{
          opacity: 1,
          y: [0, 8, 0],
        }}
        transition={{
          opacity: { duration: 0.6, delay: 1.5 },
          y: {
            duration: 2,
            delay: 2,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut"
          }
        }}
      >
        <div className="scroll-line"></div>
        <span className="scroll-text">Scroll down</span>
      </motion.div>
    </motion.section>
  );
};

export default Hero;
