import "./Milestones.css";
import Milestones_Data from "../../assets/milestones_data";

const Milestones = () => {
  return (
    <section id="milestones" className="milestones section">
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
        <h2 className="section-title">
          My <span className="title-accent">Journey</span>
        </h2>
        <p className="section-subtitle">
          A timeline of my academic and professional milestones that have shaped
          my career in technology
        </p>

        <div className="milestones-container">
          {Milestones_Data.map((milestone, index) => (
            <div className="milestone-card" key={index}>
              <div className="milestone-icon">
                <i className="fas fa-star"></i>
              </div>
              <div className="milestone-number">{index + 1}</div>
              <h3 className="milestone-title">{milestone.s_name}</h3>
              <p className="milestone-description">{milestone.s_desc}</p>
              <div className="milestone-year">{milestone.s_year}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Milestones;
