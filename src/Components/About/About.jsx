import "./About.css";
import profile_img from "../../assets/profile_img7.svg";
import PropTypes from "prop-types";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

// Circular Progress Bar component
const CircularProgressBar = ({ percentage, skill, icon }) => (
  <div
    className="circular-skill"
    role="progressbar"
    aria-label={`${skill} skill level: ${percentage}%`}
    aria-valuenow={percentage}
    aria-valuemin="0"
    aria-valuemax="100"
    aria-hidden="true"
  >
    <svg
      className="circular-progress"
      width="100"
      height="100"
      viewBox="0 0 100 100"
    >
      <circle
        className="circular-bg"
        cx="50"
        cy="50"
        r="45"
        strokeWidth="10"
        fill="none"
      />
      <circle
        className="circular-bar"
        cx="50"
        cy="50"
        r="45"
        strokeWidth="10"
        fill="none"
        strokeDasharray={2 * Math.PI * 45}
        strokeDashoffset={2 * Math.PI * 45 * (1 - percentage / 100)}
      />
      <text x="50" y="55" textAnchor="middle" className="circular-text">
        {percentage}%
      </text>
    </svg>
    <div className="circular-label">
      {icon && <i className={icon}></i>} {skill}
    </div>
  </div>
);

CircularProgressBar.propTypes = {
  percentage: PropTypes.number.isRequired,
  skill: PropTypes.string.isRequired,
  icon: PropTypes.string,
};

