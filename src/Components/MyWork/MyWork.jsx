import React, { useState } from 'react';
import './MyWork.css';
import mywork_data from '../../assets/mywork_data';
import arrow_icon from '../../assets/arrow_icon.svg';
import underline from "../../assets/nav_underline1.svg";


const MyWork = () => {
  const [visibleProjects, setVisibleProjects] = useState(6); // Initially show 6 projects
  const [isExpanded, setIsExpanded] = useState(false); // Track if projects are expanded
  const [animationClass, setAnimationClass] = useState(""); // Add animation class dynamically

  const handleShowMore = () => {
    setAnimationClass("fade-in"); // Add animation class
    setTimeout(() => {
      setVisibleProjects(mywork_data.length); // Show all projects
      setAnimationClass(""); // Remove animation class
      setIsExpanded(true); // Mark as expanded
    }, 300); // Match animation duration
  };

  const handleShowLess = () => {
    setAnimationClass("fade-in"); // Add animation class
    setTimeout(() => {
      setVisibleProjects(6); // Show only the first 6 projects
      setAnimationClass(""); // Remove animation class
      setIsExpanded(false); // Mark as collapsed
    }, 300); // Match animation duration
  };

  return (
    <div id='projects' className="mywork">
      <div className="title-box">
        <h1>My Latest Works</h1>
        <img loading='lazy' src={underline} alt="Pattern" />
      </div>
      <div className="mywork-container">
        {mywork_data.slice(0, visibleProjects).map((work, index) => (
          <a href={work.w_link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }} key={index}>
            <div className={`mywork-format ${animationClass}`}>
              <div className="mywork-image-wrapper">
                <img loading='lazy' src={work.w_img} alt={work.w_name} className="mywork-image" />
              </div>
              <h2>{work.w_name}  {work.w_live ? (<span className='play'><a href={work.w_live} target="_blank" rel="noopener noreferrer">
                  Play
                </a>
              </span>) : null}</h2>
              <p>{work.w_desc}</p>
              <div className="tags">
                {work.w_tags.map((tag, tagIndex) => (
                  <span className="tag" key={tagIndex}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </a>
        ))}
      </div>
      <div className="mywork-toggle">
        {!isExpanded ? (
          <div className="mywork-showmore" onClick={handleShowMore}>
            <p>Show More</p>
            <img src={arrow_icon} alt="Arrow Icon" />
          </div>
        ) : (
          <div className="mywork-showless" onClick={handleShowLess}>
            <p>Show Less</p>
            <img src={arrow_icon} alt="Arrow Icon" style={{ transform: 'rotate(180deg)' }} />
          </div>
        )}
      </div>
    </div>
  );
};

export default MyWork;