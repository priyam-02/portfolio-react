import React, { useEffect, useState } from 'react';
import './About.css';
import theme_pattern from '../../assets/theme_pattern.svg';
import profile_img from '../../assets/about_profile1.svg';

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
    <div className='about'>
      <div className="title-box">
        <h1>About me</h1>
        <img src={theme_pattern} alt="" />
      </div>
      <div className="about-sections">
        <div className="about-left">
          <img src={profile_img} alt="Profile" />
        </div>
        <div className="about-right">
          <div className="about-para">
            <p>I am a dedicated Full-Stack Developer with a strong focus on creating scalable and intuitive digital solutions. Skilled in technologies like React.js, Node.js, and MongoDB, I excel in both front-end and back-end development.</p>
            <p>I am passionate about solving complex challenges and thrive in collaborative environments, contributing to impactful, user-focused applications while continuously advancing my expertise.</p>
            <p>Beyond coding, I am always ready to talk about movies, video games, and exploring creative ways to solve problems using technology.</p>
          </div>
          <div className="about-skills">
            <div className="about-skill">
              <p>HTML & CSS</p>
              <hr style={{ width: animate ? "60%" : "0%", transition: "width 0.6s ease-in-out" }} />
            </div>
            <div className="about-skill">
              <p>JavaScript</p>
              <hr style={{ width: animate ? "50%" : "0%", transition: "width 0.6s ease-in-out" }} />
            </div>
            <div className="about-skill">
              <p>React.js</p>
              <hr style={{ width: animate ? "40%" : "0%", transition: "width 0.6s ease-in-out" }} />
            </div>
            <div className="about-skill">
              <p>MongoDB</p>
              <hr style={{ width: animate ? "40%" : "0%", transition: "width 0.6s ease-in-out" }} />
            </div>
            <div className="about-skill">
              <p>Node.js</p>
              <hr style={{ width: animate ? "30%" : "0%", transition: "width 0.6s ease-in-out" }} />
            </div>
            <div className="about-skill">
              <p>Express.js</p>
              <hr style={{ width: animate ? "30%" : "0%", transition: "width 0.6s ease-in-out" }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;