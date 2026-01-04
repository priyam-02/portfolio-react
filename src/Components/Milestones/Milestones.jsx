import "./Milestones.css";
import Milestones_Data from "../../assets/milestones_data";
import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import PropTypes from 'prop-types';

// MilestoneCard component to use hooks properly
const MilestoneCard = ({ milestone, index }) => {
  const cardRef = useRef(null);
  const cardInView = useInView(cardRef, {
    once: true,
    margin: '-50px',
    amount: 0.3
  });

  // Cascade animation with rotation
  const cascadeVariants = {
    hidden: {
      opacity: 0,
      y: 60,
      scale: 0.9,
      rotateZ: index % 2 === 0 ? -5 : 5
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateZ: 0,
      transition: {
        duration: 0.7,
        delay: index * 0.15,
        ease: [0.25, 1, 0.5, 1]
      }
    }
  };

  return (
    <motion.div
      ref={cardRef}
      className="milestone-card"
      initial="hidden"
      animate={cardInView ? "visible" : "hidden"}
      variants={cascadeVariants}
      whileHover={{
        y: -12,
        scale: 1.05,
        transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
      }}
    >
      <motion.div
        className="milestone-icon"
        initial={{ scale: 0, rotateZ: -180 }}
        animate={cardInView ? { scale: 1, rotateZ: 0 } : {}}
        transition={{ duration: 0.6, delay: index * 0.15 + 0.2, ease: [0.34, 1.56, 0.64, 1] }}
        whileHover={{
          scale: 1.2,
          rotateZ: 360,
          transition: { duration: 0.5 }
        }}
      >
        <i className="fas fa-star"></i>
      </motion.div>
      <motion.div
        className="milestone-number"
        initial={{ scale: 0 }}
        animate={cardInView ? { scale: 1 } : {}}
        transition={{ duration: 0.5, delay: index * 0.15 + 0.3, ease: [0.34, 1.56, 0.64, 1] }}
      >
        {index + 1}
      </motion.div>
      <h3 className="milestone-title">{milestone.s_name}</h3>
      <p className="milestone-description">{milestone.s_desc}</p>
      <div className="milestone-year">{milestone.s_year}</div>
    </motion.div>
  );
};

MilestoneCard.propTypes = {
  milestone: PropTypes.shape({
    s_name: PropTypes.string.isRequired,
    s_desc: PropTypes.string.isRequired,
    s_year: PropTypes.string.isRequired
  }).isRequired,
  index: PropTypes.number.isRequired
};

const Milestones = () => {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-100px' });

  return (
    <motion.section id="milestones" className="milestones section">
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
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: -40 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
        >
          <h2 className="section-title">
            My <span className="title-accent">Journey</span>
          </h2>
          <p className="section-subtitle">
            A timeline of my academic and professional milestones that have shaped
            my career in technology
          </p>
        </motion.div>

        <div className="milestones-container">
          {Milestones_Data.map((milestone, index) => (
            <MilestoneCard
              key={index}
              milestone={milestone}
              index={index}
            />
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Milestones;
