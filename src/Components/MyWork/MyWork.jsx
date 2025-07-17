import { useState } from "react";
import "./MyWork.css";
import mywork_data from "../../assets/mywork_data.js";

const MyWork = () => {
  const [visibleProjects, setVisibleProjects] = useState(9);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleShowMore = () => {
    setVisibleProjects(mywork_data.length);
    setIsExpanded(true);
  };

  const handleShowLess = () => {
    setVisibleProjects(6);
    setIsExpanded(false);
  };

  return (
    <section className="mywork-section" id="mywork">
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
        {/* Section Header */}
        <div className="section-header">
          <div className="header-content">
            <h2 className="section-title">
              Featured <span className="title-accent">Projects</span>
            </h2>
            <p className="section-subtitle">
              A curated collection of my finest work, showcasing innovation and
              technical excellence
            </p>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="projects-masonry">
          {mywork_data.slice(0, visibleProjects).map((work, index) => (
            <div
              key={index}
              className={`project-card ${index % 3 === 0 ? "tall" : index % 3 === 1 ? "wide" : "standard"}`}
            >
              <div className="card-background">
                <div className="card-gradient"></div>
                <div className="card-pattern"></div>
              </div>

              <div className="project-image">
                <img src={work.w_img} alt={work.w_name} />
                <div className="image-overlay">
                  <div className="overlay-content">
                    <div className="project-meta">
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
                    </div>
                  </div>
                </div>
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
            </div>
          ))}
        </div>

        {/* Show More/Less Button */}
        <div className="show-more-container">
          {!isExpanded ? (
            <button
              className="elegant-btn show-more-btn"
              onClick={handleShowMore}
            >
              <span className="btn-text">Explore More</span>
              <div className="btn-icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M7 17l9.2-9.2M17 17V7H7" />
                </svg>
              </div>
            </button>
          ) : (
            <button
              className="elegant-btn show-less-btn"
              onClick={handleShowLess}
            >
              <span className="btn-text">Show Less</span>
              <div className="btn-icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M17 7l-9.2 9.2M7 7v10h10" />
                </svg>
              </div>
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default MyWork;
