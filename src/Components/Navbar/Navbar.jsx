import React from 'react';
import './Navbar.css';
import logo from '../../assets/logo1.svg';

const Navbar = () => {
  return (
    <>
    <div className="navbar">
      <img src={logo} alt="Logo" />
      <ul className="nav-menu">
        <li>Home</li>
        <li>About Me</li>
        <li>Projects</li>
        <li>Milestones</li>
        <li>Contact</li>
      </ul>

      <div className='nav-connect-icons'>
        <div className="nav-connect">Connect With Me</div>
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