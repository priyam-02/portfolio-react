import "./Experience.css";
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { useRef } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { springs } from '../../utils/scrollAnimations';
import PropTypes from 'prop-types';

// TimelineItem component to use hooks properly
const TimelineItem = ({ item }) => {
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
        <span className="timeline-year">{item.year}</span>
        <h5>{item.title}</h5>
        <div className="timeline-company">{item.company}</div>
        <p>{item.description}</p>
      </motion.div>
    </div>
  );
};

TimelineItem.propTypes = {
  item: PropTypes.shape({
    year: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    company: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
  }).isRequired,
  index: PropTypes.number.isRequired
};

const Experience = () => {
  const sectionRef = useRef(null);
  const timelineRef = useRef(null);
  const reducedMotion = useReducedMotion();

  // Scroll tracking for timeline drawing effect
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end center"]
  });

  const timelineScale = useSpring(
    useTransform(scrollYProgress, [0, 0.9], [0, 1]),
    springs.liquid
  );

  // Timeline data
  const timelineItems = [
    {
      year: "May 2025 – Current",
      title: "Founding Engineer (Mobile & Product)",
      company: "Jorts",
      description: "Leading the 0-to-1 build of a geospatial social app, taking it from initial wireframes to a full React Native implementation. Handling core engineering tasks like secure authentication, location-based data fetching, and setting up clean state management patterns to keep the app fast and responsive."
    },
    {
      year: "March 2025 – May 2025",
      title: "Software Developer Intern",
      company: "StarterYou",
      description: "Delivered full-stack features for job and rideshare platforms, building complex components like a geospatial matching engine and a Socket.IO chat system. Improved application performance through lazy loading, raised test coverage to over 85%, and supported a cloud migration from AWS to Azure."
    },
    {
      year: "January 2025 – June 2025",
      title: "LLM Research Engineer",
      company: "UNC Charlotte",
      description: "Developed extensible frameworks to benchmark how LLMs handle code translation and unit test generation. Executed over 100,000+ deterministic trials converting 250+ C programs into Java, Python, and Rust across 7 models to assess translation quality. Additionally, implemented an asynchronous pipeline using Celery and LangChain to generate and validate 17,000 JUnit test cases across different prompting techniques."
    },
    {
      year: "June 2021 – June 2023",
      title: "Software Developer",
      company: "Cybernative",
      description: "Built backend services including an inventory sync engine that lowered API failures by 30%. Implemented secure authentication flows and designed a real-time dashboard to track issues, which improved error resolution speeds by 27%. Maintained strict code quality and met delivery goals in an Agile environment."
    }
  ];

  return (
    <motion.section id="experience" className="experience section" ref={sectionRef}>
      {/* Background Effects */}
      <div className="experience-background">
        <div className="experience-gradient gradient-1"></div>
        <div className="experience-gradient gradient-2"></div>
      </div>

      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-200px' }}
          transition={{ duration: 0.4 }}
        >
          My <span className="title-accent">Experience</span>
        </motion.h2>
        <motion.p
          className="section-subtitle"
          initial={{ opacity: 0, y: -15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-200px' }}
          transition={{ duration: 0.4 }}
        >
          A journey through my professional career in software engineering and
          research
        </motion.p>

        {/* Professional Experience Timeline */}
        <div className="experience-timeline">
          <div className="timeline" ref={timelineRef}>
            {/* Animated timeline line */}
            <motion.div
              className="timeline-line"
              style={{
                scaleY: reducedMotion ? 1 : timelineScale,
                transformOrigin: 'top'
              }}
            />

            {timelineItems.map((item, index) => (
              <TimelineItem
                key={index}
                item={item}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Experience;
