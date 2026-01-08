import "./About.css";
import profile_img from "../../assets/profile_img7.svg";
import PropTypes from "prop-types";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { useRef } from "react";
import { springs } from "../../utils/scrollAnimations";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import TechStackMarquee from "../TechStackMarquee/TechStackMarquee";

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
        viewport={{ once: true, margin: "0px", amount: 0.05 }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        whileHover={{
          scale: 1.03,
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
          transition: { duration: 0.15 },
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
    description: PropTypes.string.isRequired,
  }).isRequired,
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
    offset: ["start center", "end center"],
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

        {/* Technical Skills - Premium Marquee Strip */}
        <div className="about-skills">
          <TechStackMarquee />
        </div>

        <div className="about-experience-timeline" ref={publicationsRef}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h4>Publications</h4>
            <p>Research contributions advancing AI and software engineering</p>
          </motion.div>
          <div className="timeline">
            {/* Animated timeline line */}
            <motion.div
              className="timeline-line"
              style={{
                scaleY: reducedMotion ? 1 : publicationsScale,
                transformOrigin: "top",
              }}
            />

            {[
              {
                conference: "40th IEEE/ACM International Conference (ASE '25)",
                title:
                  "Polyglot: Benchmarking Code Translation with LLMs via an Extensible Framework",
                description:
                  "Marco Vieira, Priyam Ashish Shah, Bhavain Shah, and Rrezarta Krasniqi. 2025. Polyglot: An Extensible Framework to Benchmark Code Translation with LLMs. Presented at the 40th IEEE/ACM International Conference on Automated Software Engineering (ASE '25).",
              },
              {
                conference: "33rd IEEE International Conference (SANER '26)",
                title:
                  "TestForge: A Benchmarking Framework for LLM-Based Test Case Generation",
                description:
                  "Marco Vieira, Bhavain Shah, Priyam Ashish Shah, and Vineet Khadloya. 2026. TestForge: A Benchmarking Framework for LLM-Based Test Case Generation. Accepted for presentation at the 33rd IEEE International Conference on Software Analysis, Evolution and Reengineering (SANER '26).",
              },
            ].map((publication, index) => (
              <PublicationItem key={index} publication={publication} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