const About = () => {
  const aboutRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: aboutRef,
    offset: ["start end", "end start"],
  });

  // Parallax transforms
  const imageY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  // Remove other parallax transforms

  return (
    <section id="about" className="about section" ref={aboutRef}>
      {/* Background Effects - static */}
      <div className="about-background">
        <div className="about-gradient gradient-1"></div>
        <div className="about-gradient gradient-2"></div>
        <div className="about-dots">
          <div className="dot dot-1"></div>
          <div className="dot dot-2"></div>
          <div className="dot dot-3"></div>
          <div className="dot dot-4"></div>
          <div className="dot dot-5"></div>
        </div>
      </div>

      <div className="container">
        <h2 className="section-title">
          About <span className="title-accent">Me</span>
        </h2>
        <p className="section-subtitle">
          Get to know me better and understand my journey in the world of
          technology
        </p>

        <div className="about-content">
          {/* About Image with Parallax */}
          <motion.div
            className="about-image"
            style={{ y: imageY }}
            transition={{ type: "spring", stiffness: 80, damping: 20 }}
          >
            <div className="image-wrapper">
              <img
                src={profile_img}
                alt="Priyam Shah"
                role="img"
                aria-label="Priyam Shah professional headshot"
              />
              <div className="image-background"></div>

              {/* Elegant Border Animation */}
              <div className="image-border-animation">
                <div className="border-line border-line-1"></div>
                <div className="border-line border-line-2"></div>
                <div className="border-line border-line-3"></div>
                <div className="border-line border-line-4"></div>
              </div>
            </div>
          </motion.div>

          {/* About Text - static */}
          <div className="about-text">
            <div className="about-intro">
              <h3>
                Software Developer{" "}
                <span className="title-accent">| AI & LLM Enthusiast </span>
              </h3>
              <p>
                I’m a Software Developer with a strong foundation in full-stack
                development and a growing focus on AI and large language models
                (LLMs). My journey began with building web applications using
                technologies like React, Node.js, and MongoDB—but recently, I’ve
                been diving deeper into the AI space, exploring how LLMs can be
                applied to solve real-world problems.
              </p>
              <p>
                I recently completed my Master&apos;s in Computer Science at the
                University of North Carolina at Charlotte with a 4.0 GPA, where
                I specialized in LLMs, software engineering, and machine
                learning. From building production-ready platforms to developing
                an LLM benchmarking framework, I enjoy bridging the gap between
                robust engineering and intelligent systems.
              </p>
            </div>
          </div>
        </div>

        {/* Technical Skills - Circular Progress Bars */}
        <div className="about-skills">
          <h3>Technical Skills</h3>
          <div className="circular-skills-row">
            <CircularProgressBar
              percentage={95}
              skill="Python"
              icon="fab fa-python"
            />{" "}
            <CircularProgressBar
              percentage={88}
              skill="FastAPI"
              icon="fa-solid fa-bolt-lightning"
            />
            <CircularProgressBar
              percentage={87}
              skill="Langchain"
              icon="fa-solid fa-link"
            />
            <CircularProgressBar
              percentage={86}
              skill="Ollama"
              icon="fa-solid fa-brain"
            />
            <CircularProgressBar
              percentage={85}
              skill="Docker"
              icon="fa-brands fa-docker"
            />
            <CircularProgressBar
              percentage={84}
              skill="Prompt Engineering"
              icon="fa-solid fa-terminal"
            />
            <CircularProgressBar
              percentage={80}
              skill="PostgreSQL / SQLite"
              icon="fa-solid fa-database"
            />
          </div>
          <div className="circular-skills-row">
            <CircularProgressBar
              percentage={90}
              skill="React.js"
              icon="fab fa-react"
            />
            <CircularProgressBar
              percentage={85}
              skill="Node.js"
              icon="fab fa-node"
            />
            <CircularProgressBar
              percentage={80}
              skill="Express"
              icon="fab fa-node-js"
            />
            <CircularProgressBar
              percentage={75}
              skill="MongoDB"
              icon="fas fa-database"
            />
            <CircularProgressBar
              percentage={95}
              skill="JavaScript"
              icon="fab fa-js"
            />
            <CircularProgressBar
              percentage={85}
              skill="Git"
              icon="fab fa-git-alt"
            />
          </div>
        </div>

        <div className="about-section-spacer"></div>

        <div className="about-experience-timeline">
          <h4>Publications</h4>
          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <span className="timeline-year">
                  40th IEEE/ACM International Conference on Automated Software
                  Engineering (ASE ’25)
                </span>
                <h5>
                  {" "}
                  Polyglot: Benchmarking Code Translation with LLMs via an
                  Extensible Framework
                </h5>
                <br></br>
                <p>
                  Marco Vieira, Priyam Ashish Shah, Bhavain Shah, and Rrezarta
                  Krasniqi. 2025. Polyglot: An Extensible Framework to Benchmark
                  Code Translation with LLMs. In Proceedings of the 40th
                  IEEE/ACM International Conference on Automated Software
                  Engineering (ASE ’25). Accepted / To appear, Nov 2025.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Vertical Spacer between sections */}
        <div className="about-section-spacer"></div>

        {/* Professional Experience - Timeline Layout */}
        <div className="about-experience-timeline">
          <h4>Professional Experience</h4>
          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <span className="timeline-year">January 2025 – Current</span>
                <h5>Software Developer</h5>
                <div className="timeline-company">Avnet</div>
                <p>
                  Engineered scalable enterprise dashboards with React.js and
                  Node.js, reducing API response time by 42%, cutting CI/CD
                  deployment from 45 to under 10 minutes, and ensuring secure,
                  reliable releases through optimized REST APIs, JWT
                  authentication, and 95% test coverage.
                </p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <span className="timeline-year">January 2025 – June 2025</span>
                <h5>LLM Research Engineer</h5>
                <div className="timeline-company">UNC Charlotte</div>
                <p>
                  Built Polyglot, an automated benchmarking framework evaluating
                  LLM-based C-to-Java/Python/Rust code translation across 56k+
                  trials, integrating prompt strategies and runtime analysis.
                </p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <span className="timeline-year">January 2022 – June 2023</span>
                <h5>Software Developer</h5>
                <div className="timeline-company">Infosys</div>
                <p>
                  Built interactive UIs and Django REST APIs that reduced
                  front-end bugs by 27% and endpoint failures by 30%, secured
                  authentication with JWT, validated integrations with 100+ API
                  tests, and delivered features on time through Agile
                  collaboration.
                </p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <span className="timeline-year">June 2021 – January 2022</span>
                <h5>Software Developer Intern</h5>
                <div className="timeline-company">Infosys</div>
                <p>
                  Streamlined React front-end with reusable components,
                  integrated secure JWT auth via Express APIs, and simulated
                  Docker pipelines to accelerate QA testing.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
