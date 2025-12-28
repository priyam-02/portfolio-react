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
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const typingTimeout = useRef();
  const switchTimeout = useRef();
  const dropdownRef = useRef();
  const heroRef = useRef(null);

  // Parallax for profile image (reduced intensity)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 30]);

  // Gradient mesh following cursor
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
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
    <section id="home" className="hero hero-minimalist section" ref={heroRef}>
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

      <div className="container">
        <div className="hero-content hero-content-minimalist">
          {/* Right Sidebar - Profile, Stats, Actions */}
          <div className="hero-sidebar-left">
            {/* Profile Image */}
            <div className="hero-image-minimalist">
              <motion.img
                src={profile_img}
                alt="Priyam Shah"
                className="hero-profile-minimalist"
                style={{ y }}
                loading="eager"
              />
            </div>

            {/* Stats */}
            <div className="hero-stats hero-stats-minimalist">
              <div className="stat stat-minimalist">
                <span className="stat-number stat-number-minimalist">2+</span>
                <span className="stat-label stat-label-minimalist">
                  Years Exp
                </span>
              </div>
              <div className="stat stat-minimalist">
                <span className="stat-number stat-number-minimalist">10+</span>
                <span className="stat-label stat-label-minimalist">
                  Projects
                </span>
              </div>
              <div className="stat stat-minimalist">
                <span className="stat-number stat-number-minimalist">15+</span>
                <span className="stat-label stat-label-minimalist">
                  Technologies
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="hero-actions hero-actions-minimalist">
              <AnchorLink className="anchor-link" offset={80} href="#contact">
                <button className="btn btn-primary btn-primary-minimalist">
                  <i className="fas fa-paper-plane"></i>
                  Get In Touch
                </button>
              </AnchorLink>

              <a
                href="https://drive.google.com/file/d/1rc-0tW_EeqmwNEf0ufJD3-PA24rawR2R/view?usp=drive_link"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary btn-secondary-minimalist"
              >
                <i className="fas fa-download"></i>
                Download Resume
              </a>
            </div>
          </div>

          {/* Main Left Content */}
          <div className="hero-text hero-text-minimalist">
            {/* Bold Typography Hero */}
            <h1 className="hero-title-minimalist">
              <span className="hero-name-large">PRIYAM SHAH</span>
              <span className="hero-role">
                Full-Stack Engineer & AI Researcher
              </span>
            </h1>

            {/* Geometric Accent Line */}
            <div className="geometric-accent-line"></div>

            {/* Greeting Message */}
            <p className="hero-greeting">
              Let&apos;s build something extraordinary!
            </p>

            {/* Technology Pills - iPad Pro Only */}
            <div className="tech-stack-pills-minimalist tech-stack-ipad-pro">
              <span className="tech-pill-minimalist">React</span>
              <span className="tech-pill-minimalist">Node.js</span>
              <span className="tech-pill-minimalist">TypeScript</span>
              <span className="tech-pill-minimalist">Python</span>
              <span className="tech-pill-minimalist">LangChain</span>
              <span className="tech-pill-minimalist">FastAPI</span>
              <span className="tech-pill-minimalist">MongoDB</span>
              <span className="tech-pill-minimalist">PostgreSQL</span>
              <span className="tech-pill-minimalist">Terraform</span>
              <span className="tech-pill-minimalist">Docker</span>
              <span className="tech-pill-minimalist">AWS</span>
              <span className="tech-pill-minimalist">Git</span>
            </div>

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
