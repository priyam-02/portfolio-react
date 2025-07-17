import "./About.css";
import profile_img from "../../assets/profile_img7.svg";
import PropTypes from "prop-types";

// Circular Progress Bar component
const CircularProgressBar = ({ percentage, skill, icon }) => (
  <div className="circular-skill">
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
  return (
    <section id="about" className="about section">
      {/* Background Effects */}
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
          {/* About Image */}
          <div className="about-image">
            <div className="image-wrapper">
              <img src={profile_img} alt="Priyam Shah" />
              <div className="image-background"></div>

              {/* Elegant Border Animation */}
              <div className="image-border-animation">
                <div className="border-line border-line-1"></div>
                <div className="border-line border-line-2"></div>
                <div className="border-line border-line-3"></div>
                <div className="border-line border-line-4"></div>
              </div>
            </div>
          </div>

          {/* About Text */}
          <div className="about-text">
            <div className="about-intro">
              <h3>Software Developer | AI & LLM Enthusiast</h3>
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

        {/* Vertical Spacer between sections */}
        <div className="about-section-spacer"></div>

        {/* Professional Experience - Timeline Layout */}
        <div className="about-experience-timeline">
          <h4>Professional Experience</h4>
          <div className="timeline">
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
                <span className="timeline-year">January 2025 – May 2025</span>
                <h5>Graduate Teaching Assistant</h5>
                <div className="timeline-company">UNC Charlotte</div>
                <p>
                  Mentored 50+ graduate students in reinforcement learning,
                  providing hands-on support for TensorFlow/PyTorch projects and
                  improving model performance through technical feedback.
                </p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <span className="timeline-year">March 2025 – May 2025</span>
                <h5>Software Developer Intern</h5>
                <div className="timeline-company">StarterYou</div>
                <p>
                  Engineered key SaaS features for a job portal using React,
                  Node.js, and MongoDB. Automated CI/CD with Docker & GitHub
                  Actions, and supported AWS-to-Azure migration with Terraform.
                </p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <span className="timeline-year">June 2024 – August 2024</span>
                <h5>Software Developer Intern</h5>
                <div className="timeline-company">CyberNative Technologies</div>
                <p>
                  Streamlined React front-end with reusable components,
                  integrated secure JWT auth via Express APIs, and simulated
                  Docker pipelines to accelerate QA testing.
                </p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <span className="timeline-year">January 2023 – April 2023</span>
                <h5>Web Development Intern</h5>
                <div className="timeline-company">Sparks to Ideas</div>
                <p>
                  Built a responsive restaurant web platform with optimized
                  Django APIs, reducing latency by 20%, and integrated real-time
                  booking and payment solutions.
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
