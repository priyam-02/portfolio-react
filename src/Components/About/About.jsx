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
                Founding Engineer{" "}
                <span className="title-accent">
                  | 2x Published AI Researcher{" "}
                </span>
              </h3>
              <p>
                I am a Full-Stack Engineer with 2+ years of experience and a
                Master’s in CS (4.0 GPA). I specialize in bridging the gap
                between scalable application architecture and applied AI.
                Currently, I am building a 0-to-1 geospatial social platform
                that helps users connect with real-time events happening in
                their local neighborhood using React Native. At the same time, I
                continue to advance the field of LLM benchmarking through
                published research at top-tier conferences like ASE’25 and
                SANER’26.
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
              percentage={60}
              skill="React Native"
              icon="fab fa-react"
            />
            <CircularProgressBar
              percentage={75}
              skill="MongoDB"
              icon="fas fa-database"
            />
            <CircularProgressBar
              percentage={80}
              skill="PostgreSQL / SQLite"
              icon="fa-solid fa-database"
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
                  40th IEEE/ACM International Conference (ASE ’25)
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
                  Code Translation with LLMs. Presented at the 40th IEEE/ACM
                  International Conference on Automated Software Engineering
                  (ASE ’25).
                </p>
              </div>
            </div>
          </div>
          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <span className="timeline-year">
                  33rd IEEE International Conference (SANER ’26)
                </span>
                <h5>
                  {" "}
                  TestForge: A Benchmarking Framework for LLM-Based Test Case
                  Generation
                </h5>
                <br></br>
                <p>
                  Marco Vieira, Bhavain Shah, Priyam Ashish Shah, and Vineet
                  Khadloya. 2026. TestForge: A Benchmarking Framework for
                  LLM-Based Test Case Generation. Accepted for presentation at
                  the 33rd IEEE International Conference on Software Analysis,
                  Evolution and Reengineering (SANER ’26).
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
