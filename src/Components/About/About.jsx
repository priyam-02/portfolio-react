import React, { useEffect, useState } from 'react';
import './About.css';
import profile_img from '../../assets/about_profile2.svg';
import underline from "../../assets/nav_underline3.svg";


const About = () => {
  const [animate, setAnimate] = useState(false);

  const handleScroll = () => {
    const aboutSection = document.querySelector('.about-skills');
    const sectionTop = aboutSection.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (sectionTop < windowHeight - 50) {
      setAnimate(true);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div id='about' className='about'>
      <div className="title-box">
        <h1>About me</h1>
        <img loading='lazy' src={underline} alt="" />
      </div>
      <div className="about-sections">
        <div className="about-left">
          <img loading='lazy' src={profile_img} alt="Profile" />
        </div>
        <div className="about-right">
          <div className="about-para">
            <p>I’m a Full-Stack Developer specializing in React.js, Node.js, and MongoDB, with a focus on building scalable, user-friendly applications. My passion lies in using innovative technologies to solve problems and create impactful real-world solutions.</p>
            <p>Currently, I am pursuing my Master of Science in Computer Science at the University of North Carolina at Charlotte, where I am honing my skills and deepening my knowledge. </p>
            <p>I’m naturally curious and always eager to explore new things, whether in tech or other fields. Staying up to date and trying new things keeps me excited and ready to adapt in a fast-changing world.</p>
            <p>When I’m not coding, you’ll find me chatting about movies, diving into video games, or brainstorming creative tech solutions. I love staying curious, learning, and building things that make a difference.</p>
          </div>
          <div className="about-skills">
            <div className="about-skill">
              <p>HTML & CSS</p>
              <hr style={{ width: animate ? "70%" : "0%", transition: "width 0.6s ease-in-out" }} />
            </div>
            <div className="about-skill">
              <p>JavaScript</p>
              <hr style={{ width: animate ? "60%" : "0%", transition: "width 0.6s ease-in-out" }} />
            </div>
            <div className="about-skill">
              <p>React.js</p>
              <hr style={{ width: animate ? "53%" : "0%", transition: "width 0.6s ease-in-out" }} />
            </div>
            <div className="about-skill">
              <p>Node.js</p>
              <hr style={{ width: animate ? "51%" : "0%", transition: "width 0.6s ease-in-out" }} />
            </div>
            <div className="about-skill">
              <p>Express.js</p>
              <hr style={{ width: animate ? "45%" : "0%", transition: "width 0.6s ease-in-out" }} />
            </div>
            <div className="about-skill">
              <p>MongoDB</p>
              <hr style={{ width: animate ? "39%" : "0%", transition: "width 0.6s ease-in-out" }} />
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;