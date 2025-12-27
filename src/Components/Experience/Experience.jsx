import "./Experience.css";

const Experience = () => {
  return (
    <section id="experience" className="experience section">
      {/* Background Effects */}
      <div className="experience-background">
        <div className="experience-gradient gradient-1"></div>
        <div className="experience-gradient gradient-2"></div>
      </div>

      <div className="container">
        <h2 className="section-title">
          Professional <span className="title-accent">Experience</span>
        </h2>
        <p className="section-subtitle">
          A journey through my professional career in software engineering and research
        </p>

        {/* Professional Experience Timeline */}
        <div className="experience-timeline">
          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <span className="timeline-year">May 2025 – Current</span>
                <h5>Founding Engineer (Mobile & Product)</h5>
                <div className="timeline-company">Jorts</div>
                <p>
                  Leading the 0-to-1 build of a geospatial social app, taking it
                  from initial wireframes to a full React Native implementation.
                  Handling core engineering tasks like secure authentication,
                  location-based data fetching, and setting up clean state
                  management patterns to keep the app fast and responsive.
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
                  Delivered full-stack features for job and rideshare platforms,
                  building complex components like a geospatial matching engine
                  and a Socket.IO chat system. Improved application performance
                  through lazy loading, raised test coverage to over 85%, and
                  supported a cloud migration from AWS to Azure.
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
                  Developed extensible frameworks to benchmark how LLMs handle
                  code translation and unit test generation. Executed over
                  100,000+ deterministic trials converting 250+ C programs into
                  Java, Python, and Rust across 7 models to assess translation
                  quality. Additionally, implemented an asynchronous pipeline
                  using Celery and LangChain to generate and validate 17,000
                  JUnit test cases across different prompting techniques.
                </p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <span className="timeline-year">June 2021 – June 2023</span>
                <h5>Software Developer</h5>
                <div className="timeline-company">Cybernative</div>
                <p>
                  Built backend services including an inventory sync engine that
                  lowered API failures by 30%. Implemented secure authentication
                  flows and designed a real-time dashboard to track issues,
                  which improved error resolution speeds by 27%. Maintained
                  strict code quality and met delivery goals in an Agile
                  environment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
