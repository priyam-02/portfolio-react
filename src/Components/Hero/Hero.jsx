import "./Hero.css";
import profile_img from "../../assets/profile_img4.svg";
import AnchorLink from "react-anchor-link-smooth-scroll";
import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

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
  const typingTimeout = useRef();
  const switchTimeout = useRef();
  const dropdownRef = useRef();
  const heroRef = useRef(null);
  // Parallax for profile image
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 80]);

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
    <section id="home" className="hero section" ref={heroRef}>
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
        <div className="hero-content">
          {/* Left Column - Text Content */}
          <div className="hero-text">
            {/* <div className="hero-badge">
              <span className="badge-icon">👋</span>
              <span>Welcome to my portfolio</span>
            </div> */}

            <h1 className="hero-title">
              Hi, I&apos;m <span className="gradient-text">Priyam Shah</span>
              <br />
              <span className="hero-subtitle">
                Full-Stack Engineer | AI Researcher
              </span>
            </h1>

            {/* Custom Dropdown for Language Selection */}
            <div className="hero-dropdown-row" ref={dropdownRef}>
              <button
                className={`hero-snippet-select custom ${dropdownOpen ? "open" : ""}`}
                aria-haspopup="listbox"
                aria-expanded={dropdownOpen}
                aria-label="Select code language"
                tabIndex={0}
                onClick={handleDropdownToggle}
                onKeyDown={handleDropdownKeyDown}
                type="button"
              >
                {codeSnippets[snippetIndex].language}
                <span className="dropdown-arrow" aria-hidden="true" />
              </button>
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

            <div className="hero-stats">
              <div className="stat">
                <span className="stat-number">2+</span>
                <span className="stat-label">Years Experience</span>
              </div>
              <div className="stat">
                <span className="stat-number">10+</span>
                <span className="stat-label">Projects Completed</span>
              </div>
              <div className="stat">
                <span className="stat-number">3+</span>
                <span className="stat-label">Technologies</span>
              </div>
            </div>

            <div className="hero-actions">
              <AnchorLink className="anchor-link" offset={80} href="#contact">
                <button className="btn btn-primary">
                  <i className="fas fa-paper-plane"></i>
                  Get In Touch
                </button>
              </AnchorLink>

              <a
                href="https://drive.google.com/file/d/1rc-0tW_EeqmwNEf0ufJD3-PA24rawR2R/view?usp=drive_link"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
              >
                <i className="fas fa-download"></i>
                Download Resume
              </a>
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

          {/* Right Column - Profile Image */}
          <div className="hero-image">
            <div className="image-container">
              {/* Parallax Profile Image */}
              <motion.img
                src={profile_img}
                alt="Profile"
                className="hero-profile-img"
                style={{ y }}
                loading="eager"
                width={320}
                height={320}
                role="img"
                aria-label="Priyam Shah profile image"
                transition={{ type: "spring", stiffness: 80, damping: 20 }}
              />
              <div className="image-background"></div>

              {/* Floating Tech Cards */}
              <div className="floating-card card-1">
                <i className="fab fa-python"></i>
                <span>Python</span>
              </div>
              <div className="floating-card card-2">
                <i className="fas fa-bolt-lightning"></i>
                <span>FastAPI</span>
              </div>
              <div className="floating-card card-3">
                <i className="fas fa-brain"></i>
                <span>Ollama</span>
              </div>
              <div className="floating-card card-4">
                <i className="fas fa-chain"></i>
                <span>Langchain</span>
              </div>
              <div className="floating-card card-5">
                <i className="fab fa-docker"></i>
                <span>Docker</span>
              </div>
              <div className="floating-card card-6">
                <i className="fab fa-js"></i>
                <span>React.js</span>
              </div>
              <div className="floating-card card-7">
                <i className="fab fa-js"></i>
                <span>Next.js</span>
              </div>
              <div className="floating-card card-8">
                <i className="fas fa-server"></i>
                <span>Node.js</span>
              </div>
              <div className="floating-card card-9">
                <i className="fas fa-database"></i>
                <span>MongoDB</span>
              </div>

              {/* Additional Floating Elements */}
              <div className="floating-card card-10">
                <i className="fab fa-js"></i>
                <span>Express</span>
              </div>
              <div className="floating-card card-11">
                <i className="fab fa-css3-alt"></i>
                <span>CSS3</span>
              </div>
              <div className="floating-card card-12">
                <i className="fab fa-html5"></i>
                <span>HTML5</span>
              </div>

              {/* Animated Rings */}
              <div className="animated-ring ring-1"></div>
              <div className="animated-ring ring-2"></div>
              <div className="animated-ring ring-3"></div>

              {/* Glow Effects */}
              <div className="glow-effect glow-1"></div>
              <div className="glow-effect glow-2"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="scroll-indicator">
        <div className="scroll-line"></div>
        <span className="scroll-text">Scroll down</span>
      </div>
    </section>
  );
};

export default Hero;
