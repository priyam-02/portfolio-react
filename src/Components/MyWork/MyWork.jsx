import { motion } from "framer-motion";
import PropTypes from "prop-types";
import "./MyWork.css";
import mywork_data from "../../assets/mywork_data.js";
import { useReducedMotion } from '../../hooks/useReducedMotion';

// ProjectCard component with Framer Motion animations
const ProjectCard = ({ work, index, reducedMotion }) => {
  const cardVariants = {
    hidden: {
      opacity: 0,
      y: reducedMotion ? 0 : 30,
      scale: reducedMotion ? 1 : 0.98
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: reducedMotion ? 0 : 0.5,
        delay: reducedMotion ? 0 : Math.min(index * 0.08, 0.4),
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  return (
    <motion.div
      className={`project-card ${index % 3 === 0 ? "tall" : index % 3 === 1 ? "wide" : "standard"}`}
      initial="hidden"
      whileInView="visible"
      variants={cardVariants}
      viewport={{ once: true, margin: '0px', amount: 0.1 }}
      whileHover={reducedMotion ? {} : {
        y: -12,
        scale: 1.02,
        transition: { duration: 0.15, ease: "easeOut" }
      }}
    >
      <div className="card-background">
        <div className="card-gradient"></div>
        <div className="card-pattern"></div>
      </div>

      <div className="project-image">
        <img src={work.w_img} alt={work.w_name} loading="lazy" />
        <motion.div
          className="image-overlay"
          initial={{ opacity: reducedMotion ? 1 : 0 }}
          whileHover={reducedMotion ? {} : { opacity: 1 }}
          transition={{ duration: reducedMotion ? 0 : 0.3, ease: [0.4, 0, 0.2, 1] }}
        >
          <motion.div
            className="overlay-content"
            initial="hidden"
            whileHover={reducedMotion ? "hidden" : "visible"}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: reducedMotion ? 0 : 0.05 } }
            }}
          >
            <motion.div
              className="project-meta"
              variants={{
                hidden: { opacity: reducedMotion ? 1 : 0, x: reducedMotion ? 0 : -10 },
                visible: { opacity: 1, x: 0 }
              }}
            >
              <span className="project-number">
                {(index + 1).toString().padStart(2, "0")}
              </span>
              <span className="project-category">
                {work.w_tags.includes("React")
                  ? "Web App"
                  : work.w_tags.includes("Flutter")
                    ? "Mobile App"
                    : work.w_tags.includes("GameMaker")
                      ? "Game"
                      : work.w_tags.includes("Ollama")
                        ? "LLM App"
                        : work.w_tags.includes("LangChain")
                          ? "LLM App"
                          : work.w_tags.includes("pdfplumber")
                            ? "PDF Summarizer"
                            : "Web App"}
              </span>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      <div className="project-content">
        <div className="project-header">
          <h3 className="project-title">{work.w_name}</h3>
          <div className="project-links">
            {work.w_live && (
              <a
                href={work.w_live}
                target="_blank"
                rel="noopener noreferrer"
                className="project-link live-link"
                onClick={(e) => e.stopPropagation()}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15,3 21,3 21,9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </a>
            )}
            <a
              href={work.w_link}
              target="_blank"
              rel="noopener noreferrer"
              className="project-link code-link"
              onClick={(e) => e.stopPropagation()}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </a>
          </div>
        </div>

        <p className="project-description">{work.w_desc}</p>

        <div className="tech-stack">
          {work.w_tags.slice(0, 4).map((tag, tagIndex) => (
            <span key={tagIndex} className="tech-tag">
              {tag}
            </span>
          ))}
          {work.w_tags.length > 4 && (
            <span className="tech-more">
              +{work.w_tags.length - 4}
              <span className="tech-tooltip">
                {work.w_tags.slice(4).map((tag, tagIndex) => (
                  <span key={tagIndex} className="tech-tag">
                    {tag}
                  </span>
                ))}
              </span>
            </span>
          )}
        </div>
      </div>

      <div className="card-border"></div>
    </motion.div>
  );
};

ProjectCard.propTypes = {
  work: PropTypes.shape({
    w_img: PropTypes.string.isRequired,
    w_name: PropTypes.string.isRequired,
    w_desc: PropTypes.string.isRequired,
    w_tags: PropTypes.array.isRequired,
    w_link: PropTypes.string.isRequired,
    w_live: PropTypes.string
  }).isRequired,
  index: PropTypes.number.isRequired,
  reducedMotion: PropTypes.bool.isRequired
};

const MyWork = () => {
  const reducedMotion = useReducedMotion();

  return (
    <section className="mywork-section section" id="mywork">
      {/* Background Elements - static */}
      <div className="background-elements">
        <div className="floating-shape shape-1"></div>
        <div className="floating-shape shape-2"></div>
        <div className="floating-shape shape-3"></div>
      </div>

      {/* Background Particles - static */}
      <div className="particles">
        <div className="particle particle-1"></div>
        <div className="particle particle-2"></div>
        <div className="particle particle-3"></div>
        <div className="particle particle-4"></div>
        <div className="particle particle-5"></div>
        <div className="particle particle-6"></div>
      </div>

      <div className="container">
        {/* Section Header with Animation */}
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-200px' }}
          transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
        >
          <div className="header-content">
            <h2 className="section-title">
              Featured <span className="title-accent">Projects</span>
            </h2>
            <p className="section-subtitle">
              A curated collection of my finest work, showcasing innovation and
              technical excellence
            </p>
          </div>
        </motion.div>

        {/* Projects Grid with Animated Cards */}
        <div className="projects-masonry">
          {mywork_data.map((work, index) => (
            <ProjectCard key={index} work={work} index={index} reducedMotion={reducedMotion} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MyWork;
