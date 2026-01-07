import "./About.css";
import profile_img from "../../assets/profile_img7.svg";
import PropTypes from "prop-types";
import { motion, useScroll, useTransform, useSpring, useInView } from "motion/react";
import { useRef, useEffect, useState } from "react";
import { springs } from '../../utils/scrollAnimations';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const CircularProgressBar = ({ percentage, skill, icon, index = 0 }) => {
  const circumference = 2 * Math.PI * 45;
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-200px', amount: 0.5 });
  const reducedMotion = useReducedMotion();

  // Safari-compatible state-based animation
  const [targetPercentage, setTargetPercentage] = useState(0);

  useEffect(() => {
    if (inView) {
      // Tighter stagger for premium flow
      const delay = reducedMotion ? 0 : index * 80;
      const timeoutId = setTimeout(() => {
        setTargetPercentage(percentage);
      }, delay);
      return () => clearTimeout(timeoutId);
    }
  }, [inView, percentage, index, reducedMotion]);

  // Calculate stroke-dashoffset
  const targetOffset = circumference - (targetPercentage / 100) * circumference;

  return (
    <motion.div
      ref={ref}
      className="circular-skill"
      whileHover={reducedMotion ? {} : {
        scale: 1.05,
        rotate: 5,
        filter: "drop-shadow(0 0 10px rgba(144, 180, 209, 0.3))",
        transition: { duration: 0.2 }
      }}
    >
      <svg className="circular-progress" width="100" height="100" viewBox="0 0 100 100">
        <circle
          className="circular-bg"
          cx="50"
          cy="50"
          r="45"
        />
        <motion.circle
          className="circular-bar"
          cx="50"
          cy="50"
          r="45"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: targetOffset }}
          transition={reducedMotion
            ? { duration: 0.01 }
            : {
                type: "spring",
                stiffness: 90,
                damping: 26,
                mass: 1.3
              }
          }
        />
        <text x="50" y="55" textAnchor="middle" className="circular-text">
          <motion.tspan
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {Math.round(targetPercentage)}
          </motion.tspan>%
        </text>
      </svg>
      <div className="circular-label">
        {icon && <i className={icon}></i>} {skill}
      </div>
    </motion.div>
  );
};

CircularProgressBar.propTypes = {
  percentage: PropTypes.number.isRequired,
  skill: PropTypes.string.isRequired,
  icon: PropTypes.string,
  index: PropTypes.number
};

// PublicationItem component for timeline animation
const PublicationItem = ({ publication }) => {
  return (
    <div className="timeline-item">
      {/* Animated dot with pulse */}
      <motion.div
        className="timeline-dot"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
      >
        <motion.div
          className="dot-pulse"
          animate={{
            scale: [1, 1.8, 1],
            opacity: [0.6, 0, 0.6],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>

      {/* Animated content card */}
      <motion.div
        className="timeline-content"
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: '0px', amount: 0.1 }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        whileHover={{
          scale: 1.03,
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
          transition: { duration: 0.15 }
        }}
      >
        <span className="timeline-year">{publication.conference}</span>
        <h5>{publication.title}</h5>
        <br />
        <p>{publication.description}</p>
      </motion.div>
    </div>
  );
};

PublicationItem.propTypes = {
  publication: PropTypes.shape({
    conference: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
  }).isRequired
};

const About = () => {
  const aboutRef = useRef(null);
  const publicationsRef = useRef(null);
  const reducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: aboutRef,
    offset: ["start end", "end start"],
  });

  // Scroll tracking for publications timeline
  const { scrollYProgress: publicationsProgress } = useScroll({
    target: publicationsRef,
    offset: ["start center", "end center"]
  });

  const publicationsScale = useSpring(
    useTransform(publicationsProgress, [0, 0.9], [0, 1]),
    springs.liquid
  );

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

        {/* Technical Skills - Circular Progress Bars with Animation */}
        <motion.div
          className="about-skills"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
        >
          <h3>Technical Skills</h3>
          <div className="circular-skills-row">
            <CircularProgressBar
              percentage={95}
              skill="Python"
              icon="fab fa-python"
              index={0}
            />
            <CircularProgressBar
              percentage={88}
              skill="FastAPI"
              icon="fa-solid fa-bolt-lightning"
              index={1}
            />
            <CircularProgressBar
              percentage={87}
              skill="Langchain"
              icon="fa-solid fa-link"
              index={2}
            />
            <CircularProgressBar
              percentage={86}
              skill="Ollama"
              icon="fa-solid fa-brain"
              index={3}
            />
            <CircularProgressBar
              percentage={85}
              skill="Docker"
              icon="fa-brands fa-docker"
              index={4}
            />
            <CircularProgressBar
              percentage={84}
              skill="Prompt Engineering"
              icon="fa-solid fa-terminal"
              index={5}
            />
          </div>
          <div className="circular-skills-row">
            <CircularProgressBar
              percentage={90}
              skill="React.js"
              icon="fab fa-react"
              index={6}
            />
            <CircularProgressBar
              percentage={85}
              skill="Node.js"
              icon="fab fa-node"
              index={7}
            />
            <CircularProgressBar
              percentage={80}
              skill="Express"
              icon="fab fa-node-js"
              index={8}
            />
            <CircularProgressBar
              percentage={60}
              skill="React Native"
              icon="fab fa-react"
              index={9}
            />
            <CircularProgressBar
              percentage={75}
              skill="MongoDB"
              icon="fas fa-database"
              index={10}
            />
            <CircularProgressBar
              percentage={80}
              skill="PostgreSQL / SQLite"
              icon="fa-solid fa-database"
              index={11}
            />
            <CircularProgressBar
              percentage={95}
              skill="JavaScript"
              icon="fab fa-js"
              index={12}
            />
            <CircularProgressBar
              percentage={85}
              skill="Git"
              icon="fab fa-git-alt"
              index={13}
            />
          </div>
        </motion.div>

        <div className="about-section-spacer"></div>

        <div className="about-experience-timeline" ref={publicationsRef}>
          <motion.h4
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Publications
          </motion.h4>
          <div className="timeline">
            {/* Animated timeline line */}
            <motion.div
              className="timeline-line"
              style={{
                scaleY: reducedMotion ? 1 : publicationsScale,
                transformOrigin: 'top'
              }}
            />

            {[
              {
                conference: "40th IEEE/ACM International Conference (ASE '25)",
                title: "Polyglot: Benchmarking Code Translation with LLMs via an Extensible Framework",
                description: "Marco Vieira, Priyam Ashish Shah, Bhavain Shah, and Rrezarta Krasniqi. 2025. Polyglot: An Extensible Framework to Benchmark Code Translation with LLMs. Presented at the 40th IEEE/ACM International Conference on Automated Software Engineering (ASE '25)."
              },
              {
                conference: "33rd IEEE International Conference (SANER '26)",
                title: "TestForge: A Benchmarking Framework for LLM-Based Test Case Generation",
                description: "Marco Vieira, Bhavain Shah, Priyam Ashish Shah, and Vineet Khadloya. 2026. TestForge: A Benchmarking Framework for LLM-Based Test Case Generation. Accepted for presentation at the 33rd IEEE International Conference on Software Analysis, Evolution and Reengineering (SANER '26)."
              }
            ].map((publication, index) => (
              <PublicationItem
                key={index}
                publication={publication}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default About;
