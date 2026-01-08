import "./Milestones.css";
import Milestones_Data from "../../assets/milestones_data";
import { motion } from 'motion/react';
import PropTypes from 'prop-types';

// MilestoneCard component to use hooks properly
const MilestoneCard = ({ milestone, index }) => {
  // Cascade animation with rotation
  const cascadeVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.95,
      rotateZ: index % 2 === 0 ? -3 : 3
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateZ: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.25, 1, 0.5, 1]
      }
    }
  };

  const iconVariants = {
    hidden: { scale: 0, rotateZ: -90 },
    visible: {
      scale: 1,
      rotateZ: 0,
      transition: {
        duration: 0.4,
        delay: index * 0.1 + 0.15,
        ease: [0.34, 1.56, 0.64, 1]
      }
    }
  };

  const numberVariants = {
    hidden: { scale: 0 },
    visible: {
      scale: 1,
      transition: {
        duration: 0.4,
        delay: index * 0.1 + 0.2,
        ease: [0.34, 1.56, 0.64, 1]
      }
    }
  };

  return (
    <motion.div
      className="milestone-card"
      initial="hidden"
      whileInView="visible"
      variants={cascadeVariants}
      viewport={{ once: true, margin: '0px', amount: 0.05 }}
      whileHover={{
        y: -12,
        scale: 1.05,
        transition: { duration: 0.15, ease: "easeOut" }
      }}
    >
      <motion.div
        className="milestone-icon"
        variants={iconVariants}
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
        variants={numberVariants}
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
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px' }}
          transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
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
