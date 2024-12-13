import React, { useState } from 'react';
import './Navbar.css';
import logo from '../../assets/logo1.svg';
import underline from '../../assets/nav_underline.svg';
import AnchorLink from 'react-anchor-link-smooth-scroll';

const Navbar = () => {
  const [menu, setMenu] = useState('home');
  return (
    <>
    <div className="navbar">
      <img className='logo' loading='lazy' src={logo} alt="Logo" />
      <ul className="nav-menu">
        <li><AnchorLink className='anchor-link' offset={50} href='#home'><p onClick={() => setMenu("home")}>Home</p></AnchorLink>{menu==="home"?<img src={underline} alt='' /> : <></>}</li>
        <li><AnchorLink className='anchor-link' offset={50} href='#about'><p onClick={() => setMenu("about")}>About Me</p></AnchorLink>{menu==="about"?<img src={underline} alt='' /> : <></>}</li>
        <li><AnchorLink className='anchor-link' offset={50} href='#projects'><p onClick={() => setMenu("projects")}>Projects</p></AnchorLink>{menu==="projects"?<img src={underline} alt='' /> : <></>}</li>
        <li><AnchorLink className='anchor-link' offset={50} href='#milestones'><p onClick={() => setMenu("milestones")}>Milestones</p></AnchorLink>{menu==="milestones"?<img src={underline} alt='' /> : <></>}</li>
        <li><AnchorLink className='anchor-link' offset={50} href='#contact'><p onClick={() => setMenu("contact")}>Contact</p></AnchorLink>{menu==="contact"?<img src={underline} alt='' /> : <></>}</li>
      </ul>

      <div className='nav-connect-icons'>
        <div className="nav-connect"><AnchorLink className='anchor-link' offset={50} href='#contact'>Connect With Me</AnchorLink></div>
        <div className="icons">
          <a href="https://github.com/priyam-02" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-github"></i>
          </a>
          <a href="https://linkedin.com/in/priyamshah22" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-linkedin"></i>
          </a>
    </div>
        </div>
    </div>
    
    </>
    
  );
};

export default Navbar;